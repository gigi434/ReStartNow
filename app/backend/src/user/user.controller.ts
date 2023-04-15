import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { BadRequestException } from '@nestjs/common';
import { Msg } from './interface/user.interface';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('cookie'))
  @HttpCode(HttpStatus.OK)
  @Post()
  async deleteUserById(@Req() req: Request): Promise<Msg> {
    try {
      await this.userService.deleteOneUserById(req.cookies['session-id']);
    } catch {
      throw new BadRequestException(
        'User cannot be deleted. Please reopen the browser again or delete the cache.',
      );
    }

    return {
      message: 'User account deletion is complete.',
    };
  }

  @UseGuards(AuthGuard('cookie'))
  @HttpCode(HttpStatus.OK)
  @Patch(':id/password')
  async changeUserPassword(@Req() req: Request, @Body() dto: UpdateUserDto) {
    await this.userService.changeUserPassword(req.cookies['session-id'], dto);

    return {
      message: 'User account password has been changed.',
    };
  }
}
