import { Injectable } from '@nestjs/common';
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationService {

  sendNotification(token: string, payload: MessagingPayload) {
    return admin.messaging().sendToDevice(token, payload);
  }
}
