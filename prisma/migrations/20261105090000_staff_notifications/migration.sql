-- Owner's switches: email staff about their bookings, and ring staff
-- devices for today's new bookings. Both off by default.
ALTER TABLE `Business` ADD COLUMN `staffBookingEmails` BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE `Business` ADD COLUMN `staffAlarmOn` BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE `Business` ADD COLUMN `staffAlarmChangedAt` DATETIME(3) NULL;
