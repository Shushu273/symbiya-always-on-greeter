# Symbiya Always On Greeter

Postav marketingový web pro SYMBIYA – AI recepční, která 24/7 bere telefon a odpovídá na zprávy za malé české podniky. Celý web česky. Bez přihlašování, bez databáze, bez cookies a analytiky. Rychlý, primárně pro mobil.

## Struktura (React Router)
- `/` – univerzální homepage „Nonstop recepce“
- `/barbershopy`, `/kliniky`, `/kosmeticke-salony`, `/stavebnictvi`, `/doprava`, `/gastro` – oborové stránky, všechny ze STEJNÉ šablony komponenty, liší se jen daty (jeden soubor `src/data/obory.ts` s obsahem všech oborů, ať se dají přidávat další).
- Hlavička na všech stránkách: logo „symbiya“ (malými písmeny, vedle malá svítící oranžová tečka), menu „Obory“ (rozbalovací se 6 obory), tlačítko „Domluvit ukázku“.
- Patička: SYMBIYA s.r.o., IČO 042 25 899, Praha · hello@symbiya.com · odkazy na všechny obory.

## Živá telefonní dema (DŮLEŽITÉ – nezaměňovat)
Existují jen dvě:
- Gastro a ubytování: +420 222 760 297 (AI recepční smyšleného „Penzionu u Lípy“)
- Barbershopy: +420 577 544 795 (AI recepční smyšleného „Barbershopu Na Rohu“)
Ostatní obory zatím demo číslo NEMAJÍ. U nich místo „Zavolat demo“ ukaž „Domluvit ukázku pro váš obor“ (mailto:hello@symbiya.com?subject=Ukázka – {obor}). Všechna čísla jako tel: odkazy (na mobilu jedním klepnutím).

## Homepage `/`
1. **Hero** – nadpis „Vaše recepce. Nonstop.“ Podnadpis: „AI recepční, která vezme každý hovor a odpoví na každou zprávu. I když stříháte, operujete, jste na stavbě nebo za volantem. Ve dne, v noci, o víkendu.“
   Vedle živá ukázka: „příchozí hovory“ – karta telefonu, ve které se každé ~3 s objeví nový hovor z jiného oboru a hned se změní na vyřízený, např.:
   - Barbershop · „Máte v sobotu volno na fade?“ → „Objednáno: So 11:00 u Dana“
   - Klinika · „Potřebuju přeobjednat kontrolu“ → „Přesunuto na čt 8:30“
   - Salon · „Kolik stojí gelové nehty?“ → „Ceník poslán, objednáno na pátek“
   - Stavebnictví · „Chci nacenit koupelnu“ → „Poptávka zapsána, majitel volá zítra“
   - Doprava · „Kde je moje zásilka?“ → „Stav zjištěn, řidič je tam do 40 min“
   - Gastro · „Stůl pro 6 v pátek v 19:00?“ → „Rezervováno, potvrzeno SMS“
   U každého malý údaj „vyřízeno za 0:38“ apod. Tlačítka: „Vyberte svůj obor“ (scroll na mřížku oborů) a „Domluvit ukázku“.
2. **Kolik vás stojí nezvednutý telefon** – krátký blok bez vymyšlených statistik: „Kdo se nedovolá, zavolá konkurenci. Recepční to vezme za vás, zeptá se na to podstatné a zapíše to.“
3. **Mřížka 6 oborů** – každý obor jako velká klikací dlaždice s názvem, jednou větou bolesti a šipkou na stránku. Ne generické karty se stínem a ikonou v kolečku – použij velkou typografii a výrazný hover.
4. **Co umí** – 4 schopnosti: Bere hovory 24/7 · Objednává do volných termínů · Odpovídá na dotazy (ceny, otevírací doba, parkování) · Ráno pošle předávku: co je vyřízené a co čeká na vás. Plus: když něco neví, předá to člověku a nic si nevymýšlí.
5. **Jak začít: pilot na 4 týdny** – jako jednoduchý seznam pojmů (dl): Nastavení (naučíme ji váš ceník a pravidla, od vás 1–2 hodiny) · Číslo (hovory, které nevezmete, se přesměrují na ni, vaše číslo zůstává) · Kontrola (každý hovor jde poslechnout a přečíst) · Měření (kolik hovorů vzala a kolik skončilo objednávkou) · Potom (měsíční paušál, nebo konec bez závazku). Cenu NEUVÁDĚJ.
6. **FAQ** (akordeon): Nepozná klient, že mluví s robotem? (Zavolejte si demo a posuďte sami; na přímou otázku odpoví pravdivě, že je AI.) · Co když neví odpověď? (Předá vám jméno, číslo a co volající potřebuje.) · Funguje to s mým rezervačním systémem? (Napojení prověříme na začátku pilotu; když nejde, posílá vám rezervace SMS ke schválení.) · Co GDPR? (Zpracovatelská smlouva je součástí pilotu, data slouží jen k vyřízení dotazu.) · Kolik to stojí? (Řekneme na 20minutovém hovoru podle počtu hovorů; když se to nevyplatí, řekneme to rovnou.)
7. **Závěr** – „Kolik hovorů jste dnes nevzali?“ + tlačítko „Domluvit 20min hovor“ (mailto:hello@symbiya.com).

