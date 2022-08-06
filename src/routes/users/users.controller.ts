import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeUserDto } from './dto/change-user.dto';
import { IResponseUser, IUser } from '../../ts/users.interface';
import { ANSWERS } from '../../ts/answers';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { comparePassword, valitadeId } from '../../../helpers';
import { AuthSettings } from '../auth/dto/auth.guard';

@Controller('user')
export class UsersController {
  private readonly logger: Logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSettings)
  allUsers(): Promise<IResponseUser[]> {
    return this.usersService.allUsers();
  }

 

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthSettings)
  async createUser(
    @Body(new ValidationPipe()) createUsers: CreateUserDto,
  ): Promise<IResponseUser> {
    const user: User = await this.usersService.createUser(createUsers);

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: new Date(user.createdAt).valueOf(),
      updatedAt: new Date(user.updatedAt).valueOf(),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSettings)
  async changeUsersIds(
    @Param('id') id: IUser['id'],
    @Body(new ValidationPipe()) changeUsersIds: ChangeUserDto,
  ): Promise<IResponseUser> {
    if (!valitadeId(id)) {
      this.logger.warn(ANSWERS.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: IUser = await this.usersService.getUserById(id);

    if (!user) {
      this.logger.warn(ANSWERS.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!(await comparePassword(changeUsersIds.oldPassword, user.password))) {
      this.logger.warn(ANSWERS.FORBIDDEN.BAD_PASSWORD);
      throw new HttpException(
        ANSWERS.FORBIDDEN.BAD_PASSWORD,
        HttpStatus.FORBIDDEN,
      );
    }

    return this.usersService.changeUsersIds(id, changeUsersIds);
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSettings)
  async getUserById(@Param('id') id: IUser['id']): Promise<IResponseUser> {
    if (!valitadeId(id)) {
      this.logger.warn(ANSWERS.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user: IUser = await this.usersService.getUserById(id);

    if (!user) {
      this.logger.warn(ANSWERS.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthSettings)
  async deleteUser(@Param('id') id: IUser['id']) {
    if (!valitadeId(id)) {
      this.logger.warn(ANSWERS.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: IUser = await this.usersService.getUserById(id);

    if (!user) {
      this.logger.warn(ANSWERS.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.usersService.deleteUser(id);
    }
  }
}
