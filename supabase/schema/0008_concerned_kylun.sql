ALTER TABLE "student" ADD COLUMN "code" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_code_unique" UNIQUE("code");