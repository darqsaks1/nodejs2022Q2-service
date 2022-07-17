import { Injectable } from '@nestjs/common';
import { CreateFavTrack } from './favorites/dto/favorites-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { FavoritesRepsonse } from './favorites/entities/favorites.entity';
import { UpdateTrackDto } from './favorites/dto/update-track.dto';
import { InMemoryStore } from '../../data/data';

@Injectable()
export class FavoritesService {
  constructor(private inMemoryStore: InMemoryStore) { }
  // // public tracks: Track[] = [];
  // public async create(createTrackDto: CreateTrackDto): Promise<FavoritesRepsonse> {
  //   const artist = this.inMemoryStore.artists.find((artist) => artist.id === createTrackDto.artistId);
  //   const album = this.inMemoryStore.albums.find((album) => album.id === createTrackDto.albumId);

  //   this.inMemoryStore.tracks.push({
  //     ...createTrackDto,
  //     artistId: artist ? createTrackDto.artistId : null,
  //     albumId: album ? createTrackDto.albumId : null,
  //     id: uuidv4()
  //   });
  //   return this.inMemoryStore.tracks.at(-1);
  // }

  findAll() {
    return this.inMemoryStore.favorites;
  }

  addFav(id: string, store) {
    const finded = this.inMemoryStore[store]?.find((elem) => elem?.id === id);
    console.log(id, store, 'ARGS')
    const favsStore = this.inMemoryStore?.favorites[store]
    const finedInStore = this.inMemoryStore?.favorites[store]?.find((elem) => elem.id === id);
    console.log(finded, favsStore, finedInStore)
    !finedInStore && favsStore.push(finded)
    return favsStore
  }

  removeFav(id: string, store) {
    const i = this.inMemoryStore.favorites[store].findIndex((track) => track.id === id);
    if (i === -1) return null;
    this.inMemoryStore.favorites[store].splice(i, 1);
    return this.inMemoryStore.favorites[store];
  }

  // update(id: string, updateTrackDto: UpdateTrackDto): FavoritesRepsonse {
  //   const i = this.inMemoryStore.tracks.findIndex((user) => user.id === id);
  //   if (i === -1) return null;
  //   const artist = this.inMemoryStore.artists.find((artist) => artist.id === updateTrackDto.artistId);
  //   const album = this.inMemoryStore.albums.find((album) => album.id === updateTrackDto.albumId);
  //   this.inMemoryStore.tracks[i] = {
  //     ...this.inMemoryStore.tracks[i],
  //     name: updateTrackDto.name,
  //     duration: updateTrackDto.duration !== 0 && updateTrackDto.duration,
  //     artistId: artist ? updateTrackDto.artistId : null,
  //     albumId: album ? updateTrackDto.albumId : null,
  //   };
  //   return this.inMemoryStore.tracks[i];
  // }

  // remove(id: string): FavoritesRepsonse {
  //   const i = this.inMemoryStore.tracks.findIndex((user) => user.id === id);
  //   if (i === -1) return null;
  //   const user = this.inMemoryStore.tracks[i];
  //   const clone = Object.assign({}, user);
  //   this.inMemoryStore.tracks.splice(i, 1);
  //   return clone;
  // }
}
