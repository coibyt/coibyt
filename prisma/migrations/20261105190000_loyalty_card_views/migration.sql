-- A customer opening their own loyalty card page (scanning its QR), not the
-- salon's staff stamping it — so a campaign can show who looked at their card.
CREATE TABLE `LoyaltyCardView` (
    `id` VARCHAR(191) NOT NULL,
    `cardId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `LoyaltyCardView_cardId_createdAt_idx`(`cardId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `LoyaltyCardView` ADD CONSTRAINT `LoyaltyCardView_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `LoyaltyCard`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
