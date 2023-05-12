import { Module } from '@nestjs/common'
import { ResultService } from './result.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ResultController } from './result.controller'

@Module({
  providers: [ResultService],
  imports: [PrismaModule],
  controllers: [ResultController],
  exports: [ResultService],
})
export class ResultModule {}
