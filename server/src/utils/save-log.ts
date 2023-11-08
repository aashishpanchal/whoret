import fs from "node:fs";
import dayjs from "dayjs";
import path from "node:path";

export function saveLog(filename: string, body: string) {
  const filePath = path.join(process.cwd(), "logs");
  // check filepath is exit or not
  if (!fs.existsSync(filePath)) {
    // Create the log directory if it doesn't exist
    fs.mkdirSync(filePath);
  }
  fs.appendFileSync(
    path.join(filePath, filename),
    `[${dayjs().format("DD/MM/YYYY hh:mm:ss A")}] -> ${body}\n`
  );
}
