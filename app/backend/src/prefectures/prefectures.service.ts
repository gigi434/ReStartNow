import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PrefecturesService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAllPrefectures() {
    const prefectures = await this.prismaService.prefecture.findMany()

    if (prefectures.length === 0) {
      throw new NotFoundException()
    }

    return prefectures
  }
}
