import Link from "next/link";

export default async function RozvrhPage() {
  // 1. Nastavení barev podle druhu hodiny
  const barvy: any = {
    "Přednáška": "bg-gray-200",
    "Cvičení": "bg-green-200",
    "Seminář": "bg-green-400",
  };

  // 2. Načtení dat z našeho API
  // V reálném prostředí by zde byla celá URL, pro localhost používáme tuto:
  const res = await fetch("http://localhost:3000/api/schedule", { cache: "no-store" });
  const fullSchedule = await res.json();

  // 3. Práce s datem (Server-side)
  const days = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
  const now = new Date();
  const todaysKey = days[now.getDay()];
  const formattedDate = now.toLocaleDateString("cs-CZ");

  // 4. Výběr hodin pro dnešní den
  const dnesniHodiny = fullSchedule[todaysKey] || [];

  return (
    <main className="p-6 md:p-12 max-w-4xl mx-auto min-h-screen bg-white text-black">
      {/* Odkaz zpět */}
      <Link href="/" className="text-blue-600 font-bold hover:underline mb-8 inline-block">
        ← Zpět na Dashboard
      </Link>

      {/* Nadpis s aktuálním dnem */}
      <header className="mb-12">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter">
          Rozvrh na {todaysKey} {formattedDate}
        </h1>
      </header>

      {/* Seznam hodin */}
      <div className="flex flex-col gap-6">
        {dnesniHodiny.length === 0 ? (
          <div className="border-4 border-black p-12 rounded-3xl bg-gray-50 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-bold italic">Dneska žádná škola? Mazec! 🎉</h2>
          </div>
        ) : (
          dnesniHodiny.map((hodina: any, i: number) => {
            // Zjistíme barvu (pokud ji neznáme, bude bílá)
            const pozadi = barvy[hodina.druh] || "bg-white";

            return (
              <div
                key={i}
                className={`border-4 border-black p-6 rounded-3xl flex justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${pozadi}`}
              >
                {/* LEVÁ STRANA: Čas a Předmět */}
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="bg-black text-white px-4 py-1.5 rounded-xl font-bold text-sm tracking-widest uppercase">
                      {hodina.cas}
                    </span>
                    <h2 className="text-4xl font-black mt-4 leading-none">
                      {hodina.predmet}
                    </h2>
                  </div>
                </div>

                {/* PRAVÁ STRANA: Druh a Učebna */}
                <div className="flex flex-col justify-between items-end text-right min-h-25">
                  <span className="text-lg font-bold uppercase tracking-tight opacity-70">
                    {hodina.druh}
                  </span>

                  <p className="font-mono text-base bg-white/50 px-2 py-1 rounded border border-black/10">
                    Učebna: <span className="font-bold">{hodina.mistnost}</span>
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