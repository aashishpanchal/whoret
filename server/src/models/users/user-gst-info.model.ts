import { User } from "./user.model";
import { Schema } from "../decorators";
import { Ref, Prop, getModelForClass } from "@typegoose/typegoose";

@Schema({ timestamps: true })
export class UserGstInfo {
  @Prop({ required: true, unique: true, ref: () => User })
  user: Ref<User>;

  @Prop({ required: true, unique: true })
  gst_num: string;

  @Prop({ default: true })
  is_verified?: boolean;
}

export const UserGstInfoModel = getModelForClass(UserGstInfo);
