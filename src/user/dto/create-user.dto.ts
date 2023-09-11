import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Length,
  MinLength,
  IsNumber,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  country: string;

  @IsNumber()
  age: number;

  @IsString()
  occupation: string;
}
