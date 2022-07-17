import { ApiProperty, } from '@nestjs/swagger';
import { IsNotEmpty, isPositive, } from 'class-validator';
import { IsString, IsOptional, IsNumber } from 'class-validator';
export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  artistId: string | null; // refers to Artist
  @ApiProperty()
  @IsString()
  @IsOptional()
  albumId: string | null; // refers to Album
  @ApiProperty()
  @IsNumber()
  duration: number; // integer number
}
