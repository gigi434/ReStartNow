import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './strategy/local.strategy'
import { SessionSerializer } from './serializer/auth.serializer'

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
