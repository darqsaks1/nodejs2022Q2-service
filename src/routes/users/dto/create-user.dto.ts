import { IsNotEmpty, IsString, Length } from 'class-validator';
import { PASSWORD_LENGTH } from '../../../ts/answers';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @Length(PASSWORD_LENGTH)
  @IsNotEmpty()
  password: string;
}
