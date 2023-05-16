import { PassportSerializer } from '@nestjs/passport'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from '@prisma/client'
import { Inject } from '@nestjs/common'

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
  ) {
    super()
  }

  /**
   * クライアントからRedisに送られる前に行われるミドルウェア
   * ユーザーオブジェクトをセッションに保存できる形式に変換し、その情報をセッションストアに保存する
   */
  serializeUser(user: User, done: (err, user: User) => void) {
    done(null, user)
  }

  /**
   * Redisからクライアントに送られる前に行われるプロセス
   * クライアントから送信された要求に対して認証されたユーザーオブジェクトをセッションストアから取得する
   */
  async deserializeUser(payload: User, done: (err, user: User) => void) {
    try {
      const userDB = await this.prismaService.user.findUnique({
        where: { email: payload.email },
      })

      return userDB ? done(null, userDB) : done(null, null)
    } catch (err) {
      done(err, null)
    }
  }
}
