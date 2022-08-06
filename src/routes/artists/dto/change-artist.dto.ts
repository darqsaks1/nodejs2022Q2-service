import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ChangeArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
