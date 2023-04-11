import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ResultService],
  imports: [PrismaModule],
})
export class ResultModule {}
