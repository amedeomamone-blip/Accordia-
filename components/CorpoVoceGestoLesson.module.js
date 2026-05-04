import React, { useEffect, useState } from "https://esm.sh/react@18";
const HERO_IMAGE = "/assets/lesson/corpo-voce-gesto/lascaux-painting.jpg";
const GALLERY_IMAGES = [
  {
    src: "/assets/lesson/corpo-voce-gesto/lascaux-painting.jpg",
    title: "Segni sulla parete",
    caption: "Prima della scrittura musicale, gesto e movimento lasciano gia tracce di rito, memoria e coordinazione del gruppo."
  },
  {
    src: "/assets/lesson/corpo-voce-gesto/hands-clapping.jpg",
    title: "Mani e pulsazione",
    caption: "Le pratiche corporee e vocali aiutano a costruire un battito comune, distinguere i timbri e rendere visibile il ritmo."
  },
  {
    src: "/assets/lesson/corpo-voce-gesto/divje-babe-flute.jpg",
    title: "Primi strumenti",
    caption: "Anche quando compaiono strumenti semplici, corpo, voce e gesto restano la base dell'improvvisazione e della memoria sonora."
  }
];
const lesson = {
  nucleus: "Origini del suono",
  title: "Corpo, voce e gesto",
  question: "Come fa un gesto a diventare musica senza strumenti?",
  intro: "Le fonti didattiche sulle origini del suono insistono su ascolto, multisensorialita, improvvisazione, corpo, voce e segni grafici semplici. In questa lezione la classe parte dal silenzio, costruisce una sequenza corporea e la trasforma in una piccola partitura leggibile.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Corpo, voce e gesto" }
  ],
  heroCaption: "Prima della notazione tradizionale, il suono vive gia come respiro, voce, battito, gesto condiviso e memoria del gruppo.",
  flow: [
    { id: "apertura", label: "Apertura" },
    { id: "esplorazione", label: "Esplorazione" },
    { id: "comprensione-attiva", label: "Comprensione attiva" },
    { id: "rielaborazione", label: "Rielaborazione" },
    { id: "produzione", label: "Produzione" },
    { id: "condivisione", label: "Condivisione" },
    { id: "valutazione", label: "Valutazione" },
    { id: "chiusura", label: "Chiusura" }
  ],
  openingPrompts: [
    "Quali suoni nascono dal tuo corpo e quali arrivano dall'ambiente?",
    "Quale gesto trasforma un rumore in segnale condiviso?",
    "Quali suoni del corpo sono secchi, lunghi, gravi o leggeri?",
    "Quando il silenzio prepara meglio l'attacco del gruppo?"
  ],
  contextText: "Prima degli strumenti musicali, gli esseri umani hanno usato il corpo, la voce e il gesto per richiamare, coordinare, imitare, celebrare e ricordare. Le guide didattiche consultate insistono su ascolto, improvvisazione e produzione sonora con corpo, voce e oggetti, accompagnate da segni grafici semplici che aiutano il gruppo a ricordare e ripetere.",
  explorationQuestions: [
    "In quali momenti voce e gesto aiutano il gruppo a partire insieme?",
    "Quale parte del corpo produce un suono piu secco, piu lungo o piu grave?",
    "Quando una pausa o un respiro rendono piu chiara la sequenza?"
  ],
  conceptRows: [
    {
      title: "Suono",
      definition: "E un evento percepito che nasce da una vibrazione e acquista senso quando viene ascoltato.",
      example: "Una mano che batte, un piede che colpisce il pavimento o una sillaba detta insieme possono diventare materiali musicali.",
      visual: "sound"
    },
    {
      title: "Rumore",
      definition: "E un suono non ancora selezionato o non ancora condiviso come segnale musicale.",
      example: "Un colpo casuale resta rumore finche il gruppo non lo sceglie, lo ripete e gli assegna una funzione.",
      visual: "noise"
    },
    {
      title: "Silenzio",
      definition: "Non e vuoto: e una condizione attiva di ascolto, attesa e orientamento.",
      example: "Una pausa comune rende piu chiaro l'attacco successivo e aiuta il gruppo a respirare insieme.",
      visual: "silence"
    },
    {
      title: "Corpo sonoro",
      definition: "E il corpo considerato come sorgente sonora e spazio di risonanza.",
      example: "Mani, piedi, petto, cosce, respiro e postura offrono timbri diversi e gia organizzabili.",
      visual: "body"
    },
    {
      title: "Voce",
      definition: "E respiro trasformato in richiamo, sillaba, fonema, canto o scansione ritmica.",
      example: "Una sillaba breve come ta o tum aiuta memoria, attacco comune e imitazione della sequenza.",
      visual: "voice"
    },
    {
      title: "Gesto intenzionale",
      definition: "E il movimento che avvia, interrompe, coordina o rende visibile la musica.",
      example: "Un gesto di attacco, pausa o arresto aiuta tutti a capire quando entrare e come restare insieme.",
      visual: "gesture"
    }
  ],
  reworkingRows: [
    {
      title: "Corpo",
      text: "Il corpo e il primo spazio del suono: mani, piedi, petto, cosce e respiro fanno nascere timbri diversi e aiutano a sentire durata, intensita e pulsazione."
    },
    {
      title: "Voce",
      text: "La voce chiama, accompagna, memorizza e sostiene il ritmo attraverso fonemi, sillabe, richiami e piccole cellule vocali."
    },
    {
      title: "Gesto",
      text: "Il gesto prepara il suono, lo rende leggibile al gruppo e coordina attacco, pausa, ripresa e direzione comune."
    }
  ],
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
  productionSteps: [
    "Scegli una pulsazione comune che tutti riescano a mantenere.",
    "Aggiungi una voce breve o un fonema che aiuti memoria e attacco.",
    "Inserisci almeno una pausa e un gesto chiaro di avvio o arresto.",
    "Trascrivi la sequenza con segni semplici e ripetila finche il gruppo la legge da solo."
  ],
  sharingRules: [
    "Consegna la sequenza a un altro gruppo mostrando solo i segni e il gesto iniziale.",
    "Chi ascolta prova a ricostruire battito, pause e voce senza spiegazioni lunghe.",
    "Se qualcosa non funziona, semplifica o evidenzia i punti chiave con colore, spazio o accento."
  ],
  notationLegend: [
    "\u25CF mani",
    "\u25A0 piedi",
    "\u25B2 cosce",
    "\u25C6 voce",
    "\u2014 pausa"
  ],
  quizQuestions: [
    {
      id: "q1",
      prompt: "La musica puo nascere anche senza strumenti?",
      options: [
        {
          id: "q1a",
          label: "Si, se corpo, voce, gesto e silenzio vengono organizzati dal gruppo.",
          correct: true,
          feedback: "Esatto. Le fonti insistono proprio su questo: il suono diventa musica quando e intenzionale, condiviso e ripetibile."
        },
        {
          id: "q1b",
          label: "No, servono sempre strumenti musicali.",
          correct: false,
          feedback: "Non proprio. Corpo, voce e gesto sono gia risorse sonore complete, anche prima degli strumenti."
        }
      ]
    },
    {
      id: "q2",
      prompt: "Perche una notazione grafica semplice puo essere utile?",
      options: [
        {
          id: "q2a",
          label: "Perche aiuta memoria, coordinazione e ripetizione anche senza pentagramma.",
          correct: true,
          feedback: "Esatto. Le codificazioni analogiche servono proprio a fissare e condividere il gesto sonoro."
        },
        {
          id: "q2b",
          label: "Perche sostituisce completamente ascolto e prova.",
          correct: false,
          feedback: "No. Il segno aiuta, ma resta efficace solo se nasce da ascolto, prova e confronto nel gruppo."
        }
      ]
    },
    {
      id: "q3",
      prompt: "Che funzione ha la pausa in una sequenza corporea?",
      options: [
        {
          id: "q3a",
          label: "Da respiro, chiarisce l'attacco e rende piu leggibile la forma.",
          correct: true,
          feedback: "Esatto. La pausa non cancella la musica: la organizza e la rende piu comprensibile."
        },
        {
          id: "q3b",
          label: "Serve solo a fermare definitivamente il gruppo.",
          correct: false,
          feedback: "Non proprio. Una pausa puo anzi preparare meglio la ripresa e il gesto successivo."
        }
      ]
    }
  ],
  selfCheck: [
    "Riesci a distinguere suono, rumore, silenzio e gesto intenzionale?",
    "Riesci a costruire e leggere una sequenza breve con corpo, voce, pausa e segni grafici?",
    "Riesci a spiegare perche il gruppo puo fare musica anche prima degli strumenti?"
  ],
  closingLine: "Il corpo non sostituisce la musica: la inaugura, quando il suono viene ascoltato, scelto e condiviso.",
  closingBridge: "Nella prossima lezione chiediti: che cosa cambia quando il gruppo lavora su pulsazione, ritmo e tempo?"
};
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0]);
  useEffect(() => {
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length || !("IntersectionObserver" in window)) {
      return void 0;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0.18, 0.3, 0.5, 0.72]
      }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids]);
  return activeId;
}
function LessonBreadcrumb({ items }) {
  return /* @__PURE__ */ React.createElement("nav", { className: "lesson-breadcrumb", "aria-label": "Percorso della pagina" }, items.map((item, index) => /* @__PURE__ */ React.createElement(React.Fragment, { key: `${item.label}-${index}` }, item.href ? /* @__PURE__ */ React.createElement("a", { href: item.href }, item.label) : /* @__PURE__ */ React.createElement("span", { "aria-current": "page" }, item.label), index < items.length - 1 ? /* @__PURE__ */ React.createElement("span", { className: "lesson-breadcrumb__separator" }, "/") : null)));
}
function LessonHero() {
  return /* @__PURE__ */ React.createElement("header", { className: "lesson-hero", id: "apertura" }, /* @__PURE__ */ React.createElement(LessonBreadcrumb, { items: lesson.breadcrumbs }), /* @__PURE__ */ React.createElement("div", { className: "lesson-editorial-shell" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-hero__copy" }, /* @__PURE__ */ React.createElement("p", { className: "lesson-hero__eyebrow" }, lesson.nucleus), /* @__PURE__ */ React.createElement("h1", { className: "lesson-hero__title" }, lesson.title), /* @__PURE__ */ React.createElement("p", { className: "lesson-hero__question" }, lesson.question), /* @__PURE__ */ React.createElement("p", { className: "lesson-hero__intro" }, lesson.intro)), /* @__PURE__ */ React.createElement("figure", { className: "lesson-hero__media" }, /* @__PURE__ */ React.createElement("img", { src: HERO_IMAGE, alt: "Pittura rupestre con figure in movimento che evocano gesto, rito e memoria del suono.", loading: "eager" })), /* @__PURE__ */ React.createElement("figcaption", { className: "lesson-editorial-shell lesson-hero__caption" }, lesson.heroCaption)));
}
function LessonNav({ activeId }) {
  return /* @__PURE__ */ React.createElement("nav", { className: "lesson-nav", "aria-label": "Indice della lezione" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-nav__track" }, lesson.flow.map((item) => /* @__PURE__ */ React.createElement("a", { key: item.id, href: `#${item.id}`, className: cn("lesson-nav__item", activeId === item.id && "is-active") }, item.label))));
}
function SectionHeader({ label, title, intro }) {
  return /* @__PURE__ */ React.createElement("header", { className: "lesson-phase__header" }, /* @__PURE__ */ React.createElement("p", { className: "lesson-phase__label" }, label), /* @__PURE__ */ React.createElement("h2", { className: "lesson-phase__title" }, title), intro ? /* @__PURE__ */ React.createElement("p", { className: "lesson-phase__intro" }, intro) : null);
}
function LessonSection({ id, label, title, intro, tone = "plain", children, width = "wide" }) {
  return /* @__PURE__ */ React.createElement("section", { id, className: cn("lesson-phase", tone === "warm" && "lesson-phase--warm", tone === "white" && "lesson-phase--white") }, /* @__PURE__ */ React.createElement(SectionHeader, { label, title, intro }), /* @__PURE__ */ React.createElement("div", { className: cn(width === "content" ? "lesson-phase__body--editorial" : "lesson-phase__body--wide") }, children));
}
function ActivityPanel({ title, duration, materials, output, children }) {
  return /* @__PURE__ */ React.createElement("section", { className: "lesson-activity-panel" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-activity-panel__lead" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "lesson-activity-panel__label" }, "Attivita"), /* @__PURE__ */ React.createElement("h3", null, title)), /* @__PURE__ */ React.createElement("div", { className: "lesson-activity-panel__meta" }, duration ? /* @__PURE__ */ React.createElement("span", null, "Durata: ", duration) : null, materials ? /* @__PURE__ */ React.createElement("span", null, "Materiali: ", materials) : null, output ? /* @__PURE__ */ React.createElement("span", null, "Output: ", output) : null)), children);
}
function CountdownPanel() {
  const total = 30;
  const [seconds, setSeconds] = useState(total);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return void 0;
    if (seconds === 0) {
      setRunning(false);
      return void 0;
    }
    const timer = window.setTimeout(() => setSeconds((value) => Math.max(0, value - 1)), 1e3);
    return () => window.clearTimeout(timer);
  }, [running, seconds]);
  return /* @__PURE__ */ React.createElement(
    LessonSection,
    {
      id: "apertura-panel",
      label: "Apertura",
      title: "Ascolta prima di suonare.",
      intro: "Prenditi trenta secondi per distinguere i suoni del corpo, dell'ambiente e del gesto intenzionale.",
      width: "wide"
    },
    /* @__PURE__ */ React.createElement(
      ActivityPanel,
      {
        title: "Fermati e senti",
        duration: "30 secondi",
        materials: "silenzio, corpo, banco o piccolo spazio",
        output: "una prima mappa dei suoni presenti"
      },
      /* @__PURE__ */ React.createElement("div", { className: "lesson-opening-panel" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-opening-panel__copy lesson-prose" }, /* @__PURE__ */ React.createElement("p", null, "Prima fermati. Poi ascolta quello che succede intorno a te: respiro, passi, sfregamenti, voci, sedie, banco."), /* @__PURE__ */ React.createElement("p", null, "Quando il tempo finisce, prova a dire quali suoni nascono dal corpo e quali dall'ambiente."), /* @__PURE__ */ React.createElement("ul", { className: "lesson-bullets" }, lesson.openingPrompts.map((item) => /* @__PURE__ */ React.createElement("li", { key: item }, item)))), /* @__PURE__ */ React.createElement("div", { className: "lesson-countdown" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-countdown__dial", "aria-live": "polite" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 120 120", className: "lesson-countdown__ring", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("circle", { cx: "60", cy: "60", r: "52", pathLength: "100" }), /* @__PURE__ */ React.createElement("circle", { cx: "60", cy: "60", r: "52", pathLength: "100", style: { strokeDasharray: "100", strokeDashoffset: 100 - seconds / total * 100 } })), /* @__PURE__ */ React.createElement("div", { className: "lesson-countdown__value" }, /* @__PURE__ */ React.createElement("span", null, "timer"), /* @__PURE__ */ React.createElement("strong", null, seconds))), /* @__PURE__ */ React.createElement("div", { className: "lesson-countdown__actions" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          className: "lesson-action",
          onClick: () => {
            setSeconds(total);
            setRunning(true);
          }
        },
        "Avvia 30 secondi"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          className: "lesson-action lesson-action--secondary",
          onClick: () => {
            setRunning(false);
            setSeconds(total);
          }
        },
        "Reimposta"
      ))))
    )
  );
}
function ExplorationSection() {
  return /* @__PURE__ */ React.createElement(
    LessonSection,
    {
      id: "esplorazione",
      label: "Esplorazione",
      title: "Prima degli strumenti, il gruppo aveva gia corpo, voce e gesto.",
      intro: "La musica delle origini si appoggia a movimento, imitazione, richiamo, memoria e ripetizione condivisa.",
      tone: "white"
    },
    /* @__PURE__ */ React.createElement("div", { className: "lesson-split" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-split__copy lesson-prose" }, /* @__PURE__ */ React.createElement("p", null, lesson.contextText), /* @__PURE__ */ React.createElement("ul", { className: "lesson-bullets" }, lesson.explorationQuestions.map((item) => /* @__PURE__ */ React.createElement("li", { key: item }, item)))), /* @__PURE__ */ React.createElement("div", { className: "lesson-gallery" }, GALLERY_IMAGES.map((item) => /* @__PURE__ */ React.createElement("figure", { key: item.title, className: "lesson-gallery__figure" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-gallery__media" }, /* @__PURE__ */ React.createElement("img", { src: item.src, alt: item.caption, loading: "lazy" })), /* @__PURE__ */ React.createElement("figcaption", { className: "lesson-gallery__caption" }, /* @__PURE__ */ React.createElement("strong", null, item.title), /* @__PURE__ */ React.createElement("p", null, item.caption))))))
  );
}
function BodyConceptVisual({ type }) {
  if (type === "sound") {
    return /* @__PURE__ */ React.createElement("div", { className: "lesson-dot-row" }, /* @__PURE__ */ React.createElement("span", { className: "lesson-dot lesson-dot--accent" }), /* @__PURE__ */ React.createElement("span", { className: "lesson-dot" }), /* @__PURE__ */ React.createElement("span", { className: "lesson-dot" }));
  }
  if (type === "noise") {
    return /* @__PURE__ */ React.createElement("div", { className: "lesson-speed-row lesson-speed-row--compact" }, /* @__PURE__ */ React.createElement("span", null, "colpo"), /* @__PURE__ */ React.createElement("span", null, "urto"), /* @__PURE__ */ React.createElement("span", null, "caso"));
  }
  if (type === "silence") {
    return /* @__PURE__ */ React.createElement("div", { className: "lesson-dot-row" }, /* @__PURE__ */ React.createElement("span", { className: "lesson-dot lesson-dot--pause" }), /* @__PURE__ */ React.createElement("span", { className: "lesson-dot lesson-dot--pause" }), /* @__PURE__ */ React.createElement("span", { className: "lesson-dot lesson-dot--accent" }));
  }
  if (type === "body") {
    return /* @__PURE__ */ React.createElement("div", { className: "lesson-speed-row lesson-speed-row--compact" }, /* @__PURE__ */ React.createElement("span", null, "mani"), /* @__PURE__ */ React.createElement("span", null, "piedi"), /* @__PURE__ */ React.createElement("span", null, "voce"));
  }
  if (type === "voice") {
    return /* @__PURE__ */ React.createElement("div", { className: "lesson-speed-row lesson-speed-row--compact" }, /* @__PURE__ */ React.createElement("span", null, "ta"), /* @__PURE__ */ React.createElement("span", null, "tum"), /* @__PURE__ */ React.createElement("span", null, "ah"));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-speed-row lesson-speed-row--compact" }, /* @__PURE__ */ React.createElement("span", null, "attacco"), /* @__PURE__ */ React.createElement("span", null, "pausa"), /* @__PURE__ */ React.createElement("span", null, "ripresa"));
}
function ConceptsSection() {
  return /* @__PURE__ */ React.createElement(
    LessonSection,
    {
      id: "comprensione-attiva",
      label: "Comprensione attiva",
      title: "Sei parole ti aiutano a dare nome a quello che fai.",
      intro: "Le definizioni restano brevi, ma ogni parola va collegata a un esempio pratico del gruppo.",
      width: "content"
    },
    /* @__PURE__ */ React.createElement("div", { className: "lesson-terms" }, lesson.conceptRows.map((item) => /* @__PURE__ */ React.createElement("article", { key: item.title, className: "lesson-term" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-term__name" }, /* @__PURE__ */ React.createElement("h3", null, item.title), /* @__PURE__ */ React.createElement("div", { className: "lesson-term__visual" }, /* @__PURE__ */ React.createElement(BodyConceptVisual, { type: item.visual }))), /* @__PURE__ */ React.createElement("div", { className: "lesson-term__body lesson-prose" }, /* @__PURE__ */ React.createElement("p", null, item.definition), /* @__PURE__ */ React.createElement("p", { className: "lesson-term__example" }, item.example)))))
  );
}
function ReworkingSection() {
  return /* @__PURE__ */ React.createElement(
    LessonSection,
    {
      id: "rielaborazione",
      label: "Rielaborazione",
      title: "Il suono diventa musica quando il gruppo lo sceglie e lo organizza.",
      intro: "Corpo, voce e gesto non sono tre elementi separati: lavorano insieme per dare forma, memoria e intenzione al suono.",
      tone: "warm"
    },
    /* @__PURE__ */ React.createElement("div", { className: "lesson-split" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-split__copy lesson-prose" }, /* @__PURE__ */ React.createElement("p", null, "Un gesto casuale puo produrre rumore. Lo stesso gesto, ripetuto con una funzione chiara, puo diventare musica. La differenza sta nell'intenzione, nell'ascolto e nella capacita del gruppo di riconoscere un ordine condiviso."), /* @__PURE__ */ React.createElement("p", null, "Quando il suono si organizza nel tempo, il gruppo puo ricordarlo, ripeterlo e trasmetterlo anche senza spartito tradizionale.")), /* @__PURE__ */ React.createElement("div", { className: "lesson-copyboard" }, lesson.reworkingRows.map((item) => /* @__PURE__ */ React.createElement("article", { key: item.title, className: "lesson-copyboard__item" }, /* @__PURE__ */ React.createElement("p", { className: "lesson-copyboard__label" }, item.title), /* @__PURE__ */ React.createElement("blockquote", null, '"', item.text, '"')))))
  );
}
function SequenceBoard() {
  const [selectedSource, setSelectedSource] = useState(lesson.sourceOptions[0].id);
  const [sequence, setSequence] = useState([...lesson.sequencePresets.simple]);
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-sequencer" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-choice-row" }, lesson.sourceOptions.map((item) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: item.id,
      type: "button",
      className: cn("lesson-choice", selectedSource === item.id && "is-active"),
      onClick: () => setSelectedSource(item.id)
    },
    item.label
  ))), /* @__PURE__ */ React.createElement("div", { className: "lesson-sequencer-board", "aria-label": "Sequenza di otto tempi disposta su due righe da quattro" }, sequence.map((state, index) => {
    const item = lesson.sourceOptions.find((entry) => entry.id === state) || lesson.sourceOptions[0];
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: `${state}-${index}`,
        type: "button",
        className: cn("lesson-sequencer-cell", state === "pausa" && "is-pause"),
        onClick: () => setSequence((current) => {
          const next = [...current];
          next[index] = selectedSource;
          return next;
        })
      },
      /* @__PURE__ */ React.createElement("span", { className: "lesson-sequencer-cell__kicker" }, "tempo ", index + 1),
      /* @__PURE__ */ React.createElement("strong", null, item.symbol),
      /* @__PURE__ */ React.createElement("small", null, item.short)
    );
  })), /* @__PURE__ */ React.createElement("div", { className: "lesson-choice-row" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "lesson-action lesson-action--secondary", onClick: () => setSequence([...lesson.sequencePresets.simple]) }, "Esempio semplice"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "lesson-action lesson-action--secondary", onClick: () => setSequence([...lesson.sequencePresets.echo]) }, "Richiamo"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "lesson-action lesson-action--secondary", onClick: () => setSequence([...lesson.sequencePresets.contrast]) }, "Contrasto")), /* @__PURE__ */ React.createElement("p", { className: "lesson-sequencer__legend" }, lesson.sourceOptions.map((item) => `${item.symbol} = ${item.label.toLowerCase()}`).join(" \xB7 ")));
}
function ProductionSection() {
  return /* @__PURE__ */ React.createElement(
    LessonSection,
    {
      id: "produzione",
      label: "Produzione",
      title: "Costruisci una sequenza con corpo, voce e pausa.",
      intro: "Scrivi otto tempi, provali con il gruppo e controlla se il ritmo resta chiaro senza spiegazioni lunghe.",
      tone: "white"
    },
    /* @__PURE__ */ React.createElement(
      ActivityPanel,
      {
        title: "Sequenza del corpo",
        duration: "15 minuti",
        materials: "corpo, voce, banco, spazio minimo",
        output: "una sequenza di 8 tempi"
      },
      /* @__PURE__ */ React.createElement("div", { className: "lesson-split lesson-split--equal" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-split__copy lesson-prose" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-steps" }, lesson.productionSteps.map((step, index) => /* @__PURE__ */ React.createElement("div", { key: step, className: "lesson-steps__row" }, /* @__PURE__ */ React.createElement("span", { className: "lesson-step-index" }, index + 1), /* @__PURE__ */ React.createElement("p", null, step))))), /* @__PURE__ */ React.createElement("div", { className: "lesson-split__media" }, /* @__PURE__ */ React.createElement(SequenceBoard, null)))
    )
  );
}
function SharingSection() {
  return /* @__PURE__ */ React.createElement(
    LessonSection,
    {
      id: "condivisione",
      label: "Condivisione",
      title: "Fai leggere la tua sequenza a un altro gruppo.",
      intro: "Quando il segno e chiaro, il gruppo puo ripetere il ritmo senza dipendere da una spiegazione continua.",
      width: "content"
    },
    /* @__PURE__ */ React.createElement(
      ActivityPanel,
      {
        title: "Passa il ritmo",
        duration: "10 minuti",
        materials: "sequenza scritta e ascolto reciproco",
        output: "una restituzione breve e comprensibile"
      },
      /* @__PURE__ */ React.createElement("div", { className: "lesson-inline-grid" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-prose" }, /* @__PURE__ */ React.createElement("h3", null, "Che cosa fai"), /* @__PURE__ */ React.createElement("ul", { className: "lesson-bullets" }, lesson.sharingRules.map((item) => /* @__PURE__ */ React.createElement("li", { key: item }, item)))), /* @__PURE__ */ React.createElement("div", { className: "lesson-prose" }, /* @__PURE__ */ React.createElement("h3", null, "Legenda minima"), /* @__PURE__ */ React.createElement("div", { className: "lesson-speed-row lesson-speed-row--stacked" }, lesson.notationLegend.map((item) => /* @__PURE__ */ React.createElement("span", { key: item }, item))), /* @__PURE__ */ React.createElement("p", null, "Se vuoi, aggiungi un segno finale o una pausa piu lunga per rendere ancora piu leggibile l'ultimo attacco.")))
    )
  );
}
function QuizPanel() {
  const [answers, setAnswers] = useState({});
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-quiz-panel" }, lesson.quizQuestions.map((question) => {
    const selected = answers[question.id];
    const selectedOption = question.options.find((option) => option.id === selected);
    return /* @__PURE__ */ React.createElement("article", { key: question.id, className: "lesson-question-block" }, /* @__PURE__ */ React.createElement("h3", null, question.prompt), /* @__PURE__ */ React.createElement("div", { className: "lesson-option-list" }, question.options.map((option) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: option.id,
        type: "button",
        className: cn(
          "lesson-option",
          selected === option.id && option.correct && "is-correct",
          selected === option.id && !option.correct && "is-wrong"
        ),
        onClick: () => setAnswers((current) => ({ ...current, [question.id]: option.id }))
      },
      option.label
    ))), selectedOption ? /* @__PURE__ */ React.createElement("p", { className: "lesson-question-block__feedback" }, selectedOption.feedback) : null);
  }));
}
function EvaluationSection() {
  return /* @__PURE__ */ React.createElement(
    LessonSection,
    {
      id: "valutazione",
      label: "Valutazione",
      title: "Controlla che cosa riesci a spiegare.",
      intro: "Alla fine della lezione dovresti riconoscere i suoni usati, dire come li hai organizzati e spiegare perche possono essere considerati musica.",
      tone: "warm"
    },
    /* @__PURE__ */ React.createElement(ActivityPanel, { title: "Verifica leggera", duration: "10 minuti", output: "spiegare il rapporto tra corpo, gesto e musica" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-inline-grid" }, /* @__PURE__ */ React.createElement(QuizPanel, null), /* @__PURE__ */ React.createElement("div", { className: "lesson-self-check" }, /* @__PURE__ */ React.createElement("h3", null, "Autovalutazione"), /* @__PURE__ */ React.createElement("div", { className: "lesson-self-check__rows" }, lesson.selfCheck.map((item) => /* @__PURE__ */ React.createElement("article", { key: item, className: "lesson-self-check__row" }, /* @__PURE__ */ React.createElement("p", null, item), /* @__PURE__ */ React.createElement("div", { className: "lesson-self-check__choices", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("span", null, "ancora no"), /* @__PURE__ */ React.createElement("span", null, "abbastanza"), /* @__PURE__ */ React.createElement("span", null, "si"))))))))
  );
}
function ClosingSection() {
  return /* @__PURE__ */ React.createElement(
    LessonSection,
    {
      id: "chiusura",
      label: "Chiusura",
      title: "Ricorda l'idea chiave.",
      intro: "Il suono diventa musica quando viene organizzato con intenzione e condiviso dal gruppo.",
      width: "content"
    },
    /* @__PURE__ */ React.createElement("div", { className: "lesson-closing" }, /* @__PURE__ */ React.createElement("p", { className: "lesson-closing__line" }, lesson.closingLine), /* @__PURE__ */ React.createElement("p", { className: "lesson-closing__bridge" }, lesson.closingBridge))
  );
}
function CorpoVoceGestoLesson() {
  const activeId = useActiveSection(lesson.flow.map((item) => item.id));
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-editorial-page" }, /* @__PURE__ */ React.createElement(LessonHero, null), /* @__PURE__ */ React.createElement(LessonNav, { activeId }), /* @__PURE__ */ React.createElement(CountdownPanel, null), /* @__PURE__ */ React.createElement(ExplorationSection, null), /* @__PURE__ */ React.createElement(ConceptsSection, null), /* @__PURE__ */ React.createElement(ReworkingSection, null), /* @__PURE__ */ React.createElement(ProductionSection, null), /* @__PURE__ */ React.createElement(SharingSection, null), /* @__PURE__ */ React.createElement(EvaluationSection, null), /* @__PURE__ */ React.createElement(ClosingSection, null));
}
export {
  CorpoVoceGestoLesson as default
};
