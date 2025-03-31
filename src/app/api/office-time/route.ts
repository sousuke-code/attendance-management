import { NextResponse } from "next/server";
import { db } from "../../../../db";
import { workRecords } from "@/db/schema/work";

export async function POST(req: Request) {
    const body = await req.json();

    for (const entry of body.officeTime){
        await db.insert(workRecords).values({
            teacherId: body.teacherId,
            attendaceId: body.attendanceId,
            start: new Date(entry.start),
            end: new Date(entry.end),
            content: entry.reason,
        })
    }
    return NextResponse.json({ success: true });
}
