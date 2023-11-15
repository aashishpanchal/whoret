/// <reference path="ui.d.ts" />
/// <reference path="auth.d.ts" />

declare namespace API {
  export interface APIError {
    error: string;
    message: string;
    statusCode: number;
  }
}
