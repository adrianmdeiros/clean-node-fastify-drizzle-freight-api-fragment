CREATE TABLE `cities` (
	`id` text PRIMARY KEY DEFAULT 'woqwLPPoUXgyiTvX0YuE9' NOT NULL,
	`name` text NOT NULL,
	`uf` text(2) NOT NULL,
	`tax` numeric
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_clients` (
	`id` text PRIMARY KEY DEFAULT 'fykI6SNRd3bNXKpGe7F9W' NOT NULL,
	`name` text NOT NULL,
	`address` text NOT NULL,
	`phone` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_clients`("id", "name", "address", "phone") SELECT "id", "name", "address", "phone" FROM `clients`;--> statement-breakpoint
DROP TABLE `clients`;--> statement-breakpoint
ALTER TABLE `__new_clients` RENAME TO `clients`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `clients_phone_unique` ON `clients` (`phone`);