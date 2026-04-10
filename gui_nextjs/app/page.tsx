"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [name, setName] = useState("");
  const [signIn, setSignIn] = useState(false);

  // 1. NAČTENÍ: Když se stránka poprvé "narodí", podívej se do šuplíku
  useEffect(() => {
    const ulozeneJmeno = localStorage.getItem("student-name");
    if (ulozeneJmeno) {
      setName(ulozeneJmeno);
      setSignIn(true);
    }
  }, []);

  // 2. ULOŽENÍ: Funkce, která se spustí při kliku na tlačítko
  const handleInput = () => {
    if (name.trim() !== "") {
      localStorage.setItem("student-name", name); // Šup s tím do šuplíku!
      setSignIn(true);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("student-name"); // Vyprázdnit šuplík
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
           <p>Tady už tvoje jméno bude taky!</p>
         </Link>

        <Link href="/schedule" className="border-2 border-black p-6 rounded-2xl hover:bg-red-100 hover:border-red-700 transition">
          <h2 className="text-2xl font-bold mb-2">Rozvrh</h2>
          <p>Kdy mám přednášky.</p>
        </Link>

        <Link href="/motivation" className="border-2 border-black p-6 rounded-2xl hover:bg-yellow-100 hover:border-yellow-400 transition">
          <h2 className="text-2xl font-bold mb-2">Motivace</h2>
          <p>Tip pro dnešní den.</p>
        </Link>
      </div>
    </main>
  );
}