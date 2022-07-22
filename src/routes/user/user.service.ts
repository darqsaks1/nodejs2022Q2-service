import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../../prismaService/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { HTTP_ANSWERS, HTTP_CODES } from 'src/utils';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }
  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    return plainToInstance(User, user);
  }

  async findAllUser() {
    const all = await this.prisma.user.findMany();
    return all.map((user) => plainToInstance(User, user));
  }

  async findOneUser(id: string) {
    const finded = await this.prisma.user.findFirst({ where: { id } });
    if (!finded)
      throw new NotFoundException({
        statusCode: HTTP_CODES.NOT_FOUND,
        message: HTTP_ANSWERS.BAD_RESPONSE.USER.FIND.message,
        error: HTTP_ANSWERS.BAD_RESPONSE.USER.FIND.error,
      });

    return plainToInstance(User, finded);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const finded = await this.prisma.user.findFirst({ where: { id } });
    if (updateUserDto.oldPassword !== finded.password)
      throw new ForbiddenException({
        statusCode: HTTP_CODES.FORBIDDEN,
        message: HTTP_ANSWERS.BAD_RESPONSE.USER.UPDATE.message,
        error: HTTP_ANSWERS.BAD_RESPONSE.USER.UPDATE.error,
      });
    return plainToInstance(
      User,
      await this.prisma.user.update({
        where: { id },
        data: {
          password: updateUserDto.newPassword,
          version: { increment: 1 },
        },
      }),
    );
  }

  async removeUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
