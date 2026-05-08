import React from "https://esm.sh/react@18";
import OriginiTopicLesson from "./OriginiTopicLessonTemplate.module.js";

const lesson = {
  model: {
    id: "teorico-introduttiva",
    label: "Lezione teorico-introduttiva",
    theoryShare: 70,
    practiceShare: 30,
  },
  title: "Alle origini del suono",
  question: "Come facciamo a parlare delle origini del suono se nessuno le ha registrate?",
  subtitle:
    "Partiamo da tracce, immagini, reperti e scene collettive. Non per inventare liberamente, ma per costruire domande fondate e idee guida per tutto il nucleo.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Alle origini del suono" },
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: null,
    homeHref: "../../../../index.html",
  },
  meta: [
    { label: "Durata", value: "1 ora e 30" },
    { label: "Ti serve", value: "immagini, voce, quaderno" },
    { label: "Obiettivo", value: "capire come si studiano le origini del suono" },
  ],
  opening: {
    title: "La musica e iniziata, ma il suo inizio non e registrato",
    intro:
      "La domanda iniziale non chiede una data esatta. Chiede di capire da quali tracce possiamo partire quando il passato non ci lascia audio o spartiti.",
    cardTitle: "Guarda prima di concludere",
    meta: [
      { label: "Durata", value: "3 minuti" },
      { label: "Ti serve", value: "immagine introduttiva" },
      { label: "Alla fine", value: "separi subito osservazione e fantasia" },
    ],
    steps: [
      "Osserva l'immagine senza cercare subito una risposta definitiva.",
      "Nomina due elementi che vedi con certezza.",
      "Aggiungi una sola ipotesi su che ruolo poteva avere il suono in quella scena.",
    ],
    observe: [
      "Vedi corpi, movimento, gruppo o oggetti?",
      "Che cosa puoi dire con sicurezza e che cosa stai invece immaginando?",
      "La scena ti fa pensare a richiamo, danza, rito o lavoro condiviso?",
    ],
    result: "Capisci che le origini del suono si studiano partendo da indizi, non da registrazioni.",
    side: {
      type: "image",
      src: "../../../../assets/lesson/corpo-voce-gesto/lascaux-painting.jpg",
      alt: "Pittura rupestre con figure animali e movimento collettivo",
      label: "Immagine introduttiva",
      title: "Traccia visiva",
      caption:
        "Una scena antica non ci fa sentire il suono, ma ci aiuta a porre domande su gesto, gruppo, ambiente e funzione.",
    },
  },
  exploration: {
    title: "Non resta il suono. Restano le tracce.",
    intro:
      "Per parlare delle origini del suono servono occhi attenti e parole prudenti. Le fonti scolastiche ricordano che lavoriamo su resti materiali, immagini, ambienti e ipotesi plausibili.",
    layout: "essay-side",
    cardsPosition: "after",
    side: {
      type: "timeline",
      ariaLabel: "Mini timeline del nucleo",
      items: [
        {
          label: "01",
          title: "Tracce e domande",
          text: "Prima impariamo a leggere immagini, reperti e contesti senza trasformarli subito in certezze.",
          note: "cornice",
        },
        {
          label: "02",
          title: "Battito comune",
          text: "Poi osserviamo come il gruppo organizza il tempo con ritmo, pulsazione e accenti.",
          note: "ritmo",
        },
        {
          label: "03",
          title: "Corpo e voce",
          text: "Il corpo diventa il primo laboratorio in cui un gesto si fa suono leggibile.",
          note: "corpo",
        },
        {
          label: "04",
          title: "Oggetti che suonano",
          text: "Alcuni materiali smettono di essere solo cose e diventano risorse sonore stabili.",
          note: "oggetti",
        },
        {
          label: "05",
          title: "Gruppo e rito",
          text: "Infine vediamo come il suono aiuta un gruppo a chiamare, celebrare, ricordare e riconoscersi.",
          note: "comunita",
        },
      ],
    },
    paragraphs: [
      "Non sappiamo come suonasse davvero un momento musicale di migliaia di anni fa. Possiamo pero leggere il tipo di ambiente, i segni lasciati da un oggetto, le immagini di gruppo e il modo in cui corpo e gesto tornano nelle ricostruzioni storiche.",
      "Questo e il punto piu importante della lezione: non stiamo cercando la favola del primo musicista. Stiamo imparando un metodo semplice per distinguere dato, indizio e ipotesi.",
      "Le fonti didattiche del progetto insistono anche su un'altra idea utile: la musica nasce dentro relazioni, cooperazione, movimento, ascolto condiviso, oggetti sonori e voce. Ecco perche il nucleo usera spesso cinque parole: corpo, ritmo, ambiente, oggetti, gruppo.",
    ],
    questionsTitle: "Domande guida",
    questions: [
      "Da dove nasce la musica: da uno strumento, dal corpo, dal gruppo o da tutti questi elementi insieme?",
      "Perche immagini e reperti non bastano da soli, se non li colleghiamo a un contesto?",
      "Quali idee ci serviranno di piu nelle prossime lezioni?",
    ],
    cards: [
      {
        title: "Corpo",
        caption: "Mani, piedi, respiro e voce sono le prime risorse sempre disponibili.",
        chips: ["gesto", "voce", "battito"],
      },
      {
        title: "Ritmo",
        caption: "Una ripetizione condivisa aiuta il gruppo a sentire un ordine.",
        chips: ["pulsazione", "accento"],
      },
      {
        title: "Ambiente",
        caption: "Eco, acqua, pietra, vento e spazio cambiano il modo in cui un suono viene percepito.",
        chips: ["luogo", "risonanza"],
      },
      {
        title: "Oggetti",
        caption: "Osso, legno, pietra e altri materiali possono diventare risorse sonore se usati con intenzione.",
        chips: ["materia", "timbro"],
      },
      {
        title: "Gruppo",
        caption: "Il suono chiama, coordina, celebra, ricorda e costruisce appartenenza.",
        chips: ["insieme", "funzione"],
      },
    ],
    evidence: [
      {
        label: "Traccia materiale",
        title: "Oggetto forato, uso discusso",
        body: "Un reperto come il flauto di Divje Babe e importante proprio perche obbliga a essere prudenti: puo aprire ipotesi forti, ma non basta da solo a chiudere il problema.",
        image: {
          src: "../../../../assets/lesson/corpo-voce-gesto/divje-babe-flute.jpg",
          alt: "Reperto del flauto di Divje Babe",
        },
      },
      {
        label: "Corpo in azione",
        title: "Il primo laboratorio sempre disponibile",
        body: "Anche quando non abbiamo strumenti complessi, il corpo ci ricorda che battito, gesto e voce possono gia organizzare il suono.",
        image: {
          src: "../../../../assets/lesson/corpo-voce-gesto/hands-clapping.jpg",
          alt: "Mani che producono una percussione corporea",
        },
      },
      {
        label: "Fonte didattica",
        title: "Dalla traccia alla domanda",
        body: "Le fonti usate nel progetto insistono su ascolto, corpo, oggetti sonori, cooperazione e codificazioni semplici: il passato si apre meglio quando il metodo resta chiaro.",
      },
    ],
    panels: [
      {
        title: "Tre parole da tenere vicine",
        kind: "terms",
        items: [
          { term: "Dato", text: "Cio che possiamo mostrare o descrivere direttamente.", example: "reperto / immagine" },
          { term: "Indizio", text: "Cio che orienta la lettura ma non chiude il significato.", example: "foro / gesto / usura" },
          { term: "Ipotesi", text: "Una spiegazione plausibile costruita mettendo insieme piu tracce.", example: "uso sonoro" },
        ],
      },
    ],
  },
  active: {
    title: "Prova a leggere una fonte senza correre troppo",
    intro:
      "L'attivita e leggera ma importante: alleni il metodo che userai nel resto del nucleo. Guardi una traccia, separi i livelli di certezza e costruisci una spiegazione breve.",
    cardTitle: "Dato, indizio, ipotesi",
    meta: [
      { label: "Durata", value: "12 minuti" },
      { label: "Ti serve", value: "scheda o quaderno" },
      { label: "Alla fine", value: "una lettura breve ma ordinata" },
    ],
    steps: [
      "Scegli una traccia: immagine, oggetto o scena collettiva.",
      "Scrivi che cosa puoi osservare con certezza.",
      "Aggiungi un indizio che ti fa pensare a un possibile uso sonoro.",
      "Chiudi con una sola ipotesi, usando parole prudenti come forse o potrebbe.",
    ],
    observe: [
      "Hai separato cio che vedi da cio che deduci?",
      "La tua ipotesi nasce davvero da una traccia concreta?",
      "Stai usando un linguaggio semplice ma onesto?",
    ],
    result: "Sai parlare delle origini del suono senza confondere osservazione e fantasia.",
    side: {
      type: "terms",
      items: [
        { term: "Osservo", text: "Descrivo la traccia senza aggiungere ancora spiegazioni.", example: "vedo / noto" },
        { term: "Collego", text: "Metto in relazione dettaglio, ambiente e gesto possibile.", example: "forse serviva a" },
        { term: "Ipotizzo", text: "Formulo una spiegazione breve e plausibile.", example: "potrebbe indicare" },
      ],
    },
    panels: [
      {
        title: "Come leggiamo una fonte",
        kind: "timeline",
        items: [
          { label: "A", title: "Parti dal visibile", text: "Nomina immagine, materiale, gruppo o luogo prima di tutto.", note: "dato" },
          { label: "B", title: "Cerca una relazione", text: "Chiediti che cosa fa quel dettaglio dentro una scena o un oggetto.", note: "indizio" },
          { label: "C", title: "Formula una risposta prudente", text: "Scrivi un'ipotesi breve, fondata e dichiarata come tale.", note: "ipotesi" },
        ],
      },
      {
        title: "Frase guida",
        kind: "text",
        paragraphs: [
          "Possiamo parlare delle origini del suono solo se dichiariamo con chiarezza che cosa osserviamo e che cosa stiamo ricostruendo.",
        ],
      },
    ],
    promptsTitle: "Controlla il passaggio",
    prompts: [
      "Qual e la parte piu certa della tua scheda?",
      "Dove comincia la tua interpretazione?",
      "Quale parola ti aiuta a restare prudente senza diventare vago?",
    ],
  },
  followupTitle: "Dopo la cornice, rendi visibile la mappa che terra insieme il nucleo",
  followupIntro:
    "Questa prima lezione non deve accumulare troppi contenuti: deve chiarire il contesto, lasciare immagini forti e preparare bene il terreno alle lezioni operative.",
  followupDefault: "rielaborazione",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Costruisci la mappa concettuale finale",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "foglio o lavagna" },
        { label: "Alla fine", value: "hai il lessico-guida del nucleo" },
      ],
      steps: [
        "Scrivi al centro la parola suono.",
        "Attorno metti cinque nodi: corpo, ritmo, ambiente, oggetti, gruppo.",
        "Aggiungi una freccia o una frase breve tra i nodi che senti piu vicini.",
      ],
      observeTitle: "Controlla la mappa",
      observe: [
        "Hai usato parole semplici e leggibili?",
        "La mappa fa capire che la musica nasce da piu elementi insieme?",
        "Si vede gia il percorso delle prossime lezioni?",
      ],
      result: "Il nucleo non parte da un elenco: parte da una mappa chiara e condivisa.",
      panels: [
        {
          title: "Mappa concettuale finale",
          kind: "cards",
          columns: 3,
          items: [
            { title: "Corpo", caption: "Produce gesto, voce, battito e respiro.", chips: ["mani", "voce"] },
            { title: "Ritmo", caption: "Organizza il tempo e rende leggibile il ritorno.", chips: ["pulsazione", "accento"] },
            { title: "Ambiente", caption: "Aggiunge eco, spazio, materia e condizioni di ascolto.", chips: ["luogo", "risonanza"] },
            { title: "Oggetti", caption: "Trasformano materiali naturali in risorse sonore stabili.", chips: ["osso", "legno"] },
            { title: "Gruppo", caption: "Dai suoni un uso: chiamare, coordinare, celebrare, ricordare.", chips: ["insieme", "rito"] },
          ],
        },
      ],
    },
    produzione: {
      label: "Produzione",
      title: "Completa una scheda-ponte",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "quaderno" },
        { label: "Alla fine", value: "una frase guida personale" },
      ],
      steps: [
        "Completa la frase: delle origini del suono non abbiamo..., ma abbiamo....",
        "Aggiungi due parole tra corpo, ritmo, ambiente, oggetti, gruppo.",
        "Chiudi con una domanda che vuoi portare nella prossima lezione.",
      ],
      observe: [
        "La tua frase distingue bene assenza di registrazioni e presenza di tracce?",
        "Le due parole scelte sono davvero centrali per te?",
      ],
      result: "Produci una scheda breve che fa da ponte verso il lavoro successivo.",
    },
    condivisione: {
      label: "Condivisione",
      title: "Confronta due mappe",
      meta: [
        { label: "Durata", value: "5 minuti" },
        { label: "Ti serve", value: "due schede di gruppo" },
        { label: "Alla fine", value: "vedi che cosa torna davvero" },
      ],
      steps: [
        "Guarda la mappa di un altro gruppo.",
        "Segna un nodo uguale al tuo e un collegamento diverso.",
        "Spiegate insieme quale parola vi sembra piu importante per iniziare il nucleo.",
      ],
      observe: [
        "Le mappe coincidono sui concetti centrali?",
        "Le differenze nascono da parole diverse o da idee davvero diverse?",
      ],
      result: "Capisci quali idee il gruppo sente piu stabili gia dalla prima lezione.",
    },
    valutazione: {
      label: "Valutazione",
      title: "Controlla le idee essenziali",
      meta: [
        { label: "Durata", value: "5 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "riconosci il punto di partenza del nucleo" },
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Che cosa non possediamo per studiare il suono del passato remoto?",
          options: [
            {
              id: "q1a",
              label: "Registrazioni dirette o spartiti delle origini.",
              correct: true,
              feedback: "Esatto. Proprio per questo partiamo da tracce e ipotesi fondate.",
            },
            {
              id: "q1b",
              label: "Ogni tipo di fonte visiva o materiale.",
              correct: false,
              feedback: "Non proprio. Le tracce visive e materiali esistono, ma vanno lette con prudenza.",
            },
          ],
        },
        {
          id: "q2",
          prompt: "Qual e la differenza tra dato e ipotesi?",
          options: [
            {
              id: "q2a",
              label: "Il dato si osserva; l'ipotesi collega piu tracce e propone una spiegazione.",
              correct: true,
              feedback: "Esatto. Il metodo parte proprio da questa distinzione.",
            },
            {
              id: "q2b",
              label: "Sono la stessa cosa, cambiano solo le parole usate.",
              correct: false,
              feedback: "No. Se li confondiamo, raccontiamo il passato in modo poco chiaro.",
            },
          ],
        },
        {
          id: "q3",
          prompt: "Quali parole guideranno il nucleo?",
          options: [
            {
              id: "q3a",
              label: "Corpo, ritmo, ambiente, oggetti, gruppo.",
              correct: true,
              feedback: "Esatto. Sono i cinque nodi che ritroverai nelle lezioni successive.",
            },
            {
              id: "q3b",
              label: "Solo strumenti, autori e date.",
              correct: false,
              feedback: "Non qui. Questo nucleo parte da esperienze, funzioni e tracce.",
            },
          ],
        },
        {
          id: "q4",
          prompt: "Perche questa prima lezione e utile?",
          options: [
            {
              id: "q4a",
              label: "Perche chiarisce il contesto e il metodo prima delle attivita operative.",
              correct: true,
              feedback: "Esatto. Ti prepara bene a leggere le lezioni successive.",
            },
            {
              id: "q4b",
              label: "Perche spiega gia tutta la storia della musica antica.",
              correct: false,
              feedback: "No. Qui costruiamo la cornice, non un'enciclopedia.",
            },
          ],
        },
      ],
      selfCheck: [
        "Sai spiegare da quali fonti possiamo partire?",
        "Sai distinguere dato, indizio e ipotesi?",
        "Sai nominare le cinque idee guida del nucleo?",
      ],
    },
    chiusura: {
      label: "Chiusura",
      title: "Porta con te la domanda giusta",
      line: "Le origini del suono non si ascoltano direttamente: si ricostruiscono leggendo tracce, corpi, oggetti e scene di gruppo con attenzione.",
      bridge: "Adesso il percorso puo diventare operativo: nella prossima lezione entri nel battito comune e distingui ritmo, pulsazione e tempo.",
    },
  },
};

export default function AlleOriginiDelSuonoLesson() {
  return <OriginiTopicLesson lesson={lesson} />;
}
