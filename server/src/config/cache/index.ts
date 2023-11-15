import config from "@/config";
import logger from "@/common/logger";
import { Redis } from "ioredis";

export const redis: Redis = new Redis(config.getOrThrow("redis_uri"));

redis.on("connect", () => {
  logger.log(`RedisDB connected`);
});

redis.on("error", (error) => {
  logger.error(error);
  process.exit(1);
});
