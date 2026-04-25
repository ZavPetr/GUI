import BackLink from "@/components/BackLink";
import Card from "@/components/Card";
import { getScheduleData } from "@/lib/data";

interface Lesson {
  cas: string;
  predmet: string;
  mistnost: string;
  druh: string;
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

  // @ts-expect-error : Tady umlčíme TypeScript, který se bojí dynamického přístupu k objektu.
  const todaySchedule = fullSchedule[todaysKey] || [];

  return (
    <main className="p-6 md:p-12 max-w-4xl mx-auto min-h-screen">
      <BackLink />

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
          <Card className="bg-gray-50 text-center p-12">
            <h2 className="text-2xl font-bold italic">Dneska žádná škola!</h2>
          </Card>
        ) : (
          todaySchedule.map((lesson: Lesson, i: number) => {
            const bg = colors[lesson.druh] || "bg-white";

            return (
              <Card key={i} className={`flex justify-between ${bg}`}>

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
              </Card>
            );
          })
        )}
      </div>
    </main>
  );
}