import { IsBoolean, IsNumber, IsString } from 'class-validator'

export type AvailableSubsidiesDto = HousingGrantDto & ChildbirthSupportGrantDto

export class HousingGrantDto {
  @IsBoolean()
  economicHardship?: boolean // 離職等により経済的に困窮し、家賃の支払いが困難で、住居を喪失した、または住居喪失のおそれがあるかどうか
  @IsString()
  employmentDate?: string // 申請日における離職・自営業の廃業の日
  @IsNumber()
  monthlyIncome?: number // 月の収入額
  @IsBoolean()
  jobSeekerRegistration?: boolean // ハローワークへの求職登録をしているか
  @IsBoolean()
  isViolentGangMember?: boolean // 暴力団員でないか
  @IsBoolean()
  receivingPublicAssistance?: boolean // 申請者及び申請者と同一の世帯に属する方が生活保護を受けていないか
  @IsNumber()
  memberCount?: number // 世帯人数
  @IsNumber()
  totalIncome?: number // 世帯の総収入
  @IsNumber()
  totalAssets?: number // 世帯の総資産
  @IsNumber()
  rent?: number // 家賃の金額
}

export class ChildbirthSupportGrantDto {
  @IsBoolean()
  isResidency?: boolean // 現在住んでいる市町区村に住民票があるか
  @IsBoolean()
  haveChildcareInterview?: boolean // 妊娠届出時に面談を実施したか
  @IsBoolean()
  havePregnancyInterview?: boolean // 出生届出時に面談を実施したか
}
