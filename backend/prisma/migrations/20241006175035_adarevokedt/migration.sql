/*
  Warnings:

  - You are about to drop the column `nama` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `optionLabel` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Test` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[optionId,resultId]` on the table `Detail_result` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Category" ADD VALUE 'Pemrograman';
ALTER TYPE "Category" ADD VALUE 'Psikotes';

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_userId_fkey";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "nama",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Detail_result" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "optionLabel";

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "RevokedToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RevokedToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RevokedToken_token_key" ON "RevokedToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Detail_result_optionId_resultId_key" ON "Detail_result"("optionId", "resultId");

-- AddForeignKey
ALTER TABLE "RevokedToken" ADD CONSTRAINT "RevokedToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
