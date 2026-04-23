"use client"; // Nutné! Máme tu tlačítka, psaní do inputu a změnu seznamu.
import { useState } from "react";
import BackLink from "@/components/BackLink";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function Homeworks() {
  // --- 1. STAVY (STATE) ---

  // tasks: Pole řetězců. React tohle pole hlídá – když do něj něco přidáš,
  // automaticky překreslí celý seznam na obrazovce.
  const [tasks, setTasks] = useState(["Koupit kafe", "Udělat zápočet"]);

  // text: To, co je zrovna napsané v bílém políčku.
  // Potřebujeme to jako samostatný stav, abychom věděli, co pak přidat do seznamu.
  const [text, setText] = useState("");

  // --- 2. FUNKCE PRO ÚPRAVU SEZNAMU ---

  // delTask: Smaže jeden konkrétní úkol podle jeho pořadí (indexu).
  const delTask = (indexToDel: number) => {
    // .filter() je "síto". Projde staré pole a vytvoří nové.
    // i !== indexToDel znamená: "Pusť dál všechno, kromě toho jednoho, co chci smazat."
    const newArray = tasks.filter((_, i) => i !== indexToDel);
    setTasks(newArray); // Šoupneme nové pole do stavu
  };

  // delAllTasks: Vyčistí všechno.
  const delAllTasks = () => {
    setTasks([]); // Nastavíme pole na úplně prázdné: []
  };

  return (
    // max-w-2xl mx-auto -> Omezíme šířku a vycentrujeme, aby úkoly "nelítaly" po stranách.
    <main className="p-10 max-w-2xl mx-auto">
      <BackLink />

      <h1 className="text-3xl font-bold my-5">Seznam úkolů</h1>

      {/* SEKCE PRO PŘIDÁVÁNÍ: flex a gap-2 zajistí, že input a tlačítka jsou v jedné lajně. */}
      <div className="flex gap-2 mb-10">
        <input
          // KONTROLOVANÝ VSTUP:
          // onChange -> Pokaždé, když klepneš do klávesnice, uložíme to do stavu 'text'.
          onChange={(e) => setText(e.target.value)}
          // value -> Políčko se vždycky řídí tím, co je ve stavu.
          value={text}
          placeholder="Napiš úkol..."
          // grow -> Input se roztáhne a zabere veškeré volné místo, co tlačítka nezaberou.
          className="border-2 border-black p-3 rounded-xl grow text-black"
        />

        <Button
          variant="black"
          onClick={() => {
            // .trim() -> Odstraní mezery. "  " se změní na "" a podmínka ho nepustí dál.
            if (text.trim() !== "") {
              // SPREAD OPERÁTOR (...tasks):
              // Říkáme: "Vezmi všechny staré úkoly a na konec přilep ten nový text."
              // V Reactu NIKDY neměníme pole přímo (např. tasks.push()), musíme vytvořit nové!
              setTasks([...tasks, text]);
              setText(""); // Vymažeme políčko, aby uživatel mohl psát další úkol
            }
          }}
        >
          Přidat
        </Button>

        <Button
          variant="red"
          onClick={() => delAllTasks()}
        >
          Smazat Vše
        </Button>
      </div>

      {/* PODMÍNĚNÉ ZOBRAZENÍ:
          tasks.length === 0 -> Pokud je pole prázdné, vykresli text vpravo od '&&'.
      */}
      {tasks.length === 0 && (
        <p className="text-center text-gray-500 mt-10 italic">Hotovo! Nemáš žádné úkoly.</p>
      )}

      {/* VYKRESLENÍ SEZNAMU:
          space-y-3 -> Udělá automaticky mezery mezi všemi <li> uvnitř seznamu.
      */}
      <ul className="space-y-3">
        {/* Projdeme pole a pro každý text (u) vytvoříme řádek. i je pořadové číslo (0, 1, 2...). */}
        {tasks.map((u, i) => (
          // key={i} -> Reactu tím dáváme jmenovku, aby se v těch řádcích vyznal.
          <li key={i}>
            <Card className="flex justify-between items-center py-4">
              {/* text-lg -> Větší písmo. font-medium -> Trochu tučnější. */}
              <span className="text-lg font-medium">{u}</span>

              <Button
                variant="red"
                onClick={() => delTask(i)} // Funkci řekneme, který index má zlikvidovat
              >
                Smazat
              </Button>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  );
}