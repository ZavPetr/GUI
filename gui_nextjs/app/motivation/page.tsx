import Link from "next/link";

// 1. ASYNC: Komponenta je asynchronní, což nám dovoluje používat 'await' přímo v jejím těle.
// Jelikož zde není "use client", běží tento kód na serveru.
export default async function Motivace() {

  // 2. FETCH: Voláme externí API (v tomto případě server, který vrací náhodné rady).
  // { cache: 'no-store' } je klíčové: říká Next.js, aby si výsledek nepamatoval.
  // Díky tomu dostane uživatel při každém načtení stránky novou radu.
  const res = await fetch("https://api.adviceslip.com/advice", { cache: "no-store" });
  
  // Převádíme proud dat (stream) z odpovědi na čitelný JavaScriptový objekt (JSON).
  const data = await res.json();

  // 3. EXTRAKCE DAT: API vrací objekt, kde je rada schovaná v hlubší struktuře.
  // Musíme se do ní "zanořit" přes data.slip.advice.
  const rada = data.slip.advice;

  return (
    <main className="p-10 max-w-2xl mx-auto">
      {/* Link zajišťuje rychlou navigaci v rámci naší aplikace */}
      <Link href="/" className="text-blue-500 font-bold hover:underline">
        ← Zpět na Dashboard
      </Link>

      {/* Grafický kontejner ve stylu "neobrutalismu" (tlusté čáry, tvrdý stín) */}
      <div className="mt-12 border-4 border-black p-10 rounded-[40px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-yellow-50">
        <h1 className="text-2xl font-black uppercase mb-6 tracking-tight">
          Rada pro dnešní den:
        </h1>

        {/* ZOBRAZENÍ ZÍSKANÉ RADY: Text vložíme dynamicky pomocí složených závorek */}
        <p className="text-3xl font-bold italic leading-tight text-slate-800">
          {rada}
        </p>
      </div>
    </main>
  );
}