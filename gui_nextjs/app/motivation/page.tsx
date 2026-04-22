import BackLink from "@/components/BackLink";
import Card from "@/components/Card";

// 1. ASYNC: Komponenta je asynchronní, což nám dovoluje používat 'await'.
export default async function Motivation() {

  // 2. FETCH: Voláme externí API.
  const res = await fetch("https://api.adviceslip.com/advice", {
    next: { revalidate: 30 } // Stránka se přegeneruje nejdříve po 30 sekundách
  });

  const data = await res.json();

  // 3. EXTRAKCE DAT: API vrací objekt, kde je rada schovaná v hlubší struktuře data.slip.advice.
  const motivation = data.slip.advice;

  return (
    <main className="p-10 max-w-2xl mx-auto">
      <BackLink />

      {/* Grafický kontejner ve stylu "neobrutalismu" pomocí komponenty Card */}
      <Card className="mt-12 p-10 bg-yellow-50 rounded-[40px]">
        <h1 className="text-2xl font-black uppercase mb-6 tracking-tight">
          {/* #### Úkol pro studenty #### */}
          Rada #{data.slip.id} pro dnešní den:
        </h1>

        {/* ZOBRAZENÍ ZÍSKANÉ RADY: Text vložíme dynamicky pomocí složených závorek */}
        <p className="text-3xl font-bold italic leading-tight text-slate-800">
          {motivation}
        </p>
      </Card>
    </main>
  );
}