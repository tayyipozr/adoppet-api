-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "imageUrls" TEXT[];

-- CreateTable
CREATE TABLE "PetImage" (
    "id" SERIAL NOT NULL,
    "petId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "PetImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PetImage_url_key" ON "PetImage"("url");

-- AddForeignKey
ALTER TABLE "PetImage" ADD CONSTRAINT "PetImage_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
