import BackLink from "@/components/BackLink";
import Card from "@/components/Card";

// 1. ASYNC SERVER COMPONENT:
// Tato komponenta neběží u tebe v prohlížeči, ale na serveru Next.js.
// Díky 'async' můžeme použít 'await', což znamená: "Zastav se a počkej, až ty data z internetu přiletí."
export default async function Motivation() {

  // 2. FETCH (NAČÍTÁNÍ):
  // Jdeme na adresu api.adviceslip.com pro náhodnou radu.
  const res = await fetch("https://api.adviceslip.com/advice", {
    // next: { revalidate: 30 } -> KLÍČOVÁ VĚC!
    // Říkáme Next.js: "Tuhle radu si zapamatuj na 30 sekund. I když někdo stránku obnoví,
    // netahej ji znovu z internetu, ale ukaž tu starou. Po 30s ji zkus aktualizovat."
    // Šetříme tím internet i cizí server.
    next: { revalidate: 30 }
  });

  // Převod syrové odpovědi z internetu na JavaScriptový objekt (JSON)
  const data = await res.json();

  // 3. EXTRAKCE DAT:
  // API nám posílá objekt, který vypadá takto: { slip: { id: 7, advice: "Nějaká rada" } }
  // My si tu radu vytáhneme do proměnné, abychom ji mohli snadněji vypsat.
  const motivation = data.slip.advice;

  return (
    // max-w-2xl mx-auto -> Standardní vycentrování a omezení šířky, aby text nebyl přes celou obrazovku.
    <main className="p-10 max-w-2xl mx-auto">
      <BackLink />

      {/* bg-yellow-50 -> Velmi jemná žlutá barva pozadí (skoro bílá).
          rounded-[40px] -> Hodně kulaté rohy, které v kombinaci s Card (černý rám) tvoří tvůj styl.
          mt-12 -> Horní okraj (margin-top), aby karta nebyla nalepená na odkazu "Zpět".
      */}
      <Card className="mt-12 p-10 bg-yellow-50 rounded-[40px]">

        {/* font-black -> Nejtlustší možné písmo. tracking-tight -> Písmena jsou víc u sebe. */}
        <h1 className="text-2xl font-black uppercase mb-6 tracking-tight">
          Rada #{data.slip.id} pro dnešní den:
        </h1>

        {/* leading-tight -> Zmenšené mezery mezi řádky (aby to u velkého textu nevypadalo rozpadle).
            text-slate-800 -> Tmavě šedo-modrá barva (měkčí než čistě černá).
        */}
        <p className="text-3xl font-bold italic leading-tight text-slate-800">
          {motivation}
        </p>
      </Card>
    </main>
  );
}