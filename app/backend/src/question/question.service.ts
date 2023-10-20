import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
@Injectable()
export class QuestionService {
  constructor(private readonly prismaService: PrismaService) {}

  async getQuestionsBySubsidyId(subsidyId: number) {
    const questions = await this.prismaService.question.findMany({
      where: {
        questionGroupQuestion: {
          every: { questionGroup: { subsidies: { every: { id: subsidyId } } } },
        },
      },
      include: {
        questionChoice: {
          include: {
            choice: true,
          },
        },
      },
    })
    return questions
  }

  async GetAllQuestions() {
    const questions = await this.prismaService.question.findMany({
      include: {
        questionGroupQuestion: {
          include: {
            questionGroup: {
              include: {
                subsidies: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
        questionChoice: {
          include: {
            choice: true,
          },
        },
      },
    })
    return questions
  }
}
