import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class SubsidiesService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 全ての助成金を取得する関数オブジェクト
   */
  async getAllSubsidies() {
    const subsidies = await this.prismaService.subsidy.findMany()
    return subsidies
  }

  /** 個別の助成金を取得する関数オブジェクト */
  async getOneSubsidyMunicipalityById(municipalityId: number) {
    const subsidy = await this.prismaService.subsidy.findMany({
      where: {
        municipalityId: municipalityId,
      },
    })

    return subsidy
  }
}
