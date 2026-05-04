import React, { useState } from "https://esm.sh/react@18";
import {
  LessonHero,
  LessonProgress,
  LessonSection,
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

const EVIDENCE_IMAGES = [
  {
    src: "/assets/lesson/corpo-voce-gesto/lascaux-painting.jpg",
    title: "Traccia del gesto",
    caption: "Un gesto ripetuto lascia un segno. Quel segno puo aiutare il gruppo a ricordare.",
  },
  {
    src: "/assets/lesson/corpo-voce-gesto/hands-clapping.jpg",
    title: "Battito comune",
    caption: "Mani e corpo aiutano a sentire quando tutti partono insieme.",
  },
  {
    src: "/assets/lesson/corpo-voce-gesto/divje-babe-flute.jpg",
    title: "Prima degli strumenti complessi",
    caption: "Anche quando appare uno strumento, corpo e voce restano il punto di partenza.",
  },
];

const lesson = {
  nucleus: "Origini del suono",
  title: "Corpo, voce e gesto",
  question: "Come fa un gesto a diventare musica senza strumenti?",
  subtitle:
    "Ascolti, scegli, ripeti, fai una pausa e riparti. Cosi un gesto diventa una frase sonora che il gruppo riconosce subito.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Corpo, voce e gesto" },
  ],
  meta: [
    { label: "Durata", value: "2 ore" },
    { label: "Ti serve", value: "corpo, voce, banco" },
    { label: "Obiettivo", value: "creare una frase sonora di 8 tempi" },
  ],
  heroRows: [
    { label: "Corpo", items: ["mani", "piedi", "petto"] },
    { label: "Voce", items: ["ta", "tum", "ah"] },
    { label: "Gesto", items: ["parti", "ferma", "riprendi"] },
    { label: "Segni", items: ["●", "■", "◆", "—"] },
  ],
  heroNote: "Il gruppo capisce il suono quando riconosce attacco, pausa e finale.",
  progress: [
    { id: "apertura", label: "Apertura", type: "anchor" },
    { id: "esplorazione", label: "Esplorazione", type: "anchor" },
    { id: "comprensione-attiva", label: "Comprensione attiva", type: "anchor" },
    { id: "rielaborazione", label: "Rielaborazione", type: "followup" },
    { id: "produzione", label: "Produzione", type: "followup" },
    { id: "condivisione", label: "Condivisione", type: "followup" },
    { id: "valutazione", label: "Valutazione", type: "followup" },
    { id: "chiusura", label: "Chiusura", type: "followup" },
  ],
  opening: {
    label: "Esperienza iniziale",
    title: "Trova il suono che hai gia con te",
    intro: "Parti da quello che senti subito: respiro, mani, passi, banco, sedia, voce.",
    cardTitle: "Ascolta e scegli",
    meta: [
      { label: "Durata", value: "30 secondi" },
      { label: "Ti serve", value: "corpo o banco" },
      { label: "Alla fine", value: "riconosci un suono che puoi ripetere" },
    ],
    steps: [
      "Fermati per 30 secondi.",
      "Ascolta i suoni del tuo corpo e dell'aula.",
      "Scegli un suono che riesci a controllare bene.",
    ],
    observe: [
      "Quale suono nasce dal tuo corpo?",
      "Quale suono riesci a ripetere senza fatica?",
      "Quando la pausa ti aiuta a ripartire meglio?",
    ],
    result: "Riconosci almeno un suono del corpo e sai quando usarlo.",
  },
  exploration: {
    label: "Esplorazione",
    title: "Corpo, voce e gesto lavorano insieme",
    intro:
      "Il corpo e il primo laboratorio del suono. Quando ripeti un gesto con intenzione, quel gesto smette di essere casuale e diventa leggibile.",
    paragraphs: [
      "Una sillaba breve puo dare l'attacco. Un battito di mani puo tenere insieme il gruppo. Una pausa puo far sentire meglio la forma.",
      "Non ti serve fare tanti suoni. Ti serve scegliere quelli giusti e metterli in ordine.",
    ],
    questions: [
      "Quale gesto fa partire tutti nello stesso momento?",
      "Quale suono del corpo senti piu secco o piu grave?",
      "Che cosa cambia quando inserisci una pausa?",
    ],
    flow: [
      "ascolta",
      "scegli",
      "ripeti",
      "ferma",
      "riprendi",
      "ricorda",
    ],
  },
  active: {
    label: "Comprensione attiva",
    title: "Scrivi una frase sonora di 8 tempi",
    intro:
      "Usa pochi suoni. Fai capire subito dove si parte, dove arriva la pausa e dove si chiude la frase.",
    cardTitle: "Costruisci la sequenza",
    meta: [
      { label: "Durata", value: "12 minuti" },
      { label: "Ti serve", value: "corpo, voce, foglio" },
      { label: "Alla fine", value: "hai una sequenza leggibile" },
    ],
    steps: [
      "Scegli una pulsazione semplice che tutti riescono a tenere.",
      "Aggiungi una voce breve che aiuti memoria e attacco.",
      "Inserisci almeno una pausa chiara.",
      "Ripeti finche il gruppo legge la sequenza senza una spiegazione lunga.",
    ],
    observe: [
      "Si capisce dove inizia la frase?",
      "La pausa si sente davvero?",
      "Il finale chiude o lascia il gruppo sospeso?",
    ],
    result: "La tua frase sonora si vede e si sente con chiarezza.",
  },
  sourceOptions: [
    { id: "mani", label: "Mani", short: "MA", symbol: "●" },
    { id: "piedi", label: "Piedi", short: "PI", symbol: "■" },
    { id: "cosce", label: "Cosce", short: "CO", symbol: "▲" },
    { id: "voce", label: "Voce", short: "VO", symbol: "◆" },
    { id: "pausa", label: "Pausa", short: "PA", symbol: "—" },
  ],
  sequencePresets: {
    simple: ["mani", "pausa", "mani", "voce", "piedi", "pausa", "voce", "mani"],
    echo: ["mani", "voce", "mani", "pausa", "mani", "voce", "mani", "pausa"],
    contrast: ["piedi", "cosce", "voce", "pausa", "piedi", "mani", "voce", "pausa"],
  },
  followupDefault: "produzione",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Rendi la sequenza piu chiara",
      meta: [
        { label: "Durata", value: "5 minuti" },
        { label: "Ti serve", value: "foglio e matita" },
        { label: "Alla fine", value: "la forma si vede meglio" },
      ],
      steps: [
        "Togli un suono inutile.",
        "Scegli una sola pausa davvero importante.",
        "Aggiungi un segno di attacco o un segno finale.",
      ],
      observe: [
        "Si capisce il punto di partenza?",
        "Le ripetizioni sono facili da leggere?",
      ],
      result: "La tua frase sonora si capisce al primo sguardo.",
    },
    produzione: {
      label: "Produzione",
      title: "Provala con il gruppo",
      meta: [
        { label: "Durata", value: "10 minuti" },
        { label: "Ti serve", value: "corpo, voce, banco" },
        { label: "Alla fine", value: "il gruppo esegue insieme" },
      ],
      steps: [
        "Tenete una pulsazione comune.",
        "Provate la sequenza almeno due volte.",
        "Scegliete un finale comune.",
      ],
      observe: [
        "Il gruppo entra insieme?",
        "La voce aiuta davvero l'attacco?",
        "Il finale arriva nello stesso punto per tutti?",
      ],
      result: "La frase sonora resta stabile anche quando la ripetete.",
    },
    condivisione: {
      label: "Condivisione",
      title: "Falla leggere a un altro gruppo",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "la sequenza scritta" },
        { label: "Alla fine", value: "un altro gruppo la ricostruisce" },
      ],
      steps: [
        "Mostra solo i segni e il gesto iniziale.",
        "Lascia che l'altro gruppo provi senza aiuto.",
        "Correggi solo il punto che crea piu confusione.",
      ],
      observe: [
        "Quale segno funziona subito?",
        "Dove l'altro gruppo si ferma o sbaglia?",
      ],
      result: "Capisci se la tua sequenza comunica davvero.",
    },
    valutazione: {
      label: "Valutazione",
      title: "Controlla quello che sai spiegare",
      meta: [
        { label: "Durata", value: "5 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "dai un nome a cio che hai fatto" },
      ],
      quiz: [
        {
          id: "q1",
          prompt: "La musica puo nascere anche senza strumenti?",
          options: [
            {
              id: "q1a",
              label: "Si, se corpo, voce, gesto e silenzio vengono organizzati dal gruppo.",
              correct: true,
              feedback: "Esatto. Qui la musica nasce da un gesto chiaro, ripetuto e condiviso.",
            },
            {
              id: "q1b",
              label: "No, servono sempre strumenti musicali.",
              correct: false,
              feedback: "Non proprio. Corpo e voce bastano gia per costruire una frase sonora.",
            },
          ],
        },
        {
          id: "q2",
          prompt: "Perche una pausa e utile?",
          options: [
            {
              id: "q2a",
              label: "Perche da respiro e rende piu chiaro l'attacco successivo.",
              correct: true,
              feedback: "Esatto. La pausa organizza il tempo e rende piu leggibile la frase.",
            },
            {
              id: "q2b",
              label: "Perche ferma tutto una volta per tutte.",
              correct: false,
              feedback: "No. Una pausa puo anche preparare meglio la ripresa.",
            },
          ],
        },
        {
          id: "q3",
          prompt: "Che cosa ti aiuta a ricordare la sequenza?",
          options: [
            {
              id: "q3a",
              label: "Segni semplici, ripetizione e un gesto iniziale chiaro.",
              correct: true,
              feedback: "Esatto. Quando la forma si vede bene, il gruppo la ricorda meglio.",
            },
            {
              id: "q3b",
              label: "Cambiare gesto ogni volta.",
              correct: false,
              feedback: "No. Troppi cambi rendono la sequenza meno leggibile.",
            },
          ],
        },
      ],
      selfCheck: [
        "Riconosci almeno tre sorgenti sonore del corpo?",
        "Sai leggere una sequenza di 8 tempi?",
        "Sai spiegare che cosa fa la pausa?",
      ],
    },
    chiusura: {
      label: "Chiusura",
      title: "Porta via un'idea semplice",
      line: "Il corpo non sostituisce la musica. La fa iniziare quando il gruppo ascolta, sceglie e ripete insieme.",
      bridge: "Nella prossima lezione scoprirai che sotto ogni ritmo c'e un battito comune che tiene insieme tutti.",
    },
  },
};

