-- AlterTable
ALTER TABLE `Service` ADD COLUMN `sortOrder` INTEGER NOT NULL DEFAULT 0;


-- Keep the order customers already see (oldest first) as the starting order.
UPDATE `Service` s
JOIN (SELECT `id`, ROW_NUMBER() OVER (PARTITION BY `businessId` ORDER BY `createdAt` ASC) AS rn FROM `Service`) x ON x.`id` = s.`id`
SET s.`sortOrder` = x.rn;
