import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesService } from '../favorites/favorites.service';
import { PrismaService } from '../../prismaService/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { HTTP_ANSWERS, HTTP_CODES } from 'src/utils';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    private prisma: PrismaService,
  ) { }
  async createTrack(createTrackDto: CreateTrackDto) {
    return this.prisma.track.create({ data: createTrackDto });
  }

  async findAllTrack() {
    return this.prisma.track.findMany();
  }

  async findOneTrack(id: string) {
    const track = await this.prisma.track.findFirst({ where: { id } });

    if (!track)
      throw new NotFoundException({
        statusCode: HTTP_CODES.NOT_FOUND,
        message: HTTP_ANSWERS.BAD_RESPONSE.TRACK.FIND.message,
        error: HTTP_ANSWERS.BAD_RESPONSE.TRACK.FIND.error,
      });

    return track;
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    return this.prisma.track.update({
      where: { id },
      data: { ...updateTrackDto },
    });
  }

  async removeTrack(id: string) {
    this.favoritesService.favRemove(id, 'tracks');
    return this.prisma.track.delete({ where: { id } });
  }
}
