// components/OriginiTopicLessonTemplate.jsx
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
function LessonHero({ title, question, breadcrumbs, heroGuide }) {
  return /* @__PURE__ */ React.createElement("header", { className: "lesson-hero" }, /* @__PURE__ */ React.createElement(LessonBreadcrumb, { items: breadcrumbs }), /* @__PURE__ */ React.createElement("div", { className: "lesson-shell lesson-hero__copy" }, /* @__PURE__ */ React.createElement("h1", { className: "lesson-hero__title" }, title), /* @__PURE__ */ React.createElement("p", { className: "lesson-hero__question" }, question), heroGuide ? /* @__PURE__ */ React.createElement("p", { className: "lesson-hero__guide" }, heroGuide) : null));
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

// components/OriginiTopicLessonTemplate.jsx
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
function ConceptMapBoard({ centerTitle, branches, ariaLabel }) {
  return /* @__PURE__ */ React2.createElement("div", { className: "lesson-map-board", "aria-label": ariaLabel || centerTitle }, /* @__PURE__ */ React2.createElement("div", { className: "lesson-map-board__center" }, centerTitle), /* @__PURE__ */ React2.createElement("div", { className: cn("lesson-card-grid", branches.length <= 4 ? "lesson-card-grid--two" : "lesson-card-grid--three") }, branches.map((branch) => /* @__PURE__ */ React2.createElement("article", { key: branch.title, className: "lesson-key-card" }, /* @__PURE__ */ React2.createElement("strong", null, branch.title), branch.text ? /* @__PURE__ */ React2.createElement("p", { className: "lesson-body-text" }, branch.text) : null, branch.items?.length ? /* @__PURE__ */ React2.createElement("div", { className: "lesson-chip-row" }, branch.items.map((item) => /* @__PURE__ */ React2.createElement("span", { key: `${branch.title}-${item}`, className: "lesson-chip" }, item))) : null))));
}
function GraphicScoreBoard({ items, ariaLabel }) {
  return /* @__PURE__ */ React2.createElement("div", { className: "lesson-score-board", "aria-label": ariaLabel || "Legenda per partitura grafica" }, items.map((item) => /* @__PURE__ */ React2.createElement("div", { key: item.label, className: "lesson-score-board__row" }, /* @__PURE__ */ React2.createElement("strong", null, item.label), /* @__PURE__ */ React2.createElement("div", { className: "lesson-score-board__pattern", "aria-hidden": "true" }, item.pattern.map((token, index) => /* @__PURE__ */ React2.createElement("span", { key: `${item.label}-${token}-${index}`, className: cn("lesson-score-token", `lesson-score-token--${token}`) }, token === "arrow" ? "\u2192" : token === "cut" ? "|" : token === "gap" ? " " : ""))), /* @__PURE__ */ React2.createElement("p", null, item.text))));
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
  if (panel.kind === "map") {
    return /* @__PURE__ */ React2.createElement(ConceptMapBoard, { centerTitle: panel.centerTitle, branches: panel.branches, ariaLabel: panel.ariaLabel || panel.title });
  }
  if (panel.kind === "score") {
    return /* @__PURE__ */ React2.createElement(GraphicScoreBoard, { items: panel.items, ariaLabel: panel.ariaLabel || panel.title });
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
function OpeningSection({ lesson }) {
  return /* @__PURE__ */ React2.createElement(LessonSection, { id: "apertura", title: lesson.opening.title, intro: lesson.opening.intro }, /* @__PURE__ */ React2.createElement(Panel, { title: lesson.opening.cardTitle, meta: lesson.opening.meta }, /* @__PURE__ */ React2.createElement(
    ActivityLayout,
    {
      steps: lesson.opening.steps,
      observe: lesson.opening.observe,
      result: lesson.opening.result,
      right: /* @__PURE__ */ React2.createElement(VisualSpec, { spec: lesson.opening.side, fallbackTotal: lesson.opening.timerTotal || 30 })
    }
  )));
}
function ExplorationSection({ lesson }) {
  const exploration = lesson.exploration;
  const cards = exploration.cards?.length ? /* @__PURE__ */ React2.createElement(KeyCardGrid, { items: exploration.cards, columns: exploration.cardsColumns || 3 }) : null;
  const side = exploration.side ? /* @__PURE__ */ React2.createElement(VisualSpec, { spec: exploration.side }) : exploration.flow?.length ? /* @__PURE__ */ React2.createElement(FlowBoard, { items: exploration.flow, ariaLabel: exploration.flowLabel || "Passaggi principali dell'argomento" }) : null;
  const copy = /* @__PURE__ */ React2.createElement("div", { className: "lesson-stack" }, exploration.paragraphs.map((paragraph) => /* @__PURE__ */ React2.createElement("p", { key: paragraph, className: "lesson-body-text" }, paragraph)), exploration.questions?.length ? /* @__PURE__ */ React2.createElement(PromptList, { title: exploration.questionsTitle || "Osserva", items: exploration.questions }) : null);
  return /* @__PURE__ */ React2.createElement(LessonSection, { id: "esplorazione", title: exploration.title, intro: exploration.intro, tone: "soft" }, exploration.cardsPosition !== "after" ? cards : null, side ? /* @__PURE__ */ React2.createElement("div", { className: cn("lesson-grid", exploration.layout === "essay-side" ? "lesson-grid--asym" : "lesson-grid--two") }, copy, side) : copy, exploration.cardsPosition === "after" ? cards : null, exploration.evidence?.length ? /* @__PURE__ */ React2.createElement(EvidenceStrip, { items: exploration.evidence }) : null, /* @__PURE__ */ React2.createElement(PanelCollection, { panels: exploration.panels }));
}
function ActiveSection({ lesson }) {
  const active = lesson.active;
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
function FollowupSection({ lesson, selected, onSelect }) {
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
    /* @__PURE__ */ React2.createElement("div", { className: "lesson-followup" }, /* @__PURE__ */ React2.createElement(PhaseTabs, { items: tabs, selected, onSelect, ariaLabel: "Fasi successive della lezione" }), /* @__PURE__ */ React2.createElement("div", { className: "lesson-followup__panel" }, selected === "chiusura" ? /* @__PURE__ */ React2.createElement("div", { className: "lesson-closing" }, /* @__PURE__ */ React2.createElement("p", { className: "lesson-closing__line" }, phase.line), /* @__PURE__ */ React2.createElement("p", { className: "lesson-closing__bridge" }, phase.bridge)) : selected === "valutazione" ? /* @__PURE__ */ React2.createElement("div", { className: "lesson-stack" }, /* @__PURE__ */ React2.createElement(Panel, { kicker: phase.label, title: phase.title, meta: phase.meta }, /* @__PURE__ */ React2.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React2.createElement(QuizList, { questions: phase.quiz }), /* @__PURE__ */ React2.createElement(SelfCheckList, { items: phase.selfCheck }))), /* @__PURE__ */ React2.createElement(PanelCollection, { panels: phase.panels })) : /* @__PURE__ */ React2.createElement("div", { className: "lesson-stack" }, /* @__PURE__ */ React2.createElement(Panel, { kicker: phase.label, title: phase.title, meta: phase.meta }, /* @__PURE__ */ React2.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React2.createElement(StepList, { title: phase.stepsTitle || "Fai cosi", items: phase.steps }), /* @__PURE__ */ React2.createElement("div", { className: "lesson-stack" }, /* @__PURE__ */ React2.createElement(PromptList, { title: phase.observeTitle || "Osserva", items: phase.observe }), /* @__PURE__ */ React2.createElement(ResultCallout, { label: phase.resultLabel || "Alla fine", text: phase.result })))), /* @__PURE__ */ React2.createElement(PanelCollection, { panels: phase.panels }))))
  );
}
function OriginiTopicLesson({ lesson }) {
  const activeId = useActiveSection(["apertura", "esplorazione", "comprensione-attiva", "rielaborazione"]);
  const [selectedFollowup, setSelectedFollowup] = useState2(lesson.followupDefault || "produzione");
  return /* @__PURE__ */ React2.createElement("div", { className: "lesson-editorial-page", "data-lesson-model": lesson.model?.id || "" }, /* @__PURE__ */ React2.createElement(
    LessonHero,
    {
      title: lesson.title,
      question: lesson.question,
      heroGuide: lesson.heroGuide,
      subtitle: lesson.subtitle,
      heroNote: lesson.heroNote,
      breadcrumbs: lesson.breadcrumbs,
      heroWord: lesson.heroWord,
      heroPrelude: lesson.heroPrelude,
      heroEcho: lesson.heroEcho,
      heroTags: lesson.heroTags
    }
  ), /* @__PURE__ */ React2.createElement(MetaStrip, { items: lesson.meta || lesson.opening.meta }), /* @__PURE__ */ React2.createElement(
    LessonProgress,
    {
      items: lesson.progress || DEFAULT_PROGRESS,
      activeId,
      selectedFollowup,
      onSelectFollowup: setSelectedFollowup
    }
  ), /* @__PURE__ */ React2.createElement(OpeningSection, { lesson }), /* @__PURE__ */ React2.createElement(ExplorationSection, { lesson }), /* @__PURE__ */ React2.createElement(ActiveSection, { lesson }), /* @__PURE__ */ React2.createElement(FollowupSection, { lesson, selected: selectedFollowup, onSelect: setSelectedFollowup }), /* @__PURE__ */ React2.createElement(
    LessonBottomBar,
    {
      mapHref: lesson.navigation.mapHref,
      previousHref: lesson.navigation.previousHref,
      homeHref: lesson.navigation.homeHref
    }
  ));
}
export {
  OriginiTopicLesson as default
};
