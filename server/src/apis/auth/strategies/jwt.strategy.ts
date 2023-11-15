import config from "@/config";
import { UserModel } from "@/models";
import { TokenType, Messages } from "@/constants";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Unauthorized, BadRequest, Forbidden, NotFound } from "@/utils/errors";

export const JwtStrategy = new Strategy(
  {
    secretOrKey: config.getOrThrow("jwt.secret"),
    jwtFromRequest: (req) => {
      let token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      // check token is empty and may token inside cookie
      if (!token) {
        token = req.cookies["access"];
      }

      return token;
    },
  },
  async (payload, done) => {
    try {
      const { sub } = payload;

      if (payload.type !== TokenType.ACCESS)
        throw new Unauthorized(Messages.TOKEN_TYPE_INVALID);

      if (!sub) throw new BadRequest(Messages.TOKEN_USER_INVALID);

      const user = await UserModel.findById(sub);

      if (!user) throw new NotFound(Messages.USER_ACCOUNT_NOT_FOUND);

      if (!user.is_phone_verified)
        throw new Forbidden(Messages.USER_ACCOUNT_NOT_VERIFIED);

      if (user.is_blocked)
        throw new Forbidden(Messages.USER_ACCOUNT_IS_BLOCKED);

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
