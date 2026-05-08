import React from "https://esm.sh/react@18";
import OriginiTopicLesson from "./OriginiTopicLessonTemplate.module.js";

const lesson = {
  model: {
    id: "storico-antropologica",
    label: "Lezione storico-antropologica",
    theoryShare: 60,
    practiceShare: 40,
  },
  title: "Rito, magia e comunita",
  question: "Che cosa rende rituale una pratica sonora?",
  subtitle:
    "Quando un suono ritorna come formula condivisa, il gruppo non ascolta soltanto: entra in un gesto comune, riconosce un passaggio e si sente parte di una stessa appartenenza.",
  heroWord: "rito",
  heroPrelude: "Non basta fare festa",
  heroEcho: "serve una forma che il gruppo riconosce insieme",
  heroTags: ["ripetizione", "formula", "coralita", "passaggio"],
  heroNote:
    "Nelle fonti scolastiche sulle culture antiche la musica appare spesso vicina a invocazione, cerimonia, danza e identita collettiva.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Rito, magia e comunita" },
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: "../musica-comunicazione-funzioni-sociali/index.html",
    homeHref: "../../../../index.html",
  },
  meta: [
    { label: "Durata", value: "2 ore" },
    { label: "Ti serve", value: "voce, corpo, spazio, scheda" },
    { label: "Obiettivo", value: "distinguere rito, festa, richiamo e appartenenza collettiva" },
  ],
  opening: {
    title: "Riconosci una formula condivisa",
    intro:
      "Un gesto ripetuto con la stessa voce e la stessa entrata cambia subito clima: il gruppo sente che non si tratta solo di un suono qualsiasi.",
    cardTitle: "Prova la ripetizione",
    meta: [
      { label: "Durata", value: "30 secondi" },
      { label: "Ti serve", value: "voce o mani" },
      { label: "Alla fine", value: "riconosci l'effetto di una formula rituale" },
    ],
    steps: [
      "Ascolta una formula breve ripetuta sempre uguale.",
      "Ripetila tutti insieme due o tre volte senza accelerare.",
      "Aggiungi una pausa comune prima dell'ultima ripetizione.",
    ],
    observe: [
      "Che cosa cambia quando tutti entrano insieme?",
      "La ripetizione ti fa sentire un gesto piu solenne o piu quotidiano?",
      "La pausa aumenta attesa, attenzione o intensita?",
    ],
    result: "Capisci che la forma ripetuta puo dare al suono un valore collettivo e simbolico.",
    side: {
      type: "flow",
      items: ["ripeti", "entri", "riconosci", "condividi"],
      ariaLabel: "Passaggi di una formula rituale",
    },
  },
  exploration: {
    title: "Il suono come collante simbolico",
    intro:
      "Le sintesi storiche consultate ricordano che per molti popoli antichi la musica aveva un carattere sacro o magico e accompagnava momenti in cui la comunita si raccoglieva.",
    layout: "essay-side",
    side: {
      type: "timeline",
      ariaLabel: "Tre indizi della funzione rituale del suono",
      items: [
        {
          label: "01",
          title: "Invocazione",
          text: "La voce o il gesto sonoro possono chiamare, pregare o dare forma a una presenza condivisa.",
          note: "formula",
        },
        {
          label: "02",
          title: "Passaggio",
          text: "Nascita, guarigione, morte, inizio o fine di un'azione diventano piu leggibili con una sequenza riconoscibile.",
          note: "soglia",
        },
        {
          label: "03",
          title: "Appartenenza",
          text: "Cantare o battere insieme dice chi partecipa e quale memoria comune il gruppo sta riattivando.",
          note: "identita",
        },
      ],
    },
    paragraphs: [
      "Nelle fonti scolastiche sulla musica antica ricorre un'idea forte: il suono non e solo intrattenimento, ma una presenza vicina al sacro, alla cerimonia e ai momenti intensi della vita del gruppo.",
      "Per questo conviene distinguere il rituale dalla semplice festa. In una pratica rituale contano di piu la ripetizione, la formula, il ruolo del gruppo, la memoria condivisa e il legame con un passaggio riconosciuto.",
      "Questa lezione, quindi, non chiede prima di tutto di fare, ma di interpretare: capire quali indizi trasformano un gesto collettivo in una pratica simbolica.",
    ],
    questionsTitle: "Domande di interpretazione",
    questions: [
      "Quale indizio ti fa pensare che un suono sia rituale?",
      "Che differenza c'e tra ripetere per giocare e ripetere per dare forma a un momento collettivo?",
      "Dove senti piu forte il legame tra suono e appartenenza?",
    ],
    panels: [
      {
        title: "Indicatori del rituale",
        kind: "terms",
        items: [
          { term: "Formula stabile", text: "Parole, colpi o accenti tornano quasi uguali e diventano riconoscibili.", example: "ritorno" },
          { term: "Entrata comune", text: "Il gruppo parte insieme e si riconosce dentro un gesto collettivo.", example: "coralita" },
          { term: "Contesto marcato", text: "Il suono accompagna una soglia o una cerimonia.", example: "passaggio" },
          { term: "Valore simbolico", text: "Il gesto non serve solo a fare, ma anche a significare.", example: "credenza" },
        ],
      },
      {
        title: "Da non confondere",
        kind: "text",
        paragraphs: [
          "Non tutto cio che e collettivo e rituale. Una marcia puo coordinare, una festa puo celebrare, ma una pratica diventa rituale quando la comunita vi riconosce un valore simbolico stabile.",
        ],
      },
    ],
  },
  active: {
    title: "Confronta rito, festa e segnale",
    intro:
      "Prendi situazioni diverse e prova a capire che cosa cambia: qui la comprensione attiva resta soprattutto analitica, perche devi motivare ogni scelta con un indizio preciso.",
    cardTitle: "Leggi la funzione del suono",
    meta: [
      { label: "Durata", value: "12 minuti" },
      { label: "Ti serve", value: "scheda, esempi, parole chiave" },
      { label: "Alla fine", value: "una distinzione piu precisa tra usi del suono" },
    ],
    steps: [
      "Scegli tre situazioni: richiamo, festa, cerimonia di passaggio.",
      "Scrivi quale elemento si ripete e chi partecipa al gesto.",
      "Spiega se il suono serve soprattutto a coordinare, celebrare o ritualizzare.",
      "Controlla che ogni scelta sia sostenuta da un indizio concreto.",
    ],
    observe: [
      "Il gruppo entra tutto insieme o ascolta da fuori?",
      "La ripetizione serve a tenere il tempo o a rafforzare il significato?",
      "Il contesto rende quel suono un segnale, una festa o un rito?",
    ],
    result: "Riesci a dire perche alcune pratiche sonore hanno un valore rituale piu forte di altre.",
    side: {
      type: "terms",
      items: [
        { term: "Rituale", text: "Pratica sonora legata a un passaggio o a un valore simbolico condiviso.", example: "formula / cerimonia" },
        { term: "Formula", text: "Sequenza breve e riconoscibile che ritorna senza cambiare troppo.", example: "voce / colpi / risposta" },
        { term: "Coralita", text: "Il gruppo partecipa come un corpo comune.", example: "insieme / entrata" },
      ],
    },
    panels: [
      {
        title: "Mappa rapida",
        kind: "terms",
        items: [
          { term: "Ripetizione", text: "Rafforza memoria e riconoscibilita del gesto.", example: "ritorno" },
          { term: "Passaggio", text: "Segna un prima e un dopo per il gruppo.", example: "soglia" },
          { term: "Appartenenza", text: "Fa sentire chi partecipa e chi riconosce il gesto.", example: "noi" },
          { term: "Valore simbolico", text: "Il suono significa piu della sua semplice funzione pratica.", example: "credenza" },
        ],
      },
      {
        title: "Criteri di distinzione",
        kind: "timeline",
        items: [
          { label: "A", title: "Segnale", text: "Conta l'immediatezza: il suono orienta un'azione rapida del gruppo.", note: "subito" },
          { label: "B", title: "Festa", text: "Conta il clima condiviso: il suono costruisce partecipazione e piacere collettivo.", note: "clima" },
          { label: "C", title: "Rito", text: "Conta il valore simbolico: il suono accompagna una soglia, una formula o una credenza.", note: "simbolo" },
          { label: "D", title: "Appartenenza", text: "Conta il riconoscimento reciproco del gruppo dentro quel gesto.", note: "noi" },
        ],
      },
    ],
    promptsTitle: "Argomenta la scelta",
    prompts: [
      "Quale elemento ti fa parlare di rito e non solo di festa?",
      "Che ruolo ha la ripetizione nel creare appartenenza?",
      "Perche il contesto conta quanto il suono stesso?",
    ],
  },
  followupTitle: "Dopo la lettura, stringi il lessico e rendi piu chiara l'interpretazione",
  followupIntro:
    "Questa lezione resta piu teorica che laboratoriale: prima distingui e interpreti, poi trasformi la lettura in scheda, confronto e restituzione pubblica.",
  followupDefault: "rielaborazione",
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
        "Sostituisci una descrizione generica con un verbo piu chiaro.",
        "Sottolinea dove hai scritto il valore simbolico del gesto.",
        "Cancella un esempio che funziona solo come festa ma non come rito.",
      ],
      observe: [
        "Il lettore distingue subito rito, festa e segnale?",
        "Ogni situazione ha un indizio concreto a sostegno?",
      ],
      result: "La tua analisi diventa piu leggibile e meno generica.",
    },
    produzione: {
      label: "Produzione",
      title: "Prepara una scheda sulle funzioni rituali",
      meta: [
        { label: "Durata", value: "10 minuti" },
        { label: "Ti serve", value: "cartellone o slide" },
        { label: "Alla fine", value: "una scheda pronta da mostrare" },
      ],
      steps: [
        "Scegli tre parole chiave: formula, gruppo, passaggio.",
        "Associa a ciascuna un esempio chiaro e breve.",
        "Chiudi con una frase che spieghi perche il rito non coincide con il semplice intrattenimento.",
      ],
      observe: [
        "La scheda fa capire il ruolo del gruppo?",
        "Il lettore percepisce il valore simbolico del suono?",
      ],
      result: "La tua sintesi mostra il suono come pratica che costruisce comunita.",
    },
    condivisione: {
      label: "Condivisione",
      title: "Confronta due letture del rituale",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "due schede di gruppo" },
        { label: "Alla fine", value: "vedi meglio i confini tra funzioni" },
      ],
      steps: [
        "Leggi la scheda di un altro gruppo.",
        "Cerca un esempio in cui siete d'accordo e uno in cui differite.",
        "Spiegate insieme quale indizio vi ha fatto cambiare interpretazione.",
      ],
      observe: [
        "Avete usato gli stessi criteri per dire che qualcosa e rituale?",
        "Un esempio poteva stare anche nella lezione precedente sulle funzioni sociali?",
      ],
      result: "Capisci che le funzioni del suono si toccano, ma non coincidono sempre.",
    },
    valutazione: {
      label: "Valutazione",
      title: "Controlla che cosa sai distinguere",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "usi un lessico piu preciso sulle funzioni rituali" },
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
              feedback: "Esatto. Il rito non dipende solo dal suono, ma dal significato comune che il gruppo gli attribuisce.",
            },
            {
              id: "q1b",
              label: "Il fatto che il suono sia semplicemente molto forte.",
              correct: false,
              feedback: "No. L'intensita da sola non basta a creare una funzione rituale.",
            },
          ],
        },
        {
          id: "q2",
          prompt: "Che differenza c'e tra festa e rito?",
          options: [
            {
              id: "q2a",
              label: "La festa crea partecipazione; il rito aggiunge una forma simbolica stabile e condivisa.",
              correct: true,
              feedback: "Esatto. Le due dimensioni possono incontrarsi, ma non vanno confuse.",
            },
            {
              id: "q2b",
              label: "Sono due parole equivalenti per indicare qualsiasi momento musicale.",
              correct: false,
              feedback: "Non proprio. Il rito chiede una lettura piu precisa del contesto e del significato.",
            },
          ],
        },
        {
          id: "q3",
          prompt: "Perche la ripetizione conta nelle pratiche rituali?",
          options: [
            {
              id: "q3a",
              label: "Perche rafforza riconoscibilita, memoria e partecipazione del gruppo.",
              correct: true,
              feedback: "Esatto. Il ritorno della formula rende il gesto condivisibile e stabile.",
            },
            {
              id: "q3b",
              label: "Perche evita di dover ascoltare con attenzione.",
              correct: false,
              feedback: "No. Al contrario, la ripetizione concentra e orienta l'ascolto collettivo.",
            },
          ],
        },
      ],
      selfCheck: [
        "Riesci a distinguere rito, festa e segnale?",
        "Riesci a spiegare il ruolo della ripetizione e della formula?",
        "Riesci a collegare il suono a appartenenza, passaggio e memoria del gruppo?",
      ],
    },
    chiusura: {
      label: "Chiusura",
      title: "Porta via il nucleo dell'idea",
      line: "Una pratica sonora diventa rituale quando la comunita riconosce in quella formula un gesto condiviso, simbolico e memorabile.",
      bridge:
        "Nella lezione successiva vedrai come materiali e oggetti diventano strumenti quando il suono si stabilizza anche nella materia e nel gesto tecnico.",
    },
  },
};

export default function RitoMagiaComunitaLesson() {
  return <OriginiTopicLesson lesson={lesson} />;
}
