import React, { useEffect, useMemo, useRef, useState } from "https://esm.sh/react@18";
const lesson = {
  nucleus: "Origini del suono",
  title: "Ritmo, pulsazione e tempo",
  question: "Che differenza c'e tra ritmo, pulsazione e tempo?",
  intro: "Parti dal corpo e dal battito comune. In questa lezione distingui pulsazione, ritmo, tempo, accento e metro con ascolto, confronto e lavoro di gruppo.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Ritmo, pulsazione e tempo" }
  ],
  heroCaption: "Un battito regolare rende leggibile il gruppo. Il ritmo lo trasforma in azione condivisa.",
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
  openingQuestions: [
    "Che cosa resta uguale mentre il ritmo cambia?",
    "Che cosa ti aiuta a restare nel gruppo?",
    "Quando il battito ti sembra piu lento o piu veloce?"
  ],
  contextText: "Il ritmo accompagna da sempre il movimento umano: camminare, danzare, lavorare, marciare, pregare e suonare insieme. Prima della scrittura musicale, il tempo veniva organizzato con gesti, battiti, ripetizioni e accenti condivisi.",
  observationPrompts: [
    "Guarda se i gesti tornano regolari o irregolari.",
    "Cerca il punto in cui il gruppo riparte insieme.",
    "Osserva se l'accento torna a due, a tre o a quattro."
  ],
  conceptRows: [
    {
      id: "pulsazione",
      title: "Pulsazione",
      definition: "E il battito regolare che sostiene la musica.",
      example: "La senti quando i passi o le mani tornano uguali.",
      visual: "pulse"
    },
    {
      id: "ritmo",
      title: "Ritmo",
      definition: "E il modo in cui suoni e silenzi si organizzano sopra la pulsazione.",
      example: "Puoi cambiare il ritmo anche se il battito sotto resta stabile.",
      visual: "rhythm"
    },
    {
      id: "tempo",
      title: "Tempo",
      definition: "E la velocita della pulsazione: lenta, moderata o veloce.",
      example: "La forma del battito non cambia: cambia la velocita con cui ritorna.",
      visual: "tempo"
    },
    {
      id: "accento",
      title: "Accento",
      definition: "E un suono o una pulsazione con maggior rilievo.",
      example: "Ti aiuta a capire dove cade il punto forte del gruppo.",
      visual: "accent"
    },
    {
      id: "metro",
      title: "Metro",
      definition: "E l'organizzazione regolare degli accenti in gruppi.",
      example: "Puoi sentire gruppi a due, a tre o a quattro.",
      visual: "meter"
    }
  ],
  notebookDefinitions: [
    {
      term: "Pulsazione",
      quote: '"La pulsazione e il battito regolare che sostiene la musica."',
      support: "E il centro comune che aiuta il gruppo a stare insieme."
    },
    {
      term: "Ritmo",
      quote: '"Il ritmo e il modo in cui suoni e silenzi si organizzano nel tempo."',
      support: "Si muove sopra la pulsazione e rende la sequenza riconoscibile."
    },
    {
      term: "Tempo",
      quote: '"Il tempo dice se la pulsazione scorre lenta, moderata o veloce."',
      support: "Ti fa capire quanto rapidamente ritorna il battito comune."
    }
  ],
  listeningSamples: [
    {
      id: "a",
      label: "Ascolto A",
      title: "Passo / marcia",
      focus: "Pulsazione in 2",
      description: "Il corpo tende a camminare in coppie regolari: uno-due, uno-due. Qui la pulsazione e molto leggibile.",
      action: "Batti mani o banco seguendo un passo fermo e regolare.",
      expectedGroup: 2
    },
    {
      id: "b",
      label: "Ascolto B",
      title: "Dondolio / valzer",
      focus: "Pulsazione in 3",
      description: "Il movimento oscilla e fa sentire gruppi di tre: uno accompagna, due completano il giro.",
      action: "Conta uno-due-tre con un piccolo movimento del corpo.",
      expectedGroup: 3
    },
    {
      id: "c",
      label: "Ascolto C",
      title: "Groove / battito moderno",
      focus: "Pulsazione stabile con ritmo sovrapposto",
      description: "Il battito resta sotto, ma il ritmo in superficie si muove e puo farti perdere il centro.",
      action: "Tieni il battito con una mano e immagina un ritmo diverso con l'altra.",
      expectedGroup: 4
    }
  ],
  listeningQuestions: [
    "Riesci a battere la pulsazione?",
    "Dove senti l'accento piu forte?",
    "Il ritmo coincide sempre con la pulsazione?"
  ],
  pulseModes: [
    { id: "slow", label: "Lenta", bpm: 60 },
    { id: "medium", label: "Media", bpm: 90 },
    { id: "fast", label: "Veloce", bpm: 120 }
  ],
  pulseSteps: [
    "Scegli il tempo del battito comune.",
    "Segui i 4 battiti senza cambiare forma.",
    "Poi aggiungi un ritmo diverso sopra la pulsazione."
  ],
  sequenceStates: [
    { id: "sound", label: "suono", symbol: "\u25CF" },
    { id: "pause", label: "pausa", symbol: "\u25CB" },
    { id: "accent", label: "accento", symbol: "\u25CF" }
  ],
  sequencePresets: {
    simple: Array.from({ length: 8 }, () => "sound"),
    pauses: ["sound", "pause", "sound", "pause", "sound", "sound", "pause", "sound"],
    accents: ["accent", "sound", "sound", "sound", "accent", "sound", "sound", "sound"]
  },
  sharingTask: {
    title: "Compito: fai sentire il gruppo.",
    intro: "Lavora in coppia o in piccolo gruppo. Costruisci una breve sequenza con pulsazione, ritmo e accenti. Puoi usare corpo, voce, banco, oggetti sonori o notazione grafica.",
    steps: [
      "Scegli chi tiene la pulsazione.",
      "Aggiungi un ritmo che si distingua dal battito comune.",
      "Fai sentire almeno due accenti riconoscibili.",
      "Ripeti la sequenza finche resta chiara per tutto il gruppo."
    ],
    output: "Alla fine il gruppo deve riuscire a ripetere la sequenza senza spiegazioni lunghe.",
    materials: "corpo, voce, banco, oggetti sonori, notazione grafica",
    duration: "20 minuti"
  },
  sharingCriteria: [
    "Il battito comune resta stabile.",
    "Ritmo e pulsazione si distinguono chiaramente.",
    "Gli accenti si sentono davvero.",
    "Il tempo scelto resta coerente dall'inizio alla fine."
  ],
  quizQuestions: [
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
          feedback: "Esatto. Il ritmo si muove sopra la pulsazione e cambia il disegno della sequenza."
        },
        {
          id: "q2b",
          label: "La velocita con cui suoni piu forte.",
          correct: false,
          feedback: "Non proprio. Qui stai mescolando ritmo e accento."
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
          feedback: "Esatto. Il tempo dice se il battito scorre lento, moderato o veloce."
        },
        {
          id: "q3b",
          label: "Il numero totale dei suoni.",
          correct: false,
          feedback: "No. Il tempo non conta i suoni: descrive la velocita del battito."
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
          feedback: "Esatto. Il metro ti aiuta a sentire se il gruppo torna a due, a tre o a quattro."
        },
        {
          id: "q4b",
          label: "A rendere tutti i suoni uguali.",
          correct: false,
          feedback: "Non proprio. Il metro organizza gli accenti, non cancella le differenze."
        }
      ]
    }
  ],
  selfCheck: [
    "Riesci a distinguere pulsazione e ritmo?",
    "Riesci a riconoscere se il tempo e lento, moderato o veloce?",
    "Riesci a tenere il battito comune mentre il gruppo cambia ritmo?"
  ],
  closingLine: "La pulsazione e il battito regolare. Il ritmo e cio che accade dentro quel battito.",
  closingBridge: "Nella lezione successiva prova a chiederti: come cambia il ritmo quando il corpo diventa strumento?"
};
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (!("matchMedia" in window)) return void 0;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mediaQuery.matches);
    sync();
    if ("addEventListener" in mediaQuery) {
      mediaQuery.addEventListener("change", sync);
      return () => mediaQuery.removeEventListener("change", sync);
    }
    mediaQuery.addListener(sync);
    return () => mediaQuery.removeListener(sync);
  }, []);
  return reducedMotion;
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
function RhythmHeroGraphic() {
  return /* @__PURE__ */ React.createElement(
    "svg",
    {
      className: "lesson-hero-graphic",
      viewBox: "0 0 1200 520",
      role: "img",
      "aria-label": "Illustrazione con pulsazione regolare, ritmo sovrapposto e accenti organizzati in gruppi.",
      preserveAspectRatio: "xMidYMid slice"
    },
    /* @__PURE__ */ React.createElement("rect", { x: "0", y: "0", width: "1200", height: "520", fill: "#f2ede4" }),
    /* @__PURE__ */ React.createElement("line", { x1: "120", y1: "150", x2: "1080", y2: "150", stroke: "#d6cec1", strokeWidth: "2" }),
    /* @__PURE__ */ React.createElement("line", { x1: "120", y1: "260", x2: "1080", y2: "260", stroke: "#d6cec1", strokeWidth: "2" }),
    /* @__PURE__ */ React.createElement("line", { x1: "120", y1: "372", x2: "1080", y2: "372", stroke: "#d6cec1", strokeWidth: "2" }),
    [220, 420, 620, 820, 1020].map((x) => /* @__PURE__ */ React.createElement("g", { key: `pulse-${x}` }, /* @__PURE__ */ React.createElement("circle", { cx: x, cy: 150, r: "26", fill: "#d9822b" }), /* @__PURE__ */ React.createElement("circle", { cx: x, cy: 150, r: "54", fill: "none", stroke: "#e7dbcc", strokeWidth: "12" }))),
    [180, 300, 450, 590, 720, 900, 1035].map((x, index) => /* @__PURE__ */ React.createElement(
      "circle",
      {
        key: `rhythm-${x}`,
        cx: x,
        cy: 260,
        r: index % 3 === 0 ? 32 : 18,
        fill: index % 3 === 0 ? "#111827" : "#71819a"
      }
    )),
    [
      { x: 210, width: 180, fill: "#eef3f8", text: "1 2" },
      { x: 445, width: 250, fill: "#fff1e4", text: "1 2 3" },
      { x: 760, width: 310, fill: "#edf4ec", text: "1 2 3 4" }
    ].map((group) => /* @__PURE__ */ React.createElement("g", { key: group.text }, /* @__PURE__ */ React.createElement("rect", { x: group.x, y: "332", width: group.width, height: "80", rx: "40", fill: group.fill }), /* @__PURE__ */ React.createElement(
      "text",
      {
        x: group.x + group.width / 2,
        y: "382",
        textAnchor: "middle",
        fontFamily: "SF Pro Text, Inter, system-ui, sans-serif",
        fontSize: "34",
        fill: "#111827"
      },
      group.text
    ))),
    /* @__PURE__ */ React.createElement("text", { x: "120", y: "118", fontSize: "22", fill: "#6b7280", fontFamily: "SF Pro Text, Inter, system-ui, sans-serif" }, "pulsazione"),
    /* @__PURE__ */ React.createElement("text", { x: "120", y: "228", fontSize: "22", fill: "#6b7280", fontFamily: "SF Pro Text, Inter, system-ui, sans-serif" }, "ritmo"),
    /* @__PURE__ */ React.createElement("text", { x: "120", y: "340", fontSize: "22", fill: "#6b7280", fontFamily: "SF Pro Text, Inter, system-ui, sans-serif" }, "metro")
  );
}
function LessonHero() {
  return /* @__PURE__ */ React.createElement("header", { className: "lesson-hero", id: "apertura" }, /* @__PURE__ */ React.createElement(LessonBreadcrumb, { items: lesson.breadcrumbs }), /* @__PURE__ */ React.createElement("div", { className: "lesson-editorial-shell" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-hero__copy" }, /* @__PURE__ */ React.createElement("p", { className: "lesson-hero__eyebrow" }, lesson.nucleus), /* @__PURE__ */ React.createElement("h1", { className: "lesson-hero__title" }, lesson.title), /* @__PURE__ */ React.createElement("p", { className: "lesson-hero__question" }, lesson.question), /* @__PURE__ */ React.createElement("p", { className: "lesson-hero__intro" }, lesson.intro)), /* @__PURE__ */ React.createElement("figure", { className: "lesson-hero__media" }, /* @__PURE__ */ React.createElement(RhythmHeroGraphic, null)), /* @__PURE__ */ React.createElement("figcaption", { className: "lesson-editorial-shell lesson-hero__caption" }, lesson.heroCaption)));
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
  const reducedMotion = usePrefersReducedMotion();
  useEffect(() => {
    if (!running) return void 0;
    if (seconds === 0) {
      setRunning(false);
      return void 0;
    }
    const timer = window.setTimeout(() => setSeconds((value) => Math.max(0, value - 1)), 1e3);
    return () => window.clearTimeout(timer);
  }, [running, seconds]);
  const progress = seconds / total * 100;
  return /* @__PURE__ */ React.createElement(
    ActivityPanel,
    {
      title: "Prendi un battito comune",
      duration: "30 secondi",
      materials: "corpo, banco o piccolo spazio libero",
      output: "una pulsazione condivisa"
    },
    /* @__PURE__ */ React.createElement("div", { className: "lesson-opening-panel" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-opening-panel__copy lesson-prose" }, /* @__PURE__ */ React.createElement("p", null, "Cammina lentamente o batti le mani sul banco. All'inizio ognuno segue il proprio impulso."), /* @__PURE__ */ React.createElement("p", null, "Poi prova a trovare un battito comune uguale per tutti."), /* @__PURE__ */ React.createElement("ul", { className: "lesson-bullets" }, lesson.openingQuestions.map((item) => /* @__PURE__ */ React.createElement("li", { key: item }, item)))), /* @__PURE__ */ React.createElement("div", { className: "lesson-countdown" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-countdown__dial", "aria-live": "polite" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 120 120", className: "lesson-countdown__ring", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("circle", { cx: "60", cy: "60", r: "52", pathLength: "100" }), /* @__PURE__ */ React.createElement(
      "circle",
      {
        cx: "60",
        cy: "60",
        r: "52",
        pathLength: "100",
        style: {
          strokeDasharray: "100",
          strokeDashoffset: reducedMotion ? 0 : 100 - progress
        }
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "lesson-countdown__value" }, /* @__PURE__ */ React.createElement("span", null, "timer"), /* @__PURE__ */ React.createElement("strong", null, seconds))), /* @__PURE__ */ React.createElement("div", { className: "lesson-countdown__actions" }, /* @__PURE__ */ React.createElement(
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
  );
}
function ExplorationSection() {
  const [activeListening, setActiveListening] = useState(lesson.listeningSamples[0].id);
  const [selectedGroup, setSelectedGroup] = useState(lesson.listeningSamples[0].expectedGroup);
  const activeSample = lesson.listeningSamples.find((item) => item.id === activeListening) || lesson.listeningSamples[0];
  useEffect(() => {
    setSelectedGroup(activeSample.expectedGroup);
  }, [activeSample.expectedGroup]);
  return /* @__PURE__ */ React.createElement(
    LessonSection,
    {
      id: "esplorazione",
      label: "Esplorazione",
      title: "Il ritmo nasce da gesti, passi, ripetizioni e accenti.",
      intro: "Prima della scrittura musicale, il gruppo organizzava il tempo ascoltando il corpo, il lavoro, il cammino e il ritorno degli accenti.",
      tone: "white"
    },
    /* @__PURE__ */ React.createElement("div", { className: "lesson-split" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-split__copy lesson-prose" }, /* @__PURE__ */ React.createElement("p", null, lesson.contextText), /* @__PURE__ */ React.createElement("ul", { className: "lesson-bullets" }, lesson.observationPrompts.map((item) => /* @__PURE__ */ React.createElement("li", { key: item }, item)))), /* @__PURE__ */ React.createElement(
      ActivityPanel,
      {
        title: "Ascolto guidato",
        duration: "8 minuti",
        materials: "voce, corpo, banco o immaginazione ritmica",
        output: "riconoscere il battito comune"
      },
      /* @__PURE__ */ React.createElement("div", { className: "lesson-tab-row", role: "tablist", "aria-label": "Situazioni di ascolto" }, lesson.listeningSamples.map((sample) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: sample.id,
          type: "button",
          role: "tab",
          "aria-selected": sample.id === activeSample.id,
          className: cn("lesson-tab", sample.id === activeSample.id && "is-active"),
          onClick: () => setActiveListening(sample.id)
        },
        sample.label
      ))),
      /* @__PURE__ */ React.createElement("div", { className: "lesson-listening-panel" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-listening-panel__content" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-listening-panel__copy lesson-prose" }, /* @__PURE__ */ React.createElement("p", { className: "lesson-listening-panel__focus" }, activeSample.focus), /* @__PURE__ */ React.createElement("h3", null, activeSample.title), /* @__PURE__ */ React.createElement("p", null, activeSample.description), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Prova:"), " ", activeSample.action), /* @__PURE__ */ React.createElement("ul", { className: "lesson-bullets" }, lesson.listeningQuestions.map((item) => /* @__PURE__ */ React.createElement("li", { key: item }, item)))), /* @__PURE__ */ React.createElement("div", { className: "lesson-listening-panel__media" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-listening-panel__group-row" }, [2, 3, 4].map((group) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: group,
          type: "button",
          className: cn("lesson-choice", selectedGroup === group && "is-active"),
          onClick: () => setSelectedGroup(group)
        },
        group,
        " pulsazioni"
      ))), /* @__PURE__ */ React.createElement("div", { className: "lesson-track-visual" }, buildGroupSequence(selectedGroup).map((beat, index) => /* @__PURE__ */ React.createElement(
        "span",
        {
          key: `${selectedGroup}-${index}`,
          className: cn("lesson-track-beat", beat === 1 && "lesson-track-beat--accent"),
          style: getMeterTone(selectedGroup)
        },
        beat
      ))), /* @__PURE__ */ React.createElement("p", { className: "lesson-listening-panel__note" }, "Osserva dove il numero ", /* @__PURE__ */ React.createElement("strong", null, "1"), " torna a riaprire il gruppo."))))
    ))
  );
}
function ConceptVisual({ type }) {
  if (type === "pulse") {
    return /* @__PURE__ */ React.createElement("div", { className: "lesson-dot-row" }, Array.from({ length: 4 }).map((_, index) => /* @__PURE__ */ React.createElement("span", { key: index, className: "lesson-dot" })));
  }
  if (type === "rhythm") {
    return /* @__PURE__ */ React.createElement("div", { className: "lesson-dot-row" }, /* @__PURE__ */ React.createElement("span", { className: "lesson-dot" }), /* @__PURE__ */ React.createElement("span", { className: "lesson-dot lesson-dot--pause" }), /* @__PURE__ */ React.createElement("span", { className: "lesson-dot" }), /* @__PURE__ */ React.createElement("span", { className: "lesson-dot lesson-dot--accent" }));
  }
  if (type === "tempo") {
    return /* @__PURE__ */ React.createElement("div", { className: "lesson-speed-row" }, /* @__PURE__ */ React.createElement("span", null, "Lenta"), /* @__PURE__ */ React.createElement("span", null, "Moderata"), /* @__PURE__ */ React.createElement("span", null, "Veloce"));
  }
  if (type === "accent") {
    return /* @__PURE__ */ React.createElement("div", { className: "lesson-dot-row" }, /* @__PURE__ */ React.createElement("span", { className: "lesson-dot lesson-dot--accent" }), /* @__PURE__ */ React.createElement("span", { className: "lesson-dot" }), /* @__PURE__ */ React.createElement("span", { className: "lesson-dot" }), /* @__PURE__ */ React.createElement("span", { className: "lesson-dot" }));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-meter-rows" }, [2, 3, 4].map((group) => /* @__PURE__ */ React.createElement("div", { key: group, className: "lesson-meter-row" }, buildCompactGroup(group).map((item, index) => /* @__PURE__ */ React.createElement(
    "span",
    {
      key: `${group}-${index}`,
      className: cn("lesson-meter-chip", item === 1 && "lesson-meter-chip--accent"),
      style: getMeterTone(group)
    },
    item
  )))));
}
function ConceptsSection() {
  return /* @__PURE__ */ React.createElement(
    LessonSection,
    {
      id: "comprensione-attiva",
      label: "Comprensione attiva",
      title: "Cinque parole ti aiutano a leggere quello che senti.",
      intro: "Qui il lessico non resta astratto: ogni concetto ha un esempio concreto e un segno visivo semplice.",
      width: "content"
    },
    /* @__PURE__ */ React.createElement("div", { className: "lesson-terms" }, lesson.conceptRows.map((item) => /* @__PURE__ */ React.createElement("article", { key: item.id, className: "lesson-term" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-term__name" }, /* @__PURE__ */ React.createElement("h3", null, item.title), /* @__PURE__ */ React.createElement("div", { className: "lesson-term__visual" }, /* @__PURE__ */ React.createElement(ConceptVisual, { type: item.visual }))), /* @__PURE__ */ React.createElement("div", { className: "lesson-term__body lesson-prose" }, /* @__PURE__ */ React.createElement("p", null, item.definition), /* @__PURE__ */ React.createElement("p", { className: "lesson-term__example" }, item.example)))))
  );
}
function RielaborazioneSection() {
  return /* @__PURE__ */ React.createElement(
    LessonSection,
    {
      id: "rielaborazione",
      label: "Rielaborazione",
      title: "Tre definizioni da fissare nel quaderno.",
      intro: "Scrivile in corsivo, poi prova a spiegare con parole tue in che cosa sono diverse.",
      tone: "warm"
    },
    /* @__PURE__ */ React.createElement("div", { className: "lesson-split" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-split__copy lesson-prose" }, /* @__PURE__ */ React.createElement("p", null, "Quando il gruppo capisce dove torna il battito, puo distinguere meglio pulsazione, ritmo e tempo. Le tre definizioni ti aiutano a trasformare l'esperienza in lessico disciplinare."), /* @__PURE__ */ React.createElement("p", null, "Osserva anche come il metro organizza gli accenti in gruppi diversi: a due, a tre o a quattro."), /* @__PURE__ */ React.createElement("div", { className: "lesson-meter-board" }, [2, 3, 4].map((group) => /* @__PURE__ */ React.createElement("div", { key: group, className: "lesson-meter-board__row" }, /* @__PURE__ */ React.createElement("strong", null, "Gruppo da ", group), /* @__PURE__ */ React.createElement("div", { className: "lesson-track-visual" }, buildGroupSequence(group).map((beat, index) => /* @__PURE__ */ React.createElement(
      "span",
      {
        key: `${group}-board-${index}`,
        className: cn("lesson-track-beat", beat === 1 && "lesson-track-beat--accent"),
        style: getMeterTone(group)
      },
      beat
    ))))))), /* @__PURE__ */ React.createElement("div", { className: "lesson-copyboard" }, lesson.notebookDefinitions.map((item) => /* @__PURE__ */ React.createElement("article", { key: item.term, className: "lesson-copyboard__item" }, /* @__PURE__ */ React.createElement("p", { className: "lesson-copyboard__label" }, item.term), /* @__PURE__ */ React.createElement("blockquote", null, item.quote), /* @__PURE__ */ React.createElement("p", null, item.support)))))
  );
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
  ))), /* @__PURE__ */ React.createElement("div", { className: "lesson-pulse-beats" }, Array.from({ length: 4 }).map((_, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: cn("lesson-pulse-beat", activeBeat === index && "is-live") }, /* @__PURE__ */ React.createElement("span", { className: "lesson-pulse-beat__number" }, index + 1), /* @__PURE__ */ React.createElement("small", null, index === 0 ? "riparte" : "continua")))), /* @__PURE__ */ React.createElement("div", { className: "lesson-steps" }, lesson.pulseSteps.map((step, index) => /* @__PURE__ */ React.createElement("div", { key: step, className: "lesson-steps__row" }, /* @__PURE__ */ React.createElement("span", { className: "lesson-step-index" }, index + 1), /* @__PURE__ */ React.createElement("p", null, step)))));
}
function RhythmSequencerBoard() {
  const [selectedState, setSelectedState] = useState(lesson.sequenceStates[0].id);
  const [sequence, setSequence] = useState(Array.from({ length: 8 }, () => "sound"));
  const selectedMeta = lesson.sequenceStates.find((item) => item.id === selectedState) || lesson.sequenceStates[0];
  const applyPreset = (preset) => setSequence([...preset]);
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-sequencer" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-choice-row" }, lesson.sequenceStates.map((item) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: item.id,
      type: "button",
      className: cn("lesson-choice", item.id === selectedState && "is-active"),
      onClick: () => setSelectedState(item.id)
    },
    item.label
  ))), /* @__PURE__ */ React.createElement("div", { className: "lesson-sequencer-board", "aria-label": "Lavagna ritmica in due righe da quattro tempi" }, sequence.map((state, index) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: `${state}-${index}`,
      type: "button",
      className: cn(
        "lesson-sequencer-cell",
        state === "accent" && "is-accent",
        state === "pause" && "is-pause"
      ),
      onClick: () => setSequence((current) => {
        const next = [...current];
        next[index] = selectedMeta.id;
        return next;
      })
    },
    /* @__PURE__ */ React.createElement("span", { className: "lesson-sequencer-cell__kicker" }, "tempo ", index + 1),
    /* @__PURE__ */ React.createElement("strong", null, lesson.sequenceStates.find((item) => item.id === state)?.symbol || "\u25CF"),
    /* @__PURE__ */ React.createElement("small", null, lesson.sequenceStates.find((item) => item.id === state)?.label || "suono")
  ))), /* @__PURE__ */ React.createElement("div", { className: "lesson-choice-row" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "lesson-action lesson-action--secondary", onClick: () => setSequence(Array.from({ length: 8 }, () => "pause")) }, "Reset"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "lesson-action lesson-action--secondary", onClick: () => applyPreset(lesson.sequencePresets.simple) }, "Esempio semplice"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "lesson-action lesson-action--secondary", onClick: () => applyPreset(lesson.sequencePresets.pauses) }, "Esempio con pause"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "lesson-action lesson-action--secondary", onClick: () => applyPreset(lesson.sequencePresets.accents) }, "Esempio con accenti")), /* @__PURE__ */ React.createElement("p", { className: "lesson-sequencer__legend" }, "\u25CF = suono \xB7 \u25CB = pausa \xB7 \u25CF grande = accento"));
}
function ProductionSection() {
  return /* @__PURE__ */ React.createElement(
    LessonSection,
    {
      id: "produzione",
      label: "Produzione",
      title: "Prova il battito. Poi scrivi il ritmo.",
      intro: "Prima mantieni una pulsazione comune. Poi costruisci una sequenza in due battute da quattro tempi.",
      tone: "white"
    },
    /* @__PURE__ */ React.createElement(
      ActivityPanel,
      {
        title: "Lavora sul battito comune",
        duration: "15 minuti",
        materials: "corpo, banco, voce, oggetti sonori",
        output: "una sequenza leggibile dal gruppo"
      },
      /* @__PURE__ */ React.createElement("div", { className: "lesson-split lesson-split--equal" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-split__media" }, /* @__PURE__ */ React.createElement(PulseBoard, null)), /* @__PURE__ */ React.createElement("div", { className: "lesson-split__media" }, /* @__PURE__ */ React.createElement(RhythmSequencerBoard, null)))
    )
  );
}
function SharingSection() {
  return /* @__PURE__ */ React.createElement(
    LessonSection,
    {
      id: "condivisione",
      label: "Condivisione",
      title: lesson.sharingTask.title,
      intro: lesson.sharingTask.intro,
      width: "content"
    },
    /* @__PURE__ */ React.createElement(
      ActivityPanel,
      {
        title: "Presenta la tua sequenza",
        duration: lesson.sharingTask.duration,
        materials: lesson.sharingTask.materials,
        output: lesson.sharingTask.output
      },
      /* @__PURE__ */ React.createElement("div", { className: "lesson-inline-grid" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-prose" }, /* @__PURE__ */ React.createElement("h3", null, "Che cosa fai"), /* @__PURE__ */ React.createElement("div", { className: "lesson-steps" }, lesson.sharingTask.steps.map((step, index) => /* @__PURE__ */ React.createElement("div", { key: step, className: "lesson-steps__row" }, /* @__PURE__ */ React.createElement("span", { className: "lesson-step-index" }, index + 1), /* @__PURE__ */ React.createElement("p", null, step))))), /* @__PURE__ */ React.createElement("div", { className: "lesson-prose" }, /* @__PURE__ */ React.createElement("h3", null, "Come capisci se funziona"), /* @__PURE__ */ React.createElement("ul", { className: "lesson-bullets" }, lesson.sharingCriteria.map((item) => /* @__PURE__ */ React.createElement("li", { key: item }, item)))))
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
      title: "Controlla che cosa hai capito.",
      intro: "Rispondi alle domande chiave e poi prova a dirti dove ti senti piu sicuro e dove hai ancora bisogno del gruppo.",
      tone: "warm"
    },
    /* @__PURE__ */ React.createElement(ActivityPanel, { title: "Verifica leggera", duration: "10 minuti", output: "riconoscere pulsazione, ritmo, tempo e metro" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-inline-grid" }, /* @__PURE__ */ React.createElement(QuizPanel, null), /* @__PURE__ */ React.createElement("div", { className: "lesson-self-check" }, /* @__PURE__ */ React.createElement("h3", null, "Autovalutazione"), /* @__PURE__ */ React.createElement("div", { className: "lesson-self-check__rows" }, lesson.selfCheck.map((item) => /* @__PURE__ */ React.createElement("article", { key: item, className: "lesson-self-check__row" }, /* @__PURE__ */ React.createElement("p", null, item), /* @__PURE__ */ React.createElement("div", { className: "lesson-self-check__choices", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("span", null, "ancora no"), /* @__PURE__ */ React.createElement("span", null, "abbastanza"), /* @__PURE__ */ React.createElement("span", null, "si"))))))))
  );
}
function ClosingSection() {
  return /* @__PURE__ */ React.createElement(
    LessonSection,
    {
      id: "chiusura",
      label: "Chiusura",
      title: "Ricorda il centro del lavoro.",
      intro: "Il gruppo funziona quando il battito comune resta leggibile anche mentre il ritmo cambia.",
      width: "content"
    },
    /* @__PURE__ */ React.createElement("div", { className: "lesson-closing" }, /* @__PURE__ */ React.createElement("p", { className: "lesson-closing__line" }, lesson.closingLine), /* @__PURE__ */ React.createElement("p", { className: "lesson-closing__bridge" }, lesson.closingBridge))
  );
}
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
    return { "--tone-bg": "#edf4ec", "--tone-accent": "#6a994e", "--tone-text": "#2f5136" };
  }
  if (groupSize === 3) {
    return { "--tone-bg": "#fff1e4", "--tone-accent": "#d9822b", "--tone-text": "#7a4c1d" };
  }
  return { "--tone-bg": "#eef3f8", "--tone-accent": "#3a7ca5", "--tone-text": "#274e67" };
}
function RitmoPulsazioneTempoLesson() {
  const activeId = useActiveSection(lesson.flow.map((item) => item.id));
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-editorial-page" }, /* @__PURE__ */ React.createElement(LessonHero, null), /* @__PURE__ */ React.createElement(LessonNav, { activeId }), /* @__PURE__ */ React.createElement(CountdownPanel, null), /* @__PURE__ */ React.createElement(ExplorationSection, null), /* @__PURE__ */ React.createElement(ConceptsSection, null), /* @__PURE__ */ React.createElement(RielaborazioneSection, null), /* @__PURE__ */ React.createElement(ProductionSection, null), /* @__PURE__ */ React.createElement(SharingSection, null), /* @__PURE__ */ React.createElement(EvaluationSection, null), /* @__PURE__ */ React.createElement(ClosingSection, null));
}
export {
  RitmoPulsazioneTempoLesson as default
};
