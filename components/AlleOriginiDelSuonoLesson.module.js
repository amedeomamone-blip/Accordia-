// components/AlleOriginiDelSuonoLesson.jsx
import React3 from "https://esm.sh/react@18";

// components/OriginiTopicLessonTemplate.module.js
import React2, { useState as useState2 } from "https://esm.sh/react@18";
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
function ImageFigure({ image }) {
  if (!image?.src) {
    return null;
  }
  return /* @__PURE__ */ React.createElement("figure", { className: "lesson-figure" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-figure__media" }, /* @__PURE__ */ React.createElement("img", { src: image.src, alt: image.alt || image.title || "" })), image.label || image.title || image.caption || image.credit ? /* @__PURE__ */ React.createElement("figcaption", { className: "lesson-figure__body" }, image.label ? /* @__PURE__ */ React.createElement("p", { className: "lesson-mini-title" }, image.label) : null, image.title ? /* @__PURE__ */ React.createElement("strong", null, image.title) : null, image.caption ? /* @__PURE__ */ React.createElement("p", null, image.caption) : null, image.credit ? /* @__PURE__ */ React.createElement("span", { className: "lesson-figure__credit" }, image.credit) : null) : null);
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
  if (spec.type === "image") {
    return /* @__PURE__ */ React2.createElement(ImageFigure, { image: spec });
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
  if (panel.kind === "flow") {
    return /* @__PURE__ */ React2.createElement(FlowBoard, { items: panel.items, ariaLabel: panel.ariaLabel || panel.title || "Schema essenziale" });
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
    /* @__PURE__ */ React2.createElement("div", { className: "lesson-followup" }, /* @__PURE__ */ React2.createElement(PhaseTabs, { items: tabs, selected, onSelect, ariaLabel: "Fasi successive della lezione" }), /* @__PURE__ */ React2.createElement("div", { className: "lesson-followup__panel" }, selected === "chiusura" ? /* @__PURE__ */ React2.createElement("div", { className: "lesson-closing" }, /* @__PURE__ */ React2.createElement("p", { className: "lesson-closing__line" }, phase.line), /* @__PURE__ */ React2.createElement("p", { className: "lesson-closing__bridge" }, phase.bridge)) : selected === "valutazione" ? /* @__PURE__ */ React2.createElement(Panel, { kicker: phase.label, title: phase.title, meta: phase.meta }, /* @__PURE__ */ React2.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React2.createElement(QuizList, { questions: phase.quiz }), /* @__PURE__ */ React2.createElement(SelfCheckList, { items: phase.selfCheck }))) : /* @__PURE__ */ React2.createElement("div", { className: "lesson-stack" }, /* @__PURE__ */ React2.createElement(Panel, { kicker: phase.label, title: phase.title, meta: phase.meta }, /* @__PURE__ */ React2.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React2.createElement(StepList, { title: phase.stepsTitle || "Fai cosi", items: phase.steps }), /* @__PURE__ */ React2.createElement("div", { className: "lesson-stack" }, /* @__PURE__ */ React2.createElement(PromptList, { title: phase.observeTitle || "Osserva", items: phase.observe }), /* @__PURE__ */ React2.createElement(ResultCallout, { label: phase.resultLabel || "Alla fine", text: phase.result })))), /* @__PURE__ */ React2.createElement(PanelCollection, { panels: phase.panels }))))
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

// components/AlleOriginiDelSuonoLesson.jsx
var lesson = {
  model: {
    id: "teorico-introduttiva",
    label: "Lezione teorico-introduttiva",
    theoryShare: 70,
    practiceShare: 30
  },
  title: "Alle origini del suono",
  question: "Come facciamo a parlare delle origini del suono se nessuno le ha registrate?",
  subtitle: "Partiamo da tracce, immagini, reperti e scene collettive. Non per inventare liberamente, ma per costruire domande fondate e idee guida per tutto il nucleo.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Alle origini del suono" }
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: null,
    homeHref: "../../../../index.html"
  },
  meta: [
    { label: "Durata", value: "1 ora e 30" },
    { label: "Ti serve", value: "immagini, voce, quaderno" },
    { label: "Obiettivo", value: "capire come si studiano le origini del suono" }
  ],
  opening: {
    title: "La musica e iniziata, ma il suo inizio non e registrato",
    intro: "La domanda iniziale non chiede una data esatta. Chiede di capire da quali tracce possiamo partire quando il passato non ci lascia audio o spartiti.",
    cardTitle: "Guarda prima di concludere",
    meta: [
      { label: "Durata", value: "3 minuti" },
      { label: "Ti serve", value: "immagine introduttiva" },
      { label: "Alla fine", value: "separi subito osservazione e fantasia" }
    ],
    steps: [
      "Osserva l'immagine senza cercare subito una risposta definitiva.",
      "Nomina due elementi che vedi con certezza.",
      "Aggiungi una sola ipotesi su che ruolo poteva avere il suono in quella scena."
    ],
    observe: [
      "Vedi corpi, movimento, gruppo o oggetti?",
      "Che cosa puoi dire con sicurezza e che cosa stai invece immaginando?",
      "La scena ti fa pensare a richiamo, danza, rito o lavoro condiviso?"
    ],
    result: "Capisci che le origini del suono si studiano partendo da indizi, non da registrazioni.",
    side: {
      type: "image",
      src: "../../../../assets/lesson/corpo-voce-gesto/lascaux-painting.jpg",
      alt: "Pittura rupestre con figure animali e movimento collettivo",
      label: "Immagine introduttiva",
      title: "Traccia visiva",
      caption: "Una scena antica non ci fa sentire il suono, ma ci aiuta a porre domande su gesto, gruppo, ambiente e funzione."
    }
  },
  exploration: {
    title: "Non resta il suono. Restano le tracce.",
    intro: "Per parlare delle origini del suono servono occhi attenti e parole prudenti. Le fonti scolastiche ricordano che lavoriamo su resti materiali, immagini, ambienti e ipotesi plausibili.",
    layout: "essay-side",
    cardsPosition: "after",
    side: {
      type: "timeline",
      ariaLabel: "Mini timeline del nucleo",
      items: [
        {
          label: "01",
          title: "Tracce e domande",
          text: "Prima impariamo a leggere immagini, reperti e contesti senza trasformarli subito in certezze.",
          note: "cornice"
        },
        {
          label: "02",
          title: "Battito comune",
          text: "Poi osserviamo come il gruppo organizza il tempo con ritmo, pulsazione e accenti.",
          note: "ritmo"
        },
        {
          label: "03",
          title: "Corpo e voce",
          text: "Il corpo diventa il primo laboratorio in cui un gesto si fa suono leggibile.",
          note: "corpo"
        },
        {
          label: "04",
          title: "Oggetti che suonano",
          text: "Alcuni materiali smettono di essere solo cose e diventano risorse sonore stabili.",
          note: "oggetti"
        },
        {
          label: "05",
          title: "Gruppo e rito",
          text: "Infine vediamo come il suono aiuta un gruppo a chiamare, celebrare, ricordare e riconoscersi.",
          note: "comunita"
        }
      ]
    },
    paragraphs: [
      "Non sappiamo come suonasse davvero un momento musicale di migliaia di anni fa. Possiamo pero leggere il tipo di ambiente, i segni lasciati da un oggetto, le immagini di gruppo e il modo in cui corpo e gesto tornano nelle ricostruzioni storiche.",
      "Questo e il punto piu importante della lezione: non stiamo cercando la favola del primo musicista. Stiamo imparando un metodo semplice per distinguere dato, indizio e ipotesi.",
      "Le fonti didattiche del progetto insistono anche su un'altra idea utile: la musica nasce dentro relazioni, cooperazione, movimento, ascolto condiviso, oggetti sonori e voce. Ecco perche il nucleo usera spesso cinque parole: corpo, ritmo, ambiente, oggetti, gruppo."
    ],
    questionsTitle: "Domande guida",
    questions: [
      "Da dove nasce la musica: da uno strumento, dal corpo, dal gruppo o da tutti questi elementi insieme?",
      "Perche immagini e reperti non bastano da soli, se non li colleghiamo a un contesto?",
      "Quali idee ci serviranno di piu nelle prossime lezioni?"
    ],
    cards: [
      {
        title: "Corpo",
        caption: "Mani, piedi, respiro e voce sono le prime risorse sempre disponibili.",
        chips: ["gesto", "voce", "battito"]
      },
      {
        title: "Ritmo",
        caption: "Una ripetizione condivisa aiuta il gruppo a sentire un ordine.",
        chips: ["pulsazione", "accento"]
      },
      {
        title: "Ambiente",
        caption: "Eco, acqua, pietra, vento e spazio cambiano il modo in cui un suono viene percepito.",
        chips: ["luogo", "risonanza"]
      },
      {
        title: "Oggetti",
        caption: "Osso, legno, pietra e altri materiali possono diventare risorse sonore se usati con intenzione.",
        chips: ["materia", "timbro"]
      },
      {
        title: "Gruppo",
        caption: "Il suono chiama, coordina, celebra, ricorda e costruisce appartenenza.",
        chips: ["insieme", "funzione"]
      }
    ],
    evidence: [
      {
        label: "Traccia materiale",
        title: "Oggetto forato, uso discusso",
        body: "Un reperto come il flauto di Divje Babe e importante proprio perche obbliga a essere prudenti: puo aprire ipotesi forti, ma non basta da solo a chiudere il problema.",
        image: {
          src: "../../../../assets/lesson/corpo-voce-gesto/divje-babe-flute.jpg",
          alt: "Reperto del flauto di Divje Babe"
        }
      },
      {
        label: "Corpo in azione",
        title: "Il primo laboratorio sempre disponibile",
        body: "Anche quando non abbiamo strumenti complessi, il corpo ci ricorda che battito, gesto e voce possono gia organizzare il suono.",
        image: {
          src: "../../../../assets/lesson/corpo-voce-gesto/hands-clapping.jpg",
          alt: "Mani che producono una percussione corporea"
        }
      },
      {
        label: "Fonte didattica",
        title: "Dalla traccia alla domanda",
        body: "Le fonti usate nel progetto insistono su ascolto, corpo, oggetti sonori, cooperazione e codificazioni semplici: il passato si apre meglio quando il metodo resta chiaro."
      }
    ],
    panels: [
      {
        title: "Tre parole da tenere vicine",
        kind: "terms",
        items: [
          { term: "Dato", text: "Cio che possiamo mostrare o descrivere direttamente.", example: "reperto / immagine" },
          { term: "Indizio", text: "Cio che orienta la lettura ma non chiude il significato.", example: "foro / gesto / usura" },
          { term: "Ipotesi", text: "Una spiegazione plausibile costruita mettendo insieme piu tracce.", example: "uso sonoro" }
        ]
      }
    ]
  },
  active: {
    title: "Prova a leggere una fonte senza correre troppo",
    intro: "L'attivita e leggera ma importante: alleni il metodo che userai nel resto del nucleo. Guardi una traccia, separi i livelli di certezza e costruisci una spiegazione breve.",
    cardTitle: "Dato, indizio, ipotesi",
    meta: [
      { label: "Durata", value: "12 minuti" },
      { label: "Ti serve", value: "scheda o quaderno" },
      { label: "Alla fine", value: "una lettura breve ma ordinata" }
    ],
    steps: [
      "Scegli una traccia: immagine, oggetto o scena collettiva.",
      "Scrivi che cosa puoi osservare con certezza.",
      "Aggiungi un indizio che ti fa pensare a un possibile uso sonoro.",
      "Chiudi con una sola ipotesi, usando parole prudenti come forse o potrebbe."
    ],
    observe: [
      "Hai separato cio che vedi da cio che deduci?",
      "La tua ipotesi nasce davvero da una traccia concreta?",
      "Stai usando un linguaggio semplice ma onesto?"
    ],
    result: "Sai parlare delle origini del suono senza confondere osservazione e fantasia.",
    side: {
      type: "terms",
      items: [
        { term: "Osservo", text: "Descrivo la traccia senza aggiungere ancora spiegazioni.", example: "vedo / noto" },
        { term: "Collego", text: "Metto in relazione dettaglio, ambiente e gesto possibile.", example: "forse serviva a" },
        { term: "Ipotizzo", text: "Formulo una spiegazione breve e plausibile.", example: "potrebbe indicare" }
      ]
    },
    panels: [
      {
        title: "Come leggiamo una fonte",
        kind: "timeline",
        items: [
          { label: "A", title: "Parti dal visibile", text: "Nomina immagine, materiale, gruppo o luogo prima di tutto.", note: "dato" },
          { label: "B", title: "Cerca una relazione", text: "Chiediti che cosa fa quel dettaglio dentro una scena o un oggetto.", note: "indizio" },
          { label: "C", title: "Formula una risposta prudente", text: "Scrivi un'ipotesi breve, fondata e dichiarata come tale.", note: "ipotesi" }
        ]
      },
      {
        title: "Frase guida",
        kind: "text",
        paragraphs: [
          "Possiamo parlare delle origini del suono solo se dichiariamo con chiarezza che cosa osserviamo e che cosa stiamo ricostruendo."
        ]
      }
    ],
    promptsTitle: "Controlla il passaggio",
    prompts: [
      "Qual e la parte piu certa della tua scheda?",
      "Dove comincia la tua interpretazione?",
      "Quale parola ti aiuta a restare prudente senza diventare vago?"
    ]
  },
  followupTitle: "Dopo la cornice, rendi visibile la mappa che terra insieme il nucleo",
  followupIntro: "Questa prima lezione non deve accumulare troppi contenuti: deve chiarire il contesto, lasciare immagini forti e preparare bene il terreno alle lezioni operative.",
  followupDefault: "rielaborazione",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Costruisci la mappa concettuale finale",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "foglio o lavagna" },
        { label: "Alla fine", value: "hai il lessico-guida del nucleo" }
      ],
      steps: [
        "Scrivi al centro la parola suono.",
        "Attorno metti cinque nodi: corpo, ritmo, ambiente, oggetti, gruppo.",
        "Aggiungi una freccia o una frase breve tra i nodi che senti piu vicini."
      ],
      observeTitle: "Controlla la mappa",
      observe: [
        "Hai usato parole semplici e leggibili?",
        "La mappa fa capire che la musica nasce da piu elementi insieme?",
        "Si vede gia il percorso delle prossime lezioni?"
      ],
      result: "Il nucleo non parte da un elenco: parte da una mappa chiara e condivisa.",
      panels: [
        {
          title: "Mappa concettuale finale",
          kind: "cards",
          columns: 3,
          items: [
            { title: "Corpo", caption: "Produce gesto, voce, battito e respiro.", chips: ["mani", "voce"] },
            { title: "Ritmo", caption: "Organizza il tempo e rende leggibile il ritorno.", chips: ["pulsazione", "accento"] },
            { title: "Ambiente", caption: "Aggiunge eco, spazio, materia e condizioni di ascolto.", chips: ["luogo", "risonanza"] },
            { title: "Oggetti", caption: "Trasformano materiali naturali in risorse sonore stabili.", chips: ["osso", "legno"] },
            { title: "Gruppo", caption: "Dai suoni un uso: chiamare, coordinare, celebrare, ricordare.", chips: ["insieme", "rito"] }
          ]
        }
      ]
    },
    produzione: {
      label: "Produzione",
      title: "Completa una scheda-ponte",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "quaderno" },
        { label: "Alla fine", value: "una frase guida personale" }
      ],
      steps: [
        "Completa la frase: delle origini del suono non abbiamo..., ma abbiamo....",
        "Aggiungi due parole tra corpo, ritmo, ambiente, oggetti, gruppo.",
        "Chiudi con una domanda che vuoi portare nella prossima lezione."
      ],
      observe: [
        "La tua frase distingue bene assenza di registrazioni e presenza di tracce?",
        "Le due parole scelte sono davvero centrali per te?"
      ],
      result: "Produci una scheda breve che fa da ponte verso il lavoro successivo."
    },
    condivisione: {
      label: "Condivisione",
      title: "Confronta due mappe",
      meta: [
        { label: "Durata", value: "5 minuti" },
        { label: "Ti serve", value: "due schede di gruppo" },
        { label: "Alla fine", value: "vedi che cosa torna davvero" }
      ],
      steps: [
        "Guarda la mappa di un altro gruppo.",
        "Segna un nodo uguale al tuo e un collegamento diverso.",
        "Spiegate insieme quale parola vi sembra piu importante per iniziare il nucleo."
      ],
      observe: [
        "Le mappe coincidono sui concetti centrali?",
        "Le differenze nascono da parole diverse o da idee davvero diverse?"
      ],
      result: "Capisci quali idee il gruppo sente piu stabili gia dalla prima lezione."
    },
    valutazione: {
      label: "Valutazione",
      title: "Controlla le idee essenziali",
      meta: [
        { label: "Durata", value: "5 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "riconosci il punto di partenza del nucleo" }
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Che cosa non possediamo per studiare il suono del passato remoto?",
          options: [
            {
              id: "q1a",
              label: "Registrazioni dirette o spartiti delle origini.",
              correct: true,
              feedback: "Esatto. Proprio per questo partiamo da tracce e ipotesi fondate."
            },
            {
              id: "q1b",
              label: "Ogni tipo di fonte visiva o materiale.",
              correct: false,
              feedback: "Non proprio. Le tracce visive e materiali esistono, ma vanno lette con prudenza."
            }
          ]
        },
        {
          id: "q2",
          prompt: "Qual e la differenza tra dato e ipotesi?",
          options: [
            {
              id: "q2a",
              label: "Il dato si osserva; l'ipotesi collega piu tracce e propone una spiegazione.",
              correct: true,
              feedback: "Esatto. Il metodo parte proprio da questa distinzione."
            },
            {
              id: "q2b",
              label: "Sono la stessa cosa, cambiano solo le parole usate.",
              correct: false,
              feedback: "No. Se li confondiamo, raccontiamo il passato in modo poco chiaro."
            }
          ]
        },
        {
          id: "q3",
          prompt: "Quali parole guideranno il nucleo?",
          options: [
            {
              id: "q3a",
              label: "Corpo, ritmo, ambiente, oggetti, gruppo.",
              correct: true,
              feedback: "Esatto. Sono i cinque nodi che ritroverai nelle lezioni successive."
            },
            {
              id: "q3b",
              label: "Solo strumenti, autori e date.",
              correct: false,
              feedback: "Non qui. Questo nucleo parte da esperienze, funzioni e tracce."
            }
          ]
        },
        {
          id: "q4",
          prompt: "Perche questa prima lezione e utile?",
          options: [
            {
              id: "q4a",
              label: "Perche chiarisce il contesto e il metodo prima delle attivita operative.",
              correct: true,
              feedback: "Esatto. Ti prepara bene a leggere le lezioni successive."
            },
            {
              id: "q4b",
              label: "Perche spiega gia tutta la storia della musica antica.",
              correct: false,
              feedback: "No. Qui costruiamo la cornice, non un'enciclopedia."
            }
          ]
        }
      ],
      selfCheck: [
        "Sai spiegare da quali fonti possiamo partire?",
        "Sai distinguere dato, indizio e ipotesi?",
        "Sai nominare le cinque idee guida del nucleo?"
      ]
    },
    chiusura: {
      label: "Chiusura",
      title: "Porta con te la domanda giusta",
      line: "Le origini del suono non si ascoltano direttamente: si ricostruiscono leggendo tracce, corpi, oggetti e scene di gruppo con attenzione.",
      bridge: "Adesso il percorso puo diventare operativo: nella prossima lezione entri nel battito comune e distingui ritmo, pulsazione e tempo."
    }
  }
};
function AlleOriginiDelSuonoLesson() {
  return /* @__PURE__ */ React3.createElement(OriginiTopicLesson, { lesson });
}
export {
  AlleOriginiDelSuonoLesson as default
};
