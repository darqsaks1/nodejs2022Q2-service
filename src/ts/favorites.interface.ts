import { IArtist } from './artists.interface';
import { IAlbum } from './albums.interface';
import { ITrack } from './tracks.interface';

export interface IFavoritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
