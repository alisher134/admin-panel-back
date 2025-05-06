import { IsOptional, IsString } from "class-validator";

export class CreateRequestDto {
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  cve: string;

  @IsOptional()
  @IsString()
  screenshot: string;
}
