PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cities` (
	`id` text PRIMARY KEY DEFAULT '6YU-r9mpL8m1_OVT4VWLs' NOT NULL,
	`name` text NOT NULL,
	`uf` text NOT NULL,
	`tax` numeric DEFAULT 0 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_cities`("id", "name", "uf", "tax") SELECT "id", "name", "uf", "tax" FROM `cities`;--> statement-breakpoint
DROP TABLE `cities`;--> statement-breakpoint
ALTER TABLE `__new_cities` RENAME TO `cities`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_clients` (
	`id` text PRIMARY KEY DEFAULT 'hPS-v7Xx2SOdny9VZXMzt' NOT NULL,
	`name` text NOT NULL,
	`address` text NOT NULL,
	`phone` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_clients`("id", "name", "address", "phone") SELECT "id", "name", "address", "phone" FROM `clients`;--> statement-breakpoint
DROP TABLE `clients`;--> statement-breakpoint
ALTER TABLE `__new_clients` RENAME TO `clients`;--> statement-breakpoint
CREATE UNIQUE INDEX `clients_phone_unique` ON `clients` (`phone`);--> statement-breakpoint
CREATE TABLE `__new_freights` (
	`id` text PRIMARY KEY DEFAULT '0c_XPEwkhcSY7aVtExQdH' NOT NULL,
	`description` text NOT NULL,
	`weight` numeric NOT NULL,
	`value` numeric NOT NULL,
	`clientId` text NOT NULL,
	`cityId` text NOT NULL,
	FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`cityId`) REFERENCES `cities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_freights`("id", "description", "weight", "value", "clientId", "cityId") SELECT "id", "description", "weight", "value", "clientId", "cityId" FROM `freights`;--> statement-breakpoint
DROP TABLE `freights`;--> statement-breakpoint
ALTER TABLE `__new_freights` RENAME TO `freights`;