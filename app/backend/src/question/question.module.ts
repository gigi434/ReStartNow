import { Module } from '@nestjs/common'
import { QuestionService } from './question.service'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  providers: [QuestionService],
  imports: [PrismaModule],
  exports: [QuestionService],
})
export class QuestionModule {}
