import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './strategy/local.strategy'
import { CookieStrategy } from './strategy/cookie.strategy'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, CookieStrategy],
})
export class AuthModule {}
