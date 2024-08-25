import { UserEntity } from "../../modules/user/entities/user.entity";
import { Request } from "express";

export interface AuthRequest extends Request {
  user: UserEntity;
}
