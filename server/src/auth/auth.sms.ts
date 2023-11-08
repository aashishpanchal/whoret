import config from "@/config";
import { sendSMS } from "@/common/sms";
import { codeHash } from "@/common/helpers";

class AuthSMS {
  async sendVerificationSMS(phone: string) {
    const code: string = await codeHash.generateCode(phone);

    const message: string = `${config.get(
      "app.name"
    )}: User Code ${code} to verification your account. Do NOT SHARE this code with anyone.`;

    await sendSMS(phone, message);
  }

  async passwordResetCodeOnPhone(phone: string) {
    const code: string = await codeHash.generateCode(phone);

    const message: string = `${config.get(
      "app.name"
    )}: User Code ${code} to reset your password. Do NOT SHARE this code with anyone.`;

    await sendSMS(phone, message);
  }
}

export const authSMS = new AuthSMS();
