/*
  Warnings:

  - You are about to drop the column `nama` on the `Author` table. All the data in the column will be lost.
  - Added the required column `name` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionId` to the `Detail_result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OptionLabel" AS ENUM ('A', 'B', 'C', 'D');

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "nama",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "handphoneNum" SET DEFAULT '',
ALTER COLUMN "authorPhoto" SET DEFAULT '',
ALTER COLUMN "bank" SET DEFAULT '',
ALTER COLUMN "accountBank" SET DEFAULT '',
ALTER COLUMN "profit" SET DEFAULT 0,
ALTER COLUMN "isApproved" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Detail_result" ADD COLUMN     "optionId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "adsBalance" SET DEFAULT 0,
ALTER COLUMN "userPhoto" SET DEFAULT '';

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

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail_result" ADD CONSTRAINT "Detail_result_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevokedToken" ADD CONSTRAINT "RevokedToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
