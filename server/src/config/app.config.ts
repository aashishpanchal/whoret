export function appConfig() {
  const secret = process.env["SECRET"];

  const node_env = process.env["NODE_ENV"] || "development";

  const is_dev = node_env === "development";

  return {
    app: {
      is_dev,
      secret,
      node_env,
      name: process.env["NAME"],
      host: process.env["HOST"],
      client: process.env["CLIENT"],
      port: Number(process.env["PORT"]),
    },
    database_uri: process.env["DATABASE_URI"],
    redis_uri: process.env["REDIS_URI"],
    jwt: {
      secret,
      access_exp: process.env["JWT_ACCESS_EXP"],
      refresh_exp: process.env["JWT_REFRESH_EXP"],
    },
    mail: {
      host: process.env["MAIL_HOST"],
      port: Number(process.env["MAIL_PORT"]),
      user: process.env["MAIL_USER"],
      pass: process.env["MAIL_PASS"],
      from: process.env["MAIL_FROM"],
    },
    twilio: {
      from: process.env["TWILIO_FROM"],
      account_sid: process.env["TWILIO_ACCOUNT_SID"],
      auth_token: process.env["TWILIO_AUTH_TOKEN"],
    },
    code_exp: process.env.OTP_EXP || "1m",
    code_digits: Number(process.env.OTP_DIGITS || "6"),
  };
}
