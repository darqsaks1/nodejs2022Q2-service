import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';
import { PrismaService } from '../../prismaService/prisma.service';

@Module({
  controllers: [ArtistController],
  providers: [
    FavoritesService,
    PrismaService,
    ArtistService,
    AlbumService,
    TrackService,
  ],
})
export class ArtistModule { }
