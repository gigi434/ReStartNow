import {
  IBaseGrant,
  SubsidyCalculatorAbstractFactory,
} from '@/src/result/interface/subsidy-strategy-factory'
import { Injectable } from '@nestjs/common'
import {
  IchikawashiChildBirthGrant,
  IchikawashiHousingSubsidy,
  IchikawashiPrivateRentalHousing,
} from '../ConcreateProduct/ichikawashi'

// 具象ファクトリー
@Injectable()
export class IchikawashiFactory implements SubsidyCalculatorAbstractFactory {
  constructor(
    private readonly ichikawashiHousingSubsidy: IchikawashiHousingSubsidy,
    private readonly ichikawashiChildBirthGrant: IchikawashiChildBirthGrant,
    private readonly ichikawashiPrivateRentalHousing: IchikawashiPrivateRentalHousing,
  ) {}
  public getSubsidyAmountCalculator(subsidyId: number) {
    switch (subsidyId) {
      case 1: // 住居確保給付金
        return this.createHousingSubsidyCaluculator()
      case 2: // 民間賃貸住宅家賃等助成制度
        return this.createPrivateRentalHousingCaluculator()
      case 3: // 出産・子育て応援給付金
        return this.createChildBirthGrantCaluculator()
      default:
        throw new Error('Unknown subsidy type')
    }
  }

  // 市川市の住居確保給付金の具象プロダクトを生成
  private createHousingSubsidyCaluculator(): IBaseGrant {
    return this.ichikawashiHousingSubsidy
  }
  // 市川市の出産・子育て応援給付金の具象プロダクトを生成
  private createChildBirthGrantCaluculator(): IBaseGrant {
    return this.ichikawashiChildBirthGrant
  }
  // 市川市の民間賃貸住宅家賃等助成制度の具象プロダクトを生成
  private createPrivateRentalHousingCaluculator(): IBaseGrant {
    return this.ichikawashiPrivateRentalHousing
  }
}
