import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma, Answer } from '@prisma/client'
@Injectable()
export class AnswerService {
  constructor(private readonly prismaService: PrismaService) {}

  /**ユーザーに紐づけられた回答をすべて取得する */
  async getAllAnswersByUser(userId: number) {
    return await this.prismaService.answer.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  /** ユーザーに紐づけられた一つの回答を取得する */
  async getOneAnswerByUser(userId: number, answerId: number) {
    return await this.prismaService.answer.findFirst({
      where: {
        id: answerId,
        userId: userId,
      },
    })
  }

  /** ユーザーに紐づけられた回答を作成する */
  async createOneAnswer(
    jsonData: Prisma.JsonArray,
    userId: number,
    subsidyId: number,
  ) {
    const data = await this.prismaService.answer.create({
      data: {
        userId: userId,
        subsidyId: subsidyId,
        answers: jsonData,
      },
    })

    return data
  }

  /** ユーザーに紐づけられた回答を削除する */
  async deleteOneAnswer(answerId: number) {
    return await this.prismaService.answer.delete({
      where: {
        id: answerId,
      },
    })
  }
}
