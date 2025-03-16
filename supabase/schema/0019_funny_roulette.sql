DROP VIEW "public"."shiftSwapDetails";--> statement-breakpoint
CREATE VIEW "public"."shiftSwapDetails" AS (
     SELECT
        ssl.id as id,
        ssl."requesterId" as "requesterId",
        t1.name as "requesterName",
        ssl."receiverId" as "receiverId",
        t2.name as "receiverName",
        ssl."studentsId" as "studentId",
        st.name as "studentName",
        ssl."shiftId" as "shiftId",
        s.date as "shiftDate",
        so."shiftTime" as "shiftTime",
        s."subjectId" as "subjectId",
        su.name as "subjectsName",
        ssl.reason as reason,
        ssl.status as status,
        ssl."createdAt" as "createdAt",
        ssl."updatedAt" as "updatedAt"
    FROM "shiftSwapList" ssl
    LEFT JOIN "teacher" t1 ON ssl."requesterId" = t1.id
    LEFT JOIN "teacher" t2 ON ssl."receiverId" = t2.id
    LEFT JOIN "student" st ON ssl."studentsId" = st.id
    LEFT JOIN "shift" s ON ssl."shiftId" = s.id
    LEFT JOIN "shiftOption" so ON s."shiftId" = so.id
    LEFT JOIN "subject" su ON s."subjectId" = su.id   
    );