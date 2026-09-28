-- CreateTable
CREATE TABLE `ServiceGroup` (
    `id` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ServiceGroup_businessId_idx`(`businessId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AlterTable
ALTER TABLE `Service` ADD COLUMN `groupId` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Service_groupId_idx` ON `Service`(`groupId`);

-- AddForeignKey
ALTER TABLE `ServiceGroup` ADD CONSTRAINT `ServiceGroup_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `ServiceGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
