import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ConfigService } from '@nestjs/config'
import { AuthDto } from './dto/auth.dto'
import * as bcrypt from 'bcrypt'
import { Prisma } from '@prisma/client'
import { Msg } from './interfaces/auth.interfaces'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  /* ユーザーの作成 */
  async signUp(dto: AuthDto): Promise<Msg> {
    // パスワードからハッシュ値を計算する
    const hashed = await bcrypt.hash(dto.password, 12)
    try {
      await this.prismaService.user.create({
        data: {
          email: dto.email,
          hashedPassword: hashed,
        },
      })
      return {
        message: 'ok',
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('This email is already taken')
        }
      }
    }
  }

  /* ユーザーのログイン */
  async login(dto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    })
    if (!user) throw new ForbiddenException('Email or password incorrect')
    const isValid = await bcrypt.compare(dto.password, user.hashedPassword)
    if (!isValid) throw new ForbiddenException('Email or password incorrect')

    return user
  }

  /** ユーザーの認証 */
  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    })

    if (user && (await bcrypt.compare(password, user.hashedPassword))) {
      return user
    }

    return null
  }
}
