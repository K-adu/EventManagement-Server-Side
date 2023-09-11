import { IsString, MinLength } from 'class-validator';

export class CreateEventsDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  priority: string;
}
