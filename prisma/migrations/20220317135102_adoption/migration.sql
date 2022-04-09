-- CreateTable
CREATE TABLE "adopts" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "petId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "adopts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "adopts" ADD CONSTRAINT "adopts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adopts" ADD CONSTRAINT "adopts_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
