import BackLink from "@/components/BackLink";
import Card from "@/components/Card";

// Tato komponenta vykreslí se na serveru jako rychlé HTML.
export default function Contacts() {

  // 1. DATA: Místo abychom psali každou kartu ručně, uložíme si data do pole objektů.
  const socialy = [
    { platform: "Email", link: "mailto:tvuj@email.cz", icon: "✉️", text: "tvuj@email.cz" },
    { platform: "Instagram", link: "https://instagram.com", icon: "📸", text: "@tvoje_jmeno" },
    { platform: "GitHub", link: "https://github.com", icon: "💻", text: "github.com/tvoje" },
    { platform: "Discord", link: "#", icon: "🎮", text: "StudentUser#1234" },
  ];

  return (
    <main className="p-6 md:p-12 max-w-4xl mx-auto min-h-screen">
      <BackLink />

      <header className="mb-12">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter">
          Kde mě najdeš
        </h1>
      </header>

      {/* 2. MŘÍŽKA (GRID): Tailwind nám vytvoří sloupce. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* 3. CYKLUS MAP: Procházíme pole 'socialy' a pro každý objekt vytvoříme kartu */}
        {socialy.map((item, i) => (
          <a key={i} href={item.link} target="_blank">
            <Card interactive className="flex items-center gap-6">
              {/* Ikona v šedém čtverci s rámečkem */}
              <span className="text-4xl bg-gray-100 p-4 rounded-2xl border-2 border-black">
                {item.icon}
              </span>

              <div>
                <h2 className="text-sm font-black uppercase text-gray-400 tracking-widest">
                  {item.platform}
                </h2>
                <p className="text-xl font-bold">{item.text}</p>
              </div>
            </Card>
          </a>
        ))}
      </div>

      {/* 4. SEKCE O MNĚ: Jednoduchá vizitka pro dodatečné informace */}
      <section className="mt-16 border-t-4 border-black pt-12">
        <Card className="bg-blue-100 rounded-[40px] p-10">
          <h2 className="text-3xl font-black mb-4 italic">Jsem student na UJEP</h2>
          <p className="text-lg leading-relaxed">
            Tady se nachází nějaké informace o mně...
          </p>
        </Card>
      </section>
    </main>
  );
}