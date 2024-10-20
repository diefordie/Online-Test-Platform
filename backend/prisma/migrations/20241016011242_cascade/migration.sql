-- DropForeignKey
ALTER TABLE "Multiplechoice" DROP CONSTRAINT "Multiplechoice_testId_fkey";

-- AddForeignKey
ALTER TABLE "Multiplechoice" ADD CONSTRAINT "Multiplechoice_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;
