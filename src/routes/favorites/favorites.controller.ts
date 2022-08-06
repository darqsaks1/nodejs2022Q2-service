import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';

import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }
  @Get()
  findAll(@Req() request: Request) {
    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    }
    return this.favoritesService.FavfindServcies();
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbumToFavourites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() request: Request
  ) {
    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    }
    else {
      return this.favoritesService.favAddAlbum(id);
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumToFavourites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() request: Request
  ) {
    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    } else {
      return this.favoritesService.favRemove(id, 'albums');
    }
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrackToFavourites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() request: Request
  ) {
    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    }
    else {
      return this.favoritesService.favAddTrack(id);
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackToFavourites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() request: Request
  ) {
    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    }
    else {
      return this.favoritesService.favRemove(id, 'tracks');
    }
  }
  @Post('artist/:id')
  @HttpCode(201)
  addArtistToFavourites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() request: Request

  ) {
    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    }
    else {
      return this.favoritesService.favAddArtist(id);
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistToFavourites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() request: Request

  ) {
    if (request.headers.authorization !== `Bearer ${process.env.BAERER_TOKEN}`) {
      throw new UnauthorizedException()
    } else {
      return this.favoritesService.favRemove(id, 'artists');
    }
  }

}
