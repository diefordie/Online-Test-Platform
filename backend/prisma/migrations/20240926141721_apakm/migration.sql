/*
  Warnings:

  - Made the column `question` on table `Multiplechoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weight` on table `Multiplechoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discussion` on table `Multiplechoice` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Multiplechoice" ALTER COLUMN "question" SET NOT NULL,
ALTER COLUMN "weight" SET NOT NULL,
ALTER COLUMN "discussion" SET NOT NULL;
