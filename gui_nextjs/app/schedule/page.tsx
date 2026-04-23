import BackLink from "@/components/BackLink";
import Card from "@/components/Card";
import { getScheduleData } from "@/lib/data";

// 1. TYPESCRIPT INTERFACE: Definujeme si "formičku" (typ).
// Říkáme TypeScriptu: "Každá vyučovací hodina MUSÍ mít tyto čtyři textové údaje."
// Pomáhá nám to, abychom se později nespletli v názvech (např. 'mistnost' vs 'ucebna').
interface Lesson {
  cas: string;
  predmet: string;
  mistnost: string;
  druh: string;
}

// 2. SERVER COMPONENT: Všimni si, že tady CHYBÍ "use client".
// Tato komponenta se vygeneruje na serveru. Je to bezpečné a rychlé,
// protože data se načtou u zdroje a k uživateli už letí hotové HTML.
export default async function Schedule() {

  // 3. MAPOVÁNÍ BAREV: Objekt, který slouží jako "převodník".
  // Podle druhu hodiny (klíč) vybereme Tailwind třídu pro pozadí.
  // Je to čistší než psát pět podmínek IF pod sebe.
  const colors : Record<string, string> = {
    "Přednáška": "bg-gray-200", // Šedá pro teoretický základ
    "Cvičení": "bg-green-200",   // Světle zelená pro praxi
    "Seminář": "bg-green-400",   // Sytější zelená
  };

  // 4. DATA FETCHING: Načtení dat.
  // Klíčové slovo 'await' říká: "Počkej, až se ta data z lib/data.ts skutečně načtou."
  const fullSchedule = await getScheduleData();

  // 5. LOGIKA DATUMU: Zjišťujeme aktuální čas a den.
  const days = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
  const now = new Date();

  // getDay() vrátí číslo 0-6. Použijeme ho jako index do pole 'days'.
  // Výsledek (např. "Pondělí") bude klíčem pro vytažení dat z rozvrhu.
  const todaysKey = days[now.getDay()];

  // Formátování data do podoby, kterou známe (např. 23. 4. 2026)
  const formattedDate = now.toLocaleDateString("cs-CZ");

  // 6. FILTROVÁNÍ: Vytáhneme si jen předměty pro dnešek.
  // Pokud dnes v rozvrhu nic není, dosadíme prázdné pole '[]', aby aplikace nespadla.
  // @ts-expect-error : Tady umlčíme TypeScript, který se bojí dynamického přístupu k objektu.
  const todaySchedule = fullSchedule[todaysKey] || [];

  return (
    // p-6 md:p-12 -> Vnitřní odsazení. Na mobilu malé (6), od středních obrazovek (md) velké (12).
    // max-w-4xl -> Aby rozvrh nebyl moc široký na velkých monitorech (max cca 896px).
    // mx-auto -> Vycentrování na střed.
    <main className="p-6 md:p-12 max-w-4xl mx-auto min-h-screen">
      <BackLink />

      <header className="mb-12">
        {/* italic -> kurzíva. uppercase -> VELKÁ PÍSMENA.
            tracking-tighter -> Písmena jsou víc u sebe, vypadá to moderněji. */}
        <h1 className="text-5xl font-black italic uppercase tracking-tighter">
          Rozvrh na {todaysKey} {formattedDate}
        </h1>

        {/* inline-block -> Šířka pozadí se přizpůsobí jen délce textu.
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -> Tvůj klasický neobrutalistický tvrdý stín. */}
        <p className="mt-4 text-xl font-bold bg-yellow-300 inline-block px-4 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Celkem předmětů: {todaySchedule.length}
        </p>
      </header>

      {/* flex-col gap-6 -> Karty pod sebou s mezerou (gap) 6 mezi nimi. */}
      <div className="flex flex-col gap-6">

        {/* TERNÁRNÍ OPERÁTOR: Podmínka ? Co se stane když platí : Co se stane když neplatí */}
        {todaySchedule.length === 0 ? (
          <Card className="bg-gray-50 text-center p-12">
            <h2 className="text-2xl font-bold italic">Dneska žádná škola!</h2>
          </Card>
        ) : (
          // Procházíme pole dnešních hodin a pro každou vyrobíme kartu.
          todaySchedule.map((lesson: Lesson, i: number) => {
            // Zkusíme najít barvu v našem převodníku. Pokud tam není, použijeme bílou.
            const bg = colors[lesson.druh] || "bg-white";

            return (
              <Card key={i} className={`flex justify-between ${bg}`}>

                {/* Levá část karty (Čas a Název) */}
                <div className="flex flex-col justify-between">
                  <div>
                    {/* tracking-widest -> Velké mezery mezi písmeny v čase pro lepší čitelnost. */}
                    <span className="bg-black text-white px-4 py-1.5 rounded-xl font-bold text-sm tracking-widest uppercase">
                      {lesson.cas}
                    </span>
                    {/* leading-none -> Odstraní standardní řádkování, aby nadpis mohl být blíž času. */}
                    <h2 className="text-4xl font-black mt-4 leading-none">
                      {lesson.predmet}
                    </h2>
                  </div>
                </div>

                {/* Pravá část karty (Druh a Učebna) */}
                <div className="flex flex-col justify-between items-end text-right min-h-25">
                  {/* opacity-70 -> Text je mírně vybledlý, aby nepřebíjel název předmětu. */}
                  <span className="text-lg font-bold uppercase tracking-tight opacity-70">
                    {lesson.druh}
                  </span>

                  {/* font-mono -> Písmo jako na stroji/terminálu.
                      bg-white/50 -> Bílé pozadí s 50% průhledností (hezky prosvítá barva karty). */}
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