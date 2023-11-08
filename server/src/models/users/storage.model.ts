import { User } from "./user.model";
import { Schema } from "../decorators";
import { Ref, Prop, getModelForClass } from "@typegoose/typegoose";

@Schema({ timestamps: true })
export class File {
  @Prop({ ref: () => User, required: true })
  user: Ref<User>;

  @Prop({ default: "0" })
  size: string;

  @Prop()
  name: string;

  @Prop({ require: true })
  url: string;
}

@Schema({ timestamps: true })
export class Storage {
  @Prop({ ref: () => User, unique: true, required: true })
  user: Ref<User>;

  @Prop({ ref: () => File, default: [] })
  file: Ref<File>[];

  @Prop({ default: "10gb" })
  limit: string;
}

export const FileModel = getModelForClass(File);

export const StorageModel = getModelForClass(Storage);
