import { IsNumber } from "class-validator";

export class MembersQueryDto {
  @IsNumber()
  limit?: number;

  @IsNumber()
  after?: number;
}
