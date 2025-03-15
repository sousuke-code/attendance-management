CREATE TABLE "incentive" (
	"id" serial PRIMARY KEY NOT NULL,
	"add" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "teacher" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "teacher" ADD COLUMN "point" integer DEFAULT 0;