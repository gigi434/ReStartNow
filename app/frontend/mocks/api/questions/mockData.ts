import {
  Question,
  Choice,
  QuestionGroupQuestion,
  QuestionGroup,
} from '@prisma/client'

type QuestionChoice = {
  questionId: number
  choiceId: number
  choice: Choice
}
type customQuestionGroup = QuestionGroup & {
  subsidies: [{ id: number }]
}

type customQuestionGroupQuestion = QuestionGroupQuestion & {
  questionGroup: customQuestionGroup
}
// Questionの拡張型定義
export type mockQuestionType = Question & {
  questionChoice: QuestionChoice[]
  questionGroupQuestion: customQuestionGroupQuestion[]
}

export let mockQuestions: mockQuestionType[] = [
  {
    id: 1,
    answerType: 'BOOLEAN',
    text: '離職等により経済的に困窮し、家賃の支払いが困難で、住居を喪失した、または住居喪失のおそれがある',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'economicHardship',
    questionGroupQuestion: [
      {
        questionId: 1,
        questionGroupId: 1,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 1,
          description: '市川市の住居確保給付金',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 1,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 2,
    answerType: 'BOOLEAN',
    text: '申請日において、離職・自営業の廃業の日から原則4年以内である。または、給与等を得る機会が本人の責に帰すべき理由、本人の都合によらないで減少し、離職や廃業と同程度の状況にある。',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'isEligibleForApplicationBasedOnEmploymentStatus',
    questionGroupQuestion: [
      {
        questionId: 2,
        questionGroupId: 1,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 1,
          description: '市川市の住居確保給付金',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 1,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 3,
    answerType: 'BOOLEAN',
    text: '離職等の日において、その属する世帯の生計を主として維持していた。または、申請日の属する月において、その属する世帯の生計を主として維持している。',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'isMaintainingLivelihood',
    questionGroupQuestion: [
      {
        questionId: 3,
        questionGroupId: 1,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 1,
          description: '市川市の住居確保給付金',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 1,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 4,
    answerType: 'BOOLEAN',
    text: '公共職業安定所等での求職活動を行う、または、経営相談など自立に向けた活動を行う（自営業のかたのみ選択できます。）',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'activityStatus',
    questionGroupQuestion: [
      {
        questionId: 4,
        questionGroupId: 1,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 1,
          description: '市川市の住居確保給付金',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 1,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 5,
    answerType: 'NUMBER',
    text: '世帯の人数を入力してください',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'numberOfHouseholdMembers',
    questionGroupQuestion: [
      {
        questionId: 5,
        questionGroupId: 1,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 1,
          description: '市川市の住居確保給付金',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 1,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 6,
    answerType: 'NUMBER',
    text: '申請を行う月に、申請者および申請者と同一の世帯に属する方の収入額を入力してください',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'monthlyHouseholdIncome',
    questionGroupQuestion: [
      {
        questionId: 6,
        questionGroupId: 1,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 1,
          description: '市川市の住居確保給付金',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 1,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 7,
    answerType: 'NUMBER',
    text: '申請日において、申請者及び申請者と同一の世帯に属する方の所有する金融資産（現金、預貯金）の合計額を入力してください',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'financialAssets',
    questionGroupQuestion: [
      {
        questionId: 7,
        questionGroupId: 1,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 1,
          description: '市川市の住居確保給付金',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 1,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 8,
    answerType: 'BOOLEAN',
    text: '住居確保給付金に類似する雇用対策給付等を、申請者及び申請者と同一の世帯に属する方が受けていない',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'isReceivingSimilarSubsidy',
    questionGroupQuestion: [
      {
        questionId: 8,
        questionGroupId: 1,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 1,
          description: '市川市の住居確保給付金',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 1,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 9,
    answerType: 'BOOLEAN',
    text: '申請者及び申請者と生計を一とする同居の親族のいずれもが暴力団員ではない',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'isGangMember',
    questionGroupQuestion: [
      {
        questionId: 9,
        questionGroupId: 1,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 1,
          description: '市川市の住居確保給付金',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 1,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 10,
    answerType: 'BOOLEAN',
    text: '申請者及び申請者と同一の世帯に属する方が生活保護を受けていないこと。',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'isReceivingWelfare',
    questionGroupQuestion: [
      {
        questionId: 10,
        questionGroupId: 1,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 1,
          description: '市川市の住居確保給付金',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 1,
            },
          ],
        },
      },
      {
        questionId: 10,
        questionGroupId: 2,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 2,
          description: '市川市の民間賃貸住宅家賃等助成制度',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 2,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 11,
    answerType: 'BOOLEAN',
    text: '現在住んでいる市町区村の住民票がある',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'isResidency',
    questionGroupQuestion: [
      {
        questionId: 11,
        questionGroupId: 3,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 3,
          description: '市川市の出産・子育て応援給付金',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 3,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 12,
    answerType: 'BOOLEAN',
    text: '妊娠届出時に面談を行った',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'haveChildcareInterview',
    questionGroupQuestion: [
      {
        questionId: 12,
        questionGroupId: 3,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 3,
          description: '市川市の出産・子育て応援給付金',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 3,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 13,
    answerType: 'BOOLEAN',
    text: '出生届出後に面談を行った',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'havePregnancyInterview',
    questionGroupQuestion: [
      {
        questionId: 13,
        questionGroupId: 3,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 3,
          description: '市川市の出産・子育て応援給付金',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 3,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 14,
    answerType: 'BOOLEAN',
    text: '現在の住居が民間賃貸である',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'currentHousing',
    questionGroupQuestion: [
      {
        questionId: 14,
        questionGroupId: 2,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 2,
          description: '市川市の民間賃貸住宅家賃等助成制度',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 2,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 15,
    answerType: 'BOOLEAN',
    text: '自治体に引き続き2年以上居住し、住民登録をされていること。',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'isRegisteredResidentForOverTwoYears',
    questionGroupQuestion: [
      {
        questionId: 15,
        questionGroupId: 2,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 2,
          description: '市川市の民間賃貸住宅家賃等助成制度',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 2,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 16,
    answerType: 'BOOLEAN',
    text: '65歳以上の一人暮らし、または全員が65歳以上である、または、 心身障害者がいる、または一人親、または父母のない児童を養育している世帯である',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'hasSpecialFamilyCondition',
    questionGroupQuestion: [
      {
        questionId: 16,
        questionGroupId: 2,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 2,
          description: '市川市の民間賃貸住宅家賃等助成制度',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 2,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 17,
    answerType: 'NUMBER',
    text: '世帯の人数を入力してください',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'familyType',
    questionGroupQuestion: [
      {
        questionId: 17,
        questionGroupId: 2,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 2,
          description: '市川市の民間賃貸住宅家賃等助成制度',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 2,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 18,
    answerType: 'BOOLEAN',
    text: '前年の収入が公営住宅法で定められた金額以下であることを確認します。前年の収入を入力してください',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'yearlyEarnings',
    questionGroupQuestion: [
      {
        questionId: 18,
        questionGroupId: 2,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 2,
          description: '市川市の民間賃貸住宅家賃等助成制度',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 2,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 19,
    answerType: 'BOOLEAN',
    text: '立ち退き後の家賃を入力してください',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'monthlyRentAfterEviction',
    questionGroupQuestion: [
      {
        questionId: 19,
        questionGroupId: 2,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 2,
          description: '市川市の民間賃貸住宅家賃等助成制度',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 2,
            },
          ],
        },
      },
    ],
    questionChoice: [],
  },
  {
    id: 20,
    answerType: 'CHOICE',
    text: '前年の収入の種類を選択してください',
    createdAt: new Date('2020/06/28 15:32:21'),
    updatedAt: new Date('2020/06/28 15:32:21'),
    propertyName: 'earningsCategory',
    questionGroupQuestion: [
      {
        questionId: 20,
        questionGroupId: 2,
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        questionGroup: {
          id: 2,
          description: '市川市の民間賃貸住宅家賃等助成制度',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
          subsidies: [
            {
              id: 2,
            },
          ],
        },
      },
    ],
    questionChoice: [
      {
        questionId: 20,
        choiceId: 1,
        choice: {
          id: 1,
          text: '給与所得者（収入）',
          value: 'salariedEmployees',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
        },
      },
      {
        questionId: 20,
        choiceId: 2,
        choice: {
          id: 2,
          text: '事業所得者（所得）',
          value: 'businessIncomeEarner',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
        },
      },
      {
        questionId: 20,
        choiceId: 3,
        choice: {
          id: 3,
          text: '年金所得者',
          value: 'pensionIncomeEarner',
          createdAt: new Date('2020/06/28 15:32:21'),
          updatedAt: new Date('2020/06/28 15:32:21'),
        },
      },
    ],
  },
]
