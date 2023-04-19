import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private readonly prismaService: PrismaService) {}

  /*
   * 質問作成や助成金と市町区村の紐づけが完了している市町区村のデータすべてを返す関数オブジェクト
   */
  async getSupportedMunicipality() {
    try {
      const supportedMunicipality =
        await this.prismaService.municipality.findMany({
          orderBy: { id: 'asc' },
          where: { isSupported: true },
        });
      return supportedMunicipality;
    } catch (error) {}
  }
}
