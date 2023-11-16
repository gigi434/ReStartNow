import { IBaseGrant } from '@/src/result/interface/subsidy-strategy-factory'
import { AvailableSubsidiesDto } from '@/src/result/dto'
import { ResultRepository } from '@/src/result/result.repository'
import { Prisma } from '@prisma/client'

export abstract class BaseGrantCalculator implements IBaseGrant {
  abstract eligibilityCondition: Prisma.JsonValue
  abstract amountCondition: Prisma.JsonValue

  constructor(protected readonly resultRepo: ResultRepository) {}

  public async initialize(subsidyId: number): Promise<void> {
    const eligibilityCondition = (
      await this.resultRepo.findEligibilityCondition(subsidyId)
    ).conditionData
    const amountCondition = (
      await this.resultRepo.findAmountCondition(subsidyId)
    ).amountData

    this.eligibilityCondition = eligibilityCondition
    this.amountCondition = amountCondition
  }
  abstract calculateAmount(dto: AvailableSubsidiesDto): number | false
  abstract checkEligibility(dto: AvailableSubsidiesDto): boolean
  abstract calculateConditionAmount(dto: AvailableSubsidiesDto): number
}
