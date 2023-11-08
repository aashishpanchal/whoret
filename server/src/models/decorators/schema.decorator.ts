import { ModelOptions } from "@typegoose/typegoose";
import type { IModelOptions } from "@typegoose/typegoose/lib/types";

export const Schema = (options?: IModelOptions["schemaOptions"]) => {
  if (options) {
    let { timestamps } = options;

    if (timestamps === true) {
      timestamps = {
        createdAt: "created_at",
        updatedAt: "updated_at",
      };
    } else if (typeof timestamps === "object") {
      if (timestamps.createdAt === true) {
        timestamps.createdAt = "created_at";
      } else if (timestamps.updatedAt === true) {
        timestamps.updatedAt = "updated_at";
      }
    }

    return ModelOptions({ schemaOptions: { ...options, timestamps } });
  }

  return ModelOptions({ schemaOptions: options });
};
