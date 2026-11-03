-- Admin can add or take Vara points by hand, with a note shown to the owner.
ALTER TABLE `VaraPointTransaction` MODIFY `reason` ENUM('SIGNUP_BONUS', 'DAILY_CHECKIN', 'REFERRAL_CLICK', 'REFERRAL_SIGNUP_BONUS', 'EMAIL_SENT', 'EMAIL_SENT_COOLDOWN_BYPASS', 'ADMIN_ADJUST') NOT NULL;
ALTER TABLE `VaraPointTransaction` ADD COLUMN `note` VARCHAR(200) NULL;

-- Admin's cap on marketing emails per salon per day; big campaigns go out
-- in daily batches.
ALTER TABLE `Business` ADD COLUMN `emailDailyLimit` INTEGER NULL;
ALTER TABLE `EmailCampaign` ADD COLUMN `sentCount` INTEGER NOT NULL DEFAULT 0;

CREATE TABLE `EmailCampaignDelivery` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `recipientKey` VARCHAR(80) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `EmailCampaignDelivery_campaignId_recipientKey_key`(`campaignId`, `recipientKey`),
    INDEX `EmailCampaignDelivery_businessId_createdAt_idx`(`businessId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `EmailCampaignDelivery` ADD CONSTRAINT `EmailCampaignDelivery_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `EmailCampaign`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
