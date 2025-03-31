CREATE TABLE "attendace" (
	"id" serial PRIMARY KEY NOT NULL,
	"teacherId" integer,
	"checkIn" timestamp NOT NULL,
	"checkOut" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "workRecord" (
	"id" serial PRIMARY KEY NOT NULL,
	"teacherId" integer,
	"attendaceId" integer,
	"start" timestamp NOT NULL,
	"end" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "attendace" ADD CONSTRAINT "attendace_teacherId_teacher_id_fk" FOREIGN KEY ("teacherId") REFERENCES "public"."teacher"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workRecord" ADD CONSTRAINT "workRecord_teacherId_teacher_id_fk" FOREIGN KEY ("teacherId") REFERENCES "public"."teacher"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workRecord" ADD CONSTRAINT "workRecord_attendaceId_attendace_id_fk" FOREIGN KEY ("attendaceId") REFERENCES "public"."attendace"("id") ON DELETE no action ON UPDATE no action;