import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Question } from '@prisma/client';
@Injectable()
export class QuestionService {
  constructor(private readonly prismaService: PrismaService) {}

  async getQuestionByMunicipalityId(municipalityId: number) {
    const objects: Question[] = [];

    const subsidies = await this.prismaService.subsidy.findMany({
      where: {
        municipalityId: municipalityId,
      },
    });

    for (const subsidy of subsidies) {
      if (subsidy) {
        const questions = await this.prismaService.question.findMany({
          where: {
            id: subsidy.id,
          },
        });
        objects.push(...questions);
      }
    }

    return objects;
  }
}
