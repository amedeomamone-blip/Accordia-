// components/RitmoPulsazioneTempoLesson.jsx
import React2, { useEffect as useEffect2, useState as useState2 } from "https://esm.sh/react@18";

// components/LessonShared.module.js
import React, { useEffect, useState } from "https://esm.sh/react@18";
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
function scrollToId(id) {
  const node = document.getElementById(id);
  if (node) {
    node.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (!("matchMedia" in window)) {
      return void 0;
    }
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
        threshold: [0.18, 0.32, 0.52, 0.72]
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
function LessonHero({ title, question, breadcrumbs }) {
  return /* @__PURE__ */ React.createElement("header", { className: "lesson-hero" }, /* @__PURE__ */ React.createElement(LessonBreadcrumb, { items: breadcrumbs }), /* @__PURE__ */ React.createElement("div", { className: "lesson-shell lesson-hero__copy" }, /* @__PURE__ */ React.createElement("h1", { className: "lesson-hero__title" }, title), question ? /* @__PURE__ */ React.createElement("p", { className: "lesson-hero__question" }, question) : null));
}
function MetaStrip({ items }) {
  return /* @__PURE__ */ React.createElement("section", { className: "lesson-meta-bar", "aria-label": "Dati tecnici" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell" }, /* @__PURE__ */ React.createElement("dl", { className: "lesson-meta-bar__list" }, items.map((item) => /* @__PURE__ */ React.createElement("div", { key: `${item.label}-${item.value}`, className: "lesson-meta-bar__item" }, /* @__PURE__ */ React.createElement("dt", null, item.label), /* @__PURE__ */ React.createElement("dd", null, item.value))))));
}
function FactStrip({ items }) {
  return /* @__PURE__ */ React.createElement("dl", { className: "lesson-fact-strip" }, items.map((item) => /* @__PURE__ */ React.createElement("div", { key: `${item.label}-${item.value}`, className: "lesson-fact-strip__item" }, /* @__PURE__ */ React.createElement("dt", null, item.label), /* @__PURE__ */ React.createElement("dd", null, item.value))));
}
function LessonProgress({ items, activeId, selectedFollowup, onSelectFollowup }) {
  const currentId = activeId === "rielaborazione" ? selectedFollowup || activeId : activeId;
  return /* @__PURE__ */ React.createElement("nav", { className: "lesson-progress", "aria-label": "Fasi della lezione" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell lesson-progress__track" }, items.map((item, index) => {
    const isActive = currentId === item.id;
    if (item.type === "anchor") {
      return /* @__PURE__ */ React.createElement(
        "a",
        {
          key: item.id,
          href: `#${item.id}`,
          className: cn("lesson-progress__item", isActive && "is-active"),
          "aria-current": isActive ? "step" : void 0
        },
        /* @__PURE__ */ React.createElement("span", { className: "lesson-progress__index" }, index + 1),
        /* @__PURE__ */ React.createElement("span", { className: "lesson-progress__label" }, item.label)
      );
    }
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: item.id,
        type: "button",
        className: cn("lesson-progress__item", "lesson-progress__item--button", isActive && "is-active"),
        "aria-current": isActive ? "step" : void 0,
        onClick: () => {
          onSelectFollowup(item.id);
          scrollToId("rielaborazione");
        }
      },
      /* @__PURE__ */ React.createElement("span", { className: "lesson-progress__index" }, index + 1),
      /* @__PURE__ */ React.createElement("span", { className: "lesson-progress__label" }, item.label)
    );
  })));
}
function LessonSection({ id, label, title, intro, tone = "plain", children }) {
  return /* @__PURE__ */ React.createElement("section", { id, className: cn("lesson-section", tone === "soft" && "lesson-section--soft") }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell" }, label || title || intro ? /* @__PURE__ */ React.createElement("header", { className: "lesson-section__header" }, label ? /* @__PURE__ */ React.createElement("p", { className: "lesson-section__label" }, label) : null, title ? /* @__PURE__ */ React.createElement("h2", { className: "lesson-section__title" }, title) : null, intro ? /* @__PURE__ */ React.createElement("p", { className: "lesson-section__intro" }, intro) : null) : null, /* @__PURE__ */ React.createElement("div", { className: "lesson-section__body" }, children)));
}
function Panel({ kicker, title, meta, children, tone = "plain" }) {
  return /* @__PURE__ */ React.createElement("section", { className: cn("lesson-panel", tone === "soft" && "lesson-panel--soft") }, kicker || title || meta?.length ? /* @__PURE__ */ React.createElement("div", { className: "lesson-panel__header" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-panel__heading" }, kicker ? /* @__PURE__ */ React.createElement("p", { className: "lesson-panel__kicker" }, kicker) : null, title ? /* @__PURE__ */ React.createElement("h3", { className: "lesson-panel__title" }, title) : null), meta?.length ? /* @__PURE__ */ React.createElement(FactStrip, { items: meta }) : null) : null, children);
}
function StepList({ title, items }) {
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-stack" }, title ? /* @__PURE__ */ React.createElement("h3", { className: "lesson-mini-title" }, title) : null, /* @__PURE__ */ React.createElement("ol", { className: "lesson-step-list" }, items.map((item, index) => /* @__PURE__ */ React.createElement("li", { key: `${title}-${index}-${item}`, className: "lesson-step-list__item" }, /* @__PURE__ */ React.createElement("span", { className: "lesson-step-list__index" }, index + 1), /* @__PURE__ */ React.createElement("p", null, item)))));
}
function PromptList({ title, items }) {
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-stack" }, title ? /* @__PURE__ */ React.createElement("h3", { className: "lesson-mini-title" }, title) : null, /* @__PURE__ */ React.createElement("ul", { className: "lesson-prompt-list" }, items.map((item) => /* @__PURE__ */ React.createElement("li", { key: item }, item))));
}
function ResultCallout({ label = "Alla fine", text, className }) {
  return /* @__PURE__ */ React.createElement("div", { className: cn("lesson-result", className) }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("strong", null, text));
}
function ActivityLayout({ steps, observe, result, right, stepsTitle = "Fai cosi", observeTitle = "Osserva" }) {
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-activity" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-activity__text" }, /* @__PURE__ */ React.createElement(StepList, { title: stepsTitle, items: steps }), /* @__PURE__ */ React.createElement(PromptList, { title: observeTitle, items: observe })), /* @__PURE__ */ React.createElement("div", { className: "lesson-activity__side" }, right), /* @__PURE__ */ React.createElement(ResultCallout, { className: "lesson-activity__result", text: result }));
}
function PhaseTabs({ items, selected, onSelect, ariaLabel }) {
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-tab-row", role: "tablist", "aria-label": ariaLabel }, items.map((item) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: item.id,
      type: "button",
      role: "tab",
      "aria-selected": selected === item.id,
      className: cn("lesson-tab", selected === item.id && "is-active"),
      onClick: () => onSelect(item.id)
    },
    item.label
  )));
}
function SimpleTimer({ total = 30, startLabel = "Avvia", resetLabel = "Reimposta" }) {
  const [seconds, setSeconds] = useState(total);
  const [running, setRunning] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  useEffect(() => {
    if (!running) {
      return void 0;
    }
    if (seconds === 0) {
      setRunning(false);
      return void 0;
    }
    const timer = window.setTimeout(() => setSeconds((value) => Math.max(0, value - 1)), 1e3);
    return () => window.clearTimeout(timer);
  }, [running, seconds]);
  const progress = reducedMotion ? 0 : 100 - seconds / total * 100;
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-timer" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-timer__dial", "aria-live": "polite" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 160 160", className: "lesson-timer__ring", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("circle", { cx: "80", cy: "80", r: "68", pathLength: "100" }), /* @__PURE__ */ React.createElement("circle", { cx: "80", cy: "80", r: "68", pathLength: "100", style: { strokeDasharray: "100", strokeDashoffset: progress } })), /* @__PURE__ */ React.createElement("div", { className: "lesson-timer__value" }, /* @__PURE__ */ React.createElement("span", { className: "lesson-visually-hidden" }, "Secondi rimasti"), /* @__PURE__ */ React.createElement("strong", null, seconds))), /* @__PURE__ */ React.createElement("div", { className: "lesson-timer__controls" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: "lesson-text-button",
      onClick: () => {
        setSeconds(total);
        setRunning(true);
      }
    },
    startLabel
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: "lesson-text-button lesson-text-button--muted",
      onClick: () => {
        setRunning(false);
        setSeconds(total);
      }
    },
    resetLabel
  )));
}
function QuizList({ questions }) {
  const [answers, setAnswers] = useState({});
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-quiz" }, questions.map((question) => {
    const selected = answers[question.id];
    const selectedOption = question.options.find((option) => option.id === selected);
    return /* @__PURE__ */ React.createElement("article", { key: question.id, className: "lesson-question" }, /* @__PURE__ */ React.createElement("h4", null, question.prompt), /* @__PURE__ */ React.createElement("div", { className: "lesson-option-list" }, question.options.map((option) => /* @__PURE__ */ React.createElement(
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
    ))), selectedOption ? /* @__PURE__ */ React.createElement("p", { className: "lesson-feedback" }, selectedOption.feedback) : null);
  }));
}
function SelfCheckList({ items }) {
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-self-check" }, /* @__PURE__ */ React.createElement("h4", null, "Autovalutazione"), /* @__PURE__ */ React.createElement("div", { className: "lesson-self-check__rows" }, items.map((item) => /* @__PURE__ */ React.createElement("article", { key: item, className: "lesson-self-check__row" }, /* @__PURE__ */ React.createElement("p", null, item), /* @__PURE__ */ React.createElement("div", { className: "lesson-self-check__scale", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("span", null, "non ancora"), /* @__PURE__ */ React.createElement("span", null, "quasi"), /* @__PURE__ */ React.createElement("span", null, "si"))))));
}
function LessonBottomBar({ mapHref, previousHref, homeHref }) {
  return /* @__PURE__ */ React.createElement("nav", { className: "lesson-bottom-bar", "aria-label": "Navigazione finale" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell lesson-bottom-bar__track" }, /* @__PURE__ */ React.createElement("a", { href: mapHref, className: "lesson-bottom-bar__item" }, "Torna alla mappa"), previousHref ? /* @__PURE__ */ React.createElement("a", { href: previousHref, className: "lesson-bottom-bar__item" }, "Argomento precedente") : /* @__PURE__ */ React.createElement("span", { className: "lesson-bottom-bar__item lesson-bottom-bar__item--disabled", "aria-disabled": "true" }, "Argomento precedente"), /* @__PURE__ */ React.createElement("a", { href: homeHref, className: "lesson-bottom-bar__item" }, "Home")));
}

// components/RitmoPulsazioneTempoLesson.jsx
var lesson = {
  nucleus: "Origini del suono",
  model: {
    id: "laboratoriale",
    label: "Lezione laboratoriale",
    theoryShare: 30,
    practiceShare: 70
  },
  title: "Ritmo, pulsazione e tempo",
  question: "Che differenza c'e tra ritmo, pulsazione e tempo?",
  subtitle: "Prima trovi un battito comune. Poi capisci che il ritmo puo cambiare, mentre la pulsazione resta sotto e il tempo ne decide la velocita.",
  heroWord: "ritmo",
  heroPrelude: "Sotto il gruppo c'e un battito",
  heroEcho: "che ritorna uguale",
  heroTags: ["pulsazione", "accento", "metro", "tempo"],
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Ritmo, pulsazione e tempo" }
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: null,
    homeHref: "../../../../index.html"
  },
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
    cardTitle: "",
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
      text: "E il battito regolare che fa da riferimento al gruppo.",
      example: "TA TA TA TA"
    },
    {
      term: "Ritmo",
      text: "E il disegno di suoni e pause che si appoggia alla pulsazione.",
      example: "TA - TA TA"
    },
    {
      term: "Tempo",
      text: "E la velocita con cui ritorna la pulsazione.",
      example: "LENTO / MEDIO / VELOCE"
    },
    {
      term: "Accento",
      text: "E il punto che senti piu forte o piu evidente.",
      example: "> ta ta"
    },
    {
      term: "Metro",
      text: "E il modo regolare con cui gli accenti si organizzano in gruppi.",
      example: "2 / 3 / 4"
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
  followupTitle: "Dopo la prova, porta il battito verso una forma condivisa",
  followupIntro: "Qui il centro resta pratico: prima fissi il gesto, poi lo trasformi in produzione di gruppo, confronto e verifica rapida.",
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
      bridge: "Nella prossima lezione userai corpo, voce e pausa per trasformare quel battito in una frase sonora leggibile dal gruppo."
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
function getMeterTone(groupSize) {
  if (groupSize === 2) {
    return { "--meter-bg": "#f0efe9", "--meter-accent": "#171717", "--meter-soft": "#e1dfd6" };
  }
  if (groupSize === 3) {
    return { "--meter-bg": "#ebe9e1", "--meter-accent": "#2b2a27", "--meter-soft": "#ddd9cf" };
  }
  return { "--meter-bg": "#f3f3f0", "--meter-accent": "#3a3b35", "--meter-soft": "#e5e5df" };
}
function OpeningSection() {
  return /* @__PURE__ */ React2.createElement(LessonSection, { id: "apertura", title: lesson.opening.title, intro: lesson.opening.intro }, /* @__PURE__ */ React2.createElement(Panel, { title: lesson.opening.cardTitle }, /* @__PURE__ */ React2.createElement(
    ActivityLayout,
    {
      steps: lesson.opening.steps,
      observe: lesson.opening.observe,
      result: lesson.opening.result,
      right: /* @__PURE__ */ React2.createElement(SimpleTimer, { total: 30, startLabel: "Avvia 30 secondi" })
    }
  )));
}
function ListeningGrid() {
  return /* @__PURE__ */ React2.createElement("div", { className: "lesson-card-grid lesson-card-grid--three" }, lesson.listeningSamples.map((sample) => /* @__PURE__ */ React2.createElement("article", { key: sample.id, className: "lesson-meter-card" }, /* @__PURE__ */ React2.createElement("p", { className: "lesson-mini-title" }, sample.focus), /* @__PURE__ */ React2.createElement("strong", null, sample.title), /* @__PURE__ */ React2.createElement("p", { className: "lesson-body-text" }, sample.description), /* @__PURE__ */ React2.createElement("div", { className: "lesson-meter-preview" }, buildGroupSequence(sample.expectedGroup).map((beat, index) => /* @__PURE__ */ React2.createElement(
    "span",
    {
      key: `${sample.id}-${index}`,
      className: cn("lesson-meter-preview__beat", beat === 1 && "is-accent"),
      style: getMeterTone(sample.expectedGroup)
    },
    beat
  ))), /* @__PURE__ */ React2.createElement("p", { className: "lesson-meter-card__action" }, sample.action))));
}
function ExplorationSection() {
  return /* @__PURE__ */ React2.createElement(LessonSection, { id: "esplorazione", title: lesson.exploration.title, intro: lesson.exploration.intro, tone: "soft" }, /* @__PURE__ */ React2.createElement("div", { className: "lesson-stack" }, lesson.exploration.paragraphs.map((paragraph) => /* @__PURE__ */ React2.createElement("p", { key: paragraph, className: "lesson-body-text" }, paragraph))), /* @__PURE__ */ React2.createElement(ListeningGrid, null), /* @__PURE__ */ React2.createElement(Panel, { title: "Osserva" }, /* @__PURE__ */ React2.createElement(PromptList, { items: lesson.exploration.questions })));
}
function PulseBoard() {
  const reducedMotion = usePrefersReducedMotion();
  const [mode, setMode] = useState2(lesson.pulseModes[1]);
  const [activeBeat, setActiveBeat] = useState2(0);
  useEffect2(() => {
    if (reducedMotion) {
      setActiveBeat(0);
      return void 0;
    }
    const interval = window.setInterval(() => {
      setActiveBeat((value) => (value + 1) % 4);
    }, 60 / mode.bpm * 1e3);
    return () => window.clearInterval(interval);
  }, [mode, reducedMotion]);
  return /* @__PURE__ */ React2.createElement("div", { className: "lesson-pulse-stage" }, /* @__PURE__ */ React2.createElement("div", { className: "lesson-choice-row" }, lesson.pulseModes.map((item) => /* @__PURE__ */ React2.createElement(
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
  ))), /* @__PURE__ */ React2.createElement("div", { className: "lesson-pulse-beats" }, Array.from({ length: 4 }).map((_, index) => /* @__PURE__ */ React2.createElement("div", { key: index, className: cn("lesson-pulse-beat", activeBeat === index && "is-live") }, /* @__PURE__ */ React2.createElement("span", { className: "lesson-pulse-beat__number" }, index + 1), /* @__PURE__ */ React2.createElement("small", null, index === 0 ? "riparte" : "continua")))));
}
function RhythmSequencerBoard() {
  const [selectedState, setSelectedState] = useState2(lesson.sequenceStates[0].id);
  const [sequence, setSequence] = useState2(Array.from({ length: 8 }, () => "sound"));
  return /* @__PURE__ */ React2.createElement("div", { className: "lesson-sequence" }, /* @__PURE__ */ React2.createElement("div", { className: "lesson-choice-row" }, lesson.sequenceStates.map((item) => /* @__PURE__ */ React2.createElement(
    "button",
    {
      key: item.id,
      type: "button",
      className: cn("lesson-choice", item.id === selectedState && "is-active"),
      onClick: () => setSelectedState(item.id)
    },
    item.label
  ))), /* @__PURE__ */ React2.createElement("div", { className: "lesson-sequence__board", "aria-label": "Sequenza ritmica di otto tempi" }, sequence.map((state, index) => {
    const item = lesson.sequenceStates.find((entry) => entry.id === state) || lesson.sequenceStates[0];
    return /* @__PURE__ */ React2.createElement(
      "button",
      {
        key: `${state}-${index}`,
        type: "button",
        "aria-label": `Tempo ${index + 1}: ${item.label}`,
        className: cn("lesson-sequence__cell", state === "pause" && "is-pause", state === "accent" && "is-accent"),
        onClick: () => setSequence((current) => {
          const next = [...current];
          next[index] = selectedState;
          return next;
        })
      },
      /* @__PURE__ */ React2.createElement("strong", null, item.symbol),
      /* @__PURE__ */ React2.createElement("small", null, item.label.slice(0, 2).toUpperCase())
    );
  })), /* @__PURE__ */ React2.createElement("div", { className: "lesson-choice-row" }, /* @__PURE__ */ React2.createElement("button", { type: "button", className: "lesson-button lesson-button--ghost", onClick: () => setSequence([...lesson.sequencePresets.simple]) }, "Regolare"), /* @__PURE__ */ React2.createElement("button", { type: "button", className: "lesson-button lesson-button--ghost", onClick: () => setSequence([...lesson.sequencePresets.pauses]) }, "Con pause"), /* @__PURE__ */ React2.createElement("button", { type: "button", className: "lesson-button lesson-button--ghost", onClick: () => setSequence([...lesson.sequencePresets.accents]) }, "Con accenti")), /* @__PURE__ */ React2.createElement("p", { className: "lesson-note" }, "\u25CF = suono \xB7 \u25CB = pausa \xB7 \u25C9 = accento"));
}
function ConceptBoard() {
  return /* @__PURE__ */ React2.createElement("div", { className: "lesson-term-list" }, lesson.conceptRows.map((item) => /* @__PURE__ */ React2.createElement("div", { key: item.term, className: "lesson-term-list__row" }, /* @__PURE__ */ React2.createElement("strong", null, item.term), /* @__PURE__ */ React2.createElement("div", { className: "lesson-term-list__content" }, /* @__PURE__ */ React2.createElement("p", null, item.text), /* @__PURE__ */ React2.createElement("div", { className: "lesson-term-list__example" }, item.example)))));
}
function ActiveSection() {
  return /* @__PURE__ */ React2.createElement(LessonSection, { id: "comprensione-attiva", title: lesson.active.title, intro: lesson.active.intro }, /* @__PURE__ */ React2.createElement(Panel, { title: lesson.active.cardTitle, meta: lesson.active.meta }, /* @__PURE__ */ React2.createElement(
    ActivityLayout,
    {
      steps: lesson.active.steps,
      observe: lesson.active.observe,
      result: lesson.active.result,
      right: /* @__PURE__ */ React2.createElement(PulseBoard, null)
    }
  )), /* @__PURE__ */ React2.createElement("div", { className: "lesson-card-grid lesson-card-grid--two" }, /* @__PURE__ */ React2.createElement(Panel, { title: "Pratica" }, /* @__PURE__ */ React2.createElement(RhythmSequencerBoard, null)), /* @__PURE__ */ React2.createElement(Panel, { title: "Mappa rapida" }, /* @__PURE__ */ React2.createElement(ConceptBoard, null))), /* @__PURE__ */ React2.createElement(Panel, { title: "Ascolto interno" }, /* @__PURE__ */ React2.createElement(PromptList, { items: lesson.exploration.questions })));
}
function FollowupSection({ selected, onSelect }) {
  const phase = lesson.followups[selected];
  const tabs = Object.entries(lesson.followups).map(([id, item]) => ({ id, label: item.label }));
  return /* @__PURE__ */ React2.createElement(
    LessonSection,
    {
      id: "rielaborazione",
      label: lesson.followupLabel || "Continua",
      title: lesson.followupTitle || "Scegli la fase che ti serve adesso",
      intro: lesson.followupIntro || "La parte attiva resta al centro. Le altre fasi restano leggere e sempre raggiungibili.",
      tone: "soft"
    },
    /* @__PURE__ */ React2.createElement("div", { className: "lesson-followup" }, /* @__PURE__ */ React2.createElement(PhaseTabs, { items: tabs, selected, onSelect, ariaLabel: "Fasi successive della lezione" }), /* @__PURE__ */ React2.createElement("div", { className: "lesson-followup__panel" }, selected === "chiusura" ? /* @__PURE__ */ React2.createElement("div", { className: "lesson-closing" }, /* @__PURE__ */ React2.createElement("p", { className: "lesson-closing__line" }, phase.line), /* @__PURE__ */ React2.createElement("p", { className: "lesson-closing__bridge" }, phase.bridge)) : selected === "valutazione" ? /* @__PURE__ */ React2.createElement(Panel, { kicker: phase.label, title: phase.title, meta: phase.meta }, /* @__PURE__ */ React2.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React2.createElement(QuizList, { questions: phase.quiz }), /* @__PURE__ */ React2.createElement(SelfCheckList, { items: phase.selfCheck }))) : /* @__PURE__ */ React2.createElement(Panel, { kicker: phase.label, title: phase.title, meta: phase.meta }, /* @__PURE__ */ React2.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React2.createElement(StepList, { title: "Fai cosi", items: phase.steps }), /* @__PURE__ */ React2.createElement("div", { className: "lesson-stack" }, /* @__PURE__ */ React2.createElement(PromptList, { title: "Osserva", items: phase.observe }), /* @__PURE__ */ React2.createElement(ResultCallout, { text: phase.result }))))))
  );
}
function RitmoPulsazioneTempoLesson() {
  const activeId = useActiveSection(["apertura", "esplorazione", "comprensione-attiva", "rielaborazione"]);
  const [selectedFollowup, setSelectedFollowup] = useState2(lesson.followupDefault);
  return /* @__PURE__ */ React2.createElement("div", { className: "lesson-editorial-page", "data-lesson-model": lesson.model.id, "data-lesson-id": "ritmo-pulsazione-tempo" }, /* @__PURE__ */ React2.createElement(
    LessonHero,
    {
      title: lesson.title,
      question: null,
      subtitle: lesson.subtitle,
      heroNote: lesson.heroNote,
      breadcrumbs: lesson.breadcrumbs,
      heroWord: lesson.heroWord,
      heroPrelude: lesson.heroPrelude,
      heroEcho: lesson.heroEcho,
      heroTags: lesson.heroTags
    }
  ), /* @__PURE__ */ React2.createElement(MetaStrip, { items: lesson.opening.meta }), /* @__PURE__ */ React2.createElement(
    LessonProgress,
    {
      items: lesson.progress,
      activeId,
      selectedFollowup,
      onSelectFollowup: setSelectedFollowup
    }
  ), /* @__PURE__ */ React2.createElement(OpeningSection, null), /* @__PURE__ */ React2.createElement(ExplorationSection, null), /* @__PURE__ */ React2.createElement(ActiveSection, null), /* @__PURE__ */ React2.createElement(FollowupSection, { selected: selectedFollowup, onSelect: setSelectedFollowup }), /* @__PURE__ */ React2.createElement(
    LessonBottomBar,
    {
      mapHref: lesson.navigation.mapHref,
      previousHref: lesson.navigation.previousHref,
      homeHref: lesson.navigation.homeHref
    }
  ));
}
export {
  RitmoPulsazioneTempoLesson as default
};
