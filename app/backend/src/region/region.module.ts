import { Module } from '@nestjs/common'
import { RegionController } from './region.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { RegionService } from './region.service'

@Module({
  imports: [PrismaModule],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
