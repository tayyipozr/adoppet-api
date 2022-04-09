/*
  Warnings:

  - Added the required column `title` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_genderId_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_typeId_fkey";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "content" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE CASCADE ON UPDATE CASCADE;
