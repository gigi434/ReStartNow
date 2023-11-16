import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class RegionService {
  constructor(private readonly prismaService: PrismaService) {}

  /* 質問を保有している市町区村をすべて取得する */
  async getSupportedMunicipality() {
    return this.prismaService.municipality.findMany({
      where: {
        subsidies: {
          some: {
            questionGroupId: {
              not: null,
            },
          },
        },
      },
    })
  }
}
