import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './artists/dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './artists/entities/artists.entity';
import { UpdateArtistsDto } from './artists/dto/update-artist.dto';
import { InMemoryStore } from '../../data/data';

@Injectable()
export class ArtistsService {
  constructor(private inMemoryStore: InMemoryStore) { }
  // public tracks: Artist[] = [];
  public async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    this.inMemoryStore.artists.push({
      ...createArtistDto,
      // artistId: createArtistDto.artistId === 'string' && null,
      // albumId: createArtistDto.albumId === 'string' && null,
      id: uuidv4()
    });
    return this.inMemoryStore.artists.at(-1);
  }

  findAll(): Artist[] {
    return this.inMemoryStore.artists;
  }

  findOne(id: string): Artist {
    const finded = this.inMemoryStore.artists.find((user) => user.id === id);
    return finded
  }

  update(id: string, updateArtistsDto: UpdateArtistsDto): Artist {
    const i = this.inMemoryStore.artists.findIndex((user) => user.id === id);
    if (i === -1) return null;
    this.inMemoryStore.artists[i] = {
      ...this.inMemoryStore.artists[i],
      name: updateArtistsDto.name,
      grammy: updateArtistsDto.grammy,
    };
    return this.inMemoryStore.artists[i];
  }

  remove(id: string): Artist {
    const i = this.inMemoryStore.artists.findIndex((user) => user.id === id);
    if (i === -1) return null;
    const user = this.inMemoryStore.artists[i];
    const clone = Object.assign({}, user);
    this.inMemoryStore.artists.splice(i, 1);
    return clone;
  }
}
