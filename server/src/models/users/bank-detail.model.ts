import { User } from "./user.model";
import { Schema } from "../decorators";
import { Ref, Prop, getModelForClass } from "@typegoose/typegoose";

@Schema({ timestamps: true })
export class BankDetail {
  @Prop({ required: true, unique: true, ref: () => User })
  user: Ref<User>;

  @Prop()
  IFC: string;

  @Prop()
  account: string;

  @Prop()
  name: string;
}

export const BankDetailModel = getModelForClass(BankDetail);
