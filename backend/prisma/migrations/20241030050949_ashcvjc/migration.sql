/*
  Warnings:

  - Added the required column `type` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('PilihanGanda', 'Essay');

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "type" "Type" NOT NULL;
