/*
  Warnings:

  - You are about to drop the column `applicationRequirements` on the `Subsidy` table. All the data in the column will be lost.
  - The `deadlineForReceipt` column on the `Subsidy` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `relatedLink` to the `Subsidy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subsidy" DROP COLUMN "applicationRequirements",
ADD COLUMN     "relatedLink" TEXT NOT NULL,
DROP COLUMN "deadlineForReceipt",
ADD COLUMN     "deadlineForReceipt" TIMESTAMP(3);
