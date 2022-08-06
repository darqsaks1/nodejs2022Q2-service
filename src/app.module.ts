import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { UsersModule } from './routes/users/users.module';
import { TracksModule } from './routes/tracks/tracks.module';
import { ArtistsModule } from './routes/artists/artists.module';
import { LoggerMiddleware } from '../dataBasses/middleware/logger.middleware';
import { UsersController } from './routes/users/users.controller';
import { TracksController } from './routes/tracks/tracks.controller';
import { AlbumsController } from './routes/albums/albums.controller';
import { ArtistsController } from './routes/artists/artists.controller';
import { FavsContrl } from './routes/favorites/favorites.controller';
import { LoggerFiler } from '../dataBasses/filter/exceptionsFilter.service';
import { AlbumsModule } from './routes/albums/albums.module';
import { FavoritesModule } from './routes/favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './routes/auth/auth.module';


@Module({
  imports: [
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    UsersModule,
    FavoritesModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: LoggerFiler,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        AlbumsController,
        ArtistsController,
        FavsContrl,
        TracksController,
        UsersController,
      );
  }
}
