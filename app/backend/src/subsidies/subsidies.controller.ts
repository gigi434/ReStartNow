import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import { SubsidiesService } from './subsidies.service'
import { QuestionService } from '../question/question.service'

@Controller('subsidies')
export class SubsidiesController {
  constructor(
    private readonly subsidyService: SubsidiesService,
    private readonly questionService: QuestionService,
  ) {}

  /**
   * 全ての助成金を取得する関数オブジェクト
   */
  @Get()
  async getAllSubsidies() {
    try {
      const subsidies = await this.subsidyService.getAllSubsidies()

      if (!subsidies || subsidies.length === 0) {
        throw new NotFoundException()
      }

      return subsidies
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        throw new Error(error.message)
      }

      return []
    }
  }

  /** 市町区村に紐づく助成金をすべて取得する関数オブジェクト */
  @Get(':municipalityId')
  async getOneSubsidyById(
    @Param('municipalityId', ParseIntPipe) municipalityId: number,
  ) {
    try {
      const subsidy = await this.subsidyService.getOneSubsidyMunicipalityById(
        municipalityId,
      )

      return subsidy
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }

      return []
    }
  }

  /** 助成金に紐づく質問を全て取得する */
  @Get(':subsidyId/questions')
  async getQuestionsBySubsidyId(
    @Param('subsidyId', ParseIntPipe) subsidyId: number,
  ) {
    const questions = await this.questionService.getQuestionsBySubsidyId(
      subsidyId,
    )

    return questions
  }
}
