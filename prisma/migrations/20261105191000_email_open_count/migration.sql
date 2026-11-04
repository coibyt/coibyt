-- How many times a recipient opened a campaign (each open more than 5
-- minutes after the last), for the "opened 3+ times" group.
ALTER TABLE `EmailCampaignEvent` ADD COLUMN `count` INTEGER NOT NULL DEFAULT 1;
ALTER TABLE `EmailCampaignEvent` ADD COLUMN `lastAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
