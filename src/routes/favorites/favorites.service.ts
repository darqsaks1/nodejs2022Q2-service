import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { PrismaService } from '../../prismaService/prisma.service';
import { TrackService } from '../track/track.service';
import { Favorite } from './entities/favorite.entity';
import { ADDED, HTTP_CODES } from 'src/utils';

@Injectable()
export class FavoritesService {
  private static data: Favorite = {
    artists: new Set(),
    albums: new Set(),
    tracks: new Set(),
  };

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    private prisma: PrismaService,
  ) { }

  async favAddAlbum(id: string) {
    const finded = await this.albumService.findOneAlbum(id);
    if (!finded) { 
      throw new UnprocessableEntityException() 
    };
    FavoritesService.data.albums.add(id);
    return { statusCode: HTTP_CODES.SUCSESS, message: ADDED };
  }
  async favAddArtist(id: string) {
    const finded = await this.prisma.artist.findFirst({ where: { id } });
    if (!finded) {
      throw new UnprocessableEntityException();
    }
    return { statusCode: HTTP_CODES.SUCSESS, message: ADDED };
  }
  async favAddTrack(id: string) {
    const finded = await this.trackService.findOneTrack(id);
    if (!finded) {
      throw new UnprocessableEntityException();
    }
    FavoritesService.data.tracks.add(id);
    return { statusCode: HTTP_CODES.SUCSESS, message: ADDED };
  }
  favRemove(id: string, service) {
    return FavoritesService.data[service].delete(id);
  }

  async FavfindServcies() {
    return {
      albums: await Promise.all(
        Array.from(FavoritesService.data.albums).map((albumId) =>
          this.albumService.findOneAlbum(albumId),
        ),
      ),
      tracks: await Promise.all(
        Array.from(FavoritesService.data.tracks).map((trackId) =>
          this.trackService.findOneTrack(trackId),
        ),
      ),
      artists: await Promise.all(
        Array.from(FavoritesService.data.artists).map((artistId) =>
          this.artistService.findOneArtist(artistId),
        ),
      ),
    };
  }
}
