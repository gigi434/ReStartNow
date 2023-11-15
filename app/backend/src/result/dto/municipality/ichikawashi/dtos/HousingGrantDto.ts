import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator'

export class HousingGrantDto {
  @IsBoolean()
  @IsNotEmpty()
  economicHardship: boolean // 離職等により経済的に困窮し、家賃の支払いが困難で、住居を喪失した、または住居喪失のおそれがあること。
  @IsBoolean()
  @IsNotEmpty()
  isEligibleForApplicationBasedOnEmploymentStatus: boolean // 給与等を得る機会が本人の責に帰すべき理由、本人の都合によらないで減少し、離職や廃業と同程度の状況にあり、かつ、申請日において、離職・自営業の廃業の日から原則2年以内である。
  @IsBoolean()
  @IsNotEmpty()
  isMaintainingLivelihood: boolean // 次のイまたはロのいずれかに該当すること。イ）離職等の日において、その属する世帯の生計を主として維持していた。 ロ）申請日の属する月において、その属する世帯の生計を主として維持している。
  @IsBoolean()
  @IsNotEmpty()
  activityStatus: boolean // 次の条件に当てはまるか イ) 公共職業安定所等での求職活動を行う　ロ）経営相談など自立に向けた活動を行う（自営業のかたのみ選択できます。）
  @IsNumber()
  @IsNotEmpty()
  financialAssets: number //金融資産（現金、預貯金）の合計額
  @IsBoolean()
  @IsNotEmpty()
  isReceivingSimilarSubsidy: boolean //住居確保給付金に類似する雇用対策給付等を、申請者及び申請者と同一の世帯に属する方が受けていない
  @IsBoolean()
  @IsNotEmpty()
  isGangMember: boolean //申請者及び申請者と生計を一とする同居の親族のいずれもが暴力団員ではないか
  @IsBoolean()
  @IsNotEmpty()
  isReceivingWelfare: boolean //生活保護を受けていないか
  @IsNotEmpty()
  @IsNumber()
  numberOfHouseholdMembers: number // 世帯人数
  @IsNotEmpty()
  @IsNumber()
  monthlyRent: number // 月家賃
  @IsNotEmpty()
  @IsNumber()
  monthlyHouseholdIncome: number // 世帯月収入
}
