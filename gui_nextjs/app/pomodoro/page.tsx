"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PomodoroPage() {
  // 1. STAVY: kolik zbývá sekund, jestli běží a jestli je pauza
  const [sekundy, setSekundy] = useState(25 * 60);
  const [bezi, setBezi] = useState(false);
  const [jePauza, setJePauza] = useState(false);

  // 2. LOGIKA ČASOVAČE (Srdce komponenty)
  useEffect(() => {
    let interval: any = null;

    if (bezi && sekundy > 0) {
      // Každou vteřinu odečti 1 ze stavu
      interval = setInterval(() => {
        setSekundy((s) => s - 1);
      }, 1000);
    } else if (sekundy === 0) {
      // Když dojde čas, zastav se a přepni režim
      setBezi(false);
      alert(jePauza ? "Pauza skončila! Šup do práce." : "Práce hotova! Dej si pauzu.");
    }

    // Vyčištění intervalu (aby se jich nespouštělo víc najednou)
    return () => clearInterval(interval);
  }, [bezi, sekundy, jePauza]);

  // 3. POMOCNÉ FUNKCE
  const formatujCas = () => {
    const m = Math.floor(sekundy / 60);
    const s = sekundy % 60;
    return `${m}:${s < 10 ? "0" + s : s}`; // Přidá nulu, když je sekund pod 10
  };

  const resetuj = (minuty: number, pauza: boolean) => {
    setBezi(false);
    setSekundy(minuty * 60);
    setJePauza(pauza);
  };

  return (
    <main className="p-6 md:p-12 max-w-2xl mx-auto min-h-screen text-black">
      <Link href="/" className="text-blue-600 font-bold hover:underline mb-8 inline-block">
        ← Zpět na Dashboard
      </Link>

      <div className={`border-4 border-black p-10 rounded-[40px] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-center transition-colors ${jePauza ? 'bg-green-100' : 'bg-red-300'}`}>
        <h1 className="text-4xl font-black uppercase mb-2 tracking-tighter">
          {jePauza ? "Pauzička \u2615\uFE0E" : "Soustředění \u23F1\uFE0E"}
        </h1>
        <p className="text-sm font-bold opacity-50 mb-8 uppercase tracking-[0.2em]">
          Pomodoro Timer
        </p>

        {/* ČASOČET */}
        <div className="text-8xl md:text-9xl font-black tabular-nums mb-10 tracking-tight">
          {formatujCas()}
        </div>

        {/* OVLÁDÁNÍ */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setBezi(!bezi)}
            className={`py-6 rounded-2xl border-4 border-black text-2xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all ${bezi ? 'bg-white' : 'bg-black text-white'}`}
          >
            {bezi ? "Pauza" : "Start"}
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => resetuj(25, false)}
              className="border-2 border-black p-3 rounded-xl font-bold bg-white hover:bg-gray-100"
            >
              Práce (25m)
            </button>
            <button
              onClick={() => resetuj(5, true)}
              className="border-2 border-black p-3 rounded-xl font-bold bg-white hover:bg-gray-100"
            >
              Pauza (5m)
            </button>
          </div>
        </div>
      </div>

      <p className="mt-12 text-center text-gray-500 italic">
        "Technika Pomodoro ti pomůže udržet mozek v kondici."
      </p>
    </main>
  );
}