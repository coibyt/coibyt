-- AlterTable: a report can belong to a booking or to a personal time block.
ALTER TABLE `StaffIncomeReport` MODIFY `bookingId` VARCHAR(191) NULL,
    ADD COLUMN `timeOffId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `StaffIncomeReport_timeOffId_key` ON `StaffIncomeReport`(`timeOffId`);
