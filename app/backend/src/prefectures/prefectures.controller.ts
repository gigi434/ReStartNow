import { Controller, Get } from '@nestjs/common'
import { PrefecturesService } from './prefectures.service'

@Controller('prefectures')
export class PrefecturesController {
  constructor(private readonly prefectureService: PrefecturesService) {}

  @Get()
  async getAllPrefetures() {
    try {
      const prefectures = await this.prefectureService.getAllPrefectures()
      return prefectures
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      return []
    }
  }
}
