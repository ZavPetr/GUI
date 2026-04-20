"use client"; // Potřebujeme interaktivitu (tlačítka) a Hooky (state, effect)
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PomodoroPage() {
  // 1. STAV (STATE): 
  // seconds: Aktuální čas v sekundách (začínáme na 25 minutách)
  const [seconds, setSeconds] = useState(25 * 60);
  // isActive: Běží časovač, nebo stojí?
  const [isActive, setIsActive] = useState(false);
  // isBreak: Jsme v režimu pauzy, nebo práce? (ovlivňuje barvy a texty)
  const [isBreak, setIsBreak] = useState(false);

  // 2. LOGIKA ČASOVAČE (TIMER ENGINE)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isActive) {
      // Pokud je časovač aktivní, spustíme interval, který "tikne" každých 1000ms (1 sekunda)
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            // Jakmile čas vyprší, rovnou interval zastavíme, aby neběžel na pozadí
            clearInterval(interval);

            // Malé zpoždění (10ms) zajistí, že se nejdřív vykreslí nula a až pak vyskočí alert
            setTimeout(() => {
              setIsActive(false);
              alert(isBreak ? "Pauza skončila! Šup do práce." : "Práce hotova! Dej si pauzu.");
            }, 10);

            return 0; // Nastavíme čas na nulu
          }
          return prev - 1; // Každou sekundu odečteme jedničku
        });
      }, 1000);
    }

    // ÚKLIDOVÁ FUNKCE (CLEANUP):
    // Tohle je kritické! Pokud bysme komponentu zavřeli nebo vypli Timer, 
    // tahle funkce zastaví interval, aby se nám v paměti nekupovaly "duchové" časovače.
    return () => clearInterval(interval);
  }, [isActive, isBreak]); // Effect se restartuje, když se změní stav aktivity nebo režimu

  // 3. POMOCNÁ FUNKCE PRO FORMÁT ČASU
  const formatTime = () => {
    const minutes = Math.floor(seconds / 60); // Celé minuty
    const remainingSeconds = seconds % 60;   // Zbytek sekund (modulo)
    // Pokud je sekund méně než 10, přidáme před ně nulu (např. 4:05 místo 4:5)
    return `${minutes}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
  };

  // FUNKCE PRO RESET / PŘEPNUTÍ REŽIMU
  const handleReset = (minutes: number, breakMode: boolean) => {
    setIsActive(false);           // Zastavíme odpočet
    setSeconds(minutes * 60);     // Nastavíme nový čas
    setIsBreak(breakMode);        // Přepneme režim (Práce vs Pauza)
  };

  return (
    <main className="p-6 md:p-12 max-w-2xl mx-auto min-h-screen text-black font-sans">
      <Link href="/" className="text-blue-600 font-bold hover:underline mb-8 inline-block">
        ← Zpět na Dashboard
      </Link>

      {/* DYNAMICKÝ KONTEJNER: Barva pozadí se mění podle stavu isBreak */}
      <div className={`border-4 border-black p-10 rounded-[40px] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-center transition-colors ${isBreak ? 'bg-green-100' : 'bg-red-300'}`}>
        
        <h1 className="text-4xl font-black uppercase mb-2 tracking-tighter">
          {isBreak ? "Pauzička" : "Soustředění"}
        </h1>
        <p className="text-sm font-bold opacity-50 mb-8 uppercase tracking-[0.2em]">
          Pomodoro Timer
        </p>

        {/* DISPLAY: 'tabular-nums' zajistí, že číslice při skákání neposkakují (mají stejnou šířku) */}
        <div className="text-8xl md:text-9xl font-black tabular-nums mb-10 tracking-tight">
          {formatTime()}
        </div>

        {/* OVLÁDACÍ TLAČÍTKA */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setIsActive(!isActive)}
            // Tlačítko mění barvu a text podle toho, jestli běží (isActive)
            className={`py-6 rounded-2xl border-4 border-black text-2xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all ${isActive ? 'bg-white' : 'bg-black text-white'}`}
          >
            {isActive ? "Pauza" : "Start"}
          </button>

          <div className="grid grid-cols-2 gap-4">
            {/* Tlačítka pro rychlé přepnutí režimů */}
            <button
              onClick={() => handleReset(25, false)}
              className="border-2 border-black p-3 rounded-xl font-bold bg-white hover:bg-gray-100"
            >
              Práce (25m)
            </button>
            <button
              onClick={() => handleReset(5, true)}
              className="border-2 border-black p-3 rounded-xl font-bold bg-white hover:bg-gray-100"
            >
              Pauza (5m)
            </button>
          </div>
        </div>
      </div>

      <p className="mt-12 text-center text-gray-500 italic">
        Technika Pomodoro ti pomůže udržet mozek v kondici.
      </p>
    </main>
  );
}