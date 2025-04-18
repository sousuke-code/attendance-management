import { shifts } from "@/db/schema/shift";
import { faker } from "@faker-js/faker";
import { db } from "../../../db";
import { start } from "repl";


async function seed() {
    const count = 30;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 7);

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14);
    
    const seedShifts = await db.insert(shifts).values(
        Array.from({ length: count }, () => ({
            teacherId: faker.number.int({ min: 3, max: 4 }),
            studentId: faker.number.int({ min: 1, max: 2 }),
            date: faker.date.between({ from: startDate, to: endDate }).toLocaleString(),
            shiftId: faker.number.int({ min: 1, max: 8 }),
            subjectId: faker.number.int({ min: 1, max: 6 }),
        }))
    );
}

seed().catch((e) => console.error(e));