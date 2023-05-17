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
  HttpStatus,
  HttpCode,
} from '@nestjs/common'
import { AnswerService } from './answer.service'
import { Request } from 'express'
import { Prisma } from '@prisma/client'
import { AuthenticatedGuard } from 'src/auth/guard/local.guard'

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  /** ユーザーに紐づけられた回答をすべて取得する */
  @UseGuards(AuthenticatedGuard)
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

  /** ユーザーに紐づけられた1つの回答を取得する */
  @UseGuards(AuthenticatedGuard)
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
  @UseGuards(AuthenticatedGuard)
  @Post('/:subsidyId')
  async createOneAnswer(
    @Req() req: Request,
    @Body() dto: Prisma.JsonArray,
    @Param('subsidyId', ParseIntPipe) subsidyId: number,
  ) {
    try {
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
  @UseGuards(AuthenticatedGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:answerId')
  async deleteOneAnswer(@Param('answerId', ParseIntPipe) answerId: number) {
    try {
      await this.answerService.deleteOneAnswer(answerId)

      return {
        message: 'ok',
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
