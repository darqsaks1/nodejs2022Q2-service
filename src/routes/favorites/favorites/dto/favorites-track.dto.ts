import { ApiProperty, } from '@nestjs/swagger';
import { IsNotEmpty, isPositive, } from 'class-validator';
import { IsString, IsOptional, IsNumber } from 'class-validator';
export class CreateFavTrack {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  trackId: string;
}
