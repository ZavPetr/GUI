#  Fáze 1: Základy, UI a Přihlašování

Tohle je první části naší hodiny. V této fázi se seznámíme s Next.js, propojíme Tailwind CSS s našimi vlastními styly a vytvoříme hlavní rozcestník aplikace s funkčním přihlašováním.

##  Co v této fázi tvoříme
* **`app/globals.css`:** Tady máme základní nastavení Tailwindu a naše vlastní CSS třídy (např. `.karta-stin` pro retro vzhled).
* **`app/layout.tsx`:** Hlavní obal celé aplikace. Zde definujeme, že chceme všude bílé pozadí a černý text.
* **`app/page.tsx`:** Naše domovská stránka. Naučíme se zde pracovat s pamětí prohlížeče (`localStorage`), abychom si pamatovali jméno studenta. 
  * *Poznámka:* Používáme zde asynchronní trik s `Promise.resolve().then()`, abychom obešli přísná pravidla Reactu a vyhnuli se bílým obrazovkám při načítání.

##  Samostatný úkol
Naše domovská stránka má nyní 3 karty (Úkoly, Rozvrh, Motivace). 
Vaším úkolem je přidat **čtvrtou kartu** s názvem "Kontakty", která povede na adresu `/contacts`. Upravte její CSS třídy tak, aby při najetí myší (hover efekt) zmodrala (např. `hover:bg-blue-100` a `hover:border-blue-500`).

## English version

# Phase 1: Basics, UI, and Login

This is the first part of our lesson. In this phase, we will get to know Next.js, connect Tailwind CSS with our custom styles, and create the main app dashboard with functional login.

## What we are creating in this phase
* **`app/globals.css`:** This is where we have the basic Tailwind settings and our custom CSS classes (e.g., `.karta-stin` for a retro look).
* **`app/layout.tsx`:** The main wrapper for the entire application. Here we define that we want a white background and black text everywhere.
* **`app/page.tsx`:** Our homepage. We will learn how to work with browser memory (`localStorage`) to remember the student's name. 
  * *Note:* We use an asynchronous trick with `Promise.resolve().then()` here to bypass strict React rules and avoid white screens during loading.

## Independent Task
Our homepage now has 3 cards (Tasks, Schedule, Motivation). 
Your task is to add a **fourth card** named "Contacts" that will lead to the `/contacts` address. Update its CSS classes so that it turns blue when hovered over (e.g., `hover:bg-blue-100` and `hover:border-blue-500`).
