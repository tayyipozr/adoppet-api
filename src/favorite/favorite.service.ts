import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {

  constructor(private readonly prisma: PrismaService) { }

  async addFavorite(userId: number, petId: number) {

    await this.checkIfPetExists(petId);

    return this.prisma.favorite.create({
      data: {
        petId,
        userId
      },
    });
  }

  async deleteFavorite(id: number) {

    await this.checkIfFavoriteExists(id);

    return this.prisma.favorite.deleteMany({
      where: {
        id
      },
    });
  }

  async getFavorites(userId: number) {
    return this.prisma.user.findMany({
      where: { id: userId },
      include: {
        favorites: {
          include: {
            user: true,
            pet: true,
          },
        },
      },
    });
  }

  private async checkIfPetExists(petId: number) {
    const pet = await this.prisma.pet.findUnique({
      where: {
        id: petId
      },
    });

    if (!pet)
      throw new ForbiddenException('Pet does not exists');
  }

  private async checkIfFavoriteExists(id: number) {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        id
      },
    });

    if (!favorite)
      throw new ForbiddenException('Favoite does not exists');
  }


}
