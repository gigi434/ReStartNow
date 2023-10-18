import {
  PrismaClient,
  User,
  Subsidy,
  Question,
  Information,
  Answer,
  SubsidyAmountCondition,
  SubsidyEligibilityCondition,
  QuestionGroupQuestion,
  QuestionGroup,
  Choice,
  QuestionChoice,
} from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'
import csv from 'csv-parser'

const prisma = new PrismaClient()

async function getDataFromDirectory<T>(directoryPath: string): Promise<T[]> {
  const objects: T[] = []

  const readCsv = (filePath: string): Promise<T[]> => {
    return new Promise((resolve, reject) => {
      const rows: T[] = []
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          // 数値に変換するフィールド
          if (row['standard_region_code']) {
            row['standard_region_code'] = parseInt(
              row['standard_region_code'],
              10,
            )
          }
          if (row['prefecture_code']) {
            row['prefecture_code'] = parseInt(row['prefecture_code'], 10)
          }

          rows.push(row as unknown as T)
        })
        .on('end', () => {
          resolve(rows)
        })
        .on('error', (err) => {
          reject(err)
        })
    })
  }

  const recursiveReadDir = async (dirPath: string) => {
    for (const filename of fs.readdirSync(dirPath)) {
      const filePath = path.join(dirPath, filename)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        await recursiveReadDir(filePath)
      } else if (stat.isFile()) {
        const fileExt = path.extname(filename)
        if (fileExt === '.json') {
          const data: T[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
          objects.push(...data)
        } else if (fileExt === '.csv') {
          const data: T[] = await readCsv(filePath)
          objects.push(...data)
        }
      }
    }
  }

  await recursiveReadDir(directoryPath)
  return objects
}

const doSubsidySeed = async () => {
  const subsidies = await getDataFromDirectory<Subsidy>(
    'prisma/master/subsidy/chiba',
  )

  for (const subsidy of subsidies) {
    await prisma.subsidy.create({
      data: {
        ...subsidy,
      },
    })
  }
}

const doUserSeed = async () => {
  const users = await getDataFromDirectory<User>('prisma/master/users')

  for (const user of users) {
    await prisma.user.create({
      data: {
        ...user,
      },
    })
  }
}

const doPrefectureSeed = async () => {
  interface PrefectureInJsonData {
    prefecture_code: number
    prefecture_name: string
    prefecture_romaji: string
  }
  const prefectures = await getDataFromDirectory<PrefectureInJsonData>(
    'prisma/master/prefectures',
  )

  for (const prefecture of prefectures) {
    await prisma.prefecture.create({
      data: {
        name: prefecture.prefecture_name,
        hepburnName: prefecture.prefecture_romaji,
      },
    })
  }
}

const doManicipalitySeed = async () => {
  interface MunicipalityInJsonData {
    standard_region_code: number
    municipality_name: string
    municipality_romaji: string
    prefecture_code: number
    prefecture_name: string
  }

  const municipalities = await getDataFromDirectory<MunicipalityInJsonData>(
    'prisma/master/municipalities',
  )

  for (const municipality of municipalities) {
    await prisma.municipality.create({
      data: {
        name: municipality.municipality_name,
        municipalSymbolPath: `/municipality/${municipality.standard_region_code}`,
        prefectureId: municipality.prefecture_code,
        hepburnName: municipality.municipality_romaji,
      },
    })
  }
}

const doQuestionsSeed = async () => {
  const questions = await getDataFromDirectory<Omit<Question, 'id'>>(
    'prisma/master/questions',
  )

  for (const question of questions) {
    await prisma.question.create({
      data: {
        ...question,
      },
    })
  }
}

const doInforamtionsSeed = async () => {
  const informations = await getDataFromDirectory<Omit<Information, 'id'>>(
    'prisma/master/informations',
  )

  for (const information of informations) {
    await prisma.information.create({
      data: {
        ...information,
      },
    })
  }
}

const doAnswersSeed = async () => {
  const answers = await getDataFromDirectory<Omit<Answer, 'id'>>(
    'prisma/master/answers',
  )

  for (const answer of answers) {
    await prisma.answer.create({
      data: {
        ...answer,
      },
    })
  }
}
const doSubsidyAmountConditionSeed = async () => {
  const subsidyAmountConditions = await getDataFromDirectory<
    Omit<SubsidyAmountCondition, 'id'>
  >('prisma/master/subsidy-amount-condition')

  for (const subsidyAmountCondition of subsidyAmountConditions) {
    await prisma.subsidyAmountCondition.create({
      data: {
        ...subsidyAmountCondition,
      },
    })
  }
}
const doSubsidyEligibilityConditionSeed = async () => {
  const subsidyEligibilityConditions = await getDataFromDirectory<
    Omit<SubsidyEligibilityCondition, 'id'>
  >('prisma/master/subsidy-eligibility-condition')

  for (const subsidyEligibilityCondition of subsidyEligibilityConditions) {
    await prisma.subsidyEligibilityCondition.create({
      data: {
        ...subsidyEligibilityCondition,
      },
    })
  }
}
const doQuestionGroupQuestionSeed = async () => {
  const questionGroupQuestions = await getDataFromDirectory<
    Omit<QuestionGroupQuestion, 'id'>
  >('prisma/master/question-group-question')

  for (const questionGroupQuestion of questionGroupQuestions) {
    await prisma.questionGroupQuestion.create({
      data: {
        ...questionGroupQuestion,
      },
    })
  }
}
const doQuestionGroupSeed = async () => {
  const questionGroups = await getDataFromDirectory<Omit<QuestionGroup, 'id'>>(
    'prisma/master/question-group',
  )

  for (const questionGroup of questionGroups) {
    await prisma.questionGroup.create({
      data: {
        ...questionGroup,
      },
    })
  }
}
const doChoiceSeed = async () => {
  const choices = await getDataFromDirectory<Omit<Choice, 'id'>>(
    'prisma/master/choices',
  )

  for (const choice of choices) {
    await prisma.choice.create({
      data: {
        ...choice,
      },
    })
  }
}
const doQuestionChoiceSeed = async () => {
  const questionChoices = await getDataFromDirectory<
    Omit<QuestionChoice, 'id'>
  >('prisma/master/question-choice')

  for (const questionChoice of questionChoices) {
    await prisma.questionChoice.create({
      data: {
        ...questionChoice,
      },
    })
  }
}

const main = async () => {
  console.log(`Start seeding ...`)

  await doUserSeed()
  await doPrefectureSeed()
  await doManicipalitySeed()
  await doQuestionsSeed()
  await doQuestionGroupSeed()
  await doSubsidySeed()
  await doInforamtionsSeed()
  await doAnswersSeed()
  await doSubsidyEligibilityConditionSeed()
  await doSubsidyAmountConditionSeed()
  await doQuestionGroupQuestionSeed()
  await doChoiceSeed()
  await doQuestionChoiceSeed()

  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
