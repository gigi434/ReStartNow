import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
@Injectable()
export class QuestionService {
  constructor(private readonly prismaService: PrismaService) {}

  async getQuestionsBySubsidyId(subsidyId: number) {
    const questions = await this.prismaService.question.findMany({
      where: {
        subsidyId: subsidyId,
      },
    })
    return questions
  }

  async GetAllQuestions() {
    const questions = await this.prismaService.question.findMany()

    return questions
  }
}
