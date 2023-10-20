import { Module } from '@nestjs/common'
import { ResultService } from './result.service'
import { ResultFactory } from './factory/result.factory'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ResultController } from './result.controller'
import { ChibakenIchikawashiFactory } from './factory/ConcreateFactory/ichikawashi'
import {
  IchikawashiChildBirthGrant,
  IchikawashiHousingSubsidy,
  IchikawashiPrivateRentalHousing,
} from './factory/ConcreateProduct/ichikawashi'
import { ResultAFConfigService } from './factory/abstract-factory-config'
import { ResultRepository } from './result.repository'

@Module({
  providers: [
    ResultService,
    ResultFactory,
    ResultRepository,
    ChibakenIchikawashiFactory,
    IchikawashiChildBirthGrant,
    IchikawashiHousingSubsidy,
    IchikawashiPrivateRentalHousing,
    ResultAFConfigService,
  ],
  imports: [PrismaModule],
  controllers: [ResultController],
  exports: [ResultService],
})
export class ResultModule {}
