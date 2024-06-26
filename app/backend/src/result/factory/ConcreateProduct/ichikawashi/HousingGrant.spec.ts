import { Test, TestingModule } from '@nestjs/testing'
import { IchikawashiHousingSubsidy } from '.'
import { ResultRepository } from '@/src/result/result.repository'
import { PrismaService } from '@/src/prisma/prisma.service'
import { HousingGrantDto } from '../../../dto'
// モックのデータ
const mockEligibilityCondition = {
  incomeThreshold: {
    '1': 84000,
    '2': 130000,
    '3': 172000,
    '4': 214000,
    '5': 255000,
    '6': 297000,
    '7': 334000,
  },
  financialAssets: {
    '1': 504000,
    '2': 780000,
    '3': 1000000,
  },
}

const mockAmountCondition = {
  numberOfFamilyMembers: {
    '1': 46000,
    '2': 55000,
    '3': 59800,
    '4': 59800,
    '5': 59800,
    '6': 64000,
    '7': 71800,
  },
}

const mockDto: HousingGrantDto = {
  economicHardship: true,
  isEligibleForApplicationBasedOnEmploymentStatus: true,
  isMaintainingLivelihood: true,
  activityStatus: true,
  monthlyHouseholdIncome: 0,
  numberOfHouseholdMembers: 1,
  financialAssets: 0,
  isReceivingSimilarSubsidy: true,
  isNotGangMember: false,
  isNotReceivingWelfare: false,
  monthlyRent: 30000,
}

let service: IchikawashiHousingSubsidy

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      IchikawashiHousingSubsidy,
      { provide: ResultRepository, useValue: {} }, // モックオブジェクトを提供
      { provide: PrismaService, useValue: {} }, // モックオブジェクトを提供
      // 他の依存関係があればここに追加
    ],
  }).compile()

  service = module.get<IchikawashiHousingSubsidy>(IchikawashiHousingSubsidy)
  service.eligibilityCondition = mockEligibilityCondition
  service.amountCondition = mockAmountCondition
})
it('助成対象：全ての条件を満たす場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
  }
  expect(service.checkEligibility(dto)).toEqual(true)
})
it('助成対象外: 家賃の支払いが困難で、住居を喪失した、または住居喪失のおそれがない場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    economicHardship: false,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})
it('助成対象外: 申請日において、離職・自営業の廃業の日から原則2年より大きいまたは給与等を得る機会が本人の責に帰すべき理由、本人の都合によらないで減少し、離職や廃業と同程度の状況にない場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    isEligibleForApplicationBasedOnEmploymentStatus: false,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})
it('助成対象外: 申請日において、離職・自営業の廃業の日から原則2年より大きいまたは給与等を得る機会が本人の責に帰すべき理由、本人の都合によらないで減少し、離職や廃業と同程度の状況にない場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    isMaintainingLivelihood: false,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})
it('助成対象外: 公共職業安定所等での求職活動を行わない、または経営相談など自立に向けた活動を行わない場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    activityStatus: false,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})
// it('助成対象: 世帯人数が1人: 同値分割falseケース', () => {
//   const dto: HousingGrantDto = {
//     ...mockDto,
//     numberOfHouseholdMembers: 1,
//     monthlyHouseholdIncome: -50000,
//   }
//   expect(service.checkEligibility(dto)).toEqual(false)
// })
// it('助成対象: 世帯人数が1人: 境界値分析falseケース', () => {
//   const dto: HousingGrantDto = {
//     ...mockDto,
//     numberOfHouseholdMembers: 1,
//     monthlyHouseholdIncome: -1,
//   }
//   expect(service.checkEligibility(dto)).toEqual(false)
// })
it('助成対象: 世帯人数が1人: 境界値分析trueケース', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 1,
    monthlyHouseholdIncome: 0,
  }
  expect(service.checkEligibility(dto)).toEqual(true)
})
it('助成対象外: 世帯人数が1人: 同値分割trueケース', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 1,
    monthlyHouseholdIncome: 80000,
  }
  expect(service.checkEligibility(dto)).toEqual(true)
})
it('助成対象外: 世帯人数が1人: 境界値分析trueケース', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 1,
    monthlyHouseholdIncome: 114000,
  }
  expect(service.checkEligibility(dto)).toEqual(true)
})
it('助成対象外: 世帯人数が1人: 境界値分析falseケース', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 1,
    monthlyHouseholdIncome: 114001,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})
it('助成対象外: 申請者および申請者と同一の世帯に属する方の収入額（※）の合計が、次の表の「基準額」と実家賃の合計額を超えている場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 4,
    monthlyHouseholdIncome: 244001,
    monthlyRent: 30000,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})
// it('助成対象: 世帯人数が負の値で金融資産額が上限額以下である場合', () => {
//   const dto: HousingGrantDto = {
//     ...mockDto,
//     numberOfHouseholdMembers: -5,
//     financialAssets: 504000,
//   }
//   expect(service.checkEligibility(dto)).toEqual(false)
// })
// it('助成対象外: 世帯人数が負の値で金融資産額が上限額より大きい場合', () => {
//   const dto: HousingGrantDto = {
//     ...mockDto,
//     numberOfHouseholdMembers: -5,
//     financialAssets: 504001,
//   }
//   expect(service.checkEligibility(dto)).toEqual(false)
// })
it('助成対象: 世帯人数1人で金融資産額が上限額以下である場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 1,
    financialAssets: 504000,
  }
  expect(service.checkEligibility(dto)).toEqual(true)
})
it('助成対象外: 世帯人数1人で金融資産額が上限額より大きい場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 1,
    financialAssets: 504001,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})
