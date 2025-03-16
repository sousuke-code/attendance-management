ALTER TABLE "shiftSwapList" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "shiftSwapList" ADD COLUMN "updatedAt" timestamp;