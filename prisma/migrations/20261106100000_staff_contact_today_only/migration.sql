-- With customer contact info allowed, the owner can limit it to the days
-- the staff member has a booking with that customer.
ALTER TABLE `Staff` ADD COLUMN `contactTodayOnly` BOOLEAN NOT NULL DEFAULT false;
