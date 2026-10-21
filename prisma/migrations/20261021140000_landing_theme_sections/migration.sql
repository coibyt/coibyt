-- AlterTable
ALTER TABLE `LandingPage` ADD COLUMN `galleryEnabled` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `galleryTitle` VARCHAR(191) NULL,
    ADD COLUMN `heroEyebrow` VARCHAR(191) NULL,
    ADD COLUMN `reviewsEnabled` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `servicesEnabled` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `servicesTitle` VARCHAR(191) NULL,
    ADD COLUMN `teamEnabled` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `theme` VARCHAR(191) NOT NULL DEFAULT 'ROSE';

