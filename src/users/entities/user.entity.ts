/* Refactored mirror of kupipodariday-backend-main/src/users/entities/user.entity.ts. Public API preserved; implementation restyled. */

import { Column } from 'typeorm';
import { Entity } from 'typeorm';
import { IsEmail } from 'class-validator';
import { IsUrl } from 'class-validator';
import { Length } from 'class-validator';
import { OneToMany } from 'typeorm';

import { BaseEntity } from '../../shared/base.entity';
import { DEFAULT_USER_VALUES } from '../constants/default-user-values';
import { Offer } from '../../offers/entities/offer.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ default: DEFAULT_USER_VALUES.ABOUT })
  @Length(2, 200)
  about: string;

  @Column({ default: DEFAULT_USER_VALUES.AVATAR })
  @IsUrl()
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @Column()
  password: string;

  @Column({ unique: true })
  @Length(2, 30)
  username: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}