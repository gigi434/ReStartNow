/*
  Warnings:

  - You are about to drop the column `municipality` on the `Municipality` table. All the data in the column will be lost.
  - You are about to drop the column `prefecture` on the `Municipality` table. All the data in the column will be lost.
  - You are about to drop the `QuestionAndAnswer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `municipalSymbol` to the `Municipality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Municipality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefectureId` to the `Municipality` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QuestionAndAnswer" DROP CONSTRAINT "QuestionAndAnswer_authorId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionAndAnswer" DROP CONSTRAINT "QuestionAndAnswer_municipalityId_fkey";

-- AlterTable
ALTER TABLE "Municipality" DROP COLUMN "municipality",
DROP COLUMN "prefecture",
ADD COLUMN     "municipalSymbol" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "prefectureId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "QuestionAndAnswer";

-- CreateTable
CREATE TABLE "Information" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prefecture" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Prefecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subsidy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deadlineForReceipt" TIMESTAMP(3) NOT NULL,
    "ageLimit" TEXT NOT NULL,
    "amountReceived" INTEGER NOT NULL,
    "addressApplication" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Subsidy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrefectureOnSubsidy" (
    "subsidyId" INTEGER NOT NULL,
    "prefectureId" INTEGER NOT NULL,

    CONSTRAINT "PrefectureOnSubsidy_pkey" PRIMARY KEY ("subsidyId","prefectureId")
);

-- CreateTable
CREATE TABLE "QuestionAndAnswerRequirements" (
    "id" SERIAL NOT NULL,
    "addressForApplication" TEXT NOT NULL,
    "encryptedIsEconomicallyDistressed" BOOLEAN NOT NULL,
    "encryptedIsHomeless" BOOLEAN NOT NULL,
    "encryptedHasRecentlyLostJobOrIncome" BOOLEAN NOT NULL,
    "encryptedIsMainEarnerOfHousehold" BOOLEAN NOT NULL,
    "encryptedIsActivelySeekingEmployment" BOOLEAN NOT NULL,
    "encryptedHasRegisteredWithHelloWork" BOOLEAN NOT NULL,
    "encryptedHouseholdIncome" INTEGER NOT NULL,
    "encryptedRent" INTEGER NOT NULL,
    "encryptedHouseholdSize" INTEGER NOT NULL,
    "encryptedFinancialAssets" INTEGER NOT NULL,
    "encryptedIsFinancialAssetsBelowLimit" BOOLEAN NOT NULL,
    "encryptedIsEligible" BOOLEAN NOT NULL,

    CONSTRAINT "QuestionAndAnswerRequirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionAndAnswerResult" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER,
    "municipalityId" INTEGER NOT NULL,

    CONSTRAINT "QuestionAndAnswerResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subsidy_name_key" ON "Subsidy"("name");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionAndAnswerResult_authorId_key" ON "QuestionAndAnswerResult"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionAndAnswerResult_municipalityId_key" ON "QuestionAndAnswerResult"("municipalityId");

-- AddForeignKey
ALTER TABLE "Municipality" ADD CONSTRAINT "Municipality_prefectureId_fkey" FOREIGN KEY ("prefectureId") REFERENCES "Prefecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrefectureOnSubsidy" ADD CONSTRAINT "PrefectureOnSubsidy_subsidyId_fkey" FOREIGN KEY ("subsidyId") REFERENCES "Subsidy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrefectureOnSubsidy" ADD CONSTRAINT "PrefectureOnSubsidy_prefectureId_fkey" FOREIGN KEY ("prefectureId") REFERENCES "Prefecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAndAnswerResult" ADD CONSTRAINT "QuestionAndAnswerResult_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAndAnswerResult" ADD CONSTRAINT "QuestionAndAnswerResult_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
