import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator'

export class PrivateRentalHousingSubsidyDto {
  @IsBoolean()
  @IsNotEmpty()
  isEvictionRequested: boolean // 現在居住している民間賃貸住宅の取り壊し等のため立ち退きを求められている
  @IsBoolean()
  @IsNotEmpty()
  isRegisteredResidentForOverTwoYears: boolean // 自治体に引き続き2年以上居住し、住民登録をされていること。
  @IsNumber()
  @IsNotEmpty()
  yearlyEarnings: number // 前年の収入
  @IsNotEmpty()
  earningsCategory: string
  @IsBoolean()
  @IsNotEmpty()
  isReceivingWelfare: boolean // 生活保護を受けているか
  @IsBoolean()
  @IsNotEmpty()
  currentHousing: boolean // 現在の住宅の種類が民間賃貸住宅であること
  @IsNumber()
  @IsNotEmpty()
  monthlyNewHousingRent: number // 立ち退き後の住宅の家賃
  @IsNumber()
  @IsNotEmpty()
  monthlyRentBeforeEviction: number // 立ち退き前の住宅家賃
  @IsBoolean()
  @IsNotEmpty()
  hasSpecialFamilyCondition: string // 心身障害者がいる、または一人親、または父母のない児童を養育している世帯であることを確認
  @IsBoolean()
  @IsNotEmpty()
  hasPreSchoolChild: boolean // 同居者に小学校就学の始期に達するまでの子がいるかどうか
  @IsNotEmpty()
  familyType: string // 世帯の種類 単身者か2人か同居者に小学校就学の始期に達するまでの子がいることを確認
  @IsNumber()
  @IsNotEmpty()
  gratuityFee: number // 立ち退き後に入居した住宅の礼金
  @IsNumber()
  @IsNotEmpty()
  brokerageFee: number // 立ち退き後に入居した住宅の仲介手数料
  @IsNumber()
  @IsNotEmpty()
  evictionFee: number // 立ち退き料
}
