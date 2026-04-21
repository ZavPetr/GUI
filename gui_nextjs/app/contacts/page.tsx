import Link from "next/link";

export default function Contacts() {
  
  const socialy = [
    { platform: "Email", link: "mailto:tvuj@email.cz", icon: "✉️", text: "tvuj@email.cz" },
    { platform: "Instagram", link: "https://instagram.com", icon: "📸", text: "@tvoje_jmeno" },
    { platform: "GitHub", link: "https://github.com", icon: "💻", text: "github.com/tvoje" },
    { platform: "Discord", link: "#", icon: "🎮", text: "StudentUser#1234" },
  ];

  return (
    <main className="p-6 md:p-12 max-w-4xl mx-auto min-h-screen bg-white text-black">
      <Link href="/" className="text-blue-600 font-bold hover:underline mb-8 inline-block">
        ← Zpět na Dashboard
      </Link>

      <header className="mb-12">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter">
          Kde mě najdeš
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {socialy.map((item, i) => (
          <a 
            key={i}
            href={item.link}
            target="_blank"
            className="border-4 border-black p-6 rounded-3xl flex items-center gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all bg-white"
          >
            <span className="text-4xl bg-gray-100 p-4 rounded-2xl border-2 border-black">
              {item.icon}
            </span>
            
            <div>
              <h2 className="text-sm font-black uppercase text-gray-400 tracking-widest">
                {item.platform}
              </h2>
              <p className="text-xl font-bold">{item.text}</p>
            </div>
          </a>
        ))}
      </div>

      <section className="mt-16 border-t-4 border-black pt-12">
        <div className="bg-blue-100 border-4 border-black p-10 rounded-[40px]">
          <h2 className="text-3xl font-black mb-4 italic">Jsem student na UJEP</h2>
          <p className="text-lg leading-relaxed">
            Tady se nachází nějaké informace o mně...
          </p>
        </div>
      </section>
    </main>
  );
}