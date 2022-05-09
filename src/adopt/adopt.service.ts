import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdoptDto } from './dto';
import { AdoptionProcess } from './enum/adoption_process.enum';

@Injectable()
export class AdoptService {
  constructor(private readonly prisma: PrismaService) { }

  async adopt(petId: number, userId: number) {
    return this.prisma.adopt.create({
      data: {
        petId,
        userId,
        adoptionProcessId: 1
      }
    });
  }

  async updateAdoptionStatus(adoptId: number, adoptionProcessId: number) {
    return this.prisma.adopt.update({
      where: { id: adoptId },
      data: {
        adoptionProcessId
      }
    });
  }
}

