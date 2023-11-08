import ms from "ms";
import _ from "lodash";
import * as uuid from "uuid";
import config from "@/config";
import jwt from "jsonwebtoken";
import { Messages } from "@/constants";
import { Unauthorized, BadRequest } from "@/utils/errors";
import { BlacklistedTokenModel, OutstandingTokenModel } from "@models";

export class JwtToken {
  declare options: Jwt.JwtOptions;

  declare exp_in: number;

  constructor(options: Jwt.JwtOptions) {
    this.options = _.defaultsDeep(options, {
      save: false,
      type: "test",
      issuer: "test",
      algorithm: "HS512",
    });

    this.exp_in = ms(this.options.exp);
  }

  async save(token: string, payload: jwt.JwtPayload) {
    // if, user want to save token in database
    return await OutstandingTokenModel.create({
      token,
      jti: payload["jti"],
      user: payload["sub"],
      expires_at: new Date(Date.now() + ms(this.options.exp)),
    });
  }

  async isBlacklisted(token: string | jwt.JwtPayload) {
    const payload =
      typeof token === "string" ? await this.verify(token) : token;

    return await BlacklistedTokenModel.exists({
      token: await OutstandingTokenModel.findOne({ jti: payload["jti"] }),
    });
  }

  async blacklist(token: string) {
    if (this.options.save) {
      // check token is verified
      const payload = await this.verify(token);

      // save token inside blacklisted model
      await BlacklistedTokenModel.create({
        token: await OutstandingTokenModel.findOne({ jti: payload["jti"] }),
      });

      // finally return payload
      return payload;
    }
    throw new BadRequest(`You can't blacklist of ${this.options.type} token.`);
  }

  async verify(token: string) {
    try {
      const payload = jwt.verify(token, config.getOrThrow("jwt.secret"));
      // check token is blacklisted or not
      if (this.options.save && (await this.isBlacklisted(payload)))
        throw new Unauthorized(Messages.TOKEN_BLACKLISTED);

      // check token payload is valid or not
      if (payload["type"] !== this.options.type)
        throw new Unauthorized(Messages.TOKEN_TYPE_INVALID);

      return payload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError)
        throw new Unauthorized(Messages.TOKEN_EXPIRED);
      if (error instanceof jwt.JsonWebTokenError)
        throw new Unauthorized(error.message);
      throw error;
    }
  }

  async create(user: string) {
    // token unique id
    const jti = uuid.v4();

    // payload
    const payload: jwt.JwtPayload = {
      jti,
      sub: user,
      type: this.options.type,
      iss: config.get("jwt.issuer", "test"),
    };

    // create jwt token
    const token = jwt.sign(payload, config.getOrThrow("jwt.secret"), {
      expiresIn: this.options.exp,
      algorithm: this.options.algorithm,
    });
    // if, user want to save token in database
    if (this.options.save)
      this.save(token, payload) /* save token in database */;

    return token;
  }
}
