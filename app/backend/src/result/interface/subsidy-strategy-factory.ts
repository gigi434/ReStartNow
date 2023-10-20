import { AvailableSubsidiesDto } from '@/src/result/dto'
// 抽象ファクトリー
export interface SubsidyCalculatorAbstractFactory {
  getSubsidyAmountCalculator(subsidyName: string): IBaseGrant
}

// 抽象プロダクト
export interface IBaseGrant {
  calculateAmount(dto: AvailableSubsidiesDto): number | boolean
  initialize(subsidyId: number): Promise<void>
  checkEligibility(dto: AvailableSubsidiesDto): boolean
  calculateConditionAmount(dto: AvailableSubsidiesDto): number
}
