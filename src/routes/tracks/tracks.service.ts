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
    this.inMemoryStore.tracks.push({
      ...createTrackDto,
      artistId: createTrackDto.artistId === 'string' && null,
      albumId: createTrackDto.albumId === 'string' && null,
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
    this.inMemoryStore.tracks[i] = {
      ...this.inMemoryStore.tracks[i],
      name: updateTrackDto.name,
      duration: updateTrackDto.duration !== 0 && updateTrackDto.duration,
      artistId: updateTrackDto.artistId === 'string' && null,
      albumId: updateTrackDto.albumId === 'string' && null
    };
    return this.inMemoryStore.tracks[i];
  }

  remove(id: string): Track {
    const i = this.inMemoryStore.tracks.findIndex((user) => user.id === id);
    if (i === -1) return null;
    const user = this.inMemoryStore.tracks[i];
    const clone = Object.assign({}, user);
    this.inMemoryStore.tracks.splice(i, 1);
    return clone;
  }
}
