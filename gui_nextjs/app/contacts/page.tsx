import BackLink from "@/components/BackLink";
import Card from "@/components/Card";

// Tato komponenta je Server Component (není tu "use client").
// Je to ideální pro statické informace, jako jsou kontakty – načte se to bleskově.
export default function Contacts() {

  // 1. DATA (KONFIGURACE):
  // Místo kopírování kódu si vše podstatné uložíme do pole.
  // Když si zítra založíš TikTok, prostě jen přidáš další řádek do tohoto pole.
  const socialy = [
    { platform: "Email", link: "mailto:tvuj@email.cz", icon: "✉️", text: "tvuj@email.cz" },
    { platform: "Instagram", link: "https://instagram.com", icon: "📸", text: "@tvoje_jmeno" },
    { platform: "GitHub", link: "https://github.com", icon: "💻", text: "github.com/tvoje" },
    { platform: "Discord", link: "#", icon: "🎮", text: "StudentUser#1234" },
  ];

  return (
    // max-w-4xl -> Stránka kontaktů může být o něco širší než třeba Pomodoro, aby se tam vešly dva sloupce.
    <main className="p-6 md:p-12 max-w-4xl mx-auto min-h-screen">
      <BackLink />

      <header className="mb-12">
        {/* italic uppercase -> Typický styl tvé aplikace, dodává tomu ten "raw" vzhled. */}
        <h1 className="text-5xl font-black italic uppercase tracking-tighter">
          Kde mě najdeš
        </h1>
      </header>

      {/* 2. MŘÍŽKA (GRID):
          grid-cols-1 -> Na mobilu jedna karta na řádek.
          md:grid-cols-2 -> Na počítači (md) se karty srovnají do dvou sloupců.
          gap-8 -> Pořádná mezera mezi kartami, aby design "dýchal".
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* 3. CYKLUS MAP:
            'item' reprezentuje jeden řádek z našeho pole 'socialy'.
        */}
        {socialy.map((item, i) => (
          // target="_blank" -> Otevře odkaz v nové záložce, aby uživatel neodešel z tvého webu.
          <a key={i} href={item.link} target="_blank" rel="noopener noreferrer">
            {/* interactive -> Karta bude reagovat na najetí myší (hover).
                flex items-center gap-6 -> Ikona a text budou hezky vedle sebe a vycentrované.
            */}
            <Card interactive className="flex items-center gap-6">
              {/* IKONA:
                  bg-gray-100 -> Jemné šedé pozadí pod ikonou.
                  p-4 rounded-2xl -> Udělá z pozadí hezký "zaoblený čtverec".
                  border-2 border-black -> Menší rámeček, co ladí k celkovému stylu.
              */}
              <span className="text-4xl bg-gray-100 p-4 rounded-2xl border-2 border-black">
                {item.icon}
              </span>

              <div>
                {/* tracking-widest -> Hodně roztažená písmena u popisku platformy (vypadá to profi). */}
                <h2 className="text-sm font-black uppercase text-gray-400 tracking-widest">
                  {item.platform}
                </h2>
                <p className="text-xl font-bold">{item.text}</p>
              </div>
            </Card>
          </a>
        ))}
      </div>

      {/* 4. SEKCE O MNĚ:
          mt-16 -> Velký odstup od mřížky kontaktů.
          border-t-4 border-black -> Tlustá černá čára, která vizuálně odděluje kontakty od vizitky.
      */}
      <section className="mt-16 border-t-4 border-black pt-12">
        {/* bg-blue-100 -> Světle modrá karta, která stránku trochu oživí barvou. */}
        <Card className="bg-blue-100 rounded-[40px] p-10">
          <h2 className="text-3xl font-black mb-4 italic">Jsem student na UJEP</h2>
          {/* leading-relaxed -> Trochu větší mezery mezi řádky v textu, lépe se to čte. */}
          <p className="text-lg leading-relaxed">
            Tady se nachází nějaké informace o mně... Tato sekce slouží jako tvé krátké bio.
          </p>
        </Card>
      </section>
    </main>
  );
}