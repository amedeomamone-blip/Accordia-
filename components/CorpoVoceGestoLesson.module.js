import React, { useState } from "https://esm.sh/react@18";
import {
  ActivityLayout,
  LessonBottomBar,
  LessonHero,
  LessonProgress,
  LessonSection,
  MetaStrip,
  Panel,
  PhaseTabs,
  PromptList,
  QuizList,
  ResultCallout,
  SelfCheckList,
  SimpleTimer,
  StepList,
  cn,
  useActiveSection
} from "./LessonShared.module.js";
const EXPLORATION_PANELS = [
  {
    title: "Suono scelto",
    caption: "Prima individui un gesto o una sillaba che riesci a rifare bene.",
    pattern: ["\u25CF", "\u25B2", "\u25C6"],
    tone: "spread"
  },
  {
    title: "Suono ripetuto",
    caption: "Quando torna uguale abbastanza volte, il gruppo comincia a riconoscerlo.",
    pattern: ["\u25CF", "\u25CF", "\u25CF", "\u25CF"],
    tone: "repeat"
  },
  {
    title: "Suono con forma",
    caption: "Una pausa e un finale chiaro fanno capire dove la frase si apre e dove si chiude.",
    pattern: ["\u25CF", "\u25CF", "\u2014", "\u25C6"],
    tone: "shape"
  }
];
const lesson = {
  nucleus: "Origini del suono",
  title: "Corpo, voce e gesto",
  question: "Come fa un gesto a diventare musica senza strumenti?",
  subtitle: "Ascolti, scegli, ripeti, fai una pausa e riparti. Cosi un gesto diventa una frase sonora che il gruppo riconosce subito.",
  heroWord: "gesto",
  heroPrelude: "La musica inizia da un",
  heroEcho: "che il gruppo sa leggere",
  heroTags: ["corpo", "voce", "pausa", "finale"],
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Corpo, voce e gesto" }
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: null,
    homeHref: "../../../../index.html"
  },
  meta: [
    { label: "Durata", value: "2 ore" },
    { label: "Ti serve", value: "corpo, voce, banco" },
    { label: "Obiettivo", value: "creare una frase sonora di 8 tempi" }
  ],
  heroRows: [
    { label: "Corpo", items: ["mani", "piedi", "petto"] },
    { label: "Voce", items: ["ta", "tum", "ah"] },
    { label: "Gesto", items: ["parti", "ferma", "riprendi"] },
    { label: "Segni", items: ["\u25CF", "\u25A0", "\u25C6", "\u2014"] }
  ],
  heroNote: "Il gruppo capisce il suono quando riconosce attacco, pausa e finale.",
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
    title: "Trova il suono che hai gia con te",
    intro: "Parti da quello che senti subito: respiro, mani, passi, banco, sedia, voce.",
    cardTitle: "Ascolta e scegli",
    meta: [
      { label: "Durata", value: "30 secondi" },
      { label: "Ti serve", value: "corpo o banco" },
      { label: "Alla fine", value: "riconosci un suono che puoi ripetere" }
    ],
    steps: [
      "Fermati per 30 secondi.",
      "Ascolta i suoni del tuo corpo e dell'aula.",
      "Scegli un suono che riesci a controllare bene."
    ],
    observe: [
      "Quale suono nasce dal tuo corpo?",
      "Quale suono riesci a ripetere senza fatica?",
      "Quando la pausa ti aiuta a ripartire meglio?"
    ],
    result: "Riconosci almeno un suono del corpo e sai quando usarlo."
  },
  exploration: {
    label: "Esplorazione",
    title: "Corpo, voce e gesto lavorano insieme",
    intro: "Corpo, voce e gesto diventano musica quando scegli un suono, lo ripeti e gli dai una forma chiara.",
    paragraphs: [
      "Un gesto da solo resta isolato. Quando ritorna con regolarita, il gruppo lo riconosce e puo seguirlo.",
      "La voce puo dare l'attacco. La pausa separa. Il finale chiude. Non servono tanti suoni: servono pochi segnali leggibili."
    ],
    questions: [
      "Quale gesto fa partire tutti nello stesso momento?",
      "Quale suono del corpo senti piu secco o piu grave?",
      "Che cosa cambia quando inserisci una pausa?"
    ],
    flow: [
      "scegli",
      "ripeti",
      "pausa",
      "chiudi"
    ]
  },
  active: {
    label: "Comprensione attiva",
    title: "Scrivi una frase sonora di 8 tempi",
    intro: "Usa pochi suoni. Fai capire subito dove si parte, dove arriva la pausa e dove si chiude la frase.",
    cardTitle: "Costruisci la sequenza",
    meta: [
      { label: "Durata", value: "12 minuti" },
      { label: "Ti serve", value: "corpo, voce, foglio" },
      { label: "Alla fine", value: "hai una sequenza leggibile" }
    ],
    steps: [
      "Scegli una pulsazione semplice che tutti riescono a tenere.",
      "Aggiungi una voce breve che aiuti memoria e attacco.",
      "Inserisci almeno una pausa chiara.",
      "Ripeti finche il gruppo legge la sequenza senza una spiegazione lunga."
    ],
    observe: [
      "Si capisce dove inizia la frase?",
      "La pausa si sente davvero?",
      "Il finale chiude o lascia il gruppo sospeso?"
    ],
    result: "La tua frase sonora si vede e si sente con chiarezza."
  },
  sourceOptions: [
    { id: "mani", label: "Mani", short: "MA", symbol: "\u25CF" },
    { id: "piedi", label: "Piedi", short: "PI", symbol: "\u25A0" },
    { id: "cosce", label: "Cosce", short: "CO", symbol: "\u25B2" },
    { id: "voce", label: "Voce", short: "VO", symbol: "\u25C6" },
    { id: "pausa", label: "Pausa", short: "PA", symbol: "\u2014" }
  ],
  sequencePresets: {
    simple: ["mani", "pausa", "mani", "voce", "piedi", "pausa", "voce", "mani"],
    echo: ["mani", "voce", "mani", "pausa", "mani", "voce", "mani", "pausa"],
    contrast: ["piedi", "cosce", "voce", "pausa", "piedi", "mani", "voce", "pausa"]
  },
  followupDefault: "produzione",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Rendi la sequenza piu chiara",
      meta: [
        { label: "Durata", value: "5 minuti" },
        { label: "Ti serve", value: "foglio e matita" },
        { label: "Alla fine", value: "la forma si vede meglio" }
      ],
      steps: [
        "Togli un suono inutile.",
        "Scegli una sola pausa davvero importante.",
        "Aggiungi un segno di attacco o un segno finale."
      ],
      observe: [
        "Si capisce il punto di partenza?",
        "Le ripetizioni sono facili da leggere?"
      ],
      result: "La tua frase sonora si capisce al primo sguardo."
    },
    produzione: {
      label: "Produzione",
      title: "Provala con il gruppo",
      meta: [
        { label: "Durata", value: "10 minuti" },
        { label: "Ti serve", value: "corpo, voce, banco" },
        { label: "Alla fine", value: "il gruppo esegue insieme" }
      ],
      steps: [
        "Tenete una pulsazione comune.",
        "Provate la sequenza almeno due volte.",
        "Scegliete un finale comune."
      ],
      observe: [
        "Il gruppo entra insieme?",
        "La voce aiuta davvero l'attacco?",
        "Il finale arriva nello stesso punto per tutti?"
      ],
      result: "La frase sonora resta stabile anche quando la ripetete."
    },
    condivisione: {
      label: "Condivisione",
      title: "Falla leggere a un altro gruppo",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "la sequenza scritta" },
        { label: "Alla fine", value: "un altro gruppo la ricostruisce" }
      ],
      steps: [
        "Mostra solo i segni e il gesto iniziale.",
        "Lascia che l'altro gruppo provi senza aiuto.",
        "Correggi solo il punto che crea piu confusione."
      ],
      observe: [
        "Quale segno funziona subito?",
        "Dove l'altro gruppo si ferma o sbaglia?"
      ],
      result: "Capisci se la tua sequenza comunica davvero."
    },
    valutazione: {
      label: "Valutazione",
      title: "Controlla quello che sai spiegare",
      meta: [
        { label: "Durata", value: "5 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "dai un nome a cio che hai fatto" }
      ],
      quiz: [
        {
          id: "q1",
          prompt: "La musica puo nascere anche senza strumenti?",
          options: [
            {
              id: "q1a",
              label: "Si, se corpo, voce, gesto e silenzio vengono organizzati dal gruppo.",
              correct: true,
              feedback: "Esatto. Qui la musica nasce da un gesto chiaro, ripetuto e condiviso."
            },
            {
              id: "q1b",
              label: "No, servono sempre strumenti musicali.",
              correct: false,
              feedback: "Non proprio. Corpo e voce bastano gia per costruire una frase sonora."
            }
          ]
        },
        {
          id: "q2",
          prompt: "Perche una pausa e utile?",
          options: [
            {
              id: "q2a",
              label: "Perche da respiro e rende piu chiaro l'attacco successivo.",
              correct: true,
              feedback: "Esatto. La pausa organizza il tempo e rende piu leggibile la frase."
            },
            {
              id: "q2b",
              label: "Perche ferma tutto una volta per tutte.",
              correct: false,
              feedback: "No. Una pausa puo anche preparare meglio la ripresa."
            }
          ]
        },
        {
          id: "q3",
          prompt: "Che cosa ti aiuta a ricordare la sequenza?",
          options: [
            {
              id: "q3a",
              label: "Segni semplici, ripetizione e un gesto iniziale chiaro.",
              correct: true,
              feedback: "Esatto. Quando la forma si vede bene, il gruppo la ricorda meglio."
            },
            {
              id: "q3b",
              label: "Cambiare gesto ogni volta.",
              correct: false,
              feedback: "No. Troppi cambi rendono la sequenza meno leggibile."
            }
          ]
        }
      ],
      selfCheck: [
        "Riconosci almeno tre sorgenti sonore del corpo?",
        "Sai leggere una sequenza di 8 tempi?",
        "Sai spiegare che cosa fa la pausa?"
      ]
    },
    chiusura: {
      label: "Chiusura",
      title: "Porta via un'idea semplice",
      line: "Il corpo non sostituisce la musica. La fa iniziare quando il gruppo ascolta, sceglie e ripete insieme.",
      bridge: "Nella prossima lezione scoprirai che sotto ogni ritmo c'e un battito comune che tiene insieme tutti."
    }
  }
};
function SignalGrid() {
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-card-grid lesson-card-grid--four" }, lesson.heroRows.map((row) => /* @__PURE__ */ React.createElement("article", { key: row.label, className: "lesson-key-card" }, /* @__PURE__ */ React.createElement("strong", null, row.label), /* @__PURE__ */ React.createElement("div", { className: "lesson-chip-row" }, row.items.map((item) => /* @__PURE__ */ React.createElement("span", { key: `${row.label}-${item}`, className: "lesson-chip" }, item))))));
}
function OpeningSection() {
  return /* @__PURE__ */ React.createElement(LessonSection, { id: "apertura", title: lesson.opening.title, intro: lesson.opening.intro }, /* @__PURE__ */ React.createElement(Panel, { title: lesson.opening.cardTitle }, /* @__PURE__ */ React.createElement(
    ActivityLayout,
    {
      steps: lesson.opening.steps,
      observe: lesson.opening.observe,
      result: lesson.opening.result,
      right: /* @__PURE__ */ React.createElement(SimpleTimer, { total: 30, startLabel: "Avvia 30 secondi" })
    }
  )));
}
function MeaningStrip() {
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-meaning-strip" }, EXPLORATION_PANELS.map((item) => /* @__PURE__ */ React.createElement("article", { key: item.title, className: "lesson-meaning-card" }, /* @__PURE__ */ React.createElement("div", { className: cn("lesson-meaning-card__visual", `lesson-meaning-card__visual--${item.tone}`), "aria-hidden": "true" }, item.pattern.map((symbol, index) => /* @__PURE__ */ React.createElement("span", { key: `${item.title}-${symbol}-${index}` }, symbol))), /* @__PURE__ */ React.createElement("div", { className: "lesson-meaning-card__copy" }, /* @__PURE__ */ React.createElement("strong", null, item.title), /* @__PURE__ */ React.createElement("p", null, item.caption)))));
}
function ExplorationSection() {
  return /* @__PURE__ */ React.createElement(LessonSection, { id: "esplorazione", title: lesson.exploration.title, intro: lesson.exploration.intro, tone: "soft" }, /* @__PURE__ */ React.createElement(SignalGrid, null), /* @__PURE__ */ React.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-stack" }, lesson.exploration.paragraphs.map((paragraph) => /* @__PURE__ */ React.createElement("p", { key: paragraph, className: "lesson-body-text" }, paragraph)), /* @__PURE__ */ React.createElement(PromptList, { title: "Osserva", items: lesson.exploration.questions })), /* @__PURE__ */ React.createElement("div", { className: "lesson-flow-card", "aria-label": "Schema del passaggio dal gesto alla forma" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-flow-card__steps" }, lesson.exploration.flow.map((item, index) => /* @__PURE__ */ React.createElement(React.Fragment, { key: item }, /* @__PURE__ */ React.createElement("div", { className: "lesson-flow-card__node" }, item), index < lesson.exploration.flow.length - 1 ? /* @__PURE__ */ React.createElement("span", { className: "lesson-flow-card__arrow" }, "\u2192") : null))))), /* @__PURE__ */ React.createElement(MeaningStrip, null));
}
function SequenceBoard() {
  const [selectedSource, setSelectedSource] = useState(lesson.sourceOptions[0].id);
  const [sequence, setSequence] = useState([...lesson.sequencePresets.simple]);
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-sequence" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-choice-row" }, lesson.sourceOptions.map((item) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: item.id,
      type: "button",
      className: cn("lesson-choice", selectedSource === item.id && "is-active"),
      onClick: () => setSelectedSource(item.id)
    },
    item.label
  ))), /* @__PURE__ */ React.createElement("div", { className: "lesson-sequence__board", "aria-label": "Sequenza di otto tempi" }, sequence.map((state, index) => {
    const item = lesson.sourceOptions.find((entry) => entry.id === state) || lesson.sourceOptions[0];
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: `${state}-${index}`,
        type: "button",
        className: cn("lesson-sequence__cell", state === "pausa" && "is-pause"),
        onClick: () => setSequence((current) => {
          const next = [...current];
          next[index] = selectedSource;
          return next;
        })
      },
      /* @__PURE__ */ React.createElement("span", null, "tempo ", index + 1),
      /* @__PURE__ */ React.createElement("strong", null, item.symbol),
      /* @__PURE__ */ React.createElement("small", null, item.short)
    );
  })), /* @__PURE__ */ React.createElement("div", { className: "lesson-choice-row" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "lesson-button lesson-button--ghost", onClick: () => setSequence([...lesson.sequencePresets.simple]) }, "Base"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "lesson-button lesson-button--ghost", onClick: () => setSequence([...lesson.sequencePresets.echo]) }, "Richiamo"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "lesson-button lesson-button--ghost", onClick: () => setSequence([...lesson.sequencePresets.contrast]) }, "Contrasto")), /* @__PURE__ */ React.createElement("p", { className: "lesson-note" }, lesson.sourceOptions.map((item) => `${item.symbol} = ${item.label.toLowerCase()}`).join(" \xB7 ")));
}
function SourceLegend() {
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-symbol-grid", "aria-label": "Legenda rapida dei segni" }, lesson.sourceOptions.map((item) => /* @__PURE__ */ React.createElement("div", { key: item.id, className: "lesson-symbol-card" }, /* @__PURE__ */ React.createElement("strong", null, item.symbol), /* @__PURE__ */ React.createElement("span", null, item.label))));
}
function ActiveSection() {
  return /* @__PURE__ */ React.createElement(LessonSection, { id: "comprensione-attiva", title: lesson.active.title, intro: lesson.active.intro }, /* @__PURE__ */ React.createElement(Panel, { title: lesson.active.cardTitle, meta: lesson.active.meta }, /* @__PURE__ */ React.createElement(
    ActivityLayout,
    {
      steps: lesson.active.steps,
      observe: lesson.active.observe,
      result: lesson.active.result,
      right: /* @__PURE__ */ React.createElement(SequenceBoard, null)
    }
  )), /* @__PURE__ */ React.createElement(Panel, { title: "Segni rapidi" }, /* @__PURE__ */ React.createElement(SourceLegend, null)));
}
function FollowupSection({ selected, onSelect }) {
  const phase = lesson.followups[selected];
  const tabs = Object.entries(lesson.followups).map(([id, item]) => ({ id, label: item.label }));
  return /* @__PURE__ */ React.createElement(
    LessonSection,
    {
      id: "rielaborazione",
      label: "Continua",
      title: "Scegli il passo che ti serve adesso",
      intro: "La fase attiva resta al centro. Le altre restano vicine, leggere e sempre pronte.",
      tone: "soft"
    },
    /* @__PURE__ */ React.createElement("div", { className: "lesson-followup" }, /* @__PURE__ */ React.createElement(PhaseTabs, { items: tabs, selected, onSelect, ariaLabel: "Fasi successive della lezione" }), /* @__PURE__ */ React.createElement("div", { className: "lesson-followup__panel" }, selected === "chiusura" ? /* @__PURE__ */ React.createElement("div", { className: "lesson-closing" }, /* @__PURE__ */ React.createElement("p", { className: "lesson-closing__line" }, phase.line), /* @__PURE__ */ React.createElement("p", { className: "lesson-closing__bridge" }, phase.bridge)) : selected === "valutazione" ? /* @__PURE__ */ React.createElement(Panel, { kicker: phase.label, title: phase.title, meta: phase.meta }, /* @__PURE__ */ React.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React.createElement(QuizList, { questions: phase.quiz }), /* @__PURE__ */ React.createElement(SelfCheckList, { items: phase.selfCheck }))) : /* @__PURE__ */ React.createElement(Panel, { kicker: phase.label, title: phase.title, meta: phase.meta }, /* @__PURE__ */ React.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React.createElement(StepList, { title: "Fai cosi", items: phase.steps }), /* @__PURE__ */ React.createElement("div", { className: "lesson-stack" }, /* @__PURE__ */ React.createElement(PromptList, { title: "Osserva", items: phase.observe }), /* @__PURE__ */ React.createElement(ResultCallout, { text: phase.result }))))))
  );
}
function CorpoVoceGestoLesson() {
  const activeId = useActiveSection(["apertura", "esplorazione", "comprensione-attiva", "rielaborazione"]);
  const [selectedFollowup, setSelectedFollowup] = useState(lesson.followupDefault);
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-editorial-page" }, /* @__PURE__ */ React.createElement(
    LessonHero,
    {
      title: lesson.title,
      question: lesson.question,
      subtitle: lesson.subtitle,
      heroNote: lesson.heroNote,
      breadcrumbs: lesson.breadcrumbs,
      heroWord: lesson.heroWord,
      heroPrelude: lesson.heroPrelude,
      heroEcho: lesson.heroEcho,
      heroTags: lesson.heroTags
    }
  ), /* @__PURE__ */ React.createElement(MetaStrip, { items: lesson.opening.meta }), /* @__PURE__ */ React.createElement(
    LessonProgress,
    {
      items: lesson.progress,
      activeId,
      selectedFollowup,
      onSelectFollowup: setSelectedFollowup
    }
  ), /* @__PURE__ */ React.createElement(OpeningSection, null), /* @__PURE__ */ React.createElement(ExplorationSection, null), /* @__PURE__ */ React.createElement(ActiveSection, null), /* @__PURE__ */ React.createElement(FollowupSection, { selected: selectedFollowup, onSelect: setSelectedFollowup }), /* @__PURE__ */ React.createElement(
    LessonBottomBar,
    {
      mapHref: lesson.navigation.mapHref,
      previousHref: lesson.navigation.previousHref,
      homeHref: lesson.navigation.homeHref
    }
  ));
}
export {
  CorpoVoceGestoLesson as default
};
