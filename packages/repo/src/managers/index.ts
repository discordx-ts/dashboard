import { container } from "tsyringe";

import { UserManager } from "./user.js";
import { WelcomeManager } from "./welcome.js";

export const users = container.resolve(UserManager);
export const welcomes = container.resolve(WelcomeManager);
