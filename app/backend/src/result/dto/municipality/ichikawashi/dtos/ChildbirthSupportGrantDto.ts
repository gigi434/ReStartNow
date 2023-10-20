import { IsBoolean, IsDateString, IsNotEmpty } from 'class-validator'

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
