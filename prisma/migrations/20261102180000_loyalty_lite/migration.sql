-- CreateTable
CREATE TABLE `LiteSalon` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `salonName` VARCHAR(120) NOT NULL,
    `ownerName` VARCHAR(120) NULL,
    `locale` VARCHAR(8) NOT NULL DEFAULT 'vi',
    `accessToken` VARCHAR(64) NOT NULL,
    `stampsRequired` INTEGER NOT NULL DEFAULT 10,
    `rewardText` VARCHAR(80) NOT NULL,
    `emailVerifiedAt` DATETIME(3) NULL,
    `lastSeenAt` DATETIME(3) NULL,
    `upgradedBusinessId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `LiteSalon_email_key`(`email`),
    UNIQUE INDEX `LiteSalon_accessToken_key`(`accessToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LiteCard` (
    `id` VARCHAR(191) NOT NULL,
    `liteSalonId` VARCHAR(191) NOT NULL,
    `token` VARCHAR(16) NOT NULL,
    `customerName` VARCHAR(120) NOT NULL,
    `customerEmail` VARCHAR(191) NULL,
    `stamps` INTEGER NOT NULL DEFAULT 0,
    `totalStamps` INTEGER NOT NULL DEFAULT 0,
    `rewardsUsed` INTEGER NOT NULL DEFAULT 0,
    `lastStampAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `LiteCard_token_key`(`token`),
    INDEX `LiteCard_liteSalonId_idx`(`liteSalonId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LiteCardEvent` (
    `id` VARCHAR(191) NOT NULL,
    `cardId` VARCHAR(191) NOT NULL,
    `kind` VARCHAR(12) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `LiteCardEvent_cardId_idx`(`cardId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LiteCard` ADD CONSTRAINT `LiteCard_liteSalonId_fkey` FOREIGN KEY (`liteSalonId`) REFERENCES `LiteSalon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LiteCardEvent` ADD CONSTRAINT `LiteCardEvent_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `LiteCard`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
