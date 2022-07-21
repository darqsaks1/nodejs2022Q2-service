import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { PrismaService } from '../prisma/prisma.service';
import { TrackService } from '../track/track.service';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  private static db: Favorite = {
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

  async addArtistToFavourites(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    if (!artist) throw new UnprocessableEntityException();

    console.log(await this.prisma.favorite.findMany());
    return { statusCode: 201, message: 'Added successfully' };
  }

  removeArtistToFavourites(id: string) {
    return FavoritesService.db.artists.delete(id);
  }

  async addAlbumToFavourites(id: string) {
    const album = await this.albumService.findOneAlbum(id);

    if (!album) throw new UnprocessableEntityException();

    FavoritesService.db.albums.add(id);
    return { statusCode: 201, message: 'Added successfully' };
  }

  removeAlbumToFavourites(id: string) {
    return FavoritesService.db.albums.delete(id);
  }

  async addTrackToFavourites(id: string) {
    const track = await this.trackService.findOneTrack(id);

    if (!track) throw new UnprocessableEntityException();

    FavoritesService.db.tracks.add(id);
    return { statusCode: 201, message: 'Added successfully' };
  }

  removeTrackToFavourites(id: string) {
    return FavoritesService.db.tracks.delete(id);
  }

  async findAll() {
    return {
      artists: await Promise.all(
        Array.from(FavoritesService.db.artists).map((artistId) =>
          this.artistService.findOneArtist(artistId),
        ),
      ),
      albums: await Promise.all(
        Array.from(FavoritesService.db.albums).map((albumId) =>
          this.albumService.findOneAlbum(albumId),
        ),
      ),
      tracks: await Promise.all(
        Array.from(FavoritesService.db.tracks).map((trackId) =>
          this.trackService.findOneTrack(trackId),
        ),
      ),
    };
  }
}
