import { Injectable, ForbiddenException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { RedisService } from '@liaoliaots/nestjs-redis'
import Redis from 'ioredis'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  private readonly redisService: Redis
  constructor(
    private readonly prismaService: PrismaService,
    private readonly nestRedisService: RedisService,
  ) {
    this.redisService = this.nestRedisService.getClient()
  }

  /* パスワードの変更 */
  async changeUserPassword(
    sessionId: string,
    dto: UpdateUserDto,
  ): Promise<void> {
    const userId = parseInt(await this.redisService.get(sessionId))
    if (!userId) {
      throw new Error('cant find user')
    }
    const hashedPassword = await bcrypt.hash(dto.password, 12)

    try {
      await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          hashedPassword: hashedPassword,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2001') {
          throw new ForbiddenException('User account does not exist.')
        }
      }
    }
  }

  async deleteOneUserById(sessionId: string): Promise<void> {
    const userId = await this.redisService.get(sessionId)
    if (!userId) {
      throw new Error('cant find user')
    }
    await this.prismaService.user.delete({
      where: { id: parseInt(userId) },
    })
    await this.redisService.del(sessionId)
  }
}
