-- Marketing campaigns: who they're sent as (the branch or the owner's whole
-- brand), and the brand's name. Drafts reuse EmailCampaign with status DRAFT.
ALTER TABLE `EmailCampaign` ADD COLUMN `senderMode` VARCHAR(8) NOT NULL DEFAULT 'BRANCH';
ALTER TABLE `User` ADD COLUMN `brandName` VARCHAR(120) NULL;
