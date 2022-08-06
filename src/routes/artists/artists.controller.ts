import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { valitadeId } from '../../../helpers';
import { ANSWERS } from '../../ts/answers';
import { ArtistsService } from './artists.service';
import { IArtist } from '../../ts/artists.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ChangeArtistDto } from './dto/change-artist.dto';
import { AuthSettings } from '../auth/dto/auth.guard';

@Controller('artist')
export class ArtistsController {
  private readonly logger: Logger = new Logger(ArtistsController.name);

  constructor(private readonly artistService: ArtistsService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSettings)
  async getAllArtist(): Promise<IArtist[]> {
    return this.artistService.getAllArtist();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSettings)


  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthSettings)
  async createArtist(
    @Body(new ValidationPipe()) createArtist: CreateArtistDto,
  ): Promise<IArtist> {
    return await this.artistService.createArtist(createArtist);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSettings)
  async changeArtist(
    @Param('id') id: IArtist['id'],
    @Body(new ValidationPipe()) changeArtis: ChangeArtistDto,
  ): Promise<IArtist> {
    if (!valitadeId(id)) {
      this.logger.warn(ANSWERS.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist: IArtist = await this.artistService.getArtistById(id);

    if (!artist) {
      this.logger.warn(ANSWERS.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.artistService.changeArtist(id, changeArtis);
  }
  async getArtistById(@Param('id') id: IArtist['id']): Promise<IArtist> {
    if (!valitadeId(id)) {
      this.logger.warn(ANSWERS.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }
    const artist: IArtist = await this.artistService.getArtistById(id);

    if (!artist) {
      this.logger.warn(ANSWERS.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return artist;
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthSettings)
  async deleteArtist(@Param('id') id: IArtist['id']): Promise<void> {
    if (!valitadeId(id)) {
      this.logger.warn(ANSWERS.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist: IArtist = await this.artistService.getArtistById(id);

    if (!artist) {
      this.logger.warn(ANSWERS.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.artistService.deleteArtist(id);
    }
  }
}
