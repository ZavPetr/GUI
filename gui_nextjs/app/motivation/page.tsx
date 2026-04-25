import BackLink from "@/components/BackLink";
import Card from "@/components/Card";

export default async function Motivation() {

  const res = await fetch("https://api.adviceslip.com/advice", {
    next: { revalidate: 30 }
  });

  const data = await res.json();

  const motivation = data.slip.advice;

  return (
    <main className="p-10 max-w-2xl mx-auto">
      <BackLink />

      <Card className="mt-12 p-10 bg-yellow-50 rounded-[40px]">

        <h1 className="text-2xl font-black uppercase mb-6 tracking-tight">
          Rada #{data.slip.id} pro dnešní den:
        </h1>

        <p className="text-3xl font-bold italic leading-tight text-slate-800">
          {motivation}
        </p>
      </Card>
    </main>
  );
}