import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Length,
  MinLength,
} from 'class-validator';

export class emailDto {
  @IsEmail()
  @Length(32)
  email: string;
}
