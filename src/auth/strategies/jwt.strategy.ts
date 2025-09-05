import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../../users/users.service';
import { TJwtPayload } from '../types/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configSrc: ConfigService,
    private usersSrc: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configSrc.get<string>('JWT_SECRET_KEY') ?? 'default_secret',
    });
  }

  async validate({ sub }: TJwtPayload) {
    const user = await this.usersSrc.findById(sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
