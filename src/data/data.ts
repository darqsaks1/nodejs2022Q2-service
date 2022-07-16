import { Injectable } from '@nestjs/common';
// import { Album } from 'src/routes/albums/entities/albums.entity';
import { Artist } from 'src/routes/artists/artists/entities/artists.entity';
import { Track } from 'src/routes/tracks/tracks/entities/track.entity';
import { User } from 'src/routes/user/users/entities/user.entity';
import { Album } from 'src/routes/albums/albums/entities/albums.entity';
@Injectable()
export class InMemoryStore {
    users: User[] = []
    artists: Artist[] = []
    albums: Album[] = []
    tracks: Track[] = []
    private static instance
    constructor() {
        if (!InMemoryStore.instance) {
            InMemoryStore.instance = this
        }

        return InMemoryStore.instance
    }
}