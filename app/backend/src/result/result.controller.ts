import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  ParseIntPipe,
  InternalServerErrorException,
} from '@nestjs/common'
import { AvailableSubsidiesDto } from './dto'
import { ResultService } from './result.service'

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}
  @HttpCode(HttpStatus.OK)
  @Post(':subsidyId')
  /** 質問の回答から助成金の受給要件に合致しているのか判定する */
  async getReceivedAmountByTheQuestion(
    @Body() dto: AvailableSubsidiesDto,
    @Param('subsidyId', ParseIntPipe) subsidyId: number,
  ) {
    try {
      const amount = await this.resultService.calculateSubsidyAmount(
        dto,
        subsidyId,
      )

      // 受給要件を満たしていない場合はfalseを返す
      return { amount }
    } catch (error) {
      if (error instanceof Error)
        throw new InternalServerErrorException(error.toString())
    }
  }
}
