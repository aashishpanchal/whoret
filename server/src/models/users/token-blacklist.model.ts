import { User } from "./user.model";
import { Schema } from "../decorators";
import { Prop, Ref, getModelForClass } from "@typegoose/typegoose";

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
})
export class OutstandingToken {
  @Prop({ ref: () => User, required: true })
  user: Ref<User>;

  @Prop({ required: true, unique: true })
  jti: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  expires_at: Date;
}

@Schema({
  timestamps: {
    createdAt: "blacklisted_at",
    updatedAt: false,
  },
})
export class BlacklistedToken {
  @Prop({ ref: () => OutstandingToken, required: true })
  token: Ref<OutstandingToken>;
}

export const OutstandingTokenModel = getModelForClass(OutstandingToken);

export const BlacklistedTokenModel = getModelForClass(BlacklistedToken);
