/*
  Warnings:

  - You are about to drop the column `subsidyId` on the `QuestionGroup` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionGroup" DROP CONSTRAINT "QuestionGroup_subsidyId_fkey";

-- DropIndex
DROP INDEX "QuestionGroup_subsidyId_key";

-- AlterTable
ALTER TABLE "QuestionGroup" DROP COLUMN "subsidyId";

-- AlterTable
ALTER TABLE "Subsidy" ADD COLUMN     "questionGroupId" INTEGER;

-- AddForeignKey
ALTER TABLE "Subsidy" ADD CONSTRAINT "Subsidy_questionGroupId_fkey" FOREIGN KEY ("questionGroupId") REFERENCES "QuestionGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
