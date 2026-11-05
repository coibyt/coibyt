-- Different products can share one barcode (e.g. one gel line in many
-- colours): the barcode is no longer unique per owner, and an item gets a
-- colour/shade so they can be told apart (by name, colour or a photo).
-- Only the uniqueness rule goes; no data changes.
CREATE INDEX `InventoryItem_ownerId_barcode_idx` ON `InventoryItem`(`ownerId`, `barcode`);
DROP INDEX `InventoryItem_ownerId_barcode_key` ON `InventoryItem`;
ALTER TABLE `InventoryItem` ADD COLUMN `color` VARCHAR(60) NULL;
