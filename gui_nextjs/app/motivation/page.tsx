import Link from "next/link";

export default async function Motivation() {

  const res = await fetch("https://api.adviceslip.com/advice", { cache: "no-store" });
  const data = await res.json();

  const motivation = data.slip.advice;

  return (
    <main className="p-10 max-w-2xl mx-auto">
      <Link href="/" className="text-blue-500 font-bold hover:underline">
        ← Zpět na Dashboard
      </Link>

      <div className="mt-12 border-4 border-black p-10 rounded-[40px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-yellow-50">
        <h1 className="text-2xl font-black uppercase mb-6 tracking-tight">
          Rada #{data.slip.id} pro dnešní den:
        </h1>

      <p className="text-3xl font-bold italic leading-tight text-slate-800">
         {motivation}
      </p>
      </div>
    </main>
  );
}