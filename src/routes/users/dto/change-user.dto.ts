import { IsNotEmpty, IsString, Length } from 'class-validator';
import { PASSWORD_LENGTH } from '../../../ts/answers';

export class ChangeUserDto {
  @IsString()
  @Length(PASSWORD_LENGTH)
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @Length(PASSWORD_LENGTH)
  @IsNotEmpty()
  newPassword: string;
}
