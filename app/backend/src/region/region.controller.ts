import { Controller, Get, HttpStatus, NotFoundException } from '@nestjs/common'
import { RegionService } from './region.service'

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}
  /*
   * 質問を保有している市町区村データすべてを返す関数オブジェクト
   */
  @Get()
  async getSupportedMunicipalities() {
    try {
      const municipalitiesHeldQuesitons =
        await this.regionService.getSupportedMunicipality()
      if (!municipalitiesHeldQuesitons) {
        return new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Missing municipalitieshadQuesitons)`,
        })
      }
      return municipalitiesHeldQuesitons
    } catch (err) {
      throw new Error(err.toString())
    }
  }
}
