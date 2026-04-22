// app/schedule/page.tsx
import Link from "next/link";
import { getScheduleData } from "@/lib/data"; // Toto je ta jediná přidaná řádka pro Docker

// 1. TYPESCRIPT INTERFACE: Definujeme si "formičku", jak vypadá jedna vyučovací hodina.
// Tady jsem změnil názvy (např. 'cas' místo 'time'), aby seděly na tvůj route.ts.
interface Lesson {
  cas: string;
  predmet: string;
  mistnost: string;
  druh: string;
}

// 2. SERVER COMPONENT: Všimni si klíčového slova 'async'.
// Tato komponenta běží na serveru, takže může napřímo sahat pro data.
export default async function Schedule() {

  // 3. MAPOVÁNÍ BAREV: Objekt, který slouží jako jednoduchý převodník.
  // Podle typu hodiny (klíč) vybereme odpovídající Tailwind třídu pro pozadí.
  const colors : Record<string, string> = {
    "Přednáška": "bg-gray-200",
    "Cvičení": "bg-green-200",
    "Seminář": "bg-green-400",
  };

  // 4. DATA FETCHING: Tady je ta oprava pro Docker.
  // Místo fetch na localhost voláme data přímo z lib/data.ts.
  const fullSchedule = await getScheduleData();

  // 5. LOGIKA DATUMU: Potřebujeme zjistit, jaký je dnes den.
  const days = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
  const now = new Date();

  // getDay() vrací číslo 0 (Neděle) až 6 (Sobota). Použijeme ho jako index pro pole 'days'.
  const todaysKey = days[now.getDay()];

  // Formátování data do české podoby (např. 20. 4. 2026)
  const formattedDate = now.toLocaleDateString("cs-CZ");

  // 6. FILTROVÁNÍ: Z celého rozvrhu si vytáhneme jen pole pro dnešní den.
  // @ts-expect-error : todaysKey je dynamický index, který TS nedokáže automaticky ověřit proti klíčům v fullSchedule
  const todaySchedule = fullSchedule[todaysKey] || [];

  return (
    <main className="p-6 md:p-12 max-w-4xl mx-auto min-h-screen bg-white text-black">
      {/* Tlačítko zpět pomocí klientské navigace Next.js */}
      <Link href="/" className="text-blue-600 font-bold hover:underline mb-8 inline-block">
        ← Zpět na Dashboard
      </Link>

      <header className="mb-12">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter">
          Rozvrh na {todaysKey} {formattedDate}
        </h1>

        {/* Dynamické zobrazení počtu hodin pomocí délky pole (.length) */}
        <p className="mt-4 text-xl font-bold bg-yellow-300 inline-block px-4 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Celkem předmětů: {todaySchedule.length}
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {/* PODMÍNĚNÉ RENDEROVÁNÍ: Pokud je pole prázdné, ukážeme zprávu o volnu. */}
        {todaySchedule.length === 0 ? (
          <div className="border-4 border-black p-12 rounded-3xl bg-gray-50 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-bold italic">Dneska žádná škola!</h2>
          </div>
        ) : (
          // Pokud hodiny máme, projdeme je pomocí .map() a vykreslíme karty.
          todaySchedule.map((lesson: Lesson, i: number) => {
            // Zjistíme barvu pozadí podle druhu hodiny z našeho objektu 'barvy'.
            const bg = colors[lesson.druh] || "bg-white";

            return (
              <div
                key={i} // Každý prvek v seznamu musí mít v Reactu unikátní klíč.
                className={`border-4 border-black p-6 rounded-3xl flex justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${bg}`}
              >
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="bg-black text-white px-4 py-1.5 rounded-xl font-bold text-sm tracking-widest uppercase">
                      {lesson.cas}
                    </span>
                    <h2 className="text-4xl font-black mt-4 leading-none">
                      {lesson.predmet}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end text-right min-h-25">
                  <span className="text-lg font-bold uppercase tracking-tight opacity-70">
                    {lesson.druh}
                  </span>
                  <p className="font-mono text-base bg-white/50 px-2 py-1 rounded border border-black/10">
                    Učebna: <span className="font-bold">{lesson.mistnost}</span>
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}