"use client"; // Komponenta je interaktivní, běží u klienta (potřebujeme useState)
import { useState } from "react";
import Link from "next/link";

export default function Ukoly() {
  // 1. STAV PRO SEZNAM: Výchozí pole se dvěma úkoly
  const [ukoly, setUkoly] = useState(["Koupit kafe", "Udělat zápočet"]);
  
  // 2. STAV PRO INPUT: Sem si ukládáme to, co uživatel zrovna píše do políčka
  const [text, setText] = useState("");

  // FUNKCE PRO SMAZÁNÍ KONKRÉTNÍHO ÚKOLU
  const smazUkol = (indexKeSmazani: number) => {
    // Metoda .filter() vytvoří úplně nové pole. 
    // Do nového pole pustí jen ty úkoly, jejichž index (i) se nerovná indexu, který chceme smazat.
    const novePole = ukoly.filter((_, i) => i !== indexKeSmazani);
    setUkoly(novePole); // Aktualizujeme stav -> React překreslí seznam
  };

  // FUNKCE PRO VYMAZÁNÍ VŠEHO
  const smazVsechnyUkoly = () => {
    setUkoly([]); // Jednoduše nastavíme stav na prázdné pole
  };

  return (
    <main className="p-10 max-w-2xl mx-auto">
      {/* Navigace zpět pomocí Next.js Linku */}
      <Link href="/" className="text-blue-500 font-bold hover:underline">← Zpět domů</Link>

      <h1 className="text-3xl font-bold my-5">Seznam úkolů</h1>

      {/* SEKCE PRO PŘIDÁVÁNÍ */}
      <div className="flex gap-2 mb-10">
        <input
          // Kontrolovaný vstup: onChange neustále aktualizuje stav 'text'
          onChange={(e) => setText(e.target.value)}
          value={text} // Hodnota v poli je svázaná se stavem
          placeholder="Napiš úkol..."
          className="border-2 border-black p-3 rounded-xl grow text-black"
        />
        <button
          onClick={() => {
            // Kontrola: Nepřidáváme prázdné texty
            if (text.trim() !== "") { 
              // Použijeme "spread" operátor (...) – vezmeme staré úkoly a na konec přidáme nový text
              setUkoly([...ukoly, text]); 
              setText(""); // Po přidání vymažeme políčko
            }
          }}
          className="bg-black text-white px-6 py-2 rounded-xl font-bold hover:bg-gray-800"
        >
          Přidat
        </button>

        <button
          onClick={() => smazVsechnyUkoly()}
          className="text-red-500 font-bold border-2 border-red-400 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
        >
          Smazat Všechny Úkoly
        </button>
      </div>

      {/* VYKRESLENÍ SEZNAMU */}
      <ul className="space-y-3">
        {/* Metoda .map() projde pole 'ukoly' a pro každý řetězec vytvoří jeden prvek <li> */}
        {ukoly.map((u, i) => (
          // 'key' pomáhá Reactu poznat, který prvek se změnil (nutné u seznamů)
          <li key={i} className="border-2 border-black p-4 rounded-2xl flex justify-between items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-lg font-medium">{u}</span>

            <button
              onClick={() => smazUkol(i)} // Předáme index aktuálního úkolu funkci pro smazání
              className="text-red-500 font-bold border-2 border-red-100 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
            >
              Smazat
            </button>
          </li>
        ))}
      </ul>

      {/* PODMÍNĚNÉ ZOBRAZENÍ: Pokud je pole prázdné, ukážeme tuhle zprávu */}
      {ukoly.length === 0 && (
        <p className="text-center text-gray-500 mt-10 italic">Hotovo! Nemáš žádné úkoly.</p>
      )}
    </main>
  );
}