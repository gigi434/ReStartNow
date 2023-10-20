import { Injectable, NotFoundException } from '@nestjs/common'
import { ResultFactory } from '@/src/result/factory/result.factory'
import { AvailableSubsidiesDto } from '@/src/result/dto'
import { PrismaService } from '../prisma/prisma.service'
@Injectable()
export class ResultService {
  constructor(
    private readonly resultFactory: ResultFactory,
    private readonly prismaService: PrismaService,
  ) {}

  async calculateSubsidyAmount(
    dto: AvailableSubsidiesDto,
    subsidyId: number,
  ): Promise<number | boolean> {
    // DBから助成金の情報を取得
    const subsidy = await this.prismaService.subsidy.findUnique({
      where: { id: subsidyId },
      include: {
        subsidyName: true,
        municipality: {
          include: {
            prefecture: true,
          },
        },
      },
    })
    if (!subsidy) {
      throw new NotFoundException('Invalid subsidyId')
    }

    // 助成金ローマ字名から自治体ファクトリーを見つける
    const factory = await this.resultFactory.createFactory(
      subsidy.municipality.prefecture.hepburnName,
      subsidy.municipality.hepburnName,
    )
    if (!factory) {
      throw new NotFoundException(`Invalid subidyId: ${subsidyId}`)
    }

    // 自治体ファクトリーに回答状況を渡し、受給金額計算クラスを取得し受け取る金額を計算する
    const calculater = factory.getSubsidyAmountCalculator(
      subsidy.subsidyName.hepburnName,
    )
    await calculater.initialize(subsidyId)
    return calculater.calculateAmount(dto)
  }
}
