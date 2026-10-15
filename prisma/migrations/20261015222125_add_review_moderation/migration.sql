-- AlterTable
ALTER TABLE `Business` ADD COLUMN `googlePlaceId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Review` ADD COLUMN `status` ENUM('PENDING', 'APPROVED', 'HIDDEN') NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE INDEX `Review_businessId_status_idx` ON `Review`(`businessId`, `status`);

-- Backfill: reviews written before this moderation gate existed were
-- already live on the public profile page — keep them visible instead of
-- suddenly hiding everything behind the new PENDING default.
UPDATE `Review` SET `status` = 'APPROVED' WHERE `status` = 'PENDING';
