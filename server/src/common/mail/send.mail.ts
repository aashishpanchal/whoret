import logger from "@logger";
import config from "@/config";
import defaultsDeep from "lodash/defaultsDeep";
import { InternalServerError } from "@/utils/errors";
import { compileTemplate } from "@/utils/tem-compiler";
import { createTransport, SendMailOptions } from "nodemailer";

// interface and types
export interface ISendMailOptions extends SendMailOptions {
  context?: Record<string, any>;
  template?: string;
}

// create transporter instance
const transporter = createTransport({
  host: config.getOrThrow("mail.host"),
  port: config.getOrThrow("mail.port"),
  auth: {
    user: config.getOrThrow("mail.user"),
    pass: config.getOrThrow("mail.pass"),
  },
});

// compiler
transporter.use("compile", async (mail, callback) => {
  const { template, context } = mail.data as any;
  // if template is not empty, use the template to compile ejs template
  if (template) {
    try {
      mail.data.html = await compileTemplate(template, context);
    } catch (error) {
      logger.error(error);
      return callback(error);
    }
  }
  return callback();
});

export async function sendMail(sendMailOptions: ISendMailOptions) {
  const verify = await transporter.verify();
  // check connection configuration
  if (!verify)
    throw new InternalServerError("Failed to connect to mail server");
  const options = defaultsDeep(sendMailOptions, {
    from: config.getOrThrow("mail.from"),
  });
  logger.log("Sending mail to ", options.to);
  // after send mail, return the result
  return await transporter.sendMail(options);
}
