// for auth
export enum Role {
  ADMIN = "ADMIN",
  SELLER = "SELLER",
  USER = "USER",
}

export enum TokenType {
  REFRESH = "refresh",
  ACCESS = "access",
}

export enum Strategies {
  LOCAL = "local",
  JWT = "jwt",
}
