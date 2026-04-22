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
  const [name, setName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("student-name") || "";
    }
    return "";
  });

  // Inicializace stavu 'signIn' – zjišťujeme, zda už máme jméno uložené
  const [signIn, setSignIn] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("student-name");
    }
    return false;
  });

  // 3. Po úspěšném vykreslení (mount) v prohlížeči přepneme isMounted na true.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // 4. Hydration Fix: Pokud isMounted není true, komponenta nevrací nic (null).
  if (!isMounted) {
    return null;
  }

  // ---- LOGIKA FUNKCÍ ----

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

  // Login obrazovka
  if (!signIn) {
    return (
      <main className="flex flex-col items-center p-20">
        <Card className="text-center p-10">
          <h1 className="text-3xl font-bold mb-4">Vítej!</h1>
          <input
            type="text"
            placeholder="Jméno..."
            value={name}
            onChange={(e) => setName(e.target.value)}
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
      <header className="border-b-4 border-black pb-5 mb-10 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Ahoj, {name}!</h1>
        <button onClick={handleSignOut} className="text-gray-500 underline hover:text-gray-700">Odhlásit</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link href="/#">
          <Card interactive className="hover:bg-green-100">
            <h2 className="text-2xl font-bold mb-2">Úkoly</h2>
            <p>Tvé úkoly.</p>
          </Card>
        </Link>

        <Link href="/#">
          <Card interactive className="hover:bg-red-100">
            <h2 className="text-2xl font-bold mb-2">Rozvrh</h2>
            <p>Kdy mám přednášky.</p>
          </Card>
        </Link>

        <Link href="/#">
          <Card interactive className="hover:bg-yellow-100">
            <h2 className="text-2xl font-bold mb-2">Motivace</h2>
            <p>Tip pro dnešní den.</p>
          </Card>
        </Link>

        <Link href="/#">
          <Card interactive className="hover:bg-blue-300">
            <h2 className="text-2xl font-bold mb-2">Kontakty</h2>
            <p>Tady se nacházejí kontakty na tebe.</p>
          </Card>
        </Link>
      </div>
    </main>
  );
}