-- DropForeignKey
ALTER TABLE "ReportEntry" DROP CONSTRAINT "ReportEntry_userId_fkey";

-- AlterTable
ALTER TABLE "ReportEntry" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ReportEntry" ADD CONSTRAINT "ReportEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
