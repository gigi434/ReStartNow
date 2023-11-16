import { Test, TestingModule } from '@nestjs/testing'
import { IchikawashiChildBirthGrant } from '.'
import { ResultRepository } from '@/src/result/result.repository'
import { PrismaService } from '@/src/prisma/prisma.service'
import { ChildbirthSupportGrantDto } from '../../../dto'
// モックのデータ
const mockEligibilityCondition = {
  isResidency: true,
}

const mockAmountCondition = {
  havePregnancyInterview: 50000,
  haveChildcareInterview: 50000,
}

const mockDto: ChildbirthSupportGrantDto = {
  isResidency: true,
  isPregnancyReportedOrChildBornAfterApril2022: true,
  havePregnancyInterview: false,
  haveChildcareInterview: false,
  numberOfExpectedChildren: 1,
}

let service: IchikawashiChildBirthGrant

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      IchikawashiChildBirthGrant,
      { provide: ResultRepository, useValue: {} }, // モックオブジェクトを提供
      { provide: PrismaService, useValue: {} }, // モックオブジェクトを提供
      // 他の依存関係があればここに追加
    ],
  }).compile()

  service = module.get<IchikawashiChildBirthGrant>(IchikawashiChildBirthGrant)
  service.eligibilityCondition = mockEligibilityCondition
  service.amountCondition = mockAmountCondition
})

it('助成対象: すべての条件を満たす場合', () => {
  const dto: ChildbirthSupportGrantDto = {
    ...mockDto,
  }
  expect(service.checkEligibility(dto)).toEqual(true)
})
it('助成対象外: 自治体の住民票を保有していない場合', () => {
  const dto: ChildbirthSupportGrantDto = {
    ...mockDto,
    isResidency: false,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})
it('助成対象外: 令和5年3月8日（2023年3月8日）以前に妊娠届出または出産をした場合', () => {
  const dto: ChildbirthSupportGrantDto = {
    ...mockDto,
    isPregnancyReportedOrChildBornAfterApril2022: false,
  }
  expect(service.checkEligibility(dto)).toEqual(false)
})

// 受給額計算
it('妊娠面談を受けているかつ出産面談を受けている場合', () => {
  const dto: ChildbirthSupportGrantDto = {
    ...mockDto,
    havePregnancyInterview: true,
    haveChildcareInterview: true,
  }
  expect(service.calculateConditionAmount(dto)).toEqual(0)
})
it('妊娠面談を受けているかつ出産面談を受けていない場合', () => {
  const dto: ChildbirthSupportGrantDto = {
    ...mockDto,
    havePregnancyInterview: true,
  }
  expect(service.calculateConditionAmount(dto)).toEqual(50000)
})
it('妊娠面談を受けていないかつ出産面談を受けている場合', () => {
  const dto: ChildbirthSupportGrantDto = {
    ...mockDto,
    haveChildcareInterview: true,
  }
  expect(service.calculateConditionAmount(dto)).toEqual(50000)
})
it('妊娠面談を受けていないかつ出産面談を受けていなく、出産する子供の数が3人の場合', () => {
  const dto: ChildbirthSupportGrantDto = {
    ...mockDto,
    numberOfExpectedChildren: 3,
  }
  expect(service.calculateConditionAmount(dto)).toEqual(200000)
})
