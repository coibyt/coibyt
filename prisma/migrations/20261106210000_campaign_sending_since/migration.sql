-- When a campaign was last seen sending (set when claimed, refreshed after
-- every batch), so one left in SENDING by a server restart goes back to
-- the queue instead of staying stuck.
ALTER TABLE `EmailCampaign` ADD COLUMN `sendingSince` DATETIME(3) NULL;
