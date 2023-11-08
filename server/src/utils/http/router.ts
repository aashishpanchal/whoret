import { RequestHandler, Router } from "express";
import { catchAsync } from "@/utils/catch-async";
import { MIDDLE_KEY, ROUTES_KEY } from "./constants";

// this is function help to extract all request handler from class controller
export function getRouterForClass<T extends { new (): any }>(cls: T) {
  const instance = new cls();

  const properties = Reflect.ownKeys(cls.prototype);

  const gMiddle: RequestHandler[] =
    Reflect.getMetadata(MIDDLE_KEY, instance.constructor) || [];

  // express router
  const router: Router = Router();

  // set global middleware
  if (gMiddle.length > 0) router.use(...gMiddle);

  properties.forEach((property) => {
    const routes = Reflect.getMetadata(ROUTES_KEY, instance, property) || [];
    const middle = Reflect.getMetadata(MIDDLE_KEY, instance, property) || [];

    if (routes.length > 0) {
      routes.forEach((route: any) => {
        const { method, path } = route as any;

        // if path is array
        if (Array.isArray(path)) {
          // add method to router
          path.forEach((p) => {
            (router.route(p) as any)[method](
              ...middle,
              catchAsync(instance[property].bind(instance))
            );
          });
        } else {
          (router.route(path) as any)[method](
            ...middle,
            catchAsync(instance[property].bind(instance))
          );
        }
      });
    }
  });

  return router;
}
