CREATE TABLE "classRoom" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"capacity" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seatAssignment" (
	"id" serial PRIMARY KEY NOT NULL,
	"studentId" integer NOT NULL,
	"seatId" integer NOT NULL,
	"assignedAt" timestamp DEFAULT now() NOT NULL,
	"releasedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "seat" (
	"id" serial PRIMARY KEY NOT NULL,
	"classroomId" integer NOT NULL,
	"seatNumber" integer NOT NULL,
	"isAvailable" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "shiftOption" ADD COLUMN "startAt" timestamp;--> statement-breakpoint
ALTER TABLE "shiftOption" ADD COLUMN "endAt" timestamp;--> statement-breakpoint
ALTER TABLE "shift" ADD COLUMN "seatId" integer;--> statement-breakpoint
ALTER TABLE "seatAssignment" ADD CONSTRAINT "seatAssignment_studentId_student_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."student"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seatAssignment" ADD CONSTRAINT "seatAssignment_seatId_seat_id_fk" FOREIGN KEY ("seatId") REFERENCES "public"."seat"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seat" ADD CONSTRAINT "seat_classroomId_classRoom_id_fk" FOREIGN KEY ("classroomId") REFERENCES "public"."classRoom"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shift" ADD CONSTRAINT "shift_seatId_seat_id_fk" FOREIGN KEY ("seatId") REFERENCES "public"."seat"("id") ON DELETE no action ON UPDATE no action;