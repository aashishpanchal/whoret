import httpStatus from "http-status";
import { router } from "@/utils/routes";
import { authService } from "../services";
import { AuthSerializer } from "../auth.serializer";
import {
  PhoneSchema,
  RegisterSchema,
  PhoneCodeSchema,
  EmailCodeSchema,
} from "../auth.schemas";
import type { Request, Response } from "express";

export class AuthController {
  @router.post("register")
  async register(req: Request, res: Response) {
    const { type, ...body } = RegisterSchema.parse(req.body);
    const user = await authService.register(body, type);
    const data = AuthSerializer(user.toJSON());
    res.status(httpStatus.CREATED).send(data);
  }

  @router.post("verification")
  async verification(req: Request, res: Response) {
    const { phone, code } = PhoneCodeSchema.parse(req.body);
    const user = await authService.verification(phone, code);
    const data = AuthSerializer(user.toJSON());
    res.status(httpStatus.OK).send(data);
  }

  @router.post("resend-verification-code")
  async resendVerificationCode(req: Request, res: Response) {
    const { phone } = PhoneSchema.parse(req.body);
    await authService.sendVerificationPhonenum(phone);
    res.status(httpStatus.OK).send({ msg: "Verification code sent on phone." });
  }

  // email verification handler
  @router.post("send-verification-email")
  async sendVerificationEmail(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    await authService.sendVerificationEmail(id);
    res.status(httpStatus.OK).send({ msg: "Verification code send on email." });
  }

  @router.post("email-verification")
  async emailVerification(req: Request, res: Response) {
    const { email, code } = EmailCodeSchema.parse(req.body);
    const user = await authService.emailVerification(email, code);
    const data = AuthSerializer(user.toJSON());
    res.status(httpStatus.OK).send(data);
  }
}
