// components/RitoMagiaComunitaLesson.jsx
import React3 from "https://esm.sh/react@18";

// components/OriginiTopicLessonTemplate.module.js
import React2, { useState as useState2 } from "https://esm.sh/react@18";

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
  return /* @__PURE__ */ React.createElement("header", { className: "lesson-hero" }, /* @__PURE__ */ React.createElement(LessonBreadcrumb, { items: breadcrumbs }), /* @__PURE__ */ React.createElement("div", { className: "lesson-shell lesson-hero__copy" }, /* @__PURE__ */ React.createElement("h1", { className: "lesson-hero__title" }, title), /* @__PURE__ */ React.createElement("p", { className: "lesson-hero__question" }, question)));
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

// components/OriginiTopicLessonTemplate.module.js
var DEFAULT_PROGRESS = [
  { id: "apertura", label: "Apertura", type: "anchor" },
  { id: "esplorazione", label: "Esplorazione", type: "anchor" },
  { id: "comprensione-attiva", label: "Comprensione attiva", type: "anchor" },
  { id: "rielaborazione", label: "Rielaborazione", type: "followup" },
  { id: "produzione", label: "Produzione", type: "followup" },
  { id: "condivisione", label: "Condivisione", type: "followup" },
  { id: "valutazione", label: "Valutazione", type: "followup" },
  { id: "chiusura", label: "Chiusura", type: "followup" }
];
function KeyCardGrid({ items, columns = 3 }) {
  const gridClass = columns === 2 ? "lesson-card-grid--two" : columns === 4 ? "lesson-card-grid--four" : "lesson-card-grid--three";
  return /* @__PURE__ */ React2.createElement("div", { className: cn("lesson-card-grid", gridClass) }, items.map((item) => /* @__PURE__ */ React2.createElement("article", { key: item.title, className: "lesson-key-card" }, item.label ? /* @__PURE__ */ React2.createElement("p", { className: "lesson-mini-title" }, item.label) : null, /* @__PURE__ */ React2.createElement("strong", null, item.title), item.caption ? /* @__PURE__ */ React2.createElement("p", { className: "lesson-body-text" }, item.caption) : null, item.chips?.length ? /* @__PURE__ */ React2.createElement("div", { className: "lesson-chip-row" }, item.chips.map((chip) => /* @__PURE__ */ React2.createElement("span", { key: `${item.title}-${chip}`, className: "lesson-chip" }, chip))) : null, item.example ? /* @__PURE__ */ React2.createElement("p", { className: "lesson-note" }, item.example) : null)));
}
function TermBoard({ items }) {
  return /* @__PURE__ */ React2.createElement("div", { className: "lesson-term-list" }, items.map((item) => /* @__PURE__ */ React2.createElement("div", { key: item.term, className: "lesson-term-list__row" }, /* @__PURE__ */ React2.createElement("strong", null, item.term), /* @__PURE__ */ React2.createElement("div", { className: "lesson-term-list__content" }, /* @__PURE__ */ React2.createElement("p", null, item.text), item.example ? /* @__PURE__ */ React2.createElement("div", { className: "lesson-term-list__example" }, item.example) : null))));
}
function FlowBoard({ items, ariaLabel }) {
  return /* @__PURE__ */ React2.createElement("div", { className: "lesson-flow-card", "aria-label": ariaLabel }, /* @__PURE__ */ React2.createElement("div", { className: "lesson-flow-card__steps" }, items.map((item, index) => /* @__PURE__ */ React2.createElement(React2.Fragment, { key: item }, /* @__PURE__ */ React2.createElement("div", { className: "lesson-flow-card__node" }, item), index < items.length - 1 ? /* @__PURE__ */ React2.createElement("span", { className: "lesson-flow-card__arrow" }, "\u2192") : null))));
}
function EvidenceStrip({ items }) {
  return /* @__PURE__ */ React2.createElement("div", { className: "lesson-evidence-strip" }, items.map((item) => /* @__PURE__ */ React2.createElement("article", { key: item.title, className: "lesson-evidence" }, item.image ? /* @__PURE__ */ React2.createElement("div", { className: "lesson-evidence__media" }, /* @__PURE__ */ React2.createElement("img", { src: item.image.src, alt: item.image.alt })) : null, /* @__PURE__ */ React2.createElement("div", { className: "lesson-evidence__copy" }, item.label ? /* @__PURE__ */ React2.createElement("p", { className: "lesson-mini-title" }, item.label) : null, /* @__PURE__ */ React2.createElement("strong", null, item.title), /* @__PURE__ */ React2.createElement("p", null, item.body)))));
}
function VisualSpec({ spec, fallbackTotal = 30 }) {
  if (!spec || spec.type === "timer") {
    return /* @__PURE__ */ React2.createElement(
      SimpleTimer,
      {
        total: spec?.total || fallbackTotal,
        startLabel: spec?.startLabel || `Avvia ${spec?.total || fallbackTotal} secondi`
      }
    );
  }
  if (spec.type === "flow") {
    return /* @__PURE__ */ React2.createElement(FlowBoard, { items: spec.items, ariaLabel: spec.ariaLabel || "Schema di lavoro" });
  }
  if (spec.type === "terms") {
    return /* @__PURE__ */ React2.createElement(TermBoard, { items: spec.items });
  }
  if (spec.type === "cards") {
    return /* @__PURE__ */ React2.createElement(KeyCardGrid, { items: spec.items, columns: spec.columns || 2 });
  }
  return null;
}
function PanelContent({ panel }) {
  if (panel.kind === "cards") {
    return /* @__PURE__ */ React2.createElement(KeyCardGrid, { items: panel.items, columns: panel.columns || 2 });
  }
  if (panel.kind === "terms") {
    return /* @__PURE__ */ React2.createElement(TermBoard, { items: panel.items });
  }
  if (panel.kind === "prompts") {
    return /* @__PURE__ */ React2.createElement(PromptList, { items: panel.items });
  }
  if (panel.kind === "text") {
    return /* @__PURE__ */ React2.createElement("div", { className: "lesson-stack" }, panel.paragraphs.map((paragraph) => /* @__PURE__ */ React2.createElement("p", { key: paragraph, className: "lesson-body-text" }, paragraph)));
  }
  return null;
}
function OpeningSection({ lesson: lesson2 }) {
  return /* @__PURE__ */ React2.createElement(LessonSection, { id: "apertura", title: lesson2.opening.title, intro: lesson2.opening.intro }, /* @__PURE__ */ React2.createElement(Panel, { title: lesson2.opening.cardTitle, meta: lesson2.opening.meta }, /* @__PURE__ */ React2.createElement(
    ActivityLayout,
    {
      steps: lesson2.opening.steps,
      observe: lesson2.opening.observe,
      result: lesson2.opening.result,
      right: /* @__PURE__ */ React2.createElement(VisualSpec, { spec: lesson2.opening.side, fallbackTotal: lesson2.opening.timerTotal || 30 })
    }
  )));
}
function ExplorationSection({ lesson: lesson2 }) {
  const exploration = lesson2.exploration;
  return /* @__PURE__ */ React2.createElement(LessonSection, { id: "esplorazione", title: exploration.title, intro: exploration.intro, tone: "soft" }, exploration.cards?.length ? /* @__PURE__ */ React2.createElement(KeyCardGrid, { items: exploration.cards, columns: exploration.cardsColumns || 3 }) : null, /* @__PURE__ */ React2.createElement("div", { className: cn("lesson-grid", exploration.flow?.length && "lesson-grid--two") }, /* @__PURE__ */ React2.createElement("div", { className: "lesson-stack" }, exploration.paragraphs.map((paragraph) => /* @__PURE__ */ React2.createElement("p", { key: paragraph, className: "lesson-body-text" }, paragraph)), exploration.questions?.length ? /* @__PURE__ */ React2.createElement(PromptList, { title: "Osserva", items: exploration.questions }) : null), exploration.flow?.length ? /* @__PURE__ */ React2.createElement(FlowBoard, { items: exploration.flow, ariaLabel: exploration.flowLabel || "Passaggi principali dell'argomento" }) : null), exploration.evidence?.length ? /* @__PURE__ */ React2.createElement(EvidenceStrip, { items: exploration.evidence }) : null, exploration.panels?.length ? /* @__PURE__ */ React2.createElement("div", { className: cn("lesson-card-grid", exploration.panels.length === 2 ? "lesson-card-grid--two" : "lesson-card-grid--three") }, exploration.panels.map((panel) => /* @__PURE__ */ React2.createElement(Panel, { key: panel.title, title: panel.title }, /* @__PURE__ */ React2.createElement(PanelContent, { panel })))) : null);
}
function ActiveSection({ lesson: lesson2 }) {
  const active = lesson2.active;
  const hasPanels = active.panels?.length;
  const panelClass = active.panels?.length === 2 ? "lesson-card-grid--two" : active.panels?.length === 4 ? "lesson-card-grid--four" : "lesson-card-grid--three";
  return /* @__PURE__ */ React2.createElement(LessonSection, { id: "comprensione-attiva", title: active.title, intro: active.intro }, /* @__PURE__ */ React2.createElement(Panel, { title: active.cardTitle, meta: active.meta }, /* @__PURE__ */ React2.createElement(
    ActivityLayout,
    {
      steps: active.steps,
      observe: active.observe,
      result: active.result,
      right: /* @__PURE__ */ React2.createElement(VisualSpec, { spec: active.side, fallbackTotal: active.timerTotal || 45 })
    }
  )), hasPanels ? /* @__PURE__ */ React2.createElement("div", { className: cn("lesson-card-grid", panelClass) }, active.panels.map((panel) => /* @__PURE__ */ React2.createElement(Panel, { key: panel.title, title: panel.title }, /* @__PURE__ */ React2.createElement(PanelContent, { panel })))) : null, active.prompts?.length ? /* @__PURE__ */ React2.createElement(Panel, { title: active.promptsTitle || "Ascolto interno" }, /* @__PURE__ */ React2.createElement(PromptList, { items: active.prompts })) : null);
}
function FollowupSection({ lesson: lesson2, selected, onSelect }) {
  const phase = lesson2.followups[selected];
  const tabs = Object.entries(lesson2.followups).map(([id, item]) => ({ id, label: item.label }));
  return /* @__PURE__ */ React2.createElement(
    LessonSection,
    {
      id: "rielaborazione",
      label: lesson2.followupLabel || "Continua",
      title: lesson2.followupTitle || "Scegli la fase che ti serve adesso",
      intro: lesson2.followupIntro || "La parte attiva resta al centro. Le altre fasi restano leggere e sempre raggiungibili.",
      tone: "soft"
    },
    /* @__PURE__ */ React2.createElement("div", { className: "lesson-followup" }, /* @__PURE__ */ React2.createElement(PhaseTabs, { items: tabs, selected, onSelect, ariaLabel: "Fasi successive della lezione" }), /* @__PURE__ */ React2.createElement("div", { className: "lesson-followup__panel" }, selected === "chiusura" ? /* @__PURE__ */ React2.createElement("div", { className: "lesson-closing" }, /* @__PURE__ */ React2.createElement("p", { className: "lesson-closing__line" }, phase.line), /* @__PURE__ */ React2.createElement("p", { className: "lesson-closing__bridge" }, phase.bridge)) : selected === "valutazione" ? /* @__PURE__ */ React2.createElement(Panel, { kicker: phase.label, title: phase.title, meta: phase.meta }, /* @__PURE__ */ React2.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React2.createElement(QuizList, { questions: phase.quiz }), /* @__PURE__ */ React2.createElement(SelfCheckList, { items: phase.selfCheck }))) : /* @__PURE__ */ React2.createElement(Panel, { kicker: phase.label, title: phase.title, meta: phase.meta }, /* @__PURE__ */ React2.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React2.createElement(StepList, { title: "Fai cosi", items: phase.steps }), /* @__PURE__ */ React2.createElement("div", { className: "lesson-stack" }, /* @__PURE__ */ React2.createElement(PromptList, { title: "Osserva", items: phase.observe }), /* @__PURE__ */ React2.createElement(ResultCallout, { text: phase.result }))))))
  );
}
function OriginiTopicLesson({ lesson: lesson2 }) {
  const activeId = useActiveSection(["apertura", "esplorazione", "comprensione-attiva", "rielaborazione"]);
  const [selectedFollowup, setSelectedFollowup] = useState2(lesson2.followupDefault || "produzione");
  return /* @__PURE__ */ React2.createElement("div", { className: "lesson-editorial-page" }, /* @__PURE__ */ React2.createElement(
    LessonHero,
    {
      title: lesson2.title,
      question: lesson2.question,
      subtitle: lesson2.subtitle,
      heroNote: lesson2.heroNote,
      breadcrumbs: lesson2.breadcrumbs,
      heroWord: lesson2.heroWord,
      heroPrelude: lesson2.heroPrelude,
      heroEcho: lesson2.heroEcho,
      heroTags: lesson2.heroTags
    }
  ), /* @__PURE__ */ React2.createElement(MetaStrip, { items: lesson2.meta || lesson2.opening.meta }), /* @__PURE__ */ React2.createElement(
    LessonProgress,
    {
      items: lesson2.progress || DEFAULT_PROGRESS,
      activeId,
      selectedFollowup,
      onSelectFollowup: setSelectedFollowup
    }
  ), /* @__PURE__ */ React2.createElement(OpeningSection, { lesson: lesson2 }), /* @__PURE__ */ React2.createElement(ExplorationSection, { lesson: lesson2 }), /* @__PURE__ */ React2.createElement(ActiveSection, { lesson: lesson2 }), /* @__PURE__ */ React2.createElement(FollowupSection, { lesson: lesson2, selected: selectedFollowup, onSelect: setSelectedFollowup }), /* @__PURE__ */ React2.createElement(
    LessonBottomBar,
    {
      mapHref: lesson2.navigation.mapHref,
      previousHref: lesson2.navigation.previousHref,
      homeHref: lesson2.navigation.homeHref
    }
  ));
}

