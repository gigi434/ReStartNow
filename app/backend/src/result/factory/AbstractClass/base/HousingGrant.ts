import { HousingGrantDto } from '@/src/result/dto/get-available-subsidies.dto'
import { BaseGrantCalculator } from './BaseGrant'

type EligibilityConditionData = {
  // 基準額
  incomeThreshold: {
    [K: string]: number
  }
  // 金融資産額
  financialAssets: {
    [K: string]: number
  }
}

type AmountData = {
  // 世帯人数に応じた給付金額
  numberOfFamilyMembers: {
    [K: string]: number
  }
}

export abstract class BaseHousingGrant extends BaseGrantCalculator {
  public eligibilityCondition: EligibilityConditionData
  public amountCondition: AmountData

  public calculateAmount(dto: HousingGrantDto): number | false {
    if (!this.checkEligibility(dto)) {
      return false
    }

    const totalAmount = this.calculateConditionAmount(dto)

    return totalAmount
  }
  /** 受給資格があるかどうか確認するメソッド */
  public checkEligibility(dto: HousingGrantDto): boolean {
    // (1) 離職等により経済的に困窮し、家賃の支払いが困難で、住居を喪失した、または住居喪失のおそれがあること。
    if (!dto.economicHardship) {
      return false
    }

    // （2）次のイまたはロのいずれかに該当すること。
    // イ）申請日において、離職・自営業の廃業の日から原則2年以内である。
    // 疾病・負傷・育児・介護などやむを得ない事情があり2年を経過した場合は、別途ご相談ください。
    // ロ）給与等を得る機会が本人の責に帰すべき理由、本人の都合によらないで減少し、離職や廃業と同程度の状況にある。
    const twoYearsAgo = new Date()
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2)

    if (
      dto.employmentDate <= twoYearsAgo ||
      dto.isIncomeStatusCritical !== true
    ) {
      return false
    }

    // （3）次のイまたはロのいずれかに該当すること。
    // イ）離職等の日において、その属する世帯の生計を主として維持していた。
    // ロ）申請日の属する月において、その属する世帯の生計を主として維持している。
    if (dto.isMaintainingLivelihood !== true) {
      return false
    }

    // （4）次のイまたはロのいずれかの活動を行うことができる。
    //   イ）公共職業安定所等での求職活動を行う
    // ロ）経営相談など自立に向けた活動を行う（自営業のかたのみ選択できます。）
    // 離職・自営業の廃業をした方は、ハローワークへの求職登録を行い、求職受付票（ハローワークカード）の写しをご提出いただきます。
    if (
      !(
        dto.activityStatus === 'job_searching' ||
        dto.activityStatus === 'self_employed'
      )
    ) {
      return false
    }

    // （5）申請を行う月に、申請者および申請者と同一の世帯に属する方の収入額（※）の合計が、次の表の「基準額」と実家賃の合計額を超えていないこと。
    // 世帯月収入上限額
    const MaximumMonthlyHouseholdIncome: number =
      this.eligibilityCondition.incomeThreshold[dto.numberOfHouseholdMembers]
    /* 基準額 + 実家賃が収入を超えていないことを確認する */
    if (dto.monthlyHouseholdIncome > MaximumMonthlyHouseholdIncome + dto.rent) {
      return false
    }

    // （6）申請日において、申請者及び申請者と同一の世帯に属する方の所有する金融資産（現金、預貯金）の合計額が次の表の金額以下であること。
    // financialAssetsの中で最大のnumberOfHouseholdMembersのキーを取得
    const maxHouseholdKey = Math.max(
      ...Object.keys(this.eligibilityCondition.financialAssets).map(Number),
    )

    // numberOfHouseholdMembersがテーブルに存在しない場合、最大値を参照する
    const lookupNumberOfHouseholdMembers = this.eligibilityCondition
      .financialAssets[dto.numberOfHouseholdMembers]
      ? dto.numberOfHouseholdMembers
      : maxHouseholdKey

    const maxFinancialAssets =
      this.eligibilityCondition.financialAssets[lookupNumberOfHouseholdMembers]

    if (dto.financialAssets > maxFinancialAssets) {
      return false
    }

    // （7）住居確保給付金に類似する雇用対策給付等を、申請者及び申請者と同一の世帯に属する方が受けていないこと。
    if (dto.isReceivingSimilarSubsidy) {
      return false
    }

    // （8）申請者及び申請者と生計を一とする同居の親族のいずれもが暴力団員ではないこと。
    if (dto.isGangMember) {
      return false
    }

    // （9）申請者及び申請者と同一の世帯に属する方が生活保護を受けていないこと。
    if (dto.isReceivingWelfare) {
      return false
    }

    // 全ての条件を満たした場合
    return true
  }
  /** どのくらい受給できるのか計算するメソッド */
  public calculateConditionAmount(dto: HousingGrantDto): number {
    // 世帯人数に依存しているため、世帯人数に応じた受給額を返す

    // 支給額上限
    const maximumBenefitAmount =
      this.amountCondition.numberOfFamilyMembers[dto.numberOfHouseholdMembers]
    // 実給付額
    const benefitAmount = maximumBenefitAmount - dto.monthlyHouseholdIncome

    // 世帯月収が基準額と実家賃を上回り、かつ、給付金支給上限額を超える場合は給付金支給上限額を返す
    if (dto.monthlyHouseholdIncome > maximumBenefitAmount) {
      return maximumBenefitAmount
    } else {
      return benefitAmount
    }
  }
}
