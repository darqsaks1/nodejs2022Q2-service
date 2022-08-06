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
  @HttpCode(201)
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
  }

}
