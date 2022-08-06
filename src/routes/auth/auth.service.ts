import { Injectable } from '@nestjs/common';
import { IUser } from '../../ts/users.interface';
import * as jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { getHash } from '../../../helpers';
import { FIRST_VERSION } from '../../ts/answers';
import { ITokens } from '../../ts/auth.interface';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  async authUser(user: {
    login: IUser['login'];
    password: IUser['password'];
  }): Promise<User> {
    return await prisma.user.create({
      data: {
        id: uuidv4(),
        login: user.login,
        password: await getHash(user.password),
        version: FIRST_VERSION,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }

  createToken(payload): ITokens {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH_KEY, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
