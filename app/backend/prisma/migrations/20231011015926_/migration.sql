/*
  Warnings:

  - The primary key for the `QuestionGroupQuestion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[questionId,questionGroupId]` on the table `QuestionGroupQuestion` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "QuestionGroupQuestion" DROP CONSTRAINT "QuestionGroupQuestion_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "QuestionGroupQuestion_questionId_questionGroupId_key" ON "QuestionGroupQuestion"("questionId", "questionGroupId");
