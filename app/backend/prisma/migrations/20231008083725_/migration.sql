/*
  Warnings:

  - You are about to drop the `Choice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionChoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubsidyQuestion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subsidyId` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `answerType` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "QuestionChoice" DROP CONSTRAINT "QuestionChoice_choiceId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionChoice" DROP CONSTRAINT "QuestionChoice_questionId_fkey";

-- DropForeignKey
ALTER TABLE "SubsidyQuestion" DROP CONSTRAINT "SubsidyQuestion_questionId_fkey";

-- DropForeignKey
ALTER TABLE "SubsidyQuestion" DROP CONSTRAINT "SubsidyQuestion_subsidyId_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "subsidyId" INTEGER NOT NULL,
DROP COLUMN "answerType",
ADD COLUMN     "answerType" TEXT NOT NULL;

-- DropTable
DROP TABLE "Choice";

-- DropTable
DROP TABLE "QuestionChoice";

-- DropTable
DROP TABLE "SubsidyQuestion";

-- DropEnum
DROP TYPE "QuestionType";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_subsidyId_fkey" FOREIGN KEY ("subsidyId") REFERENCES "Subsidy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
