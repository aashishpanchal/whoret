import config from "@/config";
import { sendMsg } from "@/common/twilio";
import { codeHash } from "@/common/helpers";

class AuthMsg {
  async sendVerificationSMS(phone: string) {
    const code: string = await codeHash.generateCode(phone);

    const message: string = `${config.get(
      "app.name"
    )}: User Code ${code} to verification your account. Do NOT SHARE this code with anyone.`;

    await sendMsg(phone, message);
  }

  async passwordResetCodeOnPhone(phone: string) {
    const code: string = await codeHash.generateCode(phone);

    const message: string = `${config.get(
      "app.name"
    )}: User Code ${code} to reset your password. Do NOT SHARE this code with anyone.`;

    await sendMsg(phone, message);
  }
}

export default new AuthMsg();
