import { User } from "@/models";
import { Role } from "@/constants";
import { Forbidden } from "@/utils/errors";
import type { RequestHandler } from "express";
import { catchAsync } from "@/utils/catch-async";

type GuardFunc = () => RequestHandler;

export const RoleGuard = (...roles: Role[]): RequestHandler =>
  catchAsync((req, _, next) => {
    const checker = () => {
      if (!roles) {
        return true;
      }

      const user = req.user as User;

      if (!user) {
        return false;
      }

      return user && roles.includes(user.role);
    };
    if (!checker()) throw new Forbidden();

    next();
  });

// common auth guard middlewares
export const IsAdmin: GuardFunc = () => RoleGuard(Role.ADMIN); // only admin access

export const IsAdminOrSeller: GuardFunc = () =>
  RoleGuard(Role.ADMIN, Role.SELLER); // admin and seller can access
