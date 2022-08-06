import { Module } from '@nestjs/common';
import { FavoService } from './favorites.service';
import { FavsContrl } from './favorites.controller';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { ArtistsService } from '../artists/artists.service';

@Module({
  providers: [FavoService, AlbumsService, TracksService, ArtistsService],
  controllers: [FavsContrl],
})
export class FavoritesModule {}
