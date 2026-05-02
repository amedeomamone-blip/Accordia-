import React, { useEffect, useMemo, useRef, useState } from "https://esm.sh/react@18";

const APP_FONT = "'SF Pro Display','SF Pro Text',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif";
const ACCENT = "#c66a18";
const RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c66a18] focus-visible:ring-offset-2 focus-visible:ring-offset-white";
const LESSON_SHELL = "mx-auto max-w-[84rem] px-4 sm:px-6 lg:px-8";
const LESSON_SHELL_WIDE = "mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8";
const LESSON_SHELL_COMPACT = "mx-auto max-w-[78rem] px-4 sm:px-6 lg:px-8";
const SECTION_SPACE = "py-20 sm:py-24 lg:py-28";
const PANEL_BASE = "rounded-[2rem] border border-slate-200/70 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.04)]";
const PANEL_SOFT = "rounded-[2rem] border border-slate-200/60 bg-[#fcfbf8] shadow-[0_10px_24px_rgba(15,23,42,0.03)]";
const PANEL_SUBTLE = "rounded-[1.5rem] border border-slate-200/70 bg-[#fcfbf8]";
const BODY_COPY = "text-[1.02rem] leading-8 text-slate-600 sm:text-[1.08rem]";
const BODY_COPY_SOFT = "text-[0.95rem] leading-7 text-slate-500 sm:text-base";
const BUTTON_BASE =
  "lesson-control-button inline-flex min-h-11 items-center justify-center rounded-full border border-solid px-5 py-2.5 text-sm font-semibold tracking-[-0.01em] transition-colors duration-150";
const PILL_BASE =
  "lesson-control-pill inline-flex min-h-10 items-center rounded-full border border-solid bg-white px-4 py-2 text-[0.84rem] font-semibold tracking-[-0.01em] transition-colors duration-150";
const PILL_DEFAULT = `${PILL_BASE} border-[#e4e8ee] text-[#5e646c] hover:border-[#d7dde5] hover:text-[#18191b]`;
const PILL_ACTIVE = `${PILL_BASE} border-[#dde2e8] text-[#18191b]`;
const TAG_CLASS =
  "inline-flex items-center rounded-full border border-[#f1dec9] bg-[#fff6ed] px-3.5 py-1.5 text-sm font-medium text-[#8a4d18]";
const SMALL_LABEL = "text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-400";

