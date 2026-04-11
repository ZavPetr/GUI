import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10">
      <header className="border-b-4 border-black pb-5 mb-10 flex justify-between items-center">
        {/* ZDE POUŽIJEME VLASTNÍ CSS TŘÍDU: hlavni-nadpis */}
        <h1 className="hlavni-nadpis">Ahoj, Studente!</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
         {/* ZDE POUŽIJEME VLASTNÍ CSS TŘÍDU: karta-stin */}
         <Link href="/homeworks" className="border-2 border-black p-6 rounded-2xl bg-white karta-stin">
           <h2 className="text-2xl font-bold mb-2">Úkoly</h2>
           <p>Tady už tvoje jméno bude taky!</p>
         </Link>

        <Link href="/schedule" className="border-2 border-black p-6 rounded-2xl bg-white karta-stin">
          <h2 className="text-2xl font-bold mb-2">Rozvrh</h2>
          <p>Kdy mám přednášky.</p>
        </Link>

        <Link href="/motivation" className="border-2 border-black p-6 rounded-2xl bg-white karta-stin">
          <h2 className="text-2xl font-bold mb-2">Motivace</h2>
          <p>Tip pro dnešní den.</p>
        </Link>
      </div>
    </main>
  );
}