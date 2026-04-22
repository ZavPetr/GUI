import Link from "next/link";
import { getScheduleData } from "@/lib/data"; 

interface Lesson {
  time: string;
  subject: string;
  room: string;
  type: string;
}

export default async function Schedule() {

  const colors : Record<string, string> = {
    "Přednáška": "bg-gray-200",
    "Cvičení": "bg-green-200",
    "Seminář": "bg-green-400",
  };

  const fullSchedule = await getScheduleData();

  const days = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
  const now = new Date();

  const todaysKey = days[now.getDay()];

  const formattedDate = now.toLocaleDateString("cs-CZ");
  // @ts-expect-error : todaysKey je dynamický index, který TS nedokáže automaticky ověřit proti klíčům v fullSchedule
  const todaySchedule = fullSchedule[todaysKey] || [];

  return (
    <main className="p-6 md:p-12 max-w-4xl mx-auto min-h-screen bg-white text-black">
      <Link href="/" className="text-blue-600 font-bold hover:underline mb-8 inline-block">
        ← Zpět na Dashboard
      </Link>

      <header className="mb-12">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter">
          Rozvrh na {todaysKey} {formattedDate}
        </h1>

        <p className="mt-4 text-xl font-bold bg-yellow-300 inline-block px-4 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Celkem předmětů: {todaySchedule.length}
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {todaySchedule.length === 0 ? (
          <div className="border-4 border-black p-12 rounded-3xl bg-gray-50 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-bold italic">Dneska žádná škola!</h2>
          </div>
        ) : (
          todaySchedule.map((lesson: Lesson, i: number) => {
            const bg = colors[lesson.type] || "bg-white";

            return (
              <div
                key={i}
                className={`border-4 border-black p-6 rounded-3xl flex justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${bg}`}
              >
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="bg-black text-white px-4 py-1.5 rounded-xl font-bold text-sm tracking-widest uppercase">
                      {lesson.time}
                    </span>
                    <h2 className="text-4xl font-black mt-4 leading-none">
                      {lesson.subject}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end text-right min-h-25">
                  <span className="text-lg font-bold uppercase tracking-tight opacity-70">
                    {lesson.type}
                  </span>
                  <p className="font-mono text-base bg-white/50 px-2 py-1 rounded border border-black/10">
                    Učebna: <span className="font-bold">{lesson.room}</span>
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