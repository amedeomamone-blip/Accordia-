import React from "https://esm.sh/react@18";
import OriginiTopicLesson from "./OriginiTopicLessonTemplate.module.js";

const lesson = {
  model: {
    id: "storico-sociale",
    label: "Lezione storico-sociale / interpretativa",
    theoryShare: 50,
    practiceShare: 50,
  },
  title: "Musica, comunicazione e funzioni sociali",
  question: "Che cosa puo fare il suono per una comunita oltre a essere bello da ascoltare?",
  subtitle:
    "Il suono chiama, segnala, organizza, accompagna il lavoro, sostiene la festa e rende riconoscibile un gesto comune.",
  heroWord: "segnale",
  heroPrelude: "Il suono non serve solo a esprimere",
  heroEcho: "serve anche a chiamare e coordinare",
  heroTags: ["richiamo", "coordinazione", "festa", "memoria"],
  heroNote:
    "Le fonti sulle civilta antiche mostrano che il suono accompagna battaglia, banchetto, rito, lavoro e celebrazione.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Musica, comunicazione e funzioni sociali" },
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: "../suono-nella-preistoria/index.html",
    homeHref: "../../../../index.html",
  },
  meta: [
    { label: "Durata", value: "2 ore" },
    { label: "Ti serve", value: "voce, corpo, spazio, scheda" },
    { label: "Obiettivo", value: "distinguere usi pratici, simbolici e collettivi del suono" },
  ],
  opening: {
    title: "Riconosci il segnale del gruppo",
    intro:
      "Anche in aula il suono puo ordinare l'azione. Un battito, una parola breve o un accento comune bastano a far partire o fermare tutti.",
    cardTitle: "Prova il richiamo",
    meta: [
      { label: "Durata", value: "30 secondi" },
      { label: "Ti serve", value: "voce o mani" },
      { label: "Alla fine", value: "riconosci un suono che orienta il gruppo" },
    ],
    steps: [
      "Ascolta un richiamo breve dell'insegnante o del compagno.",
      "Ripeti il gesto tutti insieme una sola volta.",
      "Decidi se quel suono serve a partire, fermarsi o radunarsi.",
    ],
    observe: [
      "Che cosa rende immediato un richiamo?",
      "Il suono organizza o confonde il gruppo?",
      "Serve piu forza o piu chiarezza?",
    ],
    result: "Capisci che un suono puo avere una funzione sociale prima ancora di diventare brano.",
    side: {
      type: "flow",
      items: ["chiama", "raduna", "coordina", "ricorda"],
      ariaLabel: "Funzioni di un segnale sonoro",
    },
  },
  exploration: {
    title: "Dal richiamo alla festa",
    intro:
      "Le fonti scolastiche sulle civilta antiche mostrano che il suono accompagna sia i momenti pratici sia quelli solenni: battaglia, banchetto, danza, cerimonia.",
    layout: "essay-side",
    cardsPosition: "after",
    side: {
      type: "flow",
      items: ["segnala", "coordina", "celebra", "ricorda"],
      ariaLabel: "Quattro funzioni sociali del suono",
    },
    cards: [
      {
        title: "Richiamo",
        caption: "Un suono breve serve a farsi riconoscere subito: chiamare, radunare, avvisare, orientare.",
        chips: ["voce", "tromba", "battito"],
      },
      {
        title: "Coordinazione",
        caption: "Un battito comune aiuta il gruppo a camminare, lavorare, remare, marciare o entrare insieme nello stesso gesto.",
        chips: ["passo", "metro", "insieme"],
      },
      {
        title: "Celebrazione",
        caption: "Banchetti, danze e vittorie hanno bisogno di suoni riconoscibili per segnare appartenenza e clima condiviso.",
        chips: ["festa", "danza", "vittoria"],
      },
    ],
    paragraphs: [
      "Le fonti sul mondo antico ricordano strumenti usati come segnali in battaglia, canti e danze nei banchetti, cori e pratiche collettive nelle cerimonie. Questo allarga il concetto di musica: non solo ascolto, ma azione nel gruppo.",
      "Per questo conviene distinguere funzione pratica e funzione simbolica senza separarle troppo: spesso lo stesso suono chiama, coordina e insieme rafforza l'identita di una comunita.",
      "La domanda giusta, quindi, non e soltanto che suono sentiamo, ma che cosa quel suono permette di fare a una comunita in una situazione concreta.",
    ],
    questionsTitle: "Domande di lettura",
    questions: [
      "Quando un suono funziona come segnale?",
      "Quando invece serve a tenere insieme il gruppo nel tempo?",
      "Che cosa cambia tra richiamo, festa e memoria?",
    ],
    panels: [
      {
        title: "Tre contesti da leggere",
        kind: "timeline",
        items: [
          { label: "01", title: "Battaglia", text: "Segnali a fiato orientano i movimenti e rendono immediato il comando.", note: "segnale" },
          { label: "02", title: "Banchetto", text: "Musica e danza accompagnano la socialita e costruiscono il clima del momento.", note: "festa" },
          { label: "03", title: "Coro o cerimonia", text: "La voce comune rafforza memoria, solennita e riconoscimento reciproco.", note: "memoria" },
        ],
      },
      {
        title: "Domanda guida",
        kind: "text",
        paragraphs: [
          "Se un gruppo deve muoversi insieme, ricordare una formula o rendere solenne un passaggio, il suono diventa uno strumento di organizzazione sociale.",
        ],
      },
    ],
  },
  active: {
    title: "Costruisci una guida alle funzioni del suono",
    intro:
      "Prendi situazioni diverse e prova a spiegare che cosa fa il suono in ciascun caso: chiamare, coordinare, celebrare, ricordare.",
    cardTitle: "Ordina gli usi",
    meta: [
      { label: "Durata", value: "15 minuti" },
      { label: "Ti serve", value: "scheda, parole chiave, esempi" },
      { label: "Alla fine", value: "una mappa di funzioni leggibili" },
    ],
    steps: [
      "Scegli quattro situazioni: richiamo, lavoro comune, festa, cerimonia.",
      "Per ciascuna, scrivi quale suono immagini e che cosa permette al gruppo di fare.",
      "Aggiungi un verbo chiave: chiamare, coordinare, celebrare, ricordare.",
      "Controlla se due situazioni usano il suono in modi simili o diversi.",
    ],
    observe: [
      "La funzione e descritta con un verbo preciso?",
      "Il suono serve davvero al gruppo o solo all'effetto?",
      "Sai spiegare perche una pratica e piu utile di un'altra in quel contesto?",
    ],
    result: "La tua guida mostra che il suono agisce dentro la vita sociale della comunita.",
    side: {
      type: "terms",
      items: [
        { term: "Segnale", text: "Serve a farsi capire subito da chi ascolta.", example: "chiama / avvisa" },
        { term: "Coordinazione", text: "Tiene insieme movimenti e tempi del gruppo.", example: "marcia / lavoro" },
        { term: "Celebrazione", text: "Rende condiviso un momento importante.", example: "danza / vittoria" },
      ],
    },
    panels: [
      {
        title: "Mappa rapida",
        kind: "terms",
        items: [
          { term: "Richiamo", text: "Suono breve, leggibile, diretto.", example: "subito" },
          { term: "Ritmo comune", text: "Battito che organizza il gruppo nel tempo.", example: "insieme" },
          { term: "Memoria", text: "Formula sonora che aiuta a ricordare o riconoscersi.", example: "ritorno" },
          { term: "Funzione sociale", text: "Uso del suono legato a una situazione collettiva.", example: "gruppo" },
        ],
      },
      {
        title: "Confronto tra contesti",
        kind: "timeline",
        items: [
          { label: "A", title: "Caccia o spostamento", text: "Il suono orienta e sincronizza il gruppo mentre l'azione e in corso.", note: "coordinazione" },
          { label: "B", title: "Festa o banchetto", text: "Il suono crea partecipazione, piacere e riconoscimento reciproco.", note: "celebrazione" },
          { label: "C", title: "Cerimonia", text: "Il suono rende piu memorabile e leggibile un momento condiviso.", note: "solennita" },
          { label: "D", title: "Vittoria", text: "Il suono annuncia, mostra e conserva nella memoria un evento del gruppo.", note: "ricordo" },
        ],
      },
    ],
    promptsTitle: "Interpreta i casi",
    prompts: [
      "Quale funzione pratica riconosci per prima?",
      "Quale uso del suono e piu vicino alla memoria del gruppo?",
      "Dove il confine tra pratica e simbolo diventa meno netto?",
    ],
  },
  followupTitle: "Dopo il confronto, rendi le funzioni piu leggibili",
  followupIntro:
    "Qui teoria e attivita restano in equilibrio: osservi i contesti, li ordini e poi li trasformi in una guida, una restituzione orale e una verifica ragionata.",
  followupDefault: "produzione",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Stringi la tua mappa",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "la guida gia compilata" },
        { label: "Alla fine", value: "verbi e funzioni piu nitidi" },
      ],
      steps: [
        "Sostituisci una frase lunga con un verbo chiaro.",
        "Evidenzia le funzioni che si ripetono in piu contesti.",
        "Elimina un esempio che non spiega davvero la funzione sociale.",
      ],
      observe: [
        "Ogni contesto ha una funzione leggibile?",
        "La tua guida evita descrizioni generiche come bello o forte?",
      ],
      result: "La mappa diventa piu utile per spiegare e confrontare.",
    },
    produzione: {
      label: "Produzione",
      title: "Prepara una guida espositiva",
      meta: [
        { label: "Durata", value: "10 minuti" },
        { label: "Ti serve", value: "cartellone o slide" },
        { label: "Alla fine", value: "una guida pronta da mostrare" },
      ],
      steps: [
        "Scegli tre contesti e disponili in ordine logico.",
        "Per ciascuno scrivi funzione, suono e gesto del gruppo.",
        "Chiudi con una frase che spieghi perche il suono e uno strumento sociale.",
      ],
      observe: [
        "Il lettore capisce perche ogni suono serve?",
        "Gli esempi si distinguono tra loro con chiarezza?",
      ],
      result: "Il tuo pannello mostra il suono come azione collettiva.",
    },
    condivisione: {
      label: "Condivisione",
      title: "Confronta le funzioni",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "due mappe di gruppo" },
        { label: "Alla fine", value: "vedi usi diversi dello stesso suono" },
      ],
      steps: [
        "Leggi la mappa di un altro gruppo.",
        "Cerca una funzione uguale e una funzione diversa rispetto alla tua.",
        "Spiega dove avete messo l'accento in modo differente.",
      ],
      observe: [
        "Due gruppi hanno usato gli stessi verbi?",
        "Una stessa pratica puo servire a piu funzioni?",
      ],
      result: "Capisci che il suono sociale cambia con il contesto.",
    },
    valutazione: {
      label: "Valutazione",
      title: "Controlla che cosa sai distinguere",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "usi meglio il lessico della funzione" },
      ],
      quiz: [
        {
          id: "q1",
          prompt: "A che cosa serve un segnale sonoro?",
          options: [
            {
              id: "q1a",
              label: "A farsi riconoscere e capire subito da un gruppo.",
              correct: true,
              feedback: "Esatto. Il segnale punta a immediatezza e chiarezza.",
            },
            {
              id: "q1b",
              label: "Solo a fare piu rumore degli altri.",
              correct: false,
              feedback: "No. La forza non basta se il gruppo non capisce la funzione.",
            },
          ],
        },
        {
          id: "q2",
          prompt: "Che differenza c'e tra coordinare e celebrare?",
          options: [
            {
              id: "q2a",
              label: "Coordinare ordina l'azione; celebrare rende condiviso un momento importante.",
              correct: true,
              feedback: "Esatto. Le due funzioni possono incontrarsi, ma non sono identiche.",
            },
            {
              id: "q2b",
              label: "Sono due modi equivalenti per dire la stessa cosa.",
              correct: false,
              feedback: "Non proprio. Una riguarda l'organizzazione del gesto, l'altra il valore del momento.",
            },
          ],
        },
        {
          id: "q3",
          prompt: "Perche il suono ha una funzione sociale?",
          options: [
            {
              id: "q3a",
              label: "Perche agisce dentro situazioni collettive e modifica il comportamento del gruppo.",
              correct: true,
              feedback: "Esatto. Il suono orienta, unisce, segnala e rende leggibile un'azione comune.",
            },
            {
              id: "q3b",
              label: "Perche esiste solo quando qualcuno e solo.",
              correct: false,
              feedback: "No. Qui stiamo parlando proprio del rapporto tra suono e comunita.",
            },
          ],
        },
      ],
      selfCheck: [
        "Riesci a distinguere segnale, coordinazione e celebrazione?",
        "Riesci a collegare un suono a una funzione concreta del gruppo?",
        "Riesci a spiegare perche la musica e anche organizzazione sociale?",
      ],
    },
    chiusura: {
      label: "Chiusura",
      title: "Ricorda l'idea centrale",
      line: "Il suono non serve solo a esprimere: chiama, orienta, coordina e rende condivisibile la vita del gruppo.",
      bridge:
        "Nella lezione successiva vedrai che in alcuni contesti questa funzione sociale si concentra in forme rituali, simboliche e identitarie molto forti.",
    },
  },
};

export default function MusicaComunicazioneFunzioniSocialiLesson() {
  return <OriginiTopicLesson lesson={lesson} />;
}
