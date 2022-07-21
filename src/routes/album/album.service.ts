import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isNull } from 'lodash';
import { FullyData } from '../../data/fullyData';
import { FavoritesService } from '../favorites/favorites.service';
import { PrismaService } from '../prisma/prisma.service';
import { TrackService } from '../track/track.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {

  private static db: FullyData;

  constructor(
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    private prisma: PrismaService,
  ) {
    AlbumService.db = new FullyData(Album);
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    isNull(createAlbumDto.artistId) && delete createAlbumDto.artistId;
    return this.prisma.album.create({
      data: {
        ...createAlbumDto,
      },
    });
  }

  async findAllAlbum() {
    return this.prisma.album.findMany();
  }

  async findOneAlbum(id: string) {
    const album = await this.prisma.album.findFirst({ where: { id } });

    if (!album)
      throw new NotFoundException({
        statusCode: 404,
        message: `Album with this ID was not found`,
        error: 'Not Found',
      });

    return album;
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.prisma.album.update({
      where: { id },
      data: { ...updateAlbumDto },
    });
  }

  async removeAlbum(id: string) {
    const tracks = await this.trackService.findAllTrack();

    for (const track of tracks) {
      if (track.albumId !== id) continue;

      this.trackService.updateTrack(track.id, { ...track, albumId: null });
    }

    this.favoritesService.removeAlbumToFavourites(id);
    return this.prisma.album.delete({ where: { id } });
  }
}
