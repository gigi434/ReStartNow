import { PrismaClient, User, Subsidy, Question } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

function getUsersFromJsonDirectory<T>(directoryPath: string): T[] {
  const objects: T[] = [];

  fs.readdirSync(directoryPath).forEach((filename) => {
    const filePath = path.join(directoryPath, filename);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && path.extname(filename) === '.json') {
      const data: T[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      objects.push(...data);
    }
  });

  return objects as T[];
}

const doSubsidySeed = async () => {
  const subsidies = await getUsersFromJsonDirectory<Subsidy>(
    'prisma/master/subsidy/chiba',
  );

  for (const subsidy of subsidies) {
    await prisma.subsidy.create({
      data: {
        ...subsidy,
      },
    });
  }
};

const doUserSeed = async () => {
  const users = await getUsersFromJsonDirectory<User>('prisma/master/users');

  for (const user of users) {
    await prisma.user.create({
      data: {
        ...user,
      },
    });
  }
};

const doPrefectureSeed = async () => {
  interface PrefectureInJsonData {
    prefCode: number;
    prefName: string;
  }
  const prefectures = await getUsersFromJsonDirectory<PrefectureInJsonData>(
    'prisma/master/prefectures',
  );

  for (const prefecture of prefectures) {
    await prisma.prefecture.create({
      data: {
        name: prefecture.prefName,
      },
    });
  }
};

const doManicipalitySeed = async () => {
  interface MunicipalityInJsonData {
    prefCode: number;
    cityCode: string;
    cityName: string;
    bigCityFlag: string;
  }

  const municipalities =
    await getUsersFromJsonDirectory<MunicipalityInJsonData>(
      'prisma/master/municipalities',
    );

  for (const municipality of municipalities) {
    await prisma.municipality.create({
      data: {
        name: municipality.cityName,
        municipalSymbolPath: `/src/public/munisipality-symbol/${municipality.cityCode}`,
        prefectureId: municipality.prefCode,
      },
    });
  }
};

const doQuestionsSeed = async () => {
  const questions = await getUsersFromJsonDirectory<Omit<Question, 'id'>>(
    'prisma/master/questions',
  );

  for (const question of questions) {
    await prisma.question.create({
      data: {
        ...question,
      },
    });
  }
};

const main = async () => {
  console.log(`Start seeding ...`);

  await doUserSeed();
  await doPrefectureSeed();
  await doManicipalitySeed();
  await doSubsidySeed();
  await doQuestionsSeed();
  // await doHousingSubsidyCondtion();
  // await doChildBirthSubsidyCondtion();

  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
