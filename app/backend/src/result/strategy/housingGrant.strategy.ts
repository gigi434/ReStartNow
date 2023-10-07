import {
  AvailableSubsidiesDto,
  ChildbirthSupportGrantDto,
} from '../dto/get-available-subsidies.dto'

interface ISubsidyStrategy {
  isEligible(dto: AvailableSubsidiesDto): Promise<number | boolean>
}

/** 出産・子育て応援給付金 */
abstract class BaseChildbirthSupportGrantStrategy implements ISubsidyStrategy {
  /** 住民票を保有しているか */
  protected checkResidency(dto: ChildbirthSupportGrantDto): boolean {
    return dto.isResidency !== true
  }

  /** 給付金を */
  abstract isEligible(dto: ChildbirthSupportGrantDto): Promise<number | boolean>
}

export class IchikawashiChildbirthSupportGrantStrategy extends BaseChildbirthSupportGrantStrategy {
  async isEligible(dto: ChildbirthSupportGrantDto): Promise<number | boolean> {
    // 住民票がなければ受給要件に合致しない
    if (this.checkResidency(dto)) {
      return false
    }

    // 妊娠届出時と出生届出時ともに面談を行っているのであればすでに全額受け取り済みと判断する
    if (dto.haveChildcareInterview && dto.havePregnancyInterview) {
      return 0
    }

    // 妊娠届出時と出生届出時どちらか面談を行っているのであれば
    if (dto.haveChildcareInterview || dto.havePregnancyInterview) {
      return 50000
    }

    // 妊娠届出時と出生届出時ともに面談を行っていないなら全額受給金額を返す
    return 100000
  }
}