const lessonData = {
  title: "Ritmo, pulsazione e tempo",
  subtitle: "Misurare il gesto collettivo.",
  sections: [
    {
      id: "hero",
      eyebrow: "ORIGINI DEL SUONO",
      title: "Ritmo, pulsazione e tempo",
      subtitle: "Misurare il gesto collettivo.",
      microtext:
        "Prima di leggere una partitura, possiamo sentire il tempo con il corpo. In questa lezione impariamo a distinguere pulsazione, ritmo, accento e tempo attraverso mani, piedi, voce, ascolto e gesto.",
      cta: "Inizia dal battito comune",
      idea: "Il ritmo nasce dall'organizzazione del movimento e rende condivisibile il tempo del gruppo.",
      question: "Possiamo stare tutti nello stesso tempo?",
    },
    {
      id: "spark",
      title: "Possiamo stare tutti nello stesso tempo?",
      text: "Camminiamo lentamente nello spazio o battiamo le mani sul banco. All'inizio ognuno segue il proprio impulso. Poi proviamo a trovare una pulsazione comune, uguale per tutti.",
      questions: [
        "Che cosa cambia quando il gruppo si sincronizza?",
        "Che cosa ci aiuta a restare insieme?",
        "Il tempo si sente solo con le orecchie o anche con il corpo?",
        "Che differenza c'e tra battere insieme e inventare un ritmo?",
      ],
      keywords: ["pulsazione", "gruppo", "ascolto", "sincronizzazione"],
    },
    {
      id: "pulse",
      title: "La pulsazione e il passo comune.",
      text: "La pulsazione e un battito regolare. Puo essere lenta o veloce, ma resta costante. E come un passo condiviso: permette al gruppo di muoversi, suonare e cantare insieme.",
      support: "Osserva: la pulsazione non cambia forma, cambia velocita.",
    },
    {
      id: "concepts",
      title: "Pulsazione, ritmo, accento, tempo.",
      text: "Usiamo parole semplici, simboli chiari e piccoli esempi per capire come funziona il tempo musicale.",
      closing: "La pulsazione e regolare. Il ritmo si muove sopra di lei.",
    },
    {
      id: "map",
      title: "Come si organizza il tempo musicale?",
      text: "La mappa mette in relazione battito regolare, accenti, gruppi di pulsazioni, gesto visibile e modi semplici per ricordare quello che facciamo.",
    },
    {
      id: "listening",
      title: "Dov'e la pulsazione?",
      text: "Guardiamo tre situazioni di ascolto senza usare brani coperti da copyright. Il compito non e indovinare un titolo: e capire dove si sente il battito comune.",
    },
    {
      id: "sequencer",
      title: "Costruiamo un ritmo sopra la pulsazione.",
      text: "Scegli una pulsazione stabile. Poi costruisci una sequenza di 8 tempi usando mani, piedi, voce o banco. Il ritmo deve poter essere ripetuto dal gruppo.",
    },
    {
      id: "conductor",
      title: "Il direttore del tempo.",
      text: "Il direttore non parla. Usa il gesto per far partire il gruppo, mantenere la pulsazione, indicare gli accenti e fermare l'esecuzione.",
      note: "Il battere e il punto forte. Il levare prepara il battere.",
    },
    {
      id: "performance",
      title: "Performance: il tempo del gruppo.",
      text: "Dividetevi in piccoli gruppi. Ogni gruppo sceglie un direttore. Create una breve performance di 30 secondi usando corpo, voce, banco o oggetti sonori.",
    },
    {
      id: "quiz",
      title: "Che cosa abbiamo capito?",
      text: "Le domande finali controllano se sai distinguere pulsazione, ritmo, accento, battuta, gesto e tempo comune.",
    },
    {
      id: "self",
      title: "Mi ascolto mentre suono.",
      text: "Rifletto sul mio ruolo nel gruppo e su come uso corpo, orecchio e gesto.",
      closing: "Quando il tempo e condiviso, il gruppo diventa musica.",
    },
  ],
  pulseModes: [
    { id: "slow", label: "Lenta", bpm: 60 },
    { id: "medium", label: "Media", bpm: 90 },
    { id: "fast", label: "Veloce", bpm: 120 },
  ],
  conceptCards: [
    {
      id: "pulse",
      title: "Pulsazione",
      definition: "E il battito regolare che sostiene la musica.",
      visual: ["equal", "equal", "equal", "equal"],
    },
    {
      id: "rhythm",
      title: "Ritmo",
      definition: "E il modo in cui suoni e silenzi si organizzano sopra la pulsazione.",
      visual: ["sound", "pause", "sound", "accent"],
    },
    {
      id: "accent",
      title: "Accento",
      definition: "E un suono o una pulsazione con maggior rilievo.",
      visual: ["accent", "equal", "equal", "equal"],
    },
    {
      id: "time",
      title: "Tempo",
      definition: "E il modo in cui le pulsazioni vengono raggruppate: a due, a tre, a quattro.",
      visual: ["group-2", "group-3", "group-4"],
    },
  ],
  mapNodes: [
    {
      id: "tempo-musicale",
      label: "Tempo musicale",
      x: 50,
      y: 48,
      description: "Il tempo che il gruppo sente insieme.",
      tooltip: "Centro della mappa.",
      links: ["pulsazione", "ritmo", "accento", "battuta"],
    },
    {
      id: "pulsazione",
      label: "Pulsazione",
      x: 18,
      y: 18,
      description: "Battito regolare.",
      tooltip: "Pulsazione = battito regolare.",
      links: ["binario", "ternario", "quaternario"],
    },
    {
      id: "ritmo",
      label: "Ritmo",
      x: 50,
      y: 14,
      description: "Suoni e silenzi organizzati.",
      tooltip: "Ritmo = suoni e silenzi organizzati.",
      links: ["battere", "levare"],
    },
    {
      id: "accento",
      label: "Accento",
      x: 82,
      y: 18,
      description: "Punto piu forte.",
      tooltip: "Accento = punto piu forte.",
      links: ["binario", "ternario", "quaternario"],
    },
    {
      id: "battuta",
      label: "Battuta",
      x: 18,
      y: 50,
      description: "Contenitore ordinato.",
      tooltip: "Battuta = contenitore ordinato.",
      links: ["tempo-semplice", "tempo-composto"],
    },
    {
      id: "battere",
      label: "Battere",
      x: 82,
      y: 50,
      description: "Punto forte del gesto.",
      tooltip: "Battere = punto forte del gesto.",
      links: ["levare"],
    },
    {
      id: "levare",
      label: "Levare",
      x: 50,
      y: 80,
      description: "Gesto che prepara il battere.",
      tooltip: "Levare = gesto che prepara il battere.",
      links: ["tempo-semplice", "tempo-composto"],
    },
    {
      id: "binario",
      label: "Binario",
      x: 10,
      y: 82,
      description: "Accento ogni 2 pulsazioni.",
      tooltip: "Binario = accento ogni 2 pulsazioni.",
      links: [],
    },
    {
      id: "ternario",
      label: "Ternario",
      x: 28,
      y: 90,
      description: "Accento ogni 3 pulsazioni.",
      tooltip: "Ternario = accento ogni 3 pulsazioni.",
      links: [],
    },
    {
      id: "quaternario",
      label: "Quaternario",
      x: 72,
      y: 90,
      description: "Accento ogni 4 pulsazioni.",
      tooltip: "Quaternario = accento ogni 4 pulsazioni.",
      links: [],
    },
    {
      id: "tempo-semplice",
      label: "Tempo semplice",
      x: 90,
      y: 82,
      description: "Pulsazione divisa in due.",
      tooltip: "Tempo semplice = pulsazione divisa in due.",
      links: [],
    },
    {
      id: "tempo-composto",
      label: "Tempo composto",
      x: 90,
      y: 66,
      description: "Pulsazione divisa in tre.",
      tooltip: "Tempo composto = pulsazione divisa in tre.",
      links: [],
    },
  ],
  listeningCards: [
    {
      id: "listening-a",
      title: "Passo / marcia",
      focus: "Pulsazione in 2",
      expected: 2,
    },
    {
      id: "listening-b",
      title: "Dondolio / valzer",
      focus: "Pulsazione in 3",
      expected: 3,
    },
    {
      id: "listening-c",
      title: "Groove / battito moderno",
      focus: "Pulsazione stabile con ritmo sovrapposto",
      expected: 4,
    },
  ],
  listeningQuestions: [
    "Riesci a battere la pulsazione?",
    "Dove cade l'accento piu forte?",
    "Il ritmo coincide sempre con la pulsazione?",
  ],
  sequenceStates: [
    { id: "sound", label: "suono", symbol: "●", longLabel: "suono" },
    { id: "pause", label: "pausa", symbol: "○", longLabel: "pausa" },
    { id: "accent", label: "accento", symbol: "●", longLabel: "accento" },
  ],
  sequencePresets: {
    reset: Array.from({ length: 8 }, () => "pause"),
    simple: Array.from({ length: 8 }, () => "sound"),
    pauses: ["sound", "pause", "sound", "pause", "sound", "sound", "pause", "sound"],
    accents: ["accent", "sound", "sound", "sound", "accent", "sound", "sound", "sound"],
  },
  conductorSteps: [
    {
      id: "rest",
      title: "Punto di fermo",
      summary: "Il gruppo si concentra.",
      detail: "Il corpo e pronto. Gli occhi guardano. Il tempo non parte ancora, ma tutti sentono che sta per arrivare.",
    },
    {
      id: "prep",
      title: "Gesto di preparazione",
      summary: "Il corpo prepara il tempo.",
      detail: "Il levare rende visibile il respiro del gruppo e prepara il primo battere.",
    },
    {
      id: "attack",
      title: "Attacco",
      summary: "Il suono comincia insieme.",
      detail: "Il battere coincide con l'inizio comune. Se il gesto e chiaro, il gruppo entra compatto.",
    },
    {
      id: "stop",
      title: "Stop",
      summary: "Il gruppo chiude insieme.",
      detail: "Il gesto finale ferma il suono e aiuta il gruppo a non sfilacciarsi nell'ultima pulsazione.",
    },
  ],
  performanceRules: [
    "La pulsazione deve restare stabile.",
    "Il ritmo puo cambiare.",
    "Gli accenti devono essere riconoscibili.",
    "Il direttore comunica solo con i gesti.",
    "Il gruppo ascolta e risponde.",
  ],
  performanceRoles: [
    "Direttore",
    "Gruppo pulsazione",
    "Gruppo ritmo",
    "Gruppo accenti",
    "Osservatori",
  ],
  performanceCriteria: [
    "Manteniamo una pulsazione comune.",
    "Distinguiamo pulsazione e ritmo.",
    "Facciamo sentire gli accenti.",
    "Rispettiamo il gesto del direttore.",
    "Ripetiamo la sequenza senza perderci.",
  ],
  quizQuestions: [
    {
      id: "q1",
      prompt: "Che cos'e la pulsazione?",
      options: [
        {
          id: "q1-a",
          label: "Il battito regolare che sostiene la musica.",
          correct: true,
          feedback: "Esatto. La pulsazione e il battito comune che aiuta il gruppo a restare insieme.",
        },
        {
          id: "q1-b",
          label: "Una pausa molto lunga.",
          correct: false,
          feedback: "Non proprio. La pulsazione non e una pausa: e il battito regolare che continua.",
        },
        {
          id: "q1-c",
          label: "Un gesto casuale.",
          correct: false,
          feedback: "No. Un gesto casuale non basta: la pulsazione deve essere regolare e condivisa.",
        },
      ],
    },
    {
      id: "q2",
      prompt: "Che cos'e il ritmo?",
      options: [
        {
          id: "q2-a",
          label: "L'organizzazione di suoni e silenzi nel tempo.",
          correct: true,
          feedback: "Esatto. Il ritmo organizza suoni e silenzi sopra la pulsazione.",
        },
        {
          id: "q2-b",
          label: "Il nome di una singola nota.",
          correct: false,
          feedback: "No. Il ritmo non e una sola nota: riguarda come i suoni si dispongono nel tempo.",
        },
        {
          id: "q2-c",
          label: "Il momento in cui tutti si fermano.",
          correct: false,
          feedback: "Non solo. Fermarsi puo far parte del ritmo, ma non lo definisce da solo.",
        },
      ],
    },
    {
      id: "q3",
      prompt: "Che cos'e l'accento?",
      options: [
        {
          id: "q3-a",
          label: "Un suono o una pulsazione con maggior rilievo.",
          correct: true,
          feedback: "Esatto. L'accento fa sentire un punto piu forte dentro il flusso.",
        },
        {
          id: "q3-b",
          label: "Una pulsazione sempre piu veloce.",
          correct: false,
          feedback: "Non proprio. Velocita e accento non sono la stessa cosa.",
        },
        {
          id: "q3-c",
          label: "Un silenzio obbligatorio.",
          correct: false,
          feedback: "No. Il silenzio puo essere importante, ma l'accento e un punto piu marcato del suono o del gesto.",
        },
      ],
    },
    {
      id: "q4",
      prompt: "Che cos'e una battuta?",
      options: [
        {
          id: "q4-a",
          label: "Un contenitore ordinato di pulsazioni.",
          correct: true,
          feedback: "Esatto. La battuta raccoglie le pulsazioni in gruppi leggibili.",
        },
        {
          id: "q4-b",
          label: "Un urlo del direttore.",
          correct: false,
          feedback: "No. Il direttore usa il gesto, non un urlo. La battuta organizza il tempo.",
        },
        {
          id: "q4-c",
          label: "Una serie di suoni senza ordine.",
          correct: false,
          feedback: "Non e corretto. La battuta serve proprio a dare ordine al tempo.",
        },
      ],
    },
    {
      id: "q5",
      prompt: "Che differenza c'e tra battere e levare?",
      options: [
        {
          id: "q5-a",
          label: "Il battere e il punto forte, il levare prepara il battere.",
          correct: true,
          feedback: "Esatto. Il levare prepara il gesto, il battere rende visibile il punto forte.",
        },
        {
          id: "q5-b",
          label: "Sono due parole che vogliono dire la stessa cosa.",
          correct: false,
          feedback: "Non proprio. Hanno ruoli diversi nel gesto del tempo.",
        },
        {
          id: "q5-c",
          label: "Il levare chiude sempre la musica.",
          correct: false,
          feedback: "No. Lo stop chiude. Il levare prepara l'attacco o il gesto seguente.",
        },
      ],
    },
    {
      id: "q6",
      prompt: "Nel lavoro di gruppo, a che cosa serve il direttore?",
      options: [
        {
          id: "q6-a",
          label: "A far partire, mantenere e fermare il tempo comune.",
          correct: true,
          feedback: "Esatto. Il direttore rende visibile il tempo condiviso del gruppo.",
        },
        {
          id: "q6-b",
          label: "A parlare piu forte degli altri.",
          correct: false,
          feedback: "No. Il direttore guida soprattutto con il gesto e con l'ascolto reciproco.",
        },
        {
          id: "q6-c",
          label: "A decidere chi non deve ascoltare.",
          correct: false,
          feedback: "Non e corretto. Il suo compito e aiutare tutti a coordinarsi meglio.",
        },
      ],
    },
  ],
  selfChecks: [
    "Riesco a mantenere una pulsazione stabile?",
    "Riesco a distinguere pulsazione e ritmo?",
    "Riesco a seguire o guidare il gruppo con un gesto?",
  ],
  selfOptions: ["ancora no", "abbastanza", "si"],
};

