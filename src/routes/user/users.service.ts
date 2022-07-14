import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './users/dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { User } from './users/entities/user.entity';
import { UpdatePasswordDto } from './users/dto/update-password.dto';
@Injectable()
export class UsersService {
  public users: User[] = [];
  public async create(createUserDto: CreateUserDto): Promise<User> {
    this.users.push({
      ...createUserDto,
      version: 1,
      createdAt: + new Date(),
      updatedAt: + new Date(),
      id: uuidv4()
    });
    const cloned = this.users.map(o => ({ ...o }));
    const clone = cloned.at(-1);
    clone.password = bcrypt.hashSync(clone.password, 10)
    console.log(cloned, this.users, 'THIS IS MY LOG')
    return clone;
  }

  findAll(): User[] {
    const hashedUsers = []
    this.users.forEach((item) => {
      const user = {
        ...item,
        password: bcrypt.hashSync(item.password, 10)
      };
      hashedUsers.push(user)
    })
    return hashedUsers;
  }

  findOne(id: string): User {
    const cloned = this.users.map(o => ({ ...o }));
    const finded = cloned.find((user) => user.id === id);
    finded.password = bcrypt.hashSync(finded.password, 10)
    return finded
  }

  findUpdate(id: string): User {

    const user = this.users.find((user) => user.id === id);
    return user
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const i = this.users.findIndex((user) => user.id === id);
    if (i === -1) return null;
    this.users[i] = {
      ...this.users[i],
      password: updatePasswordDto.newPassword,
      version: this.users[i].version += 1,
      updatedAt: +new Date()
    };
    const cloned = this.users.map(o => ({ ...o }));

    const clone = Object.assign({}, cloned[i]);
    clone.password = bcrypt.hashSync(clone.password, 10)
    return clone;
  }

  remove(id: string): User {
    const i = this.users.findIndex((user) => user.id === id);
    if (i === -1) return null;
    const user = this.users[i];
    this.users.splice(i, 1);
    const clone = Object.assign({}, user);
    clone.password = bcrypt.hashSync(clone.password, 10)
    return clone;
  }
}
