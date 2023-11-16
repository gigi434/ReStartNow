import { Module } from '@nestjs/common'
import { InformationController } from './information.controller'
import { InformationService } from './information.service'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [InformationController],
  providers: [InformationService],
  imports: [PrismaModule],
})
export class InformationModule {}
