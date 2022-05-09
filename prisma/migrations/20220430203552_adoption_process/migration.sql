/*
  Warnings:

  - Added the required column `adoptionProcessId` to the `adopts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adopts" ADD COLUMN     "adoptionProcessId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "adoption_processes" (
    "id" SMALLSERIAL NOT NULL,
    "status" VARCHAR(15) NOT NULL,

    CONSTRAINT "adoption_processes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adoption_processes_status_key" ON "adoption_processes"("status");

-- AddForeignKey
ALTER TABLE "adopts" ADD CONSTRAINT "adopts_adoptionProcessId_fkey" FOREIGN KEY ("adoptionProcessId") REFERENCES "adoption_processes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
