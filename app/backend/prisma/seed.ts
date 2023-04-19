import { PrismaClient, User } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const doUserSeed = async () => {
  interface JsonData {
    result: User[];
  }

  const users = await (function getUsersFromJsonDirectory(
    directoryPath: string,
  ): User[] {
    const objects: User[] = [];

    fs.readdirSync(directoryPath).forEach((filename) => {
      const filePath = path.join(directoryPath, filename);
      const stat = fs.statSync(filePath);

      if (stat.isFile() && path.extname(filename) === '.json') {
        const data: JsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        objects.push(...data.result);
      }
    });

    return objects;
  })('prisma/master/users');

  for (const user of users) {
    await prisma.user.create({
      data: {
        ...user,
      },
    });
  }
};

const doPrefectureSeed = async () => {
  interface ResultObject {
    prefCode: number;
    prefName: string;
  }

  interface JsonData {
    message: null;
    result: ResultObject[];
  }

  const prefectures = await (function getObjectsFromJsonDirectory(
    directoryPath: string,
  ): ResultObject[] {
    const objects: ResultObject[] = [];

    fs.readdirSync(directoryPath).forEach((filename) => {
      const filePath = path.join(directoryPath, filename);
      const stat = fs.statSync(filePath);

      if (stat.isFile() && path.extname(filename) === '.json') {
        const data: JsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        objects.push(...data.result);
      }
    });

    return objects;
  })('prisma/master/prefectures');

  for (const prefecture of prefectures) {
    await prisma.prefecture.create({
      data: {
        name: prefecture.prefName,
      },
    });
  }
};

const doManicipalitySeed = async () => {
  interface ResultObject {
    prefCode: number;
    cityCode: string;
    cityName: string;
    bigCityFlag: string;
  }

  interface JsonData {
    message: null;
    result: ResultObject[];
  }

  const manicipalities = await (function getObjectsFromJsonDirectory(
    directoryPath: string,
  ): ResultObject[] {
    const objects: ResultObject[] = [];

    fs.readdirSync(directoryPath).forEach((filename) => {
      const filePath = path.join(directoryPath, filename);
      const stat = fs.statSync(filePath);

      if (stat.isFile() && path.extname(filename) === '.json') {
        const data: JsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        objects.push(...data.result);
      }
    });

    return objects;
  })('prisma/master/cities');

  for (const municipality of manicipalities) {
    await prisma.municipality.create({
      data: {
        name: municipality.cityName,
        municipalSymbolPath: `/src/public/munisipality-symbol/${municipality.cityCode}`,
        prefectureId: municipality.prefCode,
      },
    });
  }
};

const main = async () => {
  console.log(`Start seeding ...`);

  await doUserSeed();
  await doPrefectureSeed();
  await doManicipalitySeed();

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
