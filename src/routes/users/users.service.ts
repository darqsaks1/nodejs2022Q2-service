import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IResponseUser, IUser } from '../../ts/users.interface';
import { FIRST_VERSION } from '../../ts/answers';
import { getHash } from '../../../helpers';
import { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async allUsers(): Promise<IResponseUser[]> {
    const users: User[] = await prisma.user.findMany();
    return users.map((user: User) => {
      return {
        id: user.id,
        login: user.login,
        version: user.version,
        createdAt: new Date(user.createdAt).valueOf(),
        updatedAt: new Date(user.updatedAt).valueOf(),
      };
    });
  }

  async getUserById(id: IUser['id']): Promise<IUser> {
    const user: User = await prisma.user.findFirst({
      where: { id: id },
    });

    if (!user) return null;

    return {
      id: user.id,
      login: user.login,
      password: user.password,
      version: user.version,
      createdAt: new Date(user.createdAt).valueOf(),
      updatedAt: new Date(user.updatedAt).valueOf(),
    };
  }

  async createUser(user: {
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
  async getLoginUser(login: IUser['login']): Promise<IUser> {
    const user: User = await prisma.user.findFirst({
      where: { login: login },
    });

    if (!user) return null;

    return {
      id: user.id,
      login: user.login,
      password: user.password,
      version: user.version,
      createdAt: new Date(user.createdAt).valueOf(),
      updatedAt: new Date(user.updatedAt).valueOf(),
    };
  }
  async changeUsersIds(
    id: IUser['id'],
    data: { oldPassword: IUser['password']; newPassword: IUser['password'] },
  ): Promise<IResponseUser> {
    const hashPassword = await getHash(data.newPassword);
    const updateUser: User = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hashPassword,
        version: { increment: FIRST_VERSION },
      },
    });

    return {
      id: updateUser.id,
      login: updateUser.login,
      version: updateUser.version,
      createdAt: new Date(updateUser.createdAt).valueOf(),
      updatedAt: new Date(updateUser.updatedAt).valueOf(),
    };
  }

  async deleteUser(id: IUser['id']): Promise<void> {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  async refreshTokenU(
    id: IUser['id'],
    refreshToken: string,
  ): Promise<void> {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });
  }

  async getByRefreshToken(refreshToken: string): Promise<IUser> {
    const user: User = await prisma.user.findFirst({
      where: {
        refreshToken: refreshToken ? refreshToken : null,
      },
    });

    if (!user) {
      return null;
    }
    return {
      id: user.id,
      login: user.login,
      password: user.password,
      version: user.version,
      createdAt: new Date(user.createdAt).valueOf(),
      updatedAt: new Date(user.updatedAt).valueOf(),
    };
  }
}
