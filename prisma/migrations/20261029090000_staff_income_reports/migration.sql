-- CreateTable
CREATE TABLE `StaffIncomeReport` (
    `id` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `bookingId` VARCHAR(191) NOT NULL,
    `staffId` VARCHAR(191) NULL,
    `staffName` VARCHAR(120) NULL,
    `customerName` VARCHAR(160) NOT NULL,
    `serviceName` VARCHAR(200) NOT NULL,
    `serviceAt` DATETIME(3) NOT NULL,
    `expectedCents` INTEGER NOT NULL,
    `currency` VARCHAR(3) NOT NULL,
    `cashCents` INTEGER NOT NULL DEFAULT 0,
    `bankCents` INTEGER NOT NULL DEFAULT 0,
    `giftCard1Cents` INTEGER NOT NULL DEFAULT 0,
    `giftCard1Code` VARCHAR(40) NULL,
    `giftCard2Cents` INTEGER NOT NULL DEFAULT 0,
    `giftCard2Code` VARCHAR(40) NULL,
    `totalCents` INTEGER NOT NULL,
    `note` VARCHAR(500) NULL,
    `status` VARCHAR(12) NOT NULL DEFAULT 'PENDING',
    `reportedById` VARCHAR(191) NOT NULL,
    `approvedAt` DATETIME(3) NULL,
    `approvedById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `StaffIncomeReport_bookingId_key`(`bookingId`),
    INDEX `StaffIncomeReport_businessId_status_idx`(`businessId`, `status`),
    INDEX `StaffIncomeReport_businessId_serviceAt_idx`(`businessId`, `serviceAt`),
    INDEX `StaffIncomeReport_staffId_serviceAt_idx`(`staffId`, `serviceAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StaffIncomePhoto` (
    `id` VARCHAR(191) NOT NULL,
    `reportId` VARCHAR(191) NOT NULL,
    `data` LONGBLOB NOT NULL,
    `mimeType` VARCHAR(40) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `StaffIncomePhoto_reportId_idx`(`reportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StaffIncomePhoto` ADD CONSTRAINT `StaffIncomePhoto_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `StaffIncomeReport`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
