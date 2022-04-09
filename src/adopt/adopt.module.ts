import { Module } from '@nestjs/common';
import { AdoptController } from './adopt.controller';
import { AdoptService } from './adopt.service';

@Module({
  controllers: [AdoptController],
  providers: [AdoptService]
})
export class AdoptModule {}
