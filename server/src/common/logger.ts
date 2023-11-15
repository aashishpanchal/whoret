import config from "@/config";
import { Logger } from "@/utils/logger";

const logger = new Logger(config.get("app.name"));

export default logger;
