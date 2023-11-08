import {
  Pre,
  Prop,
  DocumentType,
  getModelForClass,
} from "@typegoose/typegoose";
import { Role } from "@/constants";
import { hash, compare } from "bcrypt";
import { Schema } from "../decorators";

// middleware decorator
@Pre<User>("save", async function (next) {
  if (this.password) {
    if (!this?.isModified("password")) return next();
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
})
@Schema({ timestamps: true })
export class User {
  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  full_name: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role;

  @Prop({ default: false })
  is_blocked: boolean;

  @Prop({ default: false })
  is_phone_verified: boolean;

  @Prop({ default: false })
  is_email_verified: boolean;

  @Prop()
  login_at?: Date;

  async checkPassword(password: string) {
    if (this.password) {
      return await compare(password, this.password);
    }
    return false;
  }

  async updateLastLogin(this: UserDocument) {
    this.login_at = new Date();
    return await this.save();
  }
}

export const UserModel = getModelForClass(User);

export interface UserDocument extends DocumentType<User> {}

// extend express user
declare global {
  namespace Express {
    interface User extends UserDocument {}
  }
}
