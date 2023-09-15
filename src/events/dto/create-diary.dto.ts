import { IsString } from 'class-validator';

export class CreateDiaryDTO {
  @IsString()
  description: string;
}
