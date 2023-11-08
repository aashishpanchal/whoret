import { RequestHandler } from "express";

export const catchAsync =
  <ReqBody = any, P = any, ReqQuery = any>(
    fn: RequestHandler<P, any, ReqBody, ReqQuery>
  ): RequestHandler<P, any, ReqBody, ReqQuery> =>
  (req, res, next) => {
    const fnReturn = fn(req, res, next);

    return Promise.resolve(fnReturn).catch(next);
  };
