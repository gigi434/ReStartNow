import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { QuestionService } from './question.service'

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  /* 助成金に設定されている質問をすべて返す関数オブジェクト */
  @Get(':subsidyId')
  async getQuestionsBySubsidyId(
    @Param('subsidyId', ParseIntPipe) subsidyId: number,
  ) {
    const Questions = await this.questionService.getQuestionsBySubsidyId(
      subsidyId,
    )

    return Questions
  }
}
