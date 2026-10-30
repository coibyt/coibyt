-- The day from which staff must report the income of their bookings; earlier
-- bookings never show as unreported. NULL = the last 14 days.
ALTER TABLE `Business` ADD COLUMN `incomeReportsFrom` DATE NULL;
