import { ModuleMessage } from "@workspace/database";
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class WelcomeGoodbyeDto
  implements Omit<ModuleMessage, "id" | "guildId">
{
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  welcomeMessage: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  goodbyeMessage: string;

  @IsBoolean()
  isWelcomeEnabled: boolean;

  @IsBoolean()
  isGoodbyeEnabled: boolean;
}
