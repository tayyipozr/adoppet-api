import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/decorator/public.decorator';
import { NotificationService } from './notification.service';

@Public()
@Controller('notification')
export class NotificationController {

  constructor(private readonly notificationService: NotificationService) { }

  @Get()
  getPosts() {
    return this.notificationService.sendNotification(
      'dANIcwYGR8qhsq5DHeEB_G:APA91bEXakpkSZBeQfLkWq1wX68NVEhOiCCskHQ5ORTrnVwTXwXsMVI11WDpSaC2Wzl57O9f9CYxqgIM7vOg5wXNXRBCdk4YEFRsJXI48f9BoyjTcRIf8-lsOkr8jJAyrKQgtnERVc8m',
      {
        notification: {
          title: "Account Deposit",
          body: "A deposit to your savings account has just cleared.",
          click_action: 'FLUTTER_NOTIFICATION_CLICK',
        },
        data: {
          click_action: 'FLUTTER_NOTIFICATION_CLICK',
          title: 'Akif',
          body: 'Malsın',
          sound: 'default',
          badge: '1',
          icon: 'ic_launcher',
          tag: 'test',
          imageUrl: "https://i.pinimg.com/736x/ca/4a/f2/ca4af20b57850bdc75c69d7da3a1fc25.jpg",
          type: "FINALIZE_ADOPTION"
        },
      }
    );
  }
}
