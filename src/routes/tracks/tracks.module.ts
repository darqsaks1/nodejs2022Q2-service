import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { FavoService } from '../favorites/favorites.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, FavoService],
})
export class TracksModule {}
