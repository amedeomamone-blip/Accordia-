import React, { useEffect, useState } from "https://esm.sh/react@18";

const HERO_IMAGE = "/assets/lesson/corpo-voce-gesto/lascaux-painting.jpg";
const GALLERY_IMAGES = [
  {
    src: "/assets/lesson/corpo-voce-gesto/lascaux-painting.jpg",
    title: "Segni sulla parete",
    caption: "Prima della scrittura musicale, gesto e movimento lasciano gia tracce di rito, memoria e coordinazione del gruppo.",
  },
  {
    src: "/assets/lesson/corpo-voce-gesto/hands-clapping.jpg",
    title: "Mani e pulsazione",
    caption: "Le pratiche corporee e vocali aiutano a costruire un battito comune, distinguere i timbri e rendere visibile il ritmo.",
  },
  {
    src: "/assets/lesson/corpo-voce-gesto/divje-babe-flute.jpg",
    title: "Primi strumenti",
    caption: "Anche quando compaiono strumenti semplici, corpo, voce e gesto restano la base dell'improvvisazione e della memoria sonora.",
  },
];

const lesson = {
  nucleus: "Origini del suono",
  title: "Corpo, voce e gesto",
  question: "Come fa un gesto a diventare musica senza strumenti?",
  intro:
    "Le fonti didattiche sulle origini del suono insistono su ascolto, multisensorialita, improvvisazione, corpo, voce e segni grafici semplici. In questa lezione la classe parte dal silenzio, costruisce una sequenza corporea e la trasforma in una piccola partitura leggibile.",
  breadcrumbs: [
    { label: "Home", href: "../../../../index.html" },
    { label: "Origini del suono", href: "../../index.html" },
    { label: "Corpo, voce e gesto" },
  ],
  heroCaption: "Prima della notazione tradizionale, il suono vive gia come respiro, voce, battito, gesto condiviso e memoria del gruppo.",
  flow: [
    { id: "apertura", label: "Apertura" },
    { id: "esplorazione", label: "Esplorazione" },
    { id: "comprensione-attiva", label: "Comprensione attiva" },
    { id: "rielaborazione", label: "Rielaborazione" },
    { id: "produzione", label: "Produzione" },
    { id: "condivisione", label: "Condivisione" },
    { id: "valutazione", label: "Valutazione" },
    { id: "chiusura", label: "Chiusura" },
  ],
  openingPrompts: [
    "Quali suoni nascono dal tuo corpo e quali arrivano dall'ambiente?",
    "Quale gesto trasforma un rumore in segnale condiviso?",
    "Quali suoni del corpo sono secchi, lunghi, gravi o leggeri?",
    "Quando il silenzio prepara meglio l'attacco del gruppo?",
  ],
  contextText:
    "Prima degli strumenti musicali, gli esseri umani hanno usato il corpo, la voce e il gesto per richiamare, coordinare, imitare, celebrare e ricordare. Le guide didattiche consultate insistono su ascolto, improvvisazione e produzione sonora con corpo, voce e oggetti, accompagnate da segni grafici semplici che aiutano il gruppo a ricordare e ripetere.",
  explorationQuestions: [
    "In quali momenti voce e gesto aiutano il gruppo a partire insieme?",
    "Quale parte del corpo produce un suono piu secco, piu lungo o piu grave?",
    "Quando una pausa o un respiro rendono piu chiara la sequenza?",
  ],
  conceptRows: [
    {
      title: "Suono",
      definition: "E un evento percepito che nasce da una vibrazione e acquista senso quando viene ascoltato.",
      example: "Una mano che batte, un piede che colpisce il pavimento o una sillaba detta insieme possono diventare materiali musicali.",
      visual: "sound",
    },
    {
      title: "Rumore",
      definition: "E un suono non ancora selezionato o non ancora condiviso come segnale musicale.",
      example: "Un colpo casuale resta rumore finche il gruppo non lo sceglie, lo ripete e gli assegna una funzione.",
      visual: "noise",
    },
    {
      title: "Silenzio",
      definition: "Non e vuoto: e una condizione attiva di ascolto, attesa e orientamento.",
      example: "Una pausa comune rende piu chiaro l'attacco successivo e aiuta il gruppo a respirare insieme.",
      visual: "silence",
    },
    {
      title: "Corpo sonoro",
      definition: "E il corpo considerato come sorgente sonora e spazio di risonanza.",
      example: "Mani, piedi, petto, cosce, respiro e postura offrono timbri diversi e gia organizzabili.",
      visual: "body",
    },
    {
      title: "Voce",
      definition: "E respiro trasformato in richiamo, sillaba, fonema, canto o scansione ritmica.",
      example: "Una sillaba breve come ta o tum aiuta memoria, attacco comune e imitazione della sequenza.",
      visual: "voice",
    },
    {
      title: "Gesto intenzionale",
      definition: "E il movimento che avvia, interrompe, coordina o rende visibile la musica.",
      example: "Un gesto di attacco, pausa o arresto aiuta tutti a capire quando entrare e come restare insieme.",
      visual: "gesture",
    },
  ],
  reworkingRows: [
    {
      title: "Corpo",
      text: "Il corpo e il primo spazio del suono: mani, piedi, petto, cosce e respiro fanno nascere timbri diversi e aiutano a sentire durata, intensita e pulsazione.",
    },
    {
      title: "Voce",
      text: "La voce chiama, accompagna, memorizza e sostiene il ritmo attraverso fonemi, sillabe, richiami e piccole cellule vocali.",
    },
    {
      title: "Gesto",
      text: "Il gesto prepara il suono, lo rende leggibile al gruppo e coordina attacco, pausa, ripresa e direzione comune.",
    },
  ],
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
  productionSteps: [
    "Scegli una pulsazione comune che tutti riescano a mantenere.",
    "Aggiungi una voce breve o un fonema che aiuti memoria e attacco.",
    "Inserisci almeno una pausa e un gesto chiaro di avvio o arresto.",
    "Trascrivi la sequenza con segni semplici e ripetila finche il gruppo la legge da solo.",
  ],
  sharingRules: [
    "Consegna la sequenza a un altro gruppo mostrando solo i segni e il gesto iniziale.",
    "Chi ascolta prova a ricostruire battito, pause e voce senza spiegazioni lunghe.",
    "Se qualcosa non funziona, semplifica o evidenzia i punti chiave con colore, spazio o accento.",
  ],
  notationLegend: [
    "● mani",
    "■ piedi",
    "▲ cosce",
    "◆ voce",
    "— pausa",
  ],
  quizQuestions: [
    {
      id: "q1",
      prompt: "La musica puo nascere anche senza strumenti?",
      options: [
        {
          id: "q1a",
          label: "Si, se corpo, voce, gesto e silenzio vengono organizzati dal gruppo.",
          correct: true,
          feedback: "Esatto. Le fonti insistono proprio su questo: il suono diventa musica quando e intenzionale, condiviso e ripetibile.",
        },
        {
          id: "q1b",
          label: "No, servono sempre strumenti musicali.",
          correct: false,
          feedback: "Non proprio. Corpo, voce e gesto sono gia risorse sonore complete, anche prima degli strumenti.",
        },
      ],
    },
    {
      id: "q2",
      prompt: "Perche una notazione grafica semplice puo essere utile?",
      options: [
        {
          id: "q2a",
          label: "Perche aiuta memoria, coordinazione e ripetizione anche senza pentagramma.",
          correct: true,
          feedback: "Esatto. Le codificazioni analogiche servono proprio a fissare e condividere il gesto sonoro.",
        },
        {
          id: "q2b",
          label: "Perche sostituisce completamente ascolto e prova.",
          correct: false,
          feedback: "No. Il segno aiuta, ma resta efficace solo se nasce da ascolto, prova e confronto nel gruppo.",
        },
      ],
    },
    {
      id: "q3",
      prompt: "Che funzione ha la pausa in una sequenza corporea?",
      options: [
        {
          id: "q3a",
          label: "Da respiro, chiarisce l'attacco e rende piu leggibile la forma.",
          correct: true,
          feedback: "Esatto. La pausa non cancella la musica: la organizza e la rende piu comprensibile.",
        },
        {
          id: "q3b",
          label: "Serve solo a fermare definitivamente il gruppo.",
          correct: false,
          feedback: "Non proprio. Una pausa puo anzi preparare meglio la ripresa e il gesto successivo.",
        },
      ],
    },
  ],
  selfCheck: [
    "Riesci a distinguere suono, rumore, silenzio e gesto intenzionale?",
    "Riesci a costruire e leggere una sequenza breve con corpo, voce, pausa e segni grafici?",
    "Riesci a spiegare perche il gruppo puo fare musica anche prima degli strumenti?",
  ],
  closingLine: "Il corpo non sostituisce la musica: la inaugura, quando il suono viene ascoltato, scelto e condiviso.",
  closingBridge: "Nella prossima lezione chiediti: che cosa cambia quando il gruppo lavora su pulsazione, ritmo e tempo?",
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length || !("IntersectionObserver" in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0.18, 0.3, 0.5, 0.72],
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

function LessonBreadcrumb({ items }) {
  return (
    <nav className="lesson-breadcrumb" aria-label="Percorso della pagina">
      {items.map((item, index) => (
        <React.Fragment key={`${item.label}-${index}`}>
          {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
          {index < items.length - 1 ? <span className="lesson-breadcrumb__separator">/</span> : null}
        </React.Fragment>
      ))}
    </nav>
  );
}

function LessonHero() {
  return (
    <header className="lesson-hero" id="apertura">
      <LessonBreadcrumb items={lesson.breadcrumbs} />
      <div className="lesson-editorial-shell">
        <div className="lesson-hero__copy">
          <p className="lesson-hero__eyebrow">{lesson.nucleus}</p>
          <h1 className="lesson-hero__title">{lesson.title}</h1>
          <p className="lesson-hero__question">{lesson.question}</p>
          <p className="lesson-hero__intro">{lesson.intro}</p>
        </div>

        <figure className="lesson-hero__media">
          <img src={HERO_IMAGE} alt="Pittura rupestre con figure in movimento che evocano gesto, rito e memoria del suono." loading="eager" />
        </figure>
        <figcaption className="lesson-editorial-shell lesson-hero__caption">{lesson.heroCaption}</figcaption>
      </div>
    </header>
  );
}

function LessonNav({ activeId }) {
  return (
    <nav className="lesson-nav" aria-label="Indice della lezione">
      <div className="lesson-nav__track">
        {lesson.flow.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={cn("lesson-nav__item", activeId === item.id && "is-active")}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function SectionHeader({ label, title, intro }) {
  return (
    <header className="lesson-phase__header">
      <p className="lesson-phase__label">{label}</p>
      <h2 className="lesson-phase__title">{title}</h2>
      {intro ? <p className="lesson-phase__intro">{intro}</p> : null}
    </header>
  );
}

function LessonSection({ id, label, title, intro, tone = "plain", children, width = "wide" }) {
  return (
    <section id={id} className={cn("lesson-phase", tone === "warm" && "lesson-phase--warm", tone === "white" && "lesson-phase--white")}>
      <SectionHeader label={label} title={title} intro={intro} />
      <div className={cn(width === "content" ? "lesson-phase__body--editorial" : "lesson-phase__body--wide")}>{children}</div>
    </section>
  );
}

function ActivityPanel({ title, duration, materials, output, children }) {
  return (
    <section className="lesson-activity-panel">
      <div className="lesson-activity-panel__lead">
        <div>
          <p className="lesson-activity-panel__label">Attivita</p>
          <h3>{title}</h3>
        </div>
        <div className="lesson-activity-panel__meta">
          {duration ? <span>Durata: {duration}</span> : null}
          {materials ? <span>Materiali: {materials}</span> : null}
          {output ? <span>Output: {output}</span> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

function CountdownPanel() {
  const total = 30;
  const [seconds, setSeconds] = useState(total);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    if (seconds === 0) {
      setRunning(false);
      return undefined;
    }
    const timer = window.setTimeout(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [running, seconds]);

  return (
    <LessonSection
      id="apertura-panel"
      label="Apertura"
      title="Ascolta prima di suonare."
      intro="Prenditi trenta secondi per distinguere i suoni del corpo, dell'ambiente e del gesto intenzionale."
      width="wide"
    >
      <ActivityPanel
        title="Fermati e senti"
        duration="30 secondi"
        materials="silenzio, corpo, banco o piccolo spazio"
        output="una prima mappa dei suoni presenti"
      >
        <div className="lesson-opening-panel">
          <div className="lesson-opening-panel__copy lesson-prose">
            <p>Prima fermati. Poi ascolta quello che succede intorno a te: respiro, passi, sfregamenti, voci, sedie, banco.</p>
            <p>Quando il tempo finisce, prova a dire quali suoni nascono dal corpo e quali dall'ambiente.</p>
            <ul className="lesson-bullets">
              {lesson.openingPrompts.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="lesson-countdown">
            <div className="lesson-countdown__dial" aria-live="polite">
              <svg viewBox="0 0 120 120" className="lesson-countdown__ring" aria-hidden="true">
                <circle cx="60" cy="60" r="52" pathLength="100" />
                <circle cx="60" cy="60" r="52" pathLength="100" style={{ strokeDasharray: "100", strokeDashoffset: 100 - (seconds / total) * 100 }} />
              </svg>
              <div className="lesson-countdown__value">
                <span>timer</span>
                <strong>{seconds}</strong>
              </div>
            </div>
            <div className="lesson-countdown__actions">
              <button
                type="button"
                className="lesson-action"
                onClick={() => {
                  setSeconds(total);
                  setRunning(true);
                }}
              >
                Avvia 30 secondi
              </button>
              <button
                type="button"
                className="lesson-action lesson-action--secondary"
                onClick={() => {
                  setRunning(false);
                  setSeconds(total);
                }}
              >
                Reimposta
              </button>
            </div>
          </div>
        </div>
      </ActivityPanel>
    </LessonSection>
  );
}

function ExplorationSection() {
  return (
    <LessonSection
      id="esplorazione"
      label="Esplorazione"
      title="Prima degli strumenti, il gruppo aveva gia corpo, voce e gesto."
      intro="La musica delle origini si appoggia a movimento, imitazione, richiamo, memoria e ripetizione condivisa."
      tone="white"
    >
      <div className="lesson-split">
        <div className="lesson-split__copy lesson-prose">
          <p>{lesson.contextText}</p>
          <ul className="lesson-bullets">
            {lesson.explorationQuestions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="lesson-gallery">
          {GALLERY_IMAGES.map((item) => (
            <figure key={item.title} className="lesson-gallery__figure">
              <div className="lesson-gallery__media">
                <img src={item.src} alt={item.caption} loading="lazy" />
              </div>
              <figcaption className="lesson-gallery__caption">
                <strong>{item.title}</strong>
                <p>{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </LessonSection>
  );
}

function BodyConceptVisual({ type }) {
  if (type === "sound") {
    return (
      <div className="lesson-dot-row">
        <span className="lesson-dot lesson-dot--accent" />
        <span className="lesson-dot" />
        <span className="lesson-dot" />
      </div>
    );
  }

  if (type === "noise") {
    return (
      <div className="lesson-speed-row lesson-speed-row--compact">
        <span>colpo</span>
        <span>urto</span>
        <span>caso</span>
      </div>
    );
  }

  if (type === "silence") {
    return (
      <div className="lesson-dot-row">
        <span className="lesson-dot lesson-dot--pause" />
        <span className="lesson-dot lesson-dot--pause" />
        <span className="lesson-dot lesson-dot--accent" />
      </div>
    );
  }

  if (type === "body") {
    return (
      <div className="lesson-speed-row lesson-speed-row--compact">
        <span>mani</span>
        <span>piedi</span>
        <span>voce</span>
      </div>
    );
  }

  if (type === "voice") {
    return (
      <div className="lesson-speed-row lesson-speed-row--compact">
        <span>ta</span>
        <span>tum</span>
        <span>ah</span>
      </div>
    );
  }

  return (
    <div className="lesson-speed-row lesson-speed-row--compact">
      <span>attacco</span>
      <span>pausa</span>
      <span>ripresa</span>
    </div>
  );
}

function ConceptsSection() {
  return (
    <LessonSection
      id="comprensione-attiva"
      label="Comprensione attiva"
      title="Sei parole ti aiutano a dare nome a quello che fai."
      intro="Le definizioni restano brevi, ma ogni parola va collegata a un esempio pratico del gruppo."
      width="content"
    >
      <div className="lesson-terms">
        {lesson.conceptRows.map((item) => (
          <article key={item.title} className="lesson-term">
            <div className="lesson-term__name">
              <h3>{item.title}</h3>
              <div className="lesson-term__visual">
                <BodyConceptVisual type={item.visual} />
              </div>
            </div>
            <div className="lesson-term__body lesson-prose">
              <p>{item.definition}</p>
              <p className="lesson-term__example">{item.example}</p>
            </div>
          </article>
        ))}
      </div>
    </LessonSection>
  );
}

function ReworkingSection() {
  return (
    <LessonSection
      id="rielaborazione"
      label="Rielaborazione"
      title="Il suono diventa musica quando il gruppo lo sceglie e lo organizza."
      intro="Corpo, voce e gesto non sono tre elementi separati: lavorano insieme per dare forma, memoria e intenzione al suono."
      tone="warm"
    >
      <div className="lesson-split">
        <div className="lesson-split__copy lesson-prose">
          <p>
            Un gesto casuale puo produrre rumore. Lo stesso gesto, ripetuto con una funzione chiara, puo diventare musica. La differenza sta
            nell'intenzione, nell'ascolto e nella capacita del gruppo di riconoscere un ordine condiviso.
          </p>
          <p>
            Quando il suono si organizza nel tempo, il gruppo puo ricordarlo, ripeterlo e trasmetterlo anche senza spartito tradizionale.
          </p>
        </div>

        <div className="lesson-copyboard">
          {lesson.reworkingRows.map((item) => (
            <article key={item.title} className="lesson-copyboard__item">
              <p className="lesson-copyboard__label">{item.title}</p>
              <blockquote>"{item.text}"</blockquote>
            </article>
          ))}
        </div>
      </div>
    </LessonSection>
  );
}

function SequenceBoard() {
  const [selectedSource, setSelectedSource] = useState(lesson.sourceOptions[0].id);
  const [sequence, setSequence] = useState([...lesson.sequencePresets.simple]);

  return (
    <div className="lesson-sequencer">
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

      <div className="lesson-sequencer-board" aria-label="Sequenza di otto tempi disposta su due righe da quattro">
        {sequence.map((state, index) => {
          const item = lesson.sourceOptions.find((entry) => entry.id === state) || lesson.sourceOptions[0];
          return (
            <button
              key={`${state}-${index}`}
              type="button"
              className={cn("lesson-sequencer-cell", state === "pausa" && "is-pause")}
              onClick={() =>
                setSequence((current) => {
                  const next = [...current];
                  next[index] = selectedSource;
                  return next;
                })
              }
            >
              <span className="lesson-sequencer-cell__kicker">tempo {index + 1}</span>
              <strong>{item.symbol}</strong>
              <small>{item.short}</small>
            </button>
          );
        })}
      </div>

      <div className="lesson-choice-row">
        <button type="button" className="lesson-action lesson-action--secondary" onClick={() => setSequence([...lesson.sequencePresets.simple])}>
          Esempio semplice
        </button>
        <button type="button" className="lesson-action lesson-action--secondary" onClick={() => setSequence([...lesson.sequencePresets.echo])}>
          Richiamo
        </button>
        <button type="button" className="lesson-action lesson-action--secondary" onClick={() => setSequence([...lesson.sequencePresets.contrast])}>
          Contrasto
        </button>
      </div>

      <p className="lesson-sequencer__legend">{lesson.sourceOptions.map((item) => `${item.symbol} = ${item.label.toLowerCase()}`).join(" · ")}</p>
    </div>
  );
}

function ProductionSection() {
  return (
    <LessonSection
      id="produzione"
      label="Produzione"
      title="Costruisci una sequenza con corpo, voce e pausa."
      intro="Scrivi otto tempi, provali con il gruppo e controlla se il ritmo resta chiaro senza spiegazioni lunghe."
      tone="white"
    >
      <ActivityPanel
        title="Sequenza del corpo"
        duration="15 minuti"
        materials="corpo, voce, banco, spazio minimo"
        output="una sequenza di 8 tempi"
      >
        <div className="lesson-split lesson-split--equal">
          <div className="lesson-split__copy lesson-prose">
            <div className="lesson-steps">
              {lesson.productionSteps.map((step, index) => (
                <div key={step} className="lesson-steps__row">
                  <span className="lesson-step-index">{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-split__media">
            <SequenceBoard />
          </div>
        </div>
      </ActivityPanel>
    </LessonSection>
  );
}

function SharingSection() {
  return (
    <LessonSection
      id="condivisione"
      label="Condivisione"
      title="Fai leggere la tua sequenza a un altro gruppo."
      intro="Quando il segno e chiaro, il gruppo puo ripetere il ritmo senza dipendere da una spiegazione continua."
      width="content"
    >
      <ActivityPanel
        title="Passa il ritmo"
        duration="10 minuti"
        materials="sequenza scritta e ascolto reciproco"
        output="una restituzione breve e comprensibile"
      >
        <div className="lesson-inline-grid">
          <div className="lesson-prose">
            <h3>Che cosa fai</h3>
            <ul className="lesson-bullets">
              {lesson.sharingRules.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="lesson-prose">
            <h3>Legenda minima</h3>
            <div className="lesson-speed-row lesson-speed-row--stacked">
              {lesson.notationLegend.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <p>
              Se vuoi, aggiungi un segno finale o una pausa piu lunga per rendere ancora piu leggibile l'ultimo attacco.
            </p>
          </div>
        </div>
      </ActivityPanel>
    </LessonSection>
  );
}

function QuizPanel() {
  const [answers, setAnswers] = useState({});

  return (
    <div className="lesson-quiz-panel">
      {lesson.quizQuestions.map((question) => {
        const selected = answers[question.id];
        const selectedOption = question.options.find((option) => option.id === selected);

        return (
          <article key={question.id} className="lesson-question-block">
            <h3>{question.prompt}</h3>
            <div className="lesson-option-list">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={cn(
                    "lesson-option",
                    selected === option.id && option.correct && "is-correct",
                    selected === option.id && !option.correct && "is-wrong"
                  )}
                  onClick={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {selectedOption ? <p className="lesson-question-block__feedback">{selectedOption.feedback}</p> : null}
          </article>
        );
      })}
    </div>
  );
}

function EvaluationSection() {
  return (
    <LessonSection
      id="valutazione"
      label="Valutazione"
      title="Controlla che cosa riesci a spiegare."
      intro="Alla fine della lezione dovresti riconoscere i suoni usati, dire come li hai organizzati e spiegare perche possono essere considerati musica."
      tone="warm"
    >
      <ActivityPanel title="Verifica leggera" duration="10 minuti" output="spiegare il rapporto tra corpo, gesto e musica">
        <div className="lesson-inline-grid">
          <QuizPanel />

          <div className="lesson-self-check">
            <h3>Autovalutazione</h3>
            <div className="lesson-self-check__rows">
              {lesson.selfCheck.map((item) => (
                <article key={item} className="lesson-self-check__row">
                  <p>{item}</p>
                  <div className="lesson-self-check__choices" aria-hidden="true">
                    <span>ancora no</span>
                    <span>abbastanza</span>
                    <span>si</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </ActivityPanel>
    </LessonSection>
  );
}

function ClosingSection() {
  return (
    <LessonSection
      id="chiusura"
      label="Chiusura"
      title="Ricorda l'idea chiave."
      intro="Il suono diventa musica quando viene organizzato con intenzione e condiviso dal gruppo."
      width="content"
    >
      <div className="lesson-closing">
        <p className="lesson-closing__line">{lesson.closingLine}</p>
        <p className="lesson-closing__bridge">{lesson.closingBridge}</p>
      </div>
    </LessonSection>
  );
}

export default function CorpoVoceGestoLesson() {
  const activeId = useActiveSection(lesson.flow.map((item) => item.id));

  return (
    <div className="lesson-editorial-page">
      <LessonHero />
      <LessonNav activeId={activeId} />
      <CountdownPanel />
      <ExplorationSection />
      <ConceptsSection />
      <ReworkingSection />
      <ProductionSection />
      <SharingSection />
      <EvaluationSection />
      <ClosingSection />
    </div>
  );
}
