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
  useActiveSection,
} from "./LessonShared.module.js";

const DEFAULT_PROGRESS = [
  { id: "apertura", label: "Apertura", type: "anchor" },
  { id: "esplorazione", label: "Esplorazione", type: "anchor" },
  { id: "comprensione-attiva", label: "Comprensione attiva", type: "anchor" },
  { id: "rielaborazione", label: "Rielaborazione", type: "followup" },
  { id: "produzione", label: "Produzione", type: "followup" },
  { id: "condivisione", label: "Condivisione", type: "followup" },
  { id: "valutazione", label: "Valutazione", type: "followup" },
  { id: "chiusura", label: "Chiusura", type: "followup" },
];

function KeyCardGrid({ items, columns = 3 }) {
  const gridClass =
    columns === 2
      ? "lesson-card-grid--two"
      : columns === 4
        ? "lesson-card-grid--four"
        : "lesson-card-grid--three";

  return (
    <div className={cn("lesson-card-grid", gridClass)}>
      {items.map((item) => (
        <article key={item.title} className="lesson-key-card">
          {item.label ? <p className="lesson-mini-title">{item.label}</p> : null}
          <strong>{item.title}</strong>
          {item.caption ? <p className="lesson-body-text">{item.caption}</p> : null}
          {item.chips?.length ? (
            <div className="lesson-chip-row">
              {item.chips.map((chip) => (
                <span key={`${item.title}-${chip}`} className="lesson-chip">
                  {chip}
                </span>
              ))}
            </div>
          ) : null}
          {item.example ? <p className="lesson-note">{item.example}</p> : null}
        </article>
      ))}
    </div>
  );
}

