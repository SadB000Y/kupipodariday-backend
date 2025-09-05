import { IsEmail } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { IsOptional } from 'class-validator';
import { IsString } from 'class-validator';
import { IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  username: string;
}