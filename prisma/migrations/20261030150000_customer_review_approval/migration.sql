-- AlterTable: a staff member's rating of a customer waits for the owner's
-- approval before the customer is emailed. Existing ratings stay approved.
ALTER TABLE `CustomerReview` ADD COLUMN `status` VARCHAR(10) NOT NULL DEFAULT 'APPROVED',
    ADD COLUMN `staffId` VARCHAR(191) NULL,
    ADD COLUMN `approvedAt` DATETIME(3) NULL;

-- CreateIndex
CREATE INDEX `CustomerReview_businessId_status_idx` ON `CustomerReview`(`businessId`, `status`);
