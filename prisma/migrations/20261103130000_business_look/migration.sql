-- AlterTable
ALTER TABLE `Business` ADD COLUMN `calendarBookingBg` VARCHAR(9) NULL,
    ADD COLUMN `calendarBookingText` VARCHAR(9) NULL,
    ADD COLUMN `seasonalTheme` VARCHAR(24) NULL,
    ADD COLUMN `themeOnBookingPage` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `themeOnCalendar` BOOLEAN NOT NULL DEFAULT true;
