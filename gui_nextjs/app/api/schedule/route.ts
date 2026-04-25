import { NextResponse } from "next/server";
import { getScheduleData } from "@/lib/data";

export async function GET() {

  const data = await getScheduleData();

  return NextResponse.json(data);
}