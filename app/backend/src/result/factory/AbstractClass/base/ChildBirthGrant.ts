import { ChildbirthSupportGrantDto } from '@/src/result/dto'
import { BaseGrantCalculator } from './BaseGrant'

type EligibilityConditionData = {
  isResidency: boolean
}

type AmountData = {
  havePregnancyInterview: number
  haveChildcareInterview: number
}
/** 出産・子育て応援給付金受給額を産出する計算を行うデフォルトのクラス */
export abstract class BaseChildBirthGrant extends BaseGrantCalculator {
  public eligibilityCondition: EligibilityConditionData
  public amountCondition: AmountData

  /** どのくらい受け取られるか算出するメソッド */
  public calculateAmount(dto: ChildbirthSupportGrantDto) {
    if (!this.checkEligibility(dto)) {
      return false
    }

    const totalAmount = this.calculateConditionAmount(dto)

    return totalAmount
  }

  /** 受給資格があるかどうか確認するメソッド */
  public checkEligibility(dto: ChildbirthSupportGrantDto): boolean {
    if (!this.eligibilityCondition) {
      throw new Error('Eligibility condition is null or undefined.')
    }
    // 住民票がないなら受給要件を満たさない
    if (dto.isResidency !== this.eligibilityCondition.isResidency) {
      return false
    }
    // 令和5年3月8日（2023年3月8日）以前に妊娠届出または出産をした人は申請期限を過ぎていれば受給要件を満たさない
    if (dto.isPregnancyReportedOrChildBornAfterApril2022 === false) {
      return false
    }

    return true
  }

  /** どのくらい受給できるのか計算するメソッド */
  public calculateConditionAmount(dto: ChildbirthSupportGrantDto): number {
    let amount = 0

    // 妊娠面談を受けていないなら出産応援給付金を受給できる
    if (dto.havePregnancyInterview === false) {
      amount += this.amountCondition.havePregnancyInterview
    }

    // 出産面談を受けていないなら子育て応援給付金を出産する子供の数に応じて受給できる
    if (dto.haveChildcareInterview === false) {
      amount +=
        this.amountCondition.haveChildcareInterview *
        dto.numberOfExpectedChildren
    }

    return amount
  }
}
