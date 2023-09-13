import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateEventDTO {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  priority: string;
  @IsOptional()
  @IsString()
  description: string;
}
