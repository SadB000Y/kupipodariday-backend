import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
import { JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigFactory implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>('jwt.secretKey'),
      signOptions: {
        expiresIn: this.configService.get<string>('jwt.tokenTimeLimit'),
      },
    };
  }
}