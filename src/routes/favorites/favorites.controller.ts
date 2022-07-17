import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavTrack } from './favorites/dto/favorites-track.dto';
import { ApiTags } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UpdateTrackDto } from './favorites/dto/update-track.dto';


@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }
  @ApiResponse({ status: 200, description: 'Server should answer with status code 200 and all users records' })
  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @ApiResponse({ status: 201, description: 'Server should answer with status code 201 and newly created record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if request body does not contain required fields.' })
  @Post('/track/:id')
  public async createTrack(@Param('id') id: string) {
    return this.favoritesService.addFav(id, 'tracks');
  }
  @ApiResponse({ status: 204, description: 'Server should answer with status code 200 and updated record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if userId is invalid(not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === userId doesnt exist' })
  @Delete('/track/:id')
  removeTrack(@Param('id') id: string) {
    const validator = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    if (!validator) {
      throw new HttpException('Uuid is invalid', HttpStatus.BAD_REQUEST);
    }
    // if (!this.favoritesService.findOne(id)) {
    //   throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    // }
    return this.favoritesService.removeFav(id, 'tracks');
  }

  @ApiResponse({ status: 201, description: 'Server should answer with status code 201 and newly created record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if request body does not contain required fields.' })
  @Post('/album/:id')
  public async createAlbum(@Param('id') id: string) {
    return this.favoritesService.addFav(id, 'albums');
  }
  @ApiResponse({ status: 204, description: 'Server should answer with status code 200 and updated record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if userId is invalid(not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === userId doesnt exist' })
  @Delete('/album/:id')
  removeAlbum(@Param('id') id: string) {
    const validator = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    if (!validator) {
      throw new HttpException('Uuid is invalid', HttpStatus.BAD_REQUEST);
    }
    // if (!this.favoritesService.findOne(id)) {
    //   throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    // }
    return this.favoritesService.removeFav(id, 'tracks');
  }


  @ApiResponse({ status: 201, description: 'Server should answer with status code 201 and newly created record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if request body does not contain required fields.' })
  @Post('/artist/:id')
  public async createArtist(@Param('id') id: string) {
    return this.favoritesService.addFav(id, 'artists');
  }
  @ApiResponse({ status: 204, description: 'Server should answer with status code 200 and updated record if request is valid' })
  @ApiResponse({ status: 400, description: 'Server should answer with status code 400 and corresponding message if userId is invalid(not uuid)' })
  @ApiResponse({ status: 404, description: 'Server should answer with status code 404 and corresponding message if record with id === userId doesnt exist' })
  @Delete('/artist/:id')
  removeArtist(@Param('id') id: string) {
    const validator = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    if (!validator) {
      throw new HttpException('Uuid is invalid', HttpStatus.BAD_REQUEST);
    }
    return this.favoritesService.removeFav(id, 'artists');
  }


}
