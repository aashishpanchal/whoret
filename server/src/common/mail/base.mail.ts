import config from "@/config";
import { sendMail, ISendMailOptions } from "./send.mail";

export abstract class BaseEmail {
  protected async getContext(options: Record<string, any> = {}) {
    const { req: request, user } = options;

    const context: Record<string, any> = options;

    if (request) {
      context.request = request;
      // set domain
      context.domain = request.protocol + "://" + request.get("host");
      // set user
      context.user = user || request.user;
    } else {
      // set user
      context.user = user;
    }

    // set site name
    context.appName = config.get("app.name");

    return context;
  }

  protected async sendTo(
    to: string,
    options: Omit<ISendMailOptions, "to"> = {}
  ) {
    try {
      return await sendMail({
        ...options,
        to,
      });
    } catch (error) {}
  }
}
