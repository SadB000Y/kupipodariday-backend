import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Offer } from './entities/offer.entity';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { UsersModule } from '../users/users.module';
import { WishesModule } from '../wishes/wishes.module';

@Module(
  {
    controllers: [OffersController],
    imports: [TypeOrmModule.forFeature([Offer]), WishesModule, UsersModule],
    providers: [OffersService],
  }
)
export class OffersModule {}