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
        "Partiamo dal corpo per distinguere battito comune, ritmo, accento, tempo e metro con esempi visivi, ascolto e lavoro di gruppo.",
      cta: "Inizia dal battito comune",
      idea: "Il ritmo nasce dall'organizzazione del movimento e rende condivisibile il tempo del gruppo.",
      question: "Che differenza c'e tra ritmo, pulsazione e tempo?",
    },
    {
      id: "spark",
      title: "Che differenza c'e tra ritmo, pulsazione e tempo?",
      text: "Camminiamo, battiamo le mani o seguiamo un passo comune. Prima sentiamo il battito regolare. Poi osserviamo che sopra quel battito possono comparire ritmi diversi e velocita diverse.",
      questions: [
        "Che cosa resta uguale mentre il ritmo cambia?",
        "Che cosa ci aiuta a restare insieme?",
        "Quando il battito sembra piu lento o piu veloce?",
        "Dove senti il punto piu forte del gruppo?",
      ],
      keywords: ["pulsazione", "ritmo", "tempo", "accento"],
    },
    {
      id: "context",
      title: "Il ritmo accompagna da sempre il movimento umano.",
      text: "Camminare, danzare, lavorare, marciare, pregare, suonare insieme: molto prima della scrittura musicale, gli esseri umani hanno organizzato il tempo con gesti, battiti, ripetizioni e accenti.",
    },
    {
      id: "pulse",
      title: "Costruiamo una pulsazione comune.",
      text: "Scegli una velocita e guarda quattro battiti che tornano regolari. La forma del gruppo resta uguale: cambia solo il tempo con cui scorre.",
      support: "La pulsazione resta regolare anche quando il tempo rallenta o accelera.",
    },
    {
      id: "concepts",
      title: "Pulsazione, ritmo, tempo, accento, metro.",
      text: "Cinque parole chiave ci aiutano a descrivere cio che sentiamo e cio che facciamo insieme.",
      closing: "La pulsazione sostiene. Il ritmo si muove. Il tempo accelera o rallenta. Il metro organizza gli accenti.",
    },
    {
      id: "map",
      title: "Definizioni chiave da ricopiare.",
      text: "Tre frasi brevi fissano il lessico del quaderno: pulsazione, ritmo e tempo.",
    },
    {
      id: "listening",
      title: "Dove senti il battito comune?",
      text: "Confronta tre situazioni di ascolto. Cerca la pulsazione costante, il ritmo che si muove sopra e il punto in cui torna l'accento.",
    },
    {
      id: "sequencer",
      title: "Attivita pratica: battito comune e ritmi diversi.",
      text: "La classe mantiene una pulsazione comune con mani o piedi. Sopra quel battito costruiamo ritmi diversi con corpo, voce, banco o oggetti sonori.",
    },
    {
      id: "performance",
      title: "Compito: una sequenza del gruppo.",
      text: "Lavora in coppia o in piccolo gruppo. Costruisci una breve sequenza con pulsazione, ritmo e accenti. Puoi usare corpo, voce, banco, oggetti sonori o notazione grafica.",
    },
    {
      id: "quiz",
      title: "Che cosa abbiamo capito?",
      text: "Nell'esempio finale distingui pulsazione, ritmo, accento, tempo e metro.",
    },
  ],
  contextExamples: [
    {
      id: "cammino",
      title: "Camminare",
      detail: "Il corpo ripete passi regolari e crea un battito comune.",
    },
    {
      id: "danza",
      title: "Danzare",
      detail: "Il gruppo organizza gesti, accenti e ripetizioni nello spazio.",
    },
    {
      id: "lavoro",
      title: "Lavorare",
      detail: "Molti gesti collettivi chiedono ritmo per restare coordinati.",
    },
    {
      id: "marcia",
      title: "Marciare",
      detail: "Un battito stabile aiuta il gruppo a procedere insieme.",
    },
    {
      id: "rito",
      title: "Pregare o celebrare",
      detail: "Voce, gesto e ripetizione danno forma al tempo condiviso.",
    },
  ],
  observationCards: [
    {
      id: "passi",
      title: "Passi e battiti",
      detail: "Conta se i colpi tornano sempre uguali oppure cambiano in modo irregolare.",
    },
    {
      id: "onde",
      title: "Onde e oscillazioni",
      detail: "Guarda se il movimento e continuo, regolare o pieno di interruzioni.",
    },
    {
      id: "segni",
      title: "Pattern e notazione grafica",
      detail: "Osserva dove il gruppo riparte e dove senti il punto piu forte.",
    },
  ],
  pulseGuide: [
    {
      step: "01",
      title: "Scegli il tempo",
      detail: "Prova lento, medio o veloce.",
    },
    {
      step: "02",
      title: "Segui i 4 battiti",
      detail: "Conta 1 2 3 4 senza cambiare forma.",
    },
    {
      step: "03",
      title: "Confronta",
      detail: "Osserva che cambia solo la velocita.",
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
      exercise: "Negli esercizi tieni quattro battiti uguali, senza cambiare forma.",
    },
    {
      id: "rhythm",
      title: "Ritmo",
      definition: "E il modo in cui suoni e silenzi si organizzano sopra la pulsazione.",
      visual: ["sound", "pause", "sound", "accent"],
      exercise: "Negli esercizi cambi suoni e pause, ma la pulsazione sotto resta stabile.",
    },
    {
      id: "tempo",
      title: "Tempo",
      definition: "E la velocita della pulsazione: lenta, moderata o veloce.",
      visual: ["tempo-slow", "tempo-medium", "tempo-fast"],
      exercise: "Negli esercizi ascolti se il battito scorre lento, moderato o veloce.",
    },
    {
      id: "accent",
      title: "Accento",
      definition: "E un suono o una pulsazione con maggior rilievo.",
      visual: ["accent", "equal", "equal", "equal"],
      exercise: "Negli esercizi fai sentire un punto piu forte dentro il gruppo.",
    },
    {
      id: "meter",
      title: "Metro",
      definition: "E l'organizzazione regolare degli accenti in gruppi da due, tre o quattro.",
      visual: ["group-2", "group-3", "group-4"],
      exercise: "Negli esercizi conti se gli accenti tornano a due, a tre o a quattro.",
    },
  ],
  quoteDefinitions: [
    {
      id: "pulsazione",
      term: "Pulsazione",
      quote: '"La pulsazione e il battito regolare che sostiene la musica."',
      support: "E il passo comune che aiuta il gruppo a stare insieme.",
    },
    {
      id: "ritmo",
      term: "Ritmo",
      quote: '"Il ritmo e il modo in cui suoni e silenzi si organizzano nel tempo."',
      support: "Si muove sopra la pulsazione e rende la sequenza riconoscibile.",
    },
    {
      id: "tempo",
      term: "Tempo",
      quote: '"Il tempo dice se la pulsazione scorre lenta, moderata o veloce."',
      support: "Ci aiuta a percepire la velocita del battito comune.",
    },
  ],
  listeningCards: [
    {
      id: "listening-a",
      code: "A",
      title: "Passo / marcia",
      focus: "Pulsazione in 2",
      description: "Il corpo tende a camminare in coppie regolari: uno-due, uno-due. Qui la pulsazione e molto leggibile.",
      exercise: "Prova a battere mani o banco seguendo un passo fermo e regolare.",
      expected: 2,
    },
    {
      id: "listening-b",
      code: "B",
      title: "Dondolio / valzer",
      focus: "Pulsazione in 3",
      description: "Il movimento oscilla e fa sentire gruppi di tre: uno accompagna, due completano il giro.",
      exercise: "Prova a contare uno-due-tre con un piccolo movimento del corpo.",
      expected: 3,
    },
    {
      id: "listening-c",
      code: "C",
      title: "Groove / battito moderno",
      focus: "Pulsazione stabile con ritmo sovrapposto",
      description: "Il battito resta sotto, ma il ritmo in superficie si muove e puo farti perdere il centro.",
      exercise: "Prova a tenere il battito con una mano mentre l'altra immagina un ritmo diverso.",
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
  sequenceWorkflow: [
    {
      step: "01",
      title: "Scegli il segno",
      detail: "Decidi se ogni tempo sara suono, pausa o accento.",
    },
    {
      step: "02",
      title: "Scrivi due battute",
      detail: "Riempi 8 tempi in due gruppi da quattro, senza perdere il battito.",
    },
    {
      step: "03",
      title: "Ripeti col gruppo",
      detail: "Prova la sequenza finche diventa chiara, stabile e condivisa.",
    },
  ],
  performanceRules: [
    "Tieni stabile la pulsazione.",
    "Lascia che il ritmo possa cambiare.",
    "Fai sentire gli accenti.",
    "Scegli un tempo chiaro e mantienilo.",
    "Ripeti la sequenza senza perderti.",
  ],
  performanceRoles: [
    "Se tieni la pulsazione, resta regolare.",
    "Se costruisci il ritmo, varia senza perdere il centro.",
    "Se marchi gli accenti, rendili chiari.",
    "Se osservi, aiuta il gruppo a correggersi.",
  ],
  performanceCriteria: [
    "Mantieni il battito comune.",
    "Distingui pulsazione e ritmo.",
    "Fai sentire gli accenti.",
    "Scegli un tempo chiaro.",
    "Ripeti la sequenza senza perderti.",
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
      prompt: "Che cos'e il tempo?",
      options: [
        {
          id: "q3-a",
          label: "La velocita della pulsazione.",
          correct: true,
          feedback: "Esatto. Il tempo ci dice se la pulsazione scorre lenta, moderata o veloce.",
        },
        {
          id: "q3-b",
          label: "L'organizzazione degli accenti in gruppi.",
          correct: false,
          feedback: "Non proprio. Questa definizione riguarda il metro.",
        },
        {
          id: "q3-c",
          label: "Un suono sempre piu forte.",
          correct: false,
          feedback: "No. Il tempo non riguarda la forza del suono, ma la velocita del battito.",
        },
      ],
    },
    {
      id: "q4",
      prompt: "Che cos'e l'accento?",
      options: [
        {
          id: "q4-a",
          label: "Un suono o una pulsazione con maggior rilievo.",
          correct: true,
          feedback: "Esatto. L'accento fa sentire un punto piu forte dentro il gruppo.",
        },
        {
          id: "q4-b",
          label: "Una pulsazione sempre piu veloce.",
          correct: false,
          feedback: "Non proprio. Velocita e accento non sono la stessa cosa.",
        },
        {
          id: "q4-c",
          label: "Un silenzio obbligatorio.",
          correct: false,
          feedback: "No. Il silenzio puo essere importante, ma l'accento e un punto piu marcato del suono o del gesto.",
        },
      ],
    },
    {
      id: "q5",
      prompt: "Che cos'e il metro?",
      options: [
        {
          id: "q5-a",
          label: "L'organizzazione regolare degli accenti in gruppi.",
          correct: true,
          feedback: "Esatto. Il metro fa sentire gruppi regolari a due, a tre o a quattro.",
        },
        {
          id: "q5-b",
          label: "La velocita della pulsazione.",
          correct: false,
          feedback: "Non proprio. Questa definizione riguarda il tempo.",
        },
        {
          id: "q5-c",
          label: "Il numero totale degli strumenti.",
          correct: false,
          feedback: "No. Il metro non conta gli strumenti: organizza gli accenti nel tempo.",
        },
      ],
    },
    {
      id: "q6",
      prompt: "Come capisci se il tempo e lento, moderato o veloce?",
      options: [
        {
          id: "q6-a",
          label: "Osservando la velocita con cui torna la pulsazione.",
          correct: true,
          feedback: "Esatto. Se il battito torna piu in fretta, il tempo e piu veloce.",
        },
        {
          id: "q6-b",
          label: "Guardando quante mani ci sono nel gruppo.",
          correct: false,
          feedback: "No. Il numero di persone non basta a definire il tempo.",
        },
        {
          id: "q6-c",
          label: "Ascoltando solo il primo colpo.",
          correct: false,
          feedback: "Non basta un solo colpo. Serve osservare come il battito continua nel tempo.",
        },
      ],
    },
  ],
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

function getMeterPalette(groupSize) {
  if (groupSize === 2) {
    return {
      groupSurface: "border-[#d8eadc] bg-[#f4faf5]",
      beat: "border-[#d4e2d7] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#eef5f0_100%)] text-[#64756a]",
      accent: "border-[#c2d8c8] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#dfeee3_100%)] text-[#45634f]",
      pill: "border-[#d8eadc] bg-[#eef7f1] text-[#45634f]",
      note: "text-[#4f6857]",
    };
  }

  if (groupSize === 3) {
    return {
      groupSurface: "border-[#eedccf] bg-[#fff7f0]",
      beat: "border-[#eadfd4] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#fbf2ea_100%)] text-[#8a6f5e]",
      accent: "border-[#e6cdb9] bg-[radial-gradient(circle_at_35%_35%,#fffdfb_0%,#fee9d7_100%)] text-[#8a4d18]",
      pill: "border-[#eedccf] bg-[#fff2e7] text-[#8a4d18]",
      note: "text-[#8a5a34]",
    };
  }

  return {
    groupSurface: "border-[#d8e3f0] bg-[#f4f8fd]",
    beat: "border-[#dbe4f0] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#edf3fa_100%)] text-[#66758a]",
    accent: "border-[#c8d7ea] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#e2ebf8_100%)] text-[#3e5f86]",
    pill: "border-[#d8e3f0] bg-[#edf4fc] text-[#3e5f86]",
    note: "text-[#516a88]",
  };
}

function buildMeterGroups(groupSize, totalBeats = 8) {
  const groups = [];
  const adjustedTotalBeats = Math.ceil(totalBeats / groupSize) * groupSize;
  let beatIndex = 0;

  while (beatIndex < adjustedTotalBeats) {
    const group = [];
    for (let index = 0; index < groupSize && beatIndex < adjustedTotalBeats; index += 1) {
      group.push(index + 1);
      beatIndex += 1;
    }
    groups.push(group);
  }

  return groups;
}

function ConceptVisual({ type }) {
  if (type === "tempo-slow" || type === "tempo-medium" || type === "tempo-fast") {
    const tempoMeta =
      type === "tempo-slow"
        ? { label: "lenta", className: "border-[#d7e1ec] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#edf3fa_100%)] text-[#5f738d]" }
        : type === "tempo-medium"
          ? { label: "moderata", className: "border-[#eadfd4] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#fbf2ea_100%)] text-[#8a6f5e]" }
          : { label: "veloce", className: "border-[#e6cdb9] bg-[radial-gradient(circle_at_35%_35%,#fffdfb_0%,#fee9d7_100%)] text-[#8a4d18]" };

    return (
      <span
        className={cn(
          "inline-flex min-w-[5.8rem] items-center justify-center rounded-full border px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] shadow-[0_10px_22px_rgba(15,23,42,0.06)]",
          tempoMeta.className
        )}
      >
        {tempoMeta.label}
      </span>
    );
  }

  if (type === "group-2" || type === "group-3" || type === "group-4") {
    const size = type === "group-2" ? 2 : type === "group-3" ? 3 : 4;
    const palette = getMeterPalette(size);

    return (
      <div className={cn("flex items-center gap-2.5 rounded-[1.35rem] border px-3 py-3", palette.groupSurface)}>
        <div className="flex items-center gap-2.5">
          {Array.from({ length: size }).map((_, index) => (
            <span
              key={`${type}-${index}`}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold shadow-[0_10px_22px_rgba(15,23,42,0.06)]",
                index === 0 ? palette.accent : palette.beat
              )}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>
    );
  }

  const active = type === "accent";
  const pause = type === "pause";
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border shadow-[0_10px_22px_rgba(15,23,42,0.06)]",
        active
          ? "h-16 w-16 border-[#e7ceb9] bg-[radial-gradient(circle_at_35%_35%,#fffdfb_0%,#feead9_100%)] text-[1.7rem] text-[#8a4d18]"
          : "h-12 w-12 border-[#d7e1ec] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#edf3fa_100%)] text-lg text-[#647791]",
        pause && "border-[#d9e0e8] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#f5f7fa_100%)] text-[#93a4b8]"
      )}
    >
      {pause ? "○" : "●"}
    </span>
  );
}

