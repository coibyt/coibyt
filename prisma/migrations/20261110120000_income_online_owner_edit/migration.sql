-- Staff income reports: money paid online in advance (Timma, Booksalon…),
-- and the owner's corrections (the staff member's own numbers are kept in
-- staffOriginal so both can be shown), with the owner's reason and documents.
ALTER TABLE `StaffIncomeReport`
  ADD COLUMN `onlineCents` INT NOT NULL DEFAULT 0,
  ADD COLUMN `onlineSource` VARCHAR(40) NULL,
  ADD COLUMN `staffOriginal` JSON NULL,
  ADD COLUMN `ownerEditNote` VARCHAR(1000) NULL,
  ADD COLUMN `ownerEditedAt` DATETIME(3) NULL,
  ADD COLUMN `ownerEditedById` VARCHAR(191) NULL;

ALTER TABLE `StaffIncomePhoto`
  ADD COLUMN `byOwner` BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN `fileName` VARCHAR(160) NULL;
