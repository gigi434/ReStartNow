import { Module } from '@nestjs/common'
import { SubsidiesService } from './subsidies.service'
import { PrismaModule } from '../prisma/prisma.module'
import { SubsidiesController } from './subsidies.controller'
import { QuestionModule } from '../question/question.module'

@Module({
  imports: [PrismaModule, QuestionModule],
  controllers: [SubsidiesController],
  providers: [SubsidiesService],
  exports: [SubsidiesService],
})
export class SubsidiesModule {}
