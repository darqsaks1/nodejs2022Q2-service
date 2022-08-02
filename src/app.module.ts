import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './routes/user/user.module';
import { PrismaModule } from './prismaService/prisma.module';
import { TrackModule } from './routes/track/track.module';
import { AuthModule } from './routes/auth/auth.module';
import { ArtistModule } from './routes/artist/artist.module';
import { AlbumModule } from './routes/album/album.module';
import { FavoritesModule } from './routes/favorites/favorites.module';
// import { SignupModule } from './routes/auth/auth.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
