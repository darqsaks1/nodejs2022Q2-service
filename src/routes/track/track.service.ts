import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FullyData } from '../../data/fullyData';
import { FavoritesService } from '../favorites/favorites.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  private static db: FullyData;

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    private prisma: PrismaService,
  ) {
    TrackService.db = new FullyData(Track);
  }

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
        statusCode: 404,
        message: `Track with this ID was not found`,
        error: 'Not Found',
      });

    return track;
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    return this.prisma.track.update({
      where: { id },
      data: { ...updateTrackDto },
    });
  }

  async remove(id: string) {
    this.favoritesService.removeTrackToFavourites(id);
    return this.prisma.track.delete({ where: { id } });
  }
}
