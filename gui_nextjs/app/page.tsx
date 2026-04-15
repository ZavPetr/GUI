// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  // Načteme jméno ze šuplíku (chráníme se před chybou na serveru)
  const [name, setName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("student-name") || "";
    }
    return "";
  });

  const [signIn, setSignIn] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("student-name");
    }
    return false;
  });

  // Trik pro Next.js: Přepneme na true až po načtení v prohlížeči (asynchronně)
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Dokud není aplikace načtena v prohlížeči, neukazuj nic (Hydration Fix)
  if (!isMounted) return null;

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

  // --------------------------------------------------------
  // OBRAZOVKA 1: NEPŘIHLÁŠENÝ UŽIVATEL
  // --------------------------------------------------------
  if (!signIn) {
    return (
      <main className="flex flex-col items-center p-20">
        <div className="border-4 border-black p-10 rounded-3xl text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white karta-stin">
          <h1 className="hlavni-nadpis mb-4">Vítej!</h1>
          <input
            type="text"
            placeholder="Tvé jméno..."
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

  // --------------------------------------------------------
  // OBRAZOVKA 2: PŘIHLÁŠENÝ UŽIVATEL (Dashboard)
  // --------------------------------------------------------
  return (
    <main className="p-10">
      <header className="border-b-4 border-black pb-5 mb-10 flex justify-between items-center">
        <h1 className="hlavni-nadpis">Ahoj, {name}!</h1>
        <button onClick={handleSignOut} className="text-gray-500 underline hover:text-gray-700">
          Odhlásit
        </button>
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