const mapFloatingMeta = {
  "tempo-musicale": { number: "01", category: "centro" },
  pulsazione: { number: "02", category: "fondamento" },
  ritmo: { number: "03", category: "azione" },
  accento: { number: "04", category: "rilievo" },
  battuta: { number: "05", category: "misura" },
  battere: { number: "06", category: "gesto" },
  levare: { number: "07", category: "preparazione" },
  binario: { number: "08", category: "gruppo" },
  ternario: { number: "09", category: "gruppo" },
  quaternario: { number: "10", category: "gruppo" },
  "tempo-semplice": { number: "11", category: "divisione" },
  "tempo-composto": { number: "12", category: "divisione" },
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getSection(id) {
  return lessonData.sections.find((section) => section.id === id);
}

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (!("matchMedia" in window)) return undefined;
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

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return [ref, visible];
}

function SectionShell({ id, className, children, backgroundClass = "bg-white", border = true }) {
  const [ref, visible] = useReveal();

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "scroll-mt-32 transition-all duration-700 ease-out",
        backgroundClass,
        border && "border-t border-slate-200/60",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className
      )}
    >
      {typeof children === "function" ? children({ visible }) : children}
    </section>
  );
}

function SectionKicker({ children }) {
  return <p className={SMALL_LABEL}>{children}</p>;
}

