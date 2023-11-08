import { User } from "./user.model";
import { File } from "./storage.model";
import { Schema } from "../decorators";
import { Ref, Prop, getModelForClass } from "@typegoose/typegoose";

@Schema({ timestamps: true })
export class Shop {
  @Prop({ required: true, unique: true, ref: () => User })
  user: Ref<User>;

  @Prop({ ref: () => File, required: true, autopopulate: true })
  logo: Ref<File>;

  @Prop({ required: true })
  shop_name: string;

  @Prop({ required: true })
  description: string;
}

export const ShopModel = getModelForClass(Shop);
