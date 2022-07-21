import { IsNotEmpty, IsString } from 'class-validator';
interface updateDto {
  oldPassword: string,
  newPassword: string
}
export class UpdateUserDto implements updateDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
