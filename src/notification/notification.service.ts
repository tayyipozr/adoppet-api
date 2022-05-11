import { Global, Injectable } from '@nestjs/common';
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';
import * as admin from 'firebase-admin';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {

  constructor(private readonly prisma: PrismaService) { }

  async initializeToken(userId: number, token: string) {
    const user = await this.prisma.user.update(
      {
        where: { id: userId },
        data: {
          token: { set: token },
        }
      }
    );


    delete user.hash;

    return user;
  }

  async sendNotification(senderId: number, petId?: number, title?: string, body?: string, type?: string) {

    var pet;
    var owner;

    if (petId != null) {
      pet = await this.prisma.pet.findFirst({
        where: {
          id: petId
        }
      });

      owner = await this.prisma.user.findFirst({
        where: {
          id: pet.userId
        }
      });
    }

    var user = await this.prisma.user.findFirst({
      where: {
        id: senderId
      }
    });

    return await admin.messaging().sendToDevice(petId == null ? user.token : owner.token, {
      notification: {
        title: title || '',
        body: body || '',
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
      },
      data: {
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
        title: title || '',
        body: petId == null ? body || '' : `Sahiplenen Bilgileri:\n${user.firstName} ${user.lastName}\n${body || ''}\n\nEski Sahip : ${owner.firstName} ${owner.lastName}\n`,
        sound: 'default',
        badge: '1',
        icon: 'ic_launcher',
        imageUrl: "https://i.pinimg.com/736x/ca/4a/f2/ca4af20b57850bdc75c69d7da3a1fc25.jpg",
        type: type || '',
      },
    });
  }
}
