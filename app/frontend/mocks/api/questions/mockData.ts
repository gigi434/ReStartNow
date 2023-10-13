import { Question } from '@prisma/client'

export type mockQuestionsType = Question & {
  questionGroupQuestion: {
    questionGroup: {
      subsidies: {
        id: number
      }
    }
  }
}

export let mockQuestions: mockQuestionsType[] = [
  {
    id: 1,
    answerType: 'BOOLEAN',
    text: '現在住んでいる市町区村の住民票がある',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'isResidency',
    questionGroupQuestion: {
      questionGroup: {
        subsidies: {
          id: 1,
        },
      },
    },
  },
  {
    id: 2,
    answerType: 'BOOLEAN',
    text: '出生届出後に面談を行った',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'haveChildcareInterview',
    questionGroupQuestion: {
      questionGroup: {
        subsidies: {
          id: 1,
        },
      },
    },
  },
  {
    id: 3,
    answerType: 'BOOLEAN',
    text: '妊娠届出時に面談を行った',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'havePregnancyInterview',
    questionGroupQuestion: {
      questionGroup: {
        subsidies: {
          id: 1,
        },
      },
    },
  },
]
