export type Demo = { cislo: string; tel: string; firma: string };

export type Obor = {
  slug: string;
  nazev: string;
  podnazev: string;
  bolest: string;
  nadpis: string;
  podnadpis: string;
  title: string;
  description: string;
  demo?: Demo | undefined;
  hovory: { dotaz: string; akce: string }[];
  prepis: { kdo: "klient" | "recepce"; text: string }[];
  potrebuje: string[];
};

export const DEMO_GASTRO: Demo = { cislo: "+420 222 760 297", tel: "+420222760297", firma: "Penzion u Lípy" };
export const DEMO_BARBER: Demo = { cislo: "+420 577 544 795", tel: "+420577544795", firma: "Barbershop Na Rohu" };

export const MAIL = "hello@symbiya.com";
export const mailUkazka = (obor?: string) =>
  `mailto:${MAIL}?subject=${encodeURIComponent(obor ? `Ukázka – ${obor}` : "Domluvit ukázku")}`;
export const mailHovor = `mailto:${MAIL}?subject=${encodeURIComponent("Domluvit 20min hovor")}`;

export const obory: Obor[] = [
  {
    slug: "salony",
    nazev: "Salony",
    podnazev: "barbershopy, tetovací studia, kosmetika, estetika, nehty, řasy",
    bolest: "Máte rozdělaného klienta. Další zrovna volá nebo píše.",
    nadpis: "Máte v ruce strojek, jehlu nebo pinzetu. Ne telefon.",
    podnadpis: "Sára vezme hovor i zprávu, kterou vy nevezmete, objedná klienta ke správnému člověku a na správnou službu a pošle mu potvrzení SMS.",
    title: "AI recepční pro salony – barber, tetování, kosmetika | SYMBIYA",
    description: "Barbershopy, tetovací studia, kosmetické a estetické salony: hovory a zprávy, které během práce nevezmete, vyřídí AI recepční. Objedná klienta a pošle potvrzení SMS.",
    demo: DEMO_BARBER,
    hovory: [
      { dotaz: "„Máte v sobotu volno na fade u Dana?“", akce: "Najde volný termín u konkrétního člověka a objedná." },
      { dotaz: "Zpráva: „Chci menší tetování na předloktí, kolik to stojí?“", akce: "Zjistí motiv a velikost, nabídne konzultaci u tatéra, který to dělá." },
      { dotaz: "„Máte zítra volno na řasy?“", akce: "Najde termín podle délky služby a objedná." },
      { dotaz: "„Musím zrušit pátek.“", akce: "Zruší termín podle vašich pravidel a uvolněné místo nabídne čekajícím." },
    ],
    prepis: [
      { kdo: "recepce", text: "Barbershop Na Rohu, dobrý den. Jak vám můžu pomoct?" },
      { kdo: "klient", text: "Dobrý den, chtěl bych v sobotu fade a úpravu vousů." },
      { kdo: "recepce", text: "V sobotu má Dan volno v 11:00 a Tomáš ve 13:30. Které vám vyhovuje?" },
      { kdo: "klient", text: "Jedenáctá u Dana." },
      { kdo: "recepce", text: "Zapíšu vás. Na jaké jméno a číslo?" },
      { kdo: "klient", text: "Petr Novák, 603 112 445." },
      { kdo: "recepce", text: "Hotovo, sobota 11:00 u Dana. Potvrzení vám přijde SMS." },
    ],
    potrebuje: ["Seznam služeb s cenou a délkou", "Kdo z týmu co dělá a kdy", "Pravidla pro storno, zálohy a pozdní příchody", "Na jakých kanálech má odpovídat (telefon, Instagram, WhatsApp)"],
  },
  {
    slug: "kliniky",
    nazev: "Kliniky",
    podnazev: "zubní ordinace, fyzioterapie, veterina, soukromé ambulance",
    bolest: "Sestra má v rukou pacienta. Telefon zvoní dál.",
    nadpis: "Sestra má práci s pacienty, ne s telefonem.",
    podnadpis: "Recepční objedná, přeobjedná a odpoví na organizační dotazy. Zdravotní rady nedává, jen organizuje a předává.",
    title: "AI recepční pro kliniky a ordinace | SYMBIYA",
    description: "Objednávání a přeobjednávání pacientů nonstop. Bez zdravotních rad, jen organizace. Naléhavé případy předá a odkáže na 155.",
    hovory: [
      { dotaz: "„Chci se objednat na dentální hygienu.“", akce: "Najde volný termín a zapíše pacienta." },
      { dotaz: "„Potřebuju přeobjednat kontrolu.“", akce: "Přesune termín a uvolní původní místo." },
      { dotaz: "„Strašně mě bolí zub.“", akce: "Nediagnostikuje. Zapíše a předá vám, u naléhavého stavu odkáže na 155." },
      { dotaz: "„Co si mám vzít s sebou a kdy máte otevřeno?“", akce: "Odpoví podle vašich pokynů a ordinačních hodin." },
    ],
    prepis: [
      { kdo: "recepce", text: "Zubní ordinace, dobrý den. S čím vám můžu pomoct?" },
      { kdo: "klient", text: "Dobrý den, mám ve čtvrtek kontrolu a nemůžu přijít." },
      { kdo: "recepce", text: "Rozumím. Můžu vám nabídnout příští čtvrtek v 8:30 nebo pátek ve 14:00." },
      { kdo: "klient", text: "Čtvrtek v půl deváté." },
      { kdo: "recepce", text: "Přesunuto na čtvrtek 8:30, potvrzení posílám SMS. Vezměte si s sebou kartičku pojišťovny." },
      { kdo: "klient", text: "Děkuju, nashledanou." },
    ],
    potrebuje: ["Ordinační hodiny a typy návštěv", "Pravidla pro objednávání a přeobjednání", "Co mají pacienti přinést", "Komu a jak předávat naléhavé případy"],
  },
  {
    slug: "stavebnictvi",
    nazev: "Stavebnictví",
    podnazev: "řemeslníci, rekonstrukce, instalatéři, elektrikáři",
    bolest: "Jste na stavbě. Nová zakázka se nedovolá.",
    nadpis: "Jste na stavbě. Poptávka se nedovolá.",
    podnadpis: "Recepční zjistí co, kde, v jakém rozsahu a kdy, a pošle vám shrnutí. Havárie předá okamžitě.",
    title: "AI recepční pro řemeslníky a stavebníky | SYMBIYA",
    description: "Poptávky zachycené i když jste na stavbě. AI recepční zjistí rozsah, místo a termín a pošle vám shrnutí. Havárie předá hned.",
    hovory: [
      { dotaz: "„Chci nacenit rekonstrukci koupelny.“", akce: "Zjistí co, kde, rozsah, termín a kontakt. Pošle vám shrnutí." },
      { dotaz: "„Jak to vypadá s naší zakázkou?“", akce: "Zapíše dotaz a předá ho vám nebo vedoucímu." },
      { dotaz: "„Teče nám voda ze stropu.“", akce: "Havárii předá okamžitě, telefonem i zprávou." },
    ],
    prepis: [
      { kdo: "recepce", text: "Dobrý den, tady instalatérství Dvořák. Co potřebujete?" },
      { kdo: "klient", text: "Dobrý den, potřeboval bych nacenit novou koupelnu." },
      { kdo: "recepce", text: "Ráda. Jde o koupelnu v bytě, nebo v domě?" },
      { kdo: "klient", text: "V bytě, panelák." },
      { kdo: "recepce", text: "Rozumím. Rovnou vám u stavbyvedoucího blokuji patnáctiminutový hovor na zítra v deset, hodí se?" },
      { kdo: "klient", text: "Jo, to se hodí." },
      { kdo: "recepce", text: "Výborně, posílám potvrzení SMS. Můžu poprosit jméno?" },
      { kdo: "klient", text: "Novák." },
      { kdo: "recepce", text: "Děkuji, pane Nováku, zítra v deset vám zavolá. Hezký den." },
    ],
    potrebuje: ["Jaké práce děláte a kde", "Co vše chcete vědět o nové poptávce", "Co je u vás havárie a komu volat", "Kdy a jak vám posílat shrnutí"],
  },
  {
    slug: "doprava",
    nazev: "Doprava",
    podnazev: "autodoprava, kurýři, taxi, stěhování",
    bolest: "Řidič řídí. Zákazník chce vědět, kdy přijede.",
    nadpis: "Řidič řídí. Zákazník chce vědět, kdy přijede.",
    podnadpis: "Recepční přijme objednávku přepravy, zjistí všechno potřebné a odpoví na dotazy na stav. Řidič nemusí zvedat telefon.",
    title: "AI recepční pro dopravu a stěhování | SYMBIYA",
    description: "Objednávky přepravy a dotazy na stav vyřídí AI recepční nonstop. Řidič řídí, zákazník ví, na čem je.",
    hovory: [
      { dotaz: "„Potřebuju odvézt gauč z Brna do Prahy.“", akce: "Zjistí odkud, kam, kdy a co. Objednávku zapíše." },
      { dotaz: "„Kde je moje zásilka?“", akce: "Zjistí stav podle vašich pravidel nebo předá dispečinku." },
      { dotaz: "„Můžeme posunout nakládku na odpoledne?“", akce: "Zapíše změnu a dá vědět vám i řidiči." },
    ],
    prepis: [
      { kdo: "recepce", text: "Stěhování Rychle, dobrý den. Jak můžu pomoct?" },
      { kdo: "klient", text: "Stěhujeme se v sobotu z Karlína do Libně." },
      { kdo: "recepce", text: "V kolikátém patře je byt a je tam výtah?" },
      { kdo: "klient", text: "Třetí patro, bez výtahu. Dvoupokojový byt." },
      { kdo: "recepce", text: "Kdy byste chtěli začít?" },
      { kdo: "klient", text: "V osm ráno." },
      { kdo: "recepce", text: "Zapsáno na sobotu 8:00, potvrzení s cenou posílám SMS." },
    ],
    potrebuje: ["Jaké přepravy děláte a kde", "Co zjistit u každé objednávky", "Jak zjišťovat stav zakázek", "Kontakt na dispečink pro předání"],
  },
  {
    slug: "gastro",
    nazev: "Gastro a ubytování",
    podnazev: "restaurace, kavárny, penziony, hotely",
    bolest: "Kuchyně jede. Telefon taky. Recepce spí, hosté ne.",
    nadpis: "Kuchyně jede. Telefon taky.",
    podnadpis: "Recepce spí. Hosté ne. Recepční rezervuje stůl i pokoj, odpoví na dotazy a každý host dostane odpověď i ve tři ráno.",
    title: "AI recepční pro restaurace, penziony a hotely | SYMBIYA",
    description: "Rezervace stolů a pokojů nonstop. AI recepční odpoví každému hostovi, i ve tři ráno. Zavolejte si demo Penzionu u Lípy.",
    demo: DEMO_GASTRO,
    hovory: [
      { dotaz: "„Stůl pro šest v pátek v 19:00?“", akce: "Zkontroluje volno, rezervuje a potvrdí." },
      { dotaz: "„Máte volný pokoj na víkend?“", akce: "Zjistí termín, počet osob a předá rezervaci." },
      { dotaz: "„Můžeme s sebou psa?“", akce: "Odpoví podle vašich pravidel." },
      { dotaz: "„Přijedeme až v jedenáct večer.“", akce: "Zapíše pozdní příjezd a vysvětlí, jak se dostat ke klíčům." },
    ],
    prepis: [
      { kdo: "recepce", text: "Penzion u Lípy, dobrý večer. Jak vám můžu pomoct?" },
      { kdo: "klient", text: "Dobrý večer, máte volný dvoulůžkový pokoj na pátek a sobotu?" },
      { kdo: "recepce", text: "Ano, dvoulůžkový pokoj je volný. Pojedete sami, nebo i se zvířetem?" },
      { kdo: "klient", text: "S malým psem. Je to problém?" },
      { kdo: "recepce", text: "Psi jsou u nás vítáni. Kdy zhruba dorazíte?" },
      { kdo: "klient", text: "Asi v jedenáct večer." },
      { kdo: "recepce", text: "Zapíšu pozdní příjezd. Klíče budou v boxu u vchodu, kód a potvrzení rezervace vám přijdou SMS." },
    ],
    potrebuje: ["Kapacitu stolů nebo pokojů", "Otevírací dobu a pravidla rezervací", "Pravidla pro zvířata, děti, pozdní příjezd", "Jak vám předávat rezervace"],
  },
];

export const najdiObor = (slug: string) => obory.find((o) => o.slug === slug);
