import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryStore } from 'src/data/data';

@Module({
  controllers: [UsersController],
  providers: [UsersService, InMemoryStore],
})
export class UsersModule { }
