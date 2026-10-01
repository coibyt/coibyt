-- AlterTable
ALTER TABLE `Business` ADD COLUMN `referralBonusAwarded` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `referredByOwnerId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `referralCode` VARCHAR(191) NULL,
    ADD COLUMN `varaLastCheckinDate` VARCHAR(191) NULL,
    ADD COLUMN `varaPoints` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `VaraPointTransaction` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `reason` ENUM('SIGNUP_BONUS', 'DAILY_CHECKIN', 'REFERRAL_CLICK', 'REFERRAL_SIGNUP_BONUS', 'EMAIL_SENT') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `VaraPointTransaction_userId_createdAt_idx`(`userId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReferralClick` (
    `id` VARCHAR(191) NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,
    `ipHash` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ReferralClick_ownerId_idx`(`ownerId`),
    UNIQUE INDEX `ReferralClick_ownerId_ipHash_key`(`ownerId`, `ipHash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Business_referredByOwnerId_idx` ON `Business`(`referredByOwnerId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_referralCode_key` ON `User`(`referralCode`);

-- AddForeignKey
ALTER TABLE `Business` ADD CONSTRAINT `Business_referredByOwnerId_fkey` FOREIGN KEY (`referredByOwnerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VaraPointTransaction` ADD CONSTRAINT `VaraPointTransaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReferralClick` ADD CONSTRAINT `ReferralClick_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
