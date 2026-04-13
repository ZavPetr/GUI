#  Fáze 4: Server Components a Motivace z webu

Velké finále! Ukážeme si největší sílu frameworku Next.js: Serverové komponenty. Stáhneme si data ze skutečného, cizího serveru na internetu, a to tak, že prohlížeč uživatele neudělá absolutně žádnou práci.

##  Jak pokračovat
Restartujte server (`Ctrl + C` -> `npm run dev`).

##  Co v této fázi tvoříme
* **`app/motivation/page.tsx`:** Zcela nová stránka pro denní motivaci.
  * **Všimněte si, že zde CHYBÍ `"use client"`!** Tato stránka se celá vygeneruje už na serveru.
  * Komponenta je `async` a používáme `await fetch(...)` pro stažení dat z veřejného API `https://api.adviceslip.com/advice`.
  * Do prohlížeče se pošle už rovnou hotové, vyrenderované HTML s textem rady. Žádné zdržování, žádné načítání.

##  Samostatný úkol (Pro rychlíky)
API nám ve svém JSON objektu vrací nejen samotný text rady, ale také její identifikační číslo (ID).
Najděte v kódu, jak se k tomuto číslu v objektu `data` dostat, a vypište ho přímo do nadpisu stránky. 
*Cílový stav by měl vypadat například takto: "Rada #15 pro dnešní den:"*
