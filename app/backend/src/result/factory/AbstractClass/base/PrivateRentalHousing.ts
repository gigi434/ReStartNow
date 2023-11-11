import { PrivateRentalHousingSubsidyDto } from '@/src/result/dto'
import { BaseGrantCalculator } from './BaseGrant'

type EligibilityConditionData = {
  // 立ち退き後の家賃上限額
  monthlyNewHousingRent: number
  // 特別な家族構成の種類
  specialFamilyConditions: string[]
  // 公営住宅法で定められた金額
  incomeThresholds: {
    earningsCategory: string
    familyType: string
    isSpecialFamilyCondition: boolean
    threshold: number
  }[]
}

type AmountData = {
  newRentThreshold: number
  housingRentSubsidyThreshold: number
  relocationSubsidyThreshold: number
  rentSubsidyCap: number
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
    // 現在居住している民間賃貸住宅の取り壊し等のため立ち退きを求められている
    if (dto.isEvictionRequested === false) return false

    // 現在の住居が市町区村内の民間賃貸であること
    if (dto.currentHousing === false) return false

    // 自治体に引き続き2年以上居住し、住民登録をされていること。
    if (dto.isRegisteredResidentForOverTwoYears === false) return false

    // 下記二つのどちらかに該当する世帯であること
    // 65歳以上の一人暮らし、または全員が65歳以上であることを確認
    // 心身障害者がいる、または一人親、または父母のない児童を養育している世帯であることを確認
    if (dto.hasSpecialFamilyCondition === 'N/A') return false

    // 前年の収入が公営住宅法で定められた金額以下であることを確認する
    // 特別な家族構成かどうかを判断
    const isSpecialFamily =
      this.eligibilityCondition.specialFamilyConditions.includes(
        dto.hasSpecialFamilyCondition,
      )

    // 収入の上限を確認するために適切な閾値を見つけます。
    const incomeThresholdObject =
      this.eligibilityCondition.incomeThresholds.find((threshold) => {
        if (dto.familyType === 'single') {
          // 単身者の場合は特別な家族構成フラグを考慮しません。
          return (
            threshold.earningsCategory === dto.earningsCategory &&
            threshold.familyType === 'single'
          )
        } else {
          // 二人世帯の場合は特別な家族構成フラグを考慮します。
          return (
            threshold.earningsCategory === dto.earningsCategory &&
            threshold.familyType === 'couple' &&
            threshold.isSpecialFamilyCondition === isSpecialFamily
          )
        }
      })
    // 適切な閾値が見つからないか、年収が閾値を超えている場合、資格がないと判断する
    if (
      !incomeThresholdObject ||
      dto.yearlyEarnings > incomeThresholdObject.threshold
    ) {
      return false
    }

    // 立ち退き後の家賃が限度額以下であることを確認
    if (
      dto.monthlyNewHousingRent >
      this.eligibilityCondition.monthlyNewHousingRent
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
    const rentSubsidy = Math.min(
      // 立ち退き後の住宅家賃が限度額より高ければ限度額と立ち退き前の家賃の差額を助成する
      dto.monthlyNewHousingRent > this.amountCondition.newRentThreshold
        ? this.amountCondition.newRentThreshold - dto.monthlyRentBeforeEviction
        : // 限度額より低ければ立ち退き後と立ち退き前の家賃の差額を助成する
          dto.monthlyNewHousingRent - dto.monthlyRentBeforeEviction,
      this.amountCondition.rentSubsidyCap,
    )
    // rentSubsidyがマイナスの場合は0を代入
    totalAmount += Math.max(rentSubsidy, 0)

    // 転居費用助成金の計算
    const relocationSubsidy = Math.min(
      dto.gratuityFee + dto.brokerageFee - dto.evictionFee,
      this.amountCondition.relocationSubsidyThreshold,
    )
    // relocationSubsidyがマイナスの場合は0を代入
    totalAmount += Math.max(relocationSubsidy, 0)

    return totalAmount
  }
}
