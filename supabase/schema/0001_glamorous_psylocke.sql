CREATE TABLE "shiftSwapList" (
	"id" serial PRIMARY KEY NOT NULL,
	"requestorId" integer NOT NULL,
	"receiverId" integer NOT NULL,
	"shiftId" integer NOT NULL,
	"status" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shift" (
	"id" serial PRIMARY KEY NOT NULL,
	"studentId" integer NOT NULL,
	"date" date NOT NULL,
	"shift" integer NOT NULL,
	"subjectId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "subject" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teachersSubject" (
	"id" serial PRIMARY KEY NOT NULL,
	"teacherId" integer NOT NULL,
	"subjectsId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "students" RENAME TO "student";--> statement-breakpoint
ALTER TABLE "teachers" RENAME TO "teacher";--> statement-breakpoint
ALTER TABLE "shiftSwapList" ADD CONSTRAINT "shiftSwapList_requestorId_teacher_id_fk" FOREIGN KEY ("requestorId") REFERENCES "public"."teacher"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shiftSwapList" ADD CONSTRAINT "shiftSwapList_receiverId_teacher_id_fk" FOREIGN KEY ("receiverId") REFERENCES "public"."teacher"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shiftSwapList" ADD CONSTRAINT "shiftSwapList_shiftId_shift_id_fk" FOREIGN KEY ("shiftId") REFERENCES "public"."shift"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shift" ADD CONSTRAINT "shift_studentId_student_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."student"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shift" ADD CONSTRAINT "shift_subjectId_subject_id_fk" FOREIGN KEY ("subjectId") REFERENCES "public"."subject"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teachersSubject" ADD CONSTRAINT "teachersSubject_teacherId_teacher_id_fk" FOREIGN KEY ("teacherId") REFERENCES "public"."teacher"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teachersSubject" ADD CONSTRAINT "teachersSubject_subjectsId_subject_id_fk" FOREIGN KEY ("subjectsId") REFERENCES "public"."subject"("id") ON DELETE no action ON UPDATE no action;