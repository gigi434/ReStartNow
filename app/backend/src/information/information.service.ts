import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class InformationService {
  constructor(private readonly prismaService: PrismaService) {}
  /** お知らせをすべて取得する */
  async getAllInformations() {
    const informations = await this.prismaService.information.findMany({
      orderBy: { id: 'desc' },
    })

    return informations
  }

  /** お知らせを一つ取得する */
  async getOneInformation(informaitonId: number) {
    const information = await this.prismaService.information.findFirst({
      where: {
        id: informaitonId,
      },
    })

    return information
  }
}
