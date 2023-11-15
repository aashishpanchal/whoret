import * as z from "zod";

export type LoginSchema = z.infer<typeof LoginSchema>;

export const LoginSchema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

export type RegisterSchema = z.infer<typeof RegisterSchema>;

export const RegisterSchema = z.object({
  phone: z.string().min(1, "Required"),
  email: z.string().min(1, "Required").email(),
  first_name: z.string().min(1, "Required"),
  last_name: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});
