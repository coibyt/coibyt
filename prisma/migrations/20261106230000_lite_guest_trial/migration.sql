-- Loyalty Lite without an email first: a salon can try it straight away
-- (email NULL until it saves itself), starts with a sample card, and must
-- add an email to give more than a few real cards. Unsaved trials are
-- removed after 14 days. Nothing existing changes.
ALTER TABLE `LiteSalon` MODIFY `email` VARCHAR(191) NULL;
ALTER TABLE `LiteSalon` ADD COLUMN `trialStartedAt` DATETIME(3) NULL;
ALTER TABLE `LiteSalon` ADD COLUMN `savedAt` DATETIME(3) NULL;
ALTER TABLE `LiteCard` ADD COLUMN `sample` BOOLEAN NOT NULL DEFAULT false;
