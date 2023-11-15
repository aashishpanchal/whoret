import helmet from "helmet";
import express from "express";
import passport from "passport";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import { NotFound } from "./utils/errors";
import { apiRouter } from "./apis/api.router";
import { zodMiddleware } from "./middlewares/zod.middleware";
import { errorLogMiddleware } from "./middlewares/error-logs.middleware";
import { serverLogsMiddleware } from "./middlewares/server-logs.middleware";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware";

export async function App() {
  // connect database
  await connectDB();
  // create express application
  const app: express.Application = express();
  // static path
  app.use(express.static("public"));
  // middlewares
  app.use(helmet());
  app.use(serverLogsMiddleware());
  app.use(cookieParser());
  app.use(express.json({ limit: "16kb" }));
  app.use(express.urlencoded({ extended: true, limit: "16kb" }));
  // passport js initialize
  app.use(passport.initialize());
  // api router
  app.use("/api", apiRouter);
  // not found
  app.all("*", (req) => {
    throw new NotFound(`Cannot ${req.method} ${req.originalUrl}`);
  });
  // default router
  app.get("/*", (_, res) => {
    res.send(process.cwd() + "/public/index.html");
  });
  // error handler
  app.use(zodMiddleware);
  app.use(errorLogMiddleware);
  app.use(errorHandlerMiddleware);
  // return app
  return app;
}
