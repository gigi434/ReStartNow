import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { AvailableSubsidiesDto } from './dto/get-available-subsidies.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { SubsidyStrategyFactory } from './factory/subsidy-strategy-factory'
@Injectable()
export class ResultService {
  constructor(private readonly prismaService: PrismaService) {}

  async GetBenefitThroughTheQuestion(
    dto: AvailableSubsidiesDto,
    subsidyId: number,
  ): Promise<number | boolean> {
    // 助成金IDから対応する助成金を取得する
    const subsidy = await this.prismaService.subsidy.findUnique({
      where: { id: subsidyId },
    })
    if (!subsidy) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No strategy found for subsidy ID: ${subsidyId}`,
      })
    }
    // 市町区村の助成金ごとに定めたアルゴリズムを見つける
    const strategy = SubsidyStrategyFactory.createStrategy(subsidy.id)

    // 回答から受給要件を満たしているか判定する
    const amountOfBenefit = await strategy.isEligible(dto)

    return amountOfBenefit
  }

  /**
   * 住居確保給付金の対象者であるかどうかを判定する関数
   */
  // async isEligibleForHousingGrant(dto: HousingGrantDto, subsidy: Subsidy) {
  //   try {
  //     const incomeThresholds = [10000, 50000]
  //     // Check all 9 conditions
  //     const condition1 = dto.economicHardship === true
  //     const condition1YearsAgo = new Date(dto.employmentDate)
  //       ? (new Date().getTime() - new Date(dto.employmentDate).getTime()) /
  //           31536000000 <=
  //         2 // 1 year = 31536000000 milliseconds
  //       : false
  //     const condition2 =
  //       condition1YearsAgo ||
  //       dto.monthlyIncome <= 0.5 * incomeThresholds[dto.memberCount - 1]
  //     const condition3 = dto.totalIncome > 0
  //     const condition4 = dto.jobSeekerRegistration === true
  //     const condition5 =
  //       dto.totalIncome +
  //         (dto.memberCount - 1) * 16000 - // Deduct 16000 yen from each additional dto member
  //         dto.monthlyIncome >
  //       dto.rent + incomeThresholds[dto.memberCount - 1]
  //     const condition6 =
  //       dto.memberCount === 1
  //         ? dto.totalAssets <= financialAssetThresholds[0]
  //         : dto.memberCount === 2
  //         ? dto.totalAssets <= financialAssetThresholds[1]
  //         : dto.totalAssets <= financialAssetThresholds[2]
  //     const condition7 = true // Cannot be checked in this code as it requires external data
  //     const condition8 = dto.isViolentGangMember !== true
  //     const condition9 = dto.receivingPublicAssistance !== true

  //     // Return true if all conditions are met
  //     return condition1 &&
  //       condition2 &&
  //       condition3 &&
  //       condition4 &&
  //       condition5 &&
  //       condition6 &&
  //       condition7 &&
  //       condition8 &&
  //       condition9
  //       ? maximumBenefitPayments[dto.memberCount - 1]
  //       : false
  //   } catch (error) {
  //     throw new Error(
  //       `'Error checking eligibility:' ${(error as Error).message}`,
  //     )
  // }
  // }
}
