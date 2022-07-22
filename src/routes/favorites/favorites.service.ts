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
  ) {}

  async favAddArtist(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    if (!artist) throw new UnprocessableEntityException();

    console.log(await this.prisma.favorite.findMany());
    return { statusCode: 201, message: 'Added successfully' };
  }

  favRemoveArtist(id: string) {
    return FavoritesService.data.artists.delete(id);
  }

  async favAddAlbum(id: string) {
    const album = await this.albumService.findOneAlbum(id);

    if (!album) throw new UnprocessableEntityException();

    FavoritesService.data.albums.add(id);
    return { statusCode: 201, message: 'Added successfully' };
  }

  favRemoveAlbum(id: string) {
    return FavoritesService.data.albums.delete(id);
  }

  async favAddTrack(id: string) {
    const track = await this.trackService.findOneTrack(id);

    if (!track) throw new UnprocessableEntityException();

    FavoritesService.data.tracks.add(id);
    return { statusCode: 201, message: 'Added successfully' };
  }

  favRemoveTrack(id: string) {
    return FavoritesService.data.tracks.delete(id);
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
