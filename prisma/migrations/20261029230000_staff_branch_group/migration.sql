-- AlterTable
ALTER TABLE `Staff` ADD COLUMN `branchGroup` VARCHAR(32) NULL;

-- CreateIndex
CREATE INDEX `Staff_branchGroup_idx` ON `Staff`(`branchGroup`);
