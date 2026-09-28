-- CreateTable
CREATE TABLE `LandingPage` (
    `id` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `heroLayout` VARCHAR(191) NOT NULL DEFAULT 'IMAGE_RIGHT',
    `heroTitle` VARCHAR(191) NULL,
    `heroText` TEXT NULL,
    `heroButtonLabel` VARCHAR(191) NULL,
    `heroButtonTarget` VARCHAR(191) NOT NULL DEFAULT 'BOOKING',
    `heroButtonUrl` VARCHAR(191) NULL,
    `introEnabled` BOOLEAN NOT NULL DEFAULT true,
    `introLayout` VARCHAR(191) NOT NULL DEFAULT 'IMAGE_LEFT',
    `introTitle` VARCHAR(191) NULL,
    `introText` TEXT NULL,
    `introButtonLabel` VARCHAR(191) NULL,
    `introButtonTarget` VARCHAR(191) NOT NULL DEFAULT 'BOOKING',
    `introButtonUrl` VARCHAR(191) NULL,
    `highlightsEnabled` BOOLEAN NOT NULL DEFAULT true,
    `highlightsTitle` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `LandingPage_businessId_key`(`businessId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LandingHighlight` (
    `id` VARCHAR(191) NOT NULL,
    `landingPageId` VARCHAR(191) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `buttonLabel` VARCHAR(191) NULL,
    `buttonTarget` VARCHAR(191) NOT NULL DEFAULT 'BOOKING',
    `buttonUrl` VARCHAR(191) NULL,

    INDEX `LandingHighlight_landingPageId_idx`(`landingPageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LandingImage` (
    `id` VARCHAR(191) NOT NULL,
    `landingPageId` VARCHAR(191) NOT NULL,
    `slot` VARCHAR(191) NOT NULL,
    `data` LONGBLOB NOT NULL,
    `mimeType` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `LandingImage_landingPageId_slot_key`(`landingPageId`, `slot`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LandingPage` ADD CONSTRAINT `LandingPage_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LandingHighlight` ADD CONSTRAINT `LandingHighlight_landingPageId_fkey` FOREIGN KEY (`landingPageId`) REFERENCES `LandingPage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LandingImage` ADD CONSTRAINT `LandingImage_landingPageId_fkey` FOREIGN KEY (`landingPageId`) REFERENCES `LandingPage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
