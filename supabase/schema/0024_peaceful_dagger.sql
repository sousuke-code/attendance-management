CREATE TABLE "fixedShift" (
	"id" serial PRIMARY KEY NOT NULL,
	"teacherId" integer,
	"studentId" integer,
	"weekday" integer,
	"shiftId" integer,
	"subject" integer
);
--> statement-breakpoint
ALTER TABLE "fixedShift" ADD CONSTRAINT "fixedShift_teacherId_teacher_id_fk" FOREIGN KEY ("teacherId") REFERENCES "public"."teacher"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fixedShift" ADD CONSTRAINT "fixedShift_studentId_student_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."student"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fixedShift" ADD CONSTRAINT "fixedShift_shiftId_shiftOption_id_fk" FOREIGN KEY ("shiftId") REFERENCES "public"."shiftOption"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fixedShift" ADD CONSTRAINT "fixedShift_subject_subject_id_fk" FOREIGN KEY ("subject") REFERENCES "public"."subject"("id") ON DELETE no action ON UPDATE no action;