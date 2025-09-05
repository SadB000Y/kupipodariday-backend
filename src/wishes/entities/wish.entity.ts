import { Column } from 'typeorm';
import { Entity } from 'typeorm';
import { IsNumber } from 'class-validator';
import { IsUrl } from 'class-validator';
import { Length } from 'class-validator';
import { ManyToOne } from 'typeorm';
import { OneToMany } from 'typeorm';

import { Offer } from '../../offers/entities/offer.entity';

import { BaseEntity } from '../../shared/base.entity';

import { User } from '../../users/entities/user.entity';

@Entity()
export class Wish extends BaseEntity {
  @Column({ default: 0, type: 'int' })
  copied: number;

  @Column({ length: 1024 })
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @Length(1, 250)
  name: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column({
    precision: 10,
    scale: 2,
    transformer: {
      from: (value: string) => parseFloat(value),
      to: (value: number) => value,
    },
    type: 'decimal',
  })
  @IsNumber()
  price: number;

  @Column({
    default: 0,
    precision: 10,
    scale: 2,
    transformer: {
      from: (value: string) => parseFloat(value),
      to: (value: number) => value,
    },
    type: 'decimal',
  })
  @IsNumber()
  raised: number;
}