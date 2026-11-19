-- Academy (owner, 2026-11-19): progress saved to the learner's account, course ratings,
-- and "email me new lessons". Additive only: three new tables.
-- CreateTable
CREATE TABLE `AcademyProgress` (
    `userId` VARCHAR(191) NOT NULL,
    `data` MEDIUMTEXT NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AcademyReview` (
    `id` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(40) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` TEXT NULL,
    `locale` VARCHAR(8) NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'HIDDEN') NOT NULL DEFAULT 'APPROVED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `AcademyReview_courseId_status_idx`(`courseId`, `status`),
    UNIQUE INDEX `AcademyReview_courseId_userId_key`(`courseId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AcademyFollow` (
    `id` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(40) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `locale` VARCHAR(8) NOT NULL,
    `notifiedThrough` VARCHAR(10) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AcademyFollow_courseId_idx`(`courseId`),
    UNIQUE INDEX `AcademyFollow_userId_courseId_key`(`userId`, `courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AcademyProgress` ADD CONSTRAINT `AcademyProgress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcademyReview` ADD CONSTRAINT `AcademyReview_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcademyFollow` ADD CONSTRAINT `AcademyFollow_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

