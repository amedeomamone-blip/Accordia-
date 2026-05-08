// components/CorpoVoceGestoLesson.jsx
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
    /* @__PURE__ */ React2.createElement("div", { className: "lesson-followup" }, /* @__PURE__ */ React2.createElement(PhaseTabs, { items: tabs, selected, onSelect, ariaLabel: "Fasi successive della lezione" }), /* @__PURE__ */ React2.createElement("div", { className: "lesson-followup__panel" }, selected === "chiusura" ? /* @__PURE__ */ React2.createElement("div", { className: "lesson-closing" }, /* @__PURE__ */ React2.createElement("p", { className: "lesson-closing__line" }, phase.line), /* @__PURE__ */ React2.createElement("p", { className: "lesson-closing__bridge" }, phase.bridge)) : selected === "valutazione" ? /* @__PURE__ */ React2.createElement("div", { className: "lesson-stack" }, /* @__PURE__ */ React2.createElement(Panel, { kicker: phase.label, title: phase.title, meta: phase.meta }, /* @__PURE__ */ React2.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React2.createElement(QuizList, { questions: phase.quiz }), /* @__PURE__ */ React2.createElement(SelfCheckList, { items: phase.selfCheck }))), /* @__PURE__ */ React2.createElement(PanelCollection, { panels: phase.panels })) : /* @__PURE__ */ React2.createElement("div", { className: "lesson-stack" }, /* @__PURE__ */ React2.createElement(Panel, { kicker: phase.label, title: phase.title, meta: phase.meta }, /* @__PURE__ */ React2.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React2.createElement(StepList, { title: phase.stepsTitle || "Fai cosi", items: phase.steps }), /* @__PURE__ */ React2.createElement("div", { className: "lesson-stack" }, /* @__PURE__ */ React2.createElement(PromptList, { title: phase.observeTitle || "Osserva", items: phase.observe }), /* @__PURE__ */ React2.createElement(ResultCallout, { label: phase.resultLabel || "Alla fine", text: phase.result })))), /* @__PURE__ */ React2.createElement(PanelCollection, { panels: phase.panels }))))
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
      heroGuide: lesson2.heroGuide,
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

