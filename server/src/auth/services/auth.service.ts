import { UserModel } from "@/models";
import { authSMS } from "../auth.sms";
import { authEmail } from "../auth.email";
import { codeHash } from "@/common/helpers";
import { Messages, Role } from "@/constants";
import { RegisterSchema } from "../auth.schemas";
import { BadRequest, Conflict } from "@/utils/errors";

class AuthService {
  async register(data: RegisterSchema, role: Role) {
    const { phone } = data;
    // check if user already exists
    let user = await UserModel.findOne({ phone });
    // if user already exists after throw error
    if (user)
      throw new Conflict(
        Messages.USER_ACCOUNT_ALREADY_EXISTS("with phone number")
      );
    // create a new user
    return await UserModel.create(
      Object.assign(data, { role, is_phone_verified: false })
    ).then((user) => {
      // send verification code to user phone
      authSMS.sendVerificationSMS(user.phone);
      return user;
    });
  }

  async phonenumVerification(phone: string, code: string) {
    const user = await UserModel.findOne({ phone });
    // if user does not exist after throw error
    if (!user) throw new BadRequest(Messages.USER_ACCOUNT_NOT_FOUND);
    // check if user already verified
    if (user.is_phone_verified)
      throw new Conflict(Messages.PHONE_ALREADY_VERIFIED);
    // check if code is valid
    if (!(await codeHash.verifyCode(phone, code)))
      throw new Conflict(Messages.INVALID_CODE);
    // update user
    return await UserModel.findByIdAndUpdate(user.id, {
      is_phone_verified: true,
    });
  }

  async emailVerification(email: string, code: string) {
    const user = await UserModel.findOne({ email });
    // if user does not exist after throw error
    if (!user) throw new BadRequest(Messages.USER_ACCOUNT_NOT_FOUND);
    // check if user already verified
    if (user.is_email_verified)
      throw new Conflict(Messages.EMAIL_ALREADY_VERIFIED);
    // check if code is valid
    if (!(await codeHash.verifyCode(email, code)))
      throw new Conflict(Messages.INVALID_CODE);
    // update user
    return await UserModel.findByIdAndUpdate(user.id, {
      is_email_verified: true,
    });
  }

  async sendVerificationPhonenum(phone: string) {
    // check if user already exists
    const user = await UserModel.findOne({ phone });
    // if user already exists after throw error
    if (!user) throw new BadRequest(Messages.USER_ACCOUNT_NOT_FOUND);
    // if user phone number is already verified
    if (user.is_phone_verified)
      throw new Conflict(Messages.PHONE_ALREADY_VERIFIED);
    // send verification code to user phone
    return await authSMS.sendVerificationSMS(user.phone);
  }

  async sendVerificationEmail(id: string) {
    // check if user already exists
    const user = await UserModel.findById(id);
    // if user already exists after throw error
    if (!user) throw new BadRequest(Messages.USER_ACCOUNT_NOT_FOUND);
    // if user email is already verified
    if (user.is_email_verified)
      throw new Conflict(Messages.EMAIL_ALREADY_VERIFIED);
    // send verification code to user email
    return await authEmail.confirmationEmail(user.email);
  }
}

export default new AuthService();
