import React from "https://esm.sh/react@18";
import OriginiTopicLesson from "./OriginiTopicLessonTemplate.module.js";

const lesson = {
  model: {
    id: "teorico-laboratoriale",
    label: "Lezione teorico-laboratoriale",
    theoryShare: 45,
    practiceShare: 55,
  },
  title: "Oggetti che suonano",
  question: "Quando un oggetto smette di essere solo una cosa e comincia a diventare suono?",
  subtitle:
    "Pietra, osso, legno, semi, pelle e canne non sono ancora musica da soli. Diventano risorse sonore quando qualcuno li usa con un gesto riconoscibile e per una funzione chiara.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Oggetti che suonano" },
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: "../corpo-voce-gesto/index.html",
    homeHref: "../../../../index.html",
  },
  meta: [
    { label: "Durata", value: "2 ore" },
    { label: "Ti serve", value: "oggetti sonori, immagini, scheda" },
    { label: "Obiettivo", value: "collegare materiale, gesto, timbro e funzione" },
  ],
  opening: {
    title: "Guarda prima la materia",
    intro:
      "Ogni oggetto suggerisce un gesto: battere, scuotere, sfregare, soffiare. Il materiale non dice tutto, ma orienta gia il tipo di suono che ti aspetti.",
    cardTitle: "Confronta due oggetti",
    meta: [
      { label: "Durata", value: "3 minuti" },
      { label: "Ti serve", value: "oggetti o immagini" },
      { label: "Alla fine", value: "riconosci che materia e gesto stanno insieme" },
    ],
    steps: [
      "Osserva due materiali diversi, per esempio legno e pietra oppure osso e pelle.",
      "Immagina quale gesto li attiva meglio.",
      "Prova a dire quale dei due potrebbe produrre un suono piu secco, piu lungo o piu risonante.",
    ],
    observe: [
      "Il materiale ti suggerisce subito un gesto?",
      "Ti aspetti un suono breve, duro, continuo o leggero?",
      "L'oggetto sembra utile per segnare il battito, richiamare o accompagnare?",
    ],
    result: "Capisci che un oggetto suona in modo diverso a seconda della materia e del gesto.",
    side: {
      type: "image",
      src: "../../../../assets/lesson/corpo-voce-gesto/divje-babe-flute.jpg",
      alt: "Reperto del flauto di Divje Babe esposto in museo",
      label: "Reperto guida",
      title: "Oggetto, foro, ipotesi sonora",
      caption:
        "Un oggetto forato non e automaticamente uno strumento, ma ci costringe a chiederci quale gesto, quale suono e quale funzione potesse avere.",
    },
  },
  exploration: {
    title: "Dal materiale al suono riconoscibile",
    intro:
      "Le fonti scolastiche sulle musiche antiche ricordano flauti, tamburi, arpe, trombe e cimbali. Dietro queste forme piu stabili c'e un passaggio piu semplice: alcuni materiali vengono scelti perche rispondono bene a un gesto.",
    layout: "essay-side",
    cardsPosition: "after",
    side: {
      type: "terms",
      items: [
        { term: "Materiale", text: "Cio che vibra o risuona.", example: "pietra / osso / legno" },
        { term: "Gesto", text: "L'azione che fa partire il suono.", example: "battere / scuotere / soffiare" },
        { term: "Timbro", text: "Il carattere del suono che senti.", example: "secco / lungo / ruvido" },
        { term: "Funzione", text: "Il motivo per cui quel suono viene conservato e riusato.", example: "richiamo / ritmo" },
      ],
    },
    paragraphs: [
      "Un oggetto comincia a contare davvero quando il gruppo capisce che puo riusarlo per ottenere un suono abbastanza stabile. Non basta che faccia rumore una volta.",
      "Per questo, nella lezione usiamo sempre quattro parole insieme: materiale, gesto, timbro, funzione. Se ne manca una, la spiegazione resta troppo vaga.",
      "La teoria qui serve subito alla pratica: appena il lessico e chiaro, puoi ordinare, confrontare e classificare meglio gli oggetti sonori.",
    ],
    questionsTitle: "Domande di passaggio",
    questions: [
      "Che differenza c'e tra oggetto sonoro e strumento?",
      "Per capire un oggetto conta di piu la materia o il gesto con cui lo usi?",
      "Perche la funzione aiuta a capire se un suono viene conservato nel gruppo?",
    ],
    cards: [
      {
        title: "Percuotere",
        caption: "Pietra, legno, pelle tesa e superfici dure aiutano a segnare colpi leggibili.",
        chips: ["colpo", "battito", "secco"],
      },
      {
        title: "Scuotere",
        caption: "Semi, conchiglie e piccoli oggetti mobili producono una grana sonora continua o agitata.",
        chips: ["movimento", "grana", "ritorno"],
      },
      {
        title: "Soffiare",
        caption: "Canne, ossa e tubi permettono suoni piu lunghi, legati a richiamo, formula o accompagnamento.",
        chips: ["aria", "foro", "richiamo"],
      },
    ],
    panels: [
      {
        title: "Famiglie utili",
        kind: "cards",
        columns: 2,
        items: [
          { title: "Osso o canna", caption: "Servono bene quando l'aria deve entrare e trovare un percorso.", chips: ["fiato"] },
          { title: "Pietra", caption: "Aiuta colpi secchi, risonanze dure e appoggi ritmici.", chips: ["urto"] },
          { title: "Legno", caption: "Puo essere battuto, scavato, svuotato, usato come supporto sonoro.", chips: ["cavo"] },
          { title: "Pelle tesa", caption: "Trasforma il colpo in una superficie sonora piu regolare.", chips: ["membrana"] },
        ],
      },
      {
        title: "Frase guida",
        kind: "text",
        paragraphs: [
          "Un oggetto non diventa strumento per il suo aspetto, ma per l'uso ripetibile che il gruppo impara a farne.",
        ],
      },
    ],
  },
  active: {
    title: "Classifica quattro oggetti sonori",
    intro:
      "Qui la comprensione attiva diventa davvero laboratoriale: prendi esempi diversi, li ordini con parole precise e provi a spiegare perche alcuni oggetti sono gia vicini a uno strumento.",
    cardTitle: "Ordina materia, gesto e funzione",
    meta: [
      { label: "Durata", value: "15 minuti" },
      { label: "Ti serve", value: "scheda, immagini, oggetti" },
      { label: "Alla fine", value: "una classificazione leggibile" },
    ],
    steps: [
      "Scegli quattro esempi tra pietra, osso, canna, conchiglia, pelle o legno.",
      "Per ciascuno scrivi quale gesto lo attiva meglio.",
      "Aggiungi il timbro che ti aspetti: secco, risonante, continuo o granulare.",
      "Chiudi indicando una funzione plausibile: richiamo, battito comune, accompagnamento, cerimonia.",
    ],
    observe: [
      "Hai separato bene materiale, gesto e funzione?",
      "Due materiali diversi possono servire alla stessa funzione?",
      "Un oggetto cambia molto se cambia il modo in cui lo usi?",
    ],
    result: "Sai spiegare perche certi oggetti diventano risorse sonore piu stabili di altri.",
    side: {
      type: "terms",
      items: [
        { term: "Percuotere", text: "Il suono nasce da un urto controllato.", example: "colpo" },
        { term: "Scuotere", text: "Il suono nasce da piccoli elementi in movimento.", example: "sonaglio" },
        { term: "Soffiare", text: "Il suono nasce dall'aria che attraversa una cavita.", example: "flauto" },
      ],
    },
    panels: [
      {
        title: "Mappa rapida",
        kind: "terms",
        items: [
          { term: "Materiale", text: "Dice che cosa vibra o risuona.", example: "pietra / legno / osso" },
          { term: "Gesto", text: "Dice come fai partire il suono.", example: "battere / scuotere / soffiare" },
          { term: "Timbro", text: "Dice che carattere ha il suono.", example: "secco / lungo / ruvido" },
          { term: "Funzione", text: "Dice perche il gruppo tiene quell'oggetto vicino.", example: "richiamo / ritmo" },
        ],
      },
      {
        title: "Dal materiale allo strumento",
        kind: "timeline",
        items: [
          { label: "01", title: "Riconosci la materia", text: "Parti da cio che puo vibrare, risuonare o essere colpito.", note: "materia" },
          { label: "02", title: "Associa un gesto", text: "Ogni materiale apre alcuni gesti e ne esclude altri.", note: "azione" },
          { label: "03", title: "Ascolta il timbro", text: "Il suono risultante ha un carattere che il gruppo puo imparare a riconoscere.", note: "timbro" },
          { label: "04", title: "Dai una funzione", text: "Solo allora l'oggetto entra davvero nella vita sonora della comunita.", note: "uso" },
        ],
      },
    ],
    promptsTitle: "Controlla la classificazione",
    prompts: [
      "Quale oggetto ti sembra piu vicino a uno strumento stabile?",
      "Quale esempio mostra meglio il rapporto tra materia e gesto?",
      "Perche la funzione aiuta a capire se un oggetto resta nel gruppo?",
    ],
  },
  followupTitle: "Dopo il lessico, porta gli oggetti verso una lettura piu chiara e concreta",
  followupIntro:
    "Questa lezione sta in mezzo tra concetto e manipolazione: chiarisci il vocabolario, poi lo usi per ordinare esempi, costruire tavole e spiegare bene i passaggi.",
  followupDefault: "produzione",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Pulisci la classificazione",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "la scheda gia compilata" },
        { label: "Alla fine", value: "categorie piu nitide" },
      ],
      steps: [
        "Controlla che ogni esempio dica prima il materiale e poi il gesto.",
        "Sostituisci un aggettivo generico con una parola sonora piu precisa.",
        "Accorpa due esempi che appartengono alla stessa famiglia di azione.",
      ],
      observe: [
        "La tua scheda fa capire subito la logica usata?",
        "Hai evitato di confondere oggetto, gesto e funzione?",
      ],
      result: "La classificazione diventa piu utile per spiegare e ricordare.",
    },
    produzione: {
      label: "Produzione",
      title: "Prepara una tavola sugli oggetti che suonano",
      meta: [
        { label: "Durata", value: "10 minuti" },
        { label: "Ti serve", value: "cartellone o slide" },
        { label: "Alla fine", value: "una tavola pronta da esporre" },
      ],
      steps: [
        "Scegli tre esempi che mostrino gesti diversi.",
        "Per ciascuno indica materiale, gesto, timbro e funzione.",
        "Chiudi con una frase che spieghi quando un oggetto diventa risorsa sonora stabile.",
      ],
      observe: [
        "Il lettore vede subito il rapporto tra materia e uso?",
        "Gli esempi mostrano davvero suoni diversi tra loro?",
      ],
      result: "La tua tavola rende visibile il passaggio dall'oggetto al suono organizzato.",
    },
    condivisione: {
      label: "Condivisione",
      title: "Metti a confronto due tavole",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "due lavori di gruppo" },
        { label: "Alla fine", value: "vedi analogie e differenze" },
      ],
      steps: [
        "Osserva il lavoro di un altro gruppo.",
        "Segna una categoria costruita bene e una che crea confusione.",
        "Spiegate insieme quale criterio funziona meglio: materiale, gesto o funzione.",
      ],
      observe: [
        "Avete usato la stessa logica per classificare?",
        "Un esempio cambierebbe posto se cambiasse il criterio?",
      ],
      result: "Capisci che classificare significa scegliere un punto di vista coerente.",
    },
    valutazione: {
      label: "Valutazione",
      title: "Controlla che cosa sai collegare",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "usi meglio il lessico tecnico essenziale" },
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Quando un oggetto comincia a contare davvero nel gruppo?",
          options: [
            {
              id: "q1a",
              label: "Quando puo produrre un suono riconoscibile e riusabile con intenzione.",
              correct: true,
              feedback: "Esatto. La stabilita dell'uso e decisiva.",
            },
            {
              id: "q1b",
              label: "Quando e solo molto antico o molto bello da vedere.",
              correct: false,
              feedback: "No. L'aspetto da solo non basta.",
            },
          ],
        },
        {
          id: "q2",
          prompt: "Che cosa dice il timbro?",
          options: [
            {
              id: "q2a",
              label: "Il carattere del suono che senti.",
              correct: true,
              feedback: "Esatto. Il timbro e il colore o carattere del suono.",
            },
            {
              id: "q2b",
              label: "Il numero di oggetti usati insieme.",
              correct: false,
              feedback: "Non proprio. Qui il numero degli oggetti non c'entra.",
            },
          ],
        },
        {
          id: "q3",
          prompt: "Perche la funzione e importante?",
          options: [
            {
              id: "q3a",
              label: "Perche spiega perche il gruppo conserva e riusa quel suono.",
              correct: true,
              feedback: "Esatto. La funzione collega l'oggetto alla vita del gruppo.",
            },
            {
              id: "q3b",
              label: "Perche sostituisce del tutto materiale e gesto.",
              correct: false,
              feedback: "No. Serve insieme alle altre parole, non al loro posto.",
            },
          ],
        },
      ],
      selfCheck: [
        "Sai distinguere materiale, gesto, timbro e funzione?",
        "Sai classificare almeno tre oggetti sonori?",
        "Sai spiegare quando un oggetto e vicino a diventare strumento?",
      ],
    },
    chiusura: {
      label: "Chiusura",
      title: "Porta via una regola semplice",
      line: "Un oggetto non diventa strumento perche esiste: diventa suono quando materia, gesto e funzione iniziano a stare insieme.",
      bridge: "Nell'ultima lezione vedrai che questi suoni non restano mai da soli: servono al gruppo per chiamare, celebrare, ricordare e riconoscersi.",
    },
  },
};

export default function OggettiCheSuonanoLesson() {
  return <OriginiTopicLesson lesson={lesson} />;
}
