// components/MusicaComunicazioneFunzioniSocialiLesson.jsx
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
function TimelineBoard({ items, ariaLabel }) {
  return /* @__PURE__ */ React2.createElement("div", { className: "lesson-timeline-board", "aria-label": ariaLabel }, items.map((item, index) => /* @__PURE__ */ React2.createElement("div", { key: `${item.title}-${index}`, className: "lesson-timeline-board__row" }, /* @__PURE__ */ React2.createElement("div", { className: "lesson-timeline-board__marker" }, /* @__PURE__ */ React2.createElement("span", null, item.label || String(index + 1).padStart(2, "0"))), /* @__PURE__ */ React2.createElement("div", { className: "lesson-timeline-board__content" }, /* @__PURE__ */ React2.createElement("strong", null, item.title), item.text ? /* @__PURE__ */ React2.createElement("p", null, item.text) : null, item.note ? /* @__PURE__ */ React2.createElement("div", { className: "lesson-term-list__example" }, item.note) : null))));
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
  if (spec.type === "timeline") {
    return /* @__PURE__ */ React2.createElement(TimelineBoard, { items: spec.items, ariaLabel: spec.ariaLabel || "Sequenza essenziale" });
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
  if (panel.kind === "timeline") {
    return /* @__PURE__ */ React2.createElement(TimelineBoard, { items: panel.items, ariaLabel: panel.ariaLabel || panel.title || "Sequenza essenziale" });
  }
  if (panel.kind === "prompts") {
    return /* @__PURE__ */ React2.createElement(PromptList, { items: panel.items });
  }
  if (panel.kind === "text") {
    return /* @__PURE__ */ React2.createElement("div", { className: "lesson-stack" }, panel.paragraphs.map((paragraph) => /* @__PURE__ */ React2.createElement("p", { key: paragraph, className: "lesson-body-text" }, paragraph)));
  }
  return null;
}
function PanelCollection({ panels }) {
  if (!panels?.length) {
    return null;
  }
  if (panels.length === 1) {
    const panel = panels[0];
    return /* @__PURE__ */ React2.createElement(Panel, { title: panel.title }, /* @__PURE__ */ React2.createElement(PanelContent, { panel }));
  }
  return /* @__PURE__ */ React2.createElement("div", { className: cn("lesson-card-grid", panels.length === 2 ? "lesson-card-grid--two" : "lesson-card-grid--three") }, panels.map((panel) => /* @__PURE__ */ React2.createElement(Panel, { key: panel.title, title: panel.title }, /* @__PURE__ */ React2.createElement(PanelContent, { panel }))));
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
  const cards = exploration.cards?.length ? /* @__PURE__ */ React2.createElement(KeyCardGrid, { items: exploration.cards, columns: exploration.cardsColumns || 3 }) : null;
  const side = exploration.side ? /* @__PURE__ */ React2.createElement(VisualSpec, { spec: exploration.side }) : exploration.flow?.length ? /* @__PURE__ */ React2.createElement(FlowBoard, { items: exploration.flow, ariaLabel: exploration.flowLabel || "Passaggi principali dell'argomento" }) : null;
  const copy = /* @__PURE__ */ React2.createElement("div", { className: "lesson-stack" }, exploration.paragraphs.map((paragraph) => /* @__PURE__ */ React2.createElement("p", { key: paragraph, className: "lesson-body-text" }, paragraph)), exploration.questions?.length ? /* @__PURE__ */ React2.createElement(PromptList, { title: exploration.questionsTitle || "Osserva", items: exploration.questions }) : null);
  return /* @__PURE__ */ React2.createElement(LessonSection, { id: "esplorazione", title: exploration.title, intro: exploration.intro, tone: "soft" }, exploration.cardsPosition !== "after" ? cards : null, side ? /* @__PURE__ */ React2.createElement("div", { className: cn("lesson-grid", exploration.layout === "essay-side" ? "lesson-grid--asym" : "lesson-grid--two") }, copy, side) : copy, exploration.cardsPosition === "after" ? cards : null, exploration.evidence?.length ? /* @__PURE__ */ React2.createElement(EvidenceStrip, { items: exploration.evidence }) : null, /* @__PURE__ */ React2.createElement(PanelCollection, { panels: exploration.panels }));
}
function ActiveSection({ lesson: lesson2 }) {
  const active = lesson2.active;
  return /* @__PURE__ */ React2.createElement(LessonSection, { id: "comprensione-attiva", title: active.title, intro: active.intro }, /* @__PURE__ */ React2.createElement(Panel, { title: active.cardTitle, meta: active.meta }, /* @__PURE__ */ React2.createElement(
    ActivityLayout,
    {
      steps: active.steps,
      observe: active.observe,
      result: active.result,
      right: /* @__PURE__ */ React2.createElement(VisualSpec, { spec: active.side, fallbackTotal: active.timerTotal || 45 })
    }
  )), /* @__PURE__ */ React2.createElement(PanelCollection, { panels: active.panels }), active.prompts?.length ? /* @__PURE__ */ React2.createElement(Panel, { title: active.promptsTitle || "Ascolto interno" }, /* @__PURE__ */ React2.createElement(PromptList, { items: active.prompts })) : null);
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
  return /* @__PURE__ */ React2.createElement("div", { className: "lesson-editorial-page", "data-lesson-model": lesson2.model?.id || "" }, /* @__PURE__ */ React2.createElement(
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

// components/MusicaComunicazioneFunzioniSocialiLesson.jsx
var lesson = {
  model: {
    id: "storico-sociale",
    label: "Lezione storico-sociale / interpretativa",
    theoryShare: 50,
    practiceShare: 50
  },
  title: "Musica, comunicazione e funzioni sociali",
  question: "Che cosa puo fare il suono per una comunita oltre a essere bello da ascoltare?",
  subtitle: "Il suono chiama, segnala, organizza, accompagna il lavoro, sostiene la festa e rende riconoscibile un gesto comune.",
  heroWord: "segnale",
  heroPrelude: "Il suono non serve solo a esprimere",
  heroEcho: "serve anche a chiamare e coordinare",
  heroTags: ["richiamo", "coordinazione", "festa", "memoria"],
  heroNote: "Le fonti sulle civilta antiche mostrano che il suono accompagna battaglia, banchetto, rito, lavoro e celebrazione.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Musica, comunicazione e funzioni sociali" }
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: "../suono-nella-preistoria/index.html",
    homeHref: "../../../../index.html"
  },
  meta: [
    { label: "Durata", value: "2 ore" },
    { label: "Ti serve", value: "voce, corpo, spazio, scheda" },
    { label: "Obiettivo", value: "distinguere usi pratici, simbolici e collettivi del suono" }
  ],
  opening: {
    title: "Riconosci il segnale del gruppo",
    intro: "Anche in aula il suono puo ordinare l'azione. Un battito, una parola breve o un accento comune bastano a far partire o fermare tutti.",
    cardTitle: "Prova il richiamo",
    meta: [
      { label: "Durata", value: "30 secondi" },
      { label: "Ti serve", value: "voce o mani" },
      { label: "Alla fine", value: "riconosci un suono che orienta il gruppo" }
    ],
    steps: [
      "Ascolta un richiamo breve dell'insegnante o del compagno.",
      "Ripeti il gesto tutti insieme una sola volta.",
      "Decidi se quel suono serve a partire, fermarsi o radunarsi."
    ],
    observe: [
      "Che cosa rende immediato un richiamo?",
      "Il suono organizza o confonde il gruppo?",
      "Serve piu forza o piu chiarezza?"
    ],
    result: "Capisci che un suono puo avere una funzione sociale prima ancora di diventare brano.",
    side: {
      type: "flow",
      items: ["chiama", "raduna", "coordina", "ricorda"],
      ariaLabel: "Funzioni di un segnale sonoro"
    }
  },
  exploration: {
    title: "Dal richiamo alla festa",
    intro: "Le fonti scolastiche sulle civilta antiche mostrano che il suono accompagna sia i momenti pratici sia quelli solenni: battaglia, banchetto, danza, cerimonia.",
    layout: "essay-side",
    cardsPosition: "after",
    side: {
      type: "flow",
      items: ["segnala", "coordina", "celebra", "ricorda"],
      ariaLabel: "Quattro funzioni sociali del suono"
    },
    cards: [
      {
        title: "Richiamo",
        caption: "Un suono breve serve a farsi riconoscere subito: chiamare, radunare, avvisare, orientare.",
        chips: ["voce", "tromba", "battito"]
      },
      {
        title: "Coordinazione",
        caption: "Un battito comune aiuta il gruppo a camminare, lavorare, remare, marciare o entrare insieme nello stesso gesto.",
        chips: ["passo", "metro", "insieme"]
      },
      {
        title: "Celebrazione",
        caption: "Banchetti, danze e vittorie hanno bisogno di suoni riconoscibili per segnare appartenenza e clima condiviso.",
        chips: ["festa", "danza", "vittoria"]
      }
    ],
    paragraphs: [
      "Le fonti sul mondo antico ricordano strumenti usati come segnali in battaglia, canti e danze nei banchetti, cori e pratiche collettive nelle cerimonie. Questo allarga il concetto di musica: non solo ascolto, ma azione nel gruppo.",
      "Per questo conviene distinguere funzione pratica e funzione simbolica senza separarle troppo: spesso lo stesso suono chiama, coordina e insieme rafforza l'identita di una comunita.",
      "La domanda giusta, quindi, non e soltanto che suono sentiamo, ma che cosa quel suono permette di fare a una comunita in una situazione concreta."
    ],
    questionsTitle: "Domande di lettura",
    questions: [
      "Quando un suono funziona come segnale?",
      "Quando invece serve a tenere insieme il gruppo nel tempo?",
      "Che cosa cambia tra richiamo, festa e memoria?"
    ],
    panels: [
      {
        title: "Tre contesti da leggere",
        kind: "timeline",
        items: [
          { label: "01", title: "Battaglia", text: "Segnali a fiato orientano i movimenti e rendono immediato il comando.", note: "segnale" },
          { label: "02", title: "Banchetto", text: "Musica e danza accompagnano la socialita e costruiscono il clima del momento.", note: "festa" },
          { label: "03", title: "Coro o cerimonia", text: "La voce comune rafforza memoria, solennita e riconoscimento reciproco.", note: "memoria" }
        ]
      },
      {
        title: "Domanda guida",
        kind: "text",
        paragraphs: [
          "Se un gruppo deve muoversi insieme, ricordare una formula o rendere solenne un passaggio, il suono diventa uno strumento di organizzazione sociale."
        ]
      }
    ]
  },
  active: {
    title: "Costruisci una guida alle funzioni del suono",
    intro: "Prendi situazioni diverse e prova a spiegare che cosa fa il suono in ciascun caso: chiamare, coordinare, celebrare, ricordare.",
    cardTitle: "Ordina gli usi",
    meta: [
      { label: "Durata", value: "15 minuti" },
      { label: "Ti serve", value: "scheda, parole chiave, esempi" },
      { label: "Alla fine", value: "una mappa di funzioni leggibili" }
    ],
    steps: [
      "Scegli quattro situazioni: richiamo, lavoro comune, festa, cerimonia.",
      "Per ciascuna, scrivi quale suono immagini e che cosa permette al gruppo di fare.",
      "Aggiungi un verbo chiave: chiamare, coordinare, celebrare, ricordare.",
      "Controlla se due situazioni usano il suono in modi simili o diversi."
    ],
    observe: [
      "La funzione e descritta con un verbo preciso?",
      "Il suono serve davvero al gruppo o solo all'effetto?",
      "Sai spiegare perche una pratica e piu utile di un'altra in quel contesto?"
    ],
    result: "La tua guida mostra che il suono agisce dentro la vita sociale della comunita.",
    side: {
      type: "terms",
      items: [
        { term: "Segnale", text: "Serve a farsi capire subito da chi ascolta.", example: "chiama / avvisa" },
        { term: "Coordinazione", text: "Tiene insieme movimenti e tempi del gruppo.", example: "marcia / lavoro" },
        { term: "Celebrazione", text: "Rende condiviso un momento importante.", example: "danza / vittoria" }
      ]
    },
    panels: [
      {
        title: "Mappa rapida",
        kind: "terms",
        items: [
          { term: "Richiamo", text: "Suono breve, leggibile, diretto.", example: "subito" },
          { term: "Ritmo comune", text: "Battito che organizza il gruppo nel tempo.", example: "insieme" },
          { term: "Memoria", text: "Formula sonora che aiuta a ricordare o riconoscersi.", example: "ritorno" },
          { term: "Funzione sociale", text: "Uso del suono legato a una situazione collettiva.", example: "gruppo" }
        ]
      },
      {
        title: "Confronto tra contesti",
        kind: "timeline",
        items: [
          { label: "A", title: "Caccia o spostamento", text: "Il suono orienta e sincronizza il gruppo mentre l'azione e in corso.", note: "coordinazione" },
          { label: "B", title: "Festa o banchetto", text: "Il suono crea partecipazione, piacere e riconoscimento reciproco.", note: "celebrazione" },
          { label: "C", title: "Cerimonia", text: "Il suono rende piu memorabile e leggibile un momento condiviso.", note: "solennita" },
          { label: "D", title: "Vittoria", text: "Il suono annuncia, mostra e conserva nella memoria un evento del gruppo.", note: "ricordo" }
        ]
      }
    ],
    promptsTitle: "Interpreta i casi",
    prompts: [
      "Quale funzione pratica riconosci per prima?",
      "Quale uso del suono e piu vicino alla memoria del gruppo?",
      "Dove il confine tra pratica e simbolo diventa meno netto?"
    ]
  },
  followupTitle: "Dopo il confronto, rendi le funzioni piu leggibili",
  followupIntro: "Qui teoria e attivita restano in equilibrio: osservi i contesti, li ordini e poi li trasformi in una guida, una restituzione orale e una verifica ragionata.",
  followupDefault: "produzione",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Stringi la tua mappa",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "la guida gia compilata" },
        { label: "Alla fine", value: "verbi e funzioni piu nitidi" }
      ],
      steps: [
        "Sostituisci una frase lunga con un verbo chiaro.",
        "Evidenzia le funzioni che si ripetono in piu contesti.",
        "Elimina un esempio che non spiega davvero la funzione sociale."
      ],
      observe: [
        "Ogni contesto ha una funzione leggibile?",
        "La tua guida evita descrizioni generiche come bello o forte?"
      ],
      result: "La mappa diventa piu utile per spiegare e confrontare."
    },
    produzione: {
      label: "Produzione",
      title: "Prepara una guida espositiva",
      meta: [
        { label: "Durata", value: "10 minuti" },
        { label: "Ti serve", value: "cartellone o slide" },
        { label: "Alla fine", value: "una guida pronta da mostrare" }
      ],
      steps: [
        "Scegli tre contesti e disponili in ordine logico.",
        "Per ciascuno scrivi funzione, suono e gesto del gruppo.",
        "Chiudi con una frase che spieghi perche il suono e uno strumento sociale."
      ],
      observe: [
        "Il lettore capisce perche ogni suono serve?",
        "Gli esempi si distinguono tra loro con chiarezza?"
      ],
      result: "Il tuo pannello mostra il suono come azione collettiva."
    },
    condivisione: {
      label: "Condivisione",
      title: "Confronta le funzioni",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "due mappe di gruppo" },
        { label: "Alla fine", value: "vedi usi diversi dello stesso suono" }
      ],
      steps: [
        "Leggi la mappa di un altro gruppo.",
        "Cerca una funzione uguale e una funzione diversa rispetto alla tua.",
        "Spiega dove avete messo l'accento in modo differente."
      ],
      observe: [
        "Due gruppi hanno usato gli stessi verbi?",
        "Una stessa pratica puo servire a piu funzioni?"
      ],
      result: "Capisci che il suono sociale cambia con il contesto."
    },
    valutazione: {
      label: "Valutazione",
      title: "Controlla che cosa sai distinguere",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "usi meglio il lessico della funzione" }
      ],
      quiz: [
        {
          id: "q1",
          prompt: "A che cosa serve un segnale sonoro?",
          options: [
            {
              id: "q1a",
              label: "A farsi riconoscere e capire subito da un gruppo.",
              correct: true,
              feedback: "Esatto. Il segnale punta a immediatezza e chiarezza."
            },
            {
              id: "q1b",
              label: "Solo a fare piu rumore degli altri.",
              correct: false,
              feedback: "No. La forza non basta se il gruppo non capisce la funzione."
            }
          ]
        },
        {
          id: "q2",
          prompt: "Che differenza c'e tra coordinare e celebrare?",
          options: [
            {
              id: "q2a",
              label: "Coordinare ordina l'azione; celebrare rende condiviso un momento importante.",
              correct: true,
              feedback: "Esatto. Le due funzioni possono incontrarsi, ma non sono identiche."
            },
            {
              id: "q2b",
              label: "Sono due modi equivalenti per dire la stessa cosa.",
              correct: false,
              feedback: "Non proprio. Una riguarda l'organizzazione del gesto, l'altra il valore del momento."
            }
          ]
        },
        {
          id: "q3",
          prompt: "Perche il suono ha una funzione sociale?",
          options: [
            {
              id: "q3a",
              label: "Perche agisce dentro situazioni collettive e modifica il comportamento del gruppo.",
              correct: true,
              feedback: "Esatto. Il suono orienta, unisce, segnala e rende leggibile un'azione comune."
            },
            {
              id: "q3b",
              label: "Perche esiste solo quando qualcuno e solo.",
              correct: false,
              feedback: "No. Qui stiamo parlando proprio del rapporto tra suono e comunita."
            }
          ]
        }
      ],
      selfCheck: [
        "Riesci a distinguere segnale, coordinazione e celebrazione?",
        "Riesci a collegare un suono a una funzione concreta del gruppo?",
        "Riesci a spiegare perche la musica e anche organizzazione sociale?"
      ]
    },
    chiusura: {
      label: "Chiusura",
      title: "Ricorda l'idea centrale",
      line: "Il suono non serve solo a esprimere: chiama, orienta, coordina e rende condivisibile la vita del gruppo.",
      bridge: "Nella lezione successiva vedrai che in alcuni contesti questa funzione sociale si concentra in forme rituali, simboliche e identitarie molto forti."
    }
  }
};
function MusicaComunicazioneFunzioniSocialiLesson() {
  return /* @__PURE__ */ React3.createElement(OriginiTopicLesson, { lesson });
}
export {
  MusicaComunicazioneFunzioniSocialiLesson as default
};
