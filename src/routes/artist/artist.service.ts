import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { InMemoryDB } from 'src/db/InMemoryDB';
import { FavoritesService } from 'src/favorites/favorites.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrackService } from 'src/track/track.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  private static db: InMemoryDB<Artist>;

  constructor(
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    private prisma: PrismaService,
  ) {
    ArtistService.db = new InMemoryDB<Artist>(Artist);
  }

  create(createArtistDto: CreateArtistDto) {
    return this.prisma.artist.create({ data: createArtistDto });
  }

  findAll() {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });

    if (!artist)
      throw new NotFoundException({
        statusCode: 404,
        message: `Artist with this ID was not found`,
        error: 'Not Found',
      });

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.prisma.artist.update({
      where: { id },
      data: { ...updateArtistDto },
    });
  }

  async remove(id: string) {
    const albums = await this.albumService.findAll();
    const tracks = await this.trackService.findAll();

    for (const album of albums) {
      if (album.artistId !== id) continue;

      this.albumService.update(album.id, { ...album, artistId: null });
    }

    for (const track of tracks) {
      if (track.artistId !== id) continue;

      this.trackService.update(track.id, { ...track, artistId: null });
    }

    this.favoritesService.removeArtistToFavourites(id);
    return this.prisma.artist.delete({ where: { id } });
  }
}
