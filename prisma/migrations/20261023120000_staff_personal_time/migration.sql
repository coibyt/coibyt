-- AlterTable
ALTER TABLE `StaffTimeOff` ADD COLUMN `kind` VARCHAR(24) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE INDEX `StaffTimeOff_staffId_startsAt_idx` ON `StaffTimeOff`(`staffId`, `startsAt`);
