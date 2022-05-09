import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePetDto, EditPetDto } from './dto';

@Injectable()
export class PetService {
  constructor(private readonly prisma: PrismaService) { }

  async getAll(typeId: number) {
    return await this.prisma.pet.findMany({ where: { typeId } });
  }

  async getPets(userId: number) {
    return await this.prisma.pet.findMany({ where: { userId } });
  }

  async getPetById(userId: number, petId: number) {
    return await this.prisma.pet.findFirst({ where: { id: petId, userId } });
  }

  async createPet(userId: number, dto: CreatePetDto) {
    return await this.prisma.pet.create({ data: { ...dto, userId } });
  }

  async editPetById(userId: number, petId: number, dto: EditPetDto) {
    // get the pet by id
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });

    // check if user owns the pet 
    if (!pet || pet.userId !== userId)
      throw new ForbiddenException('Access to resource denied');

    return this.prisma.pet.update({
      where: { id: petId },
      data: { ...dto }
    });
  }

  async deletePetById(userId: number, petId: number) {
    // get the pet by id
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });

    // check if user owns the pet 
    if (!pet || pet.userId !== userId)
      throw new ForbiddenException('Access to resource denied');

    await this.prisma.pet.delete({ where: { id: petId } });
  }

  async getPetTypes() {
    return await this.prisma.type.findMany();
  }
}
