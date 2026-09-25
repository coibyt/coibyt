-- AlterTable
ALTER TABLE `Booking`
    ADD COLUMN `reminder24hSentAt` DATETIME(3) NULL,
    ADD COLUMN `reminder2hSentAt` DATETIME(3) NULL,
    ADD COLUMN `reminder15minSentAt` DATETIME(3) NULL,
    ADD COLUMN `reviewRequestSentAt` DATETIME(3) NULL;
