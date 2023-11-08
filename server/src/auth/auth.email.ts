import dayjs from "dayjs";
import config from "@/config";
import { BaseEmail } from "@/common/mail";
import { codeHash } from "@/common/helpers";

class AuthEmail extends BaseEmail {
  async codeOnEmail(email: string) {
    const code: string = await codeHash.generateCode(email);

    const context: Record<string, any> = await this.getContext({
      code,
      date: dayjs().format("D MMMM YYYY, h:mm A"),
      exp: config.getOrThrow("code_exp"),
    });

    this.sendTo(email, {
      context,
      template: "verification",
      subject: `${code} is your verification code`,
    });
  }

  async confirmationEmail(email: string) {
    const context = await this.getContext({
      email,
    });

    this.sendTo(email, {
      context,
      template: "confirmation",
      subject: "Confirmation Email",
    });
  }
}

export const authEmail = new AuthEmail();
