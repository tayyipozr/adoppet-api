/*
  Warnings:

  - A unique constraint covering the columns `[userId,petId]` on the table `favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "favorites_userId_petId_key" ON "favorites"("userId", "petId");
