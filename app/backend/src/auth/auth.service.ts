import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { Msg } from './interfaces/auth.interfaces';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly redis: RedisService,
  ) {}
  /* ユーザー作成 */
  async signUp(dto: AuthDto): Promise<Msg> {
    // パスワードからハッシュ値を計算する
    const hashed = await bcrypt.hash(dto.password, 12);
    try {
      await this.prisma.user.create({
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
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Email or password incorrect');
    const isValid = await bcrypt.compare(dto.password, user.hashedPassword);
    if (!isValid) throw new ForbiddenException('Email or password incorrect');

    // セッションIDを作成してログイン済みのユーザー情報をRedisに保存する
    const sessionId = uuidv4();
    const client = this.redis.getClient();
    await client.set(sessionId, JSON.stringify(user));
    await client.expire(sessionId, 3600); // セッションの有効期限を1時間に設定

    return sessionId;
  }
}
