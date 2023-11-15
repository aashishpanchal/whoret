import { ROUTES_KEY, MIDDLE_KEY } from "../constants";
import type { IRoute, RequestHandler } from "express";
import type { MetaData, RoutesType } from "../interface";

// class and method level middleware decorator
export function middleware(...func: RequestHandler[]) {
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

const common =
  (method: keyof IRoute) =>
  (...path: string[]) => {
    if (path.length === 0) path = ["/"];
    else path = path.map((p) => (p.startsWith("/") ? p : `/${p}`));

    return (target: any, propertyKey: string) => {
      let metadata: MetaData =
        Reflect.getMetadata(ROUTES_KEY, target) || new Map();

      if (metadata.has(propertyKey)) {
        const routes: RoutesType = metadata.get(propertyKey);
        // add new path
        const index = routes.findIndex((r) => r.method === method);

        if (index !== -1) {
          // check path already exit or not
          const oldPath = routes[index].path;
          // merge old path and new path
          if (oldPath) path = [...oldPath, ...path];
          // add paths routes on index
          routes[index].path = path;
        } else routes.push({ path, method });
        // update data
        metadata.set(propertyKey, routes);
      } else {
        // set new property
        metadata.set(propertyKey, [{ path, method }]);
      }
      // update metadata
      Reflect.defineMetadata(ROUTES_KEY, metadata, target);
    };
  };

// Decorator functions
export default {
  middleware,
  post: common("post"),
  get: common("get"),
  put: common("put"),
  all: common("all"),
  delete: common("delete"),
  patch: common("patch"),
};
