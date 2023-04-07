/*
  Warnings:

  - You are about to drop the `PrefectureOnSubsidy` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Municipality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[municipalSymbol]` on the table `Municipality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Prefecture` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `prefectureId` to the `Subsidy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PrefectureOnSubsidy" DROP CONSTRAINT "PrefectureOnSubsidy_prefectureId_fkey";

-- DropForeignKey
ALTER TABLE "PrefectureOnSubsidy" DROP CONSTRAINT "PrefectureOnSubsidy_subsidyId_fkey";

-- AlterTable
ALTER TABLE "Subsidy" ADD COLUMN     "prefectureId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "PrefectureOnSubsidy";

-- CreateIndex
CREATE UNIQUE INDEX "Municipality_name_key" ON "Municipality"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Municipality_municipalSymbol_key" ON "Municipality"("municipalSymbol");

-- CreateIndex
CREATE UNIQUE INDEX "Prefecture_name_key" ON "Prefecture"("name");

-- AddForeignKey
ALTER TABLE "Subsidy" ADD CONSTRAINT "Subsidy_prefectureId_fkey" FOREIGN KEY ("prefectureId") REFERENCES "Prefecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
