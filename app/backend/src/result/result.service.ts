import { Injectable } from '@nestjs/common'
import {
  AvailableSubsidiesDto,
  HousingGrantDto,
  ChildbirthSupportGrantDto,
} from './dto/get-available-subsidies.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Subsidy } from '@prisma/client'
import {
  HousingGrant,
  ChildbirthSupportGrant,
} from './interfaces/get-eligibilityRequirements.interface'

@Injectable()
export class ResultService {
  constructor(private readonly prismaService: PrismaService) {}
  async getBenefitThroughTheQuestion(
    dto: AvailableSubsidiesDto,
    subsidyId: number,
  ): Promise<number | boolean> {
    interface SubsidyInfo {
      isEligible: (dto: any, subsidy) => Promise<number | boolean>
    }

    const subsidiesInfo: { [key: string]: SubsidyInfo } = {
      住居確保給付金: {
        isEligible: async (dto: HousingGrantDto) =>
          this.isEligibleForHousingGrant(dto, subsidy),
      },
      '出産・子育て応援給付金': {
        isEligible: async (dto: ChildbirthSupportGrantDto) =>
          this.isEligibleForChildbirthSupportGrant(dto, subsidy),
      },
      // 他の自治体に関する情報を追加
    }
    // 助成金IDから対応する助成金を取得する
    const subsidy = await this.prismaService.subsidy.findUnique({
      where: { id: subsidyId },
    })
    // 回答から受給要件を満たしているか判定する
    const subsidyInfo = subsidiesInfo[subsidy.name]

    return await subsidyInfo.isEligible(dto, subsidy)
  }

  /**
   * 住居確保給付金の対象者であるかどうかを判定する関数
   */
  async isEligibleForHousingGrant(dto: HousingGrantDto, subsidy: Subsidy) {
    try {
      const housingAllowanceCondition =
        subsidy.eligibilityRequirements as HousingGrant
      // Check all 9 conditions
      const condition1 = dto.economicHardship === true
      const condition1YearsAgo = new Date(dto.employmentDate)
        ? (new Date().getTime() - new Date(dto.employmentDate).getTime()) /
            31536000000 <=
          2 // 1 year = 31536000000 milliseconds
        : false
      const condition2 =
        condition1YearsAgo ||
        dto.monthlyIncome <=
          0.5 * housingAllowanceCondition.incomeThresholds[dto.memberCount - 1]
      const condition3 = dto.totalIncome > 0
      const condition4 = dto.jobSeekerRegistration === true
      const condition5 =
        dto.totalIncome +
          (dto.memberCount - 1) * 16000 - // Deduct 16000 yen from each additional dto member
          dto.monthlyIncome >
        dto.rent +
          housingAllowanceCondition.incomeThresholds[dto.memberCount - 1]
      const condition6 =
        dto.memberCount === 1
          ? dto.totalAssets <=
            housingAllowanceCondition.financialAssetThresholds[0]
          : dto.memberCount === 2
          ? dto.totalAssets <=
            housingAllowanceCondition.financialAssetThresholds[1]
          : dto.totalAssets <=
            housingAllowanceCondition.financialAssetThresholds[2]
      const condition7 = true // Cannot be checked in this code as it requires external data
      const condition8 = dto.isViolentGangMember !== true
      const condition9 = dto.receivingPublicAssistance !== true

      // Return true if all conditions are met
      return condition1 &&
        condition2 &&
        condition3 &&
        condition4 &&
        condition5 &&
        condition6 &&
        condition7 &&
        condition8 &&
        condition9
        ? housingAllowanceCondition.maximumBenefitPayments[dto.memberCount - 1]
        : false
    } catch (error) {
      throw new Error(
        `'Error checking eligibility:' ${(error as Error).message}`,
      )
    }
  }

  /**
   * 出産・子育て応援給付金の条件を判定する関数
   */
  async isEligibleForChildbirthSupportGrant(
    dto: ChildbirthSupportGrantDto,
    subsidy: Subsidy,
  ): Promise<number | boolean> {
    const childbirthSubsidyCondition =
      subsidy.eligibilityRequirements as ChildbirthSupportGrant

    // 住民票がなければ受給要件に合致しない
    if (dto.hasResidence !== true) {
      return false
    }

    // 妊娠届出時と出生届出時ともに面談を行っているのであればすでに全額受け取り済みと判断する
    if (dto.hasChildcareInterview && dto.hasPregnancyInterview) {
      return 0
    }

    // 妊娠届出時と出生届出時どちらか面談を行っているのであれば
    if (dto.hasChildcareInterview || dto.hasPregnancyInterview) {
      return childbirthSubsidyCondition.maximumBenefitPayments[0]
    }

    return childbirthSubsidyCondition.maximumBenefitPayments[1]
  }
}
