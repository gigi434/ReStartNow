import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
// import RedisStore from 'connect-redis'
// import session from 'express-session'
// import Redis from 'ioredis'
// import passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // whitelistはリクエストからdtoに定義されていないメンバーを削除する
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  // // Redisの設定
  // const redisClient = new Redis(process.env.REDIS_URL)
  // await new Promise((resolve) => redisClient.on('connect', resolve))
  // const redisStore = new RedisStore({
  //   client: redisClient,
  // })
  // app.use(
  //   session({
  //     name: 'session-id',
  //     store: redisStore, // RedisStoreを初期化する
  //     secret: process.env.REDIS_SECRET,
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       httpOnly: true,
  //       secure: false,
  //       sameSite: 'none',
  //       path: '/',
  //       maxAge: 7 * 24 * 60 * 60 * 1000, // 7days,
  //     },
  //   }),
  // )
  // app.use(passport.initialize())
  // app.use(passport.session())

  // CORSの設定
  app.enableCors({
    credentials: false,
    origin: ['*'],
    allowedHeaders: ['Origin, X-Requested-With, Content-Type, Accept'],
  })

  await app.listen(3005)
}
bootstrap()
