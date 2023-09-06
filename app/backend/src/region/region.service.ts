import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class RegionService {
  constructor(private readonly prismaService: PrismaService) {}

  /* 対応している市町区村をすべて取得する */
  async getSupportedMunicipality() {
    const supportedMunicipality =
      await this.prismaService.municipality.findMany({
        orderBy: { id: 'asc' },
      })

    return supportedMunicipality
  }
}
