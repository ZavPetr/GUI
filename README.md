#  Fáze 3: Lokální API a Rozvrh

Přitvrzujeme! Z interaktivních tlačítek se přesouváme ke zpracování dat. V této fázi si vytvoříme vlastní "backend" (API) přímo uvnitř Next.js a data si z něj bezpečně stáhneme. Také zapojíme TypeScript.

##  Jak pokračovat
Nezapomeňte aplikaci restartovat (`Ctrl + C` -> `npm run dev`), pokud jste měnili větve.

##  Co v této fázi tvoříme
* **`app/api/schedule/route.ts`:** Naše vlastní API routa! Když někdo zavolá tuto adresu metodou GET, Next.js mu vrátí JSON soubor s rozvrhem.
* **`app/schedule/page.tsx`:** Stránka pro rozvrh. 
  * Naučíte se zde definovat **TypeScript Interface** (`interface Hodina`), abychom přesně věděli, jak vypadají data, se kterými pracujeme.
  * Data z našeho API stahujeme pomocí funkce `fetch`.
  * Pomocí JavaScriptu zjišťujeme aktuální den a filtrujeme z rozvrhu jen dnešní hodiny.

##  Samostatný úkol (Pro rychlíky)
Naše aplikace aktuálně vypíše seznam dnešních hodin (nebo hlášku, že máte volno). 
Zkuste upravit kód tak, aby se přímo pod velkým nadpisem (např. "Rozvrh na Čtvrtek") vypsal i celkový počet hodin.
*Nápověda: Pokud máte v proměnné `dnesniHodiny` uložené pole, můžete zjistit jeho délku pomocí vlastnosti `.length`.*