function TermBoard({ items }) {
  return (
    <div className="lesson-term-list">
      {items.map((item) => (
        <div key={item.term} className="lesson-term-list__row">
          <strong>{item.term}</strong>
          <div className="lesson-term-list__content">
            <p>{item.text}</p>
            {item.example ? <div className="lesson-term-list__example">{item.example}</div> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function FlowBoard({ items, ariaLabel }) {
  return (
    <div className="lesson-flow-card" aria-label={ariaLabel}>
      <div className="lesson-flow-card__steps">
        {items.map((item, index) => (
          <React.Fragment key={item}>
            <div className="lesson-flow-card__node">{item}</div>
            {index < items.length - 1 ? <span className="lesson-flow-card__arrow">→</span> : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function TimelineBoard({ items, ariaLabel }) {
  return (
    <div className="lesson-timeline-board" aria-label={ariaLabel}>
      {items.map((item, index) => (
        <div key={`${item.title}-${index}`} className="lesson-timeline-board__row">
          <div className="lesson-timeline-board__marker">
            <span>{item.label || String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className="lesson-timeline-board__content">
            <strong>{item.title}</strong>
            {item.text ? <p>{item.text}</p> : null}
            {item.note ? <div className="lesson-term-list__example">{item.note}</div> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function EvidenceStrip({ items }) {
  return (
    <div className="lesson-evidence-strip">
      {items.map((item) => (
        <article key={item.title} className="lesson-evidence">
          {item.image ? (
            <div className="lesson-evidence__media">
              <img src={item.image.src} alt={item.image.alt} />
            </div>
          ) : null}
          <div className="lesson-evidence__copy">
            {item.label ? <p className="lesson-mini-title">{item.label}</p> : null}
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function VisualSpec({ spec, fallbackTotal = 30 }) {
  if (!spec || spec.type === "timer") {
    return (
      <SimpleTimer
        total={spec?.total || fallbackTotal}
        startLabel={spec?.startLabel || `Avvia ${spec?.total || fallbackTotal} secondi`}
      />
    );
  }

  if (spec.type === "flow") {
    return <FlowBoard items={spec.items} ariaLabel={spec.ariaLabel || "Schema di lavoro"} />;
  }

  if (spec.type === "timeline") {
    return <TimelineBoard items={spec.items} ariaLabel={spec.ariaLabel || "Sequenza essenziale"} />;
  }

  if (spec.type === "terms") {
    return <TermBoard items={spec.items} />;
  }

  if (spec.type === "cards") {
    return <KeyCardGrid items={spec.items} columns={spec.columns || 2} />;
  }

  return null;
}

function PanelContent({ panel }) {
  if (panel.kind === "cards") {
    return <KeyCardGrid items={panel.items} columns={panel.columns || 2} />;
  }

  if (panel.kind === "terms") {
    return <TermBoard items={panel.items} />;
  }

  if (panel.kind === "timeline") {
    return <TimelineBoard items={panel.items} ariaLabel={panel.ariaLabel || panel.title || "Sequenza essenziale"} />;
  }

  if (panel.kind === "prompts") {
    return <PromptList items={panel.items} />;
  }

  if (panel.kind === "text") {
    return (
      <div className="lesson-stack">
        {panel.paragraphs.map((paragraph) => (
          <p key={paragraph} className="lesson-body-text">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  return null;
}

function PanelCollection({ panels }) {
  if (!panels?.length) {
    return null;
  }

  if (panels.length === 1) {
    const panel = panels[0];
    return (
      <Panel title={panel.title}>
        <PanelContent panel={panel} />
      </Panel>
    );
  }

  return (
    <div className={cn("lesson-card-grid", panels.length === 2 ? "lesson-card-grid--two" : "lesson-card-grid--three")}>
      {panels.map((panel) => (
        <Panel key={panel.title} title={panel.title}>
          <PanelContent panel={panel} />
        </Panel>
      ))}
    </div>
  );
}

function OpeningSection({ lesson }) {
  return (
    <LessonSection id="apertura" title={lesson.opening.title} intro={lesson.opening.intro}>
      <Panel title={lesson.opening.cardTitle} meta={lesson.opening.meta}>
        <ActivityLayout
          steps={lesson.opening.steps}
          observe={lesson.opening.observe}
          result={lesson.opening.result}
          right={<VisualSpec spec={lesson.opening.side} fallbackTotal={lesson.opening.timerTotal || 30} />}
        />
      </Panel>
    </LessonSection>
  );
}

function ExplorationSection({ lesson }) {
  const exploration = lesson.exploration;
  const cards = exploration.cards?.length ? (
    <KeyCardGrid items={exploration.cards} columns={exploration.cardsColumns || 3} />
  ) : null;
  const side = exploration.side
    ? <VisualSpec spec={exploration.side} />
    : exploration.flow?.length
      ? <FlowBoard items={exploration.flow} ariaLabel={exploration.flowLabel || "Passaggi principali dell'argomento"} />
      : null;
  const copy = (
    <div className="lesson-stack">
      {exploration.paragraphs.map((paragraph) => (
        <p key={paragraph} className="lesson-body-text">
          {paragraph}
        </p>
      ))}
      {exploration.questions?.length ? (
        <PromptList title={exploration.questionsTitle || "Osserva"} items={exploration.questions} />
      ) : null}
    </div>
  );

  return (
    <LessonSection id="esplorazione" title={exploration.title} intro={exploration.intro} tone="soft">
      {exploration.cardsPosition !== "after" ? cards : null}

      {side ? (
        <div className={cn("lesson-grid", exploration.layout === "essay-side" ? "lesson-grid--asym" : "lesson-grid--two")}>
          {copy}
          {side}
        </div>
      ) : (
        copy
      )}

      {exploration.cardsPosition === "after" ? cards : null}

      {exploration.evidence?.length ? <EvidenceStrip items={exploration.evidence} /> : null}
      <PanelCollection panels={exploration.panels} />
    </LessonSection>
  );
}

function ActiveSection({ lesson }) {
  const active = lesson.active;

  return (
    <LessonSection id="comprensione-attiva" title={active.title} intro={active.intro}>
      <Panel title={active.cardTitle} meta={active.meta}>
        <ActivityLayout
          steps={active.steps}
          observe={active.observe}
          result={active.result}
          right={<VisualSpec spec={active.side} fallbackTotal={active.timerTotal || 45} />}
        />
      </Panel>

      <PanelCollection panels={active.panels} />

      {active.prompts?.length ? (
        <Panel title={active.promptsTitle || "Ascolto interno"}>
          <PromptList items={active.prompts} />
        </Panel>
      ) : null}
    </LessonSection>
  );
}

function FollowupSection({ lesson, selected, onSelect }) {
  const phase = lesson.followups[selected];
  const tabs = Object.entries(lesson.followups).map(([id, item]) => ({ id, label: item.label }));

  return (
    <LessonSection
      id="rielaborazione"
      label={lesson.followupLabel || "Continua"}
      title={lesson.followupTitle || "Scegli la fase che ti serve adesso"}
      intro={lesson.followupIntro || "La parte attiva resta al centro. Le altre fasi restano leggere e sempre raggiungibili."}
      tone="soft"
    >
      <div className="lesson-followup">
        <PhaseTabs items={tabs} selected={selected} onSelect={onSelect} ariaLabel="Fasi successive della lezione" />

        <div className="lesson-followup__panel">
          {selected === "chiusura" ? (
            <div className="lesson-closing">
              <p className="lesson-closing__line">{phase.line}</p>
              <p className="lesson-closing__bridge">{phase.bridge}</p>
            </div>
          ) : selected === "valutazione" ? (
            <Panel kicker={phase.label} title={phase.title} meta={phase.meta}>
              <div className="lesson-grid lesson-grid--two">
                <QuizList questions={phase.quiz} />
                <SelfCheckList items={phase.selfCheck} />
              </div>
            </Panel>
          ) : (
            <Panel kicker={phase.label} title={phase.title} meta={phase.meta}>
              <div className="lesson-grid lesson-grid--two">
                <StepList title="Fai cosi" items={phase.steps} />
                <div className="lesson-stack">
                  <PromptList title="Osserva" items={phase.observe} />
                  <ResultCallout text={phase.result} />
                </div>
              </div>
            </Panel>
          )}
        </div>
      </div>
    </LessonSection>
  );
}

export default function OriginiTopicLesson({ lesson }) {
  const activeId = useActiveSection(["apertura", "esplorazione", "comprensione-attiva", "rielaborazione"]);
  const [selectedFollowup, setSelectedFollowup] = useState(lesson.followupDefault || "produzione");

  return (
    <div className="lesson-editorial-page" data-lesson-model={lesson.model?.id || ""}>
      <LessonHero
        title={lesson.title}
        question={lesson.question}
        subtitle={lesson.subtitle}
        heroNote={lesson.heroNote}
        breadcrumbs={lesson.breadcrumbs}
        heroWord={lesson.heroWord}
        heroPrelude={lesson.heroPrelude}
        heroEcho={lesson.heroEcho}
        heroTags={lesson.heroTags}
      />
      <MetaStrip items={lesson.meta || lesson.opening.meta} />
      <LessonProgress
        items={lesson.progress || DEFAULT_PROGRESS}
        activeId={activeId}
        selectedFollowup={selectedFollowup}
        onSelectFollowup={setSelectedFollowup}
      />
      <OpeningSection lesson={lesson} />
      <ExplorationSection lesson={lesson} />
      <ActiveSection lesson={lesson} />
      <FollowupSection lesson={lesson} selected={selectedFollowup} onSelect={setSelectedFollowup} />
      <LessonBottomBar
        mapHref={lesson.navigation.mapHref}
        previousHref={lesson.navigation.previousHref}
        homeHref={lesson.navigation.homeHref}
      />
    </div>
  );
}
