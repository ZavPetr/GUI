"use client";
import { useState } from "react";
import Link from "next/link";

export default function Homeworks() {
  const [tasks, setTasks] = useState(["Koupit kafe", "Udělat zápočet"]);
  
  const [text, setText] = useState("");

  const delTasks = (indexToDel: number) => {
    const newArray = tasks.filter((_, i) => i !== indexToDel);
    setTasks(newArray);
  };

  const delAllTasks = () => {
    setTasks([]);
  };

  return (
    <main className="p-10 max-w-2xl mx-auto">
      <Link href="/" className="text-blue-500 font-bold hover:underline">← Zpět domů</Link>

      <h1 className="text-3xl font-bold my-5">Seznam úkolů</h1>

      <div className="flex gap-2 mb-10">
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Napiš úkol..."
          className="border-2 border-black p-3 rounded-xl grow text-black"
        />
        <button
          onClick={() => {
            if (text.trim() !== "") { 
              setTasks([...tasks, text]); 
              setText("");
            }
          }}
          className="bg-black text-white px-6 py-2 rounded-xl font-bold hover:bg-gray-800"
        >
          Přidat
        </button>

        <button
          onClick={() => delAllTasks()}
          className="text-red-500 font-bold border-2 border-red-400 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
        >
          Smazat Všechny Úkoly
        </button>
      </div>

      <ul className="space-y-3">
        {tasks.map((u, i) => (
          <li key={i} className="border-2 border-black p-4 rounded-2xl flex justify-between items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-lg font-medium">{u}</span>

            <button
              onClick={() => delTasks(i)}
              className="text-red-500 font-bold border-2 border-red-100 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
            >
              Smazat
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="text-center text-gray-500 mt-10 italic">Hotovo! Nemáš žádné úkoly.</p>
      )}
    </main>
  );
}