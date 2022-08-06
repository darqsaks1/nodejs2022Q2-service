import { Module } from '@nestjs/common';
import { FavoService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, FavoService, TracksService, ArtistsService],
})
export class AlbumsModule {}
