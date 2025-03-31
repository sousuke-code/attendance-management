CREATE TABLE "studentsSubject" (
	"id" serial PRIMARY KEY NOT NULL,
	"studentId" integer NOT NULL,
	"subjectsId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "studentsSubject" ADD CONSTRAINT "studentsSubject_studentId_student_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."student"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "studentsSubject" ADD CONSTRAINT "studentsSubject_subjectsId_subject_id_fk" FOREIGN KEY ("subjectsId") REFERENCES "public"."subject"("id") ON DELETE no action ON UPDATE no action;