import { Injectable } from '@nestjs/common';
import {
  RedisModuleOptions,
  RedisOptionsFactory,
} from '@liaoliaots/nestjs-redis';

@Injectable()
export class RedisConfigService implements RedisOptionsFactory {
  createRedisOptions(): RedisModuleOptions {
    return {
      readyLog: true,
      config: {
        host: 'redis_container',
        port: 6379,
        password: 'authpassword',
      },
    };
  }
}
