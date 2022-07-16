interface IFavoritesRepsonse {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export class FavoritesRepsonse implements IFavoritesRepsonse {
  artists: string[];
  albums: string[];
  tracks: string[];
}