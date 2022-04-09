/*
  Warnings:

  - You are about to drop the column `gender` on the `pets` table. All the data in the column will be lost.
  - Added the required column `genderId` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "gender",
ADD COLUMN     "genderId" SMALLINT NOT NULL;

-- CreateTable
CREATE TABLE "Gender" (
    "id" SMALLSERIAL NOT NULL,
    "gender" VARCHAR(6) NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gender_gender_key" ON "Gender"("gender");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
