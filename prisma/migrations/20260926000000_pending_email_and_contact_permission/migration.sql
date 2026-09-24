-- AlterTable: email changes now stage in pendingEmail until confirmed
ALTER TABLE `User` ADD COLUMN `pendingEmail` VARCHAR(191) NULL;

-- AlterTable: staff permission to see customer phone/email on bookings
ALTER TABLE `Staff` ADD COLUMN `canViewCustomerContactInfo` BOOLEAN NOT NULL DEFAULT false;
