import { Injectable } from '@nestjs/common';
import { InMemoryStore } from '../../data/data';

@Injectable()
export class FavoritesService {
  constructor(private inMemoryStore: InMemoryStore) { }

  findAll() {
    return this.inMemoryStore.favorites;
  }
  addFav(id: string, store) {
    const finded = this.inMemoryStore[store]?.find((elem) => elem?.id === id);
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
}
