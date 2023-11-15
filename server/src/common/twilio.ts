import config from "@/config";
import { saveLog } from "@/utils/save-log";
import { Twilio, ClientOpts } from "twilio";

// client of twilio
export const client = createTwilioClient({ lazyLoading: true });

// send sms func
export async function sendMsg(
  to: string,
  body: string,
  from: string = config.getOrThrow("twilio.from")
) {
  const isDev = config.get("app.is_dev");
  // if is dev, message save in logs file
  if (isDev) {
    saveLog("sms.log", `"${to}"\n${body}`);
    return Promise.resolve();
  }

  return await client.messages.create({
    body,
    from,
    to,
  });
}

// create twilio client
function createTwilioClient(options?: ClientOpts): Twilio {
  const accountSid = config.getOrThrow("twilio.account_sid");
  const authToken = config.getOrThrow("twilio.auth_token");

  return new Twilio(accountSid, authToken, options);
}
