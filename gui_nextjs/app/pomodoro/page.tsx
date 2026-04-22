"use client"; // Potřebujeme interaktivitu a Hooky (state, effect)
import { useState, useEffect } from "react";
import BackLink from "@/components/BackLink";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function PomodoroPage() {
  // 1. STAV (STATE):
  // seconds: Aktuální čas v sekundách
  const [seconds, setSeconds] = useState(25 * 60);
  // isActive: Běží časovač?
  const [isActive, setIsActive] = useState(false);
  // isBreak: Jsme v režimu pauzy?
  const [isBreak, setIsBreak] = useState(false);

  // 2. LOGIKA ČASOVAČE (TIMER ENGINE)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setTimeout(() => {
              setIsActive(false);
              alert(isBreak ? "Pauza skončila! Šup do práce." : "Práce hotova! Dej si pauzu.");
            }, 10);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    // ÚKLIDOVÁ FUNKCE (CLEANUP): Zastaví interval při vypnutí nebo změně
    return () => clearInterval(interval);
  }, [isActive, isBreak]);

  // 3. POMOCNÁ FUNKCE PRO FORMÁT ČASU
  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
  };

  // FUNKCE PRO RESET / PŘEPNUTÍ REŽIMU
  const handleReset = (minutes: number, breakMode: boolean) => {
    setIsActive(false);
    setSeconds(minutes * 60);
    setIsBreak(breakMode);
  };

  return (
    <main className="p-6 md:p-12 max-w-2xl mx-auto min-h-screen">
      <BackLink />

      {/* DYNAMICKÝ KONTEJNER: Barva pozadí se mění podle stavu isBreak */}
      <Card className={`p-10 text-center transition-colors rounded-[40px] ${isBreak ? '!bg-green-100' : '!bg-red-300'}`}>
        <h1 className="text-4xl font-black uppercase mb-2 tracking-tighter">
          {isBreak ? "Pauzička" : "Soustředění"}
        </h1>
        <p className="text-sm font-bold opacity-50 mb-8 uppercase tracking-[0.2em]">Pomodoro Timer</p>

        {/* DISPLAY: 'tabular-nums' zajistí stabilitu číslic */}
        <div className="text-8xl md:text-9xl font-black tabular-nums mb-10 tracking-tight">
          {formatTime()}
        </div>

        {/* OVLÁDACÍ TLAČÍTKA */}
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => setIsActive(!isActive)}
            variant={isActive ? "white" : "black"}
            className="py-6 text-2xl"
          >
            {isActive ? "Pauza" : "Start"}
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => handleReset(25, false)}>Práce (25m)</Button>
            <Button onClick={() => handleReset(5, true)}>Pauza (5m)</Button>
          </div>
        </div>
      </Card>

      <p className="mt-12 text-center text-gray-500 italic">
        Technika Pomodoro ti pomůže udržet mozek v kondici.
      </p>
    </main>
  );
}