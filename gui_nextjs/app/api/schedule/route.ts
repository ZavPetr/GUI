// app/api/rozvrh/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    "Pondělí": [
        { cas: "10:00 - 10:50", predmet: "KMA/CAS", mistnost: "CP-6.13", druh: "Přednáška" },
        { cas: "11:00 - 11:50", predmet: "KMA/CAS", mistnost: "CP-6.13", druh: "Cvičení" },
        { cas: "13:00 - 13:50", predmet: "KMA/PSM", mistnost: "CP-6.13", druh: "Přednáška" },
        { cas: "14:00 - 15:50", predmet: "KMA/PSM", mistnost: "CP-6.13", druh: "Cvičení" },
        { cas: "16:00 - 19:50", predmet: "KI/PRIZ", mistnost: "CP-1.03", druh: "Seminář" }
    ],
    "Úterý": [
        { cas: "09:00 - 10:50", predmet: "KI/UPC", mistnost: "CP-3.18", druh: "Seminář" },
        { cas: "12:00 - 13:50", predmet: "KI/ODM", mistnost: "CP- -1.21", druh: "Seminář" }
    ],
    "Středa": [],
    "Čtvrtek": [
        { cas: "08:00 - 09:50", predmet: "KI/GUI", mistnost: "CP-6.13", druh: "Přednáška" },
        { cas: "10:00 - 11:50", predmet: "KI/GUI", mistnost: "CP-6.13", druh: "Cvičení" },
        { cas: "13:00 - 13:50", predmet: "KI/USU", mistnost: "CP- -1.21", druh: "Přednáška" },
        { cas: "14:00 - 15:50", predmet: "KI/USU", mistnost: "CP- -1.21", druh: "Cvičení" },
        { cas: "16:00 - 17:50", predmet: "KI/OPRE", mistnost: "CP-1.03", druh: "Seminář" }
    ],
    "Pátek": [
        { cas: "09:00 - 10:50", predmet: "KI/PRI", mistnost: "CP-6.14", druh: "Přednáška" },
        { cas: "11:00 - 12:50", predmet: "KI/SWI", mistnost: "CP-6.13", druh: "Seminář" },
        { cas: "03:00 - 14:50", predmet: "KI/PRI", mistnost: "CP-6.14", druh: "Cvičení" }
    ],
    "Sobota": [],
    "Neděle": []
  };

  return NextResponse.json(data);
}