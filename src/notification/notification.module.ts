import { Global, Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import * as admin from 'firebase-admin';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataMessagePayload, MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';

@Global()
@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService]
})
export class NotificationModule {
  constructor(config: ConfigService) {
    const adminConfig: admin.ServiceAccount = {
      "projectId": config.get<string>('FIREBASE_PROJECT_ID'),
      "privateKey": config.get<string>('FIREBASE_PRIVATE_KEY')
        .replace(/\\n/g, '\n'),
      "clientEmail": config.get<string>('FIREBASE_CLIENT_EMAIL'),
    };
    admin.initializeApp({
      credential: admin.credential.cert(adminConfig),
      databaseURL: "db URL",
    })
  }


}
