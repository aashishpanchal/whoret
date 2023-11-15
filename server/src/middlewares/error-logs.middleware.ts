import logger from "@/common/logger";
import { HttpError } from "@/utils/errors";
import { ErrorRequestHandler } from "express";

export const errorLogMiddleware: ErrorRequestHandler = (
  error,
  _req,
  _res,
  next
) => {
  if (!HttpError.isHttpError(error)) logger.error(error);
  next(error);
};
