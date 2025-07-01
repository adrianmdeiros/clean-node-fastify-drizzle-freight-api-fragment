PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cities` (
	`id` text PRIMARY KEY DEFAULT 'i0ODPRHIhzKp3LA_6f3tl' NOT NULL,
	`name` text NOT NULL,
	`uf` text(2) NOT NULL,
	`tax` numeric DEFAULT 0
);
--> statement-breakpoint
INSERT INTO `__new_cities`("id", "name", "uf", "tax") SELECT "id", "name", "uf", "tax" FROM `cities`;--> statement-breakpoint
DROP TABLE `cities`;--> statement-breakpoint
ALTER TABLE `__new_cities` RENAME TO `cities`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_clients` (
	`id` text PRIMARY KEY DEFAULT 'b35y-F84EVl_JlwiWkvbz' NOT NULL,
	`name` text NOT NULL,
	`address` text NOT NULL,
	`phone` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_clients`("id", "name", "address", "phone") SELECT "id", "name", "address", "phone" FROM `clients`;--> statement-breakpoint
DROP TABLE `clients`;--> statement-breakpoint
ALTER TABLE `__new_clients` RENAME TO `clients`;--> statement-breakpoint
CREATE UNIQUE INDEX `clients_phone_unique` ON `clients` (`phone`);