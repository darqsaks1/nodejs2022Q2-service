import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { FavoritesService } from '../favorites/favorites.service';
import { PrismaService } from '../../prismaService/prisma.service';

@Module({
  controllers: [TrackController],
  providers: [
    AlbumService,
    FavoritesService,
    PrismaService,
    TrackService,
    ArtistService,
  ],
})
export class TrackModule { }
