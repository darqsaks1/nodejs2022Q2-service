import { ApiProperty, } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class UpdateAlbumsDto {
    @ApiProperty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsNumber()
    year: number;
    @ApiProperty()
    @IsString()
    artistId: string | null; // refers to Artist
}

