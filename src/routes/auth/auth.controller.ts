import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt'

import { ITokens } from './auth.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { InMemoryStore } from '../../data/auth';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private inMemory: InMemoryStore
  ) { }

  @Post('signup')
  @HttpCode(200)
  public async create(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }


  @Post('login')
  @HttpCode(200)
  public async login(@Body() createUserDto: CreateUserDto) {
    const users = this.inMemory.authUsers
    const finded = users.find(user => user.login === createUserDto.login)
    if (finded) {
      const match = await bcrypt.compare(createUserDto.password, finded.password);
      if (match) {
        return this.authService.login(createUserDto);
      }
    }
    // return this.authService.login(createUserDto);
  }
  //     return {
  //   id: user.id,
  //   login: user.login,
  //   version: user.version,
  //   createdAt: new Date(user.createdAt).valueOf(),
  //   updatedAt: new Date(user.updatedAt).valueOf(),
  // };
  //   }

  // @Post('login')
  // @HttpCode(HttpStatus.OK)
  // async loginUser(
  //     @Body(new ValidationPipe()) createUsers: CreateUserDto,
  //   ): Promise < ITokens > {
  //   const user: IUser = await this.usersService.getUserByLogin(
  //     createUsers.login,
  //   );

  //   if(!user) {
  //     throw new HttpException(
  //       EXCEPTION.BAD_REQUEST.NOT_FOUND,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }

  //     if(!(await comparePassword(createUsers.password, user.password))) {
  //   throw new HttpException(
  //     EXCEPTION.FORBIDDEN.BAD_PASSWORD,
  //     HttpStatus.FORBIDDEN,
  //   );
  // }

  // return this.authService.generateTokens({
  //   id: user.id,
  //   login: user.login,
  // });
  //   }
}
