import React from "https://esm.sh/react@18";
import OriginiTopicLesson from "./OriginiTopicLessonTemplate.module.js";

const lesson = {
  model: {
    id: "teorico-esplorativa",
    label: "Lezione teorico-esplorativa",
    theoryShare: 65,
    practiceShare: 35,
  },
  title: "Suono nella preistoria",
  question: "Come possiamo immaginare un suono di cui non esiste registrazione?",
  subtitle:
    "Non abbiamo spartiti, audio o cronache dirette. Possiamo pero leggere ambiente, reperti, immagini e gesti ripetuti con prudenza storica.",
  heroWord: "tracce",
  heroPrelude: "Del suono antico non resta l'audio",
  heroEcho: "restano indizi da leggere con prudenza",
  heroTags: ["ambiente", "reperti", "ipotesi", "prudenza"],
  heroNote:
    "Le fonti ci aiutano a distinguere cio che possiamo osservare da cio che possiamo solo immaginare.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Suono nella preistoria" },
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: "../ritmo-pulsazione-tempo/index.html",
    homeHref: "../../../../index.html",
  },
  meta: [
    { label: "Durata", value: "2 ore" },
    { label: "Ti serve", value: "immagini, suoni naturali, foglio" },
    { label: "Obiettivo", value: "distinguere dato, indizio, ipotesi e funzione" },
  ],
  opening: {
    title: "Ascolta quello che lascia traccia",
    intro:
      "Prima di parlare di preistoria sonora, prova a capire quali suoni del presente lasciano una traccia visibile, materiale o condivisa.",
    cardTitle: "Fermati e separa",
    meta: [
      { label: "Durata", value: "30 secondi" },
      { label: "Ti serve", value: "silenzio, sguardo, orecchio" },
      { label: "Alla fine", value: "distingui osservazione e immaginazione" },
    ],
    steps: [
      "Resta in silenzio per 30 secondi e ascolta l'aula.",
      "Scrivi due suoni che senti davvero e due suoni che stai immaginando.",
      "Prova a dire quale dei quattro potrebbe lasciare una traccia materiale.",
    ],
    observe: [
      "Che cosa puoi ascoltare adesso con certezza?",
      "Quale suono puoi solo immaginare?",
      "Quale traccia potrebbe restare anche dopo che il suono finisce?",
    ],
    result: "Capisci che non ogni immagine del passato vale come prova sonora.",
    side: {
      type: "flow",
      items: ["ascolta", "osserva", "distingui", "argomenta"],
      ariaLabel: "Passaggi per leggere una traccia sonora",
    },
  },
  exploration: {
    title: "Paesaggio sonoro senza registrazioni",
    intro:
      "Le fonti storiche ricordano che la musica antica e originaria ci e arrivata soprattutto per tracce indirette: ambiente, immagini, reperti, oralita.",
    layout: "essay-side",
    side: {
      type: "timeline",
      ariaLabel: "Tipi di traccia usati per ricostruire il suono preistorico",
      items: [
        {
          label: "01",
          title: "Ambiente",
          text: "Eco, vento, acqua, pietra e spazi aperti o chiusi aiutano a capire come il paesaggio partecipasse all'ascolto.",
          note: "luogo",
        },
        {
          label: "02",
          title: "Reperto",
          text: "Oggetti forati, consumati o percossi suggeriscono usi possibili, ma non bastano da soli a chiudere l'interpretazione.",
          note: "materia",
        },
        {
          label: "03",
          title: "Immagine o gesto",
          text: "Scene in movimento e pratiche collettive aiutano a collegare il suono a danza, richiamo, rito e memoria del gruppo.",
          note: "pratica",
        },
      ],
    },
    paragraphs: [
      "Le fonti didattiche ricordano che della musica delle origini non abbiamo testimonianze scritte o registrazioni: possiamo lavorare solo su cio che resta e su cio che torna plausibile dentro un contesto.",
      "Questo significa leggere con prudenza. Un reperto puo essere importante, ma va sempre collegato ad ambiente, funzione possibile e confronto con altre tracce.",
      "La ricostruzione storica non chiede di inventare liberamente: chiede di tenere distinti dato osservabile, indizio interpretativo e ipotesi plausibile.",
    ],
    questionsTitle: "Domande guida",
    questions: [
      "Che differenza c'e tra un dato osservabile e una ricostruzione plausibile?",
      "Perche l'ambiente conta quanto il reperto?",
      "Quando un'immagine ci aiuta davvero a parlare di suono?",
    ],
    evidence: [
      {
        label: "Traccia visiva",
        title: "Figure in movimento",
        body: "Una scena rupestre non registra la musica, ma puo farci ragionare su caccia, danza, gesto collettivo e funzione del gruppo.",
        image: {
          src: "../../../../assets/lesson/corpo-voce-gesto/lascaux-painting.jpg",
          alt: "Pittura rupestre di Lascaux",
        },
      },
      {
        label: "Traccia materiale",
        title: "Osso forato, uso discusso",
        body: "Reperti come il flauto di Divje Babe aprono ipotesi forti, ma richiedono cautela: datazione e funzione vanno sempre presentate come campo di studio.",
        image: {
          src: "../../../../assets/lesson/corpo-voce-gesto/divje-babe-flute.jpg",
          alt: "Reperto del flauto di Divje Babe",
        },
      },
      {
        label: "Traccia sonora",
        title: "Ambiente che risponde",
        body: "Eco, pareti rocciose, acqua e vento aiutano a capire che il paesaggio stesso poteva partecipare all'esperienza sonora.",
      },
    ],
    panels: [
      {
        title: "Lessico del metodo",
        kind: "terms",
        items: [
          { term: "Dato", text: "Cio che puoi mostrare, documentare o descrivere direttamente.", example: "reperto / immagine" },
          { term: "Indizio", text: "Cio che orienta la lettura ma non chiude ancora il significato.", example: "foro / usura / eco" },
          { term: "Ipotesi", text: "Una ricostruzione plausibile fondata su piu tracce messe insieme.", example: "uso sonoro" },
        ],
      },
      {
        title: "Cautela storica",
        kind: "text",
        paragraphs: [
          "Parlare di suono nella preistoria significa dichiarare sempre il grado di certezza di cio che stiamo dicendo. Questa trasparenza e parte del contenuto, non un dettaglio tecnico.",
        ],
      },
    ],
  },
  active: {
    title: "Analizza una traccia e costruisci una scheda breve",
    intro:
      "Qui l'attivita non chiede di produrre molto suono, ma di ragionare con metodo: scegli una traccia, separa i livelli di certezza e formula una ricostruzione breve ma fondata.",
    cardTitle: "Leggi la fonte con metodo",
    meta: [
      { label: "Durata", value: "12 minuti" },
      { label: "Ti serve", value: "scheda, matita, immagini" },
      { label: "Alla fine", value: "una scheda analitica e leggibile" },
    ],
    steps: [
      "Scegli una sola traccia: immagine, ambiente o reperto.",
      "Scrivi in una colonna cio che puoi osservare con certezza.",
      "Scrivi in una seconda colonna quale uso sonoro ti sembra plausibile.",
      "Chiudi con una frase che distingua apertamente dato, indizio e interpretazione.",
    ],
    observe: [
      "Hai separato bene osservazione e ipotesi?",
      "L'interpretazione tiene conto del luogo, del materiale e del gesto?",
      "Stai dicendo dove finisce la prova e dove comincia la ricostruzione?",
    ],
    result: "La tua scheda spiega il passato senza confondere fonte, indizio e fantasia.",
    side: {
      type: "terms",
      items: [
        { term: "Dato", text: "Cio che puoi osservare o documentare direttamente.", example: "reperto, immagine, materiale" },
        { term: "Indizio", text: "Un elemento che orienta l'interpretazione ma non la chiude.", example: "usura, foro, gesto" },
        { term: "Ipotesi", text: "Una ricostruzione plausibile fondata su piu indizi.", example: "uso sonoro possibile" },
      ],
    },
    panels: [
      {
        title: "Gradi di certezza",
        kind: "timeline",
        items: [
          { label: "A", title: "Osservazione", text: "Descrivi il materiale, l'immagine o il contesto senza aggiungere ancora spiegazioni.", note: "certo" },
          { label: "B", title: "Connessione", text: "Collega due o tre indizi che fanno pensare a un uso sonoro possibile.", note: "plausibile" },
          { label: "C", title: "Interpretazione", text: "Formula una ricostruzione prudente, dichiarando il suo grado di incertezza.", note: "ipotetico" },
        ],
      },
      {
        title: "Domande di controllo",
        kind: "prompts",
        items: [
          "Hai scritto almeno un elemento osservabile prima dell'ipotesi?",
          "La funzione proposta dipende davvero dalla traccia scelta?",
          "La tua scheda dichiara con onesta il proprio margine di incertezza?",
        ],
      },
    ],
    promptsTitle: "Controlla il metodo",
    prompts: [
      "Quale elemento della tua scheda e davvero certo?",
      "Dove comincia l'interpretazione?",
      "Che cosa ti impedisce di raccontare il passato con troppa sicurezza?",
    ],
  },
  followupTitle: "Dopo l'esplorazione, stringi il metodo e rendi la scheda piu leggibile",
  followupIntro:
    "Questa lezione resta soprattutto teorico-esplorativa: esplori una fonte, la analizzi e solo dopo la trasformi in tavola, confronto e restituzione sintetica.",
  followupDefault: "rielaborazione",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Rendi la scheda piu rigorosa",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "la scheda gia scritta" },
        { label: "Alla fine", value: "testo piu chiaro e onesto" },
      ],
      steps: [
        "Sottolinea in un colore i dati e in un altro le ipotesi.",
        "Taglia una frase che suona troppo sicura.",
        "Aggiungi una formula prudente dove serve: forse, potrebbe, e plausibile.",
      ],
      observe: [
        "Il lettore capisce subito dove finisce il dato?",
        "L'ipotesi e sostenuta da almeno un indizio?",
      ],
      result: "La tua ricostruzione resta convincente senza diventare arbitraria.",
    },
    produzione: {
      label: "Produzione",
      title: "Allestisci una tavola sul paesaggio sonoro preistorico",
      meta: [
        { label: "Durata", value: "10 minuti" },
        { label: "Ti serve", value: "immagine, scheda, parole chiave" },
        { label: "Alla fine", value: "una tavola leggibile dal gruppo" },
      ],
      steps: [
        "Scegli un titolo semplice per il tuo scenario sonoro.",
        "Disponi immagine, reperto e funzione in ordine chiaro.",
        "Chiudi con una riga che distingua prova e ipotesi.",
      ],
      observe: [
        "L'occhio capisce il percorso senza spiegazioni lunghe?",
        "La funzione sonora proposta e leggibile?",
      ],
      result: "Il gruppo puo leggere la tua tavola come una ricostruzione ragionata.",
    },
    condivisione: {
      label: "Condivisione",
      title: "Confronta due ricostruzioni",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "due schede di gruppo" },
        { label: "Alla fine", value: "vedi differenze di metodo" },
      ],
      steps: [
        "Ascolta la spiegazione di un altro gruppo.",
        "Segna un dato forte e un'ipotesi fragile.",
        "Restituisci il commento usando parole storiche, non giudizi frettolosi.",
      ],
      observe: [
        "L'altro gruppo distingue bene i livelli di certezza?",
        "Usa l'ambiente per sostenere l'interpretazione?",
      ],
      result: "Capisci che ricostruire il passato richiede metodo condiviso.",
    },
    valutazione: {
      label: "Valutazione",
      title: "Controlla che cosa sai sostenere",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "usi un lessico storico piu preciso" },
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Che cosa manca alla preistoria sonora?",
          options: [
            {
              id: "q1a",
              label: "Registrazioni e notazioni dirette dei suoni.",
              correct: true,
              feedback: "Esatto. Per questo lavoriamo su tracce indirette e ricostruzioni prudenti.",
            },
            {
              id: "q1b",
              label: "Ogni tipo di immagine o reperto.",
              correct: false,
              feedback: "Non proprio. Tracce e reperti esistono, ma non parlano da soli.",
            },
          ],
        },
        {
          id: "q2",
          prompt: "Che differenza c'e tra dato e ipotesi?",
          options: [
            {
              id: "q2a",
              label: "Il dato si osserva; l'ipotesi collega piu indizi in modo plausibile.",
              correct: true,
              feedback: "Esatto. La ricostruzione storica nasce da questa distinzione.",
            },
            {
              id: "q2b",
              label: "Sono due parole equivalenti per dire la stessa cosa.",
              correct: false,
              feedback: "No. Confonderle porta a racconti poco rigorosi.",
            },
          ],
        },
        {
          id: "q3",
          prompt: "Perche l'ambiente conta nello studio del suono preistorico?",
          options: [
            {
              id: "q3a",
              label: "Perche eco, materiali e spazi modificano il modo di produrre e ascoltare il suono.",
              correct: true,
              feedback: "Esatto. Il paesaggio non e sfondo neutro: partecipa all'esperienza sonora.",
            },
            {
              id: "q3b",
              label: "Perche basta conoscere il clima per sapere tutta la musica del tempo.",
              correct: false,
              feedback: "No. L'ambiente aiuta, ma non sostituisce il lavoro sulle fonti.",
            },
          ],
        },
      ],
      selfCheck: [
        "Riesci a distinguere dato, indizio e ipotesi?",
        "Riesci a spiegare perche non abbiamo una prova sonora diretta?",
        "Riesci a usare il contesto per sostenere una ricostruzione?",
      ],
    },
    chiusura: {
      label: "Chiusura",
      title: "Porta via il metodo",
      line: "Il suono delle origini non si ascolta come un documento diretto: si ricostruisce leggendo tracce, luoghi e pratiche con prudenza.",
      bridge:
        "Nella lezione successiva vedrai che il suono non serve solo a esistere: orienta il gruppo, segnala, coordina e accompagna azioni collettive.",
    },
  },
};

export default function SuonoNellaPreistoriaLesson() {
  return <OriginiTopicLesson lesson={lesson} />;
}
