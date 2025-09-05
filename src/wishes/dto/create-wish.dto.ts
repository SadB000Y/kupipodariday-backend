import { IsNotEmpty } from 'class-validator';
import { IsNumber } from 'class-validator';
import { IsPositive } from 'class-validator';
import { IsString } from 'class-validator';
import { IsUrl } from 'class-validator';
import { MaxLength } from 'class-validator';

export class CreateWishDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  link: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;
}