#  Studentský Dashboard - Next.js Workshop

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)

Vítejte v oficiálním repozitáři pro workshop předmětu **GUI (Grafická uživatelská rozhraní)**! 

Tento projekt neslouží jen jako ukázka kódu, ale jako interaktivní průvodce tvorbou moderní full-stack webové aplikace. Během tohoto workshopu si od nuly postavíme osobní studentský dashboard a prozkoumáme, jak se dnes dělají weby na profesionální úrovni.

---

##  O projektu a jeho funkcích
Tato `main` větev obsahuje finální, kompletně funkční kód celého projektu. Naše aplikace simuluje moderní informační systém a obsahuje následující moduly:

*  **Autentizace:** Úvodní obrazovka s uvítáním a trvalým uložením jména uživatele do mezipaměti prohlížeče (`localStorage`).
*  **Úkolovník (To-Do List):** Interaktivní správa úkolů s možností přidávání a mazání položek (ukázka práce s React State).
*  **Dynamický rozvrh:** Zobrazení dnešních přednášek a cvičení. Data se stahují z našeho vlastního lokálního REST API, které si v rámci Next.js sami vytvoříme.
*  **Motivátor:** Generátor náhodných rad, který stahuje data z externího veřejného API na internetu pomocí Server Components (bez zátěže uživatelova počítače).

---

## 🛠 Použité technologie (Tech Stack)
* **[Next.js (App Router)](https://nextjs.org/)**: Výkonný React framework, který nám umožňuje psát frontend i backend (API) v jednom projektu.
* **[React](https://react.dev/)**: Knihovna pro tvorbu interaktivních uživatelských rozhraní. Budeme hojně využívat tzv. Hooks (`useState`, `useEffect`).
* **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework pro bleskové a moderní stylování přímo v HTML kódu bez nutnosti psát dlouhé CSS soubory.
* **TypeScript**: Jazyk, který přidává do JavaScriptu statické typování a pomáhá nám chytat chyby ještě předtím, než kód spustíme.

---

## ⚙️ Prerekvizity (Co musíte mít před začátkem)
Než začneme kódit, ujistěte se, že máte na svém počítači nainstalováno:
1. **[Node.js](https://nodejs.org/en/)** (Doporučujeme verzi 18.x nebo novější)
2. **[Git](https://git-scm.com/)** (Pro stahování repozitáře a pohyb mezi lekcemi)
3. **Editor kódu** (Doporučujeme [Visual Studio Code](https://code.visualstudio.com/))

---

##  Jak projekt spustit lokálně

**1. Naklonujte si repozitář na svůj disk:**
```bash
git clone [VLOŽTE-URL-VAŠEHO-REPOZITÁŘE]
cd [NAZEV-SLOZKY]
