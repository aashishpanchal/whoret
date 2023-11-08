declare namespace Jwt {
  export type JwtOptions = {
    exp: string;
    type: string;
    save?: boolean;
    algorithm?: jwt.Algorithm;
  };
}
