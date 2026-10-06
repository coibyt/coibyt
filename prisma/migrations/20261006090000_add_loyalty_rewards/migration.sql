-- CreateTable
CREATE TABLE `LoyaltyReward` (
    `id` VARCHAR(191) NOT NULL,
    `cardId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `LoyaltyReward_cardId_idx`(`cardId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LoyaltyReward` ADD CONSTRAINT `LoyaltyReward_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `LoyaltyCard`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

