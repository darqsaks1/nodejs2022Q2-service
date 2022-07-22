import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { FavoritesService } from '../favorites/favorites.service';
import { PrismaService } from '../../prismaService/prisma.service';
import { TrackService } from '../track/track.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { HTTP_ANSWERS, HTTP_CODES } from 'src/utils';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    private prisma: PrismaService,
  ) { }

  async findOneArtist(id: string) {
    const finded = await this.prisma.artist.findFirst({ where: { id } });
    if (!finded)
      throw new NotFoundException({
        statusCode: HTTP_CODES.NOT_FOUND,
        message: HTTP_ANSWERS.BAD_RESPONSE.ARTIST.FIND.message,
        error: HTTP_ANSWERS.BAD_RESPONSE.ARTIST.FIND.error,
      });
    return finded;
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
  
  createArtist(createArtistDto: CreateArtistDto) {
    return this.prisma.artist.create({ data: createArtistDto });
  }

  findAllArtist() {
    return this.prisma.artist.findMany();
  }

  async removeArtist(id: string) {
    const findedAlbums = await this.albumService.findAllAlbum();
    const findedTracks = await this.trackService.findAllTrack();
    findedTracks.forEach(element => {
      if (element.id === id) {
        this.trackService.updateTrack(element.id, { ...element, artistId: null });
      }
    });
    findedAlbums.forEach(element => {
      if (element.id === id) {
        this.albumService.updateAlbum(element.id, { ...element, artistId: null });
      }
    });
    this.favoritesService.favRemoveArtist(id);
    return this.prisma.artist.delete({ where: { id } });
  }
}
