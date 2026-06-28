import React, { useEffect, useState } from "https://esm.sh/react@18";
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
  usePrefersReducedMotion,
} from "./LessonShared.module.js";

const lesson = {
  nucleus: "Origini del suono",
  model: {
    id: "laboratoriale",
    label: "Lezione laboratoriale",
    theoryShare: 30,
    practiceShare: 70,
  },
  title: "Ritmo, pulsazione e tempo",
  question: "Che differenza c'e tra ritmo, pulsazione e tempo?",
  subtitle:
    "Prima trovi un battito comune. Poi capisci che il ritmo puo cambiare, mentre la pulsazione resta sotto e il tempo ne decide la velocita.",
  heroWord: "ritmo",
  heroPrelude: "Sotto il gruppo c'e un battito",
  heroEcho: "che ritorna uguale",
  heroTags: ["pulsazione", "accento", "metro", "tempo"],
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Ritmo, pulsazione e tempo" },
  ],
  navigation: {
    mapHref: "../../index.html",
    previousHref: null,
    homeHref: "../../../../index.html",
  },
  meta: [
    { label: "Durata", value: "2 ore" },
    { label: "Ti serve", value: "corpo, voce, banco" },
    { label: "Obiettivo", value: "distinguere pulsazione, ritmo, tempo, accento e metro" },
  ],
  heroNote: "La pulsazione tiene insieme il gruppo. Ritmo, accenti e metro dicono come quel battito prende forma.",
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
    title: "Trova il battito comune",
    intro: "All'inizio ognuno segue il proprio impulso. Poi il gruppo prova a entrare nello stesso battito.",
    cardTitle: "",
    meta: [
      { label: "Durata", value: "30 secondi" },
      { label: "Ti serve", value: "corpo, banco o piccolo spazio libero" },
      { label: "Alla fine", value: "senti una pulsazione condivisa" },
    ],
    steps: [
      "Cammina lentamente o batti le mani sul banco.",
      "Ascolta gli altri e cerca il battito che torna uguale per tutti.",
      "Resta su quel battito senza accelerare.",
    ],
    observe: [
      "Che cosa resta uguale mentre i gesti cambiano?",
      "Dove senti il battito che ritorna sempre?",
      "Quando il gruppo accelera, cambia il ritmo o cambia il tempo?",
    ],
    result: "Riconosci il battito comune sotto i gesti del gruppo.",
  },
  exploration: {
    label: "Esplorazione",
    title: "Sotto il ritmo c'e un battito che ritorna",
    intro:
      "Cammino, danza, lavoro e gioco fanno sentire un ordine. Quel centro regolare si chiama pulsazione. Sopra quel centro il ritmo puo muoversi.",
    paragraphs: [
      "Se la pulsazione resta stabile, il gruppo non si perde anche quando il ritmo cambia.",
      "Gli accenti aiutano a sentire se il battito si organizza a 2, a 3 o a 4.",
    ],
    questions: [
      "Dove senti il battito regolare?",
      "L'accento cade ogni 2, 3 o 4 pulsazioni?",
      "Il tempo resta uguale o cambia?",
    ],
  },
  listeningSamples: [
    {
      id: "a",
      label: "Ascolto 1 · Battito regolare",
      title: "Passo condiviso",
      focus: "Pulsazione in 2",
      description: "Molti movimenti si appoggiano a coppie regolari: uno-due, uno-due. Qui il battito comune si sente con chiarezza.",
      action: "Cammina o batti due colpi regolari: uno-due, uno-due.",
      expectedGroup: 2,
    },
    {
      id: "b",
      label: "Ascolto 2 · Accento che ritorna",
      title: "Dondolio in 3",
      focus: "Pulsazione in 3",
      description: "Alcune danze e alcuni movimenti fanno sentire gruppi di tre. Il primo battito orienta, gli altri completano il giro.",
      action: "Conta uno-due-tre e rendi piu forte il primo battito.",
      expectedGroup: 3,
    },
    {
      id: "c",
      label: "Ascolto 3 · Ritmo che cambia",
      title: "Ostinato e variazione",
      focus: "Pulsazione in 4",
      description: "Il battito sotto resta fermo mentre sopra appaiono pause, accenti e contrasti. La sfida e non perdere il centro.",
      action: "Tieni quattro pulsazioni regolari con una mano e prova un ritmo diverso con l'altra o con la voce.",
      expectedGroup: 4,
    },
  ],
  active: {
    label: "Comprensione attiva",
    title: "Tieni la pulsazione. Cambia il ritmo.",
    intro:
      "Prima mantieni il battito comune. Poi aggiungi pause, accenti e contrasti senza perdere il centro.",
    cardTitle: "Prova con il corpo e con i segni",
    meta: [
      { label: "Durata", value: "15 minuti" },
      { label: "Ti serve", value: "corpo, voce, banco, foglio" },
      { label: "Alla fine", value: "leggi e costruisci una sequenza di 8 tempi" },
    ],
    steps: [
      "Scegli una pulsazione stabile.",
      "Decidi se l'accento torna a 2, a 3 o a 4.",
      "Aggiungi un ritmo diverso senza perdere la pulsazione.",
      "Rendi visibile la sequenza con segni semplici.",
    ],
    observe: [
      "Il battito sotto resta stabile?",
      "Gli accenti fanno sentire il gruppo?",
      "Il ritmo cambia senza coprire la pulsazione?",
    ],
    result: "Sai distinguere il battito comune dal disegno ritmico.",
  },
  conceptRows: [
    {
      term: "Pulsazione",
      text: "E il battito regolare che fa da riferimento al gruppo.",
      example: "TA TA TA TA",
    },
    {
      term: "Ritmo",
      text: "E il disegno di suoni e pause che si appoggia alla pulsazione.",
      example: "TA - TA TA",
    },
    {
      term: "Tempo",
      text: "E la velocita con cui ritorna la pulsazione.",
      example: "LENTO / MEDIO / VELOCE",
    },
    {
      term: "Accento",
      text: "E il punto che senti piu forte o piu evidente.",
      example: "> ta ta",
    },
    {
      term: "Metro",
      text: "E il modo regolare con cui gli accenti si organizzano in gruppi.",
      example: "2 / 3 / 4",
    },
  ],
  pulseModes: [
    { id: "slow", label: "Lenta", bpm: 66 },
    { id: "medium", label: "Media", bpm: 88 },
    { id: "fast", label: "Veloce", bpm: 112 },
  ],
  sequenceStates: [
    { id: "sound", label: "Suono", symbol: "●" },
    { id: "pause", label: "Pausa", symbol: "○" },
    { id: "accent", label: "Accento", symbol: "◉" },
  ],
  sequencePresets: {
    simple: Array.from({ length: 8 }, () => "sound"),
    pauses: ["sound", "pause", "sound", "pause", "sound", "sound", "pause", "sound"],
    accents: ["accent", "sound", "sound", "sound", "accent", "sound", "sound", "sound"],
  },
  followupTitle: "Dopo la prova, porta il battito verso una forma condivisa",
  followupIntro:
    "Qui il centro resta pratico: prima fissi il gesto, poi lo trasformi in produzione di gruppo, confronto e verifica rapida.",
  followupDefault: "produzione",
  followups: {
    rielaborazione: {
      label: "Rielaborazione",
      title: "Fissa tre parole nel quaderno",
      meta: [
        { label: "Durata", value: "6 minuti" },
        { label: "Ti serve", value: "quaderno o voce" },
        { label: "Alla fine", value: "distingui tre idee chiave" },
      ],
      steps: [
        "Scrivi con parole tue che cos'e la pulsazione.",
        "Spiega come il ritmo si appoggia alla pulsazione.",
        "Aggiungi che cosa cambia quando il tempo diventa piu lento o piu veloce.",
      ],
      observe: [
        "Le tre definizioni sono diverse tra loro?",
        "Riesci a fare un esempio per ogni parola?",
      ],
      result: "Le idee chiave diventano piu stabili nella memoria.",
    },
    produzione: {
      label: "Produzione",
      title: "Crea un pattern di gruppo",
      meta: [
        { label: "Durata", value: "12 minuti" },
        { label: "Ti serve", value: "corpo, voce, banco" },
        { label: "Alla fine", value: "un gruppo fa sentire il proprio metro" },
      ],
      steps: [
        "Scegli chi tiene la pulsazione stabile.",
        "Decidi se il metro torna a 2, a 3 o a 4.",
        "Aggiungi un ritmo che non faccia sparire il battito comune.",
      ],
      observe: [
        "La pulsazione resta chiara dall'inizio alla fine?",
        "Il ritmo si distingue dal battito comune?",
      ],
      result: "Il gruppo costruisce una sequenza leggibile e condivisa.",
    },
    condivisione: {
      label: "Condivisione",
      title: "Fallo riconoscere a un altro gruppo",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "la sequenza preparata" },
        { label: "Alla fine", value: "un altro gruppo riconosce il metro" },
      ],
      steps: [
        "Fai ascoltare la sequenza senza spiegare tutto subito.",
        "Chiedi all'altro gruppo se sente 2, 3 o 4 pulsazioni.",
        "Correggi solo il punto che crea piu confusione.",
      ],
      observe: [
        "L'altro gruppo riconosce la pulsazione?",
        "Gli accenti fanno capire il metro?",
      ],
      result: "Capisci se la tua sequenza comunica davvero.",
    },
    valutazione: {
      label: "Valutazione",
      title: "Controlla che cosa hai capito",
      meta: [
        { label: "Durata", value: "8 minuti" },
        { label: "Ti serve", value: "voce o quaderno" },
        { label: "Alla fine", value: "distingui parole e gesti chiave" },
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Che cos'e la pulsazione?",
          options: [
            {
              id: "q1a",
              label: "Il battito regolare che sostiene la musica.",
              correct: true,
              feedback: "Esatto. La pulsazione e il battito comune che tiene insieme il gruppo.",
            },
            {
              id: "q1b",
              label: "Una pausa molto lunga.",
              correct: false,
              feedback: "No. La pulsazione non e una pausa: e il battito che ritorna regolare.",
            },
          ],
        },
        {
          id: "q2",
          prompt: "Che cos'e il ritmo?",
          options: [
            {
              id: "q2a",
              label: "L'organizzazione di suoni e silenzi nel tempo.",
              correct: true,
              feedback: "Esatto. Il ritmo si appoggia alla pulsazione ma ne cambia il disegno.",
            },
            {
              id: "q2b",
              label: "Il battito che torna sempre uguale.",
              correct: false,
              feedback: "Non proprio. Qui stai descrivendo la pulsazione, non il ritmo.",
            },
          ],
        },
        {
          id: "q3",
          prompt: "Che cos'e il tempo?",
          options: [
            {
              id: "q3a",
              label: "La velocita della pulsazione.",
              correct: true,
              feedback: "Esatto. Il tempo dice se il battito scorre lento, medio o veloce.",
            },
            {
              id: "q3b",
              label: "Il numero totale dei suoni prodotti.",
              correct: false,
              feedback: "No. Il tempo non conta i suoni: descrive la velocita del battito comune.",
            },
          ],
        },
        {
          id: "q4",
          prompt: "A che cosa serve il metro?",
          options: [
            {
              id: "q4a",
              label: "A organizzare gli accenti in gruppi regolari.",
              correct: true,
              feedback: "Esatto. Il metro ti aiuta a sentire se il gruppo torna a 2, a 3 o a 4.",
            },
            {
              id: "q4b",
              label: "A scegliere solo suoni forti.",
              correct: false,
              feedback: "Non proprio. Il metro organizza il ritorno degli accenti.",
            },
          ],
        },
      ],
      selfCheck: [
        "Riesci a distinguere pulsazione, ritmo, tempo, accento e metro?",
        "Riesci a riconoscere se il tempo e lento, medio o veloce?",
        "Riesci a tenere il battito comune mentre un compagno cambia ritmo?",
      ],
    },
    chiusura: {
      label: "Chiusura",
      title: "Ricorda il centro del lavoro",
      line: "La pulsazione e il battito comune. Il ritmo e il disegno che si appoggia sopra. Il tempo decide quanto velocemente quel battito ritorna.",
      bridge: "Nella prossima lezione userai corpo, voce e pausa per trasformare quel battito in una frase sonora leggibile dal gruppo.",
    },
  },
};

