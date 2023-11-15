import { UserModel } from "@/models";
import { Messages } from "@/constants";
import { Strategy } from "passport-local";
import { NotFound, Forbidden, Unauthorized } from "@/utils/errors";

export const LocalStrategy = new Strategy(
  {
    usernameField: "username",
    passwordField: "password",
  },
  async (username: string, password: string, done) => {
    try {
      const user = await UserModel.findOne({
        $or: [{ email: username }, { phone: username }],
      });

      if (!user) throw new NotFound(Messages.USER_ACCOUNT_NOT_FOUND);

      if (!(await user.checkPassword(password)))
        throw new Unauthorized(Messages.INVALID_CREDENTIALS);

      if (!user.is_phone_verified)
        throw new Forbidden(Messages.USER_ACCOUNT_NOT_VERIFIED);

      if (user.is_blocked)
        throw new Forbidden(Messages.USER_ACCOUNT_IS_BLOCKED);

      return done(null, await user.updateLastLogin());
    } catch (error) {
      done(error, false);
    }
  }
);
