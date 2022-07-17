import { ApiProperty, } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsString, IsOptional } from 'class-validator';

interface IUpdatePasswordDto {
    oldPassowrd: string;
    newPassword: string;  
}

export class UpdatePasswordDto implements IUpdatePasswordDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    oldPassowrd: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    newPassword: string;
}

