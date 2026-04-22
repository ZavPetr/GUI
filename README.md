#  Fáze 4: Server Components a Motivace z webu

Ukážeme si největší sílu frameworku Next.js: Serverové komponenty. Stáhneme si data ze skutečného, cizího serveru na internetu, a to tak, že prohlížeč uživatele neudělá absolutně žádnou práci.

##  Jak pokračovat
Restartujte server (`Ctrl + C` -> `npm run dev`).

##  Co v této fázi tvoříme
* **`app/motivation/page.tsx`:** Zcela nová stránka pro denní motivaci.
  * **Všimněte si, že zde CHYBÍ `"use client"`!** Tato stránka se celá vygeneruje už na serveru.
  * Komponenta je `async` a používáme `await fetch(...)` pro stažení dat z veřejného API `https://api.adviceslip.com/advice`.
  * ISR (Incremental Static Regeneration): Nastavíme revalidaci na 30 sekund. To znamená, že Next.js si radu zapamatuje a nebude zbytečně zatěžovat cizí server při každém kliknutí.

##  Samostatné úkoly

1. **Práce s daty:** API nám ve svém JSON objektu vrací nejen samotný text rady, ale také její identifikační číslo (ID). Najděte v kódu, jak se k tomuto číslu v objektu `data` dostat, a vypište ho přímo do nadpisu stránky. 
   * *Cílový stav: "Rada #15 pro dnešní den:"*

2. **Kreativní výzva (Obsah stránky):** V projektu si vytvořte soubor `app/contacts/page.tsx`. Naplňte ho kompletním obsahem s kontaktními údaji (můžete použít smyšlené údaje). 
   * **Požadavky:** Stránka musí obsahovat funkční odkaz zpět na dashboard, musí být nastylovaná pomocí Tailwindu a její design by měl ladit se zbytkem aplikace (použijte karty, stíny nebo barvy, které jsme se naučili). Je to jen na vaší fantazii.
  
3. **Pomodoro výzva (Pokud bude čas tak uděláme společně):**
   * Vytvořte v projektu nový soubor app/pomodoro/page.tsx a naprogramujte v něm kompletní a funkční Pomodoro časovač, který studentům pomůže se soustředěním.
   * Požadavky: Stránka musí obsahovat funkční odpočet času (formát MM:SS), tlačítko pro Start/Pauzu a přepínače pro tři různé režimy: Práce (25 min), Krátká pauza      (5 min) a Dlouhá pauza (15 min). Každý režim by měl mít svou specifickou barvu pozadí a design musí ladit se zbytkem aplikace.
   * Nápověda: K realizaci budete potřebovat klientskou komponentu ("use client"), Hooky useState pro správu času a useEffect pro spuštění logiky odpočtu přes           setInterval. Nezapomeňte v useEffect použít "cleanup" funkci pro vymazání intervalu, aby časovač neběžel na pozadí i po opuštění stránky.
  
4. **Počasí (Práce s externím API) (Pokud bude čas tak uděláme společně):**
   * Vytvořte v projektu nový soubor app/weather/page.tsx. Cílem je vytvořit stránku, která zobrazuje aktuální počasí v Ústí nad Labem (souřadnice jsou již v API        nastaveny).
   * Požadavky: Použijte metodu fetch pro stažení dat z API Open-Meteo. Ze získaného JSON objektu vypište na stránku aktuální teplotu (temperature_2m) a relativní       vlhkost vzduchu (relative_humidity_2m).
   * Nápověda: Postupujte úplně stejně jako u stránky s motivací (/motivation). Jedná se o Server Component, takže kód bude async a nebudete potřebovat "use             client". Data v tomto konkrétním API najdete zanořená v objektu current. Nezapomeňte na designovou konzistenci (karty, stíny, tlusté okraje) a funkční odkaz        zpět na Dashboard.

API:
https://api.open-meteo.com/v1/forecast?latitude=50.6607&longitude=14.0325&current=temperature_2m,relative_humidity_2m,weather_code

---

## English version

# Phase 4: Server Components and Web Motivation

We will demonstrate the greatest strength of the Next.js framework: Server Components. We will fetch data from a real, external server on the internet in a way that the user's browser does absolutely no work.

## How to proceed
Restart the server (`Ctrl + C` -> `npm run dev`).

## What we are creating in this phase
* **`app/motivation/page.tsx`:** A brand new page for daily motivation.
  * **Notice that `"use client"` is MISSING here!** This page is entirely generated on the server.
  * The component is `async`, and we use `await fetch(...)` to download data from the public API `https://api.adviceslip.com/advice`.
  * ISR (Incremental Static Regeneration): We set a 30-second revalidation period. This means Next.js caches the advice, preventing unnecessary requests to the external server on every page refresh.

## Independent Tasks

1. **Data Handling (For fast learners):** The API returns not only the advice text itself in its JSON object but also its identification number (ID). Find in the code how to access this number within the `data` object and print it directly into the page heading. 
   * *Target result: "Advice #15 for today:"*

2. **Creative Challenge (Page Content):** Create a file named app/contacts/page.tsx in your project. Populate it with complete contact information (you can use dummy data).
   * **Requirements:** The page must include a working link back to the dashboard, must be styled using Tailwind, and its design should match the rest of the application (use the cards, shadows, or colors we’ve learned). It's entirely up to your imagination.
  
3. **Pomodoro Challenge (If time permits, we will work on this together.):**
   * Create a new file app/pomodoro/page.tsx in your project and program a complete, functional Pomodoro timer to help students focus.
   * Requirements: The page must include a functional countdown (MM:SS format), a Start/Pause button, and toggles for three different modes: Work (25 min), Short        Break (5 min), and Long Break (15 min). Each mode should have its own specific background color, and the design must match the rest of the application.
   * Hint: You will need a client component ("use client"), useState hooks for managing the time, and useEffect to trigger the countdown logic via setInterval.          Don't forget to include a "cleanup" function in useEffect to clear the interval so the timer doesn't keep running in the background after leaving the page.

  
4. **Weather (Working with External API) (If time permits, we will work on this together.):**
   * Create a new file app/weather/page.tsx in your project. The goal is to create a page that displays the current weather for Ústí nad Labem (coordinates are          already set in the API).
   * Requirements: Use the fetch method to download data from the Open-Meteo API. From the retrieved JSON object, display the current temperature (temperature_2m)       and relative humidity (relative_humidity_2m) on the page.
   * Hint: Follow the exact same pattern as the motivation page. This is a Server Component, so the code will be async and you won't need "use client". In this          specific API, you will find the data nested inside the current object. Don't forget design consistency (cards, shadows, thick borders) and a working link back      to the Dashboard.
     
API:
https://api.open-meteo.com/v1/forecast?latitude=50.6607&longitude=14.0325&current=temperature_2m,relative_humidity_2m,weather_code
