import { shiftOptions, shifts } from "@/db/schema/shift";
import { faker} from "@faker-js/faker";
import { date } from "drizzle-orm/mysql-core";
import { subjects } from "@/db/schema/subject";
import { DB } from "../../../db";
import { students } from "@/db/schema/student";
import { teachers } from "@/db/schema/teacher";
import { db } from "../../../db";
import { min } from "drizzle-orm";



async function seed() {
    const count = 30;
    const seedShifts = await db.insert(shifts).values(
        Array.from({ length: count}, () => ({
            teacherId: faker.number.int({ min: 3, max: 4}),
            studentId: faker.number.int({ min: 1, max: 2}),
            date: faker.date.recent().toLocaleString(),
            shiftId: faker.number.int({ min: 1, max: 8}),
            subjectId: faker.number.int({ min: 1, max: 6}),
        }))
    )
}

seed().catch((e) => console.error(e));