function HeroVisual() {
  return (
    <div className="lesson-visual-grid">
      {lesson.heroRows.map((row) => (
        <div key={row.label} className="lesson-visual-grid__row">
          <strong>{row.label}</strong>
          <div className="lesson-chip-row">
            {row.items.map((item) => (
              <span key={`${row.label}-${item}`} className="lesson-chip">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function OpeningSection() {
  return (
    <LessonSection id="apertura" label={lesson.opening.label} title={lesson.opening.title} intro={lesson.opening.intro}>
      <Panel kicker="Attivita" title={lesson.opening.cardTitle} meta={lesson.opening.meta}>
        <div className="lesson-grid lesson-grid--two">
          <div className="lesson-stack">
            <StepList title="Fai cosi" items={lesson.opening.steps} />
            <PromptList title="Osserva" items={lesson.opening.observe} />
            <ResultCallout text={lesson.opening.result} />
          </div>
          <SimpleTimer total={30} startLabel="Avvia 30 secondi" />
        </div>
      </Panel>
    </LessonSection>
  );
}

function EvidenceStrip() {
  return (
    <div className="lesson-evidence-strip">
      {EVIDENCE_IMAGES.map((item) => (
        <figure key={item.title} className="lesson-evidence">
          <div className="lesson-evidence__media">
            <img src={item.src} alt={item.caption} loading="lazy" />
          </div>
          <figcaption className="lesson-evidence__copy">
            <strong>{item.title}</strong>
            <p>{item.caption}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function ExplorationSection() {
  return (
    <LessonSection id="esplorazione" label={lesson.exploration.label} title={lesson.exploration.title} intro={lesson.exploration.intro} tone="soft">
      <div className="lesson-grid lesson-grid--two">
        <div className="lesson-stack">
          {lesson.exploration.paragraphs.map((paragraph) => (
            <p key={paragraph} className="lesson-body-text">
              {paragraph}
            </p>
          ))}
          <PromptList title="Domande guida" items={lesson.exploration.questions} />
        </div>

        <div className="lesson-flow-card" aria-label="Schema del passaggio dal gesto alla forma">
          <p className="lesson-flow-card__label">Dal gesto alla forma</p>
          <div className="lesson-flow-card__steps">
            {lesson.exploration.flow.map((item, index) => (
              <React.Fragment key={item}>
                <div className="lesson-flow-card__node">{item}</div>
                {index < lesson.exploration.flow.length - 1 ? <span className="lesson-flow-card__arrow">→</span> : null}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <EvidenceStrip />
    </LessonSection>
  );
}

function SequenceBoard() {
  const [selectedSource, setSelectedSource] = useState(lesson.sourceOptions[0].id);
  const [sequence, setSequence] = useState([...lesson.sequencePresets.simple]);

  return (
    <div className="lesson-sequence">
      <div className="lesson-choice-row">
        {lesson.sourceOptions.map((item) => (
          <button
            key={item.id}
            type="button"
            className={cn("lesson-choice", selectedSource === item.id && "is-active")}
            onClick={() => setSelectedSource(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="lesson-sequence__board" aria-label="Sequenza di otto tempi">
        {sequence.map((state, index) => {
          const item = lesson.sourceOptions.find((entry) => entry.id === state) || lesson.sourceOptions[0];

          return (
            <button
              key={`${state}-${index}`}
              type="button"
              className={cn("lesson-sequence__cell", state === "pausa" && "is-pause")}
              onClick={() =>
                setSequence((current) => {
                  const next = [...current];
                  next[index] = selectedSource;
                  return next;
                })
              }
            >
              <span>tempo {index + 1}</span>
              <strong>{item.symbol}</strong>
              <small>{item.short}</small>
            </button>
          );
        })}
      </div>

      <div className="lesson-choice-row">
        <button type="button" className="lesson-button lesson-button--ghost" onClick={() => setSequence([...lesson.sequencePresets.simple])}>
          Base
        </button>
        <button type="button" className="lesson-button lesson-button--ghost" onClick={() => setSequence([...lesson.sequencePresets.echo])}>
          Richiamo
        </button>
        <button type="button" className="lesson-button lesson-button--ghost" onClick={() => setSequence([...lesson.sequencePresets.contrast])}>
          Contrasto
        </button>
      </div>

      <p className="lesson-note">
        {lesson.sourceOptions.map((item) => `${item.symbol} = ${item.label.toLowerCase()}`).join(" · ")}
      </p>
    </div>
  );
}

function ActiveSection() {
  return (
    <LessonSection id="comprensione-attiva" label={lesson.active.label} title={lesson.active.title} intro={lesson.active.intro}>
      <Panel kicker="Prova pratica" title={lesson.active.cardTitle} meta={lesson.active.meta}>
        <div className="lesson-grid lesson-grid--asym">
          <div className="lesson-stack">
            <StepList title="Fai cosi" items={lesson.active.steps} />
            <PromptList title="Osserva" items={lesson.active.observe} />
            <ResultCallout text={lesson.active.result} />
          </div>
          <SequenceBoard />
        </div>
      </Panel>
    </LessonSection>
  );
}

function FollowupSection({ selected, onSelect }) {
  const phase = lesson.followups[selected];
  const tabs = Object.entries(lesson.followups).map(([id, item]) => ({ id, label: item.label }));

  return (
    <LessonSection
      id="rielaborazione"
      label="Continua"
      title="Scegli il passo che ti serve adesso"
      intro="La fase attiva resta al centro. Le altre restano vicine, leggere e sempre pronte."
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

export default function CorpoVoceGestoLesson() {
  const activeId = useActiveSection(["apertura", "esplorazione", "comprensione-attiva", "rielaborazione"]);
  const [selectedFollowup, setSelectedFollowup] = useState(lesson.followupDefault);

  return (
    <div className="lesson-editorial-page">
      <LessonHero
        eyebrow={lesson.nucleus}
        title={lesson.title}
        question={lesson.question}
        subtitle={lesson.subtitle}
        meta={lesson.meta}
        visual={<HeroVisual />}
        visualNote={lesson.heroNote}
        breadcrumbs={lesson.breadcrumbs}
      />
      <LessonProgress
        items={lesson.progress}
        activeId={activeId}
        selectedFollowup={selectedFollowup}
        onSelectFollowup={setSelectedFollowup}
      />
      <OpeningSection />
      <ExplorationSection />
      <ActiveSection />
      <FollowupSection selected={selectedFollowup} onSelect={setSelectedFollowup} />
    </div>
  );
}
