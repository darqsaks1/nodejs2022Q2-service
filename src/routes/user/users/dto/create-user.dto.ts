import { ApiProperty, } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsString, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
