import { Injectable } from '@nestjs/common'
import {
  ChibaPrivateRentalHousing,
  ChibaChildBirthGrant,
  ChibaHousingGrant,
} from '../AbstractClass/prefecture/chiba'
import { ResultRepository } from '@/src/result/result.repository'
// 具象プロダクト
@Injectable()
export class IchikawashiHousingSubsidy extends ChibaHousingGrant {
  constructor(protected readonly resultRepo: ResultRepository) {
    super(resultRepo)
  }
}
@Injectable()
export class IchikawashiChildBirthGrant extends ChibaChildBirthGrant {
  constructor(protected readonly resultRepo: ResultRepository) {
    super(resultRepo)
  }
}
@Injectable()
export class IchikawashiPrivateRentalHousing extends ChibaPrivateRentalHousing {
  constructor(protected readonly resultRepo: ResultRepository) {
    super(resultRepo)
  }
}
