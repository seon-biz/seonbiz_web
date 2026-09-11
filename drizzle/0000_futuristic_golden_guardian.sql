CREATE TABLE `applications` (
	`id` text PRIMARY KEY NOT NULL,
	`website` text NOT NULL,
	`problem` text NOT NULL,
	`ai_usage` text NOT NULL,
	`phone` text NOT NULL,
	`consent_version` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_applications_phone_created` ON `applications` (`phone`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_applications_created` ON `applications` (`created_at`);