/*
  Warnings:

  - You are about to drop the `SubsidyCondition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubsidyConditionType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubsidyCondition" DROP CONSTRAINT "SubsidyCondition_conditionTypeId_fkey";

-- DropForeignKey
ALTER TABLE "SubsidyCondition" DROP CONSTRAINT "SubsidyCondition_subsidyId_fkey";

-- DropTable
DROP TABLE "SubsidyCondition";

-- DropTable
DROP TABLE "SubsidyConditionType";

-- CreateTable
CREATE TABLE "SubsidyEligibilityCondition" (
    "id" SERIAL NOT NULL,
    "subsidyId" INTEGER NOT NULL,
    "conditionData" JSONB NOT NULL,

    CONSTRAINT "SubsidyEligibilityCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubsidyAmountCondition" (
    "id" SERIAL NOT NULL,
    "subsidyId" INTEGER NOT NULL,
    "amountData" JSONB NOT NULL,

    CONSTRAINT "SubsidyAmountCondition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubsidyEligibilityCondition_subsidyId_key" ON "SubsidyEligibilityCondition"("subsidyId");

-- CreateIndex
CREATE UNIQUE INDEX "SubsidyAmountCondition_subsidyId_key" ON "SubsidyAmountCondition"("subsidyId");

-- AddForeignKey
ALTER TABLE "SubsidyEligibilityCondition" ADD CONSTRAINT "SubsidyEligibilityCondition_subsidyId_fkey" FOREIGN KEY ("subsidyId") REFERENCES "Subsidy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubsidyAmountCondition" ADD CONSTRAINT "SubsidyAmountCondition_subsidyId_fkey" FOREIGN KEY ("subsidyId") REFERENCES "Subsidy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
