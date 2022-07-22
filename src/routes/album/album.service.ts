import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isNull } from 'lodash';
import { FavoritesService } from '../favorites/favorites.service';
import { PrismaService } from '../../prismaService/prisma.service';
import { TrackService } from '../track/track.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { HTTP_ANSWERS, HTTP_CODES } from 'src/utils';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    private prisma: PrismaService,
  ) { }

  async findAllAlbum() {
    return this.prisma.album.findMany();
  }

  async findOneAlbum(id: string) {
    const finded = await this.prisma.album.findFirst({
      where: { id },
      select: { artist: true },
    });
    if (!finded)
      throw new NotFoundException({
        statusCode: HTTP_CODES.NOT_FOUND,
        message: HTTP_ANSWERS.BAD_RESPONSE.ALBUM.FIND.message,
        error: HTTP_ANSWERS.BAD_RESPONSE.ALBUM.FIND.error,
      });
    return finded;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    isNull(createAlbumDto.artistId) && delete createAlbumDto.artistId;
    return this.prisma.album.create({
      data: {
        ...createAlbumDto,
      },
    });
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.prisma.album.update({
      where: { id },
      data: { ...updateAlbumDto },
    });
  }

  async removeAlbum(id: string) {
    const findedTracks = await this.trackService.findAllTrack();
    findedTracks.forEach(item => {
      if (item.id === id) {
        this.trackService.updateTrack(item.id, { ...item, albumId: null });
      }
    })
    this.favoritesService.favRemove(id, 'albums');
    return this.prisma.album.delete({ where: { id } });
  }
}
