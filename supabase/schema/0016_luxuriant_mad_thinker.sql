DROP VIEW "public"."shiftDetail";--> statement-breakpoint
CREATE VIEW "public"."shiftDetail" AS (
    SELECT
        s.id as id,
        s.date as "shiftDate",
        so.id as "shiftOptionId",
        so."shiftTime" as "shiftTime",
        su.name as "subjectName",
        t.id as "teacherId",
        t.name as "teacherName",
        t.email as "teacherEmail",
        st.name as "studentName"
    FROM "shift" s
    LEFT JOIN "shiftOption" so ON s."shiftId" = so.id
    LEFT JOIN "student" st ON s."studentId" = st.id
    LEFT JOIN "subject" su ON s."subjectId" = su.id
    LEFT JOIN "teacher" t ON s."teacherId" = t.id
    );