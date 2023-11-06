/*
  Warnings:

  - You are about to drop the column `name` on the `Subsidy` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[prefectureId,name]` on the table `Municipality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,hepburnName]` on the table `Prefecture` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subsidyNameId,municipalityId]` on the table `Subsidy` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subsidyNameId` to the `Subsidy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subsidy" DROP COLUMN "name",
ADD COLUMN     "subsidyNameId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SubsidyName" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hepburnName" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "SubsidyName_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubsidyName_name_key" ON "SubsidyName"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Municipality_prefectureId_name_key" ON "Municipality"("prefectureId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Prefecture_name_hepburnName_key" ON "Prefecture"("name", "hepburnName");

-- CreateIndex
CREATE UNIQUE INDEX "Subsidy_subsidyNameId_municipalityId_key" ON "Subsidy"("subsidyNameId", "municipalityId");

-- AddForeignKey
ALTER TABLE "Subsidy" ADD CONSTRAINT "Subsidy_subsidyNameId_fkey" FOREIGN KEY ("subsidyNameId") REFERENCES "SubsidyName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
