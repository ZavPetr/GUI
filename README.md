# Fáze 2: Interaktivita a Úkolovník

V této fázi naši aplikaci oživíme. Naučíme se, jak si React dokáže pamatovat data, která uživatel zadává (React State), a jak dynamicky vykreslovat seznamy.

## Jak pokračovat
Pokud jste se právě přepnuli do této větve, server možná poběží. Pokud by něco zlobilo, ukončete ho (`Ctrl + C`) a spusťte znovu: `npm run dev`.

## Co v této fázi tvoříme
* **`app/homeworks/page.tsx`:** Zcela nová stránka! Tvoříme zde plně funkční To-Do list (Úkolovník).
  * Používáme zase "use client"
  * Používáme Hook `useState` pro ukládání textu z inputu a seznamu úkolů.
  * Používáme metodu `.map()` pro vypsání pole do HTML a `.filter()` pro mazání položek.

##  Samostatný úkol
1. **Vylepšení validace:** Aktuálně jde přidat jako úkol i prázdný text (jen mezery). Upravte podmínku v tlačítku "Přidat" tak, aby text před uložením ořízla o bílé znaky (nápověda: použijte metodu `.trim()`).
2. **Nové tlačítko:** Přidejte vedle černého tlačítka "Přidat" ještě jedno menší, červené tlačítko s nápisem "Smazat vše". Po kliknutí na něj se musí celý seznam úkolů vyprázdnit.

## English version

# Phase 2: Interactivity and Homework Tracker

In this phase, we will bring our application to life. We will learn how React remembers data entered by the user (React State) and how to dynamically render lists.

## How to proceed
If you have just switched to this branch, the server might still be running. If anything feels off, stop it (`Ctrl + C`) and restart it: `npm run dev`.

## What we are creating in this phase
* **`app/homeworks/page.tsx`:** A brand new page! We are building a fully functional To-Do list (Homework Tracker) here.
  * We will again work with "use client".
  * We use the `useState` Hook to store text from the input and the list of tasks.
  * We use the `.map()` method to render the array into HTML and `.filter()` to delete items.

## Independent Task
1. **Validation Improvement:** Currently, it's possible to add an empty task (just spaces). Modify the condition in the "Add" button to trim whitespace before saving (hint: use the `.trim()` method).
2. **New Button:** Add another smaller, red button labeled "Delete All" next to the black "Add" button. Clicking it should clear the entire task list.
