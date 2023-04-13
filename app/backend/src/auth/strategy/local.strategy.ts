import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { PrismaService } from 'src/prisma/prisma.service';
import { Strategy } from 'passport-local';

/*
 * ユーザーを認証するためのカスタムロジック
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly redisService: RedisService,
    private readonly prismaService: PrismaService,
  ) {
    super();
  }

  /*
   * @params token: Redisに格納されているセッションキー
   */
  async validate(token: string) {
    const redisClient = await this.redisService.getClient();
    console.log(token);
    const sessionData = await redisClient.get(token);

    if (!sessionData) {
      throw new UnauthorizedException();
    }

    const { userId } = JSON.parse(sessionData);

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    return user;
  }
}
