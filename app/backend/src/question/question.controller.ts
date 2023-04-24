import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  /* 市町区村に紐づけられている助成金に設定されている質問をすべて返す関数オブジェクト */
  @Get(':municipalityId')
  async getQuestionsByMunicipalityId(
    @Param('municipalityId', ParseIntPipe) municipalityId: number,
  ) {
    const Questions = await this.questionService.getQuestionByMunicipalityId(
      municipalityId,
    );

    return Questions;
  }
}
