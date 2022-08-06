import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IAlbum } from '../../ts/albums.interface';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class AlbumsService {


  async createAlbum(album: {
    name: IAlbum['name'];
    year: IAlbum['year'];
    artistId: IAlbum['artistId'];
  }): Promise<IAlbum> {
    return await prisma.album.create({
      data: {
        id: uuidv4(),
        name: album.name,
        year: album.year,
        artistId: album.artistId ? album.artistId : null,
      },
    });
  }

  async changeAlbum(
    id: IAlbum['id'],
    data: {
      name: IAlbum['name'];
      year: IAlbum['year'];
      artistId: IAlbum['artistId'];
    },
  ) {
    return await prisma.album.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        year: data.year,
        artistId: data.artistId,
      },
    });
  }
  async getAllAlbums(): Promise<IAlbum[]> {
    return prisma.album.findMany();
  }

  async getAlbumById(id: IAlbum['id']): Promise<IAlbum> {
    return prisma.album.findUnique({
      where: {
        id: id,
      },
    });
  }
  async deleteAlbum(id: IAlbum['id']): Promise<void> {
    await prisma.album.delete({
      where: {
        id: id,
      },
    });
  }
}
