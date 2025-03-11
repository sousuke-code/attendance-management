import "dotenv/config";
import { db } from "../../db";
import { students } from "@/db/schema/student";
import { subjects, teachersSubjects } from "@/db/schema/subject";
import { teachers } from "@/db/schema/teacher";
import { shiftOptions, shifts, shiftSwapLists, } from "@/db/schema/shift";
import { classRooms } from "@/db/schema/classroom";


async function seed() {
    const seedTeachers = await db.insert(teachers).values([
        {name : "田中先生"},
        {name: "山田先生"},
    ]).returning();

    const seedSubjects = await db.insert(subjects).values([
        {   id: 1,
            name: "数学"
        },
        {   id: 2,
            name: "国語"
        },
        {   id: 3,
            name: "英語"
        },
        {   id: 4,
            name: "社会"
        },
        {   id: 5,
            name: "理科"
        },
        {   id: 6,
            name: "算数"
        },
    ]).returning();

    const seedStudents = await db.insert(students).values([
        { name: "山田太郎"},
        { name: "鈴木花子"},
    ]).returning();

    const seedShiftOptions = await db.insert(shiftOptions).values([
        { shiftTime: '14:00-14:50'},
        { shiftTime: '15:00-15:50'},
        { shiftTime: '16:00-16:50'},
        { shiftTime: '17:00-17:50'},
        { shiftTime: '18:00-18:50'},
        { shiftTime: '19:00-19:50'},
        { shiftTime: '20:00-20:50'},
        { shiftTime: '21:00-21:50'},
    ]).returning();

    await db.insert(teachersSubjects).values([
        {
            teacherId: seedTeachers[0].id,
            subjectsId: seedSubjects[0].id,
        },
        {
            teacherId: seedTeachers[0].id,
            subjectsId: seedSubjects[1].id,
        },
        {
            teacherId: seedTeachers[0].id,
            subjectsId: seedSubjects[2].id,
        },
        {
            teacherId: seedTeachers[1].id,
            subjectsId: seedSubjects[0].id,
        },
        {
            teacherId: seedTeachers[1].id,
            subjectsId: seedSubjects[2].id,
        },
        {
            teacherId: seedTeachers[1].id,
            subjectsId: seedSubjects[3].id,
        }
    ])

    const seedShifts = await db.insert(shifts).values([
        {
            date: new Date("2025-04-01").toISOString(),
            studentId: seedStudents[0].id,
            shiftId: seedShiftOptions[0].id,
            subjectId: seedSubjects[0].id,
        },
        {
            date: new Date("2025-04-01").toISOString(),
            studentId: seedStudents[1].id,
            shiftId: seedShiftOptions[1].id,
            subjectId: seedSubjects[1].id,
        },
        {
            date: new Date("2025-04-02").toISOString(),
            studentId: seedStudents[0].id,
            shiftId: seedShiftOptions[2].id,
            subjectId: seedSubjects[2].id,
        },
    ]);

    const seedClassRooms = await db.insert(classRooms).values([
        {
            id: 1,
            name: "A教室",
            capacity: 50,
        },
        {
            id: 2,
            name: "B教室",
            capacity: 50,
        }
    ])
}

seed().catch((error) => console.error(error));
