import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdoptDto } from './dto';

@Injectable()
export class AdoptService {
  constructor(private readonly prisma: PrismaService) { }

  async adopt(petId: number, userId: number) {
    return this.prisma.adopt.create({
      data: {
        petId,
        userId
      }
    });
  }
}

