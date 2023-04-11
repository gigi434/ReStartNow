import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // whitelistはリクエストからdtoに定義されていないメンバーを削除する
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // CORSの設定
  app.enableCors({
    credentials: true,
    origin: ['http://nextjs_container:8080'],
  });
  // クッキーから値を取得する
  app.use(cookieParser());
  await app.listen(3005);
}
bootstrap();
