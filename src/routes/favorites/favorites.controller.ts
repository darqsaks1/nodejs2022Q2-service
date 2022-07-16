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
import { TracksService } from './favorites.service';
import { CreateTrackDto } from './favorites/dto/favorites-track.dto';
import { ApiTags } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UpdateTrackDto } from './favorites/dto/update-track.dto';


@ApiTags('Track')
@Controller('track')
export class FavoritesController {
  constructor(private readonly trackService: TracksService) { }
  @ApiResponse({ status: 200, description: 'Server should answer with status code 200 and all users records' })
  @Get()
  findAll() {
    return this.trackService.findAll();
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
    if (!this.trackService.findOne(id)) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.trackService.findOne(id);

  }

  @ApiResponse({ status: 201, description: 'Server should answer with status code 201 and newly created record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if request body does not contain required fields.' })
  @Post()
  public async create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @ApiResponse({ status: 201, description: 'Server should answer with status code 200 and updated record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if userId is invalid(not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === userId doesnt exist' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    const validator = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    if (!validator) {
      throw new HttpException('Uuid is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!this.trackService.findOne(id)) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.trackService.update(id, updateTrackDto);
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
    if (!this.trackService.findOne(id)) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.trackService.remove(id);
  }
}
