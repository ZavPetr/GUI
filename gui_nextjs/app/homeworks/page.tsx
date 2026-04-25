"use client"; 
import { useState } from "react";
import BackLink from "@/components/BackLink";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function Homeworks() {
  const [tasks, setTasks] = useState(["Koupit kafe", "Udělat zápočet"]);

  const [text, setText] = useState("");

  const delTask = (indexToDel: number) => {
    const newArray = tasks.filter((_, i) => i !== indexToDel);
    setTasks(newArray); 
  };

  const delAllTasks = () => {
    setTasks([]);
  };

  return (
    <main className="p-10 max-w-2xl mx-auto">
      <BackLink />

      <h1 className="text-3xl font-bold my-5">Seznam úkolů</h1>

      <div className="flex gap-2 mb-10">
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Napiš úkol..."
          className="border-2 border-black p-3 rounded-xl grow text-black"
        />

        <Button
          variant="black"
          onClick={() => {
            if (text.trim() !== "") {
              setTasks([...tasks, text]);
              setText("");
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

      {tasks.length === 0 && (
        <p className="text-center text-gray-500 mt-10 italic">Hotovo! Nemáš žádné úkoly.</p>
      )}

      <ul className="space-y-3">
        {tasks.map((u, i) => (
          <li key={i}>
            <Card className="flex justify-between items-center py-4">
              <span className="text-lg font-medium">{u}</span>

              <Button
                variant="red"
                onClick={() => delTask(i)}
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