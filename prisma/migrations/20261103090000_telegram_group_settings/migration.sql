-- AlterTable
ALTER TABLE `TelegramGroup` ADD COLUMN `notifyIncome` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `notifyBookings` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `allBranches` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `staffIds` JSON NULL;
