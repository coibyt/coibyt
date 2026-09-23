-- AlterTable
ALTER TABLE `Business`
    ADD COLUMN `facebookUrl` VARCHAR(191) NULL,
    ADD COLUMN `instagramUrl` VARCHAR(191) NULL,
    ADD COLUMN `tiktokUrl` VARCHAR(191) NULL,
    ADD COLUMN `whatsapp` VARCHAR(191) NULL,
    ADD COLUMN `defaultLocale` VARCHAR(191) NOT NULL DEFAULT 'vi',
    ADD COLUMN `defaultCurrency` VARCHAR(191) NOT NULL DEFAULT 'VND',
    ADD COLUMN `cancellationWindowHours` INTEGER NOT NULL DEFAULT 24;
