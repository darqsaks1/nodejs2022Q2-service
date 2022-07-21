import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { FullyData } from '../../data/fullyData';
import { FavoritesService } from '../favorites/favorites.service';
import { PrismaService } from '../prisma/prisma.service';
import { TrackService } from '../track/track.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  private static db: FullyData;

  constructor(
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    private prisma: PrismaService,
  ) {
    ArtistService.db = new FullyData(Artist);
  }

  createArtist(createArtistDto: CreateArtistDto) {
    return this.prisma.artist.create({ data: createArtistDto });
  }

  findAllArtist() {
    return this.prisma.artist.findMany();
  }

  async findOneArtist(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });

    if (!artist)
      throw new NotFoundException({
        statusCode: 404,
        message: `Artist with this ID was not found`,
        error: 'Not Found',
      });

    return artist;
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    return this.prisma.artist.update({
      where: { id },
      data: {
        name: updateArtistDto.name,
        grammy: updateArtistDto.grammy
      },
    });
  }

  async removeArtist(id: string) {
    const albums = await this.albumService.findAllAlbum();
    const tracks = await this.trackService.findAllTrack();

    for (const album of albums) {
      if (album.artistId !== id) continue;

      this.albumService.updateAlbum(album.id, { ...album, artistId: null });
    }

    for (const track of tracks) {
      if (track.artistId !== id) continue;

      this.trackService.updateTrack(track.id, { ...track, artistId: null });
    }

    this.favoritesService.removeArtistToFavourites(id);
    return this.prisma.artist.delete({ where: { id } });
  }
}
