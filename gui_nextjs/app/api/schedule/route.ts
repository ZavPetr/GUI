// 1. IMPORTY: Bereme si nástroje pro práci se serverem a daty.
import { NextResponse } from "next/server"; // Nástroj pro vytváření odpovědí z našeho serveru
import { getScheduleData } from "@/lib/data"; // Naše funkce, která umí přečíst data z lib/data.ts

// 2. DEFINICE GET POŽADAVKU:
// V Next.js musí být funkce pojmenovaná podle HTTP metody (GET, POST, atd.).
// 'async' říká, že tahle funkce bude na něco čekat (třeba na čtení z disku).
export async function GET() {

  // 3. NAČTENÍ DAT:
  // Zavoláme funkci pro získání rozvrhu.
  // 'await' zajistí, že se kód zastaví a počká, dokud nejsou data v proměnné 'data' připravená.
  const data = await getScheduleData();

  // 4. ODPOVĚĎ (RESPONSE):
  // NextResponse.json(data) vezme náš JavaScriptový objekt (pole úkolů/hodin)
  // a "zabalí" ho do formátu JSON (textový řetězec, který umí cestovat po internetu).
  // Prohlížeč pak tuhle odpověď dostane se stavem 200 OK.
  return NextResponse.json(data);
}