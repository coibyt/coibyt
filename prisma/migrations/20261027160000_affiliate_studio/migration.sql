-- AlterTable
ALTER TABLE `Affiliate`
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(40) NULL,
    ADD COLUMN `note` VARCHAR(500) NULL,
    ADD COLUMN `clickCount` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `AffiliatePayout` (
    `id` VARCHAR(191) NOT NULL,
    `affiliateId` VARCHAR(191) NOT NULL,
    `amountCents` INTEGER NOT NULL,
    `note` VARCHAR(200) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AffiliatePayout_affiliateId_idx`(`affiliateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AffiliatePayout` ADD CONSTRAINT `AffiliatePayout_affiliateId_fkey` FOREIGN KEY (`affiliateId`) REFERENCES `Affiliate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
