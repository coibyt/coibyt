-- CreateTable
CREATE TABLE `BranchBusyAdjust` (
    `id` VARCHAR(191) NOT NULL,
    `staffId` VARCHAR(191) NOT NULL,
    `sourceKey` VARCHAR(40) NOT NULL,
    `beforeMinutes` INTEGER NOT NULL,
    `afterMinutes` INTEGER NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BranchBusyAdjust_staffId_sourceKey_key`(`staffId`, `sourceKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BranchBusyAdjust` ADD CONSTRAINT `BranchBusyAdjust_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `Staff`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
