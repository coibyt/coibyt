-- AlterTable
ALTER TABLE `Business` ADD COLUMN `invoiceCompanyAddress` TEXT NULL,
    ADD COLUMN `invoiceCompanyName` VARCHAR(191) NULL,
    ADD COLUMN `invoiceTaxId` VARCHAR(191) NULL,
    ADD COLUMN `invoiceVatPercent` DOUBLE NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Invoice` (
    `id` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `bookingId` VARCHAR(191) NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `lines` JSON NOT NULL,
    `subtotalCents` INTEGER NOT NULL,
    `vatPercent` DOUBLE NOT NULL,
    `vatCents` INTEGER NOT NULL,
    `totalCents` INTEGER NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `paymentMethod` ENUM('CASH', 'BANK_TRANSFER', 'GIFT_CARD') NOT NULL,
    `giftCardCode` VARCHAR(191) NULL,
    `note` TEXT NULL,
    `companyName` VARCHAR(191) NULL,
    `companyAddress` TEXT NULL,
    `companyTaxId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Invoice_token_key`(`token`),
    INDEX `Invoice_businessId_createdAt_idx`(`businessId`, `createdAt`),
    INDEX `Invoice_bookingId_idx`(`bookingId`),
    INDEX `Invoice_customerId_idx`(`customerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
