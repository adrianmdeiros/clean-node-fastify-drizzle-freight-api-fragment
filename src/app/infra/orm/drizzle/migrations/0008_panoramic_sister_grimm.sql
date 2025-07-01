CREATE TABLE `freights` (
	`id` text PRIMARY KEY DEFAULT 'uIBS8bFIcrVDTx10xG8W9' NOT NULL,
	`description` text(30) NOT NULL,
	`weight` numeric NOT NULL,
	`value` numeric NOT NULL,
	`clientId` text NOT NULL,
	`cityId` text NOT NULL,
	FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`cityId`) REFERENCES `cities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cities` (
	`id` text PRIMARY KEY DEFAULT 'aoHpMFIBNuPZiwO_fItAo' NOT NULL,
	`name` text NOT NULL,
	`uf` text(2) NOT NULL,
	`tax` numeric DEFAULT 0 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_cities`("id", "name", "uf", "tax") SELECT "id", "name", "uf", "tax" FROM `cities`;--> statement-breakpoint
DROP TABLE `cities`;--> statement-breakpoint
ALTER TABLE `__new_cities` RENAME TO `cities`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_clients` (
	`id` text PRIMARY KEY DEFAULT 'spohy2sR6BChApiZgVnu-' NOT NULL,
	`name` text NOT NULL,
	`address` text NOT NULL,
	`phone` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_clients`("id", "name", "address", "phone") SELECT "id", "name", "address", "phone" FROM `clients`;--> statement-breakpoint
DROP TABLE `clients`;--> statement-breakpoint
ALTER TABLE `__new_clients` RENAME TO `clients`;--> statement-breakpoint
CREATE UNIQUE INDEX `clients_phone_unique` ON `clients` (`phone`);