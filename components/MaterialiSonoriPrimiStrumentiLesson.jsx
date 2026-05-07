import React from "https://esm.sh/react@18";
import OriginiTopicLesson from "./OriginiTopicLessonTemplate.module.js";

const lesson = {
  title: "Materiali sonori e primi strumenti",
  question: "Quando un oggetto diventa davvero strumento?",
  subtitle:
    "Un materiale comincia a diventare strumento quando non lo guardi piu solo come cosa, ma come risorsa sonora riconoscibile, ripetibile e adatta a una funzione.",
  heroWord: "materia",
  heroPrelude: "Non basta avere un oggetto",
  heroEcho: "serve un gesto che lo faccia suonare in modo stabile",
  heroTags: ["pietra", "osso", "legno", "soffio"],
  heroNote:
    "Le fonti scolastiche sulla musica antica ricordano tamburi, flauti, arpe, trombe e cimbali: dietro ciascuno c'e un materiale scelto e un'azione precisa.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Materiali sonori e primi strumenti" },
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: "../rito-magia-comunita/index.html",
    homeHref: "../../../../index.html",
  },
  meta: [
    { label: "Durata", value: "2 ore" },
    { label: "Ti serve", value: "oggetti sonori, immagini, scheda" },
    { label: "Obiettivo", value: "collegare materiale, gesto, timbro e funzione" },
  ],
  opening: {
    title: "Ascolta prima la materia",
    intro:
      "Un suono non nasce solo da un'idea: nasce da qualcosa che vibra, risuona, si tende, si batte, si scuote o si soffia.",
    cardTitle: "Confronta i materiali",
    meta: [
      { label: "Durata", value: "30 secondi" },
      { label: "Ti serve", value: "oggetti o immagini" },
      { label: "Alla fine", value: "riconosci che il materiale condiziona il suono" },
    ],
    steps: [
      "Osserva due o tre materiali diversi: pietra, legno, metallo o pelle.",
      "Immagina quale gesto chiede ciascun materiale: battere, scuotere, soffiare, tendere.",
      "Prova a dire quale materiale sembra piu adatto a un suono secco, lungo o risonante.",
    ],
    observe: [
      "Il materiale suggerisce subito un gesto?",
      "Ti aspetti un suono breve o risonante?",
      "Pensi a un uso di gruppo, di richiamo o di accompagnamento?",
    ],
    result: "Capisci che il suono dipende dall'incontro tra materia e azione.",
    side: {
      type: "flow",
      items: ["tocca", "prova", "confronta", "scegli"],
      ariaLabel: "Passaggi per leggere un materiale sonoro",
    },
  },
  exploration: {
    title: "Dal materiale al gesto tecnico",
    intro:
      "Le ricostruzioni scolastiche sulle musiche antiche mostrano famiglie di strumenti diverse, ma tutte nascono da un principio semplice: scegliere un materiale e usarlo in modo controllato.",
    cards: [
      {
        title: "Percuotere",
        caption: "Pietra, legno, pelle tesa e superfici dure producono colpi leggibili, utili per segnare, accompagnare, sostenere il gruppo.",
        chips: ["colpo", "battito", "appoggio"],
      },
      {
        title: "Scuotere",
        caption: "Semi, conchiglie, sonagli e oggetti mobili producono texture regolari o agitate, adatte a mantenere energia e continuita.",
        chips: ["movimento", "grana", "ritorno"],
      },
      {
        title: "Soffiare o tendere",
        caption: "Canne forate, ossa, corde e tubi permettono suoni piu lunghi e controllabili, legati a richiamo, formula o accompagnamento.",
        chips: ["fiato", "corda", "risonanza"],
      },
    ],
    paragraphs: [
      "Le fonti consultate ricordano strumenti a fiato, percussioni e corde gia presenti nel mondo antico: flauti, trombe, tamburi, arpe, cimbali. Questo non significa che all'inizio esistessero gia forme complesse, ma che la strada passa dalla scoperta delle proprieta sonore dei materiali.",
      "Per parlare dei primi strumenti conviene quindi usare quattro parole insieme: materiale, gesto, timbro, funzione. Un oggetto diventa strumento quando il gruppo riconosce che puo produrre un suono ripetibile e utile in una situazione.",
    ],
    questions: [
      "Che differenza c'e tra oggetto sonoro e strumento?",
      "Il materiale conta piu del gesto o il gesto conta quanto il materiale?",
      "Quale funzione ti aiuta di piu a capire perche un oggetto viene conservato e riusato?",
    ],
    panels: [
      {
        title: "Materiali ricorrenti",
        kind: "cards",
        columns: 2,
        items: [
          { title: "Osso o canna", caption: "Aiutano a soffiare o forare per creare altezze e richiami.", chips: ["aria", "foro"] },
          { title: "Pietra", caption: "Offre colpi secchi, risonanze dure, appoggi ritmici.", chips: ["urto", "eco"] },
          { title: "Legno", caption: "Permette percussione, cassa di risonanza, sostegno strutturale.", chips: ["cavo", "vibra"] },
          { title: "Pelle tesa", caption: "Trasforma il colpo in superficie sonora regolare.", chips: ["tamburo", "membrana"] },
        ],
      },
      {
        title: "Domanda guida",
        kind: "text",
        paragraphs: [
          "Il passaggio decisivo non e possedere una materia, ma capire come quella materia puo essere usata piu volte per ottenere un suono riconoscibile.",
        ],
      },
    ],
  },
  active: {
    title: "Costruisci una tassonomia minima",
    intro:
      "Prendi materiali, gesti e funzioni e prova a ordinarli in una piccola mappa: non una lista di nomi, ma un sistema per capire come nasce uno strumento.",
    cardTitle: "Metti in relazione materia e gesto",
    meta: [
      { label: "Durata", value: "15 minuti" },
      { label: "Ti serve", value: "scheda, immagini, parole chiave" },
      { label: "Alla fine", value: "una classificazione leggibile" },
    ],
    steps: [
      "Scegli quattro esempi tra pietra, osso, canna, conchiglia, pelle, legno.",
      "Per ciascuno scrivi quale gesto lo attiva meglio.",
      "Aggiungi il timbro che ti aspetti: secco, risonante, continuo, granulare.",
      "Chiudi indicando una funzione plausibile: richiamo, accompagnamento, coordinazione, cerimonia.",
    ],
    observe: [
      "Hai separato bene materiale, gesto e funzione?",
      "Due materiali diversi possono servire alla stessa funzione?",
      "Un materiale cambia molto se cambia il modo in cui lo usi?",
    ],
    result: "Riesci a spiegare perche i primi strumenti nascono dall'uso intenzionale della materia.",
    side: {
      type: "terms",
      items: [
        { term: "Materiale", text: "La sostanza che vibra o risuona.", example: "osso / pietra / legno" },
        { term: "Gesto tecnico", text: "L'azione che attiva il suono.", example: "battere / scuotere / soffiare" },
        { term: "Timbro", text: "Il carattere del suono prodotto.", example: "secco / lungo / ruvido" },
      ],
    },
    panels: [
      {
        title: "Mappa rapida",
        kind: "terms",
        items: [
          { term: "Percussione", text: "Il suono nasce da un urto controllato.", example: "colpo" },
          { term: "Scuotimento", text: "Il suono nasce da piccoli elementi in movimento.", example: "sonaglio" },
          { term: "Soffio", text: "Il suono nasce dall'aria che attraversa una cavita.", example: "flauto" },
          { term: "Risonanza", text: "Il materiale amplifica o prolunga il gesto sonoro.", example: "cassa / eco" },
        ],
      },
      {
        title: "Esempi da confrontare",
        kind: "cards",
        columns: 2,
        items: [
          { title: "Pietre battute", caption: "Due superfici dure costruiscono un ritmo netto.", chips: ["percussione", "tempo"] },
          { title: "Semi in contenitore", caption: "Lo scuotimento crea continuita e grana sonora.", chips: ["movimento", "energia"] },
          { title: "Osso o canna forata", caption: "Il soffio permette un segnale piu lungo e direzionato.", chips: ["aria", "richiamo"] },
          { title: "Pelle tesa", caption: "La membrana stabilizza il colpo e rende il battito piu leggibile.", chips: ["membrana", "gruppo"] },
        ],
      },
    ],
    prompts: [
      "Quale materiale ti sembra piu facile da trasformare in strumento?",
      "Quale funzione spiega meglio la conservazione di un oggetto sonoro?",
      "Perche uno stesso materiale puo dare risultati molto diversi?",
    ],
  },
  followupDefault: "produzione",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Pulisci la classificazione",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "la mappa gia compilata" },
        { label: "Alla fine", value: "categorie piu nitide" },
      ],
      steps: [
        "Controlla che ogni voce dica prima il materiale e poi il gesto.",
        "Elimina un aggettivo vago e sostituiscilo con un termine sonoro piu preciso.",
        "Accorpa due esempi che appartengono alla stessa famiglia di azione.",
      ],
      observe: [
        "La tua mappa fa capire subito la logica della classificazione?",
        "Hai evitato di confondere oggetto, gesto e funzione?",
      ],
      result: "La tassonomia diventa piu utile per spiegare e ricordare.",
    },
    produzione: {
      label: "Produzione",
      title: "Realizza una tavola sui primi strumenti",
      meta: [
        { label: "Durata", value: "10 minuti" },
        { label: "Ti serve", value: "cartellone o slide" },
        { label: "Alla fine", value: "una tavola pronta da esporre" },
      ],
      steps: [
        "Scegli tre esempi che mostrino azioni diverse.",
        "Per ciascuno indica materiale, gesto, timbro e funzione.",
        "Chiudi con una frase che spieghi quando un oggetto diventa strumento.",
      ],
      observe: [
        "Il lettore vede subito la relazione tra materia e uso?",
        "Gli esempi mostrano timbri e funzioni differenti?",
      ],
      result: "La tua tavola rende visibile la nascita tecnica del suono organizzato.",
    },
    condivisione: {
      label: "Condivisione",
      title: "Metti a confronto due tassonomie",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "due mappe di gruppo" },
        { label: "Alla fine", value: "vedi analogie e differenze" },
      ],
      steps: [
        "Osserva la mappa di un altro gruppo.",
        "Segna una categoria costruita bene e una che crea confusione.",
        "Spiegate insieme quale criterio funziona meglio: materiale, gesto o funzione.",
      ],
      observe: [
        "Avete usato la stessa logica di classificazione?",
        "Un esempio puo cambiare famiglia se cambia il criterio?",
      ],
      result: "Capisci che classificare significa scegliere un punto di vista coerente.",
    },
    valutazione: {
      label: "Valutazione",
      title: "Controlla che cosa sai collegare",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "usi meglio il lessico tecnico essenziale" },
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Quando un oggetto comincia a essere strumento?",
          options: [
            {
              id: "q1a",
              label: "Quando il gruppo riconosce che puo produrre un suono ripetibile con un gesto controllato.",
              correct: true,
              feedback: "Esatto. La stabilita dell'uso sonoro e decisiva.",
            },
            {
              id: "q1b",
              label: "Quando l'oggetto e semplicemente molto antico.",
              correct: false,
              feedback: "No. L'antichita da sola non dice nulla sul suo uso musicale.",
            },
          ],
        },
        {
          id: "q2",
          prompt: "Che cosa collega materiale e timbro?",
          options: [
            {
              id: "q2a",
              label: "Il gesto che attiva il materiale e il modo in cui questo risuona.",
              correct: true,
              feedback: "Esatto. Materia e azione lavorano sempre insieme.",
            },
            {
              id: "q2b",
              label: "Solo il colore visivo dell'oggetto.",
              correct: false,
              feedback: "No. Qui conta come vibra e come viene usato, non il suo aspetto.",
            },
          ],
        },
        {
          id: "q3",
          prompt: "Perche la funzione conta nello studio dei primi strumenti?",
          options: [
            {
              id: "q3a",
              label: "Perche aiuta a capire perche un oggetto viene scelto, conservato e riusato dal gruppo.",
              correct: true,
              feedback: "Esatto. La funzione rende leggibile il passaggio da materia a risorsa sonora.",
            },
            {
              id: "q3b",
              label: "Perche elimina il bisogno di descrivere materiali e gesti.",
              correct: false,
              feedback: "No. La funzione si capisce proprio mettendo in relazione tutti gli elementi.",
            },
          ],
        },
      ],
      selfCheck: [
        "Riesci a collegare materiale, gesto, timbro e funzione?",
        "Riesci a distinguere oggetto sonoro e strumento?",
        "Riesci a fare esempi semplici di percussione, scuotimento e soffio?",
      ],
    },
    chiusura: {
      label: "Chiusura",
      title: "Ricorda il passaggio decisivo",
      line: "I primi strumenti nascono quando una materia viene scelta, attivata e riconosciuta come fonte sonora stabile dentro la vita del gruppo.",
      bridge:
        "Nella lezione successiva userai tutto il nucleo per costruire una soglia verso il mondo antico, dove queste pratiche lasciano tracce piu stabili e riconoscibili.",
    },
  },
};

export default function MaterialiSonoriPrimiStrumentiLesson() {
  return <OriginiTopicLesson lesson={lesson} />;
}
