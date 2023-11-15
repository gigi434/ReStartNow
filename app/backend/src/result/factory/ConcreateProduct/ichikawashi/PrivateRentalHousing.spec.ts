import { Test, TestingModule } from '@nestjs/testing'
import { IchikawashiPrivateRentalHousing } from '.'
import { ResultRepository } from '@/src/result/result.repository'
import { PrismaService } from '@/src/prisma/prisma.service'
import { PrivateRentalHousingSubsidyDto } from '../../../dto'
// モックのデータ
const mockEligibilityCondition = {
  monthlyNewHousingRent: 70000,
  specialFamilyConditions: ['singleParentHousehold', 'orphanedChildHousehold'],
  incomeThresholds: [
    {
      earningsCategory: 'salariedEmployees',
      familyType: 'single',
      isSpecialFamilyCondition: false,
      threshold: 3887999,
    },
    {
      earningsCategory: 'salariedEmployees',
      familyType: 'couple',
      isSpecialFamilyCondition: false,
      threshold: 4363999,
    },
    {
      earningsCategory: 'salariedEmployees',
      familyType: 'couple',
      isSpecialFamilyCondition: true,
      threshold: 3511999,
    },
    {
      earningsCategory: 'businessIncomeEarner',
      familyType: 'single',
      isSpecialFamilyCondition: false,
      threshold: 2568000,
    },
    {
      earningsCategory: 'businessIncomeEarner',
      familyType: 'couple',
      isSpecialFamilyCondition: false,
      threshold: 2948000,
    },
    {
      earningsCategory: 'businessIncomeEarner',
      familyType: 'couple',
      isSpecialFamilyCondition: true,
      threshold: 2276000,
    },
    {
      earningsCategory: 'pensionIncomeEarner',
      familyType: 'single',
      isSpecialFamilyCondition: false,
      threshold: 3924000,
    },
    {
      earningsCategory: 'pensionIncomeEarner',
      familyType: 'couple',
      isSpecialFamilyCondition: false,
      threshold: 4391764,
    },
    {
      earningsCategory: 'pensionIncomeEarner',
      familyType: 'couple',
      isSpecialFamilyCondition: true,
      threshold: 3534666,
    },
  ],
}

const mockAmountCondition = {
  newRentThreshold: 70000,
  housingRentSubsidyThreshold: 38000,
  relocationSubsidyThreshold: 190000,
  rentSubsidyCap: 38000,
}

const mockDto: PrivateRentalHousingSubsidyDto = {
  currentHousing: true,
  isEvictionRequested: true,
  hasSpecialFamilyCondition: 'seniorSingleHousehold',
  yearlyEarnings: 3000000,
  earningsCategory: 'salariedEmployees',
  isReceivingWelfare: false,
  monthlyNewHousingRent: 70000,
  monthlyRentBeforeEviction: 40000,
  hasPreSchoolChild: false,
  familyType: 'single',
  gratuityFee: 100000,
  brokerageFee: 100000,
  evictionFee: 50000,
  isRegisteredResidentForOverTwoYears: true,
}

let service: IchikawashiPrivateRentalHousing

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      IchikawashiPrivateRentalHousing,
      { provide: ResultRepository, useValue: {} }, // モックオブジェクトを提供
      { provide: PrismaService, useValue: {} }, // モックオブジェクトを提供
      // 他の依存関係があればここに追加
    ],
  }).compile()

  service = module.get<IchikawashiPrivateRentalHousing>(
    IchikawashiPrivateRentalHousing,
  )
  service.eligibilityCondition = mockEligibilityCondition
  service.amountCondition = mockAmountCondition
})

