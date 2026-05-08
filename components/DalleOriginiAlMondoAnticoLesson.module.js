// components/DalleOriginiAlMondoAnticoLesson.jsx
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

// components/DalleOriginiAlMondoAnticoLesson.jsx
var lesson = {
  model: {
    id: "sintesi-transizione",
    label: "Lezione di sintesi-transizione",
    theoryShare: 70,
    practiceShare: 30
  },
  title: "Dalle origini al mondo antico",
  question: "Che cosa cambia quando il suono esce dalle origini e entra nella storia delle prime civilta?",
  subtitle: "Le pratiche elementari non scompaiono: si stabilizzano, si specializzano e lasciano tracce piu leggibili in strumenti, immagini, usi sociali e prime forme di scrittura.",
  heroWord: "soglia",
  heroPrelude: "Le origini non finiscono di colpo",
  heroEcho: "diventano la base di un mondo sonoro piu riconoscibile",
  heroTags: ["continuita", "scrittura", "strumenti", "civilta"],
  heroNote: "Le fonti sulla musica antica mostrano cerimonie, guerra, banchetti, teatro e strumenti piu definiti: il paesaggio sonoro si fa piu documentabile.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Dalle origini al mondo antico" }
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: "../materiali-sonori-primi-strumenti/index.html",
    homeHref: "../../../../index.html"
  },
  meta: [
    { label: "Durata", value: "2 ore" },
    { label: "Ti serve", value: "mappa del nucleo, scheda, timeline" },
    { label: "Obiettivo", value: "collegare origini del suono e prime civilta storiche" }
  ],
  opening: {
    title: "Riconosci una soglia",
    intro: "Un conto e immaginare un paesaggio sonoro da tracce indirette; un altro e iniziare a trovare strumenti, immagini, usi e forme piu stabili dentro civilta riconoscibili.",
    cardTitle: "Confronta due scene",
    meta: [
      { label: "Durata", value: "30 secondi" },
      { label: "Ti serve", value: "sguardo, parole chiave" },
      { label: "Alla fine", value: "vedi una continuita e una differenza" }
    ],
    steps: [
      "Pensa a una scena delle origini: corpo, gruppo, ambiente, gesto.",
      "Pensa a una scena del mondo antico: cerimonia, strumento, corteo, coro.",
      "Scrivi che cosa resta uguale e che cosa diventa piu organizzato."
    ],
    observe: [
      "Il gruppo resta centrale anche dopo il passaggio?",
      "Quale elemento ti fa dire che la documentazione storica e piu stabile?",
      "Dove compare una maggiore specializzazione del suono?"
    ],
    result: "Capisci che tra origini e civilta c'e una soglia, non una frattura assoluta.",
    side: {
      type: "flow",
      items: ["osserva", "confronta", "collega", "anticipa"],
      ariaLabel: "Passaggi per leggere la soglia storica"
    }
  },
  exploration: {
    title: "Che cosa resta, che cosa cambia",
    intro: "Le fonti consultate mostrano continuita forti: il suono resta legato a rito, guerra, banchetto, danza e comunita. Cambiano pero la specializzazione degli strumenti e la quantita di tracce disponibili.",
    layout: "essay-side",
    side: {
      type: "timeline",
      ariaLabel: "Sequenza di passaggio dalle origini al mondo antico",
      items: [
        {
          label: "01",
          title: "Origini sonore",
          text: "Corpo, gruppo, ambiente e funzione pratica aprono il nucleo del suono organizzato.",
          note: "inizio"
        },
        {
          label: "02",
          title: "Rito e funzione sociale",
          text: "Il suono diventa memoria, appartenenza, coordinazione e gesto simbolico condiviso.",
          note: "gruppo"
        },
        {
          label: "03",
          title: "Strumenti e tracce stabili",
          text: "Materia, gesto tecnico e documenti rendono il paesaggio sonoro piu leggibile.",
          note: "traccia"
        },
        {
          label: "04",
          title: "Mondo antico",
          text: "Civilta, cerimonie, banchetti, guerra e prime scritture musicali ampliano la documentazione.",
          note: "soglia"
        }
      ]
    },
    paragraphs: [
      "La sintesi storica consultata ricorda che della musica delle origini non possediamo testimonianze dirette, mentre nel mondo antico compaiono raffigurazioni di strumenti, descrizioni di usi cerimoniali e, per i Greci, anche una delle scritture musicali piu antiche di cui abbiamo traccia.",
      "Il passaggio, quindi, non cancella cio che hai studiato. Lo rende piu articolato: il suono continua a servire al gruppo, ma entra anche in contesti politici, religiosi, teatrali e celebrativi piu riconoscibili.",
      "Questa lezione funziona come una soglia: non aggiunge un nuovo blocco isolato, ma rimette in ordine tutto il nucleo per preparare il capitolo successivo."
    ],
    questionsTitle: "Domande di sintesi",
    questions: [
      "Quale elemento del nucleo resta piu stabile anche nel mondo antico?",
      "Che cosa rende il mondo antico piu documentabile della preistoria sonora?",
      "Perche strumenti e funzioni sociali diventano ancora piu importanti nella soglia verso le civilta?"
    ],
    panels: [
      {
        title: "Snodi del passaggio",
        kind: "terms",
        items: [
          { term: "Da oralita a tracce", text: "Non solo memoria del gruppo, ma anche immagini, testi e strumenti riconoscibili.", example: "fonte" },
          { term: "Da oggetto a strumento", text: "Il gesto tecnico diventa piu definito e ripetibile.", example: "uso" },
          { term: "Da comunita a civilta", text: "Il suono entra in spazi politici, religiosi e spettacolari piu complessi.", example: "contesto" },
          { term: "Da funzione a sistema", text: "Richiamo, rito e festa restano, ma si organizzano in pratiche piu stabili.", example: "ordine" }
        ]
      },
      {
        title: "Una formula utile",
        kind: "text",
        paragraphs: [
          "Le origini del suono preparano il mondo antico: non sono un capitolo chiuso, ma la base da cui nascono strumenti, pratiche e tracce storiche piu leggibili."
        ]
      }
    ]
  },
  active: {
    title: "Costruisci la pagina-ponte del nucleo",
    intro: "Qui l'attivita resta breve ma strutturante: usa tutto il nucleo per creare una soglia chiara, ordinata e leggibile verso il Mediterraneo antico.",
    cardTitle: "Collega origini e civilta",
    meta: [
      { label: "Durata", value: "10 minuti" },
      { label: "Ti serve", value: "scheda, timeline, parole chiave" },
      { label: "Alla fine", value: "una sintesi pronta per il nucleo successivo" }
    ],
    steps: [
      "Scegli quattro parole dalle lezioni sulle origini: ritmo, tracce, funzioni, rito, strumenti.",
      "Associa a ciascuna una continuita verso il mondo antico.",
      "Aggiungi due elementi nuovi che il mondo antico rende piu visibili.",
      "Chiudi con una frase-ponte verso il nucleo sulle civilta del Mediterraneo."
    ],
    observe: [
      "La tua sintesi mostra insieme continuita e trasformazione?",
      "Hai scelto esempi che fanno davvero da soglia storica?",
      "Il lettore capisce perche il nucleo successivo comincia proprio da qui?"
    ],
    result: "La tua pagina-ponte rende leggibile il passaggio dalle origini al mondo antico.",
    side: {
      type: "timeline",
      items: [
        { label: "A", title: "Continuita", text: "Che cosa resta vivo passando da un contesto all'altro?", note: "gruppo / rito / gesto" },
        { label: "B", title: "Trasformazione", text: "Che cosa si specializza o si documenta meglio entrando nel mondo antico?", note: "strumento / scrittura" },
        { label: "C", title: "Soglia", text: "Quale frase permette di passare al nucleo successivo senza ricominciare da zero?", note: "origini -> civilta" }
      ]
    },
    panels: [
      {
        title: "Mappa rapida",
        kind: "terms",
        items: [
          { term: "Oralita", text: "La memoria sonora passa soprattutto per imitazione e gruppo.", example: "prima delle tracce stabili" },
          { term: "Scrittura", text: "Nel mondo antico iniziano a comparire forme di notazione e teoria.", example: "Greci" },
          { term: "Contesto civile", text: "Il suono entra in guerra, banchetto, teatro, corteo.", example: "uso pubblico" },
          { term: "Ponte storico", text: "Una sintesi che prepara il nucleo successivo.", example: "Mediterraneo antico" }
        ]
      },
      {
        title: "Timeline ponte",
        kind: "timeline",
        items: [
          { label: "1", title: "Ritmo e gesto comune", text: "Il battito condiviso resta sotto molte pratiche del mondo antico.", note: "continuita" },
          { label: "2", title: "Funzioni sociali piu leggibili", text: "Segnale, celebrazione e rito entrano in contesti piu definiti.", note: "uso" },
          { label: "3", title: "Strumenti piu specializzati", text: "Flauti, trombe, arpe e percussioni stabilizzano materia e funzione.", note: "strumento" },
          { label: "4", title: "Prime scritture e teorie", text: "Il suono lascia tracce storiche piu solide e piu descrivibili.", note: "fonte" }
        ]
      }
    ],
    promptsTitle: "Verifica la soglia",
    prompts: [
      "Quale lezione del nucleo ti sembra la piu utile per capire il passaggio?",
      "Quale parola useresti per spiegare il mondo antico senza ricominciare da zero?",
      "Che cosa resta umano e corporeo anche quando la musica diventa piu organizzata?"
    ]
  },
  followupTitle: "Qui il lavoro serve a chiudere e aprire insieme",
  followupIntro: "Questa lezione e soprattutto di sintesi e transizione: ordina il nucleo, prepara una timeline-ponte e rende piu forte la frase finale che introduce il Mediterraneo antico.",
  followupDefault: "chiusura",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Rendi il ponte piu chiaro",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "la sintesi gia scritta" },
        { label: "Alla fine", value: "una soglia piu leggibile" }
      ],
      steps: [
        "Controlla che ogni parola chiave sia legata a un esempio concreto.",
        "Sostituisci una frase generica con una continuita storica piu precisa.",
        "Aggiungi una riga finale che apra il Mediterraneo antico."
      ],
      observe: [
        "La tua pagina-ponte evita di ripetere semplicemente il nucleo?",
        "Mostra davvero che cosa cambia entrando nella storia piu documentata?"
      ],
      result: "Il passaggio diventa piu utile per orientare il percorso successivo."
    },
    produzione: {
      label: "Produzione",
      title: "Prepara una timeline-ponte",
      meta: [
        { label: "Durata", value: "10 minuti" },
        { label: "Ti serve", value: "timeline, cartellone o slide" },
        { label: "Alla fine", value: "una pagina introduttiva pronta" }
      ],
      steps: [
        "Scegli tre continuita e due trasformazioni.",
        "Disponile in ordine dal piu antico al piu documentato.",
        "Chiudi con una domanda che introduca il nucleo delle civilta del Mediterraneo."
      ],
      observe: [
        "Il lettore capisce da dove arriva ogni trasformazione?",
        "La timeline mostra bene la soglia storica e non un salto improvviso?"
      ],
      result: "La tua pagina apre il nucleo successivo senza spezzare il filo del percorso."
    },
    condivisione: {
      label: "Condivisione",
      title: "Confronta due pagine-ponte",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "due sintesi di gruppo" },
        { label: "Alla fine", value: "vedi scelte diverse di collegamento" }
      ],
      steps: [
        "Leggi la pagina di un altro gruppo.",
        "Segna una continuita scelta bene e una trasformazione da chiarire meglio.",
        "Restituitevi un suggerimento su come aprire il nucleo successivo con piu chiarezza."
      ],
      observe: [
        "Avete dato lo stesso peso a strumenti, rito e fonti?",
        "Quale parola del nucleo appare davvero indispensabile per la soglia?"
      ],
      result: "Capisci che una buona sintesi storica sceglie e ordina, non accumula soltanto."
    },
    valutazione: {
      label: "Valutazione",
      title: "Controlla la visione d'insieme",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "usi meglio continuita e trasformazione" }
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Che cosa resta forte passando dalle origini al mondo antico?",
          options: [
            {
              id: "q1a",
              label: "Il legame tra suono, gruppo, funzione sociale e gesto condiviso.",
              correct: true,
              feedback: "Esatto. Le origini non spariscono: continuano dentro forme piu organizzate."
            },
            {
              id: "q1b",
              label: "Solo il nome degli strumenti.",
              correct: false,
              feedback: "No. Gli strumenti contano, ma non esauriscono il passaggio."
            }
          ]
        },
        {
          id: "q2",
          prompt: "Che cosa rende il mondo antico piu documentabile della preistoria sonora?",
          options: [
            {
              id: "q2a",
              label: "La presenza di piu immagini, testi, strumenti riconoscibili e prime forme di scrittura musicale.",
              correct: true,
              feedback: "Esatto. Le tracce si fanno piu stabili e leggibili."
            },
            {
              id: "q2b",
              label: "Il fatto che il corpo non serva piu a produrre suono.",
              correct: false,
              feedback: "No. Corpo e voce restano importanti anche nelle civilta storiche."
            }
          ]
        },
        {
          id: "q3",
          prompt: "Perche questa lezione e una soglia?",
          options: [
            {
              id: "q3a",
              label: "Perche collega il nucleo delle origini al capitolo successivo senza interrompere il filo logico.",
              correct: true,
              feedback: "Esatto. Serve a trasformare il nucleo in una base per continuare il percorso."
            },
            {
              id: "q3b",
              label: "Perche chiude il percorso senza lasciare altre aperture.",
              correct: false,
              feedback: "Non proprio. Qui il senso e proprio aprire il nucleo che viene dopo."
            }
          ]
        }
      ],
      selfCheck: [
        "Riesci a distinguere continuita e trasformazione?",
        "Riesci a spiegare perche il mondo antico lascia piu tracce delle origini?",
        "Riesci a usare il nucleo come ponte verso le civilta del Mediterraneo?"
      ]
    },
    chiusura: {
      label: "Chiusura",
      title: "Apri il capitolo dopo",
      line: "Le origini del suono non restano chiuse nel passato remoto: continuano nel mondo antico, dove pratiche, strumenti e funzioni diventano piu stabili e piu documentabili.",
      bridge: "Da qui il percorso puo entrare nel nucleo successivo sulle civilta del Mediterraneo, dove il suono lascia segni storici ancora piu leggibili."
    }
  }
};
function DalleOriginiAlMondoAnticoLesson() {
  return /* @__PURE__ */ React3.createElement(OriginiTopicLesson, { lesson });
}
export {
  DalleOriginiAlMondoAnticoLesson as default
};
