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
import { AlbumsService } from './albums.service';
import { IAlbum } from '../../ts/albums.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ChangeAlbumDto } from './dto/change-album.dto';
import { FavoService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { IArtist } from '../../ts/artists.interface';
import { ArtistsService } from '../artists/artists.service';
import { valitadeId } from '../../../helpers';
import { ANSWERS } from '../../ts/answers';
import { AuthSettings } from '../auth/dto/auth.guard';

@Controller('album')
export class AlbumsController {
  private readonly logger: Logger = new Logger(AlbumsController.name);

  constructor(
    private readonly albumsService: AlbumsService,
    private readonly favServ: FavoService,
    private readonly trackService: TracksService,
    private readonly artistService: ArtistsService,
  ) { }
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSettings)
  async changeAlbum(
    @Param('id') id: IAlbum['id'],
    @Body(new ValidationPipe()) changeAlbums: ChangeAlbumDto,
  ): Promise<IAlbum> {
    if (!valitadeId(id)) {
      this.logger.warn(ANSWERS.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const album: IAlbum = await this.albumsService.getAlbumById(id);

    if (!album) {
      this.logger.warn(ANSWERS.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const artis: IArtist = await this.artistService.getArtistById(
      changeAlbums.artistId,
    );

    if (!artis) {
      this.logger.warn(ANSWERS.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.albumsService.changeAlbum(id, changeAlbums);
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSettings)
  async getAlbumById(@Param('id') id: IAlbum['id']): Promise<IAlbum> {
    if (!valitadeId(id)) {
      this.logger.warn(ANSWERS.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }
    const album: IAlbum = await this.albumsService.getAlbumById(id);

    if (!album) {
      this.logger.warn(ANSWERS.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return album;
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSettings)
  async getAllAlbums(): Promise<IAlbum[]> {
    return await this.albumsService.getAllAlbums();
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthSettings)
  async deleteAlbum(@Param('id') id: IAlbum['id']): Promise<void> {
    if (!valitadeId(id)) {
      this.logger.warn(ANSWERS.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const album: IAlbum = await this.albumsService.getAlbumById(id);

    if (!album) {
      this.logger.warn(ANSWERS.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.albumsService.deleteAlbum(id);
    }
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthSettings)
  async createAlbum(
    @Body(new ValidationPipe()) createAlbum: CreateAlbumDto,
  ): Promise<IAlbum> {
    return await this.albumsService.createAlbum(createAlbum);
  }
}
