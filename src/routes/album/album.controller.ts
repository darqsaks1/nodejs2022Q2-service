import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Put,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { ApiResponse } from '@nestjs/swagger';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Request } from 'express';


@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) { }
  @ApiResponse({ status: 200, description: 'Server should answer with status code 200 and all users records' })
  @Get()
  async findAll(@Req() request: Request) {
    // if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
    //   throw new UnauthorizedException()
    // } else {
      return this.albumService.findAllAlbum();
    // }
  }
  @ApiResponse({ status: 200, description: 'Server should answer with status code 200 and and record with id === userId if it exists' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === userId doesnt exist' })
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    // @Req() request: Request
  ) {
    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    } else {
      return this.albumService.findOneAlbum(id);
    }
  }
  @ApiResponse({ status: 201, description: 'Server should answer with status code 201 and newly created record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if request body does not contain required fields.' })
  @Post()
  @HttpCode(201)
  async create(
    @Body() createAlbumDto: CreateAlbumDto,
    @Req() request: Request
  ) {
    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    } else {
      return this.albumService.createAlbum(createAlbumDto);
    }
  }
  @ApiResponse({ status: 201, description: 'Server should answer with status code 200 and updated record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if userId is invalid(not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === userId doesnt exist' })
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Req() request: Request
  ) {
    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    } else {
      await this.findOne(id, request);
      return this.albumService.updateAlbum(id, updateAlbumDto);
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
    } else {
      await this.findOne(id, request);
      return this.albumService.removeAlbum(id);
    }
  }
}
