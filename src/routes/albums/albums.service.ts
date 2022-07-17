import { Injectable } from '@nestjs/common';
import { CreateAlbumsDto } from './albums/dto/create-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './albums/entities/albums.entity';
import { UpdateAlbumsDto } from './albums/dto/update-album.dto';
import { InMemoryStore } from '../../data/data';
import { Track } from '../tracks/tracks/entities/track.entity';

@Injectable()
export class AlbumsService {
  constructor(private inMemoryStore: InMemoryStore) { }
  // public tracks: Album[] = [];
  public async create(createAlbumsDto: CreateAlbumsDto): Promise<Album> {
    const artist = this.inMemoryStore.artists.find((artist) => artist.id === createAlbumsDto.artistId);
    this.inMemoryStore.albums.push({
      ...createAlbumsDto,
      artistId: artist ? createAlbumsDto.artistId : null,
      id: uuidv4()
    });
    return this.inMemoryStore.albums.at(-1);
  }

  findAll(): Album[] {
    return this.inMemoryStore.albums;
  }

  findOne(id: string): Album {
    const finded = this.inMemoryStore.albums.find((user) => user.id === id);
    return finded
  }

  update(id: string, updateAlbumsDto: UpdateAlbumsDto): Album {
    const i = this.inMemoryStore.albums.findIndex((user) => user.id === id);
    const artist = this.inMemoryStore.artists.find((artist) => artist.id === updateAlbumsDto.artistId);

    if (i === -1) return null;
    this.inMemoryStore.albums[i] = {
      ...this.inMemoryStore.albums[i],
      artistId: artist ? updateAlbumsDto.artistId : null,
      name: updateAlbumsDto.name,
      year: updateAlbumsDto.year
    };
    return this.inMemoryStore.albums[i];
  }

  remove(id: string): Album {
    const i = this.inMemoryStore.albums.findIndex((user) => user.id === id);
    if (i === -1) return null;
    const user = this.inMemoryStore.albums[i];
    const findedInTrack: Track = this.inMemoryStore.tracks.find((album) => album.albumId === id);
    const indexOfFavs = this.inMemoryStore.favorites.albums.findIndex((album) => album.id === id);
    indexOfFavs && this.inMemoryStore.favorites.albums.splice(indexOfFavs, 1);
    findedInTrack.albumId = null
    const clone = Object.assign({}, user);
    this.inMemoryStore.albums.splice(i, 1);
    return clone;
  }
}
