-- AlterTable
ALTER TABLE `VaraPointTransaction` MODIFY `reason` ENUM('SIGNUP_BONUS', 'DAILY_CHECKIN', 'REFERRAL_CLICK', 'REFERRAL_SIGNUP_BONUS', 'EMAIL_SENT', 'EMAIL_SENT_COOLDOWN_BYPASS') NOT NULL;

-- CreateTable
CREATE TABLE `EmailRecipientCooldown` (
    `id` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `lastSentAt` DATETIME(3) NOT NULL,

    INDEX `EmailRecipientCooldown_customerId_idx`(`customerId`),
    UNIQUE INDEX `EmailRecipientCooldown_businessId_customerId_key`(`businessId`, `customerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmailRecipientCooldown` ADD CONSTRAINT `EmailRecipientCooldown_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmailRecipientCooldown` ADD CONSTRAINT `EmailRecipientCooldown_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

