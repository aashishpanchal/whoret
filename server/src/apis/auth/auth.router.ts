import passport from "passport";
import { Strategies } from "@/constants";
import { getRouterForClass } from "@/utils/routes";
import { JwtStrategy, LocalStrategy } from "./strategies";
import { TokenController } from "./controllers/token.controller";
import { AuthController } from "./controllers/auth.controller";

// initialize passport strategies
passport.use(Strategies.JWT, JwtStrategy);
passport.use(Strategies.LOCAL, LocalStrategy);

// create router of AuthController
export default getRouterForClass(AuthController, TokenController);
