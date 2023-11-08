import { RequestHandler } from "express";
import { MIDDLE_KEY } from "../constants";

// class and method level middleware decorator
export function Middlewares(...func: RequestHandler[]) {
  return (...args: any) => {
    // class level middleware
    if (args.length === 1) {
      const [constructor] = args;
      // set array of middlewares globally
      const prev = Reflect.getMetadata(MIDDLE_KEY, constructor) || [];
      Reflect.defineMetadata(MIDDLE_KEY, [...prev, ...func], constructor);
    } else {
      // method level middleware
      const [target, propertyKey] = args;
      // get routes
      const prev: Array<any> =
        Reflect.getMetadata(MIDDLE_KEY, target, propertyKey) || [];
      Reflect.defineMetadata(
        MIDDLE_KEY,
        [...prev, ...func],
        target,
        propertyKey
      );
    }
  };
}
