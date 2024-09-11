import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class WelcomeDto {
  @IsString()
  @IsNotEmpty()
  channelId: string;

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
