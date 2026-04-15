"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  // 1. Přidáme state, který nám řekne, jestli už jsme v prohlížeči
  const [isMounted, setIsMounted] = useState(false);

  // 2. Načteme data rovnou při startu (vyhneme se useEffectu a potěšíme linter).
  // typeof window !== "undefined" nás chrání před pádem na serveru.
  const [name, setName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("student-name") || "";
    }
    return "";
  });

  const [signIn, setSignIn] = useState(() => {
    if (typeof window !== "undefined") {
      // !! převede nalezený text na true, pokud tam nic není, vrátí false
      return !!localStorage.getItem("student-name");
    }
    return false;
  });

// 3. Po prvním nahrání stránky přepneme na true (ASYNCHRONNĚ)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    // Správná praxe: po sobě uklidit, pokud by uživatel ze stránky rychle odešel
    return () => clearTimeout(timer);
  }, []);
  // 4. HYDRATION FIX: Dokud nejsme plně v prohlížeči, nevykreslujeme aplikaci.
  // Tím zabráníme tomu, aby server a klient viděli odlišná data.
  if (!isMounted) {
    return null; // Zde může být i loading spinner
  }

  // ---- ZBYTEK TVÉHO KÓDU ZŮSTÁVÁ STEJNÝ ----

  const handleInput = () => {
    if (name.trim() !== "") {
      localStorage.setItem("student-name", name);
      setSignIn(true);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("student-name");
    setName("");
    setSignIn(false);
  };

  if (!signIn) {
    return (
      <main className="flex flex-col items-center p-20">
        <div className="border-4 border-black p-10 rounded-3xl text-center">
          <h1 className="text-3xl font-bold mb-4">Vítej!</h1>
          <input
            type="text"
            placeholder="Jméno..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-lg block w-full mb-4 text-black"
          />
          <button
            onClick={handleInput}
            className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold w-full hover:bg-blue-700"
          >
            Vstoupit
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-10">
      <header className="border-b-4 border-black pb-5 mb-10 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Ahoj, {name}!</h1>
        <button onClick={handleSignOut} className="text-gray-500 underline hover:text-gray-700">Odhlásit</button>


      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
         <Link href="/homeworks" className="border-2 border-black p-6 rounded-2xl hover:bg-green-100 hover:border-green-500 transition">
           <h2 className="text-2xl font-bold mb-2">Úkoly</h2>
           <p>Tvé úkoly.</p>
         </Link>

        <Link href="/schedule" className="border-2 border-black p-6 rounded-2xl hover:bg-red-100 hover:border-red-700 transition">
          <h2 className="text-2xl font-bold mb-2">Rozvrh</h2>
          <p>Kdy mám přednášky.</p>
        </Link>

        <Link href="/motivation" className="border-2 border-black p-6 rounded-2xl hover:bg-yellow-100 hover:border-yellow-400 transition">
          <h2 className="text-2xl font-bold mb-2">Motivace</h2>
          <p>Tip pro dnešní den.</p>
        </Link>

        <Link href="/contacts" className="border-2 border-black p-6 rounded-2xl hover:bg-blue-300 hover:border-blue-500 transition">
          <h2 className="text-2xl font-bold mb-2">Kontakty</h2>
          <p>Tady se nacházejí kontakty na tebe.</p>
        </Link>
      </div>
    </main>
  );
}