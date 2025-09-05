import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';

import { TJwtPayload } from '../types/jwt-payload';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configSrc: ConfigService,
    private usersService: UsersService,
  ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: configSrc.get<string>('JWT_SECRET_KEY') ?? 'default_secret',
      }
  );
  }

  async validate({ sub }: TJwtPayload) {
    const user = await this.usersService.findById(sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}