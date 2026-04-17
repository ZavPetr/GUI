"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PomodoroPage() {
  // 1. STATE: Anglické názvy stavů
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  // 2. TIMER LOGIC
  useEffect(() => {
  let interval: ReturnType<typeof setInterval>;

  if (isActive) {
    interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          // Jakmile čas vyprší, rovnou interval zastavíme
          clearInterval(interval);

          // Asynchronní zpoždění zabrání ESLint chybě
          setTimeout(() => {
            setIsActive(false);
            alert(isBreak ? "Pauza skončila! Šup do práce." : "Práce hotova! Dej si pauzu.");
          }, 10);

          return 0; // Nastaví sekundy na 0
        }
        return prev - 1; // Jinak prostě odečte 1
      });
    }, 1000);
  }

  return () => clearInterval(interval);
}, [isActive, isBreak]); // 'seconds' už tu není potřeba

  // 3. HELPER FUNCTIONS
  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
  };

  const handleReset = (minutes: number, breakMode: boolean) => {
    setIsActive(false);
    setSeconds(minutes * 60);
    setIsBreak(breakMode);
  };

  return (
    <main className="p-6 md:p-12 max-w-2xl mx-auto min-h-screen text-black font-sans">
      <Link href="/" className="text-blue-600 font-bold hover:underline mb-8 inline-block">
        ← Zpět na Dashboard
      </Link>

      <div className={`border-4 border-black p-10 rounded-[40px] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-center transition-colors ${isBreak ? 'bg-green-100' : 'bg-red-300'}`}>
        {/* ČESKÝ TEXT PRO UŽIVATELE */}
        <h1 className="text-4xl font-black uppercase mb-2 tracking-tighter">
          {isBreak ? "Pauzička" : "Soustředění"}
        </h1>
        <p className="text-sm font-bold opacity-50 mb-8 uppercase tracking-[0.2em]">
          Pomodoro Timer
        </p>

        {/* CLOCK DISPLAY */}
        <div className="text-8xl md:text-9xl font-black tabular-nums mb-10 tracking-tight">
          {formatTime()}
        </div>

        {/* OVLÁDÁNÍ */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`py-6 rounded-2xl border-4 border-black text-2xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all ${isActive ? 'bg-white' : 'bg-black text-white'}`}
          >
            {isActive ? "Pauza" : "Start"}
          </button>

          <div className="grid grid-cols-2 gap-4">
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