// components/RitoMagiaComunitaLesson.jsx
var lesson = {
  title: "Rito, magia e comunita",
  question: "Che cosa rende rituale una pratica sonora?",
  subtitle: "Quando un suono ritorna come formula condivisa, il gruppo non ascolta soltanto: entra in un gesto comune, riconosce un passaggio e si sente parte di una stessa appartenenza.",
  heroWord: "rito",
  heroPrelude: "Non basta fare festa",
  heroEcho: "serve una forma che il gruppo riconosce insieme",
  heroTags: ["ripetizione", "formula", "coralita", "passaggio"],
  heroNote: "Nelle fonti scolastiche sulle culture antiche la musica appare spesso vicina a invocazione, cerimonia, danza e identita collettiva.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Rito, magia e comunita" }
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: "../musica-comunicazione-funzioni-sociali/index.html",
    homeHref: "../../../../index.html"
  },
  meta: [
    { label: "Durata", value: "2 ore" },
    { label: "Ti serve", value: "voce, corpo, spazio, scheda" },
    { label: "Obiettivo", value: "distinguere rito, festa, richiamo e appartenenza collettiva" }
  ],
  opening: {
    title: "Riconosci una formula condivisa",
    intro: "Un gesto ripetuto con la stessa voce e la stessa entrata cambia subito clima: il gruppo sente che non si tratta solo di un suono qualsiasi.",
    cardTitle: "Prova la ripetizione",
    meta: [
      { label: "Durata", value: "30 secondi" },
      { label: "Ti serve", value: "voce o mani" },
      { label: "Alla fine", value: "riconosci l'effetto di una formula rituale" }
    ],
    steps: [
      "Ascolta una formula breve ripetuta sempre uguale.",
      "Ripetila tutti insieme due o tre volte senza accelerare.",
      "Aggiungi una pausa comune prima dell'ultima ripetizione."
    ],
    observe: [
      "Che cosa cambia quando tutti entrano insieme?",
      "La ripetizione ti fa sentire un gesto piu solenne o piu quotidiano?",
      "La pausa aumenta attesa, attenzione o intensita?"
    ],
    result: "Capisci che la forma ripetuta puo dare al suono un valore collettivo e simbolico.",
    side: {
      type: "flow",
      items: ["ripeti", "entri", "riconosci", "condividi"],
      ariaLabel: "Passaggi di una formula rituale"
    }
  },
  exploration: {
    title: "Il suono come collante simbolico",
    intro: "Le sintesi storiche consultate ricordano che per molti popoli antichi la musica aveva un carattere sacro o magico e accompagnava momenti in cui la comunita si raccoglieva.",
    cards: [
      {
        title: "Invocazione",
        caption: "La voce o il gesto sonoro possono servire a chiamare, pregare, chiedere protezione, dare forma a una presenza condivisa.",
        chips: ["voce", "formula", "attesa"]
      },
      {
        title: "Passaggio",
        caption: "Nascita, guarigione, morte, inizio o fine di un'azione diventano piu leggibili quando il gruppo li accompagna con una sequenza sonora riconoscibile.",
        chips: ["inizio", "fine", "soglia"]
      },
      {
        title: "Appartenenza",
        caption: "Cantare o battere insieme non comunica solo un ordine pratico: dice anche chi siamo e a quale gruppo sentiamo di appartenere.",
        chips: ["gruppo", "identita", "memoria"]
      }
    ],
    paragraphs: [
      "Nelle fonti scolastiche sulla musica antica ricorre un'idea forte: il suono non e solo intrattenimento, ma una presenza vicina al sacro, alla cerimonia e ai momenti intensi della vita del gruppo.",
      "Per questo conviene distinguere il rituale dalla semplice festa. In una pratica rituale contano di piu la ripetizione, la formula, il ruolo del gruppo, la memoria condivisa e il legame con un passaggio riconosciuto."
    ],
    questions: [
      "Quale indizio ti fa pensare che un suono sia rituale?",
      "Che differenza c'e tra ripetere per giocare e ripetere per dare forma a un momento collettivo?",
      "Dove senti piu forte il legame tra suono e appartenenza?"
    ],
    panels: [
      {
        title: "Indicatori del rituale",
        kind: "cards",
        columns: 2,
        items: [
          { title: "Formula stabile", caption: "Parole, colpi o accenti tornano uguali.", chips: ["ritorno", "memoria"] },
          { title: "Entrata comune", caption: "Il gruppo parte insieme e si riconosce subito.", chips: ["coralita", "sincronia"] },
          { title: "Contesto marcato", caption: "Il suono accompagna una soglia o una cerimonia.", chips: ["passaggio", "solennita"] },
          { title: "Valore simbolico", caption: "Il gesto non serve solo a fare, ma anche a significare.", chips: ["credenza", "identita"] }
        ]
      },
      {
        title: "Da non confondere",
        kind: "text",
        paragraphs: [
          "Non tutto cio che e collettivo e rituale. Una marcia puo coordinare, una festa puo celebrare, ma una pratica diventa rituale quando la comunita vi riconosce un valore simbolico stabile."
        ]
      }
    ]
  },
  active: {
    title: "Confronta rito, festa e segnale",
    intro: "Prendi situazioni diverse e prova a capire che cosa cambia: quando il suono organizza, quando celebra, quando rende un passaggio simbolicamente condiviso.",
    cardTitle: "Leggi la funzione del suono",
    meta: [
      { label: "Durata", value: "15 minuti" },
      { label: "Ti serve", value: "scheda, esempi, parole chiave" },
      { label: "Alla fine", value: "una distinzione piu precisa tra usi del suono" }
    ],
    steps: [
      "Scegli tre situazioni: richiamo, festa, cerimonia di passaggio.",
      "Scrivi quale elemento si ripete e chi partecipa al gesto.",
      "Spiega se il suono serve soprattutto a coordinare, celebrare o ritualizzare.",
      "Controlla che ogni scelta sia sostenuta da un indizio concreto."
    ],
    observe: [
      "Il gruppo entra tutto insieme o ascolta da fuori?",
      "La ripetizione serve a tenere il tempo o a rafforzare il significato?",
      "Il contesto rende quel suono un segnale, una festa o un rito?"
    ],
    result: "Riesci a dire perche alcune pratiche sonore hanno un valore rituale piu forte di altre.",
    side: {
      type: "terms",
      items: [
        { term: "Rituale", text: "Pratica sonora legata a un passaggio o a un valore simbolico condiviso.", example: "formula / cerimonia" },
        { term: "Formula", text: "Sequenza breve e riconoscibile che ritorna senza cambiare troppo.", example: "voce / colpi / risposta" },
        { term: "Coralita", text: "Il gruppo partecipa come un corpo comune.", example: "insieme / entrata" }
      ]
    },
    panels: [
      {
        title: "Mappa rapida",
        kind: "terms",
        items: [
          { term: "Ripetizione", text: "Rafforza memoria e riconoscibilita del gesto.", example: "ritorno" },
          { term: "Passaggio", text: "Segna un prima e un dopo per il gruppo.", example: "soglia" },
          { term: "Appartenenza", text: "Fa sentire chi partecipa e chi riconosce il gesto.", example: "noi" },
          { term: "Valore simbolico", text: "Il suono significa piu della sua semplice funzione pratica.", example: "credenza" }
        ]
      },
      {
        title: "Situazioni da separare",
        kind: "cards",
        columns: 2,
        items: [
          { title: "Richiamo rapido", caption: "Serve a farsi capire subito dal gruppo.", chips: ["segnale", "azione"] },
          { title: "Danza festiva", caption: "Serve a creare partecipazione e piacere condiviso.", chips: ["festa", "clima"] },
          { title: "Cerimonia", caption: "Serve a rendere visibile un passaggio comune.", chips: ["rito", "soglia"] },
          { title: "Invocazione corale", caption: "Serve a dare forma a una credenza o a una richiesta condivisa.", chips: ["voce", "formula"] }
        ]
      }
    ],
    prompts: [
      "Quale elemento ti fa parlare di rito e non solo di festa?",
      "Che ruolo ha la ripetizione nel creare appartenenza?",
      "Perche il contesto conta quanto il suono stesso?"
    ]
  },
  followupDefault: "produzione",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Stringi la distinzione",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "la scheda gia avviata" },
        { label: "Alla fine", value: "usi parole piu precise" }
      ],
      steps: [
        "Sostituisci una descrizione generica con un verbo piu chiaro.",
        "Sottolinea dove hai scritto il valore simbolico del gesto.",
        "Cancella un esempio che funziona solo come festa ma non come rito."
      ],
      observe: [
        "Il lettore distingue subito rito, festa e segnale?",
        "Ogni situazione ha un indizio concreto a sostegno?"
      ],
      result: "La tua analisi diventa piu leggibile e meno generica."
    },
    produzione: {
      label: "Produzione",
      title: "Prepara una scheda sulle funzioni rituali",
      meta: [
        { label: "Durata", value: "10 minuti" },
        { label: "Ti serve", value: "cartellone o slide" },
        { label: "Alla fine", value: "una scheda pronta da mostrare" }
      ],
      steps: [
        "Scegli tre parole chiave: formula, gruppo, passaggio.",
        "Associa a ciascuna un esempio chiaro e breve.",
        "Chiudi con una frase che spieghi perche il rito non coincide con il semplice intrattenimento."
      ],
      observe: [
        "La scheda fa capire il ruolo del gruppo?",
        "Il lettore percepisce il valore simbolico del suono?"
      ],
      result: "La tua sintesi mostra il suono come pratica che costruisce comunita."
    },
    condivisione: {
      label: "Condivisione",
      title: "Confronta due letture del rituale",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "due schede di gruppo" },
        { label: "Alla fine", value: "vedi meglio i confini tra funzioni" }
      ],
      steps: [
        "Leggi la scheda di un altro gruppo.",
        "Cerca un esempio in cui siete d'accordo e uno in cui differite.",
        "Spiegate insieme quale indizio vi ha fatto cambiare interpretazione."
      ],
      observe: [
        "Avete usato gli stessi criteri per dire che qualcosa e rituale?",
        "Un esempio poteva stare anche nella lezione precedente sulle funzioni sociali?"
      ],
      result: "Capisci che le funzioni del suono si toccano, ma non coincidono sempre."
    },
    valutazione: {
      label: "Valutazione",
      title: "Controlla che cosa sai distinguere",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "usi un lessico piu preciso sulle funzioni rituali" }
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Che cosa rende rituale una pratica sonora?",
          options: [
            {
              id: "q1a",
              label: "Il legame con una formula condivisa, un passaggio e un valore simbolico per il gruppo.",
              correct: true,
              feedback: "Esatto. Il rito non dipende solo dal suono, ma dal significato comune che il gruppo gli attribuisce."
            },
            {
              id: "q1b",
              label: "Il fatto che il suono sia semplicemente molto forte.",
              correct: false,
              feedback: "No. L'intensita da sola non basta a creare una funzione rituale."
            }
          ]
        },
        {
          id: "q2",
          prompt: "Che differenza c'e tra festa e rito?",
          options: [
            {
              id: "q2a",
              label: "La festa crea partecipazione; il rito aggiunge una forma simbolica stabile e condivisa.",
              correct: true,
              feedback: "Esatto. Le due dimensioni possono incontrarsi, ma non vanno confuse."
            },
            {
              id: "q2b",
              label: "Sono due parole equivalenti per indicare qualsiasi momento musicale.",
              correct: false,
              feedback: "Non proprio. Il rito chiede una lettura piu precisa del contesto e del significato."
            }
          ]
        },
        {
          id: "q3",
          prompt: "Perche la ripetizione conta nelle pratiche rituali?",
          options: [
            {
              id: "q3a",
              label: "Perche rafforza riconoscibilita, memoria e partecipazione del gruppo.",
              correct: true,
              feedback: "Esatto. Il ritorno della formula rende il gesto condivisibile e stabile."
            },
            {
              id: "q3b",
              label: "Perche evita di dover ascoltare con attenzione.",
              correct: false,
              feedback: "No. Al contrario, la ripetizione concentra e orienta l'ascolto collettivo."
            }
          ]
        }
      ],
      selfCheck: [
        "Riesci a distinguere rito, festa e segnale?",
        "Riesci a spiegare il ruolo della ripetizione e della formula?",
        "Riesci a collegare il suono a appartenenza, passaggio e memoria del gruppo?"
      ]
    },
    chiusura: {
      label: "Chiusura",
      title: "Porta via il nucleo dell'idea",
      line: "Una pratica sonora diventa rituale quando la comunita riconosce in quella formula un gesto condiviso, simbolico e memorabile.",
      bridge: "Nella lezione successiva vedrai come materiali e oggetti diventano strumenti quando il suono si stabilizza anche nella materia e nel gesto tecnico."
    }
  }
};
function RitoMagiaComunitaLesson() {
  return /* @__PURE__ */ React3.createElement(OriginiTopicLesson, { lesson });
}
export {
  RitoMagiaComunitaLesson as default
};
