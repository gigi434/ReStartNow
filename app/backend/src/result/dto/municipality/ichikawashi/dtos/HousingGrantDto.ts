import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator'

export class HousingGrantDto {
  @IsBoolean()
  economicHardship: boolean // 離職等により経済的に困窮し、家賃の支払いが困難で、住居を喪失した、または住居喪失のおそれがあること。
  isEligibleForApplicationBasedOnEmploymentStatus: boolean //給与等を得る機会が本人の責に帰すべき理由、本人の都合によらないで減少し、離職や廃業と同程度の状況にあり、かつ、申請日において、離職・自営業の廃業の日から原則2年以内である。
  isMaintainingLivelihood: boolean
  activityStatus: boolean
  @IsNumber()
  monthlyIncome: number // 月の収入額
  financialAssets: number //金融資産（現金、預貯金）の合計額
  isReceivingSimilarSubsidy: boolean //住居確保給付金に類似する雇用対策給付等を、申請者及び申請者と同一の世帯に属する方が受けていない
  isGangMember: boolean //申請者及び申請者と生計を一とする同居の親族のいずれもが暴力団員ではないか
  isReceivingWelfare: boolean //生活保護を受けていないか
  numberOfHouseholdMembers: number
  @IsNotEmpty()
  @IsNumber()
  rent: number // 月家賃
  monthlyHouseholdIncome: number // 世帯月収入
}