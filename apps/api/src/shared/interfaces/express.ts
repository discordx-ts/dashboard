import { Request } from "express";

import { UserModel } from "../../modules/user/models/user.model";

export interface AuthRequest extends Request {
  user: UserModel;
}
