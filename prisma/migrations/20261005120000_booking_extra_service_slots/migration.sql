-- AlterTable
ALTER TABLE `BookingExtraService` ADD COLUMN `staffId` VARCHAR(191) NULL,
    ADD COLUMN `startsAt` DATETIME(3) NULL,
    ADD COLUMN `endsAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `source` ENUM('WEBSITE', 'MANUAL') NOT NULL DEFAULT 'WEBSITE';

-- CreateIndex
CREATE INDEX `BookingExtraService_staffId_startsAt_idx` ON `BookingExtraService`(`staffId`, `startsAt`);

-- AddForeignKey
ALTER TABLE `BookingExtraService` ADD CONSTRAINT `BookingExtraService_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `Staff`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