it('助成対象: 世帯人数2人で金融資産額が上限額以下である場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 2,
    financialAssets: 780000,
  }
  expect(service.checkEligibility(dto)).toEqual(true)
})
it('助成対象外: 世帯人数2人で金融資産額が上限額より大きい場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 2,
    financialAssets: 780001,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})
it('助成対象: 世帯人数3人で金融資産額が上限額以下である場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 3,
    financialAssets: 1000000,
  }
  expect(service.checkEligibility(dto)).toEqual(true)
})
it('助成対象外: 世帯人数3人で金融資産額が上限額より大きい場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 2,
    financialAssets: 1000001,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})
it('助成対象: 世帯人数7人で金融資産額が上限額以下である場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 7,
    financialAssets: 1000000,
  }
  expect(service.checkEligibility(dto)).toEqual(true)
})
it('助成対象外: 世帯人数7人で金融資産額が上限額より大きい場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 7,
    financialAssets: 1000001,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})

it('助成対象外: 申請者及び申請者と同一の世帯に属する方の所有する金融資産（現金、預貯金）の合計額が次の表の金額より大きい場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 4,
    financialAssets: 1000001,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})
it('助成対象外: 住居確保給付金に類似する雇用対策給付等を、申請者及び申請者と同一の世帯に属する方が受けている場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    isReceivingSimilarSubsidy: false,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})
it('助成対象外: 申請者及び申請者と生計を一とする同居の親族のいずれもが暴力団員である', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    isNotGangMember: false,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})
it('助成対象外: 申請者及び申請者と同一の世帯に属する方が生活保護を受けている場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    isNotReceivingWelfare: false,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})

// 受給金額計算
it('同値分割34000円ケース: 世帯人数1人で収入が基準額と実家賃の合計額を超えない場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 1,
    monthlyHouseholdIncome: 80000,
    monthlyRent: 30000,
  }
  expect(service.calculateAmount(dto)).toEqual(34000)
})
it('境界値分析45999円ケース: 世帯人数1人で収入が基準額と実家賃の合計額を超えない場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 1,
    monthlyHouseholdIncome: 68001,
    monthlyRent: 30000,
  }
  expect(service.calculateAmount(dto)).toEqual(45999)
})
it('境界値分析46000円ケース: 世帯人数1人で収入が基準額と実家賃の合計額を超える場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 1,
    monthlyHouseholdIncome: 20000,
    monthlyRent: 30000,
  }
  expect(service.calculateAmount(dto)).toEqual(46000)
})
it('同値分割46000円ケース: 世帯人数1人で収入が基準額と実家賃の合計額を超える場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 1,
    monthlyHouseholdIncome: 10000,
    monthlyRent: 30000,
  }
  expect(service.calculateAmount(dto)).toEqual(46000)
})
it('同値分割29900円ケース: 世帯人数4人で収入が基準額と実家賃の合計額を超えない場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 4,
    monthlyHouseholdIncome: 214100,
    monthlyRent: 30000,
  }
  expect(service.calculateAmount(dto)).toEqual(29900)
})
it('境界値分析59800円ケース: 世帯人数4人で収入が基準額と実家賃の合計額を超えない場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 4,
    monthlyHouseholdIncome: 184200,
    monthlyRent: 30000,
  }
  expect(service.calculateAmount(dto)).toEqual(59800)
})
it('境界値分析59800円ケース: 世帯人数4人で収入が基準額と実家賃の合計額を超える場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 4,
    monthlyHouseholdIncome: 184199,
    monthlyRent: 30000,
  }
  expect(service.calculateAmount(dto)).toEqual(59800)
})
it('同値分割59800円ケース: 世帯人数4人で収入が基準額と実家賃の合計額を超える場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 4,
    monthlyHouseholdIncome: 100000,
    monthlyRent: 30000,
  }
  expect(service.calculateAmount(dto)).toEqual(59800)
})
it('同値分割35900円ケース: 世帯人数7人で収入が基準額と実家賃の合計額を超えない場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 7,
    monthlyHouseholdIncome: 328100,
    monthlyRent: 30000,
  }
  expect(service.calculateAmount(dto)).toEqual(35900)
})
it('境界値分析35900円ケース世帯人数7人で収入が基準額と実家賃の合計額を超えない場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 7,
    monthlyHouseholdIncome: 328100,
    monthlyRent: 30000,
  }
  expect(service.calculateAmount(dto)).toEqual(35900)
})
it('境界値分析71800円ケース: 世帯人数7人で収入が基準額と実家賃の合計額を超えない場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 7,
    monthlyHouseholdIncome: 292200,
    monthlyRent: 30000,
  }
  expect(service.calculateAmount(dto)).toEqual(71800)
})
it('境界値分析71800円ケース: 世帯人数7人で収入が基準額と実家賃の合計額を超える場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 7,
    monthlyHouseholdIncome: 292199,
    monthlyRent: 30000,
  }
  expect(service.calculateAmount(dto)).toEqual(71800)
})
it('同値分割71800円ケース: 世帯人数7人で収入が基準額と実家賃の合計額を超える場合', () => {
  const dto: HousingGrantDto = {
    ...mockDto,
    numberOfHouseholdMembers: 7,
    monthlyHouseholdIncome: 146100,
    monthlyRent: 30000,
  }
  expect(service.calculateAmount(dto)).toEqual(71800)
})
