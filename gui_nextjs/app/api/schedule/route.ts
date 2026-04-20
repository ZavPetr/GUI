// app/api/rozvrh/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    "Pondělí": [
        { time: "10:00 - 10:50", subject: "KMA/CAS", room: "CP-6.13", type: "Přednáška" },
        { time: "11:00 - 11:50", subject: "KMA/CAS", room: "CP-6.13", type: "Cvičení" },
        { time: "13:00 - 13:50", subject: "KMA/PSM", room: "CP-6.13", type: "Přednáška" },
        { time: "14:00 - 15:50", subject: "KMA/PSM", room: "CP-6.13", type: "Cvičení" },
        { time: "16:00 - 19:50", subject: "KI/PRIZ", room: "CP-1.03", type: "Seminář" }
    ],
    "Úterý": [
        { time: "09:00 - 10:50", subject: "KI/UPC", room: "CP-3.18", type: "Seminář" },
        { time: "12:00 - 13:50", subject: "KI/ODM", room: "CP- -1.21", type: "Seminář" }
    ],
    "Středa": [],
    "Čtvrtek": [
        { time: "08:00 - 09:50", subject: "KI/GUI", room: "CP-6.13", type: "Přednáška" },
        { time: "10:00 - 11:50", subject: "KI/GUI", room: "CP-6.13", type: "Cvičení" },
        { time: "13:00 - 13:50", subject: "KI/USU", room: "CP- -1.21", type: "Přednáška" },
        { time: "14:00 - 15:50", subject: "KI/USU", room: "CP- -1.21", type: "Cvičení" },
        { time: "16:00 - 17:50", subject: "KI/OPRE", room: "CP-1.03", type: "Seminář" }
    ],
    "Pátek": [
        { time: "09:00 - 10:50", subject: "KI/PRI", room: "CP-6.14", type: "Přednáška" },
        { time: "11:00 - 12:50", subject: "KI/SWI", room: "CP-6.13", type: "Seminář" },
        { time: "03:00 - 14:50", subject: "KI/PRI", room: "CP-6.14", type: "Cvičení" }
    ],
    "Sobota": [],
    "Neděle": []
  };

  return NextResponse.json(data);
}