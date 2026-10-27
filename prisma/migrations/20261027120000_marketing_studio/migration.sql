-- AlterTable
ALTER TABLE `EmailCampaign`
    ADD COLUMN `preheader` VARCHAR(200) NULL,
    ADD COLUMN `headline` VARCHAR(160) NULL,
    ADD COLUMN `message` TEXT NULL,
    ADD COLUMN `imageId` VARCHAR(191) NULL,
    ADD COLUMN `ctaKind` VARCHAR(8) NOT NULL DEFAULT 'BOOK',
    ADD COLUMN `ctaLabel` VARCHAR(60) NULL,
    ADD COLUMN `ctaUrl` VARCHAR(500) NULL,
    ADD COLUMN `offerTitle` VARCHAR(80) NULL,
    ADD COLUMN `offerCode` VARCHAR(40) NULL,
    ADD COLUMN `offerExpires` DATETIME(3) NULL,
    ADD COLUMN `segment` VARCHAR(16) NOT NULL DEFAULT 'ALL',
    ADD COLUMN `includeCooldown` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `status` VARCHAR(12) NOT NULL DEFAULT 'SENT',
    ADD COLUMN `scheduledAt` DATETIME(3) NULL,
    ADD COLUMN `sentAt` DATETIME(3) NULL,
    ADD COLUMN `openCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `clickCount` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `EmailCampaign_status_scheduledAt_idx` ON `EmailCampaign`(`status`, `scheduledAt`);

-- CreateTable
CREATE TABLE `EmailCampaignEvent` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `kind` VARCHAR(8) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `EmailCampaignEvent_campaignId_customerId_kind_key`(`campaignId`, `customerId`, `kind`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MarketingImage` (
    `id` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `data` MEDIUMBLOB NOT NULL,
    `mimeType` VARCHAR(40) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `MarketingImage_businessId_idx`(`businessId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmailCampaignEvent` ADD CONSTRAINT `EmailCampaignEvent_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `EmailCampaign`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MarketingImage` ADD CONSTRAINT `MarketingImage_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
