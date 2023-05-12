import {
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
  NotFoundException,
  InternalServerErrorException,
  ParseIntPipe,
  Post,
  Body,
  Delete,
} from '@nestjs/common'
import { AnswerService } from './answer.service'
import { RedisService } from '@liaoliaots/nestjs-redis'
import { Redis } from 'ioredis'
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { Prisma } from '@prisma/client'

@Controller('answer')
export class AnswerController {
  private readonly redisService: Redis
  constructor(
    private readonly answerService: AnswerService,
    private readonly nestRedisService: RedisService,
  ) {
    this.redisService = this.nestRedisService.getClient()
  }

  /**ユーザーに紐づけられた回答をすべて取得する */
  @UseGuards(AuthGuard('cookie'))
  @Get()
  async getAllAnswersByUser(@Req() req: Request) {
    try {
      const answers = await this.answerService.getAllAnswersByUser(req.user.id)
      if (!answers) {
        throw new NotFoundException(
          'Searched but no answers. Please answer the question and save the results',
        )
      }

      return answers
    } catch (error) {
      if (error instanceof Error) throw error
    }
  }

  /**ユーザーに紐づけられた1つの回答を取得する */
  @UseGuards(AuthGuard('cookie'))
  @Get('/:answerId')
  async getOneAnswerByUser(
    @Req() req: Request,
    @Param('answerId', ParseIntPipe) answerId: number,
  ) {
    try {
      const answer = await this.answerService.getOneAnswerByUser(
        req.user.id,
        answerId,
      )

      if (!answer) {
        throw new NotFoundException(
          'Searched but no answers. Please answer the question and save the results',
        )
      }

      return answer
    } catch (error) {
      if (error instanceof Error) throw error
    }
  }

  /** ユーザーが質問に回答した際に１つの回答を保存する*/
  @UseGuards(AuthGuard('cookie'))
  @Post('/:subsidyId')
  async createOneAnswer(
    @Req() req: Request,
    @Body() dto: Prisma.JsonArray,
    @Param('subsidyId', ParseIntPipe) subsidyId: number,
  ) {
    try {
      // Prismaを用いてDBに回答を保存する
      const ansewr = await this.answerService.createOneAnswer(
        dto,
        req.user.id,
        subsidyId,
      )

      if (!ansewr) {
        throw new Error()
      }

      return {
        message: 'ok',
      }
    } catch (error) {}
  }

  /** ユーザーに紐づいた１つの回答を削除する */
  @UseGuards(AuthGuard('cookie'))
  @Delete('/:answerId')
  async deleteOneAnswer(@Param('answerId', ParseIntPipe) answerId: number) {
    try {
      await this.answerService.deleteOneAnswer(answerId)

      return {
        message: 'ok',
        statusCode: '204',
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'There are no answers to delete. Answer the question and save it.',
          )
        }
      }

      throw new InternalServerErrorException('Failed to delete the answer')
    }
  }
}
