-- CreateTable
CREATE TABLE `TeamMedia` (
    `id` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `uploaderId` VARCHAR(191) NOT NULL,
    `kind` VARCHAR(10) NOT NULL,
    `mimeType` VARCHAR(120) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `size` INTEGER NOT NULL,
    `chunkSize` INTEGER NOT NULL,
    `width` INTEGER NULL,
    `height` INTEGER NULL,
    `posterData` MEDIUMBLOB NULL,
    `complete` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `TeamMedia_businessId_idx`(`businessId`),
    INDEX `TeamMedia_uploaderId_complete_idx`(`uploaderId`, `complete`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamMediaChunk` (
    `mediaId` VARCHAR(191) NOT NULL,
    `idx` INTEGER NOT NULL,
    `data` MEDIUMBLOB NOT NULL,

    PRIMARY KEY (`mediaId`, `idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamChat` (
    `id` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `kind` VARCHAR(10) NOT NULL,
    `name` VARCHAR(80) NULL,
    `color` VARCHAR(20) NULL,
    `directKey` VARCHAR(120) NULL,
    `createdById` VARCHAR(191) NULL,
    `lastMessageAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `TeamChat_businessId_lastMessageAt_idx`(`businessId`, `lastMessageAt`),
    UNIQUE INDEX `TeamChat_businessId_directKey_key`(`businessId`, `directKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamChatMember` (
    `id` VARCHAR(191) NOT NULL,
    `chatId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `admin` BOOLEAN NOT NULL DEFAULT false,
    `muted` BOOLEAN NOT NULL DEFAULT false,
    `lastReadAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `TeamChatMember_userId_idx`(`userId`),
    UNIQUE INDEX `TeamChatMember_chatId_userId_key`(`chatId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamMessage` (
    `id` VARCHAR(191) NOT NULL,
    `chatId` VARCHAR(191) NOT NULL,
    `senderId` VARCHAR(191) NOT NULL,
    `body` TEXT NULL,
    `mediaId` VARCHAR(191) NULL,
    `replyToId` VARCHAR(191) NULL,
    `system` BOOLEAN NOT NULL DEFAULT false,
    `editedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `TeamMessage_chatId_createdAt_idx`(`chatId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamMessageReaction` (
    `id` VARCHAR(191) NOT NULL,
    `messageId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `emoji` VARCHAR(16) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `TeamMessageReaction_messageId_userId_emoji_key`(`messageId`, `userId`, `emoji`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StaffAnnouncement` (
    `id` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(160) NOT NULL,
    `body` TEXT NOT NULL,
    `priority` VARCHAR(10) NOT NULL DEFAULT 'NORMAL',
    `pinned` BOOLEAN NOT NULL DEFAULT false,
    `requireAck` BOOLEAN NOT NULL DEFAULT false,
    `attachments` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `StaffAnnouncement_businessId_createdAt_idx`(`businessId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StaffAnnouncementRead` (
    `id` VARCHAR(191) NOT NULL,
    `announcementId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `readAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ackAt` DATETIME(3) NULL,

    INDEX `StaffAnnouncementRead_userId_idx`(`userId`),
    UNIQUE INDEX `StaffAnnouncementRead_announcementId_userId_key`(`announcementId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StaffTraining` (
    `id` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(160) NOT NULL,
    `summary` VARCHAR(400) NULL,
    `body` TEXT NULL,
    `category` VARCHAR(20) NOT NULL,
    `videoUrl` VARCHAR(500) NULL,
    `coverMediaId` VARCHAR(191) NULL,
    `attachments` JSON NULL,
    `required` BOOLEAN NOT NULL DEFAULT false,
    `minutes` INTEGER NULL,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `StaffTraining_businessId_sortOrder_idx`(`businessId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StaffTrainingProgress` (
    `id` VARCHAR(191) NOT NULL,
    `trainingId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `viewedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `completedAt` DATETIME(3) NULL,

    INDEX `StaffTrainingProgress_userId_idx`(`userId`),
    UNIQUE INDEX `StaffTrainingProgress_trainingId_userId_key`(`trainingId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TeamMediaChunk` ADD CONSTRAINT `TeamMediaChunk_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `TeamMedia`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamChat` ADD CONSTRAINT `TeamChat_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamChatMember` ADD CONSTRAINT `TeamChatMember_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `TeamChat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamChatMember` ADD CONSTRAINT `TeamChatMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMessage` ADD CONSTRAINT `TeamMessage_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `TeamChat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMessage` ADD CONSTRAINT `TeamMessage_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMessageReaction` ADD CONSTRAINT `TeamMessageReaction_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `TeamMessage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffAnnouncement` ADD CONSTRAINT `StaffAnnouncement_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffAnnouncementRead` ADD CONSTRAINT `StaffAnnouncementRead_announcementId_fkey` FOREIGN KEY (`announcementId`) REFERENCES `StaffAnnouncement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffTraining` ADD CONSTRAINT `StaffTraining_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffTrainingProgress` ADD CONSTRAINT `StaffTrainingProgress_trainingId_fkey` FOREIGN KEY (`trainingId`) REFERENCES `StaffTraining`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

