/*
  Warnings:

  - Added the required column `pageName` to the `Multiplechoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Multiplechoice" ADD COLUMN     "pageName" TEXT NOT NULL,
ALTER COLUMN "questionPhoto" DROP NOT NULL,
ALTER COLUMN "weight" SET DATA TYPE DOUBLE PRECISION;
