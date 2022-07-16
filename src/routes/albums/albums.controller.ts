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
import { AlbumsService } from './albums.service';
import { UpdateAlbumsDto } from './albums/dto/update-album.dto';
import { ApiTags } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateAlbumsDto } from './albums/dto/create-album.dto';

@ApiTags('Album')
@Controller('Album')
export class AlbumController {
  constructor(private readonly albumService: AlbumsService) { }
  @ApiResponse({ status: 200, description: 'Server should answer with status code 200 and all users records' })
  @Get()
  findAll() {
    return this.albumService.findAll();
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
    if (!this.albumService.findOne(id)) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.albumService.findOne(id);

  }

  @ApiResponse({ status: 201, description: 'Server should answer with status code 201 and newly created record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if request body does not contain required fields.' })
  @Post()
  public async create(@Body() createAlbumsDto: CreateAlbumsDto) {
    return this.albumService.create(createAlbumsDto);
  }

  @ApiResponse({ status: 201, description: 'Server should answer with status code 200 and updated record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if userId is invalid(not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === userId doesnt exist' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateAlbumsDto) {
    const validator = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    if (!validator) {
      throw new HttpException('Uuid is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!this.albumService.findOne(id)) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.albumService.update(id, updateTrackDto);
  }

  @ApiResponse({ status: 204, description: 'Server should answer with status code 200 and updated record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if userId is invalid(not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === userId doesnt exist' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    const validator = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    if (!validator) {
      throw new HttpException('Uuid is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!this.albumService.findOne(id)) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.albumService.remove(id);
  }
}
