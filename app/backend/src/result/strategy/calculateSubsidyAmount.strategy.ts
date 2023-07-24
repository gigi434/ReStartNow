import {
  ChildbirthSupportGrantDto,
  AvailableSubsidiesDto,
} from '../dto/get-available-subsidies.dto'

interface ISubsidyStorategies {
  [key: string]: (dto: AvailableSubsidiesDto) => Promise<number | boolean>
}

export const calculateSubsidyStrategies: ISubsidyStorategies = {
  3: async function (dto: ChildbirthSupportGrantDto) {
    // 住民票がなければ受給要件に合致しない
    if (dto.isResidency !== true) {
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
  },
}
