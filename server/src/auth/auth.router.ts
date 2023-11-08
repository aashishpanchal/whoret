import passport from "passport";
import { Router } from "express";
import { Strategies } from "@/constants";
import { getRouterForClass } from "@/utils/http";
import { JwtStrategy, LocalStrategy } from "./strategies";
import { AuthController, TokenController } from "./controllers";

// initialize passport strategies
passport.use(Strategies.JWT, JwtStrategy);
passport.use(Strategies.LOCAL, LocalStrategy);

// create router of AuthController
export const authRouter: Router = Router();

// add auth controllers to router
authRouter.use(
  "/auth",
  getRouterForClass(AuthController),
  getRouterForClass(TokenController)
);
