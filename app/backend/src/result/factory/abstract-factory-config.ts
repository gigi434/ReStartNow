import { Injectable } from '@nestjs/common'
import { ChibakenIchikawashiFactory } from './ConcreateFactory/ichikawashi'
import { SubsidyCalculatorAbstractFactory } from '../interface/subsidy-strategy-factory'

@Injectable()
export class ResultAFConfigService {
  public factories: { [key: string]: SubsidyCalculatorAbstractFactory } = {}
  constructor(
    private readonly chibakenIchikawashiFactory: ChibakenIchikawashiFactory,
  ) {
    this.factories['CHIBA KEN-ICHIKAWA SHI'] = this.chibakenIchikawashiFactory
  }
}
