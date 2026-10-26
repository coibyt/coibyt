-- AlterTable
ALTER TABLE `LoyaltyCard` ADD COLUMN `referralCode` VARCHAR(16) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `LoyaltyCard_referralCode_key` ON `LoyaltyCard`(`referralCode`);

-- CreateTable
CREATE TABLE `LoyaltyReferral` (
    `id` VARCHAR(191) NOT NULL,
    `cardId` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `friendUserId` VARCHAR(191) NOT NULL,
    `friendName` VARCHAR(191) NOT NULL,
    `bookingId` VARCHAR(191) NULL,
    `status` VARCHAR(16) NOT NULL DEFAULT 'PENDING',
    `ticketsAwarded` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rewardedAt` DATETIME(3) NULL,

    UNIQUE INDEX `LoyaltyReferral_bookingId_key`(`bookingId`),
    INDEX `LoyaltyReferral_cardId_idx`(`cardId`),
    UNIQUE INDEX `LoyaltyReferral_businessId_friendUserId_key`(`businessId`, `friendUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LoyaltyReferral` ADD CONSTRAINT `LoyaltyReferral_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `LoyaltyCard`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
