interface CardProps {
  children: React.ReactNode; // Obsah, který vložíš dovnitř karty (text, obrázky, další komponenty)
  className?: string;       // Možnost přidat další Tailwind třídy (např. barvu pozadí) zvenčí
  interactive?: boolean;    // Pokud je true, karta bude reagovat na hover (pohyb myši)
}

export default function Card({ children, className = "", interactive = false }: CardProps) {
  // baseStyle definuje vizuální identitu webu (neobrutalismus: tlustý rám, tvrdý stín)
  const baseStyle = "border-4 border-black p-6 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white";

  // interactiveStyle přidá animaci "zmáčknutí" a změní kurzor na ruku
  const interactiveStyle = interactive
    ? "hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
    : "";

  return (
    <div className={`${baseStyle} ${interactiveStyle} ${className}`}>
      {children}
    </div>
  );
}