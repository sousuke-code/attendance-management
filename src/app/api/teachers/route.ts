import { getTeachers } from "@/repositories/user";
import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  const teachers = await getTeachers();
  return NextResponse.json({ teachers });
}
