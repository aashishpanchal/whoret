import { User } from "@/models";
import { omit } from "lodash";

type AuthType = User & {
  tokens: { access: string; refresh: string };
  [key: string]: any;
};

export const AuthSerializer = (value: AuthType) => omit(value, "password");
