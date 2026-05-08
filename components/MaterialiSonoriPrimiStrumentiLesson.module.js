// components/MaterialiSonoriPrimiStrumentiLesson.jsx
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

// components/MaterialiSonoriPrimiStrumentiLesson.jsx
var lesson = {
  model: {
    id: "teorico-laboratoriale",
    label: "Lezione teorico-laboratoriale",
    theoryShare: 45,
    practiceShare: 55
  },
  title: "Materiali sonori e primi strumenti",
  question: "Quando un oggetto diventa davvero strumento?",
  subtitle: "Un materiale comincia a diventare strumento quando non lo guardi piu solo come cosa, ma come risorsa sonora riconoscibile, ripetibile e adatta a una funzione.",
  heroWord: "materia",
  heroPrelude: "Non basta avere un oggetto",
  heroEcho: "serve un gesto che lo faccia suonare in modo stabile",
  heroTags: ["pietra", "osso", "legno", "soffio"],
  heroNote: "Le fonti scolastiche sulla musica antica ricordano tamburi, flauti, arpe, trombe e cimbali: dietro ciascuno c'e un materiale scelto e un'azione precisa.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Materiali sonori e primi strumenti" }
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: "../rito-magia-comunita/index.html",
    homeHref: "../../../../index.html"
  },
  meta: [
    { label: "Durata", value: "2 ore" },
    { label: "Ti serve", value: "oggetti sonori, immagini, scheda" },
    { label: "Obiettivo", value: "collegare materiale, gesto, timbro e funzione" }
  ],
  opening: {
    title: "Ascolta prima la materia",
    intro: "Un suono non nasce solo da un'idea: nasce da qualcosa che vibra, risuona, si tende, si batte, si scuote o si soffia.",
    cardTitle: "Confronta i materiali",
    meta: [
      { label: "Durata", value: "30 secondi" },
      { label: "Ti serve", value: "oggetti o immagini" },
      { label: "Alla fine", value: "riconosci che il materiale condiziona il suono" }
    ],
    steps: [
      "Osserva due o tre materiali diversi: pietra, legno, metallo o pelle.",
      "Immagina quale gesto chiede ciascun materiale: battere, scuotere, soffiare, tendere.",
      "Prova a dire quale materiale sembra piu adatto a un suono secco, lungo o risonante."
    ],
    observe: [
      "Il materiale suggerisce subito un gesto?",
      "Ti aspetti un suono breve o risonante?",
      "Pensi a un uso di gruppo, di richiamo o di accompagnamento?"
    ],
    result: "Capisci che il suono dipende dall'incontro tra materia e azione.",
    side: {
      type: "flow",
      items: ["tocca", "prova", "confronta", "scegli"],
      ariaLabel: "Passaggi per leggere un materiale sonoro"
    }
  },
  exploration: {
    title: "Dal materiale al gesto tecnico",
    intro: "Le ricostruzioni scolastiche sulle musiche antiche mostrano famiglie di strumenti diverse, ma tutte nascono da un principio semplice: scegliere un materiale e usarlo in modo controllato.",
    layout: "essay-side",
    cardsPosition: "after",
    side: {
      type: "terms",
      items: [
        { term: "Materiale", text: "Cio che vibra o risuona.", example: "pietra / osso / pelle" },
        { term: "Gesto", text: "L'azione che attiva il materiale.", example: "battere / scuotere / soffiare" },
        { term: "Timbro", text: "Il carattere del suono prodotto.", example: "secco / lungo / ruvido" },
        { term: "Funzione", text: "Il motivo per cui il gruppo riusa quel suono.", example: "richiamo / ritmo" }
      ]
    },
    cards: [
      {
        title: "Percuotere",
        caption: "Pietra, legno, pelle tesa e superfici dure producono colpi leggibili, utili per segnare, accompagnare, sostenere il gruppo.",
        chips: ["colpo", "battito", "appoggio"]
      },
      {
        title: "Scuotere",
        caption: "Semi, conchiglie, sonagli e oggetti mobili producono texture regolari o agitate, adatte a mantenere energia e continuita.",
        chips: ["movimento", "grana", "ritorno"]
      },
      {
        title: "Soffiare o tendere",
        caption: "Canne forate, ossa, corde e tubi permettono suoni piu lunghi e controllabili, legati a richiamo, formula o accompagnamento.",
        chips: ["fiato", "corda", "risonanza"]
      }
    ],
    paragraphs: [
      "Le fonti consultate ricordano strumenti a fiato, percussioni e corde gia presenti nel mondo antico: flauti, trombe, tamburi, arpe, cimbali. Questo non significa che all'inizio esistessero gia forme complesse, ma che la strada passa dalla scoperta delle proprieta sonore dei materiali.",
      "Per parlare dei primi strumenti conviene quindi usare quattro parole insieme: materiale, gesto, timbro, funzione. Un oggetto diventa strumento quando il gruppo riconosce che puo produrre un suono ripetibile e utile in una situazione.",
      "Qui la teoria deve servire subito all'azione: capire bene queste quattro parole ti permette poi di classificare, confrontare e progettare meglio."
    ],
    questionsTitle: "Domande di passaggio",
    questions: [
      "Che differenza c'e tra oggetto sonoro e strumento?",
      "Il materiale conta piu del gesto o il gesto conta quanto il materiale?",
      "Quale funzione ti aiuta di piu a capire perche un oggetto viene conservato e riusato?"
    ],
    panels: [
      {
        title: "Materiali ricorrenti",
        kind: "cards",
        columns: 2,
        items: [
          { title: "Osso o canna", caption: "Aiutano a soffiare o forare per creare altezze e richiami.", chips: ["aria", "foro"] },
          { title: "Pietra", caption: "Offre colpi secchi, risonanze dure, appoggi ritmici.", chips: ["urto", "eco"] },
          { title: "Legno", caption: "Permette percussione, cassa di risonanza, sostegno strutturale.", chips: ["cavo", "vibra"] },
          { title: "Pelle tesa", caption: "Trasforma il colpo in superficie sonora regolare.", chips: ["tamburo", "membrana"] }
        ]
      },
      {
        title: "Domanda guida",
        kind: "text",
        paragraphs: [
          "Il passaggio decisivo non e possedere una materia, ma capire come quella materia puo essere usata piu volte per ottenere un suono riconoscibile."
        ]
      }
    ]
  },
  active: {
    title: "Costruisci una tassonomia minima",
    intro: "Qui il lavoro diventa piu operativo: prendi materiali, gesti e funzioni e ordina tutto in una tassonomia leggibile, come se stessi preparando una piccola tavola di laboratorio.",
    cardTitle: "Metti in relazione materia e gesto",
    meta: [
      { label: "Durata", value: "15 minuti" },
      { label: "Ti serve", value: "scheda, immagini, parole chiave" },
      { label: "Alla fine", value: "una classificazione leggibile" }
    ],
    steps: [
      "Scegli quattro esempi tra pietra, osso, canna, conchiglia, pelle, legno.",
      "Per ciascuno scrivi quale gesto lo attiva meglio.",
      "Aggiungi il timbro che ti aspetti: secco, risonante, continuo, granulare.",
      "Chiudi indicando una funzione plausibile: richiamo, accompagnamento, coordinazione, cerimonia."
    ],
    observe: [
      "Hai separato bene materiale, gesto e funzione?",
      "Due materiali diversi possono servire alla stessa funzione?",
      "Un materiale cambia molto se cambia il modo in cui lo usi?"
    ],
    result: "Riesci a spiegare perche i primi strumenti nascono dall'uso intenzionale della materia.",
    side: {
      type: "terms",
      items: [
        { term: "Materiale", text: "La sostanza che vibra o risuona.", example: "osso / pietra / legno" },
        { term: "Gesto tecnico", text: "L'azione che attiva il suono.", example: "battere / scuotere / soffiare" },
        { term: "Timbro", text: "Il carattere del suono prodotto.", example: "secco / lungo / ruvido" }
      ]
    },
    panels: [
      {
        title: "Mappa rapida",
        kind: "terms",
        items: [
          { term: "Percussione", text: "Il suono nasce da un urto controllato.", example: "colpo" },
          { term: "Scuotimento", text: "Il suono nasce da piccoli elementi in movimento.", example: "sonaglio" },
          { term: "Soffio", text: "Il suono nasce dall'aria che attraversa una cavita.", example: "flauto" },
          { term: "Risonanza", text: "Il materiale amplifica o prolunga il gesto sonoro.", example: "cassa / eco" }
        ]
      },
      {
        title: "Dal materiale allo strumento",
        kind: "timeline",
        items: [
          { label: "01", title: "Scegli la materia", text: "Parti da cio che vibra, risuona o si tende piu facilmente.", note: "materiale" },
          { label: "02", title: "Associa un gesto", text: "Battere, scuotere o soffiare cambiano radicalmente il risultato.", note: "azione" },
          { label: "03", title: "Ascolta il timbro", text: "Il suono puo essere secco, continuo, granulare o risonante.", note: "timbro" },
          { label: "04", title: "Dai una funzione", text: "Solo allora l'oggetto comincia a servire davvero al gruppo.", note: "uso" }
        ]
      }
    ],
    promptsTitle: "Controlla la classificazione",
    prompts: [
      "Quale materiale ti sembra piu facile da trasformare in strumento?",
      "Quale funzione spiega meglio la conservazione di un oggetto sonoro?",
      "Perche uno stesso materiale puo dare risultati molto diversi?"
    ]
  },
  followupTitle: "Dopo il concetto, porta la materia verso una classificazione operativa",
  followupIntro: "Qui teoria e pratica restano intrecciate: chiarisci il lessico essenziale e poi lo usi per costruire tavola, confronto e verifica tecnica.",
  followupDefault: "produzione",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Pulisci la classificazione",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "la mappa gia compilata" },
        { label: "Alla fine", value: "categorie piu nitide" }
      ],
      steps: [
        "Controlla che ogni voce dica prima il materiale e poi il gesto.",
        "Elimina un aggettivo vago e sostituiscilo con un termine sonoro piu preciso.",
        "Accorpa due esempi che appartengono alla stessa famiglia di azione."
      ],
      observe: [
        "La tua mappa fa capire subito la logica della classificazione?",
        "Hai evitato di confondere oggetto, gesto e funzione?"
      ],
      result: "La tassonomia diventa piu utile per spiegare e ricordare."
    },
    produzione: {
      label: "Produzione",
      title: "Realizza una tavola sui primi strumenti",
      meta: [
        { label: "Durata", value: "10 minuti" },
        { label: "Ti serve", value: "cartellone o slide" },
        { label: "Alla fine", value: "una tavola pronta da esporre" }
      ],
      steps: [
        "Scegli tre esempi che mostrino azioni diverse.",
        "Per ciascuno indica materiale, gesto, timbro e funzione.",
        "Chiudi con una frase che spieghi quando un oggetto diventa strumento."
      ],
      observe: [
        "Il lettore vede subito la relazione tra materia e uso?",
        "Gli esempi mostrano timbri e funzioni differenti?"
      ],
      result: "La tua tavola rende visibile la nascita tecnica del suono organizzato."
    },
    condivisione: {
      label: "Condivisione",
      title: "Metti a confronto due tassonomie",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "due mappe di gruppo" },
        { label: "Alla fine", value: "vedi analogie e differenze" }
      ],
      steps: [
        "Osserva la mappa di un altro gruppo.",
        "Segna una categoria costruita bene e una che crea confusione.",
        "Spiegate insieme quale criterio funziona meglio: materiale, gesto o funzione."
      ],
      observe: [
        "Avete usato la stessa logica di classificazione?",
        "Un esempio puo cambiare famiglia se cambia il criterio?"
      ],
      result: "Capisci che classificare significa scegliere un punto di vista coerente."
    },
    valutazione: {
      label: "Valutazione",
      title: "Controlla che cosa sai collegare",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "usi meglio il lessico tecnico essenziale" }
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Quando un oggetto comincia a essere strumento?",
          options: [
            {
              id: "q1a",
              label: "Quando il gruppo riconosce che puo produrre un suono ripetibile con un gesto controllato.",
              correct: true,
              feedback: "Esatto. La stabilita dell'uso sonoro e decisiva."
            },
            {
              id: "q1b",
              label: "Quando l'oggetto e semplicemente molto antico.",
              correct: false,
              feedback: "No. L'antichita da sola non dice nulla sul suo uso musicale."
            }
          ]
        },
        {
          id: "q2",
          prompt: "Che cosa collega materiale e timbro?",
          options: [
            {
              id: "q2a",
              label: "Il gesto che attiva il materiale e il modo in cui questo risuona.",
              correct: true,
              feedback: "Esatto. Materia e azione lavorano sempre insieme."
            },
            {
              id: "q2b",
              label: "Solo il colore visivo dell'oggetto.",
              correct: false,
              feedback: "No. Qui conta come vibra e come viene usato, non il suo aspetto."
            }
          ]
        },
        {
          id: "q3",
          prompt: "Perche la funzione conta nello studio dei primi strumenti?",
          options: [
            {
              id: "q3a",
              label: "Perche aiuta a capire perche un oggetto viene scelto, conservato e riusato dal gruppo.",
              correct: true,
              feedback: "Esatto. La funzione rende leggibile il passaggio da materia a risorsa sonora."
            },
            {
              id: "q3b",
              label: "Perche elimina il bisogno di descrivere materiali e gesti.",
              correct: false,
              feedback: "No. La funzione si capisce proprio mettendo in relazione tutti gli elementi."
            }
          ]
        }
      ],
      selfCheck: [
        "Riesci a collegare materiale, gesto, timbro e funzione?",
        "Riesci a distinguere oggetto sonoro e strumento?",
        "Riesci a fare esempi semplici di percussione, scuotimento e soffio?"
      ]
    },
    chiusura: {
      label: "Chiusura",
      title: "Ricorda il passaggio decisivo",
      line: "I primi strumenti nascono quando una materia viene scelta, attivata e riconosciuta come fonte sonora stabile dentro la vita del gruppo.",
      bridge: "Nella lezione successiva userai tutto il nucleo per costruire una soglia verso il mondo antico, dove queste pratiche lasciano tracce piu stabili e riconoscibili."
    }
  }
};
function MaterialiSonoriPrimiStrumentiLesson() {
  return /* @__PURE__ */ React3.createElement(OriginiTopicLesson, { lesson });
}
export {
  MaterialiSonoriPrimiStrumentiLesson as default
};
