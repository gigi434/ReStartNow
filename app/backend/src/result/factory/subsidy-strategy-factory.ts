import { IchikawashiChildbirthSupportGrantStrategy } from '../strategy/housingGrant.strategy'

export class SubsidyStrategyFactory {
  static createStrategy(subsidyId: number) {
    switch (subsidyId) {
      case 1:

      case 2:
      case 3:
        return new IchikawashiChildbirthSupportGrantStrategy()
      // return new AnotherGrantStrategy()
      // ... others
      default:
        throw new Error(`No strategy found for subsidy ID: ${subsidyId}`)
    }
  }
}
