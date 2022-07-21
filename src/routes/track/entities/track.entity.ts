interface ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
export class Track implements ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
