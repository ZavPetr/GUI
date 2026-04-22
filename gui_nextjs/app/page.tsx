"use client"; // Označujeme komponentu jako klientskou, protože používáme hooky (state, effect) a browser API (localStorage)
import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function Home() {
  // 1. Pomocný stav pro vyřešení "Hydratace" – zajistí, aby se kód spustil až po vykreslení v prohlížeči
  const [isMounted, setIsMounted] = useState(false);

  // 2. Inicializace stavu 'name' pomocí funkce:
  // Tento kód se spustí pouze jednou při prvním načtení komponenty.
  // Kontrola 'typeof window' je nutná, protože Next.js kód zkouší nejdříve spustit na serveru, kde localStorage neexistuje.
  const [name, setName] = useState(() => {
    if (typeof window !== "undefined") {
      // Pokusíme se vytáhnout uložené jméno z paměti prohlížeče
      return localStorage.getItem("student-name") || "";
    }
    return "";
  });

  // Inicializace stavu 'signIn' – zjišťujeme, zda už máme jméno uložené
  const [signIn, setSignIn] = useState(() => {
    if (typeof window !== "undefined") {
      // Dvojitý vykřičník převede existenci řetězce na logickou hodnotu (true/false)
      return !!localStorage.getItem("student-name");
    }
    return false;
  });

  // 3. Po úspěšném vykreslení (mount) v prohlížeči přepneme isMounted na true.
  // Používáme k tomu useEffect, který v Next.js běží výhradně na straně klienta.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    // Čistící funkce: v dobré praxi odstraňujeme časovače, aby nezůstávaly v paměti
    return () => clearTimeout(timer);
  }, []);

  // 4. Hydration Fix: Pokud isMounted není true, komponenta nevrací nic (null).
  // Tím zabráníme chybám, kdy by server vygeneroval jiný obsah než klient (protože server nezná obsah localStorage).
  if (!isMounted) {
    return null;
  }

  // ---- LOGIKA FUNKCÍ ----

  // Funkce, která uloží jméno do paměti prohlížeče a přepne nás do aplikace
  const handleInput = () => {
    if (name.trim() !== "") {
      localStorage.setItem("student-name", name);
      setSignIn(true);
    }
  };

  // Funkce pro odhlášení – vymaže data z paměti a resetuje stavy
  const handleSignOut = () => {
    localStorage.removeItem("student-name");
    setName("");
    setSignIn(false);
  };

  // Podmínka pro zobrazení úvodní obrazovky (Login), pokud uživatel není "přihlášen"
  if (!signIn) {
    return (
      <main className="flex flex-col items-center p-20">
        <Card className="text-center p-10">
          <h1 className="text-3xl font-bold mb-4">Vítej!</h1>
          {/* Input je "kontrolovaná komponenta" – jeho hodnota je svázaná přímo se stavem 'name' */}
          <input
            type="text"
            placeholder="Jméno..."
            value={name}
            onChange={(e) => setName(e.target.value)} // Při každém úhozu aktualizujeme stav
            className="border-2 border-gray-300 p-2 rounded-lg block w-full mb-4 text-black"
          />
          <Button onClick={handleInput} variant="black" className="w-full">
            Vstoupit
          </Button>
        </Card>
      </main>
    );
  }

  return (
    <main className="p-10">
      {/* Hlavička aplikace s dynamickým jménem a možností odhlášení */}
      <header className="border-b-4 border-black pb-5 mb-10 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Ahoj, {name}!</h1>
        <button onClick={handleSignOut} className="text-gray-500 underline hover:text-gray-700">Odhlásit</button>
      </header>

      {/* Mřížka s navigací (Grid) – definujeme sloupce pro mobil a pro počítač (md:) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Komponenta Link od Next.js zajišťuje bleskové přepínání stránek bez refreshování prohlížeče */}
        <Link href="/homeworks">
          <Card interactive className="hover:bg-green-100">
            <h2 className="text-2xl font-bold mb-2">Úkoly</h2>
            <p>Tvé úkoly.</p>
          </Card>
        </Link>

        <Link href="/schedule">
          <Card interactive className="hover:bg-red-100">
            <h2 className="text-2xl font-bold mb-2">Rozvrh</h2>
            <p>Kdy mám přednášky.</p>
          </Card>
        </Link>

        <Link href="/motivation">
          <Card interactive className="hover:bg-yellow-100">
            <h2 className="text-2xl font-bold mb-2">Motivace</h2>
            <p>Tip pro dnešní den.</p>
          </Card>
        </Link>

        {/* #### Úkol pro studenty #### */}
        <Link href="/contacts">
          <Card interactive className="hover:bg-blue-300">
            <h2 className="text-2xl font-bold mb-2">Kontakty</h2>
            <p>Tady se nacházejí kontakty na tebe.</p>
          </Card>
        </Link>
        {/* ########################### */}

        <Link href="/pomodoro">
          <Card interactive className="hover:bg-purple-300">
            <h2 className="text-2xl font-bold mb-2">Pomodoro Timer</h2>
            <p>Tady se nachází časovač pro metodu Pomodoro</p>
          </Card>
        </Link>
      </div>
    </main>
  );
}