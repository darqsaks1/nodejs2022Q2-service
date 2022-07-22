import { Exclude, Transform } from 'class-transformer';
interface IUser {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;

}
export class User implements IUser {
  id: string;
  login: string;
  @Exclude()
  password: string;
  version: number;
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: Date;
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: Date;
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
