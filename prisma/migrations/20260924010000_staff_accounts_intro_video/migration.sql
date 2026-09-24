-- AlterTable: allow a STAFF role
ALTER TABLE `User` MODIFY COLUMN `role` ENUM('CUSTOMER', 'BUSINESS_OWNER', 'STAFF', 'ADMIN') NOT NULL DEFAULT 'CUSTOMER';

-- AlterTable: business intro video
ALTER TABLE `Business` ADD COLUMN `introVideoUrl` VARCHAR(191) NULL;

-- AlterTable: staff login + view permissions
ALTER TABLE `Staff`
    ADD COLUMN `userId` VARCHAR(191) NULL,
    ADD COLUMN `canViewServices` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `canViewBookings` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `canViewCustomers` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `canViewHours` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `canViewReviews` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `Staff_userId_key` ON `Staff`(`userId`);

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