## Šablona oborové stránky
Sekce: Hero (oborový nadpis + podnadpis + CTA: demo číslo, pokud existuje, jinak „Domluvit ukázku pro váš obor“) → „Typické hovory“ (3–4 ukázkové dotazy a co s nimi recepční udělá) → ukázka přepisu hovoru (5–7 replik klient/recepční, jako chat) → „Co od vás potřebuje“ (pár bodů) → pilot + FAQ (sdílené komponenty z homepage) → závěrečná výzva.

Obsah oborů:
- **Barbershopy** – nadpis „Máte v ruce strojek. Ne telefon.“ Bolest: telefon zvoní uprostřed střihu, klient zavolá jinam. Hovory: objednání střihu/vousů u konkrétního barbera, „co nejdřív“, cena a parkování, zrušení termínu. Demo +420 577 544 795, po objednání přijde klientovi potvrzení SMS (tohle u barber dema opravdu funguje).
- **Kliniky** (zubní, fyzio, veterina, soukromé ambulance) – „Sestra má práci s pacienty, ne s telefonem.“ Hovory: objednání a přeobjednání, akutní bolest (recepční nediagnostikuje, předá a u naléhavých případů odkáže na 155), co si vzít s sebou, otevírací doba. Bez demo čísla. Zdůrazni: žádné zdravotní rady, jen organizace.
- **Kosmetické salony** (kosmetika, nehty, řasy, masáže) – „Máte rozdělanou klientku. Další zrovna volá.“ Hovory: objednání na konkrétní službu, ceník, Instagram/WhatsApp dotazy na volné termíny, storno. Bez demo čísla.
- **Stavebnictví** (řemeslníci, rekonstrukce, instalatéři, elektrikáři) – „Jste na stavbě. Poptávka se nedovolá.“ Hovory: nová poptávka (recepční zjistí co, kde, rozsah, termín, kontakt a pošle vám shrnutí), dotaz na stav zakázky, havárie (předá okamžitě). Bez demo čísla.
- **Doprava** (autodoprava, kurýři, taxi, stěhování) – „Řidič řídí. Zákazník chce vědět, kdy přijede.“ Hovory: objednání přepravy/stěhování (odkud, kam, kdy, co), dotaz na stav, změna času. Bez demo čísla.
- **Gastro a ubytování** (restaurace, kavárny, penziony, hotely) – „Kuchyně jede. Telefon taky.“ / „Recepce spí. Hosté ne.“ Hovory: rezervace stolu, volný pokoj, pes, pozdní příjezd, otevírací doba. Demo +420 222 760 297.

## Design
- Barvy: noční inkoust #0B1D2A (hlavní tmavé pozadí), teplé světlo #FFB648 (akcent, tlačítka, „vyřízeno“), modré světlo telefonu #8EC8FF (příchozí hovor/„čeká“), ranní opar #E6EDF0 (světlé sekce), text na světlém #0D2433. Střídej tmavé a světlé sekce.
- Písma z Google Fonts: Bricolage Grotesque (nadpisy, tučně, užší, velké – typografie je hlavní vizuální prvek) a Instrument Sans (text).
- Jeden výrazný animovaný moment na stránku (na homepage feed příchozích hovorů), zbytek klidný. Respektuj prefers-reduced-motion.
- Vyhnout se: generickým SaaS kartám se stínem, gradientům jako dekoraci, ikonám v kolečkách, stockovým fotkám, emoji, nadpiskům VELKÝMI PÍSMENY nad sekcemi, vymyšleným statistikám, logům a referencím klientů.
- Texty: krátce, konkrétně, z pohledu majitele, vykáme, bez vykřičníků. Tlačítka říkají, co se stane („Zavolat demo“, „Domluvit 20min hovor“).
- Přístupnost: viditelný fokus, kontrast, sémantické nadpisy. Každá stránka vlastní title a meta description.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fe0c5b23-feba-4552-9585-5cc85dd5ec2f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
