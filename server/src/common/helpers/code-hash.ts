import ms from "ms";
import config from "@/config";
import speakeasy from "speakeasy";
import { redis } from "@/config/cache";
import { BadRequest } from "@/utils/errors";

export class CodeHash {
  private issuer: string = config.get("app.name");
  private codeExp: number = ms(config.getOrThrow<string>("code_exp")) / 1000;

  private getKey(key: string) {
    return `code:${key}`;
  }

  public async generateCode(label: string): Promise<string> {
    // check user code already exit in redis database
    const ttl = await redis.ttl(this.getKey(label));

    if (ttl > 0)
      throw new BadRequest(
        `please wait ${ttl}s, after you can send new code in email!`
      );

    const secret = speakeasy.generateSecret({
      length: 20,
      name: label,
      issuer: this.issuer,
    });

    await redis.setex(this.getKey(label), this.codeExp, secret.base32);

    return speakeasy.totp({
      secret: secret.base32,
      step: this.codeExp,
      encoding: "base32",
      digits: config.getOrThrow("code_digits"),
    });
  }

  public async verifyCode(label: string, code: string): Promise<boolean> {
    const key = this.getKey(label);

    const secret = await redis.get(key);

    if (!secret) return false;

    const verified = speakeasy.totp.verify({
      secret,
      token: code,
      step: this.codeExp,
      encoding: "base32",
    });

    if (verified) await redis.del(key);

    return verified;
  }
}

export const codeHash = new CodeHash();
