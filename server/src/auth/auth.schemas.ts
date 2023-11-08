import { Role } from "../constants";
import * as z from "zod";

// register schema
export type RegisterSchema = z.infer<typeof RegisterSchema>;

export const RegisterSchema = z.object({
  phone: z.string().min(12),
  password: z.string(),
  full_name: z.string().optional(),
  type: z.enum([Role.SELLER, Role.USER]).default(Role.USER),
});

// login schema
export type LoginSchema = z.infer<typeof LoginSchema>;

export const LoginSchema = z.object({
  username: z.string() /* username are email/phone */,
  password: z.string(),
});

// phone and email schema
export type PhoneSchema = z.infer<typeof PhoneSchema>;

export const PhoneSchema = z.object({
  phone: z.string().min(12),
});

export type EmailSchema = z.infer<typeof EmailSchema>;

export const EmailSchema = z.object({
  email: z.string().email(),
});

// phone with code and email with code
export type PhoneCodeSchema = z.infer<typeof PhoneCodeSchema>;

export const PhoneCodeSchema = PhoneSchema.extend({
  code: z.string().min(4),
});

export type EmailCodeSchema = z.infer<typeof EmailCodeSchema>;

export const EmailCodeSchema = EmailSchema.extend({
  code: z.string().min(4),
});
