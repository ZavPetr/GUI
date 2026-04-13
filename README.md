# ⚙️ Fáze 2: Interaktivita a Úkolovník

V této fázi naši aplikaci oživíme. Naučíme se, jak si React dokáže pamatovat data, která uživatel zadává (React State), a jak dynamicky vykreslovat seznamy.

## 🛠 Jak pokračovat
Pokud jste se právě přepnuli do této větve, server možná poběží. Pokud by něco zlobilo, ukončete ho (`Ctrl + C`) a spusťte znovu: `npm run dev`.

## Co v této fázi tvoříme
* **`app/homeworks/page.tsx`:** Zcela nová stránka! Tvoříme zde plně funkční To-Do list (Úkolovník).
  * Naučíte se používat `"use client"` direktivu, která Next.js říká, že tato stránka potřebuje interaktivitu v prohlížeči.
  * Používáme Hook `useState` pro ukládání textu z inputu a seznamu úkolů.
  * Používáme metodu `.map()` pro vypsání pole do HTML a `.filter()` pro mazání položek.

##  Samostatný úkol (Pro rychlíky)
1. **Vylepšení validace:** Aktuálně jde přidat jako úkol i prázdný text (jen mezery). Upravte podmínku v tlačítku "Přidat" tak, aby text před uložením ořízla o bílé znaky (nápověda: použijte metodu `.trim()`).
2. **Nové tlačítko:** Přidejte vedle černého tlačítka "Přidat" ještě jedno menší, červené tlačítko s nápisem "Smazat vše". Po kliknutí na něj se musí celý seznam úkolů vyprázdnit.
