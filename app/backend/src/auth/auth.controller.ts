import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import { Msg } from './interfaces/auth.interfaces'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'
import { AuthenticatedGuard, LocalAuthGuard } from './guard/local.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: AuthDto): Promise<Msg> {
    return this.authService.signUp(dto)
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(): Promise<Msg> {
    return {
      message: 'ok',
    }
  }

  @UseGuards(AuthenticatedGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to destroy session' })
        }
      })

      res.clearCookie('session-id')

      return {
        message: 'complete logout',
      }
    } catch (err) {
      throw new InternalServerErrorException()
    }
  }
}
