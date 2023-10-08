import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/src/prisma/prisma.service'
import { SubsidyCalculatorAbstractFactory } from '../interface/subsidy-strategy-factory'
import { IchikawashiFactory } from './ConcreateFactory/ichikawashi'

@Injectable()
export class ResultFactory {
  private factories: { [key: string]: SubsidyCalculatorAbstractFactory } = {}

  constructor(
    private readonly prismaService: PrismaService,
    private readonly ichikawashiFactory: IchikawashiFactory,
  ) {
    this.factories[9] = this.ichikawashiFactory
  }

  async createFactory(subsidyId: number) {
    // DBから助成金の情報を取得
    const subsidy = await this.prismaService.subsidy.findUnique({
      where: { id: subsidyId },
    })
    if (!subsidy) {
      throw new NotFoundException('Invalid subsidyId')
    }

    // Factoryを返す
    const factory = this.factories[subsidy.municipalityId]
    if (!factory) {
      throw new NotFoundException('Invalid municipalityId')
    }
    return factory
  }
}
