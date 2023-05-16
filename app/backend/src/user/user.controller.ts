import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import { Msg } from './interface/user.interface'
import { Request, Response } from 'express'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthenticatedGuard } from '../auth/guard/local.guard'
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthenticatedGuard)
  @HttpCode(HttpStatus.OK)
  @Post('delete')
  async deleteUserById(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    try {
      await this.userService.deleteOneUserById(req.user.id)
      req.session.destroy((err) => {
        if (err) {
          throw new InternalServerErrorException('Failed to destroy session')
        }
      })
      res.clearCookie('session-id')
      return {
        message: 'complete user account deletion',
      }
    } catch (err) {
      throw new Error(err.toString())
    }
  }

  @UseGuards(AuthenticatedGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('/password')
  async changeUserPassword(@Req() req: Request, @Body() dto: UpdateUserDto) {
    await this.userService.changeUserPassword(req.user.id, dto)

    return {
      message: 'User account password has been changed.',
    }
  }
}
