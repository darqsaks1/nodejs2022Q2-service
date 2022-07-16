import { ApiProperty, } from '@nestjs/swagger';
import { IsNotEmpty, isPositive, } from 'class-validator';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
export class CreateArtistDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;

}
