// 1. IMPORTY: Metadata pro prohlížeč a fonty od Googlu
import type { Metadata } from "next"; // Typ pro TypeScript, abychom věděli, co můžeme nastavit v hlavičce
import { Geist, Geist_Mono } from "next/font/google"; // Moderní fonty optimalizované přímo pro Next.js
import "./globals.css"; // Naše hlavní CSS s Tailwindem (bez tohoto importu by web vypadal jako z roku 1995)

// 2. NASTAVENÍ FONTŮ:
// Vytváříme proměnné, které pak použijeme v CSS. Next.js ty fonty sám stáhne a naservíruje.
const geistSans = Geist({
  variable: "--font-geist-sans", // Název CSS proměnné
  subsets: ["latin"],            // Chceme i českou diakritiku
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", // Název proměnné pro neproporcionální písmo (kód)
  subsets: ["latin"],
});

// 3. METADATA:
// Tohle se nezobrazuje na stránce, ale v "hlavě" (HTML <head>).
export const metadata: Metadata = {
  title: "Student App",             // Název, který uvidíš na záložce prohlížeče
  description: "Můj studentský portál", // Popis pro Google a další vyhledávače
};

// 4. HLAVNÍ KOMPONENTA LAYOUTU:
// children: To je ta "magická" prop, do které se vloží obsah tvé aktuální stránky (page.tsx).
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html>: Základní kámen stránky.
    // lang="en" -> Informace pro prohlížeč (můžeš změnit na "cs" pro češtinu).
    // className -> Tady aktivujeme naše fonty a nastavujeme výšku na 100% (h-full).
    <html
      lang="cs"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* <body>: Samotné tělo webu.
          min-h-full -> Zaručí, že pozadí bude sahat až úplně dolů i na prázdné stránce.
          flex flex-col -> Umožňuje nám snadno skládat prvky (např. dát patičku vždy dospod).
          bg-white text-black -> Naše základní barevné schéma.
      */}
      <body className="min-h-full flex flex-col bg-white text-black">
        {/* Sem se "vlije" obsah ze souborů page.tsx */}
        {children}
      </body>
    </html>
  );
}