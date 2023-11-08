import { Post } from "@/utils/http";
import httpStatus from "http-status";
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
  @Post("register")
  async register(req: Request, res: Response) {
    const { type, ...body } = RegisterSchema.parse(req.body);
    const user = await authService.register(body, type);
    const data = AuthSerializer(user.toJSON());
    res.status(httpStatus.CREATED).send(data);
  }

  @Post("phone-verification")
  async accountVerification(req: Request, res: Response) {
    const { phone, code } = PhoneCodeSchema.parse(req.body);
    const user = await authService.phonenumVerification(phone, code);
    const data = AuthSerializer(user.toJSON());
    res.status(httpStatus.OK).send(data);
  }

  @Post("email-verification")
  async emailVerification(req: Request, res: Response) {
    const { email, code } = EmailCodeSchema.parse(req.body);
    const user = await authService.emailVerification(email, code);
    const data = AuthSerializer(user.toJSON());
    res.status(httpStatus.OK).send(data);
  }

  @Post("verification-phone")
  async sendVerificationPhonenum(req: Request, res: Response) {
    const { phone } = PhoneSchema.parse(req.body);
    await authService.sendVerificationPhonenum(phone);
    res.status(httpStatus.OK).send({ msg: "Verification code sent on phone." });
  }

  @Post("send-verification-email/:id")
  async sendVerificationEmail(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    await authService.sendVerificationEmail(id);
    res.status(httpStatus.OK).send({ msg: "Verification code send on email." });
  }
}
