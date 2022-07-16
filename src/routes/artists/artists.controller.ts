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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './artists/dto/create-artist.dto';
import { ApiTags } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UpdateArtistsDto } from './artists/dto/update-artist.dto';


@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistsService) { }
  @ApiResponse({ status: 200, description: 'Server should answer with status code 200 and all users records' })
  @Get()
  findAll() {
    return this.artistService.findAll();
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
    if (!this.artistService.findOne(id)) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.artistService.findOne(id);

  }

  @ApiResponse({ status: 201, description: 'Server should answer with status code 201 and newly created record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if request body does not contain required fields.' })
  @Post()
  public async create(@Body() createArtistsDto: CreateArtistDto) {
    return this.artistService.create(createArtistsDto);
  }

  @ApiResponse({ status: 201, description: 'Server should answer with status code 200 and updated record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if userId is invalid(not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === userId doesnt exist' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateArtistsDto) {
    const validator = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    if (!validator) {
      throw new HttpException('Uuid is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!this.artistService.findOne(id)) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.artistService.update(id, updateTrackDto);
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
    if (!this.artistService.findOne(id)) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.artistService.remove(id);
  }
}
