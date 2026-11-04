-- Admin can let a salon's marketing emails carry the salon's own address:
-- the owner verifies it by a link, then customers' replies go there.
ALTER TABLE `Business` ADD COLUMN `ownEmailAllowed` BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE `Business` ADD COLUMN `marketingEmail` VARCHAR(191) NULL;
ALTER TABLE `Business` ADD COLUMN `marketingEmailToken` VARCHAR(64) NULL;
ALTER TABLE `Business` ADD COLUMN `marketingEmailVerifiedAt` DATETIME(3) NULL;
