import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Strategy } from 'passport-cookie';

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, 'cookie') {
  constructor(
    private readonly redisService: RedisService,
    private readonly prismaService: PrismaService,
  ) {
    super({ cookieName: 'session-id', signed: false });
  }

  async validate(token: string) {
    if (!token) {
      throw new UnauthorizedException('no authorized token');
    }

    // RedisからセッションIDを取得
    const userId = await this.redisService.getValue(token);

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
