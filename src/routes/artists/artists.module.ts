import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistController } from './artists.controller';
import { InMemoryStore } from '../../data/data';

@Module({
  controllers: [ArtistController],
  providers: [ArtistsService, InMemoryStore],
})
export class ArtistModule { }