it('助成対象：全ての条件を満たす場合', () => {
  const dto = {
    ...mockDto,
  }
  mockDto
  expect(service.checkEligibility(dto)).toEqual(true)
})
it('助成対象外：立ち退きを求められていない場合', () => {
  const dto = {
    ...mockDto,
    isEvictionRequested: false,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})
it('助成対象外: 市川市に2年以上の居住と住民登録がない場合', () => {
  const dto = {
    ...mockDto,
    isRegisteredResidentForOverTwoYears: false,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})
it('助成対象外: 該当する世帯ではない場合', () => {
  const dto = {
    ...mockDto,
    hasSpecialFamilyCondition: 'N/A',
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})
it('助成対象外: 前年の収入が公営住宅法で定める金額を超える場合', () => {
  const dto = {
    ...mockDto,
    yearlyEarnings: 3888000,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})
it('助成対象外: 生活保護を受けている場合', () => {
  const dto = {
    ...mockDto,
    isReceivingWelfare: true,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})
it('助成対象: 同居者に小学校就学の始期に達するまでの子がいる場合', () => {
  const dto: PrivateRentalHousingSubsidyDto = {
    ...mockDto,
    hasPreSchoolChild: true,
    familyType: 'couple',
    yearlyEarnings: 4363999,
  }
  expect(service.checkEligibility(dto)).toEqual(true)
})

// 受給金額の計算テスト
it('住宅家賃助成金: 同値分割0円ケース', () => {
  const dto = {
    ...mockDto,
    monthlyRentBeforeEviction: 80000,
    monthlyNewHousingRent: 70000,
    gratuityFee: 150000,
    brokerageFee: 150000,
    evictionFee: 300000,
  }
  expect(service.calculateConditionAmount(dto)).toEqual(0)
})
it('住宅家賃助成金: 境界値分析0円ケース', () => {
  const dto = {
    ...mockDto,
    monthlyRentBeforeEviction: 70000,
    monthlyNewHousingRent: 70000,
    gratuityFee: 150000,
    brokerageFee: 150000,
    evictionFee: 300000,
  }
  expect(service.calculateConditionAmount(dto)).toEqual(0)
})
it('住宅家賃助成金: 境界値分析1円ケース', () => {
  const dto = {
    ...mockDto,
    monthlyRentBeforeEviction: 69999,
    monthlyNewHousingRent: 70000,
    gratuityFee: 150000,
    brokerageFee: 150000,
    evictionFee: 300000,
  }
  expect(service.calculateConditionAmount(dto)).toEqual(1)
})
it('住宅家賃助成金: 同値分割19000円ケース', () => {
  const dto = {
    ...mockDto,
    monthlyRentBeforeEviction: 51000,
    monthlyNewHousingRent: 70000,
    gratuityFee: 150000,
    brokerageFee: 150000,
    evictionFee: 300000,
  }
  expect(service.calculateConditionAmount(dto)).toEqual(19000)
})
it('住宅家賃助成金: 境界値分析37999円ケース', () => {
  const dto = {
    ...mockDto,
    monthlyRentBeforeEviction: 32001,
    monthlyNewHousingRent: 70000,
    gratuityFee: 150000,
    brokerageFee: 150000,
    evictionFee: 300000,
  }
  expect(service.calculateConditionAmount(dto)).toEqual(37999)
})
it('住宅家賃助成金: 境界値分析38000円ケース', () => {
  const dto = {
    ...mockDto,
    monthlyRentBeforeEviction: 32000,
    monthlyNewHousingRent: 70000,
    gratuityFee: 150000,
    brokerageFee: 150000,
    evictionFee: 300000,
  }
  expect(service.calculateConditionAmount(dto)).toEqual(38000)
})
it('住宅家賃助成金: 同値分割38000円ケース', () => {
  const dto = {
    ...mockDto,
    monthlyRentBeforeEviction: 30000,
    monthlyNewHousingRent: 70000,
    gratuityFee: 150000,
    brokerageFee: 150000,
    evictionFee: 300000,
  }
  expect(service.calculateConditionAmount(dto)).toEqual(38000)
})

const mockRelocationSubisdyDto = {
  currentHousing: true,
  isEvictionRequested: true,
  hasSpecialFamilyCondition: 'seniorSingleHousehold',
  yearlyEarnings: 3000000,
  earningsCategory: 'salariedEmployees',
  isReceivingWelfare: false,
  monthlyNewHousingRent: 40000,
  monthlyRentBeforeEviction: 40000,
  hasPreSchoolChild: true,
  familyType: 'single',
  gratuityFee: 150000,
  brokerageFee: 150000,
  evictionFee: 50000,
  isRegisteredResidentForOverTwoYears: true,
}

it('転居費用助成金: 同値分割0円ケース', () => {
  const dto = {
    ...mockRelocationSubisdyDto,
    monthlyRentBeforeEviction: 40000,
    monthlyNewHousingRent: 40000,
    gratuityFee: 150000,
    brokerageFee: 150000,
    evictionFee: 500000,
  }
  expect(service.calculateConditionAmount(dto)).toEqual(0)
})
it('転居費用助成金: 境界値分析0円ケース', () => {
  const dto = {
    ...mockRelocationSubisdyDto,
    monthlyRentBeforeEviction: 40000,
    monthlyNewHousingRent: 40000,
    gratuityFee: 150000,
    brokerageFee: 150000,
    evictionFee: 300000,
  }
  expect(service.calculateConditionAmount(dto)).toEqual(0)
})
it('転居費用助成金: 境界値分析1円ケース', () => {
  const dto = {
    ...mockRelocationSubisdyDto,
    monthlyRentBeforeEviction: 40000,
    monthlyNewHousingRent: 40000,
    gratuityFee: 150000,
    brokerageFee: 150000,
    evictionFee: 299999,
  }
  expect(service.calculateConditionAmount(dto)).toEqual(1)
})
it('転居費用助成金: 同値分割90000円ケース', () => {
  const dto = {
    ...mockRelocationSubisdyDto,
    monthlyRentBeforeEviction: 40000,
    monthlyNewHousingRent: 40000,
    gratuityFee: 150000,
    brokerageFee: 150000,
    evictionFee: 210000,
  }
  expect(service.calculateConditionAmount(dto)).toEqual(90000)
})
it('転居費用助成金: 境界値分析189999円ケース', () => {
  const dto = {
    ...mockRelocationSubisdyDto,
    monthlyRentBeforeEviction: 40000,
    monthlyNewHousingRent: 40000,
    gratuityFee: 150000,
    brokerageFee: 150000,
    evictionFee: 110001,
  }
  expect(service.calculateConditionAmount(dto)).toEqual(189999)
})
it('転居費用助成金: 境界値分析190000円ケース', () => {
  const dto = {
    ...mockRelocationSubisdyDto,
    monthlyRentBeforeEviction: 40000,
    monthlyNewHousingRent: 40000,
    gratuityFee: 150000,
    brokerageFee: 150000,
    evictionFee: 110000,
  }
  expect(service.calculateConditionAmount(dto)).toEqual(190000)
})
it('転居費用助成金: 同値分割190000円ケース', () => {
  const dto = {
    ...mockRelocationSubisdyDto,
    monthlyRentBeforeEviction: 40000,
    monthlyNewHousingRent: 40000,
    gratuityFee: 150000,
    brokerageFee: 150000,
    evictionFee: 50000,
  }
  expect(service.calculateConditionAmount(dto)).toEqual(190000)
})
