import { IsBoolean, IsDateString, IsNotEmpty, IsNumber } from 'class-validator'

export type AvailableSubsidiesDto =
  | HousingGrantDto
  | ChildbirthSupportGrantDto
  | PrivateRentalHousingDto

export class HousingGrantDto {
  @IsBoolean()
  economicHardship: boolean // 離職等により経済的に困窮し、家賃の支払いが困難で、住居を喪失した、または住居喪失のおそれがあること。
  employmentDate: Date // 離職・自営業の廃業の日
  isIncomeStatusCritical: boolean //給与等を得る機会が本人の責に帰すべき理由、本人の都合によらないで減少し、離職や廃業と同程度の状況にある。
  isMaintainingLivelihood: boolean
  activityStatus: 'job_searching' | 'self_employed'
  @IsNumber()
  monthlyIncome: number // 月の収入額
  financialAssets: number //金融資産（現金、預貯金）の合計額
  isReceivingSimilarSubsidy: boolean //住居確保給付金に類似する雇用対策給付等を、申請者及び申請者と同一の世帯に属する方が受けていない
  isGangMember: number //申請者及び申請者と生計を一とする同居の親族のいずれもが暴力団員ではないか
  isReceivingWelfare: boolean //生活保護を受けていないか
  numberOfHouseholdMembers: number
  @IsNotEmpty()
  @IsNumber()
  rent: number // 月家賃
  monthlyHouseholdIncome: number // 世帯月収入
}

export class ChildbirthSupportGrantDto {
  @IsBoolean()
  @IsNotEmpty()
  isResidency: boolean // 現在住んでいる市町区村に住民票があるか
  @IsBoolean()
  @IsNotEmpty()
  haveChildcareInterview: boolean // 妊娠届出時に面談を実施したか
  @IsBoolean()
  @IsNotEmpty()
  havePregnancyInterview: boolean // 出生届出時に面談を実施したか
  @IsDateString()
  @IsNotEmpty()
  childBirthDate: Date // 令和5年3月8日（2023年3月8日）以前に妊娠届出または出産をしたか
}

export class PrivateRentalHousingDto {
  residencyDuration: number // 自治体に居住している期間（年）
  isResidency: boolean // 自治体に住民登録をしているか
  yearlyEarnings: number // 前年の収入
  earningsCategory: 'salary' | 'business' | 'pension' // 収入の種類
  isReceivingWelfare: boolean // 生活保護を受けているか
  currentHousing: 'privateRental' | 'public' // 現在の住宅の種類
  monthlyRentAfterEviction: number // 立ち退き後の住宅の家賃
  hasSpecialFamilyCondition: boolean // 心身障害者がいる、または一人親、または父母のない児童を養育している世帯であることを確認
  hasPreSchoolChild: boolean // 同居者に小学校就学の始期に達するまでの子がいるかどうか
  familyType: 'single' | 'couple' | 'specialCategory' // 世帯の種類 単身者か2人か同居者に小学校就学の始期に達するまでの子がいる場合か
  previousRent: number // 立ち退き前の家賃
  newRent: number // 立ち退き後の家賃
  giftMoney: number // 立ち退き後の礼金
  brokerageFee: number // 仲介手数料
  evictionFee: number // 立ち退き料
}
