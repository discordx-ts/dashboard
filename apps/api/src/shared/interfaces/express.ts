import { User } from "@workspace/repo";
import { Request } from "express";

export interface AuthRequest extends Request {
  user: User;
}
