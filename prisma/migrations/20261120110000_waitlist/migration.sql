-- Wait list: customers who want a slot that is full (src/lib/waitlist.ts).

-- CreateTable
CREATE TABLE `WaitlistEntry` (
    `id` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `serviceId` VARCHAR(191) NULL,
    `staffId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,
    `name` VARCHAR(120) NOT NULL,
    `phone` VARCHAR(30) NULL,
    `email` VARCHAR(191) NOT NULL,
    `fromDate` DATE NOT NULL,
    `toDate` DATE NOT NULL,
    `note` VARCHAR(300) NULL,
    `token` VARCHAR(64) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `notifiedAt` DATETIME(3) NULL,
    `notifyCount` INTEGER NOT NULL DEFAULT 0,
    `leftAt` DATETIME(3) NULL,

    UNIQUE INDEX `WaitlistEntry_token_key`(`token`),
    INDEX `WaitlistEntry_businessId_leftAt_toDate_idx`(`businessId`, `leftAt`, `toDate`),
    INDEX `WaitlistEntry_userId_idx`(`userId`),
    INDEX `WaitlistEntry_serviceId_idx`(`serviceId`),
    INDEX `WaitlistEntry_staffId_idx`(`staffId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WaitlistEntry` ADD CONSTRAINT `WaitlistEntry_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `WaitlistEntry` ADD CONSTRAINT `WaitlistEntry_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `WaitlistEntry` ADD CONSTRAINT `WaitlistEntry_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `Staff`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `WaitlistEntry` ADD CONSTRAINT `WaitlistEntry_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable: when the owner last opened the wait list tab (the red dot)
ALTER TABLE `Business` ADD COLUMN `waitlistSeenAt` DATETIME(3) NULL;
