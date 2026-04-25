"use client";
import { useState, useEffect } from "react";
import BackLink from "@/components/BackLink";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function PomodoroPage() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

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

    return () => clearInterval(interval);
  }, [isActive, isBreak]);

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
    <main className="p-6 md:p-12 max-w-2xl mx-auto min-h-screen">
      <BackLink />

      <Card className={`p-10 text-center transition-colors rounded-[40px] ${isBreak ? '!bg-green-100' : '!bg-red-300'}`}>

        <h1 className="text-4xl font-black uppercase mb-2 tracking-tighter">
          {isBreak ? "Pauzička" : "Soustředění"}
        </h1>

        <p className="text-sm font-bold opacity-50 mb-8 uppercase tracking-[0.2em]">Pomodoro Timer</p>

        <div className="text-8xl md:text-9xl font-black tabular-nums mb-10 tracking-tight">
          {formatTime()}
        </div>

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