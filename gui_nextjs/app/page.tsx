"use client"; // Nutné! Používáme localStorage a stavy, což server neumí.

import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function Home() {
  // --- 1. HYDRATAČNÍ POJISTKA ---
  // Next.js se snaží stránku předpřipravit na serveru. Ale server nezná tvoji "localStorage".
  // isMounted zajistí, že se interaktivní části ukážou až ve chvíli, kdy prohlížeč vše načte.
  const [isMounted, setIsMounted] = useState(false);

  // --- 2. STAVY PRO JMÉNO A PŘIHLÁŠENÍ ---
  // Všimni si, že v useState je funkce () => { ... }.
  // To je "Lazy Initialization" - spustí se to jen jednou při úplně prvním načtení.

  const [name, setName] = useState(() => {
    // Musíme se ptát, jestli jsme v prohlížeči (window), jinak by kód na serveru spadl.
    if (typeof window !== "undefined") {
      return localStorage.getItem("student-name") || "";
    }
    return "";
  });

  const [signIn, setSignIn] = useState(() => {
    if (typeof window !== "undefined") {
      // !! (dvojitý vykřičník) je super trik.
      // Udělá z "Karel" hodnotu true a z null hodnotu false.
      return !!localStorage.getItem("student-name");
    }
    return false;
  });

  // --- 3. ŽIVOTNÍ CYKLUS (useEffect) ---
  useEffect(() => {
    // Jakmile proběhne tento kód, víme, že jsme v prohlížeči.
    setIsMounted(true);
  }, []);

  // Pokud ještě nejsme "namontovaní" v prohlížeči, neukazujeme nic.
  // Předcházíme tím problému, kdy by server poslal "Vítej, cizinče" a klient by hned blikl "Ahoj, Karle".
  if (!isMounted) {
    return null;
  }

  // --- 4. FUNKCE (LOGIKA) ---

  const handleInput = () => {
    if (name.trim() !== "") { // .trim() odstraní mezery na začátku a konci
      localStorage.setItem("student-name", name); // Uložíme do "šuplíku" v prohlížeči
      setSignIn(true);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("student-name"); // Vymažeme šuplík
    setName("");
    setSignIn(false);
  };

  // --- 5. RENDER: PŘIHLAŠOVACÍ OBRAZOVKA ---
  if (!signIn) {
    return (
      // items-center -> vycentruje kartu vodorovně
      <main className="flex flex-col items-center p-20">
        <Card className="text-center p-10">
          <h1 className="text-3xl font-bold mb-4">Vítej!</h1>
          <input
            type="text"
            placeholder="Jméno..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            // block w-full -> Input zabere celou šířku karty. text-black -> jistota čitelnosti.
            className="border-2 border-gray-300 p-2 rounded-lg block w-full mb-4 text-black"
          />
          <Button onClick={handleInput} variant="black" className="w-full">
            Vstoupit
          </Button>
        </Card>
      </main>
    );
  }

  // --- 6. RENDER: HLAVNÍ DASHBOARD ---
  return (
    <main className="p-10">
      {/* HEADER: border-b-4 -> tlustá spodní čára. justify-between -> jméno vlevo, odhlásit vpravo. */}
      <header className="border-b-4 border-black pb-5 mb-10 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Ahoj, {name}!</h1>
        {/* underline -> podtržení textu. hover:text-gray-700 -> ztmavne při najetí. */}
        <button onClick={handleSignOut} className="text-gray-500 underline hover:text-gray-700">
          Odhlásit
        </button>
      </header>

      {/* GRID (MŘÍŽKA): Tohle je to nejdůležitější pro vzhled.
          grid-cols-1 -> Na mobilu budou karty pod sebou (1 sloupec).
          md:grid-cols-3 -> Od tabletu/PC výš (md:) budou 3 sloupce vedle sebe.
          gap-5 -> Mezery mezi kartami.
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Link: Next.js nástroj. Na rozdíl od <a> neobnovuje celou stránku,
            ale jen vymění obsah, takže je to bleskově rychlé. */}
        <Link href="/homeworks">
          {/* interactive: Naše prop z Card.tsx, která přidává ten "klikací" efekt. */}
          <Card interactive className="hover:bg-green-100 transition-colors">
            <h2 className="text-2xl font-bold mb-2">Úkoly</h2>
            <p>Tvé úkoly.</p>
          </Card>
        </Link>

        <Link href="/schedule">
          <Card interactive className="hover:bg-red-100 transition-colors">
            <h2 className="text-2xl font-bold mb-2">Rozvrh</h2>
            <p>Kdy mám přednášky.</p>
          </Card>
        </Link>

        <Link href="/motivation">
          <Card interactive className="hover:bg-yellow-100 transition-colors">
            <h2 className="text-2xl font-bold mb-2">Motivace</h2>
            <p>Tip pro dnešní den.</p>
          </Card>
        </Link>

        <Link href="/contacts">
          {/* bg-blue-300 -> Tahle barva je výraznější, proto "hover:" změníme na sytější. */}
          <Card interactive className="hover:bg-blue-300 transition-colors">
            <h2 className="text-2xl font-bold mb-2">Kontakty</h2>
            <p>Tady se nacházejí kontakty na tebe.</p>
          </Card>
        </Link>

        <Link href="/pomodoro">
          <Card interactive className="hover:bg-purple-300 transition-colors">
            <h2 className="text-2xl font-bold mb-2">Pomodoro Timer</h2>
            <p>Tady se nachází časovač pro metodu Pomodoro</p>
          </Card>
        </Link>
      </div>
    </main>
  );
}