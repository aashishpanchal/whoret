import { IRoute } from "express";
import { ROUTES_KEY } from "../constants";

export const reqDecorator =
  (method: keyof IRoute) =>
  (...path: string[]) => {
    if (path.length === 0) path = ["/"];
    else path = path.map((p) => (p.startsWith("/") ? p : `/${p}`));

    return (target: any, propertyKey: string) => {
      // get routes
      const routes: Array<any> =
        Reflect.getMetadata(ROUTES_KEY, target, propertyKey) || [];
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

      Reflect.defineMetadata(ROUTES_KEY, routes, target, propertyKey);
    };
  };

// Decorator functions for specific HTTP methods
export const Post = reqDecorator("post");
export const Get = reqDecorator("get");
export const All = reqDecorator("all");
export const Put = reqDecorator("put");
export const Del = reqDecorator("delete");
export const Patch = reqDecorator("patch");
