-- A campaign sent to one group of an earlier campaign's recipients (opened,
-- clicked, didn't open) instead of a segment.
ALTER TABLE `EmailCampaign` ADD COLUMN `audienceCampaignId` VARCHAR(191) NULL;
ALTER TABLE `EmailCampaign` ADD COLUMN `audienceGroup` VARCHAR(12) NULL;
