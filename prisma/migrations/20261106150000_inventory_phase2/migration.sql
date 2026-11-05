-- Stock, phase 2: what an item costs to buy (for stock value and spending),
-- the nearest expiry date of what a branch holds, and when the owner was
-- last told an item was running low there (so the email goes once).
ALTER TABLE `InventoryItem` ADD COLUMN `costCents` INTEGER NULL;
ALTER TABLE `InventoryStock` ADD COLUMN `expiresAt` DATE NULL;
ALTER TABLE `InventoryStock` ADD COLUMN `lowAlertAt` DATETIME(3) NULL;
