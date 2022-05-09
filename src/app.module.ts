import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PetModule } from './pet/pet.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guard';
import { AdoptModule } from './adopt/adopt.module';
import { FavoriteModule } from './favorite/favorite.module';
import { PostModule } from './post/post.module';
import { NotificationModule } from './notification/notification.module';
import { BlockchainModule } from './blockchain/blockchain.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, UserModule, PetModule, PrismaModule, AdoptModule, FavoriteModule, PostModule, NotificationModule, BlockchainModule],
  providers: [{
    provide: APP_GUARD,
    useClass: AtGuard,
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
