#  Fáze 1: Základy, UI a Přihlašování

Vítejte v první části našeho workshopu! V této fázi se seznámíme s Next.js, propojíme Tailwind CSS s našimi vlastními styly a vytvoříme hlavní rozcestník aplikace s funkčním přihlašováním.

## 🛠 Jak projekt spustit
1. Otevřete terminál a nainstalujte balíčky:
   `npm install`
2. Spusťte vývojový server:
   `npm run dev`
3. Otevřete v prohlížeči: **http://localhost:3000**

##  Co v této fázi tvoříme
* **`app/globals.css`:** Tady máme základní nastavení Tailwindu a naše vlastní CSS třídy (např. `.karta-stin` pro retro vzhled).
* **`app/layout.tsx`:** Hlavní obal celé aplikace. Zde definujeme, že chceme všude bílé pozadí a černý text.
* **`app/page.tsx`:** Naše domovská stránka. Naučíme se zde pracovat s pamětí prohlížeče (`localStorage`), abychom si pamatovali jméno studenta. 
  * *Poznámka:* Používáme zde asynchronní trik s `Promise.resolve().then()`, abychom obešli přísná pravidla Reactu a vyhnuli se bílým obrazovkám při načítání.

##  Samostatný úkol (Pro rychlíky)
Naše domovská stránka má nyní 3 karty (Úkoly, Rozvrh, Motivace). 
Vaším úkolem je přidat **čtvrtou kartu** s názvem "Kontakty", která povede na adresu `/contacts`. Upravte její CSS třídy tak, aby při najetí myší (hover efekt) zmodrala (např. `hover:bg-blue-100` a `hover:border-blue-500`).
