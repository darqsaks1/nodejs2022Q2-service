import { ApiProperty, } from '@nestjs/swagger';
import { IsNotEmpty, } from 'class-validator';
import { IsString, IsNumber, } from 'class-validator';
export class CreateAlbumsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNumber()
  year: number;
  @ApiProperty()
  @IsString()
  artistId: string | null; // refers to Artist
}
