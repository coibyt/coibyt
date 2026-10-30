-- Team hub files go with their branch.
ALTER TABLE `TeamMedia` ADD CONSTRAINT `TeamMedia_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
