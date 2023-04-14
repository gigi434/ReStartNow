import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { PrismaService } from 'src/prisma/prisma.service';
import { Strategy } from 'passport-cookie';
import Redis from 'ioredis';

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, 'cookie') {
  private readonly redis: Redis;
  constructor(
    private readonly redisService: RedisService,
    private readonly prismaService: PrismaService,
  ) {
    super({ cookieName: 'session-id', signed: false });
    this.redis = this.redisService.getClient();
  }

  async validate(token: string) {
    if (!token) {
      throw new UnauthorizedException('no authorized token');
    }

    // RedisからセッションIDを取得
    const userId = parseInt(await this.redis.get(token));

    // セッションデータに含まれるuserIdを使用して、Prismaを介してユーザーを取得
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (userId === user.id) {
      return user;
    }

    return false;
  }
}
