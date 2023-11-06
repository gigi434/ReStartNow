-- CreateTable
CREATE TABLE "SubsidyConditionType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "typeProperty" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "SubsidyConditionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubsidyCondition" (
    "id" SERIAL NOT NULL,
    "parameter" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "conditionTypeId" INTEGER NOT NULL,
    "subsidyId" INTEGER NOT NULL,

    CONSTRAINT "SubsidyCondition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubsidyConditionType_type_key" ON "SubsidyConditionType"("type");

-- AddForeignKey
ALTER TABLE "SubsidyCondition" ADD CONSTRAINT "SubsidyCondition_conditionTypeId_fkey" FOREIGN KEY ("conditionTypeId") REFERENCES "SubsidyConditionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubsidyCondition" ADD CONSTRAINT "SubsidyCondition_subsidyId_fkey" FOREIGN KEY ("subsidyId") REFERENCES "Subsidy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
