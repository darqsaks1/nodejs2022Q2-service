import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { PrismaService } from '../../prismaService/prisma.service'

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    ArtistService,
    AlbumService,
    TrackService,
    PrismaService,
  ],
})
export class FavoritesModule {}
