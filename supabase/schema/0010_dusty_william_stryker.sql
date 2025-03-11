CREATE TABLE "studentEntry" (
	"id" serial PRIMARY KEY NOT NULL,
	"studentId" integer NOT NULL,
	"checkInTime" timestamp DEFAULT now() NOT NULL,
	"checkOutTime" timestamp
);
--> statement-breakpoint
ALTER TABLE "studentEntry" ADD CONSTRAINT "studentEntry_studentId_student_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."student"("id") ON DELETE no action ON UPDATE no action;