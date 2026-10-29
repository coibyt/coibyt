-- AlterTable
ALTER TABLE `StaffIncomeReport` ADD COLUMN `ownerNote` VARCHAR(500) NULL,
    ADD COLUMN `rejectedAt` DATETIME(3) NULL;
