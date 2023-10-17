import { ChildbirthSupportGrantDto } from '@/src/result/dto'
import { BaseGrantCalculator } from './BaseGrant'

type EligibilityConditionData = {
  isResidency: boolean
  deadlineDate: string
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
    if (this.eligibilityCondition.isResidency !== dto.isResidency) {
      return false
    }
    // 令和5年3月8日（2023年3月8日）以前に妊娠届出または出産をした人は申請期限を過ぎていれば受給要件に合致しない
    if (
      new Date(dto.childBirthDate).getTime() <
      new Date(this.eligibilityCondition.deadlineDate).getTime()
    ) {
      return false
    }

    return true
  }

  /** どのくらい受給できるのか計算するメソッド */
  public calculateConditionAmount(dto: ChildbirthSupportGrantDto): number {
    let amount = 0

    // 妊娠面談を受けていないなら受給できる
    if (!dto.havePregnancyInterview) {
      amount += this.amountCondition.havePregnancyInterview
    }

    // 出産面談を受けていないなら受給できる
    if (!dto.haveChildcareInterview) {
      amount += this.amountCondition.haveChildcareInterview
    }

    return amount
  }
}
