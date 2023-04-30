import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { AvailableSubsidiesDto } from './dto/get-available-subsidies.dto';
import { ResultService } from './result.service';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}
  @HttpCode(HttpStatus.OK)
  @Post(':subsidyId')
  /** 質問の回答から助成金の受給要件に合致しているのか判定する */
  async getSubsidiesThroughTheQuestion(
    @Body() dto: AvailableSubsidiesDto,
    @Param('subsidyId', ParseIntPipe) subsidyId: number,
  ): Promise<number | boolean> {
    try {
      const amountOfBenefit =
        await this.resultService.getBenefitThroughTheQuestion(dto, subsidyId);

      if (amountOfBenefit) {
        return amountOfBenefit;
      }
      // falseの場合は受給要件を満たしていない
      return false;
    } catch (err) {
      throw new Error(err.toString());
    }
  }
}
