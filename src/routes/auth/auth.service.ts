import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';

import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt'
import { ITokens } from './auth.interface';
import { InMemoryStore } from '../../data/auth';


@Injectable()
export class AuthService {
  constructor(private inMemoryStore: InMemoryStore) { }

  async signUp(obj) {
    const user = {
      id: uuidv4(),
      login: obj.login,
      password: bcrypt.hashSync(obj?.password, 10)
    }
    this.inMemoryStore.authUsers.push(user)
    return user
  }
  async login(obj) {
    console.log('work', obj)
    const accessToken = jwt.sign(obj, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
    process.env.BAERER_TOKEN = accessToken
    const finded = this.inMemoryStore.authUsers.find(user => user.login === obj.login)

    console.log(accessToken)
    const payload = {
      login: finded.login,
      userId: finded.id,
      BAERER_TOKEN: process.env.BAERER_TOKEN,
      TOKEN_EXPIRE_TIME: process.env.TOKEN_EXPIRE_TIME
    }
    // const user = {
    //   id: uuidv4(),
    //   login: obj.login,
    //   password: bcrypt.hashSync(obj?.password, 10)
    // }
    // this.inMemoryStore.authUsers.push(user)
    return payload
  }
  // generateTokens(payload): ITokens {
  //   const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
  //     expiresIn: process.env.TOKEN_EXPIRE_TIME,
  //   });
  //   const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH_KEY, {
  //     expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
  //   });

  //   return {
  //     accessToken,
  //     refreshToken,
  //   };
  // }
}
