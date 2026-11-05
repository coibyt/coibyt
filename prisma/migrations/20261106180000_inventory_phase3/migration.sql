-- Stock, phase 3: an item can be the stock of a product sold in the salon's
-- shop (a completed order takes it out, cancelling puts it back), and a
-- Telegram group can get the low-stock alerts.
ALTER TABLE `InventoryItem` ADD COLUMN `productId` VARCHAR(191) NULL;
CREATE UNIQUE INDEX `InventoryItem_productId_key` ON `InventoryItem`(`productId`);
ALTER TABLE `Order` ADD COLUMN `stockTakenAt` DATETIME(3) NULL;
ALTER TABLE `TelegramGroup` ADD COLUMN `notifyStock` BOOLEAN NOT NULL DEFAULT false;
