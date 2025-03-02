ALTER TABLE "shiftSwapList" DROP CONSTRAINT "shiftSwapList_requestorId_teacher_id_fk";
--> statement-breakpoint
ALTER TABLE "shiftSwapList" ALTER COLUMN "receiverId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "shiftSwapList" ADD COLUMN "requesterId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "shiftSwapList" ADD COLUMN "reason" text NOT NULL;--> statement-breakpoint
ALTER TABLE "shiftSwapList" ADD CONSTRAINT "shiftSwapList_requesterId_teacher_id_fk" FOREIGN KEY ("requesterId") REFERENCES "public"."teacher"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shiftSwapList" DROP COLUMN "requestorId";