import { Injectable } from '@nestjs/common';
import {
  RedisModuleOptions,
  RedisOptionsFactory,
  RedisService as NestRedisService,
} from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements RedisOptionsFactory {
  private readonly redisClient: Redis;
  constructor(private readonly nestRedisService: NestRedisService) {
    this.redisClient = this.nestRedisService.getClient();
  }
  async createRedisOptions(): Promise<RedisModuleOptions> {
    return {
      readyLog: true,
      config: {
        host: 'redis_container',
        port: 6379,
        password: 'authpassword',
      },
    };
  }

  async setValue(
    key: string,
    value: string,
    expiresIn: number,
  ): Promise<string> {
    return await this.redisClient.set(key, value, 'EX', expiresIn);
  }

  /*
   * Redisに存在する特定のレコードの値を取得する
   * @param key Redisのキー
   * @return セッションID
   */
  async getValue(key: string): Promise<number> {
    const userId = parseInt(await this.redisClient.get(key));
    return userId;
  }

  async delete(key: string): Promise<number> {
    return await this.redisClient.del(key);
  }
}
