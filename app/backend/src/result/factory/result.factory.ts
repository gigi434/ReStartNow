import { Injectable, NotFoundException } from '@nestjs/common'
import { ResultAFConfigService } from './abstract-factory-config'

@Injectable()
export class ResultFactory {
  constructor(private readonly resultAFConfigService: ResultAFConfigService) {}

  async createFactory(prefectureName: string, municipalityName: string) {
    // Factoryを返す
    const factory =
      this.resultAFConfigService.factories[
        `${prefectureName}-${municipalityName}`
      ]
    if (!factory) {
      throw new NotFoundException('Invalid municipalityId')
    }
    return factory
  }
}
