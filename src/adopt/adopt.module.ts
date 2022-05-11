import { Module } from '@nestjs/common';
import { NotificationService } from 'src/notification/notification.service';
import { AdoptController } from './adopt.controller';
import { AdoptService } from './adopt.service';

@Module({
  controllers: [AdoptController],
  providers: [AdoptService],
})
export class AdoptModule { }
