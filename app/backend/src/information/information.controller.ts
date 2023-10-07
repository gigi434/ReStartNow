import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { InformationService } from './information.service'

@Controller('informations')
export class InformationController {
  constructor(private readonly informationService: InformationService) {}
  /** お知らせをすべて取得する */
  @Get()
  async getAllInformations() {
    return await this.informationService.getAllInformations()
  }

  /** お知らせを一つ取得する  */
  @Get('/:informationId')
  async getOneInformation(
    @Param('informationId', ParseIntPipe) informationId: number,
  ) {
    return await this.informationService.getOneInformation(informationId)
  }
}
