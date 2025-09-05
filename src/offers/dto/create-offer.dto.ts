import { IsBoolean } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { IsNumber } from 'class-validator';
import { IsPositive } from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsBoolean()
  @IsNotEmpty()
  hidden: boolean;

  @IsNotEmpty()
  @IsNumber()
  itemId: number;
}