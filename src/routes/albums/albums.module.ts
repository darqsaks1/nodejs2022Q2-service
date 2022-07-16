import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumController } from './albums.controller';
import { InMemoryStore } from '../../data/data';

@Module({
  controllers: [AlbumController],
  providers: [AlbumsService, InMemoryStore],
})
export class AlbumsModule { }
