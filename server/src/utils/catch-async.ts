// async catch error wrapper
import { NextFunction, RequestHandler } from "express";

// for function
export function catchAsync(fn: RequestHandler): RequestHandler {
  return function (...args: any[]) {
    const next: NextFunction = args[args.length - 1];
    return Promise.resolve(fn.apply(this, args)).catch(next);
  };
}
