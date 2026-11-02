-- AlterTable
ALTER TABLE `Business` ADD COLUMN `telegramRemindersOn` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `telegramLinkCode` VARCHAR(24) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Business_telegramLinkCode_key` ON `Business`(`telegramLinkCode`);

-- AlterTable
ALTER TABLE `Staff` ADD COLUMN `telegramUsername` VARCHAR(64) NULL;

-- CreateTable
CREATE TABLE `TelegramGroup` (
    `id` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `chatId` VARCHAR(32) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `lastRemindedOn` VARCHAR(10) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `TelegramGroup_chatId_idx`(`chatId`),
    UNIQUE INDEX `TelegramGroup_businessId_chatId_key`(`businessId`, `chatId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TelegramGroup` ADD CONSTRAINT `TelegramGroup_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
