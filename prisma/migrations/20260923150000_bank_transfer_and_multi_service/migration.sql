-- AlterTable
ALTER TABLE `Business`
    ADD COLUMN `bankName` VARCHAR(191) NULL,
    ADD COLUMN `bankAccountNumber` VARCHAR(191) NULL,
    ADD COLUMN `bankAccountName` VARCHAR(191) NULL,
    ADD COLUMN `bankBic` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Payment` MODIFY COLUMN `provider` ENUM('STRIPE', 'VNPAY', 'MOMO', 'BANK_TRANSFER') NOT NULL;

-- CreateTable
CREATE TABLE `BusinessImage` (
    `id` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `kind` ENUM('LOGO', 'COVER') NOT NULL,
    `data` LONGBLOB NOT NULL,
    `mimeType` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BusinessImage_businessId_kind_key`(`businessId`, `kind`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookingExtraService` (
    `id` VARCHAR(191) NOT NULL,
    `bookingId` VARCHAR(191) NOT NULL,
    `serviceId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `priceCents` INTEGER NOT NULL,
    `durationMin` INTEGER NOT NULL,

    INDEX `BookingExtraService_bookingId_idx`(`bookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BusinessImage` ADD CONSTRAINT `BusinessImage_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingExtraService` ADD CONSTRAINT `BookingExtraService_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingExtraService` ADD CONSTRAINT `BookingExtraService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
