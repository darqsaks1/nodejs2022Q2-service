import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IFavoritesResponse } from '../../ts/favorites.interface';
import { FavoService } from './favorites.service';
import { ITrack } from '../../ts/tracks.interface';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { IAlbum } from '../../ts/albums.interface';
import { IArtist } from '../../ts/artists.interface';
import { valitadeId } from '../../../helpers';
import { ANSWERS } from '../../ts/answers';
import { AuthSettings } from '../auth/dto/auth.guard';

@Controller('favs')
export class FavsContrl {
  private readonly logger: Logger = new Logger(FavsContrl.name);

  constructor(
    private readonly favServ: FavoService,
    private readonly trackService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) { }



  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthSettings)
  async addNewFavTrack(@Param('id') id: ITrack['id']): Promise<ITrack> {
    if (!valitadeId(id)) {
      this.logger.warn(ANSWERS.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const track: ITrack = await this.trackService.getTrackById(id);

    if (!track) {
      this.logger.warn(ANSWERS.UNPROCESSABLE_ENTITY.NOT_FOUND);
      throw new HttpException(
        ANSWERS.UNPROCESSABLE_ENTITY.NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.favServ.addNewFavTrack(track);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthSettings)
  async deleteNewFavTrack(@Param('id') id: ITrack['id']): Promise<void> {
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

    await this.favServ.deleteNewFavTrack(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthSettings)
  async createFavoritesAlbum(@Param('id') id: IAlbum['id']): Promise<IAlbum> {
    if (!valitadeId(id)) {
      this.logger.warn(ANSWERS.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const album: IAlbum = await this.albumsService.getAlbumById(id);

    if (!album) {
      this.logger.warn(ANSWERS.UNPROCESSABLE_ENTITY.NOT_FOUND);
      throw new HttpException(
        ANSWERS.UNPROCESSABLE_ENTITY.NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.favServ.createFavoritesAlbum(album);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthSettings)
  async deleteFavoritesAlbum(@Param('id') id: IAlbum['id']): Promise<void> {
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

    await this.favServ.deleteFavoriteAlbum(id);
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthSettings)
  async getAllFavorites(): Promise<IFavoritesResponse[]> {
    return await this.favServ.getAllFavorites();
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthSettings)
  async createFavArt(
    @Param('id') id: IArtist['id'],
  ): Promise<IArtist> {
    if (!valitadeId(id)) {
      this.logger.warn(ANSWERS.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist: IArtist = await this.artistsService.getArtistById(id);

    if (!artist) {
      this.logger.warn(ANSWERS.UNPROCESSABLE_ENTITY.NOT_FOUND);
      throw new HttpException(
        ANSWERS.UNPROCESSABLE_ENTITY.NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.favServ.createFavArt(artist);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthSettings)
  async deleteFavoritesArtist(@Param('id') id: IArtist['id']): Promise<void> {
    if (!valitadeId(id)) {
      this.logger.warn(ANSWERS.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist: IArtist = await this.artistsService.getArtistById(id);

    if (!artist) {
      this.logger.warn(ANSWERS.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        ANSWERS.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.favServ.deleteFavoriteArtist(id);
  }
}
