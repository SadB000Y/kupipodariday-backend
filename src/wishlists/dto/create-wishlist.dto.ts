import { IsArray } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { IsString } from 'class-validator';
import { IsUrl } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  image: string;

  @IsArray()
  @IsString({ each: true })
  itemsId: string[];

  @IsNotEmpty()
  @IsString()
  name: string;
}