-- AlterTable
ALTER TABLE `SupportMessage` ADD COLUMN `fromAi` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `SupportThread` ADD COLUMN `aiPaused` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `guestEmail` VARCHAR(191) NULL,
    ADD COLUMN `guestName` VARCHAR(191) NULL,
    ADD COLUMN `guestToken` VARCHAR(191) NULL,
    ADD COLUMN `locale` VARCHAR(191) NOT NULL DEFAULT 'vi',
    MODIFY `ownerId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `PlatformSetting` (
    `key` VARCHAR(191) NOT NULL,
    `value` TEXT NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `SupportThread_guestToken_key` ON `SupportThread`(`guestToken`);

