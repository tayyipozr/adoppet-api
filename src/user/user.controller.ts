import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { GetUser } from '../auth/decorator';
import { AtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';


@UseGuards(AtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