function SectionHeading({ kicker, title, text, align = "left" }) {
  return (
    <div className={cn("max-w-[46rem]", align === "center" && "mx-auto text-center")}>
      {kicker ? <SectionKicker>{kicker}</SectionKicker> : null}
      <h2 className="mt-4 text-[2.7rem] font-semibold tracking-[-0.05em] text-slate-950 sm:text-[3.35rem] lg:text-[3.95rem] lg:leading-[0.95]">
        {title}
      </h2>
      {text ? <p className={cn("mt-5 max-w-[43rem]", BODY_COPY)}>{text}</p> : null}
    </div>
  );
}

function SurfacePanel({ children, className, tone = "base" }) {
  const toneClass = tone === "soft" ? PANEL_SOFT : tone === "subtle" ? PANEL_SUBTLE : PANEL_BASE;
  return <div className={cn(toneClass, className)}>{children}</div>;
}

function ToneTag({ children, className }) {
  return <span className={cn(TAG_CLASS, className)}>{children}</span>;
}

function PrimaryButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        RING,
        BUTTON_BASE,
        "border-[#d8dde4] bg-white text-[#8a4d18] hover:border-[#c8cfd8] hover:text-[#6f3f17]"
      )}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        RING,
        BUTTON_BASE,
        "border-[#e4e8ee] bg-white text-[#5e646c] hover:border-[#d7dde5] hover:text-[#18191b]"
      )}
    >
      {children}
    </button>
  );
}

function ConceptVisual({ type }) {
  if (type === "group-2" || type === "group-3" || type === "group-4") {
    const size = type === "group-2" ? 2 : type === "group-3" ? 3 : 4;
    return (
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: size }).map((_, index) => (
          <span
            key={`${type}-${index}`}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-600",
              index === 0 && "border-[#e6c8a8] bg-[#fff6ed] text-[#8a4d18]"
            )}
          >
            {index + 1}
          </span>
        ))}
      </div>
    );
  }

  const active = type === "accent";
  const pause = type === "pause";
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border",
        active ? "h-14 w-14 border-[#e6c8a8] bg-[#fff6ed] text-2xl text-[#8a4d18]" : "h-10 w-10 border-slate-200 bg-white text-base text-slate-500",
        pause && "border-slate-200 bg-[#fcfbf8] text-slate-400"
      )}
    >
      {pause ? "○" : "●"}
    </span>
  );
}

function MeterPreview({ groupSize }) {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      {Array.from({ length: 8 }).map((_, index) => {
        const accented = index % groupSize === 0;
        return (
          <span
            key={`${groupSize}-${index}`}
            className={cn(
              "inline-flex items-center justify-center rounded-full border bg-white text-sm font-medium",
              accented
                ? "h-14 w-14 border-[#e6c8a8] bg-[#fff6ed] text-[#8a4d18]"
                : "h-10 w-10 border-slate-200 text-slate-500"
            )}
          >
            {accented ? "●" : "•"}
          </span>
        );
      })}
    </div>
  );
}

function SequencerSymbol({ stateId }) {
  if (stateId === "accent") {
    return <span className="mt-4 block text-4xl font-semibold text-slate-950">●</span>;
  }
  if (stateId === "pause") {
    return <span className="mt-4 block text-4xl font-semibold text-slate-300">○</span>;
  }
  return <span className="mt-4 block text-4xl font-semibold text-slate-950">●</span>;
}

