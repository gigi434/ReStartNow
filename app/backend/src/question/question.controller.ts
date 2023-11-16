import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import { QuestionService } from './question.service'

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  /** 全ての質問を返す関数オブジェクト */
  @Get()
  async getAllQuesitons() {
    const questions = await this.questionService.GetAllQuestions()

    try {
      if (questions.length === 0) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: `Missing questions`,
        })
      }
    } catch (err) {}

    return questions
  }

  /** 助成金に設定されている質問をすべて返す関数オブジェクト */
  @Get(':subsidyId')
  async getQuestionsBySubsidyId(
    @Param('subsidyId', ParseIntPipe) subsidyId: number,
  ) {
    const questionsWithSubsidy =
      await this.questionService.getQuestionsBySubsidyId(subsidyId)
    if (questionsWithSubsidy.questions.length === 0) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Missing questions(subsidyId: ${subsidyId})`,
      })
    }
    return questionsWithSubsidy
  }
}
