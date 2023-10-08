import {
  PrismaClient,
  User,
  Subsidy,
  Question,
  Information,
  Answer,
  SubsidyAmountCondition,
  SubsidyEligibilityCondition,
} from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

function getUsersFromJsonDirectory<T>(directoryPath: string): T[] {
  const objects: T[] = []

  fs.readdirSync(directoryPath).forEach((filename) => {
    const filePath = path.join(directoryPath, filename)
    const stat = fs.statSync(filePath)

    if (stat.isFile() && path.extname(filename) === '.json') {
      const data: T[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      objects.push(...data)
    }
  })

  return objects as T[]
}

const doSubsidySeed = async () => {
  const subsidies = await getUsersFromJsonDirectory<Subsidy>(
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
  const users = await getUsersFromJsonDirectory<User>('prisma/master/users')

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
    prefCode: number
    prefName: string
  }
  const prefectures = await getUsersFromJsonDirectory<PrefectureInJsonData>(
    'prisma/master/prefectures',
  )

  for (const prefecture of prefectures) {
    await prisma.prefecture.create({
      data: {
        name: prefecture.prefName,
      },
    })
  }
}

const doManicipalitySeed = async () => {
  interface MunicipalityInJsonData {
    prefCode: number
    cityCode: string
    cityName: string
    bigCityFlag: string
  }

  const municipalities =
    await getUsersFromJsonDirectory<MunicipalityInJsonData>(
      'prisma/master/municipalities',
    )

  for (const municipality of municipalities) {
    await prisma.municipality.create({
      data: {
        name: municipality.cityName,
        municipalSymbolPath: `/municipality/${municipality.cityCode}`,
        prefectureId: municipality.prefCode,
      },
    })
  }
}

const doQuestionsSeed = async () => {
  const questions = await getUsersFromJsonDirectory<Omit<Question, 'id'>>(
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
  const informations = await getUsersFromJsonDirectory<Omit<Information, 'id'>>(
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
  const answers = await getUsersFromJsonDirectory<Omit<Answer, 'id'>>(
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
  const subsidyAmountConditions = await getUsersFromJsonDirectory<
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
  const subsidyEligibilityConditions = await getUsersFromJsonDirectory<
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

const main = async () => {
  console.log(`Start seeding ...`)

  await doUserSeed()
  await doPrefectureSeed()
  await doManicipalitySeed()
  await doSubsidySeed()
  await doQuestionsSeed()
  await doInforamtionsSeed()
  await doAnswersSeed()
  await doSubsidyEligibilityConditionSeed()
  await doSubsidyAmountConditionSeed()

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
