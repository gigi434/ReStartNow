/*
  Warnings:

  - A unique constraint covering the columns `[hepburnName]` on the table `Prefecture` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hepburnName` to the `Municipality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hepburnName` to the `Prefecture` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Municipality_name_key";

-- AlterTable
ALTER TABLE "Municipality" ADD COLUMN     "hepburnName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Prefecture" ADD COLUMN     "hepburnName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Prefecture_hepburnName_key" ON "Prefecture"("hepburnName");
