import { Injectable } from '@nestjs/common';
import { NotificationService } from 'src/notification/notification.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdoptDto } from './dto';
import { AdoptionProcess } from './enum/adoption_process.enum';

@Injectable()
export class AdoptService {

  constructor(private readonly prisma: PrismaService, private readonly notificationService: NotificationService) { }

  async adopt(petId: number, userId: number) {

    var adopted = await this.prisma.adopt.create({
      data: {
        petId,
        userId,
        adoptionProcessId: 1
      }
    });

    var _userId = await this.prisma.pet.findFirst({
      where: {
        id: petId
      }
    }).then(pet => {
      return pet.userId;
    });

    var userToNotify = await this.prisma.user.findFirst({
      where: {
        id: _userId
      }
    });

    this.notificationService.sendNotification(userToNotify.id, null,
      'Adoption',
      'You have a new adoption request',
      AdoptionProcess.STARTED.toString());

    return true;
  }

  async getAdopteds(userId: number) {
    return await this.prisma.adopt.findMany({
      where: {
        userId,
        adoptionProcessId: 4
      },
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            typeId: true,
            userId: true,
            imageUrls: true,
            description: true,
            age: true,
            createdAt: true,
            updatedAt: true,
          }
        },
        user: true,
        adoptionProcess: true,
      },
    });
  }

  async getApplications(userId: number) {
    return await this.prisma.adopt.findMany({
      where: {
        userId,
        NOT: {
          adoptionProcessId: 4
        }
      },
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            typeId: true,
            userId: true,
            imageUrls: true,
            description: true,
            age: true,
            createdAt: true,
            updatedAt: true,
          }
        },
        user: true,
        adoptionProcess: true,
      },
    });
  }

  async updateAdoptionStatus(adoptId: number, adoptionProcessId: number) {
    return this.prisma.adopt.update({
      where: { id: adoptId },
      data: {
        adoptionProcessId
      },
      include: {
        adoptionProcess: true,
      }
    });
  }

  async getAdoptionRequests(userId: number) {

    var pets = await this.prisma.pet.findMany({
      where: {
        userId: userId
      },
    });

    console.log(pets);


    var adoptions = [];

    for await (const pet of pets) {
      try {
        var adopt = await this.prisma.adopt.findFirst({
          where: {
            petId: pet.id
          },
          include: {
            pet: {
              select: {
                id: true,
                name: true,
                typeId: true,
                userId: true,
                imageUrls: true,
                description: true,
                age: true,
                createdAt: true,
                updatedAt: true,
              }
            },
            user: true,
            adoptionProcess: true
          },
          rejectOnNotFound: true
        });
        console.log("Found" + adopt.pet.name);
        console.log(adopt);
        if (adopt != undefined)
          adoptions.push(adopt);
      } catch (error) {

      }
    }

    return adoptions;
  }
}


