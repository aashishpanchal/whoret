import config from "@/config";
import mongoose from "mongoose";
import logger from "@/common/logger";
import { formatPlugin } from "./plugins";

// add global plugins
mongoose.plugin(formatPlugin);
mongoose.plugin(require("mongoose-autopopulate"));

// connect to database
async function connectDB() {
  // connection start
  try {
    const instance = await mongoose.connect(config.getOrThrow("database_uri"), {
      autoIndex: true,
    });
    // logs
    logger.log(`MongoDB connected`);
    // on exit to close mongodb server
    process.on("SIGTERM", () => {
      instance.connection.close();
      process.exit(1);
    });
  } catch (error) {
    // handle error
    logger.error(error);
    process.exit(1);
  }
}

export default connectDB;
