import React from "https://esm.sh/react@18";
import OriginiTopicLesson from "./OriginiTopicLessonTemplate.module.js";

const lesson = {
  model: {
    id: "sintesi-transizione",
    label: "Lezione di sintesi-transizione",
    theoryShare: 70,
    practiceShare: 30,
  },
  title: "Dalle origini al mondo antico",
  question: "Che cosa cambia quando il suono esce dalle origini e entra nella storia delle prime civilta?",
  subtitle:
    "Le pratiche elementari non scompaiono: si stabilizzano, si specializzano e lasciano tracce piu leggibili in strumenti, immagini, usi sociali e prime forme di scrittura.",
  heroWord: "soglia",
  heroPrelude: "Le origini non finiscono di colpo",
  heroEcho: "diventano la base di un mondo sonoro piu riconoscibile",
  heroTags: ["continuita", "scrittura", "strumenti", "civilta"],
  heroNote:
    "Le fonti sulla musica antica mostrano cerimonie, guerra, banchetti, teatro e strumenti piu definiti: il paesaggio sonoro si fa piu documentabile.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Dalle origini al mondo antico" },
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: "../materiali-sonori-primi-strumenti/index.html",
    homeHref: "../../../../index.html",
  },
  meta: [
    { label: "Durata", value: "2 ore" },
    { label: "Ti serve", value: "mappa del nucleo, scheda, timeline" },
    { label: "Obiettivo", value: "collegare origini del suono e prime civilta storiche" },
  ],
  opening: {
    title: "Riconosci una soglia",
    intro:
      "Un conto e immaginare un paesaggio sonoro da tracce indirette; un altro e iniziare a trovare strumenti, immagini, usi e forme piu stabili dentro civilta riconoscibili.",
    cardTitle: "Confronta due scene",
    meta: [
      { label: "Durata", value: "30 secondi" },
      { label: "Ti serve", value: "sguardo, parole chiave" },
      { label: "Alla fine", value: "vedi una continuita e una differenza" },
    ],
    steps: [
      "Pensa a una scena delle origini: corpo, gruppo, ambiente, gesto.",
      "Pensa a una scena del mondo antico: cerimonia, strumento, corteo, coro.",
      "Scrivi che cosa resta uguale e che cosa diventa piu organizzato.",
    ],
    observe: [
      "Il gruppo resta centrale anche dopo il passaggio?",
      "Quale elemento ti fa dire che la documentazione storica e piu stabile?",
      "Dove compare una maggiore specializzazione del suono?",
    ],
    result: "Capisci che tra origini e civilta c'e una soglia, non una frattura assoluta.",
    side: {
      type: "flow",
      items: ["osserva", "confronta", "collega", "anticipa"],
      ariaLabel: "Passaggi per leggere la soglia storica",
    },
  },
  exploration: {
    title: "Che cosa resta, che cosa cambia",
    intro:
      "Le fonti consultate mostrano continuita forti: il suono resta legato a rito, guerra, banchetto, danza e comunita. Cambiano pero la specializzazione degli strumenti e la quantita di tracce disponibili.",
    layout: "essay-side",
    side: {
      type: "timeline",
      ariaLabel: "Sequenza di passaggio dalle origini al mondo antico",
      items: [
        {
          label: "01",
          title: "Origini sonore",
          text: "Corpo, gruppo, ambiente e funzione pratica aprono il nucleo del suono organizzato.",
          note: "inizio",
        },
        {
          label: "02",
          title: "Rito e funzione sociale",
          text: "Il suono diventa memoria, appartenenza, coordinazione e gesto simbolico condiviso.",
          note: "gruppo",
        },
        {
          label: "03",
          title: "Strumenti e tracce stabili",
          text: "Materia, gesto tecnico e documenti rendono il paesaggio sonoro piu leggibile.",
          note: "traccia",
        },
        {
          label: "04",
          title: "Mondo antico",
          text: "Civilta, cerimonie, banchetti, guerra e prime scritture musicali ampliano la documentazione.",
          note: "soglia",
        },
      ],
    },
    paragraphs: [
      "La sintesi storica consultata ricorda che della musica delle origini non possediamo testimonianze dirette, mentre nel mondo antico compaiono raffigurazioni di strumenti, descrizioni di usi cerimoniali e, per i Greci, anche una delle scritture musicali piu antiche di cui abbiamo traccia.",
      "Il passaggio, quindi, non cancella cio che hai studiato. Lo rende piu articolato: il suono continua a servire al gruppo, ma entra anche in contesti politici, religiosi, teatrali e celebrativi piu riconoscibili.",
      "Questa lezione funziona come una soglia: non aggiunge un nuovo blocco isolato, ma rimette in ordine tutto il nucleo per preparare il capitolo successivo.",
    ],
    questionsTitle: "Domande di sintesi",
    questions: [
      "Quale elemento del nucleo resta piu stabile anche nel mondo antico?",
      "Che cosa rende il mondo antico piu documentabile della preistoria sonora?",
      "Perche strumenti e funzioni sociali diventano ancora piu importanti nella soglia verso le civilta?",
    ],
    panels: [
      {
        title: "Snodi del passaggio",
        kind: "terms",
        items: [
          { term: "Da oralita a tracce", text: "Non solo memoria del gruppo, ma anche immagini, testi e strumenti riconoscibili.", example: "fonte" },
          { term: "Da oggetto a strumento", text: "Il gesto tecnico diventa piu definito e ripetibile.", example: "uso" },
          { term: "Da comunita a civilta", text: "Il suono entra in spazi politici, religiosi e spettacolari piu complessi.", example: "contesto" },
          { term: "Da funzione a sistema", text: "Richiamo, rito e festa restano, ma si organizzano in pratiche piu stabili.", example: "ordine" },
        ],
      },
      {
        title: "Una formula utile",
        kind: "text",
        paragraphs: [
          "Le origini del suono preparano il mondo antico: non sono un capitolo chiuso, ma la base da cui nascono strumenti, pratiche e tracce storiche piu leggibili.",
        ],
      },
    ],
  },
  active: {
    title: "Costruisci la pagina-ponte del nucleo",
    intro:
      "Qui l'attivita resta breve ma strutturante: usa tutto il nucleo per creare una soglia chiara, ordinata e leggibile verso il Mediterraneo antico.",
    cardTitle: "Collega origini e civilta",
    meta: [
      { label: "Durata", value: "10 minuti" },
      { label: "Ti serve", value: "scheda, timeline, parole chiave" },
      { label: "Alla fine", value: "una sintesi pronta per il nucleo successivo" },
    ],
    steps: [
      "Scegli quattro parole dalle lezioni sulle origini: ritmo, tracce, funzioni, rito, strumenti.",
      "Associa a ciascuna una continuita verso il mondo antico.",
      "Aggiungi due elementi nuovi che il mondo antico rende piu visibili.",
      "Chiudi con una frase-ponte verso il nucleo sulle civilta del Mediterraneo.",
    ],
    observe: [
      "La tua sintesi mostra insieme continuita e trasformazione?",
      "Hai scelto esempi che fanno davvero da soglia storica?",
      "Il lettore capisce perche il nucleo successivo comincia proprio da qui?",
    ],
    result: "La tua pagina-ponte rende leggibile il passaggio dalle origini al mondo antico.",
    side: {
      type: "timeline",
      items: [
        { label: "A", title: "Continuita", text: "Che cosa resta vivo passando da un contesto all'altro?", note: "gruppo / rito / gesto" },
        { label: "B", title: "Trasformazione", text: "Che cosa si specializza o si documenta meglio entrando nel mondo antico?", note: "strumento / scrittura" },
        { label: "C", title: "Soglia", text: "Quale frase permette di passare al nucleo successivo senza ricominciare da zero?", note: "origini -> civilta" },
      ],
    },
    panels: [
      {
        title: "Mappa rapida",
        kind: "terms",
        items: [
          { term: "Oralita", text: "La memoria sonora passa soprattutto per imitazione e gruppo.", example: "prima delle tracce stabili" },
          { term: "Scrittura", text: "Nel mondo antico iniziano a comparire forme di notazione e teoria.", example: "Greci" },
          { term: "Contesto civile", text: "Il suono entra in guerra, banchetto, teatro, corteo.", example: "uso pubblico" },
          { term: "Ponte storico", text: "Una sintesi che prepara il nucleo successivo.", example: "Mediterraneo antico" },
        ],
      },
      {
        title: "Timeline ponte",
        kind: "timeline",
        items: [
          { label: "1", title: "Ritmo e gesto comune", text: "Il battito condiviso resta sotto molte pratiche del mondo antico.", note: "continuita" },
          { label: "2", title: "Funzioni sociali piu leggibili", text: "Segnale, celebrazione e rito entrano in contesti piu definiti.", note: "uso" },
          { label: "3", title: "Strumenti piu specializzati", text: "Flauti, trombe, arpe e percussioni stabilizzano materia e funzione.", note: "strumento" },
          { label: "4", title: "Prime scritture e teorie", text: "Il suono lascia tracce storiche piu solide e piu descrivibili.", note: "fonte" },
        ],
      },
    ],
    promptsTitle: "Verifica la soglia",
    prompts: [
      "Quale lezione del nucleo ti sembra la piu utile per capire il passaggio?",
      "Quale parola useresti per spiegare il mondo antico senza ricominciare da zero?",
      "Che cosa resta umano e corporeo anche quando la musica diventa piu organizzata?",
    ],
  },
  followupTitle: "Qui il lavoro serve a chiudere e aprire insieme",
  followupIntro:
    "Questa lezione e soprattutto di sintesi e transizione: ordina il nucleo, prepara una timeline-ponte e rende piu forte la frase finale che introduce il Mediterraneo antico.",
  followupDefault: "chiusura",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Rendi il ponte piu chiaro",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "la sintesi gia scritta" },
        { label: "Alla fine", value: "una soglia piu leggibile" },
      ],
      steps: [
        "Controlla che ogni parola chiave sia legata a un esempio concreto.",
        "Sostituisci una frase generica con una continuita storica piu precisa.",
        "Aggiungi una riga finale che apra il Mediterraneo antico.",
      ],
      observe: [
        "La tua pagina-ponte evita di ripetere semplicemente il nucleo?",
        "Mostra davvero che cosa cambia entrando nella storia piu documentata?",
      ],
      result: "Il passaggio diventa piu utile per orientare il percorso successivo.",
    },
    produzione: {
      label: "Produzione",
      title: "Prepara una timeline-ponte",
      meta: [
        { label: "Durata", value: "10 minuti" },
        { label: "Ti serve", value: "timeline, cartellone o slide" },
        { label: "Alla fine", value: "una pagina introduttiva pronta" },
      ],
      steps: [
        "Scegli tre continuita e due trasformazioni.",
        "Disponile in ordine dal piu antico al piu documentato.",
        "Chiudi con una domanda che introduca il nucleo delle civilta del Mediterraneo.",
      ],
      observe: [
        "Il lettore capisce da dove arriva ogni trasformazione?",
        "La timeline mostra bene la soglia storica e non un salto improvviso?",
      ],
      result: "La tua pagina apre il nucleo successivo senza spezzare il filo del percorso.",
    },
    condivisione: {
      label: "Condivisione",
      title: "Confronta due pagine-ponte",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "due sintesi di gruppo" },
        { label: "Alla fine", value: "vedi scelte diverse di collegamento" },
      ],
      steps: [
        "Leggi la pagina di un altro gruppo.",
        "Segna una continuita scelta bene e una trasformazione da chiarire meglio.",
        "Restituitevi un suggerimento su come aprire il nucleo successivo con piu chiarezza.",
      ],
      observe: [
        "Avete dato lo stesso peso a strumenti, rito e fonti?",
        "Quale parola del nucleo appare davvero indispensabile per la soglia?",
      ],
      result: "Capisci che una buona sintesi storica sceglie e ordina, non accumula soltanto.",
    },
    valutazione: {
      label: "Valutazione",
      title: "Controlla la visione d'insieme",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "usi meglio continuita e trasformazione" },
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Che cosa resta forte passando dalle origini al mondo antico?",
          options: [
            {
              id: "q1a",
              label: "Il legame tra suono, gruppo, funzione sociale e gesto condiviso.",
              correct: true,
              feedback: "Esatto. Le origini non spariscono: continuano dentro forme piu organizzate.",
            },
            {
              id: "q1b",
              label: "Solo il nome degli strumenti.",
              correct: false,
              feedback: "No. Gli strumenti contano, ma non esauriscono il passaggio.",
            },
          ],
        },
        {
          id: "q2",
          prompt: "Che cosa rende il mondo antico piu documentabile della preistoria sonora?",
          options: [
            {
              id: "q2a",
              label: "La presenza di piu immagini, testi, strumenti riconoscibili e prime forme di scrittura musicale.",
              correct: true,
              feedback: "Esatto. Le tracce si fanno piu stabili e leggibili.",
            },
            {
              id: "q2b",
              label: "Il fatto che il corpo non serva piu a produrre suono.",
              correct: false,
              feedback: "No. Corpo e voce restano importanti anche nelle civilta storiche.",
            },
          ],
        },
        {
          id: "q3",
          prompt: "Perche questa lezione e una soglia?",
          options: [
            {
              id: "q3a",
              label: "Perche collega il nucleo delle origini al capitolo successivo senza interrompere il filo logico.",
              correct: true,
              feedback: "Esatto. Serve a trasformare il nucleo in una base per continuare il percorso.",
            },
            {
              id: "q3b",
              label: "Perche chiude il percorso senza lasciare altre aperture.",
              correct: false,
              feedback: "Non proprio. Qui il senso e proprio aprire il nucleo che viene dopo.",
            },
          ],
        },
      ],
      selfCheck: [
        "Riesci a distinguere continuita e trasformazione?",
        "Riesci a spiegare perche il mondo antico lascia piu tracce delle origini?",
        "Riesci a usare il nucleo come ponte verso le civilta del Mediterraneo?",
      ],
    },
    chiusura: {
      label: "Chiusura",
      title: "Apri il capitolo dopo",
      line: "Le origini del suono non restano chiuse nel passato remoto: continuano nel mondo antico, dove pratiche, strumenti e funzioni diventano piu stabili e piu documentabili.",
      bridge:
        "Da qui il percorso puo entrare nel nucleo successivo sulle civilta del Mediterraneo, dove il suono lascia segni storici ancora piu leggibili.",
    },
  },
};

export default function DalleOriginiAlMondoAnticoLesson() {
  return <OriginiTopicLesson lesson={lesson} />;
}
