import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { Msg } from './interfaces/auth.interfaces';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: AuthDto): Promise<Msg> {
    return this.authService.signUp(dto);
  }

  // Postリクエストはすべてステータスコードが201(created)になるため、Postリクエストだが作成はしない場合は適宜デコレーターで変更する
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: AuthDto,
    // NestJSではデフォルトで返り値はJSONに初期化されるstandard modeだが、@Resデコレーターを使用するとExpressの仕様になるためこのモードが無効化される。
    // JSONでのシリアライズと@Resデコレーターを両立するためにpassthroughをtrueにする
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    const user = await this.authService.login(dto);
    const sessionId = await this.authService.createSessionID(user.id);

    res.cookie('session-id', sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
    });

    return {
      message: 'ok',
    };
  }

  @UseGuards(AuthGuard('cookie'))
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    await this.authService.deleteSessionID(req.cookies['session-id']);

    res.cookie('session-id', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
    });

    return {
      message: 'ok',
    };
  }
}
