import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { IResponseUser, IUser } from '../../ts/users.interface';
import { User } from '@prisma/client';
import { ANSWERS } from '../../ts/answers';
import { comparePassword } from '../../../helpers';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ITokens } from '../../ts/auth.interface';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async authUser(
    @Body(new ValidationPipe()) createUsers: CreateUserDto,
  ): Promise<IResponseUser> {
    const user: User = await this.authService.authUser(createUsers);

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: new Date(user.createdAt).valueOf(),
      updatedAt: new Date(user.updatedAt).valueOf(),
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(
    @Body(new ValidationPipe()) createUsers: CreateUserDto,
  ): Promise<ITokens> {
    const user: IUser = await this.usersService.getLoginUser(
      createUsers.login,
    );

    if (!user) {
      throw new HttpException(
        ANSWERS.BAD_REQUEST.NOT_FOUND,
        HttpStatus.FORBIDDEN,
      );
    }

    if (!(await comparePassword(createUsers.password, user.password))) {
      throw new HttpException(
        ANSWERS.FORBIDDEN.BAD_PASSWORD,
        HttpStatus.FORBIDDEN,
      );
    }

    const tokens: ITokens = this.authService.createToken({
      id: user.id,
      login: user.login,
    });

    if (tokens) {
      await this.usersService.refreshTokenU(
        user.id,
        tokens.refreshToken,
      );
    }

    return tokens;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async getRefreshToken(
    @Body(new ValidationPipe()) refreshToken: RefreshTokenDto,
  ): Promise<ITokens> {
    const user: IUser = await this.usersService.getByRefreshToken(
      refreshToken.refreshToken,
    );

    if (!user) {
      throw new HttpException(
        ANSWERS.BAD_REQUEST.NOT_FOUND,
        HttpStatus.FORBIDDEN,
      );
    }

    const tokens: ITokens = this.authService.createToken({
      id: user.id,
      login: user.login,
    });

    await this.usersService.refreshTokenU(
      user.id,
      tokens.refreshToken,
    );

    return tokens;
  }
}
