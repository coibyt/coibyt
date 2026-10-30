-- AlterTable: the same person's working hours kept identical at every branch.
ALTER TABLE `Staff` ADD COLUMN `syncBranchHours` BOOLEAN NOT NULL DEFAULT false;
