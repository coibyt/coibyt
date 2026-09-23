-- CreateTable
CREATE TABLE `StaffHours` (
    `id` VARCHAR(191) NOT NULL,
    `staffId` VARCHAR(191) NOT NULL,
    `weekday` INTEGER NOT NULL,
    `openMinute` INTEGER NOT NULL,
    `closeMinute` INTEGER NOT NULL,

    INDEX `StaffHours_staffId_idx`(`staffId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StaffHours` ADD CONSTRAINT `StaffHours_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `Staff`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
