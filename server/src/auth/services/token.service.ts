import config from "@/config";
import { TokenType } from "@/constants";
import { UserDocument } from "@/models";
import { JwtToken } from "@/common/helpers";

class TokenService {
  // refresh token
  Refresh = new JwtToken({
    save: true,
    type: TokenType.REFRESH,
    exp: config.getOrThrow("jwt.refresh_exp"),
  });

  // access token
  Access = new JwtToken({
    type: TokenType.ACCESS,
    exp: config.getOrThrow("jwt.access_exp"),
  });

  async getTokens(user: UserDocument) {
    const [access, refresh] = await Promise.all([
      this.Access.create(user.id),
      this.Refresh.create(user.id),
    ]);

    const tokens = { access, refresh };

    return { tokens, user: user.toJSON() };
  }

  async tokenBlacklist(token: string) {
    // token save in blacklist
    await this.Refresh.blacklist(token);
    // return message
    return { message: "Token save in blacklist" };
  }

  async tokenRefresh(token: string) {
    const payload = await this.Refresh.verify(token);
    const access = await this.Access.create(payload.sub as string);
    return { access };
  }
}

export default new TokenService();
