import { router } from "@/utils/routes";
import type { Request, Response } from "express";

export default class UserController {
  @router.get("me")
  async me(req: Request, res: Response) {
    res.send({ msg: "Aashish Panchal" });
  }

  @router.patch("me")
  async updateMe(req: Request, res: Response) {
    res.send({ msg: "User updated" });
  }
}
