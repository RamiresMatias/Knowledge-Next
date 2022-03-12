/*
  Warnings:

  - You are about to drop the column `pareintId` on the `categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_pareintId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "pareintId",
ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
