import { Controller, Get } from '@nestjs/common'
import { RegionService } from './region.service'

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}
  /*
   * 質問作成や助成金と市町区村の紐づけが完了している市町区村のデータすべてを返す関数オブジェクト
   */
  @Get()
  async getSupportedMunicipalities() {
    try {
      return await this.regionService.getSupportedMunicipality()
    } catch (err) {
      throw new Error(err.toString())
    }
  }
}
