import { Router } from "express";
import userRouter from "./user/user.router";
import authRouter from "./auth/auth.router";

export const apiRouter: Router = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
