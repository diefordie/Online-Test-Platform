/*
  Warnings:

  - You are about to drop the column `nama` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `optionLabel` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Test` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[optionId,resultId]` on the table `Detail_result` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
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

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT NOT NULL;

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
