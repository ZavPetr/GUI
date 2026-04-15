#  Fáze 3: Lokální API a Rozvrh

Z interaktivních tlačítek se přesouváme ke zpracování dat. V této fázi si vytvoříme vlastní "backend" (API) přímo uvnitř Next.js a data si z něj stáhneme. Také zapojíme TypeScript.

##  Jak pokračovat
Nezapomeňte aplikaci restartovat (`Ctrl + C` -> `npm run dev`), pokud jste měnili větve.

##  Co v této fázi tvoříme
* **`app/api/schedule/route.ts`:** Naše vlastní API routa! Když někdo zavolá tuto adresu metodou GET, Next.js mu vrátí JSON soubor s rozvrhem.
* **`app/schedule/page.tsx`:** Stránka pro rozvrh. 
  * Naučíte se zde definovat **TypeScript Interface** (`interface Hodina`), abychom přesně věděli, jak vypadají data, se kterými pracujeme.
  * Data z našeho API stahujeme pomocí funkce `fetch`.
  * Pomocí JavaScriptu zjišťujeme aktuální den a filtrujeme z rozvrhu jen dnešní hodiny.

##  Samostatný úkol
Naše aplikace aktuálně vypíše seznam dnešních hodin (nebo hlášku, že máte volno). 
Zkuste upravit kód tak, aby se přímo pod velkým nadpisem (např. "Rozvrh na Čtvrtek") vypsal i celkový počet hodin.
*Nápověda: Pokud máte v proměnné `dnesniHodiny` uložené pole, můžete zjistit jeho délku pomocí vlastnosti `.length`.*

## English version

# Phase 3: Local API and Schedule

We are moving from interactive buttons to data processing. In this phase, we will create our own "backend" (API) directly inside Next.js and fetch data from it securely. We will also incorporate TypeScript.

## How to proceed
Don't forget to restart the application (`Ctrl + C` -> `npm run dev`) if you have switched branches.

## What we are creating in this phase
* **`app/api/schedule/route.ts`:** Our very own API route! When someone calls this address using the GET method, Next.js will return a JSON file containing the schedule.
* **`app/schedule/page.tsx`:** The schedule page. 
  * You will learn how to define a **TypeScript Interface** (`interface Hodina`) so we know exactly what the data we are working with looks like.
  * We fetch data from our API using the `fetch` function.
  * Using JavaScript, we determine the current day and filter the schedule to show only today's classes.

## Independent Task
Our application currently displays a list of today's classes (or a message saying you have the day off). 
Try to modify the code so that the total number of classes is displayed directly under the main heading (e.g., "Schedule for Thursday").
*Hint: If you have an array stored in the `dnesniHodiny` variable, you can find its length using the `.length` property.*
