-- AlterTable
ALTER TABLE `Service` ADD COLUMN `videoUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Business`
    ADD COLUMN `youtubeUrl` VARCHAR(191) NULL,
    ADD COLUMN `googleMapsUrl` VARCHAR(191) NULL;
