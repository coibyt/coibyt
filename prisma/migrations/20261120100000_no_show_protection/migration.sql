-- No-show protection without prepayment: booking confirmation 24h before,
-- "needs the salon's approval" status, on-time VaraPoints, and the salon's
-- own rules (Settings → Booking & policies).

-- AlterTable: new booking status for customers the salon must approve first
ALTER TABLE `Booking` MODIFY `status` ENUM('PENDING_PAYMENT', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW', 'PENDING_APPROVAL') NOT NULL DEFAULT 'PENDING_PAYMENT';

-- AlterTable: points for turning up on time
ALTER TABLE `VaraPointTransaction` MODIFY `reason` ENUM('SIGNUP_BONUS', 'DAILY_CHECKIN', 'REFERRAL_CLICK', 'REFERRAL_SIGNUP_BONUS', 'EMAIL_SENT', 'EMAIL_SENT_COOLDOWN_BYPASS', 'ADMIN_ADJUST', 'ON_TIME_VISIT') NOT NULL;

-- AlterTable
ALTER TABLE `Booking`
  ADD COLUMN `confirmedAt` DATETIME(3) NULL,
  ADD COLUMN `confirmToken` VARCHAR(64) NULL,
  ADD COLUMN `confirmRequestedAt` DATETIME(3) NULL,
  ADD COLUMN `noShowAt` DATETIME(3) NULL,
  ADD COLUMN `cancelledAt` DATETIME(3) NULL,
  ADD COLUMN `onTimePointsAt` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Booking_confirmToken_key` ON `Booking`(`confirmToken`);

-- AlterTable
ALTER TABLE `Business`
  ADD COLUMN `noShowApprovalOn` BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN `noShowApprovalCount` INTEGER NOT NULL DEFAULT 2,
  ADD COLUMN `autoCancelUnconfirmedHours` INTEGER NULL,
  ADD COLUMN `onTimePoints` INTEGER NOT NULL DEFAULT 0;
