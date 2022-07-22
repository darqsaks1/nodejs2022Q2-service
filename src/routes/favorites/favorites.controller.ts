import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }
  @Get()
  findAll() {
    return this.favoritesService.FavfindServcies();
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbumToFavourites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.favAddAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumToFavourites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.favRemoveAlbum(id);
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrackToFavourites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.favAddTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackToFavourites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.favRemoveTrack(id);
  }
  @Post('artist/:id')
  @HttpCode(201)
  addArtistToFavourites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.favAddArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistToFavourites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.favRemoveArtist(id);
  }

}
