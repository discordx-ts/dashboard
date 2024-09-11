import { Injectable } from "@nestjs/common";
import "dotenv/config";

import { ConfigKeys } from "./config-keys.enum.js";

export { ConfigKeys };

@Injectable()
export class ConfigService {
  private readonly envConfig: Record<string, string | undefined>;

  constructor() {
    this.envConfig = process.env;

    // Validate environment variables
    Object.values(ConfigKeys).forEach((key) => {
      if (!this.envConfig[key]) {
        throw new Error(`Missing environment variable: ${key}`);
      }
    });
  }

  get(key: ConfigKeys): string {
    const value = this.envConfig[key];
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  }

  getNumber(key: ConfigKeys): number {
    const value = this.get(key);
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new Error(`Invalid number for environment variable: ${key}`);
    }
    return parsedValue;
  }
}
