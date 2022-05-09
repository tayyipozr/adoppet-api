import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { BlockchainController } from './blockchain.controller';
import * as web3 from 'Web3';

@Module({
  providers: [BlockchainService],
  controllers: [BlockchainController]
})
export class BlockchainModule { }
