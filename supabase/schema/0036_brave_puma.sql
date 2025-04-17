CREATE VIEW "public"."workRecordDetail" AS (
      SELECT 
        wr.id as id,
        wr."teacherId" as "teacherId",
        t.name as "teacherName",
        wr.content as content,
        wr.start as start,
        wr.end as end
      FROM "workRecord" wr
      LEFT JOIN teacher t ON wr."teacherId" = t.id
    );