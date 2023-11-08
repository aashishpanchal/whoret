export const Messages = {
  // token's message
  TOKEN_EXPIRED: "Token is expired",
  TOKEN_NOT_FOUND: "Token not Found",
  TOKEN_BLACKLISTED: "Token is blacklisted",
  TOKEN_TYPE_INVALID: "Token type is invalid",
  TOKEN_INVALID: "Token is invalid/maybe expired",
  TOKEN_USER_INVALID: "Token contained no recognizable user identification",
  // user's message
  USER_ID_INVALID: "User id invalid.",
  INVALID_CREDENTIALS: "Invalid credentials",
  USER_ACCOUNT_NOT_FOUND: "User account not found",
  USER_ACCOUNT_ALREADY_EXISTS: (label: string = "") =>
    `User account already exists ${label}`,
  USER_ACCOUNT_IS_BLOCKED: "User account is blocked",
  USER_ACCOUNT_NOT_VERIFIED: "User account is not verified",
  EMAIL_ALREADY_VERIFIED: "Email already verified.",
  PHONE_ALREADY_VERIFIED: "Phone number already verified.",
  INVALID_CODE: "Given code invalid.",
};
