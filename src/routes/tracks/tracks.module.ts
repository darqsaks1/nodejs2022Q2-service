import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TrackController } from './tracks.controller';
import { InMemoryStore } from '../../data/data';

@Module({
  controllers: [TrackController],
  providers: [TracksService, InMemoryStore],
})
export class TrackModule { }
