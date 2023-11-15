import { auth } from "../middlewares";
import { router } from "@/utils/routes";
import type { Request, Response } from "express";
import { AuthSerializer } from "../auth.serializer";
import tokenService from "../services/token.service";

export class TokenController {
  @router.post("token")
  @router.middleware(auth.localAuth())
  async token(req: Request, res: Response) {
    // gen access and refresh tokens
    const { user, tokens } = await tokenService.getTokens(req.user);
    res.send(AuthSerializer({ ...user, tokens }));
  }

  @router.post("token-refresh")
  async tokenRefresh(req: Request<any, any, { token: string }>, res: Response) {
    const { token } = req.body;
    const result = await tokenService.tokenRefresh(token);
    res.send(result);
  }

  @router.delete("token-blacklist")
  @router.middleware(auth.jwtAuth())
  async tokenBlacklist(
    req: Request<any, any, { token: string }>,
    res: Response
  ) {
    const { token } = req.body;
    const result = await tokenService.tokenBlacklist(token);
    res.send(result);
  }

  // with cookies
  @router.post("token-in-cookie")
  @router.middleware(auth.localAuth())
  async tokenInCookie(req: Request, res: Response) {
    // gen access and refresh tokens
    const { tokens, user } = await tokenService.getTokens(req.user);
    // save token in cookie
    res.cookie("access", tokens.access, {
      httpOnly: true,
      maxAge: tokenService.Access.exp_in,
    });
    res.cookie("refresh", tokens.refresh, {
      httpOnly: true,
      maxAge: tokenService.Refresh.exp_in,
    });
    // return both access and refresh tokens
    res.send({ user, tokens: "token parse in cookie" });
  }

  @router.post("token-refresh-from-cookie")
  async tokenRefreshFromCookie(req: Request, res: Response) {
    // token get from cookie
    const { refresh } = req.cookies;
    // gen new access tokens
    const token = await tokenService.tokenRefresh(refresh);
    // save token in cookie
    res.cookie("access", token.access, {
      httpOnly: true,
      maxAge: tokenService.Access.exp_in,
    });
    res.send({ access: "updated successfully" });
  }

  @router.middleware(auth.jwtAuth())
  @router.post("token-blacklist-from-cookie")
  async tokenBlacklistFromCookie(req: Request, res: Response) {
    // token get from cookie
    const { refresh } = req.cookies;
    // token save in blacklist
    await tokenService.tokenBlacklist(refresh);
    // clear cookie
    res.clearCookie("refresh");
    res.clearCookie("access");
    // return message
    res.send({ message: "Token save in blacklist" });
  }
}
