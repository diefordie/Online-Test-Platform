/*
  Warnings:

  - You are about to drop the column `isPubblished` on the `Test` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Test" DROP COLUMN "isPubblished",
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false;