function MeterPreview({ groupSize, compact = false }) {
  const palette = getMeterPalette(groupSize);
  const groups = buildMeterGroups(groupSize);

  if (compact) {
    return (
      <div className="mt-4 rounded-[1.55rem] border border-slate-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#fcfbf8_100%)] px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <p className={SMALL_LABEL}>Traccia visiva</p>
          <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium", palette.pill)}>
            {groupSize} pulsazioni
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {groups.map((group, index) => (
            <div
              key={`${groupSize}-compact-${index}`}
              className={cn("flex items-center gap-2.5 rounded-[1.2rem] border px-3 py-3", palette.groupSurface)}
            >
              {group.map((value, valueIndex) => (
                <span
                  key={`${groupSize}-${index}-${value}`}
                  className={cn(
                    "inline-flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold shadow-[0_10px_22px_rgba(15,23,42,0.06)]",
                    valueIndex === 0 ? palette.accent : palette.beat
                  )}
                >
                  {value}
                </span>
              ))}
            </div>
          ))}
        </div>

        <p className={cn("mt-4 text-sm font-medium", palette.note)}>Il numero 1 riapre il gruppo e fa sentire l'accento.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-[1.7rem] border border-slate-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#fcfbf8_100%)] px-5 py-6 sm:px-6 sm:py-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className={SMALL_LABEL}>Traccia visiva</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">Guarda dove il gruppo si chiude e dove il numero 1 riparte.</p>
        </div>
        <span className={cn("inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium", palette.pill)}>
          {groupSize} pulsazioni
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        {groups.map((group, index) => (
          <div key={`${groupSize}-full-${index}`} className={cn("flex items-center gap-3 rounded-[1.35rem] border px-4 py-4", palette.groupSurface)}>
            {group.map((value, valueIndex) => (
              <div key={`${groupSize}-full-${index}-${value}`} className="flex flex-col items-center gap-2">
                <span
                  className={cn(
                    "inline-flex h-14 w-14 items-center justify-center rounded-full border text-base font-semibold shadow-[0_10px_24px_rgba(15,23,42,0.06)]",
                    valueIndex === 0 ? palette.accent : palette.beat
                  )}
                >
                  {value}
                </span>
                <span className={cn("text-[0.82rem] font-medium", valueIndex === 0 ? palette.note : "text-slate-400")}>
                  battito
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className={cn("mt-5 text-sm font-medium", palette.note)}>Ogni blocco colorato mostra uno stesso gruppo che ritorna.</p>
    </div>
  );
}

function meterGroupLabel(groupSize) {
  if (groupSize === 2) return "a due";
  if (groupSize === 3) return "a tre";
  return "a quattro";
}

function SequencerSymbol({ stateId, className = "" }) {
  if (stateId === "accent") {
    return <span className={cn("block text-4xl font-semibold text-slate-950", className)}>●</span>;
  }
  if (stateId === "pause") {
    return <span className={cn("block text-4xl font-semibold text-slate-300", className)}>○</span>;
  }
  return <span className={cn("block text-4xl font-semibold text-slate-950", className)}>●</span>;
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

function ContextSection() {
  const section = getSection("context");

  return (
    <SectionShell id={section.id} backgroundClass="bg-white" className={SECTION_SPACE}>
      <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(24rem,1.08fr)] lg:items-start">
          <SectionHeading kicker="Contesto storico e culturale" title={section.title} text={section.text} />

          <SurfacePanel tone="soft" className="px-6 py-6 sm:px-7">
            <p className={SMALL_LABEL}>Dove il ritmo serve al gruppo</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {lessonData.contextExamples.map((item) => (
                <div key={item.id} className="rounded-[1.25rem] border border-slate-200/70 bg-white px-4 py-4">
                  <p className="text-[1rem] font-semibold tracking-[-0.02em] text-slate-950">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.detail}</p>
                </div>
              ))}
            </div>
          </SurfacePanel>
        </div>
      </div>
    </SectionShell>
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
        <SectionHeading kicker="Domanda iniziale" title={section.title} text={section.text} align="center" />

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
        <SectionHeading kicker="Osservazione guidata" title={section.title} text={section.text} />

        <SurfacePanel tone="soft" className="mt-10 overflow-hidden p-0">
          <div className="grid gap-0 xl:grid-cols-[minmax(0,0.88fr)_minmax(24rem,1.12fr)]">
            <div className="border-b border-slate-200/70 px-6 py-6 sm:px-8 sm:py-7 xl:border-b-0 xl:border-r">
              <div className="flex items-center justify-between gap-4">
                <p className={SMALL_LABEL}>Scegli la velocita</p>
                <ToneTag className="border-[#eadfce] bg-white text-[#8a4d18]">4 battiti · un solo centro</ToneTag>
              </div>

              <div className="mt-4 flex flex-wrap gap-2.5">
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

            <div className="px-6 py-6 sm:px-8 sm:py-7">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className={SMALL_LABEL}>Battito comune</p>
                  <p className="mt-3 text-[1.18rem] font-semibold tracking-[-0.03em] text-slate-950">
                    Quattro battiti uguali che tornano sempre nello stesso ordine.
                  </p>
                </div>
                <ToneTag className="border-slate-200/70 bg-white text-slate-600">
                  {activeMode.label} · {activeMode.bpm} bpm
                </ToneTag>
              </div>

              <div className="mt-6 rounded-[1.9rem] border border-slate-200/70 bg-white px-5 py-7 shadow-[0_12px_28px_rgba(15,23,42,0.03)] sm:px-6">
                <div className="relative">
                  <div className="absolute left-0 right-0 top-[4.3rem] hidden h-px bg-slate-200 sm:block" aria-hidden="true" />
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  {Array.from({ length: 4 }).map((_, index) => {
                    const isActive = index === beatIndex && running;
                    return (
                      <div key={`pulse-${index}`} className="relative flex flex-1 flex-col items-center gap-3 text-center">
                        <span className={SMALL_LABEL}>battito {index + 1}</span>
                        <span
                          className={cn(
                            "inline-flex h-20 w-20 items-center justify-center rounded-full border text-lg font-semibold shadow-[0_12px_26px_rgba(15,23,42,0.07)] sm:h-24 sm:w-24",
                            isActive
                              ? "border-[#e7cdb9] bg-[radial-gradient(circle_at_35%_35%,#fffdfb_0%,#fee8d6_100%)] text-[#8a4d18]"
                              : "border-[#d7e1ec] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#edf3fa_100%)] text-[#647791]"
                          )}
                          style={reducedMotion ? undefined : { transition: "background-color 140ms ease, border-color 140ms ease, color 140ms ease" }}
                        >
                          {index + 1}
                        </span>
                        <span className={cn("text-sm font-medium", isActive ? "text-[#8a4d18]" : "text-slate-400")}>
                          {index === 0 ? "riparte" : "continua"}
                        </span>
                      </div>
                    );
                  })}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                <div className="rounded-[1.45rem] border border-slate-200/70 bg-[#fcfbf8] px-5 py-5">
                  <p className={SMALL_LABEL}>Che cosa osservi?</p>
                  <p className="mt-3 text-[0.98rem] leading-7 text-slate-600">{section.support}</p>
                </div>
                <div className="flex flex-wrap gap-3 lg:max-w-[14rem] lg:justify-end">
                  <ToneTag className="border-[#d8eadc] bg-[#eef7f1] text-[#45634f]">lenta</ToneTag>
                  <ToneTag className="border-[#eedccf] bg-[#fff2e7] text-[#8a4d18]">media</ToneTag>
                  <ToneTag className="border-[#d8e3f0] bg-[#edf4fc] text-[#3e5f86]">veloce</ToneTag>
                </div>
              </div>
            </div>
          </div>
        </SurfacePanel>
      </div>
    </SectionShell>
  );
}

function ConceptsSection() {
  const section = getSection("concepts");

  return (
    <SectionShell id={section.id} backgroundClass="bg-[#fbfbf9]" className={SECTION_SPACE}>
      <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
        <SectionHeading kicker="Spiegazione dei contenuti" title={section.title} text={section.text} align="center" />

        <div className="mt-14 grid gap-5 xl:grid-cols-2">
          {lessonData.conceptCards.map((card, index) => (
            <SurfacePanel key={card.id} tone="subtle" className="p-6 sm:p-7 lg:p-8">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(16rem,0.98fr)] lg:items-center">
                <div className="max-w-[28rem]">
                  <p className={SMALL_LABEL}>0{index + 1}</p>
                  <h3 className="mt-4 text-[2.1rem] font-semibold tracking-[-0.05em] text-slate-950">{card.title}</h3>
                  <p className={cn("mt-4", BODY_COPY_SOFT)}>{card.definition}</p>
                </div>

                <div className="rounded-[1.5rem] border border-slate-200/70 bg-white px-5 py-5 sm:px-6 sm:py-6">
                  <p className={SMALL_LABEL}>Segno visivo</p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    {card.visual.map((item, itemIndex) => (
                      <ConceptVisual key={`${card.id}-${itemIndex}`} type={item} />
                    ))}
                  </div>
                  <div className="mt-6 border-t border-slate-200/70 pt-5">
                    <p className={SMALL_LABEL}>Negli esercizi</p>
                    <p className="mt-3 text-[0.95rem] leading-7 text-slate-500 sm:text-base">{card.exercise}</p>
                  </div>
                </div>
              </div>
            </SurfacePanel>
          ))}
        </div>

        <SurfacePanel tone="soft" className="mt-8 overflow-hidden px-6 py-7 sm:px-8 sm:py-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-[38rem]">
              <p className={SMALL_LABEL}>Definizioni chiave</p>
              <p className="mt-3 text-[1rem] leading-7 text-slate-600">
                Queste tre frasi possono essere ricopiate sul quaderno e usate mentre provi con il gruppo.
              </p>
            </div>
            <ToneTag className="border-[#ecdcc9] bg-white/80 text-[#8a4d18]">quaderno · ascolto · gesto</ToneTag>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            {lessonData.quoteDefinitions.map((definition, index) => (
              <SurfacePanel key={definition.id} tone="base" className="border-[#eadfce] bg-white/90 p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <p className={SMALL_LABEL}>0{index + 1}</p>
                  <span className="h-1 w-12 rounded-full bg-[#c66a18]/60" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-[2rem] font-semibold tracking-[-0.05em] text-slate-950">{definition.term}</h3>
                <p className="mt-6 text-[1.18rem] leading-[1.6] tracking-[-0.03em] text-slate-700 italic sm:text-[1.28rem]">
                  {definition.quote}
                </p>
                <p className={cn("mt-6 max-w-[24rem]", BODY_COPY_SOFT)}>{definition.support}</p>
              </SurfacePanel>
            ))}
          </div>
        </SurfacePanel>

        <SurfacePanel tone="soft" className="mt-10 px-6 py-7 text-center">
          <p className="mx-auto max-w-none text-[1.8rem] font-semibold tracking-[-0.05em] text-slate-950 sm:text-[2.15rem] lg:text-[2.7rem] lg:whitespace-nowrap">
            {section.closing}
          </p>
        </SurfacePanel>
      </div>
    </SectionShell>
  );
}

function RhythmMapSection() {
  const section = getSection("map");
  return (
    <SectionShell id={section.id} backgroundClass="bg-[#f8f6f2]" className={SECTION_SPACE}>
      <div className={LESSON_SHELL_WIDE} style={{ fontFamily: APP_FONT }}>
        <SectionHeading kicker="Definizioni guida" title={section.title} text={section.text} />

        <SurfacePanel tone="soft" className="mt-14 overflow-hidden px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-[38rem]">
              <p className={SMALL_LABEL}>Da leggere, dire e ricopiare</p>
              <p className="mt-3 text-[1.02rem] leading-7 text-slate-600 sm:text-[1.08rem]">
                Tre frasi brevi fissano il lessico del lavoro comune. Le teniamo davanti agli occhi mentre battiamo,
                ascoltiamo e costruiamo il ritmo del gruppo.
              </p>
            </div>
            <ToneTag className="border-[#ecdcc9] bg-white/80 text-[#8a4d18]">quaderno · voce · gesto</ToneTag>
          </div>

          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-[#d9c1a7] to-transparent" aria-hidden="true" />

          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            {lessonData.quoteDefinitions.map((definition, index) => (
              <SurfacePanel
                key={definition.id}
                tone="base"
                className="relative overflow-hidden border-[#eadfce] bg-white/90 p-6 sm:p-7"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-70"
                  aria-hidden="true"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(255,255,255,0) 0, rgba(255,255,255,0) 47px, rgba(198,106,24,0.08) 48px)",
                    backgroundSize: "100% 48px",
                  }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <p className={SMALL_LABEL}>0{index + 1}</p>
                    <span className="h-1 w-12 rounded-full bg-[#c66a18]/60" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-[2rem] font-semibold tracking-[-0.05em] text-slate-950">{definition.term}</h3>
                  <p className="mt-6 text-[1.3rem] leading-[1.65] tracking-[-0.03em] text-slate-700 italic sm:text-[1.42rem]">
                    {definition.quote}
                  </p>
                  <p className={cn("mt-8 max-w-[24rem]", BODY_COPY_SOFT)}>{definition.support}</p>
                </div>
              </SurfacePanel>
            ))}
          </div>

          <p className="mt-8 text-sm font-medium uppercase tracking-[0.22em] text-slate-400">
            Scrivile uguali sul quaderno e usale mentre provi con il gruppo.
          </p>
        </SurfacePanel>
      </div>
    </SectionShell>
  );
}

function ListeningCardsSection() {
  const section = getSection("listening");
  const [activeCardId, setActiveCardId] = useState(lessonData.listeningCards[0].id);
  const [selectedMeters, setSelectedMeters] = useState({});
  const activeCard =
    lessonData.listeningCards.find((card) => card.id === activeCardId) || lessonData.listeningCards[0];
  const selectedMeter = selectedMeters[activeCard.id] || activeCard.expected;
  const selectedPalette = getMeterPalette(selectedMeter);
  const expectedPalette = getMeterPalette(activeCard.expected);

  return (
    <SectionShell id={section.id} backgroundClass="bg-white" className="py-16 sm:py-20 lg:py-24">
      <div className={LESSON_SHELL_WIDE} style={{ fontFamily: APP_FONT }}>
        <SectionHeading kicker="Ascolto guidato" title={section.title} text={section.text} />

        <SurfacePanel tone="soft" className="mt-8 overflow-hidden border-slate-200/60 bg-[linear-gradient(180deg,#fffefb_0%,#fcfaf6_100%)] p-5 sm:p-6 lg:p-7">
          <div className="grid gap-3 lg:grid-cols-3">
            {lessonData.listeningCards.map((card) => {
              const isActive = card.id === activeCard.id;
              const palette = getMeterPalette(card.expected);
              return (
                <button
                  key={card.id}
                  type="button"
                  aria-label={`Apri ascolto ${card.code}`}
                  onClick={() => setActiveCardId(card.id)}
                  className={cn(
                    RING,
                    "rounded-[1.45rem] border px-4 py-4 text-left transition-colors duration-150",
                    isActive
                      ? "border-[#e6c8a8] bg-white"
                      : "border-white/80 bg-white/75 hover:border-slate-200 hover:bg-white"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={SMALL_LABEL}>Ascolto {card.code}</p>
                      <p className="mt-3 text-[1.05rem] font-semibold tracking-[-0.03em] text-slate-950">{card.title}</p>
                    </div>
                    <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium", palette.pill)}>
                      {card.expected}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(24rem,1.05fr)] xl:items-start">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={SMALL_LABEL}>Ascolto {activeCard.code}</p>
                  <h3 className="mt-4 text-[2.1rem] font-semibold tracking-[-0.05em] text-slate-950">{activeCard.title}</h3>
                </div>
                <span className={cn("inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium", expectedPalette.pill)}>
                  {activeCard.focus}
                </span>
              </div>

              <p className="mt-4 text-[1.02rem] leading-8 text-slate-600">{activeCard.description}</p>

              <div className="mt-6 rounded-[1.45rem] border border-slate-200/70 bg-white/90 px-5 py-5">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                  <div>
                    <p className={SMALL_LABEL}>Prova</p>
                    <p className="mt-3 text-[1rem] leading-7 text-slate-600">{activeCard.exercise}</p>
                  </div>
                  <span className={cn("inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium", expectedPalette.pill)}>
                    atteso · {activeCard.expected}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <p className={SMALL_LABEL}>Prova il gruppo</p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {[2, 3, 4].map((meter) => (
                    <button
                      key={`${activeCard.id}-${meter}`}
                      type="button"
                      aria-label={`${meter} pulsazioni`}
                      onClick={() => setSelectedMeters((current) => ({ ...current, [activeCard.id]: meter }))}
                      className={cn(RING, selectedMeter === meter ? PILL_ACTIVE : PILL_DEFAULT)}
                    >
                      {meter} pulsazioni
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.45rem] border border-slate-200/70 bg-white/90 px-5 py-5">
                <MeterPreview groupSize={selectedMeter} compact={false} />
              </div>

              <div className={cn("rounded-[1.35rem] border px-5 py-5", selectedPalette.groupSurface)}>
                <p className={cn("text-sm leading-6 font-medium", selectedPalette.note)}>
                  Se il numero 1 torna ogni {selectedMeter} battiti, stai sentendo un gruppo {meterGroupLabel(selectedMeter)}.
                </p>
              </div>
            </div>
          </div>
        </SurfacePanel>

        <SurfacePanel tone="subtle" className="mt-6 px-5 py-5 sm:px-6 sm:py-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-start">
            <div>
              <p className={SMALL_LABEL}>Domande guida</p>
              <p className="mt-3 text-[1rem] leading-7 text-slate-600">
                Usa le stesse tre domande per tutti e tre gli ascolti, cosi il confronto diventa piu chiaro.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {lessonData.listeningQuestions.map((question, index) => (
                <div key={question} className="rounded-[1.25rem] border border-slate-200/70 bg-white px-4 py-4">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-[#fcfbf8] text-sm font-semibold text-slate-500">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-sm leading-6 text-slate-600">{question}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SurfacePanel>
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

  const activeOption = optionById[selectedStateId];

  const renderStepButton = (step, index) => {
    const option = optionById[step];
    const isAccent = step === "accent";
    const isPause = step === "pause";
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
          "group flex aspect-square w-full max-w-[6.2rem] flex-col rounded-[1.2rem] border border-solid px-2.5 py-2.5 text-left transition-colors duration-150 justify-self-center",
          isAccent
            ? "border-[#e6c8a8] bg-[#fff8f1] hover:border-[#d7b692] hover:bg-[#fff3e5]"
            : isPause
              ? "border-slate-200/80 bg-[#fbfaf7] hover:border-slate-300 hover:bg-[#f6f4ef]"
              : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-[#f8f6f1]"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <span className={SMALL_LABEL}>tempo {index + 1}</span>
          <span
            className={cn(
              "inline-flex h-7 w-7 items-center justify-center rounded-full border text-[0.72rem] font-medium",
              isAccent
                ? "border-[#e6c8a8] bg-white text-[#8a4d18]"
                : isPause
                  ? "border-slate-200 bg-white text-slate-400"
                  : "border-slate-200 bg-[#fcfbf8] text-slate-500"
            )}
          >
            {index + 1}
          </span>
        </div>
        <div className="mt-3 flex flex-1 flex-col items-center justify-center text-center">
          <SequencerSymbol stateId={step} className={isAccent ? "text-[1.95rem] text-[#8a4d18]" : "text-[1.7rem]"} />
          <span className={cn("mt-2 text-[0.75rem] font-medium leading-4", isAccent ? "text-[#8a4d18]" : "text-slate-500")}>
            {option.longLabel}
          </span>
        </div>
      </button>
    );
  };

  return (
    <SectionShell id={section.id} backgroundClass="bg-[#fbfbf9]" className={SECTION_SPACE}>
      <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,1.1fr)] lg:items-start">
          <div className="max-w-[31rem]">
            <SectionHeading kicker="Attivita pratica" title={section.title} text={section.text} />
            <SurfacePanel tone="subtle" className="mt-8 overflow-hidden p-0">
              <div className="border-b border-slate-200/70 px-6 py-6 sm:px-7">
                <p className={SMALL_LABEL}>Come lavori</p>
                <div className="mt-5 space-y-4">
                  {lessonData.sequenceWorkflow.map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-500">
                        {item.step}
                      </span>
                      <div>
                        <p className="text-[1rem] font-semibold tracking-[-0.02em] text-slate-950">{item.title}</p>
                        <p className="mt-1 text-[0.98rem] leading-7 text-slate-500">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-6 py-6 sm:px-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className={SMALL_LABEL}>Segno attivo</p>
                    <p className="mt-2 text-[1rem] font-semibold tracking-[-0.02em] text-slate-950">{activeOption.longLabel}</p>
                  </div>
                  <ToneTag className="border-[#eadfce] bg-white text-[#8a4d18]">8 tempi · corpo · voce · banco</ToneTag>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {lessonData.sequenceStates.map((option) => {
                    const isSelected = option.id === selectedStateId;
                    const isAccent = option.id === "accent";
                    const isPause = option.id === "pause";
                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-label={`Seleziona ${option.longLabel}`}
                        onClick={() => setSelectedStateId(option.id)}
                        className={cn(
                          RING,
                          "rounded-[1.45rem] border border-solid px-4 py-4 text-left transition-colors duration-150",
                          isSelected
                            ? "border-[#e6c8a8] bg-[#fff8f1]"
                            : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-[#f8f6f1]"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "inline-flex h-11 w-11 items-center justify-center rounded-full border text-lg font-semibold",
                              isSelected
                                ? "border-[#e6c8a8] bg-white text-[#8a4d18]"
                                : isPause
                                  ? "border-slate-200 bg-[#fcfbf8] text-slate-400"
                                  : "border-slate-200 bg-[#fcfbf8] text-slate-600"
                            )}
                          >
                            {isPause ? "○" : "●"}
                          </span>
                          <div>
                            <p className="text-[1rem] font-semibold tracking-[-0.02em] text-slate-950">{option.label}</p>
                            <p className="mt-1 text-sm text-slate-500">
                              {isAccent ? "punto piu forte" : isPause ? "spazio di silenzio" : "battito presente"}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </SurfacePanel>
          </div>

          <SurfacePanel tone="soft" className="w-full max-w-[47rem] justify-self-center overflow-hidden p-0 xl:justify-self-end">
            <div className="border-b border-slate-200/70 px-6 py-6 sm:px-8 sm:py-7">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className={SMALL_LABEL}>Lavagna ritmica</p>
                  <p className="mt-3 text-[1.18rem] font-semibold tracking-[-0.03em] text-slate-950">Scrivi il ritmo in due battute da quattro tempi.</p>
                  <p className="mt-2 max-w-[34rem] text-[0.98rem] leading-7 text-slate-500">
                    Tocca una casella per inserirvi il segno selezionato. Il gruppo deve poter leggere e ripetere la sequenza senza perdere la pulsazione.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <ToneTag className="border-slate-200/70 bg-white text-slate-600">battuta 1</ToneTag>
                  <ToneTag className="border-slate-200/70 bg-white text-slate-600">battuta 2</ToneTag>
                </div>
              </div>
            </div>

            <div className="px-6 py-6 sm:px-8 sm:py-8">
              <div className="rounded-[1.8rem] border border-slate-200/70 bg-white px-4 py-5 shadow-[0_12px_28px_rgba(15,23,42,0.03)] sm:px-5">
                <div className="mx-auto max-w-[35rem]">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap gap-3">
                      <ToneTag className="border-slate-200/70 bg-[#fcfbf8] text-slate-600">battuta 1 · tempi 1-4</ToneTag>
                      <ToneTag className="border-slate-200/70 bg-[#fcfbf8] text-slate-600">battuta 2 · tempi 5-8</ToneTag>
                    </div>
                    <p className="text-sm font-medium text-slate-500">griglia 2 x 4</p>
                  </div>

                  <div className="mt-5 rounded-[1.6rem] border border-slate-200/70 bg-[#fcfbf8] px-3 py-4 sm:px-4 sm:py-4">
                    <div className="mx-auto grid max-w-[28rem] grid-cols-4 justify-items-center gap-3">
                      {steps.map((step, index) => renderStepButton(step, index))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start">
                <div className="rounded-[1.55rem] border border-slate-200/70 bg-white px-5 py-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className={SMALL_LABEL}>Prova un esempio</p>
                      <p className="mt-2 text-sm leading-6 text-slate-500">Usa i preset per confrontare un ritmo lineare, uno con pause e uno con accenti.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <SecondaryButton onClick={() => applyPreset("reset")}>Reset</SecondaryButton>
                      <SecondaryButton onClick={() => applyPreset("simple")}>Esempio semplice</SecondaryButton>
                      <SecondaryButton onClick={() => applyPreset("pauses")}>Esempio con pause</SecondaryButton>
                      <SecondaryButton onClick={() => applyPreset("accents")}>Esempio con accenti</SecondaryButton>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 xl:max-w-[14rem] xl:justify-end">
                  <ToneTag className="border-slate-200/70 bg-white text-slate-600">● = suono</ToneTag>
                  <ToneTag className="border-slate-200/70 bg-white text-slate-600">○ = pausa</ToneTag>
                  <ToneTag className="border-slate-200/70 bg-white text-slate-600">● grande = accento</ToneTag>
                </div>
              </div>
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
  const activeIndex = lessonData.conductorSteps.findIndex((step) => step.id === activeStepId);
  const activeStep =
    lessonData.conductorSteps.find((step) => step.id === activeStepId) || lessonData.conductorSteps[0];

  return (
    <SectionShell id={section.id} backgroundClass="bg-white" className={SECTION_SPACE}>
      <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
        <SectionHeading kicker="Gesto del direttore" title={section.title} text={section.text} />

        <div className="mt-14 grid gap-6 xl:grid-cols-[minmax(0,1.02fr)_minmax(22rem,0.98fr)] xl:items-start">
          <SurfacePanel tone="soft" className="overflow-hidden p-0">
            <div className="border-b border-slate-200/70 px-6 py-6 sm:px-8 sm:py-7">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className={SMALL_LABEL}>Sequenza del gesto</p>
                  <p className="mt-3 max-w-[34rem] text-[1.05rem] leading-7 text-slate-600">
                    Il direttore guida il gruppo in quattro mosse: fermarsi, preparare, attaccare, chiudere.
                  </p>
                </div>
                <ToneTag className="border-[#eadfce] bg-white text-[#8a4d18]">4 gesti · un solo tempo comune</ToneTag>
              </div>
            </div>

            <div className="grid gap-4 p-6 sm:p-8 md:grid-cols-2">
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
                      "rounded-[1.65rem] border px-5 py-5 text-left transition duration-300",
                      isActive
                        ? "border-[#c66a18] bg-[#fff6ed]"
                        : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-[#f8f6f1]"
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={cn(
                          "inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold",
                          isActive ? "border-[#e6c8a8] bg-white text-[#8a4d18]" : "border-slate-200 bg-[#fcfbf8] text-slate-500"
                        )}
                      >
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-slate-400">{step.command}</span>
                    </div>
                    <p className="mt-6 text-[2rem] font-semibold tracking-[-0.05em] text-slate-950">{step.title}</p>
                    <p className="mt-3 text-[1rem] leading-7 text-slate-500">{step.summary}</p>
                  </button>
                );
              })}
            </div>
          </SurfacePanel>

          <SurfacePanel tone="subtle" className="overflow-hidden p-0">
            <div className="border-b border-slate-200/70 px-6 py-6 sm:px-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <SectionKicker>Step attivo</SectionKicker>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">{activeStep.title}</h3>
                </div>
                <span className="inline-flex h-12 min-w-12 items-center justify-center rounded-full border border-[#eadfce] bg-white px-4 text-sm font-semibold text-[#8a4d18]">
                  {String(activeIndex + 1).padStart(2, "0")} / 04
                </span>
              </div>
              <p className="mt-4 text-[1.06rem] font-medium leading-7 text-[#8a4d18]">{activeStep.command}</p>
            </div>

            <div className="px-6 py-6 sm:px-8 sm:py-7">
              <div className="grid gap-4">
                <div className="rounded-[1.5rem] border border-slate-200/70 bg-white px-5 py-5">
                  <p className={SMALL_LABEL}>Che cosa fa il direttore</p>
                  <p className="mt-3 text-[1rem] leading-7 text-slate-600">{activeStep.detail}</p>
                </div>

                <div className="rounded-[1.5rem] border border-slate-200/70 bg-[#fcfbf8] px-5 py-5">
                  <p className={SMALL_LABEL}>Che cosa fa il gruppo</p>
                  <p className="mt-3 text-[1rem] leading-7 text-slate-600">{activeStep.summary}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {activeStep.tags.map((tag) => (
                  <ToneTag key={`${activeStep.id}-${tag}`}>{tag}</ToneTag>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200/70 bg-[#fcfbf8] px-6 py-5 sm:px-8">
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
        <SectionHeading kicker="Compito" title={section.title} text={section.text} />

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(21rem,0.92fr)]">
          <SurfacePanel tone="soft" className="p-6 sm:p-8">
            <p className={SMALL_LABEL}>Consegna</p>
            <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
              Costruisci con il tuo gruppo una breve sequenza comune da ripetere con chiarezza.
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
          <SectionHeading kicker="Verifica e conclusione" title={section.title} text={section.text} align="center" />

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

          <div className="mt-14 border-t border-slate-200/80 pt-10 text-center">
            <p className="mt-6 text-[2.4rem] font-semibold tracking-[-0.05em] text-slate-950 sm:text-[3rem]">
              La pulsazione e il battito regolare, il ritmo e cio che accade dentro quel battito, il tempo indica quanto veloce scorre la musica.
            </p>
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
      <ContextSection />
      <PulseSection />
      <ConceptsSection />
      <ListeningCardsSection />
      <RhythmSequencerSection />
      <PerformanceSection />
      <FinalQuizSection />
    </div>
  );
}

export default RitmoPulsazioneTempoLesson;
