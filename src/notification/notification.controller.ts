import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { Public } from 'src/auth/decorator/public.decorator';
import { AtGuard } from 'src/auth/guard/at.guard';
import { PayloadDto, TokenDto } from './dto';
import { NotificationService } from './notification.service';


@UseGuards(AtGuard)
@Controller('notifications')
export class NotificationController {

  constructor(private readonly notificationService: NotificationService) { }

  @Patch()
  async initializeToken(@GetUser('id') userId: number, @Body() token: TokenDto) {
    return this.notificationService.initializeToken(userId, token.token);
  }

  @Post(':id/')
  async sendNotification(@GetUser('id') userId: number, @Param('id', ParseIntPipe) petId: number, @Body() payload: PayloadDto) {
    return this.notificationService.sendNotification(
      userId,
      petId,
      payload.title,
      payload.body,
      payload.type
    );
  }
}