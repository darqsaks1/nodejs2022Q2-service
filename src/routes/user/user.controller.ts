import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  Req,
  ParseUUIDPipe,
  HttpCode,
  UnauthorizedException
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NOT_EXIST } from '../../utils/index';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @ApiResponse({ status: 200, description: 'Server should answer with status code 200 and all users records' })
  @Get()
  findAll(@Req() request: Request) {
    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    }
    else {
      return this.userService.findAllUser();
    }
  }
  @ApiResponse({ status: 201, description: 'Server should answer with status code 201 and newly created record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if request body does not contain required fields.' })
  @Post()
  @HttpCode(201)
  create(
    @Body() createUserDto: CreateUserDto,
    @Req() request: Request
  ) {
    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    }
    else {
      return this.userService.create(createUserDto);
    }
  }
  @ApiResponse({ status: 200, description: 'Server should answer with status code 200 and and record with id === userId if it exists' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === userId doesnt exist' })
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() request: Request
  ) {
    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    }
    else {
      return this.userService.findOneUser(id);
    }
  }
  @ApiResponse({ status: 201, description: 'Server should answer with status code 200 and updated record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if userId is invalid(not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === userId doesnt exist' })
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: Request
  ) {
    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    }
    else {
      await this.findOne(id, request);
      return this.userService.updateUser(id, updateUserDto);
    }
  }
  @ApiResponse({ status: 204, description: 'Server should answer with status code 200 and updated record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if userId is invalid(not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === userId doesnt exist' })
  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() request: Request
  ) {
    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    }
    else {
      const finded = await this.findOne(id, request);
      if (!finded) {
        throw new HttpException(
          NOT_EXIST,
          HttpStatus.NOT_FOUND,
        );
      } else {
        return this.userService.removeUser(id);
      }
    }
  }
}
