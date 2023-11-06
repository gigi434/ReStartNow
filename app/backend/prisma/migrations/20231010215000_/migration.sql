/*
  Warnings:

  - You are about to drop the column `subsidyId` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_subsidyId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "subsidyId",
ADD COLUMN     "subsidyQuestionId" INTEGER;

-- CreateTable
CREATE TABLE "SubsidyQuestion" (
    "id" SERIAL NOT NULL,
    "subsidyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubsidyQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubsidyQuestion_subsidyId_key" ON "SubsidyQuestion"("subsidyId");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_subsidyQuestionId_fkey" FOREIGN KEY ("subsidyQuestionId") REFERENCES "SubsidyQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubsidyQuestion" ADD CONSTRAINT "SubsidyQuestion_subsidyId_fkey" FOREIGN KEY ("subsidyId") REFERENCES "Subsidy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
