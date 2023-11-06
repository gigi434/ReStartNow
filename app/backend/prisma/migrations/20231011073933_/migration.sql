/*
  Warnings:

  - A unique constraint covering the columns `[propertyName]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `answerType` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "answerType" AS ENUM ('BOOLEAN', 'NUMBER');

-- DropIndex
DROP INDEX "Subsidy_name_key";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answerType",
ADD COLUMN     "answerType" "answerType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Question_propertyName_key" ON "Question"("propertyName");
