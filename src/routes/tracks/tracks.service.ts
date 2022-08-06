import { Injectable } from '@nestjs/common';
import { ITrack } from '../../ts/tracks.interface';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class TracksService {
  async getAllTracks(): Promise<ITrack[]> {
    return prisma.track.findMany();
  }

  async getTrackById(id: ITrack['id']): Promise<ITrack> {
    return await prisma.track.findUnique({
      where: {
        id: id,
      },
    });
  }


  async deleteTrack(id: ITrack['id']): Promise<void> {
    await prisma.track.delete({
      where: {
        id: id,
      },
    });
  }
  async createTrack(track: {
    name: ITrack['name'];
    albumId: ITrack['albumId'];
    artistId: ITrack['artistId'];
    duration: ITrack['duration'];
  }) {
    return await prisma.track.create({
      data: {
        id: uuidv4(),
        name: track.name ? track.name : null,
        albumId: track.albumId ? track.albumId : null,
        artistId: track.artistId ? track.artistId : null,
        duration: track.duration ? track.duration : null,
      },
    });
  }

  async changeTrack(
    id: ITrack['id'],
    data: {
      name: ITrack['name'];
      duration: ITrack['duration'];
      albumId: ITrack['albumId'];
      artistId: ITrack['artistId'];
    },
  ): Promise<ITrack> {
    return await prisma.track.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        duration: data.duration,
        albumId: data.albumId,
        artistId: data.artistId,
      },
    });
  }

}
