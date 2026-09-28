-- An owner can now have several branches. The foreign key on ownerId needs an
-- index at all times, so the plain index is created before the unique one is dropped.

-- CreateIndex
CREATE INDEX `Business_ownerId_idx` ON `Business`(`ownerId`);

-- DropIndex
DROP INDEX `Business_ownerId_key` ON `Business`;
