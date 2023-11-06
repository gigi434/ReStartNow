-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin');

-- CreateEnum
CREATE TYPE "subsidyStatus" AS ENUM ('Abolition', 'Continuation');

-- CreateEnum
CREATE TYPE "informationImportance" AS ENUM ('High', 'Middle', 'Low');

-- CreateEnum
CREATE TYPE "answerType" AS ENUM ('BOOLEAN', 'NUMBER', 'CHOICE');

-- CreateTable
CREATE TABLE "Information" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "importance" "informationImportance" NOT NULL DEFAULT 'Low',
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Municipality" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "hepburnName" TEXT NOT NULL,
    "municipalSymbolPath" TEXT NOT NULL,
    "isSupported" BOOLEAN NOT NULL DEFAULT false,
    "prefectureId" INTEGER NOT NULL,

    CONSTRAINT "Municipality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prefecture" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "hepburnName" TEXT NOT NULL,

    CONSTRAINT "Prefecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubsidyName" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hepburnName" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "SubsidyName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subsidy" (
    "id" SERIAL NOT NULL,
    "deadlineForReceipt" TIMESTAMP(3),
    "amountReceived" TEXT NOT NULL,
    "applicationAddress" TEXT NOT NULL,
    "applicationMethod" TEXT NOT NULL,
    "status" "subsidyStatus" NOT NULL DEFAULT 'Continuation',
    "relatedLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "municipalityId" INTEGER NOT NULL,
    "subsidyNameId" INTEGER NOT NULL,
    "questionGroupId" INTEGER,

    CONSTRAINT "Subsidy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "answerType" "answerType" NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "propertyName" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionGroup" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "subsidyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answers" JSONB NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubsidyEligibilityCondition" (
    "id" SERIAL NOT NULL,
    "subsidyId" INTEGER NOT NULL,
    "conditionData" JSONB NOT NULL,

    CONSTRAINT "SubsidyEligibilityCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubsidyAmountCondition" (
    "id" SERIAL NOT NULL,
    "subsidyId" INTEGER NOT NULL,
    "amountData" JSONB NOT NULL,

    CONSTRAINT "SubsidyAmountCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionGroupQuestion" (
    "questionId" INTEGER NOT NULL,
    "questionGroupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Choice" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Choice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionChoice" (
    "questionId" INTEGER NOT NULL,
    "choiceId" INTEGER NOT NULL,

    CONSTRAINT "QuestionChoice_pkey" PRIMARY KEY ("questionId","choiceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Municipality_prefectureId_name_key" ON "Municipality"("prefectureId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Prefecture_name_key" ON "Prefecture"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Prefecture_hepburnName_key" ON "Prefecture"("hepburnName");

-- CreateIndex
CREATE UNIQUE INDEX "Prefecture_name_hepburnName_key" ON "Prefecture"("name", "hepburnName");

-- CreateIndex
CREATE UNIQUE INDEX "SubsidyName_name_key" ON "SubsidyName"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subsidy_subsidyNameId_municipalityId_key" ON "Subsidy"("subsidyNameId", "municipalityId");

-- CreateIndex
CREATE UNIQUE INDEX "Question_propertyName_key" ON "Question"("propertyName");

-- CreateIndex
CREATE UNIQUE INDEX "SubsidyEligibilityCondition_subsidyId_key" ON "SubsidyEligibilityCondition"("subsidyId");

-- CreateIndex
CREATE UNIQUE INDEX "SubsidyAmountCondition_subsidyId_key" ON "SubsidyAmountCondition"("subsidyId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionGroupQuestion_questionId_questionGroupId_key" ON "QuestionGroupQuestion"("questionId", "questionGroupId");

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Municipality" ADD CONSTRAINT "Municipality_prefectureId_fkey" FOREIGN KEY ("prefectureId") REFERENCES "Prefecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subsidy" ADD CONSTRAINT "Subsidy_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subsidy" ADD CONSTRAINT "Subsidy_subsidyNameId_fkey" FOREIGN KEY ("subsidyNameId") REFERENCES "SubsidyName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subsidy" ADD CONSTRAINT "Subsidy_questionGroupId_fkey" FOREIGN KEY ("questionGroupId") REFERENCES "QuestionGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_subsidyId_fkey" FOREIGN KEY ("subsidyId") REFERENCES "Subsidy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubsidyEligibilityCondition" ADD CONSTRAINT "SubsidyEligibilityCondition_subsidyId_fkey" FOREIGN KEY ("subsidyId") REFERENCES "Subsidy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubsidyAmountCondition" ADD CONSTRAINT "SubsidyAmountCondition_subsidyId_fkey" FOREIGN KEY ("subsidyId") REFERENCES "Subsidy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionGroupQuestion" ADD CONSTRAINT "QuestionGroupQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionGroupQuestion" ADD CONSTRAINT "QuestionGroupQuestion_questionGroupId_fkey" FOREIGN KEY ("questionGroupId") REFERENCES "QuestionGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionChoice" ADD CONSTRAINT "QuestionChoice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionChoice" ADD CONSTRAINT "QuestionChoice_choiceId_fkey" FOREIGN KEY ("choiceId") REFERENCES "Choice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
