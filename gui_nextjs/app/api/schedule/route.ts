// app/api/schedule/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    "Pondělí": [
        { cas: "10:00 - 10:50", predmet: "KMA/CAS", mistnost: "CP-6.13", druh: "Přednáška" },
        { cas: "13:00 - 13:50", predmet: "KMA/PSM", mistnost: "CP-6.13", druh: "Přednáška" }
    ],
    "Úterý": [
        { cas: "09:00 - 10:50", predmet: "KI/UPC", mistnost: "CP-3.18", druh: "Seminář" }
    ],
    "Středa": [],
    "Čtvrtek": [
        { cas: "08:00 - 09:50", predmet: "KI/GUI", mistnost: "CP-6.13", druh: "Přednáška" },
        { cas: "10:00 - 11:50", predmet: "KI/GUI", mistnost: "CP-6.13", druh: "Cvičení" }
    ],
    "Pátek": [], "Sobota": [], "Neděle": []
  };

  return NextResponse.json(data);
}