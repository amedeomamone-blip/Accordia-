import React, { useState } from "https://esm.sh/react@18";
import {
  ActivityLayout,
  LessonBottomBar,
  LessonHero,
  LessonProgress,
  LessonSection,
  MetaStrip,
  Panel,
  PhaseTabs,
  PromptList,
  QuizList,
  ResultCallout,
  SelfCheckList,
  SimpleTimer,
  StepList,
  cn,
  useActiveSection
} from "./LessonShared.module.js";
const DEFAULT_PROGRESS = [
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
  return /* @__PURE__ */ React.createElement("div", { className: cn("lesson-card-grid", gridClass) }, items.map((item) => /* @__PURE__ */ React.createElement("article", { key: item.title, className: "lesson-key-card" }, item.label ? /* @__PURE__ */ React.createElement("p", { className: "lesson-mini-title" }, item.label) : null, /* @__PURE__ */ React.createElement("strong", null, item.title), item.caption ? /* @__PURE__ */ React.createElement("p", { className: "lesson-body-text" }, item.caption) : null, item.chips?.length ? /* @__PURE__ */ React.createElement("div", { className: "lesson-chip-row" }, item.chips.map((chip) => /* @__PURE__ */ React.createElement("span", { key: `${item.title}-${chip}`, className: "lesson-chip" }, chip))) : null, item.example ? /* @__PURE__ */ React.createElement("p", { className: "lesson-note" }, item.example) : null)));
}
function TermBoard({ items }) {
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-term-list" }, items.map((item) => /* @__PURE__ */ React.createElement("div", { key: item.term, className: "lesson-term-list__row" }, /* @__PURE__ */ React.createElement("strong", null, item.term), /* @__PURE__ */ React.createElement("div", { className: "lesson-term-list__content" }, /* @__PURE__ */ React.createElement("p", null, item.text), item.example ? /* @__PURE__ */ React.createElement("div", { className: "lesson-term-list__example" }, item.example) : null))));
}
function FlowBoard({ items, ariaLabel }) {
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-flow-card", "aria-label": ariaLabel }, /* @__PURE__ */ React.createElement("div", { className: "lesson-flow-card__steps" }, items.map((item, index) => /* @__PURE__ */ React.createElement(React.Fragment, { key: item }, /* @__PURE__ */ React.createElement("div", { className: "lesson-flow-card__node" }, item), index < items.length - 1 ? /* @__PURE__ */ React.createElement("span", { className: "lesson-flow-card__arrow" }, "\u2192") : null))));
}
function TimelineBoard({ items, ariaLabel }) {
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-timeline-board", "aria-label": ariaLabel }, items.map((item, index) => /* @__PURE__ */ React.createElement("div", { key: `${item.title}-${index}`, className: "lesson-timeline-board__row" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-timeline-board__marker" }, /* @__PURE__ */ React.createElement("span", null, item.label || String(index + 1).padStart(2, "0"))), /* @__PURE__ */ React.createElement("div", { className: "lesson-timeline-board__content" }, /* @__PURE__ */ React.createElement("strong", null, item.title), item.text ? /* @__PURE__ */ React.createElement("p", null, item.text) : null, item.note ? /* @__PURE__ */ React.createElement("div", { className: "lesson-term-list__example" }, item.note) : null))));
}
function EvidenceStrip({ items }) {
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-evidence-strip" }, items.map((item) => /* @__PURE__ */ React.createElement("article", { key: item.title, className: "lesson-evidence" }, item.image ? /* @__PURE__ */ React.createElement("div", { className: "lesson-evidence__media" }, /* @__PURE__ */ React.createElement("img", { src: item.image.src, alt: item.image.alt })) : null, /* @__PURE__ */ React.createElement("div", { className: "lesson-evidence__copy" }, item.label ? /* @__PURE__ */ React.createElement("p", { className: "lesson-mini-title" }, item.label) : null, /* @__PURE__ */ React.createElement("strong", null, item.title), /* @__PURE__ */ React.createElement("p", null, item.body)))));
}
function VisualSpec({ spec, fallbackTotal = 30 }) {
  if (!spec || spec.type === "timer") {
    return /* @__PURE__ */ React.createElement(
      SimpleTimer,
      {
        total: spec?.total || fallbackTotal,
        startLabel: spec?.startLabel || `Avvia ${spec?.total || fallbackTotal} secondi`
      }
    );
  }
  if (spec.type === "flow") {
    return /* @__PURE__ */ React.createElement(FlowBoard, { items: spec.items, ariaLabel: spec.ariaLabel || "Schema di lavoro" });
  }
  if (spec.type === "timeline") {
    return /* @__PURE__ */ React.createElement(TimelineBoard, { items: spec.items, ariaLabel: spec.ariaLabel || "Sequenza essenziale" });
  }
  if (spec.type === "terms") {
    return /* @__PURE__ */ React.createElement(TermBoard, { items: spec.items });
  }
  if (spec.type === "cards") {
    return /* @__PURE__ */ React.createElement(KeyCardGrid, { items: spec.items, columns: spec.columns || 2 });
  }
  return null;
}
function PanelContent({ panel }) {
  if (panel.kind === "cards") {
    return /* @__PURE__ */ React.createElement(KeyCardGrid, { items: panel.items, columns: panel.columns || 2 });
  }
  if (panel.kind === "terms") {
    return /* @__PURE__ */ React.createElement(TermBoard, { items: panel.items });
  }
  if (panel.kind === "timeline") {
    return /* @__PURE__ */ React.createElement(TimelineBoard, { items: panel.items, ariaLabel: panel.ariaLabel || panel.title || "Sequenza essenziale" });
  }
  if (panel.kind === "prompts") {
    return /* @__PURE__ */ React.createElement(PromptList, { items: panel.items });
  }
  if (panel.kind === "text") {
    return /* @__PURE__ */ React.createElement("div", { className: "lesson-stack" }, panel.paragraphs.map((paragraph) => /* @__PURE__ */ React.createElement("p", { key: paragraph, className: "lesson-body-text" }, paragraph)));
  }
  return null;
}
function PanelCollection({ panels }) {
  if (!panels?.length) {
    return null;
  }
  if (panels.length === 1) {
    const panel = panels[0];
    return /* @__PURE__ */ React.createElement(Panel, { title: panel.title }, /* @__PURE__ */ React.createElement(PanelContent, { panel }));
  }
  return /* @__PURE__ */ React.createElement("div", { className: cn("lesson-card-grid", panels.length === 2 ? "lesson-card-grid--two" : "lesson-card-grid--three") }, panels.map((panel) => /* @__PURE__ */ React.createElement(Panel, { key: panel.title, title: panel.title }, /* @__PURE__ */ React.createElement(PanelContent, { panel }))));
}
function OpeningSection({ lesson }) {
  return /* @__PURE__ */ React.createElement(LessonSection, { id: "apertura", title: lesson.opening.title, intro: lesson.opening.intro }, /* @__PURE__ */ React.createElement(Panel, { title: lesson.opening.cardTitle, meta: lesson.opening.meta }, /* @__PURE__ */ React.createElement(
    ActivityLayout,
    {
      steps: lesson.opening.steps,
      observe: lesson.opening.observe,
      result: lesson.opening.result,
      right: /* @__PURE__ */ React.createElement(VisualSpec, { spec: lesson.opening.side, fallbackTotal: lesson.opening.timerTotal || 30 })
    }
  )));
}
function ExplorationSection({ lesson }) {
  const exploration = lesson.exploration;
  const cards = exploration.cards?.length ? /* @__PURE__ */ React.createElement(KeyCardGrid, { items: exploration.cards, columns: exploration.cardsColumns || 3 }) : null;
  const side = exploration.side ? /* @__PURE__ */ React.createElement(VisualSpec, { spec: exploration.side }) : exploration.flow?.length ? /* @__PURE__ */ React.createElement(FlowBoard, { items: exploration.flow, ariaLabel: exploration.flowLabel || "Passaggi principali dell'argomento" }) : null;
  const copy = /* @__PURE__ */ React.createElement("div", { className: "lesson-stack" }, exploration.paragraphs.map((paragraph) => /* @__PURE__ */ React.createElement("p", { key: paragraph, className: "lesson-body-text" }, paragraph)), exploration.questions?.length ? /* @__PURE__ */ React.createElement(PromptList, { title: exploration.questionsTitle || "Osserva", items: exploration.questions }) : null);
  return /* @__PURE__ */ React.createElement(LessonSection, { id: "esplorazione", title: exploration.title, intro: exploration.intro, tone: "soft" }, exploration.cardsPosition !== "after" ? cards : null, side ? /* @__PURE__ */ React.createElement("div", { className: cn("lesson-grid", exploration.layout === "essay-side" ? "lesson-grid--asym" : "lesson-grid--two") }, copy, side) : copy, exploration.cardsPosition === "after" ? cards : null, exploration.evidence?.length ? /* @__PURE__ */ React.createElement(EvidenceStrip, { items: exploration.evidence }) : null, /* @__PURE__ */ React.createElement(PanelCollection, { panels: exploration.panels }));
}
function ActiveSection({ lesson }) {
  const active = lesson.active;
  return /* @__PURE__ */ React.createElement(LessonSection, { id: "comprensione-attiva", title: active.title, intro: active.intro }, /* @__PURE__ */ React.createElement(Panel, { title: active.cardTitle, meta: active.meta }, /* @__PURE__ */ React.createElement(
    ActivityLayout,
    {
      steps: active.steps,
      observe: active.observe,
      result: active.result,
      right: /* @__PURE__ */ React.createElement(VisualSpec, { spec: active.side, fallbackTotal: active.timerTotal || 45 })
    }
  )), /* @__PURE__ */ React.createElement(PanelCollection, { panels: active.panels }), active.prompts?.length ? /* @__PURE__ */ React.createElement(Panel, { title: active.promptsTitle || "Ascolto interno" }, /* @__PURE__ */ React.createElement(PromptList, { items: active.prompts })) : null);
}
function FollowupSection({ lesson, selected, onSelect }) {
  const phase = lesson.followups[selected];
  const tabs = Object.entries(lesson.followups).map(([id, item]) => ({ id, label: item.label }));
  return /* @__PURE__ */ React.createElement(
    LessonSection,
    {
      id: "rielaborazione",
      label: lesson.followupLabel || "Continua",
      title: lesson.followupTitle || "Scegli la fase che ti serve adesso",
      intro: lesson.followupIntro || "La parte attiva resta al centro. Le altre fasi restano leggere e sempre raggiungibili.",
      tone: "soft"
    },
    /* @__PURE__ */ React.createElement("div", { className: "lesson-followup" }, /* @__PURE__ */ React.createElement(PhaseTabs, { items: tabs, selected, onSelect, ariaLabel: "Fasi successive della lezione" }), /* @__PURE__ */ React.createElement("div", { className: "lesson-followup__panel" }, selected === "chiusura" ? /* @__PURE__ */ React.createElement("div", { className: "lesson-closing" }, /* @__PURE__ */ React.createElement("p", { className: "lesson-closing__line" }, phase.line), /* @__PURE__ */ React.createElement("p", { className: "lesson-closing__bridge" }, phase.bridge)) : selected === "valutazione" ? /* @__PURE__ */ React.createElement(Panel, { kicker: phase.label, title: phase.title, meta: phase.meta }, /* @__PURE__ */ React.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React.createElement(QuizList, { questions: phase.quiz }), /* @__PURE__ */ React.createElement(SelfCheckList, { items: phase.selfCheck }))) : /* @__PURE__ */ React.createElement(Panel, { kicker: phase.label, title: phase.title, meta: phase.meta }, /* @__PURE__ */ React.createElement("div", { className: "lesson-grid lesson-grid--two" }, /* @__PURE__ */ React.createElement(StepList, { title: "Fai cosi", items: phase.steps }), /* @__PURE__ */ React.createElement("div", { className: "lesson-stack" }, /* @__PURE__ */ React.createElement(PromptList, { title: "Osserva", items: phase.observe }), /* @__PURE__ */ React.createElement(ResultCallout, { text: phase.result }))))))
  );
}
function OriginiTopicLesson({ lesson }) {
  const activeId = useActiveSection(["apertura", "esplorazione", "comprensione-attiva", "rielaborazione"]);
  const [selectedFollowup, setSelectedFollowup] = useState(lesson.followupDefault || "produzione");
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-editorial-page", "data-lesson-model": lesson.model?.id || "" }, /* @__PURE__ */ React.createElement(
    LessonHero,
    {
      title: lesson.title,
      question: lesson.question,
      subtitle: lesson.subtitle,
      heroNote: lesson.heroNote,
      breadcrumbs: lesson.breadcrumbs,
      heroWord: lesson.heroWord,
      heroPrelude: lesson.heroPrelude,
      heroEcho: lesson.heroEcho,
      heroTags: lesson.heroTags
    }
  ), /* @__PURE__ */ React.createElement(MetaStrip, { items: lesson.meta || lesson.opening.meta }), /* @__PURE__ */ React.createElement(
    LessonProgress,
    {
      items: lesson.progress || DEFAULT_PROGRESS,
      activeId,
      selectedFollowup,
      onSelectFollowup: setSelectedFollowup
    }
  ), /* @__PURE__ */ React.createElement(OpeningSection, { lesson }), /* @__PURE__ */ React.createElement(ExplorationSection, { lesson }), /* @__PURE__ */ React.createElement(ActiveSection, { lesson }), /* @__PURE__ */ React.createElement(FollowupSection, { lesson, selected: selectedFollowup, onSelect: setSelectedFollowup }), /* @__PURE__ */ React.createElement(
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
