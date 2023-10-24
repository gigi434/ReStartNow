import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator'

export class PrivateRentalHousingSubsidyDto {
  @IsBoolean()
  @IsNotEmpty()
  isRegisteredResidentForOverTwoYears: boolean // 自治体に引き続き2年以上居住し、住民登録をされていること。
  @IsNumber()
  @IsNotEmpty()
  yearlyEarnings: number // 前年の収入
  @IsNotEmpty()
  earningsCategory:
    | 'salariedEmployees'
    | 'businessIncomeEarner'
    | 'pensionIncomeEarner' // 収入の種類
  @IsBoolean()
  @IsNotEmpty()
  isReceivingWelfare: boolean // 生活保護を受けているか
  @IsBoolean()
  @IsNotEmpty()
  currentHousing: boolean // 現在の住宅の種類が民間賃貸住宅であること
  @IsNumber()
  @IsNotEmpty()
  monthlyRentAfterEviction: number // 立ち退き後の住宅の家賃
  @IsNumber()
  @IsNotEmpty()
  monthlyRentBeforeEviction: number // 立ち退き前の住宅家賃
  @IsBoolean()
  @IsNotEmpty()
  hasSpecialFamilyCondition: boolean // 心身障害者がいる、または一人親、または父母のない児童を養育している世帯であることを確認
  @IsBoolean()
  @IsNotEmpty()
  hasPreSchoolChild: boolean // 同居者に小学校就学の始期に達するまでの子がいるかどうか
  @IsNotEmpty()
  familyType: 'single' | 'couple' | 'specialCategory' // 世帯の種類 単身者か2人か同居者に小学校就学の始期に達するまでの子がいる場合か
  @IsNumber()
  @IsNotEmpty()
  giftMoney: number // 立ち退き後に入居した住宅の礼金
  @IsNumber()
  @IsNotEmpty()
  brokerageFee: number // 仲介手数料
  @IsNumber()
  @IsNotEmpty()
  evictionFee: number // 立ち退き料
}
