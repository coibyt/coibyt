-- AlterTable
ALTER TABLE `Post` ADD COLUMN `pinned` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `tag` VARCHAR(20) NULL,
    ADD COLUMN `ctaType` VARCHAR(16) NULL,
    ADD COLUMN `publishAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- Existing posts went live when they were written.
UPDATE `Post` SET `publishAt` = `createdAt`;

-- CreateIndex
CREATE INDEX `Post_businessId_publishAt_idx` ON `Post`(`businessId`, `publishAt`);

-- AlterTable
ALTER TABLE `PostComment` ADD COLUMN `asBusiness` BOOLEAN NOT NULL DEFAULT false;
