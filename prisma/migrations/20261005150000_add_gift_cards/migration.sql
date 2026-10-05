-- CreateTable
CREATE TABLE `GiftCard` (
    `id` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `serviceId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `discountPercent` INTEGER NOT NULL,
    `validDays` INTEGER NOT NULL,
    `maxUses` INTEGER NOT NULL,
    `salePriceCents` INTEGER NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `GiftCard_businessId_idx`(`businessId`),
    INDEX `GiftCard_serviceId_idx`(`serviceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GiftCardPurchase` (
    `id` VARCHAR(191) NOT NULL,
    `giftCardId` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `buyerName` VARCHAR(191) NOT NULL,
    `buyerEmail` VARCHAR(191) NOT NULL,
    `buyerPhone` VARCHAR(191) NULL,
    `code` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING_PAYMENT', 'ACTIVE', 'CANCELLED') NOT NULL DEFAULT 'PENDING_PAYMENT',
    `activatedAt` DATETIME(3) NULL,
    `expiresAt` DATETIME(3) NULL,
    `usesLeft` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `GiftCardPurchase_code_key`(`code`),
    INDEX `GiftCardPurchase_businessId_status_idx`(`businessId`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GiftCardRedemption` (
    `id` VARCHAR(191) NOT NULL,
    `purchaseId` VARCHAR(191) NOT NULL,
    `bookingId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `GiftCardRedemption_purchaseId_idx`(`purchaseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GiftCard` ADD CONSTRAINT `GiftCard_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GiftCard` ADD CONSTRAINT `GiftCard_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GiftCardPurchase` ADD CONSTRAINT `GiftCardPurchase_giftCardId_fkey` FOREIGN KEY (`giftCardId`) REFERENCES `GiftCard`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GiftCardRedemption` ADD CONSTRAINT `GiftCardRedemption_purchaseId_fkey` FOREIGN KEY (`purchaseId`) REFERENCES `GiftCardPurchase`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

