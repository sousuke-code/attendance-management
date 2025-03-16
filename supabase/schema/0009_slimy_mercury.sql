ALTER TABLE "shift" ADD COLUMN "teacherId" integer;--> statement-breakpoint
ALTER TABLE "shift" ADD CONSTRAINT "shift_teacherId_teacher_id_fk" FOREIGN KEY ("teacherId") REFERENCES "public"."teacher"("id") ON DELETE no action ON UPDATE no action;
