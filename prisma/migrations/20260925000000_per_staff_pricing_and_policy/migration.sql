-- AlterTable: business-wide cancellation policy text
ALTER TABLE `Business` ADD COLUMN `cancellationPolicy` TEXT NULL;

-- AlterTable: per-staff lead time, message, portfolio videos
ALTER TABLE `Staff`
    ADD COLUMN `leadTimeMinutes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staffMessage` TEXT NULL,
    ADD COLUMN `videoUrls` JSON NULL;

-- AlterTable: per-staff price/duration override for a service
ALTER TABLE `StaffService`
    ADD COLUMN `priceCentsOverride` INTEGER NULL,
    ADD COLUMN `durationMinOverride` INTEGER NULL;
