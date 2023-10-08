import { Module } from '@nestjs/common'
import { ResultService } from './result.service'
import { ResultFactory } from './factory/result.factory'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ResultController } from './result.controller'
import { IchikawashiFactory } from './factory/ConcreateFactory/ichikawashi'
import {
  IchikawashiChildBirthGrant,
  IchikawashiHousingSubsidy,
  IchikawashiPrivateRentalHousing,
} from './factory/ConcreateProduct/ichikawashi'
import { ResultRepository } from './result.repository'

@Module({
  providers: [
    ResultService,
    ResultFactory,
    ResultRepository,
    IchikawashiFactory,
    IchikawashiChildBirthGrant,
    IchikawashiHousingSubsidy,
    IchikawashiPrivateRentalHousing,
  ],
  imports: [PrismaModule],
  controllers: [ResultController],
  exports: [ResultService],
})
export class ResultModule {}
