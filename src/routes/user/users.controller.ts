import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UpdatePasswordDto } from './users/dto/update-password.dto';
@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiResponse({ status: 200, description: 'Server should answer with status code 200 and all users records' })
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Server should answer with status code 200 and and record with id === userId if it exists' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === userId doesnt exist' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    const validator = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    if (!validator) {
      throw new HttpException('Uuid is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!this.usersService.findOne(id)) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.usersService.findOne(id);

  }

  @ApiResponse({ status: 201, description: 'Server should answer with status code 201 and newly created record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if request body does not contain required fields.' })
  @Post()
  public async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiResponse({ status: 201, description: 'Server should answer with status code 200 and updated record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if userId is invalid(not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === userId doesnt exist' })
  @ApiResponse({ status: 403, description: 'Server should answer with status code 403 and corresponding message if oldPassowrd is wrong' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    const validator = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    if (!validator) {
      throw new HttpException('Uuid is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!this.usersService.findOne(id)) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    if (updatePasswordDto.oldPassowrd !== this.usersService.findUpdate(id).password) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }
    return this.usersService.update(id, updatePasswordDto);
  }
  @ApiResponse({ status: 204, description: 'Server should answer with status code 200 and updated record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if userId is invalid(not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === userId doesnt exist' })
  @ApiResponse({ status: 403, description: 'Server should answer with status code 403 and corresponding message if oldPassowrd is wrong' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    const validator = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    if (!validator) {
      throw new HttpException('Uuid is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!this.usersService.findOne(id)) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.usersService.remove(id);
  }
}
