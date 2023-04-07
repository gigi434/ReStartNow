-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Municipality" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "prefecture" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,

    CONSTRAINT "Municipality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionAndAnswer" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER,
    "municipalityId" INTEGER NOT NULL,
    "encryptedIsEconomicallyDistressed" BOOLEAN NOT NULL,
    "encryptedIsHomeless" BOOLEAN NOT NULL,
    "encryptedHasRecentlyLostJobOrIncome" BOOLEAN NOT NULL,
    "encryptedIsMainEarnerOfHousehold" BOOLEAN NOT NULL,
    "encryptedIsActivelySeekingEmployment" BOOLEAN NOT NULL,
    "encryptedHasRegisteredWithHelloWork" BOOLEAN NOT NULL,
    "encryptedHouseholdIncome" INTEGER NOT NULL,
    "encryptedRent" INTEGER NOT NULL,
    "encryptedHouseholdSize" INTEGER NOT NULL,
    "encryptedFinancialAssets" INTEGER NOT NULL,
    "encryptedIsFinancialAssetsBelowLimit" BOOLEAN NOT NULL,
    "encryptedIsEligible" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionAndAnswer_id_key" ON "QuestionAndAnswer"("id");

-- AddForeignKey
ALTER TABLE "QuestionAndAnswer" ADD CONSTRAINT "QuestionAndAnswer_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAndAnswer" ADD CONSTRAINT "QuestionAndAnswer_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
