import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './routes/user/users.module';
import { TrackModule } from './routes/tracks/tracks.module';
import { ArtistModule } from './routes/artists/artists.module';
import { AlbumsModule } from './routes/albums/albums.module';
import { FavoritesModule } from './routes/favorites/favorites.module';
@Module({
  imports: [ConfigModule.forRoot(), UsersModule, TrackModule, AlbumsModule, ArtistModule, FavoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
