/*
  Warnings:

  - You are about to drop the `SubsidyQuestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubsidyQuestion" DROP CONSTRAINT "SubsidyQuestion_questionId_fkey";

-- DropForeignKey
ALTER TABLE "SubsidyQuestion" DROP CONSTRAINT "SubsidyQuestion_subsidyId_fkey";

-- DropTable
DROP TABLE "SubsidyQuestion";

-- CreateTable
CREATE TABLE "QuestionGroup" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subsidyId" INTEGER NOT NULL,

    CONSTRAINT "QuestionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionGroupQuestion" (
    "questionId" INTEGER NOT NULL,
    "questionGroupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionGroupQuestion_pkey" PRIMARY KEY ("questionId","questionGroupId")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionGroup_subsidyId_key" ON "QuestionGroup"("subsidyId");

-- AddForeignKey
ALTER TABLE "QuestionGroup" ADD CONSTRAINT "QuestionGroup_subsidyId_fkey" FOREIGN KEY ("subsidyId") REFERENCES "Subsidy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionGroupQuestion" ADD CONSTRAINT "QuestionGroupQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionGroupQuestion" ADD CONSTRAINT "QuestionGroupQuestion_questionGroupId_fkey" FOREIGN KEY ("questionGroupId") REFERENCES "QuestionGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
