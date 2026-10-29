-- AlterTable
ALTER TABLE `Business` ADD COLUMN `incomeRemindersSince` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Staff` ADD COLUMN `incomeReminderSentAt` DATETIME(3) NULL;