// components/CorpoVoceGestoLesson.jsx
var lesson = {
  model: {
    id: "laboratoriale-espressiva",
    label: "Lezione laboratoriale",
    theoryShare: 35,
    practiceShare: 65
  },
  title: "Corpo, voce e gesto",
  question: "Costruire una scena sonora senza strumenti",
  heroGuide: "La musica comincia quando un suono smette di essere casuale e diventa una scelta.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Corpo, voce e gesto" }
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: "../ritmo-pulsazione-tempo/index.html",
    homeHref: "../../../../index.html"
  },
  meta: [
    { label: "Durata", value: "2 ore" },
    { label: "Ti serve", value: "corpo, voce, aula, foglio" },
    { label: "Obiettivo", value: "costruire una scena sonora riconoscibile" }
  ],
  opening: {
    title: "Ascoltare quello che c'e gia",
    intro: "Prima di cercare uno strumento, ascolta quello che hai gia: respiro, mani, piedi, voce, banco, sedia. Ogni suono puo restare casuale oppure diventare intenzionale. La differenza la fai tu.",
    cardTitle: "30 secondi di ascolto",
    meta: [
      { label: "Durata", value: "30 secondi" },
      { label: "Ti serve", value: "silenzio e attenzione" },
      { label: "Alla fine", value: "scegli tre suoni controllabili" }
    ],
    steps: [
      "Resta in silenzio per 30 secondi e ascolta il corpo e l'aula.",
      "Individua un suono secco che riesci a controllare bene.",
      "Individua un suono continuo e un suono leggero.",
      "Scegli il suono che senti piu preciso e piu facile da rifare."
    ],
    observe: [
      "Quale suono nasce chiaramente da una scelta e non da un movimento casuale?",
      "Quale puoi ripetere senza farlo diventare subito troppo forte?",
      "Che cosa cambia quando prepari il gesto prima di far partire il suono?"
    ],
    result: "Riconosci che un suono corporeo puo essere scelto, controllato e ripetuto con intenzione.",
    side: {
      type: "timer",
      total: 30,
      startLabel: "Avvia 30 secondi"
    }
  },
  exploration: {
    title: "Lo stesso suono cambia significato",
    intro: "Prendi un solo suono e trasformalo. Non cambiarne la sorgente: cambia il modo in cui lo fai nascere.",
    layout: "essay-side",
    side: {
      type: "terms",
      items: [
        { term: "Timbro", text: "Il carattere del suono cambia anche se la sorgente resta la stessa.", example: "ruvido / soffice" },
        { term: "Intensita", text: "Quanto il suono si impone nello spazio.", example: "trattenuto / deciso" },
        { term: "Durata", text: "Quanto resta aperto o quanto si chiude in fretta.", example: "breve / lungo" },
        { term: "Silenzio", text: "Lo spazio che prepara, sospende o fa risaltare cio che arriva.", example: "attesa" }
      ]
    },
    paragraphs: [
      "Un passo non significa sempre camminare. Puo sembrare attesa, fuga, esitazione, minaccia, distanza. Il suono non racconta da solo: racconta quando lo trasformi.",
      "Scegli uno dei suoni trovati nell'apertura e provalo almeno in quattro modi diversi. Lavora su vicino e lontano, lento e improvviso, fragile e deciso, pieno e trattenuto.",
      "Mentre provi, emergono parole utili senza interrompere l'esperienza: timbro, intensita, durata, densita, contrasto, silenzio, intenzione."
    ],
    questionsTitle: "Prova e osserva",
    questions: [
      "Che cosa cambia se fai lo stesso suono piu lentamente?",
      "Che cosa cambia se lo fai piu vicino o piu lontano?",
      "Che cosa cambia se lo fai dopo un silenzio?",
      "Il tuo suono sembra un gesto, un ambiente o un'emozione?"
    ],
    panels: [
      {
        title: "Trasforma senza cambiare sorgente",
        kind: "cards",
        columns: 2,
        items: [
          {
            title: "Neutro o teso",
            caption: "Lo stesso gesto puo restare piatto oppure portare una tensione evidente.",
            chips: ["controllo", "pressione"]
          },
          {
            title: "Vicino o lontano",
            caption: "La distanza cambia il modo in cui immagini lo spazio e la presenza del suono.",
            chips: ["spazio", "prossimita"]
          },
          {
            title: "Fragile o deciso",
            caption: "L'energia del gesto modifica il peso espressivo senza cambiare materiale.",
            chips: ["intensita", "attacco"]
          },
          {
            title: "Prima o dopo il silenzio",
            caption: "Un suono isolato dopo una pausa puo orientare tutta la scena.",
            chips: ["attesa", "contrasto"]
          }
        ]
      }
    ]
  },
  active: {
    title: "Dalla sorgente alla scena",
    intro: "Quando piu suoni entrano nello stesso spazio, non basta produrli. Bisogna decidere che ruolo hanno. Un suono puo aprire, accompagnare, interrompere, creare tensione, chiudere. A quel punto non stai solo facendo rumore: stai costruendo una scena sonora.",
    cardTitle: "Corpo -> suono -> intenzione -> scena",
    meta: [
      { label: "Durata", value: "12 minuti" },
      { label: "Ti serve", value: "voce, corpo, ascolto reciproco" },
      { label: "Alla fine", value: "colleghi materiali e funzioni" }
    ],
    steps: [
      "Parti da una sorgente: corpo o voce.",
      "Decidi il gesto che produce il suono: colpire, sfiorare, trascinare, fermare.",
      "Assegna a quel suono una funzione: aprire, accompagnare, interrompere, creare tensione o chiudere.",
      "Metti piu suoni in relazione finche la scena comincia a farsi immaginare."
    ],
    observe: [
      "Quale suono apre meglio la scena?",
      "Quale accompagna senza coprire gli altri?",
      "Dove il silenzio fa respirare o cambiare direzione?"
    ],
    result: "Riconosci che corpo, voce, gesto e silenzio possono costruire una forma sonora condivisa.",
    side: {
      type: "terms",
      items: [
        { term: "Corpo", text: "La sorgente sonora da cui parti.", example: "mani / piedi / postura" },
        { term: "Voce", text: "Materia espressiva anche senza parole.", example: "sussurro / sillaba / respiro" },
        { term: "Gesto", text: "Il modo intenzionale di produrre il suono.", example: "colpire / sfiorare" },
        { term: "Silenzio", text: "Spazio di ascolto, attesa e sospensione.", example: "vuoto attivo" },
        { term: "Gruppo", text: "La forma esiste davvero quando viene condivisa.", example: "entrata comune" }
      ]
    },
    panels: [
      {
        title: "Mappa visiva",
        kind: "map",
        centerTitle: "Scena sonora",
        branches: [
          { title: "Corpo", items: ["mani", "piedi", "respiro", "postura"] },
          { title: "Voce", items: ["sussurro", "sillaba", "suono lungo", "respiro"] },
          { title: "Gesto", items: ["colpire", "sfiorare", "trascinare", "fermare"] },
          { title: "Silenzio", items: ["attesa", "sospensione", "distanza"] },
          { title: "Forma", items: ["inizio", "sviluppo", "tensione", "chiusura"] }
        ]
      },
      {
        title: "Richiamo storico",
        kind: "text",
        paragraphs: [
          "Prima della scrittura musicale, il suono era legato al corpo, al gesto, al rito, al lavoro e al gruppo. Non era ancora brano nel senso moderno: era azione sonora condivisa."
        ]
      }
    ],
    promptsTitle: "Controlla il passaggio",
    prompts: [
      "Un suono in questa scena apre, accompagna, interrompe o chiude?",
      "La voce sta nominando qualcosa oppure resta pura materia sonora?",
      "Il silenzio crea attesa, distanza o sospensione?"
    ]
  },
  followupTitle: "Adesso porta i materiali verso una forma riconoscibile",
  followupIntro: "Qui la lezione diventa davvero autonoma: non state costruendo un pattern ritmico, ma una scena sonora che deve farsi capire con corpo, voce, gesto e silenzio.",
  followupDefault: "produzione",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Progettare una scena sonora",
      meta: [
        { label: "Durata", value: "10 minuti" },
        { label: "Ti serve", value: "gruppo e foglio" },
        { label: "Alla fine", value: "una scena pronta da provare" }
      ],
      steps: [
        "Scegliete una situazione da far percepire senza parole, senza strumenti e senza melodia.",
        "Usate almeno tre sorgenti sonore diverse tra corpo, voce, gesto e superfici vicine.",
        "Inserite almeno un cambiamento di intensita e almeno un momento di silenzio.",
        "Decidete un inizio riconoscibile e una chiusura riconoscibile in 30-40 secondi."
      ],
      observe: [
        "Chi ascolta puo immaginare una scena anche senza conoscere il titolo?",
        "La tensione cresce in un punto preciso oppure tutto resta sullo stesso piano?",
        "Il silenzio ha una funzione chiara dentro la forma?"
      ],
      result: "Ogni gruppo ha un progetto sonoro chiaro prima di eseguire.",
      panels: [
        {
          title: "Situazioni proposte",
          kind: "prompts",
          items: [
            "Una folla che si avvicina",
            "Una stanza vuota",
            "Un temporale che arriva",
            "Un gruppo che lavora insieme",
            "Un segnale di pericolo",
            "Una festa che nasce da lontano",
            "Una fuga improvvisa",
            "Un rito notturno",
            "Una macchina che si mette in moto",
            "Un luogo che lentamente si svuota"
          ]
        },
        {
          title: "Scheda di progettazione",
          kind: "prompts",
          items: [
            "Titolo della scena",
            "Che cosa deve immaginare chi ascolta?",
            "Quali suoni corporei usiamo?",
            "Chi entra per primo?",
            "Dove cresce la tensione?",
            "Dove entra il silenzio?",
            "Come finisce?"
          ]
        }
      ]
    },
    produzione: {
      label: "Produzione",
      title: "Comporre senza strumenti",
      meta: [
        { label: "Durata", value: "15 minuti" },
        { label: "Ti serve", value: "corpo, voce, foglio" },
        { label: "Alla fine", value: "scena e partitura grafica essenziale" }
      ],
      steps: [
        "Provate una prima versione libera.",
        "Eliminate i suoni inutili e tenete solo quelli che fanno capire la scena.",
        "Stabilite l'ordine degli ingressi e il punto di massima tensione.",
        "Decidete dove entra il silenzio e come si sente la chiusura.",
        "Ripetete la scena due volte cercando stabilita."
      ],
      observe: [
        "Si capisce chi entra per primo?",
        "Il silenzio apre spazio o lascia solo vuoto?",
        "La chiusura arriva come scelta comune?"
      ],
      result: "Ogni gruppo realizza una scena sonora eseguibile e una traccia visiva essenziale.",
      panels: [
        {
          title: "Partitura grafica analogica",
          kind: "score",
          items: [
            { label: "Suono leggero", pattern: ["thin"], text: "Linea sottile per i suoni piu delicati o trattenuti." },
            { label: "Suono intenso", pattern: ["thick"], text: "Linea spessa per gli ingressi piu forti o piu vicini." },
            { label: "Colpo breve", pattern: ["dot", "dot", "dot"], text: "Punti per colpi secchi e veloci." },
            { label: "Silenzio", pattern: ["gap", "gap"], text: "Spazio vuoto per attesa, sospensione o arresto." },
            { label: "Crescita", pattern: ["thin", "arrow", "thick"], text: "Freccia per crescita, movimento o avvicinamento." },
            { label: "Densita", pattern: ["cloud", "cloud"], text: "Macchie per accumulo di suoni o sovrapposizione." },
            { label: "Interruzione", pattern: ["cut"], text: "Taglio netto per fermare o spezzare la scena." }
          ]
        },
        {
          title: "Regola di lavoro",
          kind: "text",
          paragraphs: [
            "Non riempite tutto. Il silenzio e materiale musicale."
          ]
        }
      ]
    },
    condivisione: {
      label: "Condivisione",
      title: "Ascolto cieco",
      meta: [
        { label: "Durata", value: "10 minuti" },
        { label: "Ti serve", value: "gruppo, ascolto, appunti" },
        { label: "Alla fine", value: "confronti intenzione e risultato" }
      ],
      steps: [
        "Un gruppo esegue la scena senza dire il titolo.",
        "Gli altri ascoltano in silenzio e scrivono una prima ipotesi.",
        "La classe dice che ambiente o situazione ha immaginato.",
        "Solo dopo il gruppo rivela il titolo e confronta intenzione e risultato."
      ],
      observe: [
        "Che ambiente avete immaginato?",
        "Quale suono vi ha orientato?",
        "Dove avete percepito un cambiamento?",
        "Il silenzio ha creato attesa o confusione?",
        "La scena aveva una chiusura chiara?"
      ],
      result: "Verificate se la composizione comunica davvero anche senza spiegazioni.",
      panels: [
        {
          title: "Procedura",
          kind: "flow",
          items: ["esegui", "ascolta", "ipotizza", "rivela", "confronta"]
        }
      ]
    },
    valutazione: {
      label: "Valutazione",
      title: "Rendere riconoscibile una scelta",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "controlli forma, ascolto e intenzione" }
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Quando un suono corporeo smette di essere casuale?",
          options: [
            {
              id: "q1a",
              label: "Quando viene scelto, controllato e inserito in una forma riconoscibile.",
              correct: true,
              feedback: "Esatto. La scelta e l'organizzazione trasformano il suono in materiale musicale."
            },
            {
              id: "q1b",
              label: "Quando e il piu forte di tutti gli altri suoni.",
              correct: false,
              feedback: "Non basta essere forte. Conta il controllo e la funzione dentro la scena."
            }
          ]
        },
        {
          id: "q2",
          prompt: "Come puo essere usata la voce in questa lezione?",
          options: [
            {
              id: "q2a",
              label: "Come materia sonora, anche senza parole riconoscibili.",
              correct: true,
              feedback: "Esatto. Sussurro, sillaba, respiro e suono lungo possono funzionare senza testo."
            },
            {
              id: "q2b",
              label: "Solo per cantare una melodia completa.",
              correct: false,
              feedback: "Qui la voce non serve per forza a cantare: puo essere un materiale sonoro essenziale."
            }
          ]
        },
        {
          id: "q3",
          prompt: "Che funzione puo avere il silenzio?",
          options: [
            {
              id: "q3a",
              label: "Preparare, sospendere, far risaltare e chiudere una scena.",
              correct: true,
              feedback: "Si. Il silenzio e uno spazio attivo, non un buco da riempire."
            },
            {
              id: "q3b",
              label: "Solo fermare l'attivita quando il gruppo sbaglia.",
              correct: false,
              feedback: "Non solo. Il silenzio fa parte della forma e puo avere un ruolo espressivo preciso."
            }
          ]
        },
        {
          id: "q4",
          prompt: "Che cosa rende riconoscibile una scena sonora?",
          options: [
            {
              id: "q4a",
              label: "L'ordine tra ingressi, tensione, silenzio e chiusura.",
              correct: true,
              feedback: "Esatto. La scena si capisce quando la forma e chiara e coerente."
            },
            {
              id: "q4b",
              label: "Il numero piu alto possibile di suoni diversi.",
              correct: false,
              feedback: "Non serve accumulare. Meglio pochi materiali scelti e ben organizzati."
            }
          ]
        }
      ],
      selfCheck: [
        "Il mio suono era controllato?",
        "Sono entrato nel momento giusto?",
        "Ho ascoltato gli altri prima di aggiungere il mio suono?",
        "Il nostro silenzio aveva una funzione?",
        "La scena che volevamo costruire e arrivata agli ascoltatori?"
      ],
      panels: [
        {
          title: "Criteri osservabili",
          kind: "terms",
          items: [
            { term: "Controllo", text: "Il suono corporeo resta intenzionale e stabile.", example: "precisione" },
            { term: "Ascolto reciproco", text: "Entrate, soste e cambiamenti tengono conto degli altri.", example: "insieme" },
            { term: "Forma", text: "La scena ha inizio, sviluppo, tensione e chiusura leggibili.", example: "struttura" },
            { term: "Silenzio", text: "Il silenzio ha una funzione chiara e non e solo assenza.", example: "attesa" },
            { term: "Coerenza espressiva", text: "I suoni fanno immaginare davvero la situazione scelta.", example: "scena" },
            { term: "Partitura grafica", text: "La traccia visiva permette di ricostruire l'esecuzione.", example: "segni" },
            { term: "Spiegazione", text: "Il gruppo sa motivare le proprie scelte sonore.", example: "perche" }
          ]
        },
        {
          title: "Rubrica sintetica",
          kind: "terms",
          items: [
            {
              term: "Avanzato",
              text: "La scena e chiara, controllata e riconoscibile; suoni e silenzi hanno funzione precisa; la partitura grafica permette di ricostruire l'esecuzione."
            },
            {
              term: "Intermedio",
              text: "La scena e comprensibile, ma alcuni passaggi risultano confusi; l'uso del silenzio o della dinamica non e sempre controllato."
            },
            {
              term: "Base",
              text: "Il gruppo produce materiali sonori, ma la forma e debole e l'idea della scena arriva solo parzialmente."
            },
            {
              term: "Iniziale",
              text: "I suoni sono poco controllati, manca una struttura riconoscibile, il gruppo fatica ad ascoltarsi."
            }
          ]
        }
      ]
    },
    chiusura: {
      label: "Chiusura",
      line: "Oggi non hai usato strumenti, ma hai lavorato da musicista: hai scelto suoni, li hai controllati, li hai messi in relazione e hai costruito una forma.",
      bridge: "Il corpo puo creare spazio, tensione, attesa e movimento. La musica comincia quando un suono smette di essere casuale e diventa una scelta."
    }
  }
};
function CorpoVoceGestoLesson() {
  return /* @__PURE__ */ React3.createElement(OriginiTopicLesson, { lesson });
}
export {
  CorpoVoceGestoLesson as default
};
