import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdateWishlistDto {
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
