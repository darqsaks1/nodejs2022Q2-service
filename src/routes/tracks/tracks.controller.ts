import { TracksService } from './tracks.service';
import { ITrack } from '../../ts/tracks.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  ValidationPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { valitadeId } from '../../../helpers';
import { ANSWERS } from '../../ts/answers';
import { CreateTrackDto } from './dto/create-track.dto';
import { ChangeTrackDto } from './dto/change-track.dto';
import { AuthSettings } from '../auth/dto/auth.guard';

@Controller('track')
export class TracksController {
  private readonly logger: Logger = new Logger(TracksController.name);

  constructor(private readonly trackService: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSettings)
  async getAllTracks(): Promise<ITrack[]> {
    return await this.trackService.getAllTracks();
  }

 

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthSettings)
  async createTrack(
    @Body(new ValidationPipe()) createTrack: CreateTrackDto,
  ): Promise<ITrack> {
    return await this.trackService.createTrack(createTrack);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSettings)
  async changeTrack(
    @Param('id') id: ITrack['id'],
    @Body(new ValidationPipe()) changeTrack: ChangeTrackDto,
  ): Promise<ITrack> {
    if (!valitadeId(id)) {
      this.logger.warn(ANSWERS.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const track: ITrack = await this.trackService.getTrackById(id);

    if (!track) {
      this.logger.warn(ANSWERS.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.trackService.changeTrack(id, changeTrack);
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSettings)
  async getTrackById(@Param('id') id: ITrack['id']): Promise<ITrack> {
    if (!valitadeId(id)) {
      this.logger.warn(ANSWERS.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }
    const track: ITrack = await this.trackService.getTrackById(id);

    if (!track) {
      this.logger.warn(ANSWERS.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return track;
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthSettings)
  async deleteTrack(@Param('id') id: ITrack['id']): Promise<void> {
    if (!valitadeId(id)) {
      this.logger.warn(ANSWERS.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const track: ITrack = await this.trackService.getTrackById(id);

    if (!track) {
      this.logger.warn(ANSWERS.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.trackService.deleteTrack(id);
    }
  }
}
