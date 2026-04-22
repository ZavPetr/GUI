"use client"; // Komponenta je interaktivní, běží u klienta (potřebujeme useState)
import { useState } from "react";
import BackLink from "@/components/BackLink";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function Homeworks() {
  // 1. STAV PRO SEZNAM: Výchozí pole se dvěma úkoly
  const [tasks, setTasks] = useState(["Koupit kafe", "Udělat zápočet"]);

  // 2. STAV PRO INPUT: Sem si ukládáme to, co uživatel zrovna píše do políčka
  const [text, setText] = useState("");

  // FUNKCE PRO SMAZÁNÍ KONKRÉTNÍHO ÚKOLU
  const delTask = (indexToDel: number) => {
    // Metoda .filter() vytvoří úplně nové pole.
    // Do nového pole pustí jen ty úkoly, jejichž index (i) se nerovná indexu, který chceme smazat.
    const newArray = tasks.filter((_, i) => i !== indexToDel);
    setTasks(newArray); // Aktualizujeme stav -> React překreslí seznam
  };

  // FUNKCE PRO VYMAZÁNÍ VŠEHO
  // #### Úkol pro studenty ####
  const delAllTasks = () => {
    setTasks([]); // Jednoduše nastavíme stav na prázdné pole
  };
  // ###########################

  return (
    <main className="p-10 max-w-2xl mx-auto">
      {/* Navigace zpět pomocí naší nové komponenty */}
      <BackLink />

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
        <Button
          variant="black"
          onClick={() => {
            // Kontrola: Nepřidáváme prázdné texty
            if (text.trim() !== "") { // <-- Úkol pro studenty
              // Použijeme "spread" operátor (...) – vezmeme staré úkoly a na konec přidáme nový text
              setTasks([...tasks, text]);
              setText(""); // Po přidání vymažeme políčko
            }
          }}
        >
          Přidat
        </Button>

        {/* #### Úkol pro studenty #### */}
        <button
          onClick={() => delAllTasks()}
          className="text-red-500 font-bold px-3 hover:underline"
        >
          Smazat Vše
        </button>
        {/* ########################### */}
      </div>

      {/* PODMÍNĚNÉ ZOBRAZENÍ: Pokud je pole prázdné, ukážeme tuhle zprávu */}
      {tasks.length === 0 && (
        <p className="text-center text-gray-500 mt-10 italic">Hotovo! Nemáš žádné úkoly.</p>
      )}

      {/* VYKRESLENÍ SEZNAMU */}
      <ul className="space-y-3">
        {/* Metoda .map() projde pole 'tasks' a pro každý řetězec vytvoří jeden prvek Card */}
        {tasks.map((u, i) => (
          // 'key' pomáhá Reactu poznat, který prvek se změnil (nutné u seznamů)
          <li key={i}>
            <Card className="flex justify-between items-center py-4">
              <span className="text-lg font-medium">{u}</span>
              <button
                onClick={() => delTask(i)} // Předáme index aktuálního úkolu funkci pro smazání
                className="text-red-500 font-bold hover:underline"
              >
                Smazat
              </button>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  );
}