import React, { useEffect, useState } from "https://esm.sh/react@18";
import {
  LessonHero,
  LessonProgress,
  LessonSection,
  Panel,
  PhaseTabs,
  PromptList,
  QuizList,
  ResultCallout,
  SelfCheckList,
  SimpleTimer,
  StepList,
  cn,
  useActiveSection,
  usePrefersReducedMotion
} from "./LessonShared.module.js";
const lesson = {
  nucleus: "Origini del suono",
  title: "Ritmo, pulsazione e tempo",
  question: "Che differenza c'e tra ritmo, pulsazione e tempo?",
  subtitle: "Prima trovi un battito comune. Poi capisci che il ritmo puo cambiare, mentre la pulsazione resta sotto e il tempo ne decide la velocita.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Ritmo, pulsazione e tempo" }
  ],
  meta: [
    { label: "Durata", value: "2 ore" },
    { label: "Ti serve", value: "corpo, voce, banco" },
    { label: "Obiettivo", value: "distinguere pulsazione, ritmo, tempo, accento e metro" }
  ],
  heroNote: "La pulsazione tiene insieme il gruppo. Ritmo, accenti e metro dicono come quel battito prende forma.",
  progress: [
    { id: "apertura", label: "Apertura", type: "anchor" },
    { id: "esplorazione", label: "Esplorazione", type: "anchor" },
    { id: "comprensione-attiva", label: "Comprensione attiva", type: "anchor" },
    { id: "rielaborazione", label: "Rielaborazione", type: "followup" },
    { id: "produzione", label: "Produzione", type: "followup" },
    { id: "condivisione", label: "Condivisione", type: "followup" },
    { id: "valutazione", label: "Valutazione", type: "followup" },
    { id: "chiusura", label: "Chiusura", type: "followup" }
  ],
  opening: {
    label: "Esperienza iniziale",
    title: "Trova il battito comune",
    intro: "All'inizio ognuno segue il proprio impulso. Poi il gruppo prova a entrare nello stesso battito.",
    cardTitle: "Entra nello stesso tempo",
    meta: [
      { label: "Durata", value: "30 secondi" },
      { label: "Ti serve", value: "corpo, banco o piccolo spazio libero" },
      { label: "Alla fine", value: "senti una pulsazione condivisa" }
    ],
    steps: [
      "Cammina lentamente o batti le mani sul banco.",
      "Ascolta gli altri e cerca il battito che torna uguale per tutti.",
      "Resta su quel battito senza accelerare."
    ],
    observe: [
      "Che cosa resta uguale mentre i gesti cambiano?",
      "Dove senti il battito che ritorna sempre?",
      "Quando il gruppo accelera, cambia il ritmo o cambia il tempo?"
    ],
    result: "Riconosci il battito comune sotto i gesti del gruppo."
  },
  exploration: {
    label: "Esplorazione",
    title: "Sotto il ritmo c'e un battito che ritorna",
    intro: "Cammino, danza, lavoro e gioco fanno sentire un ordine. Quel centro regolare si chiama pulsazione. Sopra quel centro il ritmo puo muoversi.",
    paragraphs: [
      "Se la pulsazione resta stabile, il gruppo non si perde anche quando il ritmo cambia.",
      "Gli accenti aiutano a sentire se il battito si organizza a 2, a 3 o a 4."
    ],
    questions: [
      "Dove senti il battito regolare?",
      "L'accento cade ogni 2, 3 o 4 pulsazioni?",
      "Il tempo resta uguale o cambia?"
    ]
  },
  listeningSamples: [
    {
      id: "a",
      label: "Ascolto 1 \xB7 Battito regolare",
      title: "Passo condiviso",
      focus: "Pulsazione in 2",
      description: "Molti movimenti si appoggiano a coppie regolari: uno-due, uno-due. Qui il battito comune si sente con chiarezza.",
      action: "Cammina o batti due colpi regolari: uno-due, uno-due.",
      expectedGroup: 2
    },
    {
      id: "b",
      label: "Ascolto 2 \xB7 Accento che ritorna",
      title: "Dondolio in 3",
      focus: "Pulsazione in 3",
      description: "Alcune danze e alcuni movimenti fanno sentire gruppi di tre. Il primo battito orienta, gli altri completano il giro.",
      action: "Conta uno-due-tre e rendi piu forte il primo battito.",
      expectedGroup: 3
    },
    {
      id: "c",
      label: "Ascolto 3 \xB7 Ritmo che cambia",
      title: "Ostinato e variazione",
      focus: "Pulsazione in 4",
      description: "Il battito sotto resta fermo mentre sopra appaiono pause, accenti e contrasti. La sfida e non perdere il centro.",
      action: "Tieni quattro pulsazioni regolari con una mano e prova un ritmo diverso con l'altra o con la voce.",
      expectedGroup: 4
    }
  ],
  active: {
    label: "Comprensione attiva",
    title: "Tieni la pulsazione. Cambia il ritmo.",
    intro: "Prima mantieni il battito comune. Poi aggiungi pause, accenti e contrasti senza perdere il centro.",
    cardTitle: "Prova con il corpo e con i segni",
    meta: [
      { label: "Durata", value: "15 minuti" },
      { label: "Ti serve", value: "corpo, voce, banco, foglio" },
      { label: "Alla fine", value: "leggi e costruisci una sequenza di 8 tempi" }
    ],
    steps: [
      "Scegli una pulsazione stabile.",
      "Decidi se l'accento torna a 2, a 3 o a 4.",
      "Aggiungi un ritmo diverso senza perdere la pulsazione.",
      "Rendi visibile la sequenza con segni semplici."
    ],
    observe: [
      "Il battito sotto resta stabile?",
      "Gli accenti fanno sentire il gruppo?",
      "Il ritmo cambia senza coprire la pulsazione?"
    ],
    result: "Sai distinguere il battito comune dal disegno ritmico."
  },
  conceptRows: [
    {
      term: "Pulsazione",
      text: "E il battito regolare che fa da riferimento al gruppo."
    },
    {
      term: "Ritmo",
      text: "E il disegno di suoni e pause che si appoggia alla pulsazione."
    },
    {
      term: "Tempo",
      text: "E la velocita con cui ritorna la pulsazione."
    },
    {
      term: "Accento",
      text: "E il punto che senti piu forte o piu evidente."
    },
    {
      term: "Metro",
      text: "E il modo regolare con cui gli accenti si organizzano in gruppi."
    }
  ],
  pulseModes: [
    { id: "slow", label: "Lenta", bpm: 66 },
    { id: "medium", label: "Media", bpm: 88 },
    { id: "fast", label: "Veloce", bpm: 112 }
  ],
  sequenceStates: [
    { id: "sound", label: "Suono", symbol: "\u25CF" },
    { id: "pause", label: "Pausa", symbol: "\u25CB" },
    { id: "accent", label: "Accento", symbol: "\u25C9" }
  ],
  sequencePresets: {
    simple: Array.from({ length: 8 }, () => "sound"),
    pauses: ["sound", "pause", "sound", "pause", "sound", "sound", "pause", "sound"],
    accents: ["accent", "sound", "sound", "sound", "accent", "sound", "sound", "sound"]
  },
  followupDefault: "produzione",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Fissa tre parole nel quaderno",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "quaderno o voce" },
        { label: "Alla fine", value: "distingui tre idee chiave" }
      ],
      steps: [
        "Scrivi con parole tue che cos'e la pulsazione.",
        "Spiega come il ritmo si appoggia alla pulsazione.",
        "Aggiungi che cosa cambia quando il tempo diventa piu lento o piu veloce."
      ],
      observe: [
        "Le tre definizioni sono diverse tra loro?",
        "Riesci a fare un esempio per ogni parola?"
      ],
      result: "Le idee chiave diventano piu stabili nella memoria."
    },
    produzione: {
      label: "Produzione",
      title: "Crea un pattern di gruppo",
      meta: [
        { label: "Durata", value: "12 minuti" },
        { label: "Ti serve", value: "corpo, voce, banco" },
        { label: "Alla fine", value: "un gruppo fa sentire il proprio metro" }
      ],
      steps: [
        "Scegli chi tiene la pulsazione stabile.",
        "Decidi se il metro torna a 2, a 3 o a 4.",
        "Aggiungi un ritmo che non faccia sparire il battito comune."
      ],
      observe: [
        "La pulsazione resta chiara dall'inizio alla fine?",
        "Il ritmo si distingue dal battito comune?"
      ],
      result: "Il gruppo costruisce una sequenza leggibile e condivisa."
    },
    condivisione: {
      label: "Condivisione",
      title: "Fallo riconoscere a un altro gruppo",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "la sequenza preparata" },
        { label: "Alla fine", value: "un altro gruppo riconosce il metro" }
      ],
      steps: [
        "Fai ascoltare la sequenza senza spiegare tutto subito.",
        "Chiedi all'altro gruppo se sente 2, 3 o 4 pulsazioni.",
        "Correggi solo il punto che crea piu confusione."
      ],
      observe: [
        "L'altro gruppo riconosce la pulsazione?",
        "Gli accenti fanno capire il metro?"
      ],
      result: "Capisci se la tua sequenza comunica davvero."
    },
    valutazione: {
      label: "Valutazione",
      title: "Controlla che cosa hai capito",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "distingui parole e gesti chiave" }
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Che cos'e la pulsazione?",
          options: [
            {
              id: "q1a",
              label: "Il battito regolare che sostiene la musica.",
              correct: true,
              feedback: "Esatto. La pulsazione e il battito comune che tiene insieme il gruppo."
            },
            {
              id: "q1b",
              label: "Una pausa molto lunga.",
              correct: false,
              feedback: "No. La pulsazione non e una pausa: e il battito che ritorna regolare."
            }
          ]
        },
        {
          id: "q2",
          prompt: "Che cos'e il ritmo?",
          options: [
            {
              id: "q2a",
              label: "L'organizzazione di suoni e silenzi nel tempo.",
              correct: true,
              feedback: "Esatto. Il ritmo si appoggia alla pulsazione ma ne cambia il disegno."
            },
            {
              id: "q2b",
              label: "Il battito che torna sempre uguale.",
              correct: false,
              feedback: "Non proprio. Qui stai descrivendo la pulsazione, non il ritmo."
            }
          ]
        },
        {
          id: "q3",
          prompt: "Che cos'e il tempo?",
          options: [
            {
              id: "q3a",
              label: "La velocita della pulsazione.",
              correct: true,
              feedback: "Esatto. Il tempo dice se il battito scorre lento, medio o veloce."
            },
            {
              id: "q3b",
              label: "Il numero totale dei suoni prodotti.",
              correct: false,
              feedback: "No. Il tempo non conta i suoni: descrive la velocita del battito comune."
            }
          ]
        },
        {
          id: "q4",
          prompt: "A che cosa serve il metro?",
          options: [
            {
              id: "q4a",
              label: "A organizzare gli accenti in gruppi regolari.",
              correct: true,
              feedback: "Esatto. Il metro ti aiuta a sentire se il gruppo torna a 2, a 3 o a 4."
            },
            {
              id: "q4b",
              label: "A scegliere solo suoni forti.",
              correct: false,
              feedback: "Non proprio. Il metro organizza il ritorno degli accenti."
            }
          ]
        }
      ],
      selfCheck: [
        "Riesci a distinguere pulsazione, ritmo, tempo, accento e metro?",
        "Riesci a riconoscere se il tempo e lento, medio o veloce?",
        "Riesci a tenere il battito comune mentre un compagno cambia ritmo?"
      ]
    },
    chiusura: {
      label: "Chiusura",
      title: "Ricorda il centro del lavoro",
      line: "La pulsazione e il battito comune. Il ritmo e il disegno che si appoggia sopra. Il tempo decide quanto velocemente quel battito ritorna.",
      bridge: "Nella prossima lezione vedrai come ritmo e ripetizione aiutano il gruppo a stare insieme."
    }
  }
};
function buildGroupSequence(groupSize) {
  const sequence = [];
  while (sequence.length < 8) {
    for (let index = 1; index <= groupSize && sequence.length < 8; index += 1) {
      sequence.push(index);
    }
  }
  return sequence;
}
function buildCompactGroup(groupSize) {
  return Array.from({ length: groupSize }, (_, index) => index + 1);
}
function getMeterTone(groupSize) {
  if (groupSize === 2) {
    return { "--meter-bg": "#edf4ec", "--meter-accent": "#355e3b", "--meter-soft": "#dbe9dc" };
  }
  if (groupSize === 3) {
    return { "--meter-bg": "#f6efe4", "--meter-accent": "#8a5b20", "--meter-soft": "#ecdfca" };
  }
  return { "--meter-bg": "#edf2f6", "--meter-accent": "#355f7a", "--meter-soft": "#dbe4ea" };
}
function HeroVisual() {
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-rhythm-hero" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-rhythm-hero__row" }, /* @__PURE__ */ React.createElement("span", { className: "lesson-rhythm-hero__label" }, "pulsazione"), /* @__PURE__ */ React.createElement("div", { className: "lesson-dot-track" }, Array.from({ length: 4 }).map((_, index) => /* @__PURE__ */ React.createElement("span", { key: `pulse-${index}`, className: "lesson-dot-track__dot" })))), /* @__PURE__ */ React.createElement("div", { className: "lesson-rhythm-hero__row" }, /* @__PURE__ */ React.createElement("span", { className: "lesson-rhythm-hero__label" }, "ritmo"), /* @__PURE__ */ React.createElement("div", { className: "lesson-dot-track lesson-dot-track--rhythm" }, /* @__PURE__ */ React.createElement("span", { className: "lesson-dot-track__dot lesson-dot-track__dot--accent" }), /* @__PURE__ */ React.createElement("span", { className: "lesson-dot-track__dot lesson-dot-track__dot--pause" }), /* @__PURE__ */ React.createElement("span", { className: "lesson-dot-track__dot" }), /* @__PURE__ */ React.createElement("span", { className: "lesson-dot-track__dot lesson-dot-track__dot--wide" }))), /* @__PURE__ */ React.createElement("div", { className: "lesson-rhythm-hero__row lesson-rhythm-hero__row--stacked" }, /* @__PURE__ */ React.createElement("span", { className: "lesson-rhythm-hero__label" }, "metro"), /* @__PURE__ */ React.createElement("div", { className: "lesson-meter-stack" }, [2, 3, 4].map((groupSize) => /* @__PURE__ */ React.createElement("div", { key: groupSize, className: "lesson-meter-stack__row" }, buildCompactGroup(groupSize).map((item) => /* @__PURE__ */ React.createElement("span", { key: `${groupSize}-${item}`, className: cn("lesson-meter-chip", item === 1 && "is-accent"), style: getMeterTone(groupSize) }, item)))))));
}
function OpeningSection() {
  return /* @__PURE__ */ React.createElement(LessonSection, { id: "apertura", label: lesson.opening.label, title: lesson.opening.title, intro: lesson.opening.intro }, /* @__PURE__ */ React.createElement(Panel, { kicker: "Attivita", title: lesson.opening.cardTitle, meta: lesson.opening.meta }, /* @__PURE__ */ React.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-stack" }, /* @__PURE__ */ React.createElement(StepList, { title: "Fai cosi", items: lesson.opening.steps }), /* @__PURE__ */ React.createElement(PromptList, { title: "Osserva", items: lesson.opening.observe }), /* @__PURE__ */ React.createElement(ResultCallout, { text: lesson.opening.result })), /* @__PURE__ */ React.createElement(SimpleTimer, { total: 30, startLabel: "Avvia 30 secondi" }))));
}
function ListeningPanel() {
  const [activeListening, setActiveListening] = useState(lesson.listeningSamples[0].id);
  const [selectedGroup, setSelectedGroup] = useState(lesson.listeningSamples[0].expectedGroup);
  const activeSample = lesson.listeningSamples.find((item) => item.id === activeListening) || lesson.listeningSamples[0];
  useEffect(() => {
    setSelectedGroup(activeSample.expectedGroup);
  }, [activeSample.expectedGroup]);
  return /* @__PURE__ */ React.createElement(
    Panel,
    {
      kicker: "Ascolto",
      title: activeSample.title,
      meta: [
        { label: "Focus", value: activeSample.focus },
        { label: "Prova", value: activeSample.action }
      ]
    },
    /* @__PURE__ */ React.createElement(
      PhaseTabs,
      {
        items: lesson.listeningSamples.map((sample) => ({ id: sample.id, label: sample.label })),
        selected: activeListening,
        onSelect: setActiveListening,
        ariaLabel: "Situazioni di ascolto"
      }
    ),
    /* @__PURE__ */ React.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-stack" }, /* @__PURE__ */ React.createElement("p", { className: "lesson-body-text" }, activeSample.description), /* @__PURE__ */ React.createElement(PromptList, { title: "Domande guida", items: lesson.exploration.questions })), /* @__PURE__ */ React.createElement("div", { className: "lesson-meter-panel" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-choice-row" }, [2, 3, 4].map((group) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: group,
        type: "button",
        className: cn("lesson-choice", selectedGroup === group && "is-active"),
        onClick: () => setSelectedGroup(group)
      },
      group,
      " pulsazioni"
    ))), /* @__PURE__ */ React.createElement("div", { className: "lesson-meter-preview" }, buildGroupSequence(selectedGroup).map((beat, index) => /* @__PURE__ */ React.createElement(
      "span",
      {
        key: `${selectedGroup}-${index}`,
        className: cn("lesson-meter-preview__beat", beat === 1 && "is-accent"),
        style: getMeterTone(selectedGroup)
      },
      beat
    ))), /* @__PURE__ */ React.createElement("p", { className: "lesson-note" }, "Osserva dove il numero ", /* @__PURE__ */ React.createElement("strong", null, "1"), " torna a riaprire il gruppo.")))
  );
}
function ExplorationSection() {
  return /* @__PURE__ */ React.createElement(LessonSection, { id: "esplorazione", label: lesson.exploration.label, title: lesson.exploration.title, intro: lesson.exploration.intro, tone: "soft" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-stack" }, lesson.exploration.paragraphs.map((paragraph) => /* @__PURE__ */ React.createElement("p", { key: paragraph, className: "lesson-body-text" }, paragraph))), /* @__PURE__ */ React.createElement(ListeningPanel, null)));
}
function PulseBoard() {
  const reducedMotion = usePrefersReducedMotion();
  const [mode, setMode] = useState(lesson.pulseModes[1]);
  const [activeBeat, setActiveBeat] = useState(0);
  useEffect(() => {
    if (reducedMotion) {
      setActiveBeat(0);
      return void 0;
    }
    const interval = window.setInterval(() => {
      setActiveBeat((value) => (value + 1) % 4);
    }, 60 / mode.bpm * 1e3);
    return () => window.clearInterval(interval);
  }, [mode, reducedMotion]);
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-pulse-stage" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-choice-row" }, lesson.pulseModes.map((item) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: item.id,
      type: "button",
      className: cn("lesson-choice", mode.id === item.id && "is-active"),
      onClick: () => setMode(item)
    },
    item.label,
    " \xB7 ",
    item.bpm,
    " bpm"
  ))), /* @__PURE__ */ React.createElement("div", { className: "lesson-pulse-beats" }, Array.from({ length: 4 }).map((_, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: cn("lesson-pulse-beat", activeBeat === index && "is-live") }, /* @__PURE__ */ React.createElement("span", { className: "lesson-pulse-beat__number" }, index + 1), /* @__PURE__ */ React.createElement("small", null, index === 0 ? "riparte" : "continua")))));
}
function RhythmSequencerBoard() {
  const [selectedState, setSelectedState] = useState(lesson.sequenceStates[0].id);
  const [sequence, setSequence] = useState(Array.from({ length: 8 }, () => "sound"));
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-sequence" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-choice-row" }, lesson.sequenceStates.map((item) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: item.id,
      type: "button",
      className: cn("lesson-choice", item.id === selectedState && "is-active"),
      onClick: () => setSelectedState(item.id)
    },
    item.label
  ))), /* @__PURE__ */ React.createElement("div", { className: "lesson-sequence__board", "aria-label": "Sequenza ritmica di otto tempi" }, sequence.map((state, index) => {
    const item = lesson.sequenceStates.find((entry) => entry.id === state) || lesson.sequenceStates[0];
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: `${state}-${index}`,
        type: "button",
        className: cn("lesson-sequence__cell", state === "pause" && "is-pause", state === "accent" && "is-accent"),
        onClick: () => setSequence((current) => {
          const next = [...current];
          next[index] = selectedState;
          return next;
        })
      },
      /* @__PURE__ */ React.createElement("span", null, "tempo ", index + 1),
      /* @__PURE__ */ React.createElement("strong", null, item.symbol),
      /* @__PURE__ */ React.createElement("small", null, item.label.slice(0, 2).toUpperCase())
    );
  })), /* @__PURE__ */ React.createElement("div", { className: "lesson-choice-row" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "lesson-button lesson-button--ghost", onClick: () => setSequence([...lesson.sequencePresets.simple]) }, "Regolare"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "lesson-button lesson-button--ghost", onClick: () => setSequence([...lesson.sequencePresets.pauses]) }, "Con pause"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "lesson-button lesson-button--ghost", onClick: () => setSequence([...lesson.sequencePresets.accents]) }, "Con accenti")), /* @__PURE__ */ React.createElement("p", { className: "lesson-note" }, "\u25CF = suono \xB7 \u25CB = pausa \xB7 \u25C9 = accento"));
}
function ConceptBoard() {
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-term-list" }, /* @__PURE__ */ React.createElement("p", { className: "lesson-term-list__label" }, "Mappa rapida"), lesson.conceptRows.map((item) => /* @__PURE__ */ React.createElement("div", { key: item.term, className: "lesson-term-list__row" }, /* @__PURE__ */ React.createElement("strong", null, item.term), /* @__PURE__ */ React.createElement("p", null, item.text))));
}
function ActiveSection() {
  return /* @__PURE__ */ React.createElement(LessonSection, { id: "comprensione-attiva", label: lesson.active.label, title: lesson.active.title, intro: lesson.active.intro }, /* @__PURE__ */ React.createElement(Panel, { kicker: "Prova pratica", title: lesson.active.cardTitle, meta: lesson.active.meta }, /* @__PURE__ */ React.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-stack" }, /* @__PURE__ */ React.createElement(StepList, { title: "Fai cosi", items: lesson.active.steps }), /* @__PURE__ */ React.createElement(PromptList, { title: "Osserva", items: lesson.active.observe }), /* @__PURE__ */ React.createElement(ResultCallout, { text: lesson.active.result })), /* @__PURE__ */ React.createElement(PulseBoard, null)), /* @__PURE__ */ React.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React.createElement(RhythmSequencerBoard, null), /* @__PURE__ */ React.createElement(ConceptBoard, null))));
}
function FollowupSection({ selected, onSelect }) {
  const phase = lesson.followups[selected];
  const tabs = Object.entries(lesson.followups).map(([id, item]) => ({ id, label: item.label }));
  return /* @__PURE__ */ React.createElement(
    LessonSection,
    {
      id: "rielaborazione",
      label: "Continua",
      title: "Scegli la fase che ti serve adesso",
      intro: "La parte attiva resta al centro. Le altre fasi restano leggere e sempre raggiungibili.",
      tone: "soft"
    },
    /* @__PURE__ */ React.createElement("div", { className: "lesson-followup" }, /* @__PURE__ */ React.createElement(PhaseTabs, { items: tabs, selected, onSelect, ariaLabel: "Fasi successive della lezione" }), /* @__PURE__ */ React.createElement("div", { className: "lesson-followup__panel" }, selected === "chiusura" ? /* @__PURE__ */ React.createElement("div", { className: "lesson-closing" }, /* @__PURE__ */ React.createElement("p", { className: "lesson-closing__line" }, phase.line), /* @__PURE__ */ React.createElement("p", { className: "lesson-closing__bridge" }, phase.bridge)) : selected === "valutazione" ? /* @__PURE__ */ React.createElement(Panel, { kicker: phase.label, title: phase.title, meta: phase.meta }, /* @__PURE__ */ React.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React.createElement(QuizList, { questions: phase.quiz }), /* @__PURE__ */ React.createElement(SelfCheckList, { items: phase.selfCheck }))) : /* @__PURE__ */ React.createElement(Panel, { kicker: phase.label, title: phase.title, meta: phase.meta }, /* @__PURE__ */ React.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React.createElement(StepList, { title: "Fai cosi", items: phase.steps }), /* @__PURE__ */ React.createElement("div", { className: "lesson-stack" }, /* @__PURE__ */ React.createElement(PromptList, { title: "Osserva", items: phase.observe }), /* @__PURE__ */ React.createElement(ResultCallout, { text: phase.result }))))))
  );
}
function RitmoPulsazioneTempoLesson() {
  const activeId = useActiveSection(["apertura", "esplorazione", "comprensione-attiva", "rielaborazione"]);
  const [selectedFollowup, setSelectedFollowup] = useState(lesson.followupDefault);
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-editorial-page" }, /* @__PURE__ */ React.createElement(
    LessonHero,
    {
      eyebrow: lesson.nucleus,
      title: lesson.title,
      question: lesson.question,
      subtitle: lesson.subtitle,
      meta: lesson.meta,
      visual: /* @__PURE__ */ React.createElement(HeroVisual, null),
      visualNote: lesson.heroNote,
      breadcrumbs: lesson.breadcrumbs
    }
  ), /* @__PURE__ */ React.createElement(
    LessonProgress,
    {
      items: lesson.progress,
      activeId,
      selectedFollowup,
      onSelectFollowup: setSelectedFollowup
    }
  ), /* @__PURE__ */ React.createElement(OpeningSection, null), /* @__PURE__ */ React.createElement(ExplorationSection, null), /* @__PURE__ */ React.createElement(ActiveSection, null), /* @__PURE__ */ React.createElement(FollowupSection, { selected: selectedFollowup, onSelect: setSelectedFollowup }));
}
export {
  RitmoPulsazioneTempoLesson as default
};
