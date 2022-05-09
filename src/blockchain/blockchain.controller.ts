import { Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorator/public.decorator';
import { BlockchainService } from './blockchain.service';

@Public()
@Controller('blockchain')
export class BlockchainController {

  constructor(private readonly blockchainService: BlockchainService) { }

  @Post()
  deploy() {
    return this.blockchainService.deploy();
  }

  @Get()
  transact() {
    return this.blockchainService.adoptionTransaction();
  }
}
