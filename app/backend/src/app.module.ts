import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { InformationModule } from './information/information.module'
import { QuestionController } from './question/question.controller'
import { ResultController } from './result/result.controller'
import { QuestionModule } from './question/question.module'
import { AuthController } from './auth/auth.controller'
import { AuthModule } from './auth/auth.module'
import { ResultModule } from './result/result.module'
import { ConfigModule } from '@nestjs/config'
import { AuthService } from './auth/auth.service'
import { RegionService } from './region/region.service'
import { RegionModule } from './region/region.module'
import { AnswerModule } from './answer/answer.module'
import { PassportModule } from '@nestjs/passport'
import { UserController } from './user/user.controller'
import { SubsidiesController } from './subsidies/subsidies.controller'
import { SubsidiesModule } from './subsidies/subsidies.module'
import { PrefecturesService } from './prefectures/prefectures.service'
import { PrefecturesController } from './prefectures/prefectures.controller'
import { PrefecturesModule } from './prefectures/prefectures.module'

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
    PassportModule.register({ session: true }),
    RegionModule,
    AnswerModule,
    SubsidiesModule,
    PrefecturesModule,
  ],
  controllers: [
    AppController,
    QuestionController,
    ResultController,
    AuthController,
    UserController,
    SubsidiesController,
    PrefecturesController,
  ],
  providers: [AppService, AuthService, RegionService, PrefecturesService],
})
export class AppModule {}
