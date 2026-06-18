import {
  IsEmail,
  IsEnum,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { UserRole } from '../user.entity';

export class CreateUserDto {
  @IsString()
  @Length(20, 60)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 16)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
  password: string;

  @IsString()
  @Length(1, 400)
  address: string;

  @IsEnum(UserRole)
  role: UserRole;
}