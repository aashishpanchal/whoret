import { auth } from "../middlewares";
import { tokenService } from "../services";
import { Request, Response } from "express";
import { AuthSerializer } from "../auth.serializer";
import { Del, Middlewares, Post } from "@/utils/http";

export class TokenController {
  @Post("tokens")
  @Middlewares(auth.localAuth())
  async login(req: Request, res: Response) {
    // gen access and refresh tokens
    const { user, tokens } = await tokenService.getTokens(req.user);
    res.send(AuthSerializer({ ...user, tokens }));
  }

  @Post("token-refresh")
  async tokenRefresh(req: Request<any, any, { token: string }>, res: Response) {
    const { token } = req.body;
    const result = await tokenService.tokenRefresh(token);
    res.send(result);
  }

  @Del("token-blacklist")
  @Middlewares(auth.jwtAuth())
  async logout(req: Request<any, any, { token: string }>, res: Response) {
    const { token } = req.body;
    const result = await tokenService.tokenBlacklist(token);
    res.send(result);
  }

  // with cookies
  @Post("tokens-in-cookie")
  @Middlewares(auth.localAuth())
  async loginInCookie(req: Request, res: Response) {
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

  @Post("token-refresh-from-cookie")
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

  @Middlewares(auth.jwtAuth())
  @Post("token-blacklist-from-cookie")
  async tokenLogoutFromCookie(req: Request, res: Response) {
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
