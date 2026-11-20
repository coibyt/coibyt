-- Repeat bookings and "book again" reminders (src/lib/recurring.ts).

-- CreateTable
CREATE TABLE `RecurringRule` (
    `id` VARCHAR(191) NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `rootBookingId` VARCHAR(191) NOT NULL,
    `everyWeeks` INTEGER NOT NULL,
    `count` INTEGER NULL,
    `untilDate` DATE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `RecurringRule_rootBookingId_key`(`rootBookingId`),
    INDEX `RecurringRule_businessId_idx`(`businessId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RecurringRule` ADD CONSTRAINT `RecurringRule_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `RecurringRule` ADD CONSTRAINT `RecurringRule_rootBookingId_fkey` FOREIGN KEY (`rootBookingId`) REFERENCES `Booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `Booking`
  ADD COLUMN `recurringRuleId` VARCHAR(191) NULL,
  ADD COLUMN `rebookReminderAt` DATETIME(3) NULL,
  ADD COLUMN `rebookReminderSentAt` DATETIME(3) NULL;

-- CreateIndex
CREATE INDEX `Booking_recurringRuleId_idx` ON `Booking`(`recurringRuleId`);
CREATE INDEX `Booking_rebookReminderAt_idx` ON `Booking`(`rebookReminderAt`);

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_recurringRuleId_fkey` FOREIGN KEY (`recurringRuleId`) REFERENCES `RecurringRule`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
