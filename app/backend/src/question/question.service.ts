import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
@Injectable()
export class QuestionService {
  constructor(private readonly prismaService: PrismaService) {}

  async getQuestionsBySubsidyId(subsidyId: number) {
    const subsidy = await this.prismaService.subsidy.findUnique({
      where: {
        id: subsidyId,
      },
      select: {
        relatedLink: true,
      },
    })
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
    const questionsWithSubsidy = { questions, ...subsidy }

    return questionsWithSubsidy
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
                    relatedLink: true,
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
