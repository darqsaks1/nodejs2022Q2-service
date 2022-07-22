interface IArtist {
  id: string;
  name: string;
  grammy: boolean;
}

export class Artist implements IArtist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
