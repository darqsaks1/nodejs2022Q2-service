import { IsNotEmpty, IsString } from 'class-validator';
interface CreateUser {
  login: string,
  password: string
}
export class CreateUserDto implements CreateUser {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
