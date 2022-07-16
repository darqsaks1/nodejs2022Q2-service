import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './routes/user/users.module';
import { TrackModule } from './routes/tracks/tracks.module';
import { ArtistModule } from './routes/artists/artists.module';
@Module({
  imports: [UsersModule, TrackModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
