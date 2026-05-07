import React from "https://esm.sh/react@18";
import OriginiTopicLesson from "./OriginiTopicLessonTemplate.module.js";

const lesson = {
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
    cards: [
      {
        title: "Ambiente",
        caption: "Vento, acqua, pietra, legno, eco e voce aiutano a immaginare come suonasse un territorio prima della scrittura.",
        chips: ["grotta", "vento", "acqua", "eco"],
      },
      {
        title: "Reperto",
        caption: "Un oggetto forato, consumato o battuto puo suggerire un uso sonoro, ma non basta da solo a raccontare tutta la pratica.",
        chips: ["osso", "conchiglia", "pietra", "usura"],
      },
      {
        title: "Pratica",
        caption: "Figure in movimento, gesti collettivi e rituali ci aiutano a collegare il suono a gruppo, danza, richiamo e memoria.",
        chips: ["gesto", "gruppo", "danza", "memoria"],
      },
    ],
    paragraphs: [
      "Le fonti didattiche ricordano che della musica delle origini non abbiamo testimonianze scritte o registrazioni: possiamo lavorare solo su cio che resta e su cio che torna plausibile dentro un contesto.",
      "Questo significa leggere con prudenza. Un reperto puo essere importante, ma va sempre collegato ad ambiente, funzione possibile e confronto con altre tracce.",
    ],
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
  },
  active: {
    title: "Costruisci una scheda di ricostruzione sonora",
    intro:
      "Lavora come un piccolo laboratorio storico: raccogli indizi, separa i livelli di certezza e proponi una funzione possibile senza trasformare l'ipotesi in prova.",
    cardTitle: "Metti ordine nelle tracce",
    meta: [
      { label: "Durata", value: "15 minuti" },
      { label: "Ti serve", value: "scheda, matita, immagini" },
      { label: "Alla fine", value: "una ricostruzione ragionata" },
    ],
    steps: [
      "Scegli un contesto: grotta, spazio aperto, gruppo in movimento, reperto.",
      "Scrivi che cosa puoi osservare con certezza.",
      "Aggiungi un'ipotesi di uso sonoro e una possibile funzione.",
      "Controlla che ogni frase dica chiaramente se e dato, indizio o interpretazione.",
    ],
    observe: [
      "Hai separato quello che sai da quello che supponi?",
      "L'ipotesi tiene conto del luogo e del materiale?",
      "La funzione proposta e credibile per un gruppo umano delle origini?",
    ],
    result: "La tua scheda spiega il passato senza confondere prova e fantasia.",
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
        title: "Mappa rapida",
        kind: "terms",
        items: [
          { term: "Oralita", text: "Molte pratiche sonore si trasmettono per imitazione e memoria, non per scrittura.", example: "si impara facendo" },
          { term: "Contesto", text: "Luogo, gruppo e gesto contano quanto l'oggetto.", example: "grotta / raduno / spostamento" },
          { term: "Prudenza", text: "Ogni ricostruzione storica deve dichiarare il proprio grado di certezza.", example: "dato / ipotesi" },
        ],
      },
      {
        title: "Tracce da collegare",
        kind: "cards",
        columns: 2,
        items: [
          { title: "Pietra", caption: "Percussione, eco, superfici dure.", chips: ["colpo", "rimbalzo"] },
          { title: "Osso", caption: "Oggetto lavorato, foro, soffio possibile.", chips: ["utensile", "suono"] },
          { title: "Voce", caption: "Richiamo, imitazione, parola primitiva.", chips: ["gruppo", "memoria"] },
          { title: "Spazio", caption: "Una grotta modifica ascolto e risonanza.", chips: ["eco", "risonanza"] },
        ],
      },
    ],
    prompts: [
      "Quale elemento della tua scheda e davvero certo?",
      "Dove comincia l'interpretazione?",
      "Che cosa ti impedisce di raccontare il passato con troppa sicurezza?",
    ],
  },
  followupDefault: "produzione",
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