function buildGroupSequence(groupSize) {
  const sequence = [];

  while (sequence.length < 8) {
    for (let index = 1; index <= groupSize && sequence.length < 8; index += 1) {
      sequence.push(index);
    }
  }

  return sequence;
}

function getMeterTone(groupSize) {
  if (groupSize === 2) {
    return { "--meter-bg": "#f0efe9", "--meter-accent": "#171717", "--meter-soft": "#e1dfd6" };
  }

  if (groupSize === 3) {
    return { "--meter-bg": "#ebe9e1", "--meter-accent": "#2b2a27", "--meter-soft": "#ddd9cf" };
  }

  return { "--meter-bg": "#f3f3f0", "--meter-accent": "#3a3b35", "--meter-soft": "#e5e5df" };
}

function OpeningSection() {
  return (
    <LessonSection id="apertura" title={lesson.opening.title} intro={lesson.opening.intro}>
      <Panel title={lesson.opening.cardTitle}>
        <ActivityLayout
          steps={lesson.opening.steps}
          observe={lesson.opening.observe}
          result={lesson.opening.result}
          right={<SimpleTimer total={30} startLabel="Avvia 30 secondi" />}
        />
      </Panel>
    </LessonSection>
  );
}

function ListeningGrid() {
  return (
    <div className="lesson-card-grid lesson-card-grid--three">
      {lesson.listeningSamples.map((sample) => (
        <article key={sample.id} className="lesson-meter-card">
          <p className="lesson-mini-title">{sample.focus}</p>
          <strong>{sample.title}</strong>
          <p className="lesson-body-text">{sample.description}</p>
          <div className="lesson-meter-preview">
            {buildGroupSequence(sample.expectedGroup).map((beat, index) => (
              <span
                key={`${sample.id}-${index}`}
                className={cn("lesson-meter-preview__beat", beat === 1 && "is-accent")}
                style={getMeterTone(sample.expectedGroup)}
              >
                {beat}
              </span>
            ))}
          </div>
          <p className="lesson-meter-card__action">{sample.action}</p>
        </article>
      ))}
    </div>
  );
}

