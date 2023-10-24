import { PrivateRentalHousingSubsidyDto } from '@/src/result/dto'
import { BaseGrantCalculator } from './BaseGrant'

type EligibilityConditionData = {
  // 立ち退き後の家賃上限額
  monthlyRentAfterEviction: number
  // 公営住宅法で定められた金額
  incomeThreshold: {
    salariedEmployees: {
      [K: string]: number
    }
    businessIncomeEarner: {
      [K: string]: number
    }
    pensionIncomeEarner: {
      [K: string]: number
    }
  }
}

type AmountData = {
  newRentThreshold: number
  housingRentSubsidyThreshold: number
  relocationSubsidyThreshold: number
}
// 民間賃貸住宅家賃等助成制度
export abstract class BasePrivateRentalHousing extends BaseGrantCalculator {
  public eligibilityCondition: EligibilityConditionData
  public amountCondition: AmountData

  public calculateAmount(dto: PrivateRentalHousingSubsidyDto): number | false {
    if (!this.checkEligibility(dto)) {
      return false
    }

    const totalAmount = this.calculateConditionAmount(dto)

    return totalAmount
  }
  /** 受給資格があるかどうか確認するメソッド */
  public checkEligibility(dto: PrivateRentalHousingSubsidyDto): boolean {
    // 現在の住居が民間賃貸であること
    if (dto.currentHousing === false) return false

    // 自治体に引き続き2年以上居住し、住民登録をされていること。
    if (dto.isRegisteredResidentForOverTwoYears === false) return false

    // 下記二つのどちらかに該当する世帯であること
    // 65歳以上の一人暮らし、または全員が65歳以上であることを確認
    // 心身障害者がいる、または一人親、または父母のない児童を養育している世帯であることを確認
    if (dto.hasSpecialFamilyCondition === false) return false

    // 前年の収入が公営住宅法で定められた金額以下であることを確認
    // 世帯の人数や特性に基づいて収入の上限を決定する
    const incomeThreshold: number =
      this.eligibilityCondition.incomeThreshold[dto.earningsCategory][
        dto.familyType
      ]
    // ユーザーの収入が上限を超えていないことを確認
    if (dto.yearlyEarnings > incomeThreshold) return false

    // 立ち退き後の家賃が上限額以下であることを確認
    if (
      dto.monthlyRentAfterEviction >
      this.eligibilityCondition.monthlyRentAfterEviction
    )
      return false

    // 生活保護を受けていないことを確認
    if (dto.isReceivingWelfare === true) return false

    // 全ての条件を満たした場合
    return true
  }
  /** どのくらい受給できるのか計算するメソッド */
  public calculateConditionAmount(dto: PrivateRentalHousingSubsidyDto): number {
    let totalAmount = 0

    // 住宅家賃助成金の計算
    let rentDifference = 0
    // 立ち退き後に入居した住宅の家賃が給付上限額を超える場合、給付上限額と立ち退き前の家賃との差額を受給する
    if (dto.monthlyRentAfterEviction > this.amountCondition.newRentThreshold) {
      rentDifference =
        this.amountCondition.newRentThreshold - dto.monthlyRentBeforeEviction
    } else {
      rentDifference =
        dto.monthlyRentAfterEviction - dto.monthlyRentBeforeEviction
    }
    // rentDifferenceがマイナスの場合は0を代入
    totalAmount += rentDifference = Math.max(rentDifference, 0)

    // 転居費用助成金の計算
    const totalExpenses = dto.giftMoney + dto.brokerageFee - dto.evictionFee
    totalAmount += Math.min(
      totalExpenses,
      this.amountCondition.relocationSubsidyThreshold,
    )

    return totalAmount
  }
}
