-- AlterTable
ALTER TABLE `LiteSalon` ADD COLUMN `passwordHash` VARCHAR(100) NULL;

-- CreateTable
CREATE TABLE `LiteStaff` (
    `id` VARCHAR(191) NOT NULL,
    `liteSalonId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(100) NOT NULL,
    `accessToken` VARCHAR(64) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `lastSeenAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `LiteStaff_email_key`(`email`),
    UNIQUE INDEX `LiteStaff_accessToken_key`(`accessToken`),
    INDEX `LiteStaff_liteSalonId_idx`(`liteSalonId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LiteStaff` ADD CONSTRAINT `LiteStaff_liteSalonId_fkey` FOREIGN KEY (`liteSalonId`) REFERENCES `LiteSalon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
