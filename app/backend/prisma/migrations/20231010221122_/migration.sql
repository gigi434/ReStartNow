/*
  Warnings:

  - You are about to drop the column `subsidyQuestionId` on the `Question` table. All the data in the column will be lost.
  - The primary key for the `SubsidyQuestion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SubsidyQuestion` table. All the data in the column will be lost.
  - Added the required column `questionId` to the `SubsidyQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_subsidyQuestionId_fkey";

-- DropIndex
DROP INDEX "SubsidyQuestion_subsidyId_key";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "subsidyQuestionId";

-- AlterTable
ALTER TABLE "SubsidyQuestion" DROP CONSTRAINT "SubsidyQuestion_pkey",
DROP COLUMN "id",
ADD COLUMN     "questionId" INTEGER NOT NULL,
ADD CONSTRAINT "SubsidyQuestion_pkey" PRIMARY KEY ("subsidyId", "questionId");

-- AddForeignKey
ALTER TABLE "SubsidyQuestion" ADD CONSTRAINT "SubsidyQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
