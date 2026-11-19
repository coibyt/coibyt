-- Academy learning statistics (owner, 2026-11-19): who studies, how often they come back, how long they watch.
-- Additive only: two new tables.
CREATE TABLE `AcademyVisitor` (
    `id` VARCHAR(40) NOT NULL,
    `ipMasked` VARCHAR(64) NOT NULL,
    `device` VARCHAR(16) NOT NULL,
    `locale` VARCHAR(8) NULL,
    `tab` VARCHAR(16) NULL,
    `source` VARCHAR(120) NULL,
    `userId` VARCHAR(191) NULL,
    `visitDays` INTEGER NOT NULL DEFAULT 1,
    `lastDay` VARCHAR(10) NOT NULL,
    `seconds` INTEGER NOT NULL DEFAULT 0,
    `firstSeen` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastSeen` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AcademyVisitor_lastSeen_idx`(`lastSeen`),
    INDEX `AcademyVisitor_firstSeen_idx`(`firstSeen`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `AcademyLessonView` (
    `id` VARCHAR(191) NOT NULL,
    `visitorId` VARCHAR(40) NOT NULL,
    `slug` VARCHAR(80) NOT NULL,
    `opens` INTEGER NOT NULL DEFAULT 1,
    `seconds` INTEGER NOT NULL DEFAULT 0,
    `maxPos` INTEGER NOT NULL DEFAULT 0,
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `quizRight` INTEGER NULL,
    `quizOf` INTEGER NULL,
    `firstAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `AcademyLessonView_visitorId_slug_key`(`visitorId`, `slug`),
    INDEX `AcademyLessonView_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `AcademyLessonView` ADD CONSTRAINT `AcademyLessonView_visitorId_fkey` FOREIGN KEY (`visitorId`) REFERENCES `AcademyVisitor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
