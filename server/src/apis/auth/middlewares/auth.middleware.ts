import passport from "passport";
import { Strategies } from "@/constants";
import { LoginSchema } from "../auth.schemas";
import { catchAsync } from "@/utils/catch-async";
import type { Request, RequestHandler } from "express";

export function jwtAuth(): RequestHandler {
  return (req, res, next) => {
    // check token is valid or not
    const auth = passport.authenticate(Strategies.JWT, {
      session: false,
    });

    // call passport auth middleware
    return auth(req, res, next);
  };
}

export function localAuth(): RequestHandler {
  return catchAsync(async (req: Request, res, next) => {
    // check user credentials
    req.body = LoginSchema.parse(req.body);

    // check user is valid or not
    const auth = passport.authenticate(Strategies.LOCAL, { session: false });

    // call passport auth middleware
    return auth(req, res, next);
  });
}
