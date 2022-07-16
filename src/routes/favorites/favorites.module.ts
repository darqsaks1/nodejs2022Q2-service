import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { InMemoryStore } from '../../data/data';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, InMemoryStore],
})
export class TrackModule { }
