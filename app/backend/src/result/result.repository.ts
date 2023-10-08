import { PrismaService } from '@/src/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import {
  SubsidyAmountCondition,
  SubsidyEligibilityCondition,
} from '@prisma/client'

@Injectable()
export class ResultRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findEligibilityCondition(
    subsidyId: number,
  ): Promise<SubsidyEligibilityCondition> {
    return await this.prismaService.subsidyEligibilityCondition.findUnique({
      where: { subsidyId: subsidyId },
    })
  }

  public async findAmountCondition(
    subsidyId: number,
  ): Promise<SubsidyAmountCondition> {
    return await this.prismaService.subsidyAmountCondition.findUnique({
      where: { subsidyId: subsidyId },
    })
  }
}
