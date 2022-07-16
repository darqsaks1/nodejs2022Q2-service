import { ApiProperty, } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class UpdateArtistsDto {
    @IsOptional()
    @ApiProperty()
    name: string;
    @ApiProperty()
    @IsOptional()
    grammy: boolean
}

