import { Body, Controller, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { AtGuard } from 'src/auth/guard';
import { AdoptService } from './adopt.service';
import { CreateAdoptDto } from './dto';

@UseGuards(AtGuard)
@Controller('adopts')
export class AdoptController {
  constructor(private adoptService: AdoptService) { }

  @Post(':id')
  adopt(@Param('id', ParseIntPipe) petId: number, @GetUser('id') userId: number) {
    return this.adoptService.adopt(petId, userId);
  }

  @Patch(':id/:processId')
  update(@Param('id', ParseIntPipe) adoptId: number, @Param('processId', ParseIntPipe) processId: number) {
    return this.adoptService.updateAdoptionStatus(adoptId, processId);
  }
}

