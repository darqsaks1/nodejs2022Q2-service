import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Put,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Request } from 'express';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiBasicAuth, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
@ApiBasicAuth()
@ApiBearerAuth()
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) { }
  @ApiResponse({ status: 200, description: 'Server should answer with status code 200 and all records' })
  @ApiBearerAuth()
  @Get()
  async findAll(@Req() request: Request) {

    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    }
    else {
      return this.trackService.findAllTrack();
    }
  }
  @ApiResponse({ status: 200, description: 'Server should answer with status code 200 and and record with id === id if it exists' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === id doesnt exist' })
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() request: Request
  ) {
    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    }
    else {
      return this.trackService.findOneTrack(id);
    }
  }
  @ApiResponse({ status: 201, description: 'Server should answer with status code 201 and newly created record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if request body does not contain required fields.' })
  @Post()
  @HttpCode(201)
  create(
    @Body() createTrackDto: CreateTrackDto,
    @Req() request: Request
  ) {
    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    }
    else {
      return this.trackService.createTrack(createTrackDto);
    }
  }
  @ApiResponse({ status: 201, description: 'Server should answer with status code 200 and updated record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if  is invalid(not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === id doesnt exist' })
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
    @Req() request: Request
  ) {
    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    }
    else {
      await this.findOne(id, request);
      return this.trackService.updateTrack(id, updateTrackDto);
    }
  }
  @ApiResponse({ status: 204, description: 'Server should answer with status code 200 and updated record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if  is invalid(not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === id doesnt exist' })
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
      await this.findOne(id, request);
      return this.trackService.removeTrack(id);
    }

  }
}
