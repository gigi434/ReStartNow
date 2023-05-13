import { Module } from '@nestjs/common'
import { AnswerService } from './answer.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AnswerController } from './answer.controller'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  imports: [PrismaModule],
  providers: [AnswerService, PrismaService],
  controllers: [AnswerController],
})
export class AnswerModule {}
