import { Injectable, NotFoundException } from '@nestjs/common'
import { ResultFactory } from '@/src/result/factory/result.factory'
import { AvailableSubsidiesDto } from '@/src/result/dto'
@Injectable()
export class ResultService {
  constructor(private readonly resultFactory: ResultFactory) {}

  async calculateSubsidyAmount(
    dto: AvailableSubsidiesDto,
    subsidyId: number,
  ): Promise<number | boolean> {
    // 助成金IDから自治体ファクトリーを見つける
    const factory = await this.resultFactory.createFactory(subsidyId)
    if (!factory) {
      throw new NotFoundException(`Invalid subidyId: ${subsidyId}`)
    }
    // 自治体ファクトリーに回答状況を渡し、受給金額計算クラスを取得し受け取る金額を計算する
    const calculater = factory.getSubsidyAmountCalculator(subsidyId)
    await calculater.initialize(subsidyId)
    return calculater.calculateAmount(dto)
  }
}
