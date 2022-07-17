
import { Track } from '../../../tracks/tracks/entities/track.entity';
import { Album } from 'src/routes/albums/albums/entities/albums.entity';
import { Artist } from 'src/routes/artists/artists/entities/artists.entity';

export class FavoritesRepsonse {
  artists: Track[];
  albums: Album[];
  tracks: Track[];
}

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}