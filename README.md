#  Fáze 4: Server Components a Motivace z webu

Ukážeme si největší sílu frameworku Next.js: Serverové komponenty. Stáhneme si data ze skutečného, cizího serveru na internetu, a to tak, že prohlížeč uživatele neudělá absolutně žádnou práci.

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

## English version

# Phase 4: Server Components and Web Motivation

We will demonstrate the greatest strength of the Next.js framework: Server Components. We will fetch data from a real, external server on the internet in a way that the user's browser does absolutely no work.

## How to proceed
Restart the server (`Ctrl + C` -> `npm run dev`).

## What we are creating in this phase
* **`app/motivation/page.tsx`:** A brand new page for daily motivation.
  * **Notice that `"use client"` is MISSING here!** This page is entirely generated on the server.
  * The component is `async`, and we use `await fetch(...)` to download data from the public API `https://api.adviceslip.com/advice`.
  * Ready-to-use, rendered HTML with the advice text is sent directly to the browser. No delays, no client-side loading.

## Independent Task (For fast learners)
The API returns not only the advice text itself in its JSON object but also its identification number (ID).
Find in the code how to access this number within the `data` object and print it directly into the page heading. 
*The final result should look something like this: "Advice #15 for today:"*
