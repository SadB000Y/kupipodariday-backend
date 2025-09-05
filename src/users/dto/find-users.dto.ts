import { IsNotEmpty } from 'class-validator';
import { IsString } from 'class-validator';

export class FindUsersDto {
  @IsNotEmpty()
  @IsString()
  query: string;
}