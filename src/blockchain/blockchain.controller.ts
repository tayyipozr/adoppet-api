import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorator/public.decorator';
import { BlockchainService } from './blockchain.service';
import { AdoptionContractDto } from './dto';

@Public()
@Controller('blockchain')
export class BlockchainController {

  constructor(private readonly blockchainService: BlockchainService) { }

  @Get('all')
  getAll() {
    return this.blockchainService.getAdoptions();
  }

  @Get()
  deploy() {
    return this.blockchainService.deploy();
  }

  @Post()
  async transact(@Body() dto: { content: string }) {
    return await this.blockchainService.adoptionTransaction(
      dto.content
    );
  }

  @Post('donate')
  async donate(@Body() dto: { donation: string }) {
    return await this.blockchainService.adoptionDonation(
      dto.donation
    );
  }
}
