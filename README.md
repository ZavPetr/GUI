#  Fáze 1: Základy, UI a Přihlašování

Tohle je první části naší hodiny. V této fázi se seznámíme s Next.js, propojíme Tailwind CSS s našimi vlastními styly a vytvoříme hlavní rozcestník aplikace s funkčním přihlašováním.

##  Co v této fázi tvoříme
* **`app/page.tsx`:** Naše domovská stránka. Naučíme se zde pracovat s pamětí prohlížeče (`localStorage`), abychom si pamatovali jméno studenta. 
  A Uděláme vzhled inputu pro přihlášení a také design karet(/contacts, /homeworks, /schedule, /motivations)
  
  **React Hooks (useState, useEffect)**: Naučíme se spravovat stav aplikace (jméno uživatele, stav přihlášení) a reagovat na životní cyklus komponenty.

  **Ošetření Hydratace**: Implementujeme kontrolu isMounted, která zajistí, že se kód závislý na prohlížeči (localStorage) nespustí       dříve, než je stránka plně připravena. Tím předejdeme chybám při vykreslování na straně serveru.

##  Samostatný úkol
Naše domovská stránka má nyní 3 karty (Úkoly, Rozvrh, Motivace). 
Vaším úkolem je přidat **čtvrtou kartu** s názvem "Kontakty", která povede na adresu `/contacts`. Upravte její CSS třídy tak, aby při najetí myší (hover efekt) zmodrala (např. `hover:bg-blue-100` a `hover:border-blue-500`).

## English version

# Phase 1: Basics, UI, and Login

This is the first part of our lesson. In this phase, we will get to know Next.js, connect Tailwind CSS with our custom styles, and create the main app dashboard with functional login.

## What we are creating in this phase
* **`app/page.tsx`:** Our homepage. We will learn how to work with browser memory (`localStorage`) to remember the student's name. 
     A We will design the login input and also the cards design(/contacts, /homeworks, /schedule, /motivations)

  **React Hooks (useState, useEffect)**: We will learn how to manage application state (username, login status) and react to the component lifecycle.

  **Hydration Handling**: We will implement an isMounted check to ensure that browser-dependent code (localStorage) doesn't execute before the page is fully ready.     This prevents server-side rendering (SSR) mismatch errors.

## Independent Task
Our homepage now has 3 cards (Tasks, Schedule, Motivation). 
Your task is to add a **fourth card** named "Contacts" that will lead to the `/contacts` address. Update its CSS classes so that it turns blue when hovered over (e.g., `hover:bg-blue-100` and `hover:border-blue-500`).
