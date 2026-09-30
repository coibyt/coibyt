-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `platformAffiliateCommissionCents` INTEGER NULL,
    ADD COLUMN `platformAffiliateId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Business` ADD COLUMN `referredByAffiliateId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `PlatformAffiliate` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `commissionPercent` DOUBLE NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PlatformAffiliate_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Booking_platformAffiliateId_idx` ON `Booking`(`platformAffiliateId`);

-- CreateIndex
CREATE INDEX `Business_referredByAffiliateId_idx` ON `Business`(`referredByAffiliateId`);

-- AddForeignKey
ALTER TABLE `Business` ADD CONSTRAINT `Business_referredByAffiliateId_fkey` FOREIGN KEY (`referredByAffiliateId`) REFERENCES `PlatformAffiliate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_platformAffiliateId_fkey` FOREIGN KEY (`platformAffiliateId`) REFERENCES `PlatformAffiliate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
