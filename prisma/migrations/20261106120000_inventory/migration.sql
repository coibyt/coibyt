-- Salon stock (src/lib/inventory.ts): an owner's catalog of supplies shared
-- by their branches, where each branch keeps them, how many, and every
-- scan in or out. Staff can scan when the owner allows (Staff.canUseInventory).
ALTER TABLE `Staff` ADD COLUMN `canUseInventory` BOOLEAN NOT NULL DEFAULT false;

CREATE TABLE `InventoryItem` (
    `id` VARCHAR(191) NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,
    `code` VARCHAR(16) NOT NULL,
    `name` VARCHAR(160) NOT NULL,
    `brand` VARCHAR(80) NULL,
    `category` VARCHAR(40) NULL,
    `unit` VARCHAR(20) NOT NULL DEFAULT 'pcs',
    `barcode` VARCHAR(64) NULL,
    `minQty` INTEGER NOT NULL DEFAULT 0,
    `photo` MEDIUMBLOB NULL,
    `photoMime` VARCHAR(40) NULL,
    `note` VARCHAR(500) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `InventoryItem_code_key`(`code`),
    UNIQUE INDEX `InventoryItem_ownerId_barcode_key`(`ownerId`, `barcode`),
    INDEX `InventoryItem_ownerId_active_idx`(`ownerId`, `active`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `InventoryLocation` (
    `id` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `code` VARCHAR(16) NOT NULL,
    `name` VARCHAR(80) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `InventoryLocation_code_key`(`code`),
    INDEX `InventoryLocation_businessId_idx`(`businessId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `InventoryStock` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `locationId` VARCHAR(191) NULL,
    `qty` INTEGER NOT NULL DEFAULT 0,
    `minQty` INTEGER NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `InventoryStock_itemId_businessId_key`(`itemId`, `businessId`),
    INDEX `InventoryStock_businessId_idx`(`businessId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `InventoryMove` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `delta` INTEGER NOT NULL,
    `kind` VARCHAR(8) NOT NULL,
    `qtyAfter` INTEGER NOT NULL,
    `byUserId` VARCHAR(191) NULL,
    `byName` VARCHAR(120) NULL,
    `note` VARCHAR(200) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `InventoryMove_businessId_createdAt_idx`(`businessId`, `createdAt`),
    INDEX `InventoryMove_itemId_createdAt_idx`(`itemId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `InventoryItem` ADD CONSTRAINT `InventoryItem_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `InventoryLocation` ADD CONSTRAINT `InventoryLocation_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `InventoryStock` ADD CONSTRAINT `InventoryStock_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `InventoryItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `InventoryStock` ADD CONSTRAINT `InventoryStock_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `InventoryStock` ADD CONSTRAINT `InventoryStock_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `InventoryLocation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `InventoryMove` ADD CONSTRAINT `InventoryMove_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `InventoryItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `InventoryMove` ADD CONSTRAINT `InventoryMove_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
