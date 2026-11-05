-- Which (anonymous) browser an event came from, to count unique visitors
-- of a page like /loyalty-lite, not just page views.
ALTER TABLE `ToolEvent` ADD COLUMN `visitorId` VARCHAR(64) NULL;
CREATE INDEX `ToolEvent_tool_createdAt_visitorId_idx` ON `ToolEvent`(`tool`, `createdAt`, `visitorId`);