function ExplorationSection() {
  return (
    <LessonSection id="esplorazione" title={lesson.exploration.title} intro={lesson.exploration.intro} tone="soft">
      <div className="lesson-stack">
        {lesson.exploration.paragraphs.map((paragraph) => (
          <p key={paragraph} className="lesson-body-text">
            {paragraph}
          </p>
        ))}
      </div>
      <ListeningGrid />
      <Panel title="Osserva">
        <PromptList items={lesson.exploration.questions} />
      </Panel>
    </LessonSection>
  );
}

function PulseBoard() {
  const reducedMotion = usePrefersReducedMotion();
  const [mode, setMode] = useState(lesson.pulseModes[1]);
  const [activeBeat, setActiveBeat] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setActiveBeat(0);
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveBeat((value) => (value + 1) % 4);
    }, (60 / mode.bpm) * 1000);

    return () => window.clearInterval(interval);
  }, [mode, reducedMotion]);

  return (
    <div className="lesson-pulse-stage">
      <div className="lesson-choice-row">
        {lesson.pulseModes.map((item) => (
          <button
            key={item.id}
            type="button"
            className={cn("lesson-choice", mode.id === item.id && "is-active")}
            onClick={() => setMode(item)}
          >
            {item.label} · {item.bpm} bpm
          </button>
        ))}
      </div>

      <div className="lesson-pulse-beats">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={cn("lesson-pulse-beat", activeBeat === index && "is-live")}>
            <span className="lesson-pulse-beat__number">{index + 1}</span>
            <small>{index === 0 ? "riparte" : "continua"}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function RhythmSequencerBoard() {
  const [selectedState, setSelectedState] = useState(lesson.sequenceStates[0].id);
  const [sequence, setSequence] = useState(Array.from({ length: 8 }, () => "sound"));

  return (
    <div className="lesson-sequence">
      <div className="lesson-choice-row">
        {lesson.sequenceStates.map((item) => (
          <button
            key={item.id}
            type="button"
            className={cn("lesson-choice", item.id === selectedState && "is-active")}
            onClick={() => setSelectedState(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="lesson-sequence__board" aria-label="Sequenza ritmica di otto tempi">
        {sequence.map((state, index) => {
          const item = lesson.sequenceStates.find((entry) => entry.id === state) || lesson.sequenceStates[0];

          return (
            <button
              key={`${state}-${index}`}
              type="button"
              aria-label={`Tempo ${index + 1}: ${item.label}`}
              className={cn("lesson-sequence__cell", state === "pause" && "is-pause", state === "accent" && "is-accent")}
              onClick={() =>
                setSequence((current) => {
                  const next = [...current];
                  next[index] = selectedState;
                  return next;
                })
              }
            >
              <strong>{item.symbol}</strong>
              <small>{item.label.slice(0, 2).toUpperCase()}</small>
            </button>
          );
        })}
      </div>

      <div className="lesson-choice-row">
        <button type="button" className="lesson-button lesson-button--ghost" onClick={() => setSequence([...lesson.sequencePresets.simple])}>
          Regolare
        </button>
        <button type="button" className="lesson-button lesson-button--ghost" onClick={() => setSequence([...lesson.sequencePresets.pauses])}>
          Con pause
        </button>
        <button type="button" className="lesson-button lesson-button--ghost" onClick={() => setSequence([...lesson.sequencePresets.accents])}>
          Con accenti
        </button>
      </div>

      <p className="lesson-note">● = suono · ○ = pausa · ◉ = accento</p>
    </div>
  );
}

function ConceptBoard() {
  return (
    <div className="lesson-term-list">
      {lesson.conceptRows.map((item) => (
        <div key={item.term} className="lesson-term-list__row">
          <strong>{item.term}</strong>
          <div className="lesson-term-list__content">
            <p>{item.text}</p>
            <div className="lesson-term-list__example">{item.example}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ActiveSection() {
  return (
    <LessonSection id="comprensione-attiva" title={lesson.active.title} intro={lesson.active.intro}>
      <Panel title={lesson.active.cardTitle} meta={lesson.active.meta}>
        <ActivityLayout
          steps={lesson.active.steps}
          observe={lesson.active.observe}
          result={lesson.active.result}
          right={<PulseBoard />}
        />
      </Panel>
      <div className="lesson-card-grid lesson-card-grid--two">
        <Panel title="Pratica">
          <RhythmSequencerBoard />
        </Panel>
        <Panel title="Mappa rapida">
          <ConceptBoard />
        </Panel>
      </div>
      <Panel title="Ascolto interno">
        <PromptList items={lesson.exploration.questions} />
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

export default function RitmoPulsazioneTempoLesson() {
  const activeId = useActiveSection(["apertura", "esplorazione", "comprensione-attiva", "rielaborazione"]);
  const [selectedFollowup, setSelectedFollowup] = useState(lesson.followupDefault);

  return (
    <div className="lesson-editorial-page" data-lesson-model={lesson.model.id} data-lesson-id="ritmo-pulsazione-tempo">
      <LessonHero
        title={lesson.title}
        question={null}
        subtitle={lesson.subtitle}
        heroNote={lesson.heroNote}
        breadcrumbs={lesson.breadcrumbs}
        heroWord={lesson.heroWord}
        heroPrelude={lesson.heroPrelude}
        heroEcho={lesson.heroEcho}
        heroTags={lesson.heroTags}
      />
      <MetaStrip items={lesson.opening.meta} />
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
      <LessonBottomBar
        mapHref={lesson.navigation.mapHref}
        previousHref={lesson.navigation.previousHref}
        homeHref={lesson.navigation.homeHref}
      />
    </div>
  );
}
