import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalGuard } from './guards/local.guard';
import { RequestWithUser } from '../shared/types/request-with-user';
import { SensitiveDataInterceptor } from '../shared/interceptors/sensitive-data-interceptor';
import { UsersService } from '../users/users.service';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signin')
  @UseGuards(LocalGuard)
  signin(@Req() req: RequestWithUser) {
    return this.authService.auth(req.user);
  }

  @Post('signup')
  @UseInterceptors(SensitiveDataInterceptor)
  signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}