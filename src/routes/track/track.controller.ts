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
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) { }
  @ApiResponse({ status: 200, description: 'Server should answer with status code 200 and all records' })
  @Get()
  findAll() {
    return this.trackService.findAllTrack();
  }
  @ApiResponse({ status: 200, description: 'Server should answer with status code 200 and and record with id === id if it exists' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === id doesnt exist' })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.findOneTrack(id);
  }
  @ApiResponse({ status: 201, description: 'Server should answer with status code 201 and newly created record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if request body does not contain required fields.' })
  @Post()
  @HttpCode(201)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }
  @ApiResponse({ status: 201, description: 'Server should answer with status code 200 and updated record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if  is invalid(not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === id doesnt exist' })
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    await this.findOne(id);
    return this.trackService.updateTrack(id, updateTrackDto);
  }
  @ApiResponse({ status: 204, description: 'Server should answer with status code 200 and updated record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if  is invalid(not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === id doesnt exist' })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    await this.findOne(id);
    return this.trackService.removeTrack(id);
  }
}
