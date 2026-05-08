// components/SuonoNellaPreistoriaLesson.jsx
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

// components/SuonoNellaPreistoriaLesson.jsx
var lesson = {
  model: {
    id: "teorico-esplorativa",
    label: "Lezione teorico-esplorativa",
    theoryShare: 65,
    practiceShare: 35
  },
  title: "Suono nella preistoria",
  question: "Come possiamo immaginare un suono di cui non esiste registrazione?",
  subtitle: "Non abbiamo spartiti, audio o cronache dirette. Possiamo pero leggere ambiente, reperti, immagini e gesti ripetuti con prudenza storica.",
  heroWord: "tracce",
  heroPrelude: "Del suono antico non resta l'audio",
  heroEcho: "restano indizi da leggere con prudenza",
  heroTags: ["ambiente", "reperti", "ipotesi", "prudenza"],
  heroNote: "Le fonti ci aiutano a distinguere cio che possiamo osservare da cio che possiamo solo immaginare.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Suono nella preistoria" }
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: "../ritmo-pulsazione-tempo/index.html",
    homeHref: "../../../../index.html"
  },
  meta: [
    { label: "Durata", value: "2 ore" },
    { label: "Ti serve", value: "immagini, suoni naturali, foglio" },
    { label: "Obiettivo", value: "distinguere dato, indizio, ipotesi e funzione" }
  ],
  opening: {
    title: "Ascolta quello che lascia traccia",
    intro: "Prima di parlare di preistoria sonora, prova a capire quali suoni del presente lasciano una traccia visibile, materiale o condivisa.",
    cardTitle: "Fermati e separa",
    meta: [
      { label: "Durata", value: "30 secondi" },
      { label: "Ti serve", value: "silenzio, sguardo, orecchio" },
      { label: "Alla fine", value: "distingui osservazione e immaginazione" }
    ],
    steps: [
      "Resta in silenzio per 30 secondi e ascolta l'aula.",
      "Scrivi due suoni che senti davvero e due suoni che stai immaginando.",
      "Prova a dire quale dei quattro potrebbe lasciare una traccia materiale."
    ],
    observe: [
      "Che cosa puoi ascoltare adesso con certezza?",
      "Quale suono puoi solo immaginare?",
      "Quale traccia potrebbe restare anche dopo che il suono finisce?"
    ],
    result: "Capisci che non ogni immagine del passato vale come prova sonora.",
    side: {
      type: "flow",
      items: ["ascolta", "osserva", "distingui", "argomenta"],
      ariaLabel: "Passaggi per leggere una traccia sonora"
    }
  },
  exploration: {
    title: "Paesaggio sonoro senza registrazioni",
    intro: "Le fonti storiche ricordano che la musica antica e originaria ci e arrivata soprattutto per tracce indirette: ambiente, immagini, reperti, oralita.",
    layout: "essay-side",
    side: {
      type: "timeline",
      ariaLabel: "Tipi di traccia usati per ricostruire il suono preistorico",
      items: [
        {
          label: "01",
          title: "Ambiente",
          text: "Eco, vento, acqua, pietra e spazi aperti o chiusi aiutano a capire come il paesaggio partecipasse all'ascolto.",
          note: "luogo"
        },
        {
          label: "02",
          title: "Reperto",
          text: "Oggetti forati, consumati o percossi suggeriscono usi possibili, ma non bastano da soli a chiudere l'interpretazione.",
          note: "materia"
        },
        {
          label: "03",
          title: "Immagine o gesto",
          text: "Scene in movimento e pratiche collettive aiutano a collegare il suono a danza, richiamo, rito e memoria del gruppo.",
          note: "pratica"
        }
      ]
    },
    paragraphs: [
      "Le fonti didattiche ricordano che della musica delle origini non abbiamo testimonianze scritte o registrazioni: possiamo lavorare solo su cio che resta e su cio che torna plausibile dentro un contesto.",
      "Questo significa leggere con prudenza. Un reperto puo essere importante, ma va sempre collegato ad ambiente, funzione possibile e confronto con altre tracce.",
      "La ricostruzione storica non chiede di inventare liberamente: chiede di tenere distinti dato osservabile, indizio interpretativo e ipotesi plausibile."
    ],
    questionsTitle: "Domande guida",
    questions: [
      "Che differenza c'e tra un dato osservabile e una ricostruzione plausibile?",
      "Perche l'ambiente conta quanto il reperto?",
      "Quando un'immagine ci aiuta davvero a parlare di suono?"
    ],
    evidence: [
      {
        label: "Traccia visiva",
        title: "Figure in movimento",
        body: "Una scena rupestre non registra la musica, ma puo farci ragionare su caccia, danza, gesto collettivo e funzione del gruppo.",
        image: {
          src: "../../../../assets/lesson/corpo-voce-gesto/lascaux-painting.jpg",
          alt: "Pittura rupestre di Lascaux"
        }
      },
      {
        label: "Traccia materiale",
        title: "Osso forato, uso discusso",
        body: "Reperti come il flauto di Divje Babe aprono ipotesi forti, ma richiedono cautela: datazione e funzione vanno sempre presentate come campo di studio.",
        image: {
          src: "../../../../assets/lesson/corpo-voce-gesto/divje-babe-flute.jpg",
          alt: "Reperto del flauto di Divje Babe"
        }
      },
      {
        label: "Traccia sonora",
        title: "Ambiente che risponde",
        body: "Eco, pareti rocciose, acqua e vento aiutano a capire che il paesaggio stesso poteva partecipare all'esperienza sonora."
      }
    ],
    panels: [
      {
        title: "Lessico del metodo",
        kind: "terms",
        items: [
          { term: "Dato", text: "Cio che puoi mostrare, documentare o descrivere direttamente.", example: "reperto / immagine" },
          { term: "Indizio", text: "Cio che orienta la lettura ma non chiude ancora il significato.", example: "foro / usura / eco" },
          { term: "Ipotesi", text: "Una ricostruzione plausibile fondata su piu tracce messe insieme.", example: "uso sonoro" }
        ]
      },
      {
        title: "Cautela storica",
        kind: "text",
        paragraphs: [
          "Parlare di suono nella preistoria significa dichiarare sempre il grado di certezza di cio che stiamo dicendo. Questa trasparenza e parte del contenuto, non un dettaglio tecnico."
        ]
      }
    ]
  },
  active: {
    title: "Analizza una traccia e costruisci una scheda breve",
    intro: "Qui l'attivita non chiede di produrre molto suono, ma di ragionare con metodo: scegli una traccia, separa i livelli di certezza e formula una ricostruzione breve ma fondata.",
    cardTitle: "Leggi la fonte con metodo",
    meta: [
      { label: "Durata", value: "12 minuti" },
      { label: "Ti serve", value: "scheda, matita, immagini" },
      { label: "Alla fine", value: "una scheda analitica e leggibile" }
    ],
    steps: [
      "Scegli una sola traccia: immagine, ambiente o reperto.",
      "Scrivi in una colonna cio che puoi osservare con certezza.",
      "Scrivi in una seconda colonna quale uso sonoro ti sembra plausibile.",
      "Chiudi con una frase che distingua apertamente dato, indizio e interpretazione."
    ],
    observe: [
      "Hai separato bene osservazione e ipotesi?",
      "L'interpretazione tiene conto del luogo, del materiale e del gesto?",
      "Stai dicendo dove finisce la prova e dove comincia la ricostruzione?"
    ],
    result: "La tua scheda spiega il passato senza confondere fonte, indizio e fantasia.",
    side: {
      type: "terms",
      items: [
        { term: "Dato", text: "Cio che puoi osservare o documentare direttamente.", example: "reperto, immagine, materiale" },
        { term: "Indizio", text: "Un elemento che orienta l'interpretazione ma non la chiude.", example: "usura, foro, gesto" },
        { term: "Ipotesi", text: "Una ricostruzione plausibile fondata su piu indizi.", example: "uso sonoro possibile" }
      ]
    },
    panels: [
      {
        title: "Gradi di certezza",
        kind: "timeline",
        items: [
          { label: "A", title: "Osservazione", text: "Descrivi il materiale, l'immagine o il contesto senza aggiungere ancora spiegazioni.", note: "certo" },
          { label: "B", title: "Connessione", text: "Collega due o tre indizi che fanno pensare a un uso sonoro possibile.", note: "plausibile" },
          { label: "C", title: "Interpretazione", text: "Formula una ricostruzione prudente, dichiarando il suo grado di incertezza.", note: "ipotetico" }
        ]
      },
      {
        title: "Domande di controllo",
        kind: "prompts",
        items: [
          "Hai scritto almeno un elemento osservabile prima dell'ipotesi?",
          "La funzione proposta dipende davvero dalla traccia scelta?",
          "La tua scheda dichiara con onesta il proprio margine di incertezza?"
        ]
      }
    ],
    promptsTitle: "Controlla il metodo",
    prompts: [
      "Quale elemento della tua scheda e davvero certo?",
      "Dove comincia l'interpretazione?",
      "Che cosa ti impedisce di raccontare il passato con troppa sicurezza?"
    ]
  },
  followupTitle: "Dopo l'esplorazione, stringi il metodo e rendi la scheda piu leggibile",
  followupIntro: "Questa lezione resta soprattutto teorico-esplorativa: esplori una fonte, la analizzi e solo dopo la trasformi in tavola, confronto e restituzione sintetica.",
  followupDefault: "rielaborazione",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Rendi la scheda piu rigorosa",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "la scheda gia scritta" },
        { label: "Alla fine", value: "testo piu chiaro e onesto" }
      ],
      steps: [
        "Sottolinea in un colore i dati e in un altro le ipotesi.",
        "Taglia una frase che suona troppo sicura.",
        "Aggiungi una formula prudente dove serve: forse, potrebbe, e plausibile."
      ],
      observe: [
        "Il lettore capisce subito dove finisce il dato?",
        "L'ipotesi e sostenuta da almeno un indizio?"
      ],
      result: "La tua ricostruzione resta convincente senza diventare arbitraria."
    },
    produzione: {
      label: "Produzione",
      title: "Allestisci una tavola sul paesaggio sonoro preistorico",
      meta: [
        { label: "Durata", value: "10 minuti" },
        { label: "Ti serve", value: "immagine, scheda, parole chiave" },
        { label: "Alla fine", value: "una tavola leggibile dal gruppo" }
      ],
      steps: [
        "Scegli un titolo semplice per il tuo scenario sonoro.",
        "Disponi immagine, reperto e funzione in ordine chiaro.",
        "Chiudi con una riga che distingua prova e ipotesi."
      ],
      observe: [
        "L'occhio capisce il percorso senza spiegazioni lunghe?",
        "La funzione sonora proposta e leggibile?"
      ],
      result: "Il gruppo puo leggere la tua tavola come una ricostruzione ragionata."
    },
    condivisione: {
      label: "Condivisione",
      title: "Confronta due ricostruzioni",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "due schede di gruppo" },
        { label: "Alla fine", value: "vedi differenze di metodo" }
      ],
      steps: [
        "Ascolta la spiegazione di un altro gruppo.",
        "Segna un dato forte e un'ipotesi fragile.",
        "Restituisci il commento usando parole storiche, non giudizi frettolosi."
      ],
      observe: [
        "L'altro gruppo distingue bene i livelli di certezza?",
        "Usa l'ambiente per sostenere l'interpretazione?"
      ],
      result: "Capisci che ricostruire il passato richiede metodo condiviso."
    },
    valutazione: {
      label: "Valutazione",
      title: "Controlla che cosa sai sostenere",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "usi un lessico storico piu preciso" }
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Che cosa manca alla preistoria sonora?",
          options: [
            {
              id: "q1a",
              label: "Registrazioni e notazioni dirette dei suoni.",
              correct: true,
              feedback: "Esatto. Per questo lavoriamo su tracce indirette e ricostruzioni prudenti."
            },
            {
              id: "q1b",
              label: "Ogni tipo di immagine o reperto.",
              correct: false,
              feedback: "Non proprio. Tracce e reperti esistono, ma non parlano da soli."
            }
          ]
        },
        {
          id: "q2",
          prompt: "Che differenza c'e tra dato e ipotesi?",
          options: [
            {
              id: "q2a",
              label: "Il dato si osserva; l'ipotesi collega piu indizi in modo plausibile.",
              correct: true,
              feedback: "Esatto. La ricostruzione storica nasce da questa distinzione."
            },
            {
              id: "q2b",
              label: "Sono due parole equivalenti per dire la stessa cosa.",
              correct: false,
              feedback: "No. Confonderle porta a racconti poco rigorosi."
            }
          ]
        },
        {
          id: "q3",
          prompt: "Perche l'ambiente conta nello studio del suono preistorico?",
          options: [
            {
              id: "q3a",
              label: "Perche eco, materiali e spazi modificano il modo di produrre e ascoltare il suono.",
              correct: true,
              feedback: "Esatto. Il paesaggio non e sfondo neutro: partecipa all'esperienza sonora."
            },
            {
              id: "q3b",
              label: "Perche basta conoscere il clima per sapere tutta la musica del tempo.",
              correct: false,
              feedback: "No. L'ambiente aiuta, ma non sostituisce il lavoro sulle fonti."
            }
          ]
        }
      ],
      selfCheck: [
        "Riesci a distinguere dato, indizio e ipotesi?",
        "Riesci a spiegare perche non abbiamo una prova sonora diretta?",
        "Riesci a usare il contesto per sostenere una ricostruzione?"
      ]
    },
    chiusura: {
      label: "Chiusura",
      title: "Porta via il metodo",
      line: "Il suono delle origini non si ascolta come un documento diretto: si ricostruisce leggendo tracce, luoghi e pratiche con prudenza.",
      bridge: "Nella lezione successiva vedrai che il suono non serve solo a esistere: orienta il gruppo, segnala, coordina e accompagna azioni collettive."
    }
  }
};
function SuonoNellaPreistoriaLesson() {
  return /* @__PURE__ */ React3.createElement(OriginiTopicLesson, { lesson });
}
export {
  SuonoNellaPreistoriaLesson as default
};
