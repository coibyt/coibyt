-- Other emails of a loyalty cardholder, so bookings made with them earn tickets
-- too (src/lib/loyalty.ts → linkCardEmail). Additive only.

-- CreateTable
CREATE TABLE `LoyaltyCardEmail` (
    `id` VARCHAR(191) NOT NULL,
    `cardId` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `LoyaltyCardEmail_businessId_email_key`(`businessId`, `email`),
    INDEX `LoyaltyCardEmail_cardId_idx`(`cardId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LoyaltyCardEmail` ADD CONSTRAINT `LoyaltyCardEmail_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `LoyaltyCard`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
