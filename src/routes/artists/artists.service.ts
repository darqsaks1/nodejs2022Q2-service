import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IArtist } from '../../ts/artists.interface';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class ArtistsService {
  

  async changeArtist(
    id: IArtist['id'],
    data: {
      name: IArtist['name'];
      grammy: IArtist['grammy'];
    },
  ): Promise<IArtist> {
    return await prisma.artist.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        grammy: data.grammy,
      },
    });
  }

  async getAllArtist(): Promise<IArtist[]> {
    return prisma.artist.findMany();
  }

  async getArtistById(id: IArtist['id']): Promise<IArtist> {
    return prisma.artist.findUnique({
      where: { id },
    });
  }

  async createArtist(artist: {
    name: IArtist['name'];
    grammy: IArtist['grammy'];
  }): Promise<IArtist> {
    return await prisma.artist.create({
      data: {
        id: uuidv4(),
        name: artist.name,
        grammy: artist.grammy,
      },
    });
  }
  
  async deleteArtist(id: IArtist['id']): Promise<void> {
    await prisma.artist.delete({
      where: {
        id: id,
      },
    });
  }
}
