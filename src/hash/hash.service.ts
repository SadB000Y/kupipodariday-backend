import { compare } from 'bcrypt';
import { hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';

import { MAIN_CONST } from './constants';

@Injectable()
export class HashService {
  async compare(data: string, hash: string) {
    try {
      return await compare(data, hash);
    } catch {
      throw new InternalServerErrorException('Ошибка при проверке пароля');
    }
  }

  async hash(data: string) {
    try {
      return hash(data, MAIN_CONST);
    } catch {
      throw new InternalServerErrorException('Ошибка при хешировании пароля');
    }
  }
}