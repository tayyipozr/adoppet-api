import { Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { FavoriteService } from './favorite.service';

@Controller('favorites')
export class FavoriteController {

  constructor(private readonly favoriteService: FavoriteService) { }

  @Get()
  getFavorites(@GetUser('id') userId: number) {
    return this.favoriteService.getFavorites(userId);
  }

  @Post(':petId')
  addFavorite(@GetUser('id') userId: number, @Param('petId', ParseIntPipe) petId: number) {
    return this.favoriteService.addFavorite(userId, petId);
  }

  @Delete(':id')
  deleteFavorite(@Param('id', ParseIntPipe) petId: number) {
    return this.favoriteService.deleteFavorite(petId);
  }
}
