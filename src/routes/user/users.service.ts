import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from './users/entities/user.entity';
@Injectable()
export class UsersService {
  private users: User[] = [];
  private idSeq = 0;

  public async create(createUserDto: CreateUserDto): Promise<User> {
    this.users.push({
      ...createUserDto,
      version: 1,
      createdAt: + new Date(),
      updatedAt: + new Date(),
      id: uuidv4()
    });
    return this.users.at(-1);
  }

  findAll(): User[] {
    console.log(this.users)
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id);
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const i = this.users.findIndex((user) => user.id);
    if (i === -1) return null;
    this.users[i] = {
      ...this.users[i],
      ...updateUserDto,
    };
    return this.users[i];
  }

  remove(id: number): User {
    const i = this.users.findIndex((user) => user.id);
    if (i === -1) return null;
    const user = this.users[i];
    this.users.splice(i, 1);
    return user;
  }
}