function LessonHero() {
  const section = getSection("hero");

  return (
    <section id={section.id} className="scroll-mt-28 bg-[#fbfaf7]" style={{ fontFamily: APP_FONT }}>
      <div className="mx-auto flex min-h-[calc(88vh-4.75rem)] max-w-[84rem] items-center px-4 pb-16 pt-14 sm:px-6 md:pb-20 lg:px-8 lg:pt-20">
        <div className="w-full">
          <div className="max-w-[48rem]">
            <SectionKicker>{section.eyebrow}</SectionKicker>
            <h1 className="mt-6 max-w-[9ch] text-[3.9rem] font-semibold tracking-[-0.065em] text-slate-950 sm:text-[5rem] lg:text-[6rem] lg:leading-[0.9]">
              {section.title}
            </h1>
            <p className="mt-7 max-w-[30rem] text-[1.18rem] leading-[1.65] text-slate-600 sm:text-[1.4rem]">
              {section.subtitle}
            </p>
            <p className="mt-6 max-w-[43rem] text-[0.98rem] leading-7 text-slate-500 sm:text-base">
              {section.microtext}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SparkSection() {
  const section = getSection("spark");
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    if (secondsLeft === 0) {
      setRunning(false);
      return undefined;
    }
    const timer = window.setTimeout(() => {
      setSecondsLeft((current) => current - 1);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [running, secondsLeft]);

  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - ((30 - secondsLeft) / 30) * circumference;

  return (
    <SectionShell id={section.id} backgroundClass="bg-[#f8f6f2]" className={SECTION_SPACE}>
      <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
        <SectionHeading kicker="Scintilla" title={section.title} text={section.text} align="center" />

        <SurfacePanel tone="soft" className="mt-14 px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col items-center">
            <div className="relative flex h-56 w-56 items-center justify-center">
              <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90" aria-hidden="true">
                <circle cx="70" cy="70" r="54" fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="6" />
                <circle
                  cx="70"
                  cy="70"
                  r="54"
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className={SMALL_LABEL}>timer</span>
                <span className="mt-2 text-6xl font-semibold tracking-[-0.06em] text-slate-950">{secondsLeft}</span>
                <span className="mt-2 text-sm text-slate-500">secondi di ascolto comune</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <PrimaryButton
                onClick={() => {
                  setSecondsLeft(30);
                  setRunning(true);
                }}
              >
                Avvia 30 secondi
              </PrimaryButton>
              <SecondaryButton
                onClick={() => {
                  setRunning(false);
                  setSecondsLeft(30);
                }}
              >
                Reimposta
              </SecondaryButton>
            </div>
          </div>
        </SurfacePanel>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {section.questions.map((question) => (
            <SurfacePanel key={question} tone="subtle" className="flex min-h-[6rem] items-center justify-center p-5 text-center">
              <p className={cn("mx-auto max-w-[18rem]", BODY_COPY_SOFT)}>{question}</p>
            </SurfacePanel>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {section.keywords.map((keyword) => (
            <ToneTag key={keyword}>{keyword}</ToneTag>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function PulseSection() {
  const section = getSection("pulse");
  const reducedMotion = usePrefersReducedMotion();
  const [activeModeId, setActiveModeId] = useState(lessonData.pulseModes[1].id);
  const [beatIndex, setBeatIndex] = useState(0);
  const [running, setRunning] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioContextRef = useRef(null);
  const activeMode = lessonData.pulseModes.find((mode) => mode.id === activeModeId) || lessonData.pulseModes[1];

  const playTick = (accented) => {
    if (!audioEnabled) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextClass();
    }

    const context = audioContextRef.current;
    if (context.state === "suspended") {
      context.resume();
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = accented ? 880 : 660;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(accented ? 0.04 : 0.025, context.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.08);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.09);
  };

  useEffect(() => {
    if (!running) return undefined;

    playTick(beatIndex === 0);
    const beatDuration = 60000 / activeMode.bpm;
    const timer = window.setTimeout(() => {
      setBeatIndex((current) => (current + 1) % 4);
    }, beatDuration);

    return () => window.clearTimeout(timer);
  }, [activeMode.bpm, audioEnabled, beatIndex, running]);

  useEffect(() => {
    setBeatIndex(0);
    setRunning(true);
  }, [activeModeId]);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <SectionShell id={section.id} backgroundClass="bg-white" className={SECTION_SPACE}>
      <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(24rem,1.08fr)] lg:items-start">
          <div>
            <SectionHeading kicker="Pulsazione" title={section.title} text={section.text} />
            <SurfacePanel tone="subtle" className="mt-8 p-6 sm:p-7">
              <div className="space-y-3.5 text-[1rem] leading-8 text-slate-600">
                <p>Seleziona una velocita.</p>
                <p>Guarda i quattro battiti che tornano regolari.</p>
                <p>Se vuoi, attiva un suono leggero di riferimento.</p>
              </div>
            </SurfacePanel>
            <div className="mt-8 flex flex-wrap gap-3">
              {lessonData.pulseModes.map((mode) => {
                const isSelected = mode.id === activeModeId;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    aria-label={`${mode.label}, ${mode.bpm} battiti al minuto`}
                    onClick={() => setActiveModeId(mode.id)}
                    className={cn(RING, isSelected ? PILL_ACTIVE : PILL_DEFAULT)}
                  >
                    {mode.label} · {mode.bpm} bpm
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <SecondaryButton onClick={() => setRunning((current) => !current)}>
                {running ? "Ferma il battito" : "Riavvia il battito"}
              </SecondaryButton>
              <SecondaryButton onClick={() => setAudioEnabled((current) => !current)}>
                {audioEnabled ? "Audio leggero attivo" : "Audio leggero spento"}
              </SecondaryButton>
            </div>
          </div>

          <SurfacePanel tone="soft" className="w-full max-w-[44rem] justify-self-center p-6 sm:p-8 xl:justify-self-end">
            <p className={SMALL_LABEL}>Battito comune</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {Array.from({ length: 4 }).map((_, index) => {
                const isActive = index === beatIndex && running;
                return (
                  <span
                    key={`pulse-${index}`}
                    className={cn(
                      "inline-flex h-14 w-14 items-center justify-center rounded-full border text-sm font-medium",
                      isActive ? "border-[#e6c8a8] bg-[#fff6ed] text-[#8a4d18]" : "border-slate-200 bg-white text-slate-500"
                    )}
                    style={reducedMotion ? undefined : { transition: "background-color 140ms ease, border-color 140ms ease, color 140ms ease" }}
                  >
                    {index + 1}
                  </span>
                );
              })}
            </div>
            <div className="mt-10 rounded-[1.5rem] border border-slate-200/70 bg-[#fcfbf8] px-6 py-5 text-center">
              <p className="text-lg font-semibold text-slate-950">
                {activeMode.label} · {activeMode.bpm} bpm
              </p>
              <p className={cn("mt-3 mx-auto max-w-[28rem]", BODY_COPY_SOFT)}>{section.support}</p>
            </div>
          </SurfacePanel>
        </div>
      </div>
    </SectionShell>
  );
}

function ConceptsSection() {
  const section = getSection("concepts");

  return (
    <SectionShell id={section.id} backgroundClass="bg-[#fbfbf9]" className={SECTION_SPACE}>
      <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
        <SectionHeading kicker="Quattro concetti" title={section.title} text={section.text} align="center" />

        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {lessonData.conceptCards.map((card, index) => (
            <SurfacePanel key={card.id} tone="subtle" className="p-5 sm:p-7">
              <p className={SMALL_LABEL}>0{index + 1}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{card.title}</h3>
              <p className={cn("mt-4", BODY_COPY_SOFT)}>{card.definition}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {card.visual.map((item, itemIndex) => (
                  <ConceptVisual key={`${card.id}-${itemIndex}`} type={item} />
                ))}
              </div>
            </SurfacePanel>
          ))}
        </div>

        <SurfacePanel tone="soft" className="mt-10 px-6 py-7 text-center">
          <p className="mx-auto max-w-3xl text-[2rem] font-semibold tracking-[-0.04em] text-slate-950 sm:text-[2.4rem]">
            {section.closing}
          </p>
        </SurfacePanel>
      </div>
    </SectionShell>
  );
}

function RhythmMapSection() {
  const section = getSection("map");
  const floatingMapRef = useRef(null);
  const nodeLookup = useMemo(() => new Map(lessonData.mapNodes.map((node) => [node.id, node])), []);

  const mapLines = useMemo(() => {
    const seen = new Set();
    return lessonData.mapNodes.flatMap((node) =>
      node.links.flatMap((targetId) => {
        const target = nodeLookup.get(targetId);
        const sourceNumber = mapFloatingMeta[node.id]?.number;
        const targetNumber = mapFloatingMeta[targetId]?.number;

        if (!target || !sourceNumber || !targetNumber) {
          return [];
        }

        const relationKey = [sourceNumber, targetNumber].sort().join(":");
        if (seen.has(relationKey)) {
          return [];
        }
        seen.add(relationKey);

        return [
          {
            key: relationKey,
            from: sourceNumber,
            to: targetNumber,
            x1: node.x,
            y1: node.y,
            x2: target.x,
            y2: target.y,
          },
        ];
      })
    );
  }, [nodeLookup]);

  useEffect(() => {
    let timerId = 0;
    let attempts = 0;

    const tryInitFloatingMap = () => {
      const root = floatingMapRef.current;
      const initTopicMaps = window.Accordia?.initTopicMaps;

      if (root && typeof initTopicMaps === "function") {
        initTopicMaps(root);
        return;
      }

      attempts += 1;
      if (attempts < 20) {
        timerId = window.setTimeout(tryInitFloatingMap, 60);
      }
    };

    tryInitFloatingMap();
    return () => window.clearTimeout(timerId);
  }, []);

  return (
    <SectionShell id={section.id} backgroundClass="bg-[#f8f6f2]" className={SECTION_SPACE}>
      <div className={LESSON_SHELL_WIDE} style={{ fontFamily: APP_FONT }}>
        <SectionHeading kicker="Mappa visiva" title={section.title} text={section.text} />

        <div ref={floatingMapRef} className="mt-14">
          <div className="nucleus-topic-map lesson-floating-map lesson-floating-map--concepts" data-topic-map>
            <svg className="nucleus-topic-map__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {mapLines.map((line) => (
                <line
                  key={line.key}
                  className="nucleus-topic-map__line nucleus-topic-map__line--main"
                  data-topic-line
                  data-topic-from={line.from}
                  data-topic-to={line.to}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                />
              ))}
            </svg>

            <div className="nucleus-topic-map__canvas">
              {lessonData.mapNodes.map((node) => {
                const meta = mapFloatingMeta[node.id] || { number: node.id, category: "concetto" };
                const relatedTitles = node.links
                  .map((targetId) => nodeLookup.get(targetId)?.label)
                  .filter(Boolean)
                  .join(", ");

                return (
                  <div
                    key={node.id}
                    className="nucleus-topic-node"
                    data-topic-node
                    data-topic-number={meta.number}
                    tabIndex={0}
                    aria-label={`${node.label}. ${node.description}`}
                    style={{ "--node-x": node.x, "--node-y": node.y }}
                  >
                    <strong>{node.label}</strong>
                    <p>{node.description}</p>
                    <small>{node.tooltip}</small>
                    {relatedTitles ? <span className="nucleus-topic-node__related">Si collega a: {relatedTitles}</span> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function ListeningCardsSection() {
  const section = getSection("listening");
  const [selectedMeters, setSelectedMeters] = useState({});

  return (
    <SectionShell id={section.id} backgroundClass="bg-white" className={SECTION_SPACE}>
      <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
        <SectionHeading kicker="Ascolto guidato" title={section.title} text={section.text} />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {lessonData.listeningCards.map((card) => {
            const selectedMeter = selectedMeters[card.id] || card.expected;
            return (
              <SurfacePanel key={card.id} tone="soft" className="p-6 sm:p-7">
                <p className={SMALL_LABEL}>{card.focus}</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{card.title}</h3>

                <div className="mt-6 rounded-[1.6rem] border border-slate-200/70 bg-white px-5 py-6 text-center">
                  <p className="text-base leading-7 text-slate-500">Placeholder di ascolto guidato.</p>
                  <MeterPreview groupSize={selectedMeter} />
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {[2, 3, 4].map((meter) => (
                    <button
                      key={`${card.id}-${meter}`}
                      type="button"
                      aria-label={`${meter} pulsazioni`}
                      onClick={() => setSelectedMeters((current) => ({ ...current, [card.id]: meter }))}
                      className={cn(RING, selectedMeter === meter ? PILL_ACTIVE : PILL_DEFAULT)}
                    >
                      {meter} pulsazioni
                    </button>
                  ))}
                </div>

                <div className="mt-6 space-y-4">
                  {lessonData.listeningQuestions.map((question) => (
                    <p key={`${card.id}-${question}`} className={BODY_COPY_SOFT}>
                      {question}
                    </p>
                  ))}
                </div>

                <div className="mt-6 border-t border-slate-200/70 pt-5">
                  <p className={BODY_COPY_SOFT}>Osserva se l'accento torna ogni due, tre o quattro battiti.</p>
                </div>
              </SurfacePanel>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

function RhythmSequencerSection() {
  const section = getSection("sequencer");
  const [selectedStateId, setSelectedStateId] = useState("sound");
  const [steps, setSteps] = useState([...lessonData.sequencePresets.simple]);
  const optionById = useMemo(
    () => Object.fromEntries(lessonData.sequenceStates.map((option) => [option.id, option])),
    []
  );

  const applyPreset = (presetKey) => {
    setSteps([...lessonData.sequencePresets[presetKey]]);
  };

  return (
    <SectionShell id={section.id} backgroundClass="bg-[#fbfbf9]" className={SECTION_SPACE}>
      <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(24rem,1.08fr)] lg:items-start">
          <div>
            <SectionHeading kicker="Laboratorio ritmico" title={section.title} text={section.text} />
            <SurfacePanel tone="subtle" className="mt-8 p-6 sm:p-7">
              <div className="space-y-3.5 text-[1rem] leading-8 text-slate-600">
                <p>Scegli un simbolo.</p>
                <p>Scrivi un ritmo di 8 tempi.</p>
                <p>Ripetilo finche il gruppo non lo sente stabile.</p>
              </div>
            </SurfacePanel>
            <div className="mt-8 flex flex-wrap gap-3">
              {lessonData.sequenceStates.map((option) => {
                const isSelected = option.id === selectedStateId;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-label={`Seleziona ${option.longLabel}`}
                    onClick={() => setSelectedStateId(option.id)}
                    className={cn(RING, isSelected ? PILL_ACTIVE : PILL_DEFAULT)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <SurfacePanel tone="soft" className="w-full max-w-[44rem] justify-self-center p-6 sm:p-8 xl:justify-self-end">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {steps.map((step, index) => {
                const option = optionById[step];
                return (
                  <button
                    key={`${step}-${index}`}
                    type="button"
                    aria-label={`Tempo ${index + 1}, ${option.longLabel}`}
                    onClick={() =>
                      setSteps((current) =>
                        current.map((value, stepIndex) => (stepIndex === index ? selectedStateId : value))
                      )
                    }
                    className={cn(
                      RING,
                      "flex min-h-[8.75rem] flex-col items-center justify-center rounded-[1.35rem] border border-solid border-slate-200/70 bg-white px-4 py-5 text-center transition-colors duration-150 hover:border-slate-300 hover:bg-[#f8f6f1]"
                    )}
                  >
                    <span className={cn("block", SMALL_LABEL)}>tempo {index + 1}</span>
                    <SequencerSymbol stateId={step} />
                    <span className="mt-2 block text-[0.92rem] leading-5 text-slate-500">{option.longLabel}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <SecondaryButton onClick={() => applyPreset("reset")}>Reset</SecondaryButton>
              <SecondaryButton onClick={() => applyPreset("simple")}>Esempio semplice</SecondaryButton>
              <SecondaryButton onClick={() => applyPreset("pauses")}>Esempio con pause</SecondaryButton>
              <SecondaryButton onClick={() => applyPreset("accents")}>Esempio con accenti</SecondaryButton>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-200/70 pt-6">
              <ToneTag className="border-slate-200/70 bg-white text-slate-600">● = suono</ToneTag>
              <ToneTag className="border-slate-200/70 bg-white text-slate-600">○ = pausa</ToneTag>
              <ToneTag className="border-slate-200/70 bg-white text-slate-600">● grande = accento</ToneTag>
            </div>
          </SurfacePanel>
        </div>
      </div>
    </SectionShell>
  );
}

function ConductorSection() {
  const section = getSection("conductor");
  const [activeStepId, setActiveStepId] = useState(lessonData.conductorSteps[0].id);
  const activeStep =
    lessonData.conductorSteps.find((step) => step.id === activeStepId) || lessonData.conductorSteps[0];

  return (
    <SectionShell id={section.id} backgroundClass="bg-white" className={SECTION_SPACE}>
      <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
        <SectionHeading kicker="Gesto del direttore" title={section.title} text={section.text} />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.18fr)_minmax(24rem,0.82fr)]">
          <div className="grid gap-4 md:grid-cols-4">
            {lessonData.conductorSteps.map((step, index) => {
              const isActive = step.id === activeStepId;
              return (
                <button
                  key={step.id}
                  type="button"
                  aria-label={step.title}
                  onClick={() => setActiveStepId(step.id)}
                  className={cn(
                    RING,
                    "relative rounded-[1.5rem] border bg-white px-5 py-7 text-left transition duration-300",
                    isActive
                      ? "border-[#c66a18] bg-[#fff1e2]"
                      : "border-slate-200/80 bg-[#f8f6f1] hover:border-slate-300 hover:bg-[#efede7]"
                  )}
                >
                  <span
                    className={cn(
                      "absolute left-5 top-0 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border text-sm font-semibold",
                      isActive ? "border-[#c66a18] bg-[#fff1e2] text-[#8a4d18]" : "border-slate-200 bg-[#f5f3ee] text-slate-500"
                    )}
                  >
                    {index + 1}
                  </span>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{step.title}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{step.summary}</p>
                </button>
              );
            })}
          </div>

          <SurfacePanel tone="soft" className="p-7">
            <SectionKicker>Step attivo</SectionKicker>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">{activeStep.title}</h3>
            <p className="mt-5 text-lg leading-8 text-slate-600">{activeStep.detail}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ToneTag>battere</ToneTag>
              <ToneTag>levare</ToneTag>
              <ToneTag>tempo comune</ToneTag>
            </div>
            <div className="mt-8 border-t border-slate-200/70 pt-5">
              <p className={BODY_COPY_SOFT}>{section.note}</p>
            </div>
          </SurfacePanel>
        </div>
      </div>
    </SectionShell>
  );
}

function PerformanceSection() {
  const section = getSection("performance");

  return (
    <SectionShell id={section.id} backgroundClass="bg-[#f8f6f2]" className={SECTION_SPACE}>
      <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
        <SectionHeading kicker="Compito operativo" title={section.title} text={section.text} />

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(21rem,0.92fr)]">
          <SurfacePanel tone="soft" className="p-6 sm:p-8">
            <p className={SMALL_LABEL}>Consegna</p>
            <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
              Ogni gruppo costruisce 30 secondi di tempo condiviso.
            </p>
            <div className="mt-8 space-y-4">
              {lessonData.performanceRules.map((rule) => (
                <p key={rule} className={BODY_COPY_SOFT}>
                  {rule}
                </p>
              ))}
            </div>
          </SurfacePanel>

          <div className="grid gap-6">
            <SurfacePanel tone="subtle" className="px-6 py-5">
              <p className={SMALL_LABEL}>Ruoli</p>
              <div className="mt-5 space-y-4">
                {lessonData.performanceRoles.map((role) => (
                  <p key={role} className={BODY_COPY_SOFT}>
                    {role}
                  </p>
                ))}
              </div>
            </SurfacePanel>

            <SurfacePanel tone="subtle" className="px-6 py-5">
              <p className={SMALL_LABEL}>Criteri di riuscita</p>
              <div className="mt-5 space-y-4">
                {lessonData.performanceCriteria.map((criterion) => (
                  <p key={criterion} className={BODY_COPY_SOFT}>
                    {criterion}
                  </p>
                ))}
              </div>
            </SurfacePanel>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function FinalQuizSection() {
  const section = getSection("quiz");
  const [answers, setAnswers] = useState({});

  return (
    <SectionShell id={section.id} backgroundClass="bg-white" className={SECTION_SPACE}>
      <div className={LESSON_SHELL_COMPACT} style={{ fontFamily: APP_FONT }}>
        <SurfacePanel className="px-6 py-10 sm:px-10 sm:py-12">
          <SectionHeading kicker="Verifica formativa" title={section.title} text={section.text} align="center" />

          <div className="mt-14 divide-y divide-slate-200/80">
            {lessonData.quizQuestions.map((question, questionIndex) => {
              const selectedOptionId = answers[question.id];
              const selectedOption = question.options.find((option) => option.id === selectedOptionId);

              return (
                <div key={question.id} className="py-8 first:pt-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Domanda {questionIndex + 1}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{question.prompt}</h3>
                  <div className="mt-6 space-y-3">
                    {question.options.map((option) => {
                      const isSelected = option.id === selectedOptionId;
                      const showCorrectReference = Boolean(selectedOptionId) && option.correct && !isSelected;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          aria-label={option.label}
                          onClick={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))}
                          className={cn(
                            RING,
                            "block w-full rounded-[1.4rem] border px-5 py-4 text-left text-base leading-7 transition duration-200",
                            isSelected
                              ? "border-[#c66a18] bg-[#fff1e2] text-slate-900"
                              : showCorrectReference
                                ? "border-slate-300 bg-white text-slate-900"
                                : "border-slate-200 bg-[#f8f6f1] text-slate-700 hover:border-slate-300 hover:bg-[#efede7]"
                          )}
                        >
                          <span className="flex items-start justify-between gap-4">
                            <span>{option.label}</span>
                            {showCorrectReference ? (
                              <ToneTag className="shrink-0 border-slate-200/80 bg-white text-slate-600">corretta</ToneTag>
                            ) : null}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {selectedOption ? (
                    <div
                      aria-live="polite"
                      className={cn(
                        "mt-5 rounded-[1.4rem] border px-5 py-4 text-base leading-7",
                        selectedOption.correct ? "border-[#e6c8a8] bg-[#fff6ed] text-slate-800" : "border-slate-200 bg-[#fcfbf8] text-slate-800"
                      )}
                    >
                      <p className={SMALL_LABEL}>{selectedOption.correct ? "Risposta corretta" : "Da rivedere"}</p>
                      <p className="mt-3">{selectedOption.feedback}</p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </SurfacePanel>
      </div>
    </SectionShell>
  );
}

function SelfEvaluationSection() {
  const section = getSection("self");
  const [selfAnswers, setSelfAnswers] = useState({});

  return (
    <SectionShell id={section.id} backgroundClass="bg-[#fbfbf9]" className={SECTION_SPACE}>
      <div className={LESSON_SHELL_COMPACT} style={{ fontFamily: APP_FONT }}>
        <SurfacePanel tone="soft" className="px-6 py-10 sm:px-10 sm:py-12">
          <SectionHeading kicker="Autovalutazione" title={section.title} text={section.text} align="center" />

          <div className="mt-14 grid gap-6">
            {lessonData.selfChecks.map((prompt) => (
              <div key={prompt} className="rounded-[1.5rem] border border-slate-200/70 bg-white px-5 py-6">
                <p className="text-lg font-medium text-slate-900">{prompt}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {lessonData.selfOptions.map((option) => {
                    const isSelected = selfAnswers[prompt] === option;
                    return (
                      <button
                        key={`${prompt}-${option}`}
                        type="button"
                        aria-label={option}
                        onClick={() => setSelfAnswers((current) => ({ ...current, [prompt]: option }))}
                        className={cn(RING, isSelected ? PILL_ACTIVE : PILL_DEFAULT)}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 border-t border-slate-200/80 pt-10 text-center">
            <p className="mt-6 text-[2.6rem] font-semibold tracking-[-0.05em] text-slate-950 sm:text-[3.35rem]">
              {section.closing}
            </p>
          </div>
        </SurfacePanel>
      </div>
    </SectionShell>
  );
}

function RitmoPulsazioneTempoLesson() {
  return (
    <div style={{ fontFamily: APP_FONT }} className="accordia-lesson-page bg-[#fbfaf7] text-slate-950 antialiased">
      <LessonHero />
      <SparkSection />
      <PulseSection />
      <ConceptsSection />
      <RhythmMapSection />
      <ListeningCardsSection />
      <RhythmSequencerSection />
      <ConductorSection />
      <PerformanceSection />
      <FinalQuizSection />
      <SelfEvaluationSection />
    </div>
  );
}

export default RitmoPulsazioneTempoLesson;
