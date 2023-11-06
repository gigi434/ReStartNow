/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `Choice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `Choice` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `answerType` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answerType",
ADD COLUMN     "answerType" "QuestionType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Choice_text_key" ON "Choice"("text");

-- CreateIndex
CREATE UNIQUE INDEX "Choice_value_key" ON "Choice"("value");
