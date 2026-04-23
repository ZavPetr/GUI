"use client"; // Říkáme Next.js, že tohle není statický text, ale živá stránka, co reaguje na klikání
import { useState, useEffect } from "react";
import BackLink from "@/components/BackLink";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function PomodoroPage() {
  // --- 1. STAVY (STATE) ---
  // Tady si React pamatuje věci, které se mění v čase. Když se změní stav, stránka se překreslí.

  // seconds: Kolik vteřin zbývá. (25 * 60 = 1500 vteřin)
  const [seconds, setSeconds] = useState(25 * 60);
  // isActive: Pravda/Nepravda. Běží ty vteřiny zrovna dolů?
  const [isActive, setIsActive] = useState(false);
  // isBreak: Jsme v režimu odpočinku? (Změní barvu a nápis)
  const [isBreak, setIsBreak] = useState(false);

  // --- 2. LOGIKA ČASOVAČE (EFFECT) ---
  // useEffect hlídá změny v závislostech [isActive, isBreak] a podle toho spouští kód uvnitř.
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isActive) {
      // Pokud je Start, vytvoříme "tikání" každých 1000ms (1 sekunda)
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            // Čas vypršel! Zastavíme tikání
            clearInterval(interval);

            // Krátký timeout zajistí, že se na displeji nejdřív ukáže 0:00 a až pak alert
            setTimeout(() => {
              setIsActive(false);
              alert(isBreak ? "Pauza skončila! Šup do práce." : "Práce hotova! Dej si pauzu.");
            }, 10);
            return 0;
          }
          return prev - 1; // Každou sekundu odečteme jednu
        });
      }, 1000);
    }

    // ČISTÍCÍ FUNKCE (Cleanup): Extrémně důležitá!
    // Pokud odejdeš ze stránky nebo vypneš časovač, tohle ho "zabije", aby neběžel tajně v paměti.
    return () => clearInterval(interval);
  }, [isActive, isBreak]);

  // --- 3. POMOCNÉ FUNKCE ---

  // formatTime: Přepočítá vteřiny na lidský formát (např. 1499 -> 24:59)
  const formatTime = () => {
    const minutes = Math.floor(seconds / 60); // Math.floor zaokrouhlí dolů na celé minuty
    const remainingSeconds = seconds % 60;   // % (modulo) vrátí zbytek po dělení (vteřiny)
    // Pokud je vteřin míň než 10, přidáme před ně "0" (např. 4:05 místo 4:5)
    return `${minutes}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
  };

  // handleReset: Nastaví vše do původního stavu pro nový režim
  const handleReset = (minutes: number, breakMode: boolean) => {
    setIsActive(false); // Zastavit
    setSeconds(minutes * 60); // Nastavit čas
    setIsBreak(breakMode); // Přepnout náladu (barvu)
  };

  return (
    // p-6 md:p-12 -> Padding (vnitřní okraj). Na mobilu malý (6), na počítači (md:) velký (12).
    // max-w-2xl -> Maximální šířka kontejneru, aby se timer neroztáhl přes celou obrazovku.
    // mx-auto -> Vycentrování celého bloku na střed stránky.
    <main className="p-6 md:p-12 max-w-2xl mx-auto min-h-screen">
      <BackLink />

      {/* Card: Tady používáme Template Literals (ty zpětné uvozovky).
        transition-colors -> Zajistí, že změna barvy z červené na zelenou bude plynulá (animovaná).
        !bg-green-100 -> Vykřičník vynucuje tuhle barvu, i kdyby komponenta Card měla svoji vlastní.
      */}
      <Card className={`p-10 text-center transition-colors rounded-[40px] ${isBreak ? '!bg-green-100' : '!bg-red-300'}`}>

        {/* font-black -> Extra tučné písmo. tracking-tighter -> Písmena jsou víc u sebe (moderní vzhled). */}
        <h1 className="text-4xl font-black uppercase mb-2 tracking-tighter">
          {isBreak ? "Pauzička" : "Soustředění"}
        </h1>

        {/* opacity-50 -> Text je poloprůhledný. tracking-[0.2em] -> Velké mezery mezi písmeny. */}
        <p className="text-sm font-bold opacity-50 mb-8 uppercase tracking-[0.2em]">Pomodoro Timer</p>

        {/* tabular-nums -> KLÍČOVÁ TŘÍDA! Každé číslo má stejnou šířku.
           Bez toho by se ti při každé vteřině celý timer klepal (protože '1' je užší než '8').
        */}
        <div className="text-8xl md:text-9xl font-black tabular-nums mb-10 tracking-tight">
          {formatTime()}
        </div>

        {/* flex flex-col gap-4 -> Tlačítka jsou v jednom sloupci s mezerou 4 mezi nimi. */}
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => setIsActive(!isActive)}
            variant={isActive ? "white" : "black"} // Dynamicky měníme barvu tlačítka Start/Pauza
            className="py-6 text-2xl"
          >
            {isActive ? "Pauza" : "Start"}
          </Button>

          {/* grid-cols-2 -> Rozdělí prostor na dva stejné sloupce vedle sebe. */}
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