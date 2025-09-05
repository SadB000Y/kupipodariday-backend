import { BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FindOneOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { UsersService } from '../users/users.service';
import { Wish } from '../wishes/entities/wish.entity';
import { WishesService } from '../wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    private wishesService: WishesService,
    private usersService: UsersService,
    private dataSource: DataSource,
  ) {}

  async create(createOfferDto: CreateOfferDto, userId: number): Promise<Offer> {
    const { amount, itemId } = createOfferDto;

    const user = await this.usersService.findOne(
      {
        relations: ['wishes', 'offers', 'wishlists'],
        where: { id: userId },
      }
  );

    const wish = await this.wishesService.findOne(
      {
        relations: ['owner', 'offers'],
        where: { id: itemId },
      }
  );

    const donationAndCurrentRaisedSum = wish.raised + amount;

    if (user.id === wish.owner.id) {
      throw new BadRequestException('Ошибка! Нельзя самому себе вносить');
    }

    if (wish.raised === wish.price) {
      throw new BadRequestException('Ошибка! Сюда уже не нужны деньги');
    }

    if (donationAndCurrentRaisedSum > wish.price) {
      throw new BadRequestException('Ошибка! Кто-то положили слишком много');
    }

    return await this.dataSource.transaction(async (manager) => {
      await manager.getRepository(Wish).update(itemId, {
        raised: donationAndCurrentRaisedSum,
      }
    );

        return await manager.getRepository(Offer).save(
          {
            ...createOfferDto,
            item: wish,
            user,
          }
        );
      }
    );
  }

  async findAll(): Promise<Offer[]> {
      return await this.offersRepository.find(
        {
        relations: ['user', 'item'],
      }
    );
  }

  async findOfferById(id: number): Promise<Offer> {
    return await this.findOne(
      { 
        relations: ['user', 'item'], where: { id } 
      }
    );
  }

  async findOne(options: FindOneOptions<Offer>): Promise<Offer> {
    const offer = await this.offersRepository.findOne(options);

    if (!offer) {
      throw new NotFoundException();
    }

    return offer;
  }
}