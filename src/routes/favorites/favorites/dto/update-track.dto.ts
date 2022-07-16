import { ApiProperty, } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateTrackDto {
    @IsOptional()
    @ApiProperty()
    name: string;
    @ApiProperty()
    @IsOptional()
    artistId: string | null;
    @ApiProperty()
    @IsOptional()
    albumId: string | null;
    @ApiProperty()
    @IsOptional()
    duration: number;

}

