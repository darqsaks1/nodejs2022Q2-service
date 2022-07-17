import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './tracks/dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './tracks/entities/track.entity';
import { UpdateTrackDto } from './tracks/dto/update-track.dto';
import { InMemoryStore } from '../../data/data';

@Injectable()
export class TracksService {
  constructor(private inMemoryStore: InMemoryStore) { }
  // public tracks: Track[] = [];
  public async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const artist = this.inMemoryStore.artists.find((artist) => artist.id === createTrackDto.artistId);
    const album = this.inMemoryStore.albums.find((album) => album.id === createTrackDto.albumId);

    this.inMemoryStore.tracks.push({
      ...createTrackDto,
      artistId: artist ? createTrackDto.artistId : null,
      albumId: album ? createTrackDto.albumId : null,
      id: uuidv4()
    });
    return this.inMemoryStore.tracks.at(-1);
  }

  findAll(): Track[] {
    return this.inMemoryStore.tracks;
  }

  findOne(id: string): Track {
    const finded = this.inMemoryStore.tracks.find((user) => user.id === id);
    return finded
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const i = this.inMemoryStore.tracks.findIndex((user) => user.id === id);
    if (i === -1) return null;
    const artist = this.inMemoryStore.artists.find((artist) => artist.id === updateTrackDto.artistId);
    const album = this.inMemoryStore.albums.find((album) => album.id === updateTrackDto.albumId);
    this.inMemoryStore.tracks[i] = {
      ...this.inMemoryStore.tracks[i],
      name: updateTrackDto.name,
      duration: updateTrackDto.duration !== 0 && updateTrackDto.duration,
      artistId: artist ? updateTrackDto.artistId : null,
      albumId: album ? updateTrackDto.albumId : null,
    };
    return this.inMemoryStore.tracks[i];
  }

  remove(id: string): Track {
    const i = this.inMemoryStore.tracks.findIndex((user) => user.id === id);
    if (i === -1) return null;
    const user = this.inMemoryStore.tracks[i];
    const indexOfFavs = this.inMemoryStore.favorites.tracks.findIndex((track) => track.id === id);
    indexOfFavs && this.inMemoryStore.favorites.tracks.splice(indexOfFavs, 1);
    const clone = Object.assign({}, user);
    this.inMemoryStore.tracks.splice(i, 1);
    return clone;
  }
}
