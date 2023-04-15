import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { Msg } from './interfaces/auth.interfaces';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  private readonly redisService: Redis;
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly nestRedisService: RedisService,
  ) {
    this.redisService = this.nestRedisService.getClient();
  }

  /* ユーザーの作成 */
  async signUp(dto: AuthDto): Promise<Msg> {
    // パスワードからハッシュ値を計算する
    const hashed = await bcrypt.hash(dto.password, 12);
    try {
      await this.prismaService.user.create({
        data: {
          email: dto.email,
          hashedPassword: hashed,
        },
      });
      return {
        message: 'ok',
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2020') {
          throw new ForbiddenException('This email is already taken');
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
    });
    if (!user) throw new ForbiddenException('Email or password incorrect');
    const isValid = await bcrypt.compare(dto.password, user.hashedPassword);
    if (!isValid) throw new ForbiddenException('Email or password incorrect');

    return user;
  }

  // セッションIDを作成してログイン済みのユーザー情報をRedisに保存する
  async createSessionID(userId: number) {
    const sessionId = uuidv4();
    const expiresIn = 3600; // セッションの有効期限を1時間に設定
    await this.redisService.set(sessionId, JSON.stringify(userId));
    await this.redisService.expire(sessionId, expiresIn);

    return sessionId;
  }

  async deleteSessionID(sessionId: string) {
    return await this.redisService.del(sessionId);
  }
}
