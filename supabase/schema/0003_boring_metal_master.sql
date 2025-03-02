CREATE TABLE "shiftOption" (
	"id" serial PRIMARY KEY NOT NULL,
	"shidtTime" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "shift" ADD COLUMN "shiftId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "shift" ADD CONSTRAINT "shift_shiftId_shiftOption_id_fk" FOREIGN KEY ("shiftId") REFERENCES "public"."shiftOption"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shift" DROP COLUMN "shift";