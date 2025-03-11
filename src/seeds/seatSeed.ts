import { seats } from "@/db/schema/seat";
import { db } from "../../db";
import { classRooms } from "@/db/schema/classroom";


async function createSeatForClassRoom(classRoomId: number, seatCount: number = 30){
    for (let i = 1; i <= seatCount; i++){
        await db.insert(seats).values([
            { seatNumber: i, classroomId: classRoomId},
        ])
    }
}

async function seed() {
    const classrooms = await db.select().from(classRooms);

    for (const classroom of classrooms){
        await createSeatForClassRoom(classroom.id);
    }

}

seed().catch((error) => console.error(error));
