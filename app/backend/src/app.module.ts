import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { InformationModule } from './information/information.module';
import { QuestionController } from './question/question.controller';
import { ResultController } from './result/result.controller';
import { QuestionModule } from './question/question.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ResultModule } from './result/result.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './redis/redis.service';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    // ConfigModuleが各モジュールのProviderの要素を設定せずに、モジュールインポートで利用できるようにtrueに設定する
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    PrismaModule,
    InformationModule,
    QuestionModule,
    AuthModule,
    ResultModule,
    RedisModule.forRootAsync({
      useClass: RedisService,
    }),
  ],
  controllers: [
    AppController,
    QuestionController,
    ResultController,
    AuthController,
  ],
  providers: [AppService, AuthService],
})
export class AppModule {}
