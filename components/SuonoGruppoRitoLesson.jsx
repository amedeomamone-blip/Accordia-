import React from "https://esm.sh/react@18";
import OriginiTopicLesson from "./OriginiTopicLessonTemplate.module.js";

const lesson = {
  model: {
    id: "storico-sociale",
    label: "Lezione storico-sociale / interpretativa",
    theoryShare: 55,
    practiceShare: 45,
  },
  title: "Suono, gruppo e rito",
  question: "Perche alcuni suoni fanno sentire un gruppo piu unito di altri?",
  subtitle:
    "Il suono non serve solo a fare rumore o a divertire. Puo chiamare, tenere insieme, celebrare, ricordare e trasformare un gesto comune in una formula che il gruppo riconosce.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Suono, gruppo e rito" },
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: "../oggetti-che-suonano/index.html",
    homeHref: "../../../../index.html",
  },
  meta: [
    { label: "Durata", value: "2 ore" },
    { label: "Ti serve", value: "voce, corpo, spazio, scheda" },
    { label: "Obiettivo", value: "distinguere segnale, festa, appartenenza e rito" },
  ],
  opening: {
    title: "Prova una formula condivisa",
    intro:
      "Una sequenza breve ripetuta insieme cambia subito il clima: non stai piu ascoltando un suono qualsiasi, ma un gesto che il gruppo riconosce come proprio.",
    cardTitle: "Ripeti e osserva",
    meta: [
      { label: "Durata", value: "3 minuti" },
      { label: "Ti serve", value: "voce o mani" },
      { label: "Alla fine", value: "riconosci l'effetto di una formula comune" },
    ],
    steps: [
      "Ascolta una formula breve di voce o mani.",
      "Ripetila tutti insieme due o tre volte senza accelerare.",
      "Aggiungi una pausa comune prima dell'ultima entrata.",
    ],
    observe: [
      "Che cosa cambia quando tutti entrano insieme?",
      "La ripetizione ti sembra un richiamo, una festa o qualcosa di piu solenne?",
      "La pausa rende il gesto piu atteso o piu forte?",
    ],
    result: "Capisci che la forma condivisa da al suono un valore collettivo.",
    side: {
      type: "flow",
      items: ["chiama", "raccoglie", "ripete", "riconosce"],
      ariaLabel: "Passaggi di una formula collettiva",
    },
  },
  exploration: {
    title: "Il suono tiene insieme il gruppo in modi diversi",
    intro:
      "Le fonti scolastiche sulle culture antiche mostrano un'idea ricorrente: il suono serve a orientare il gruppo, a segnare passaggi, a creare partecipazione e a rendere visibile un'appartenenza comune.",
    layout: "essay-side",
    cardsPosition: "after",
    side: {
      type: "timeline",
      ariaLabel: "Funzioni del suono nel gruppo",
      items: [
        {
          label: "01",
          title: "Chiamare",
          text: "Un segnale breve puo radunare, avvisare, guidare o dare l'inizio a un'azione comune.",
          note: "segnale",
        },
        {
          label: "02",
          title: "Coordinare",
          text: "Battiti, richiami e formule regolari aiutano il gruppo a muoversi nello stesso tempo.",
          note: "insieme",
        },
        {
          label: "03",
          title: "Celebrare",
          text: "Il suono crea clima, energia e partecipazione in momenti condivisi.",
          note: "festa",
        },
        {
          label: "04",
          title: "Ritualizzare",
          text: "La ripetizione stabile e il valore simbolico trasformano il gesto in rito.",
          note: "rito",
        },
      ],
    },
    paragraphs: [
      "Questa lezione unisce due idee che da sole rischiano di restare astratte. Da una parte il suono ha funzioni molto pratiche: chiama, coordina, accompagna. Dall'altra alcune formule diventano piu dense di significato e il gruppo le vive come momenti di passaggio o appartenenza.",
      "Per capire bene il rito, pero, conviene partire da casi concreti. Non tutto cio che e collettivo e rituale. Una festa puo essere condivisa, un segnale puo essere efficace, ma il rito chiede qualcosa in piu: formula stabile, ripetizione riconosciuta, valore simbolico e memoria del gruppo.",
      "La domanda centrale quindi non e solo che suono sento, ma che cosa fa quel suono al gruppo e che cosa il gruppo riconosce dentro quel gesto.",
    ],
    questionsTitle: "Domande di lettura",
    questions: [
      "Quale differenza senti tra un semplice segnale e una formula condivisa?",
      "Che cosa rende un suono utile al gruppo anche senza strumenti complessi?",
      "Quando una ripetizione sembra solo pratica e quando invece sembra rituale?",
    ],
    cards: [
      {
        title: "Segnale",
        caption: "Conta l'immediatezza: il suono orienta un'azione rapida o chiama l'attenzione.",
        chips: ["subito", "richiamo"],
      },
      {
        title: "Festa",
        caption: "Conta il clima condiviso: il gruppo partecipa, si muove, celebra insieme.",
        chips: ["energia", "partecipazione"],
      },
      {
        title: "Rito",
        caption: "Conta il valore simbolico: il suono accompagna una soglia, una formula o una credenza.",
        chips: ["passaggio", "formula"],
      },
    ],
    panels: [
      {
        title: "Parole da tenere distinte",
        kind: "terms",
        items: [
          { term: "Segnale", text: "Suono che orienta, avvisa o richiama in modo rapido.", example: "inizio / allarme" },
          { term: "Appartenenza", text: "Sentirsi parte dello stesso gesto e della stessa memoria.", example: "noi" },
          { term: "Formula", text: "Sequenza breve che torna simile a se stessa e viene riconosciuta.", example: "ritorno" },
          { term: "Rito", text: "Pratica sonora che aggiunge un valore simbolico stabile al gesto.", example: "passaggio" },
        ],
      },
      {
        title: "Da non confondere",
        kind: "text",
        paragraphs: [
          "Non tutto cio che si ripete e rituale. La ripetizione diventa rito quando il gruppo le attribuisce un significato stabile e condiviso.",
        ],
      },
    ],
  },
  active: {
    title: "Confronta tre situazioni sonore",
    intro:
      "La comprensione attiva qui resta concreta: prendi casi diversi e prova a dire se il suono serve soprattutto a richiamare, a celebrare o a ritualizzare, motivando sempre la scelta.",
    cardTitle: "Leggi la funzione del suono",
    meta: [
      { label: "Durata", value: "14 minuti" },
      { label: "Ti serve", value: "scheda, esempi, parole chiave" },
      { label: "Alla fine", value: "una distinzione piu precisa tra usi del suono" },
    ],
    steps: [
      "Scegli tre situazioni: richiamo di gruppo, momento di festa, cerimonia di passaggio.",
      "Scrivi che cosa si ripete, chi partecipa e quale effetto produce.",
      "Indica se il suono serve soprattutto a coordinare, celebrare o ritualizzare.",
      "Motiva ogni scelta con un indizio preciso.",
    ],
    observe: [
      "Il gruppo entra tutto insieme o ascolta da fuori?",
      "La ripetizione serve a tenere il tempo o a dare un significato al momento?",
      "Il contesto fa pensare a segnale, festa o rito?",
    ],
    result: "Riesci a spiegare in modo semplice perche alcuni suoni uniscono il gruppo piu di altri.",
    side: {
      type: "terms",
      items: [
        { term: "Ripetizione", text: "Fa riconoscere il gesto e lo rende memorizzabile.", example: "ritorno" },
        { term: "Entrata comune", text: "Il gruppo parte insieme e si sente parte dello stesso gesto.", example: "insieme" },
        { term: "Valore simbolico", text: "Il suono significa qualcosa oltre alla sua utilita pratica.", example: "soglia" },
      ],
    },
    panels: [
      {
        title: "Criteri di distinzione",
        kind: "timeline",
        items: [
          { label: "A", title: "Segnale", text: "Conta l'efficacia immediata: il gruppo deve capire e reagire.", note: "pratico" },
          { label: "B", title: "Festa", text: "Conta il clima condiviso: il gruppo partecipa e celebra.", note: "clima" },
          { label: "C", title: "Rito", text: "Conta il significato: il gruppo riconosce una formula e un passaggio.", note: "simbolo" },
        ],
      },
      {
        title: "Mappa rapida",
        kind: "terms",
        items: [
          { term: "Chiamare", text: "Radunare o orientare rapidamente.", example: "via / qui" },
          { term: "Tenere insieme", text: "Sostenere il gruppo nello stesso tempo.", example: "battito" },
          { term: "Ricordare", text: "Fare tornare una memoria comune.", example: "formula" },
          { term: "Celebrare", text: "Dare rilievo a un momento condiviso.", example: "cerimonia" },
        ],
      },
    ],
    promptsTitle: "Argomenta la scelta",
    prompts: [
      "Quale indizio ti fa parlare davvero di rito?",
      "In quale caso il suono serve soprattutto a coordinare il gruppo?",
      "Perche il contesto conta quanto il suono stesso?",
    ],
  },
  followupTitle: "Dopo il confronto, rendi piu leggibile il legame tra suono, gruppo e significato",
  followupIntro:
    "Questa lezione chiude il nucleo mettendo insieme pratica e interpretazione: osservi casi concreti, chiarisci il lessico e trasformi tutto in una spiegazione condivisa.",
  followupDefault: "produzione",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Stringi la distinzione",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "la scheda gia avviata" },
        { label: "Alla fine", value: "usi parole piu precise" },
      ],
      steps: [
        "Sostituisci una parola troppo generica con una piu precisa.",
        "Sottolinea dove hai scritto il valore simbolico del gesto.",
        "Cancella un esempio che funziona solo come festa ma non come rito.",
      ],
      observe: [
        "Il lettore distingue subito segnale, festa e rito?",
        "Ogni situazione ha almeno un indizio concreto?",
      ],
      result: "La tua analisi diventa piu leggibile e meno vaga.",
    },
    produzione: {
      label: "Produzione",
      title: "Prepara una mappa su suono e gruppo",
      meta: [
        { label: "Durata", value: "10 minuti" },
        { label: "Ti serve", value: "cartellone o slide" },
        { label: "Alla fine", value: "una sintesi pronta da mostrare" },
      ],
      steps: [
        "Scegli tre parole chiave: chiamare, celebrare, ritualizzare.",
        "Associa a ciascuna un esempio concreto e breve.",
        "Chiudi con una frase che spieghi perche il rito non coincide con ogni attivita collettiva.",
      ],
      observe: [
        "La mappa fa capire il ruolo del gruppo?",
        "Il lettore vede la differenza tra uso pratico e uso simbolico?",
      ],
      result: "La tua sintesi mostra il suono come pratica che costruisce relazione e significato.",
    },
    condivisione: {
      label: "Condivisione",
      title: "Confronta due letture",
      meta: [
        { label: "Durata", value: "7 minuti" },
        { label: "Ti serve", value: "due schede di gruppo" },
        { label: "Alla fine", value: "vedi meglio i confini tra le funzioni" },
      ],
      steps: [
        "Leggi la scheda di un altro gruppo.",
        "Segna un esempio in cui siete d'accordo e uno in cui differite.",
        "Spiegate insieme quale indizio vi ha fatto cambiare idea.",
      ],
      observe: [
        "Avete usato gli stessi criteri per dire che qualcosa e rituale?",
        "Un caso poteva stare in piu di una categoria?",
      ],
      result: "Capisci che le funzioni del suono si toccano, ma non coincidono sempre.",
    },
    valutazione: {
      label: "Valutazione",
      title: "Controlla che cosa sai distinguere",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "usi un lessico piu preciso" },
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Che cosa rende rituale una pratica sonora?",
          options: [
            {
              id: "q1a",
              label: "Il legame con una formula condivisa, un passaggio e un valore simbolico per il gruppo.",
              correct: true,
              feedback: "Esatto. Il rito chiede significato stabile e riconosciuto.",
            },
            {
              id: "q1b",
              label: "Il semplice fatto che molti partecipino insieme.",
              correct: false,
              feedback: "Non basta. Anche festa e segnale possono essere collettivi.",
            },
          ],
        },
        {
          id: "q2",
          prompt: "A che cosa serve un segnale?",
          options: [
            {
              id: "q2a",
              label: "A orientare o richiamare il gruppo in modo immediato.",
              correct: true,
              feedback: "Esatto. Nel segnale conta soprattutto l'efficacia pratica.",
            },
            {
              id: "q2b",
              label: "A sostituire ogni forma di appartenenza o memoria.",
              correct: false,
              feedback: "No. Il segnale non esaurisce tutte le funzioni del suono.",
            },
          ],
        },
        {
          id: "q3",
          prompt: "Perche questa lezione chiude bene il nucleo?",
          options: [
            {
              id: "q3a",
              label: "Perche mette insieme ritmo, corpo, oggetti e funzione dentro la vita del gruppo.",
              correct: true,
              feedback: "Esatto. Qui le lezioni precedenti trovano una funzione comune.",
            },
            {
              id: "q3b",
              label: "Perche elimina il bisogno di guardare alle altre lezioni del nucleo.",
              correct: false,
              feedback: "Non proprio. Chiude il percorso proprio collegando tutto il resto.",
            },
          ],
        },
      ],
      selfCheck: [
        "Sai distinguere segnale, festa e rito?",
        "Sai spiegare il ruolo del gruppo dentro una pratica sonora?",
        "Sai dire quando una ripetizione ha un valore simbolico piu forte?",
      ],
    },
    chiusura: {
      label: "Chiusura",
      title: "Rimetti insieme il percorso",
      line: "Il suono delle origini non vive mai da solo: nasce nel corpo, si organizza nel ritmo, passa negli oggetti e trova nel gruppo la sua funzione piu chiara.",
      bridge: "Il nucleo si chiude qui. Tornando alla mappa vedrai meglio come le cinque lezioni raccontano un unico problema da angolature diverse.",
    },
  },
};

export default function SuonoGruppoRitoLesson() {
  return <OriginiTopicLesson lesson={lesson} />;
}
