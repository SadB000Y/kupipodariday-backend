import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

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
