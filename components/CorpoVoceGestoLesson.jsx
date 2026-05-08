import React from "https://esm.sh/react@18";
import OriginiTopicLesson from "./OriginiTopicLessonTemplate.module.js";

const lesson = {
  model: {
    id: "laboratoriale-espressiva",
    label: "Lezione laboratoriale",
    theoryShare: 35,
    practiceShare: 65,
  },
  title: "Corpo, voce e gesto",
  question: "Costruire una scena sonora senza strumenti",
  heroGuide: "La musica comincia quando un suono smette di essere casuale e diventa una scelta.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Corpo, voce e gesto" },
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: "../ritmo-pulsazione-tempo/index.html",
    homeHref: "../../../../index.html",
  },
  meta: [
    { label: "Durata", value: "2 ore" },
    { label: "Ti serve", value: "corpo, voce, aula, foglio" },
    { label: "Obiettivo", value: "costruire una scena sonora riconoscibile" },
  ],
  opening: {
    title: "Ascoltare quello che c'e gia",
    intro:
      "Prima di cercare uno strumento, ascolta quello che hai gia: respiro, mani, piedi, voce, banco, sedia. Ogni suono puo restare casuale oppure diventare intenzionale. La differenza la fai tu.",
    cardTitle: "30 secondi di ascolto",
    meta: [
      { label: "Durata", value: "30 secondi" },
      { label: "Ti serve", value: "silenzio e attenzione" },
      { label: "Alla fine", value: "scegli tre suoni controllabili" },
    ],
    steps: [
      "Resta in silenzio per 30 secondi e ascolta il corpo e l'aula.",
      "Individua un suono secco che riesci a controllare bene.",
      "Individua un suono continuo e un suono leggero.",
      "Scegli il suono che senti piu preciso e piu facile da rifare.",
    ],
    observe: [
      "Quale suono nasce chiaramente da una scelta e non da un movimento casuale?",
      "Quale puoi ripetere senza farlo diventare subito troppo forte?",
      "Che cosa cambia quando prepari il gesto prima di far partire il suono?",
    ],
    result: "Riconosci che un suono corporeo puo essere scelto, controllato e ripetuto con intenzione.",
    side: {
      type: "timer",
      total: 30,
      startLabel: "Avvia 30 secondi",
    },
  },
  exploration: {
    title: "Lo stesso suono cambia significato",
    intro:
      "Prendi un solo suono e trasformalo. Non cambiarne la sorgente: cambia il modo in cui lo fai nascere.",
    layout: "essay-side",
    side: {
      type: "terms",
      items: [
        { term: "Timbro", text: "Il carattere del suono cambia anche se la sorgente resta la stessa.", example: "ruvido / soffice" },
        { term: "Intensita", text: "Quanto il suono si impone nello spazio.", example: "trattenuto / deciso" },
        { term: "Durata", text: "Quanto resta aperto o quanto si chiude in fretta.", example: "breve / lungo" },
        { term: "Silenzio", text: "Lo spazio che prepara, sospende o fa risaltare cio che arriva.", example: "attesa" },
      ],
    },
    paragraphs: [
      "Un passo non significa sempre camminare. Puo sembrare attesa, fuga, esitazione, minaccia, distanza. Il suono non racconta da solo: racconta quando lo trasformi.",
      "Scegli uno dei suoni trovati nell'apertura e provalo almeno in quattro modi diversi. Lavora su vicino e lontano, lento e improvviso, fragile e deciso, pieno e trattenuto.",
      "Mentre provi, emergono parole utili senza interrompere l'esperienza: timbro, intensita, durata, densita, contrasto, silenzio, intenzione.",
    ],
    questionsTitle: "Prova e osserva",
    questions: [
      "Che cosa cambia se fai lo stesso suono piu lentamente?",
      "Che cosa cambia se lo fai piu vicino o piu lontano?",
      "Che cosa cambia se lo fai dopo un silenzio?",
      "Il tuo suono sembra un gesto, un ambiente o un'emozione?",
    ],
    panels: [
      {
        title: "Trasforma senza cambiare sorgente",
        kind: "cards",
        columns: 2,
        items: [
          {
            title: "Neutro o teso",
            caption: "Lo stesso gesto puo restare piatto oppure portare una tensione evidente.",
            chips: ["controllo", "pressione"],
          },
          {
            title: "Vicino o lontano",
            caption: "La distanza cambia il modo in cui immagini lo spazio e la presenza del suono.",
            chips: ["spazio", "prossimita"],
          },
          {
            title: "Fragile o deciso",
            caption: "L'energia del gesto modifica il peso espressivo senza cambiare materiale.",
            chips: ["intensita", "attacco"],
          },
          {
            title: "Prima o dopo il silenzio",
            caption: "Un suono isolato dopo una pausa puo orientare tutta la scena.",
            chips: ["attesa", "contrasto"],
          },
        ],
      },
    ],
  },
  active: {
    title: "Dalla sorgente alla scena",
    intro:
      "Quando piu suoni entrano nello stesso spazio, non basta produrli. Bisogna decidere che ruolo hanno. Un suono puo aprire, accompagnare, interrompere, creare tensione, chiudere. A quel punto non stai solo facendo rumore: stai costruendo una scena sonora.",
    cardTitle: "Corpo -> suono -> intenzione -> scena",
    meta: [
      { label: "Durata", value: "12 minuti" },
      { label: "Ti serve", value: "voce, corpo, ascolto reciproco" },
      { label: "Alla fine", value: "colleghi materiali e funzioni" },
    ],
    steps: [
      "Parti da una sorgente: corpo o voce.",
      "Decidi il gesto che produce il suono: colpire, sfiorare, trascinare, fermare.",
      "Assegna a quel suono una funzione: aprire, accompagnare, interrompere, creare tensione o chiudere.",
      "Metti piu suoni in relazione finche la scena comincia a farsi immaginare.",
    ],
    observe: [
      "Quale suono apre meglio la scena?",
      "Quale accompagna senza coprire gli altri?",
      "Dove il silenzio fa respirare o cambiare direzione?",
    ],
    result: "Riconosci che corpo, voce, gesto e silenzio possono costruire una forma sonora condivisa.",
    side: {
      type: "terms",
      items: [
        { term: "Corpo", text: "La sorgente sonora da cui parti.", example: "mani / piedi / postura" },
        { term: "Voce", text: "Materia espressiva anche senza parole.", example: "sussurro / sillaba / respiro" },
        { term: "Gesto", text: "Il modo intenzionale di produrre il suono.", example: "colpire / sfiorare" },
        { term: "Silenzio", text: "Spazio di ascolto, attesa e sospensione.", example: "vuoto attivo" },
        { term: "Gruppo", text: "La forma esiste davvero quando viene condivisa.", example: "entrata comune" },
      ],
    },
    panels: [
      {
        title: "Mappa visiva",
        kind: "map",
        centerTitle: "Scena sonora",
        branches: [
          { title: "Corpo", items: ["mani", "piedi", "respiro", "postura"] },
          { title: "Voce", items: ["sussurro", "sillaba", "suono lungo", "respiro"] },
          { title: "Gesto", items: ["colpire", "sfiorare", "trascinare", "fermare"] },
          { title: "Silenzio", items: ["attesa", "sospensione", "distanza"] },
          { title: "Forma", items: ["inizio", "sviluppo", "tensione", "chiusura"] },
        ],
      },
      {
        title: "Richiamo storico",
        kind: "text",
        paragraphs: [
          "Prima della scrittura musicale, il suono era legato al corpo, al gesto, al rito, al lavoro e al gruppo. Non era ancora brano nel senso moderno: era azione sonora condivisa.",
        ],
      },
    ],
    promptsTitle: "Controlla il passaggio",
    prompts: [
      "Un suono in questa scena apre, accompagna, interrompe o chiude?",
      "La voce sta nominando qualcosa oppure resta pura materia sonora?",
      "Il silenzio crea attesa, distanza o sospensione?",
    ],
  },
  followupTitle: "Adesso porta i materiali verso una forma riconoscibile",
  followupIntro:
    "Qui la lezione diventa davvero autonoma: non state costruendo un pattern ritmico, ma una scena sonora che deve farsi capire con corpo, voce, gesto e silenzio.",
  followupDefault: "produzione",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Progettare una scena sonora",
      meta: [
        { label: "Durata", value: "10 minuti" },
        { label: "Ti serve", value: "gruppo e foglio" },
        { label: "Alla fine", value: "una scena pronta da provare" },
      ],
      steps: [
        "Scegliete una situazione da far percepire senza parole, senza strumenti e senza melodia.",
        "Usate almeno tre sorgenti sonore diverse tra corpo, voce, gesto e superfici vicine.",
        "Inserite almeno un cambiamento di intensita e almeno un momento di silenzio.",
        "Decidete un inizio riconoscibile e una chiusura riconoscibile in 30-40 secondi.",
      ],
      observe: [
        "Chi ascolta puo immaginare una scena anche senza conoscere il titolo?",
        "La tensione cresce in un punto preciso oppure tutto resta sullo stesso piano?",
        "Il silenzio ha una funzione chiara dentro la forma?",
      ],
      result: "Ogni gruppo ha un progetto sonoro chiaro prima di eseguire.",
      panels: [
        {
          title: "Situazioni proposte",
          kind: "prompts",
          items: [
            "Una folla che si avvicina",
            "Una stanza vuota",
            "Un temporale che arriva",
            "Un gruppo che lavora insieme",
            "Un segnale di pericolo",
            "Una festa che nasce da lontano",
            "Una fuga improvvisa",
            "Un rito notturno",
            "Una macchina che si mette in moto",
            "Un luogo che lentamente si svuota",
          ],
        },
        {
          title: "Scheda di progettazione",
          kind: "prompts",
          items: [
            "Titolo della scena",
            "Che cosa deve immaginare chi ascolta?",
            "Quali suoni corporei usiamo?",
            "Chi entra per primo?",
            "Dove cresce la tensione?",
            "Dove entra il silenzio?",
            "Come finisce?",
          ],
        },
      ],
    },
    produzione: {
      label: "Produzione",
      title: "Comporre senza strumenti",
      meta: [
        { label: "Durata", value: "15 minuti" },
        { label: "Ti serve", value: "corpo, voce, foglio" },
        { label: "Alla fine", value: "scena e partitura grafica essenziale" },
      ],
      steps: [
        "Provate una prima versione libera.",
        "Eliminate i suoni inutili e tenete solo quelli che fanno capire la scena.",
        "Stabilite l'ordine degli ingressi e il punto di massima tensione.",
        "Decidete dove entra il silenzio e come si sente la chiusura.",
        "Ripetete la scena due volte cercando stabilita.",
      ],
      observe: [
        "Si capisce chi entra per primo?",
        "Il silenzio apre spazio o lascia solo vuoto?",
        "La chiusura arriva come scelta comune?",
      ],
      result: "Ogni gruppo realizza una scena sonora eseguibile e una traccia visiva essenziale.",
      panels: [
        {
          title: "Partitura grafica analogica",
          kind: "score",
          items: [
            { label: "Suono leggero", pattern: ["thin"], text: "Linea sottile per i suoni piu delicati o trattenuti." },
            { label: "Suono intenso", pattern: ["thick"], text: "Linea spessa per gli ingressi piu forti o piu vicini." },
            { label: "Colpo breve", pattern: ["dot", "dot", "dot"], text: "Punti per colpi secchi e veloci." },
            { label: "Silenzio", pattern: ["gap", "gap"], text: "Spazio vuoto per attesa, sospensione o arresto." },
            { label: "Crescita", pattern: ["thin", "arrow", "thick"], text: "Freccia per crescita, movimento o avvicinamento." },
            { label: "Densita", pattern: ["cloud", "cloud"], text: "Macchie per accumulo di suoni o sovrapposizione." },
            { label: "Interruzione", pattern: ["cut"], text: "Taglio netto per fermare o spezzare la scena." },
          ],
        },
        {
          title: "Regola di lavoro",
          kind: "text",
          paragraphs: [
            "Non riempite tutto. Il silenzio e materiale musicale.",
          ],
        },
      ],
    },
    condivisione: {
      label: "Condivisione",
      title: "Ascolto cieco",
      meta: [
        { label: "Durata", value: "10 minuti" },
        { label: "Ti serve", value: "gruppo, ascolto, appunti" },
        { label: "Alla fine", value: "confronti intenzione e risultato" },
      ],
      steps: [
        "Un gruppo esegue la scena senza dire il titolo.",
        "Gli altri ascoltano in silenzio e scrivono una prima ipotesi.",
        "La classe dice che ambiente o situazione ha immaginato.",
        "Solo dopo il gruppo rivela il titolo e confronta intenzione e risultato.",
      ],
      observe: [
        "Che ambiente avete immaginato?",
        "Quale suono vi ha orientato?",
        "Dove avete percepito un cambiamento?",
        "Il silenzio ha creato attesa o confusione?",
        "La scena aveva una chiusura chiara?",
      ],
      result: "Verificate se la composizione comunica davvero anche senza spiegazioni.",
      panels: [
        {
          title: "Procedura",
          kind: "flow",
          items: ["esegui", "ascolta", "ipotizza", "rivela", "confronta"],
        },
      ],
    },
    valutazione: {
      label: "Valutazione",
      title: "Rendere riconoscibile una scelta",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "controlli forma, ascolto e intenzione" },
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Quando un suono corporeo smette di essere casuale?",
          options: [
            {
              id: "q1a",
              label: "Quando viene scelto, controllato e inserito in una forma riconoscibile.",
              correct: true,
              feedback: "Esatto. La scelta e l'organizzazione trasformano il suono in materiale musicale.",
            },
            {
              id: "q1b",
              label: "Quando e il piu forte di tutti gli altri suoni.",
              correct: false,
              feedback: "Non basta essere forte. Conta il controllo e la funzione dentro la scena.",
            },
          ],
        },
        {
          id: "q2",
          prompt: "Come puo essere usata la voce in questa lezione?",
          options: [
            {
              id: "q2a",
              label: "Come materia sonora, anche senza parole riconoscibili.",
              correct: true,
              feedback: "Esatto. Sussurro, sillaba, respiro e suono lungo possono funzionare senza testo.",
            },
            {
              id: "q2b",
              label: "Solo per cantare una melodia completa.",
              correct: false,
              feedback: "Qui la voce non serve per forza a cantare: puo essere un materiale sonoro essenziale.",
            },
          ],
        },
        {
          id: "q3",
          prompt: "Che funzione puo avere il silenzio?",
          options: [
            {
              id: "q3a",
              label: "Preparare, sospendere, far risaltare e chiudere una scena.",
              correct: true,
              feedback: "Si. Il silenzio e uno spazio attivo, non un buco da riempire.",
            },
            {
              id: "q3b",
              label: "Solo fermare l'attivita quando il gruppo sbaglia.",
              correct: false,
              feedback: "Non solo. Il silenzio fa parte della forma e puo avere un ruolo espressivo preciso.",
            },
          ],
        },
        {
          id: "q4",
          prompt: "Che cosa rende riconoscibile una scena sonora?",
          options: [
            {
              id: "q4a",
              label: "L'ordine tra ingressi, tensione, silenzio e chiusura.",
              correct: true,
              feedback: "Esatto. La scena si capisce quando la forma e chiara e coerente.",
            },
            {
              id: "q4b",
              label: "Il numero piu alto possibile di suoni diversi.",
              correct: false,
              feedback: "Non serve accumulare. Meglio pochi materiali scelti e ben organizzati.",
            },
          ],
        },
      ],
      selfCheck: [
        "Il mio suono era controllato?",
        "Sono entrato nel momento giusto?",
        "Ho ascoltato gli altri prima di aggiungere il mio suono?",
        "Il nostro silenzio aveva una funzione?",
        "La scena che volevamo costruire e arrivata agli ascoltatori?",
      ],
      panels: [
        {
          title: "Criteri osservabili",
          kind: "terms",
          items: [
            { term: "Controllo", text: "Il suono corporeo resta intenzionale e stabile.", example: "precisione" },
            { term: "Ascolto reciproco", text: "Entrate, soste e cambiamenti tengono conto degli altri.", example: "insieme" },
            { term: "Forma", text: "La scena ha inizio, sviluppo, tensione e chiusura leggibili.", example: "struttura" },
            { term: "Silenzio", text: "Il silenzio ha una funzione chiara e non e solo assenza.", example: "attesa" },
            { term: "Coerenza espressiva", text: "I suoni fanno immaginare davvero la situazione scelta.", example: "scena" },
            { term: "Partitura grafica", text: "La traccia visiva permette di ricostruire l'esecuzione.", example: "segni" },
            { term: "Spiegazione", text: "Il gruppo sa motivare le proprie scelte sonore.", example: "perche" },
          ],
        },
        {
          title: "Rubrica sintetica",
          kind: "terms",
          items: [
            {
              term: "Avanzato",
              text: "La scena e chiara, controllata e riconoscibile; suoni e silenzi hanno funzione precisa; la partitura grafica permette di ricostruire l'esecuzione.",
            },
            {
              term: "Intermedio",
              text: "La scena e comprensibile, ma alcuni passaggi risultano confusi; l'uso del silenzio o della dinamica non e sempre controllato.",
            },
            {
              term: "Base",
              text: "Il gruppo produce materiali sonori, ma la forma e debole e l'idea della scena arriva solo parzialmente.",
            },
            {
              term: "Iniziale",
              text: "I suoni sono poco controllati, manca una struttura riconoscibile, il gruppo fatica ad ascoltarsi.",
            },
          ],
        },
      ],
    },
    chiusura: {
      label: "Chiusura",
      line: "Oggi non hai usato strumenti, ma hai lavorato da musicista: hai scelto suoni, li hai controllati, li hai messi in relazione e hai costruito una forma.",
      bridge: "Il corpo puo creare spazio, tensione, attesa e movimento. La musica comincia quando un suono smette di essere casuale e diventa una scelta.",
    },
  },
};

export default function CorpoVoceGestoLesson() {
  return <OriginiTopicLesson lesson={lesson} />;
}
