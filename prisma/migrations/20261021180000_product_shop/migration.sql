-- AlterTable
ALTER TABLE `Product` ADD COLUMN `brand` VARCHAR(80) NULL,
    ADD COLUMN `compareAtCents` INTEGER NULL,
    ADD COLUMN `sortOrder` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `featured` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `soldOut` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `hidden` BOOLEAN NOT NULL DEFAULT false;

-- Keep the order customers already see (newest first) as the starting order.
UPDATE `Product` p
JOIN (SELECT `id`, ROW_NUMBER() OVER (PARTITION BY `businessId` ORDER BY `createdAt` DESC) AS rn FROM `Product`) x ON x.`id` = p.`id`
SET p.`sortOrder` = x.rn;
