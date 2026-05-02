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
const BUTTON_BASE = "lesson-control-button inline-flex min-h-11 items-center justify-center rounded-full border border-solid px-5 py-2.5 text-sm font-semibold tracking-[-0.01em] transition-colors duration-150";
const PILL_BASE = "lesson-control-pill inline-flex min-h-10 items-center rounded-full border border-solid bg-white px-4 py-2 text-[0.84rem] font-semibold tracking-[-0.01em] transition-colors duration-150";
const PILL_DEFAULT = `${PILL_BASE} border-[#e4e8ee] text-[#5e646c] hover:border-[#d7dde5] hover:text-[#18191b]`;
const PILL_ACTIVE = `${PILL_BASE} border-[#dde2e8] text-[#18191b]`;
const TAG_CLASS = "inline-flex items-center rounded-full border border-[#f1dec9] bg-[#fff6ed] px-3.5 py-1.5 text-sm font-medium text-[#8a4d18]";
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
      microtext: "Prima di leggere una partitura, possiamo sentire il tempo con il corpo. In questa lezione impariamo a distinguere pulsazione, ritmo, accento e tempo attraverso mani, piedi, voce, ascolto e gesto.",
      cta: "Inizia dal battito comune",
      idea: "Il ritmo nasce dall'organizzazione del movimento e rende condivisibile il tempo del gruppo.",
      question: "Possiamo stare tutti nello stesso tempo?"
    },
    {
      id: "spark",
      title: "Possiamo stare tutti nello stesso tempo?",
      text: "Camminiamo lentamente nello spazio o battiamo le mani sul banco. All'inizio ognuno segue il proprio impulso. Poi proviamo a trovare una pulsazione comune, uguale per tutti.",
      questions: [
        "Che cosa cambia quando il gruppo si sincronizza?",
        "Che cosa ci aiuta a restare insieme?",
        "Il tempo si sente solo con le orecchie o anche con il corpo?",
        "Che differenza c'e tra battere insieme e inventare un ritmo?"
      ],
      keywords: ["pulsazione", "gruppo", "ascolto", "sincronizzazione"]
    },
    {
      id: "pulse",
      title: "La pulsazione e il passo comune.",
      text: "La pulsazione e un battito regolare. Puo essere lenta o veloce, ma resta costante. E come un passo condiviso: permette al gruppo di muoversi, suonare e cantare insieme.",
      support: "Osserva: la pulsazione non cambia forma, cambia velocita."
    },
    {
      id: "concepts",
      title: "Pulsazione, ritmo, accento, tempo.",
      text: "Usiamo parole semplici, simboli chiari e piccoli esempi per capire come funziona il tempo musicale.",
      closing: "La pulsazione e regolare. Il ritmo si muove sopra di lei."
    },
    {
      id: "map",
      title: "Tre definizioni da ricopiare.",
      text: "Fermiamo tre parole chiave con frasi brevi, chiare e pronte per il quaderno."
    },
    {
      id: "listening",
      title: "Cos'e la pulsazione?",
      text: "Osserva tre situazioni ritmiche. Il compito e sentire il battito comune, seguirlo con il corpo e capire dove torna l'accento."
    },
    {
      id: "sequencer",
      title: "Costruiamo un ritmo sopra la pulsazione.",
      text: "Scegli una pulsazione stabile. Poi costruisci una sequenza di 8 tempi usando mani, piedi, voce o banco. Il ritmo deve poter essere ripetuto dal gruppo."
    },
    {
      id: "conductor",
      title: "Il direttore del tempo.",
      text: "Il direttore non parla. Usa il gesto per far partire il gruppo, mantenere la pulsazione, indicare gli accenti e fermare l'esecuzione.",
      note: "Il battere e il punto forte. Il levare prepara il battere."
    },
    {
      id: "performance",
      title: "Performance: il tempo del gruppo.",
      text: "Dividetevi in piccoli gruppi. Ogni gruppo sceglie un direttore. Create una breve performance di 30 secondi usando corpo, voce, banco o oggetti sonori."
    },
    {
      id: "quiz",
      title: "Che cosa abbiamo capito?",
      text: "Le domande finali controllano se sai distinguere pulsazione, ritmo, accento, battuta, gesto e tempo comune."
    },
    {
      id: "self",
      title: "Mi ascolto mentre suono.",
      text: "Rifletto sul mio ruolo nel gruppo e su come uso corpo, orecchio e gesto.",
      closing: "Quando il tempo e condiviso, il gruppo diventa musica."
    }
  ],
  pulseModes: [
    { id: "slow", label: "Lenta", bpm: 60 },
    { id: "medium", label: "Media", bpm: 90 },
    { id: "fast", label: "Veloce", bpm: 120 }
  ],
  conceptCards: [
    {
      id: "pulse",
      title: "Pulsazione",
      definition: "E il battito regolare che sostiene la musica.",
      visual: ["equal", "equal", "equal", "equal"],
      exercise: "Negli esercizi tieni quattro battiti uguali, senza cambiare velocita o forma."
    },
    {
      id: "rhythm",
      title: "Ritmo",
      definition: "E il modo in cui suoni e silenzi si organizzano sopra la pulsazione.",
      visual: ["sound", "pause", "sound", "accent"],
      exercise: "Negli esercizi cambi suoni e pause, ma la pulsazione sotto resta stabile."
    },
    {
      id: "accent",
      title: "Accento",
      definition: "E un suono o una pulsazione con maggior rilievo.",
      visual: ["accent", "equal", "equal", "equal"],
      exercise: "Negli esercizi fai sentire un punto piu forte, di solito all'inizio del gruppo."
    },
    {
      id: "time",
      title: "Tempo",
      definition: "E il modo in cui le pulsazioni vengono raggruppate: a due, a tre, a quattro.",
      visual: ["group-2", "group-3", "group-4"],
      exercise: "Negli esercizi conti se il gruppo va a due, a tre o a quattro pulsazioni."
    }
  ],
  quoteDefinitions: [
    {
      id: "pulsazione",
      term: "Pulsazione",
      quote: '"La pulsazione e il battito regolare che sostiene la musica."',
      support: "E il passo comune che aiuta il gruppo a stare insieme."
    },
    {
      id: "ritmo",
      term: "Ritmo",
      quote: '"Il ritmo e il modo in cui suoni e silenzi si organizzano nel tempo."',
      support: "Si muove sopra la pulsazione e rende la sequenza riconoscibile."
    },
    {
      id: "tempo",
      term: "Tempo",
      quote: '"Il tempo e il modo in cui le pulsazioni si raggruppano e fanno sentire il gesto comune."',
      support: "Ci aiuta a percepire se il gruppo va a due, a tre o a quattro."
    }
  ],
  listeningCards: [
    {
      id: "listening-a",
      code: "A",
      title: "Passo / marcia",
      focus: "Pulsazione in 2",
      description: "Il corpo tende a camminare in coppie regolari: uno-due, uno-due. Qui la pulsazione e molto leggibile.",
      exercise: "Prova a battere mani o banco seguendo un passo fermo e regolare.",
      expected: 2
    },
    {
      id: "listening-b",
      code: "B",
      title: "Dondolio / valzer",
      focus: "Pulsazione in 3",
      description: "Il movimento oscilla e fa sentire gruppi di tre: uno accompagna, due completano il giro.",
      exercise: "Prova a contare uno-due-tre con un piccolo movimento del corpo.",
      expected: 3
    },
    {
      id: "listening-c",
      code: "C",
      title: "Groove / battito moderno",
      focus: "Pulsazione stabile con ritmo sovrapposto",
      description: "Il battito resta sotto, ma il ritmo in superficie si muove e puo farti perdere il centro.",
      exercise: "Prova a tenere il battito con una mano mentre l'altra immagina un ritmo diverso.",
      expected: 4
    }
  ],
  listeningQuestions: [
    "Riesci a battere la pulsazione?",
    "Dove cade l'accento piu forte?",
    "Il ritmo coincide sempre con la pulsazione?"
  ],
  sequenceStates: [
    { id: "sound", label: "suono", symbol: "\u25CF", longLabel: "suono" },
    { id: "pause", label: "pausa", symbol: "\u25CB", longLabel: "pausa" },
    { id: "accent", label: "accento", symbol: "\u25CF", longLabel: "accento" }
  ],
  sequencePresets: {
    reset: Array.from({ length: 8 }, () => "pause"),
    simple: Array.from({ length: 8 }, () => "sound"),
    pauses: ["sound", "pause", "sound", "pause", "sound", "sound", "pause", "sound"],
    accents: ["accent", "sound", "sound", "sound", "accent", "sound", "sound", "sound"]
  },
  sequenceWorkflow: [
    {
      step: "01",
      title: "Scegli il segno",
      detail: "Decidi se ogni tempo sara suono, pausa o accento."
    },
    {
      step: "02",
      title: "Scrivi due battute",
      detail: "Riempi 8 tempi in due gruppi da quattro, senza perdere il battito."
    },
    {
      step: "03",
      title: "Ripeti col gruppo",
      detail: "Prova la sequenza finche diventa chiara, stabile e condivisa."
    }
  ],
  conductorSteps: [
    {
      id: "rest",
      title: "Punto di fermo",
      command: "Fermati e raccogli il gruppo.",
      summary: "Il gruppo si concentra.",
      detail: "Il corpo e pronto. Gli occhi guardano. Il tempo non parte ancora, ma tutti sentono che sta per arrivare.",
      tags: ["ascolto", "silenzio", "attenzione"]
    },
    {
      id: "prep",
      title: "Gesto di preparazione",
      command: "Prepara il primo battito.",
      summary: "Il corpo prepara il tempo.",
      detail: "Il levare rende visibile il respiro del gruppo e prepara il primo battere.",
      tags: ["levare", "respiro", "avvio"]
    },
    {
      id: "attack",
      title: "Attacco",
      command: "Fai partire il suono insieme.",
      summary: "Il suono comincia insieme.",
      detail: "Il battere coincide con l'inizio comune. Se il gesto e chiaro, il gruppo entra compatto.",
      tags: ["battere", "entrata", "insieme"]
    },
    {
      id: "stop",
      title: "Stop",
      command: "Chiudi il gesto con chiarezza.",
      summary: "Il gruppo chiude insieme.",
      detail: "Il gesto finale ferma il suono e aiuta il gruppo a non sfilacciarsi nell'ultima pulsazione.",
      tags: ["chiusura", "ultimo gesto", "tempo comune"]
    }
  ],
  performanceRules: [
    "La pulsazione deve restare stabile.",
    "Il ritmo puo cambiare.",
    "Gli accenti devono essere riconoscibili.",
    "Il direttore comunica solo con i gesti.",
    "Il gruppo ascolta e risponde."
  ],
  performanceRoles: [
    "Direttore",
    "Gruppo pulsazione",
    "Gruppo ritmo",
    "Gruppo accenti",
    "Osservatori"
  ],
  performanceCriteria: [
    "Manteniamo una pulsazione comune.",
    "Distinguiamo pulsazione e ritmo.",
    "Facciamo sentire gli accenti.",
    "Rispettiamo il gesto del direttore.",
    "Ripetiamo la sequenza senza perderci."
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
          feedback: "Esatto. La pulsazione e il battito comune che aiuta il gruppo a restare insieme."
        },
        {
          id: "q1-b",
          label: "Una pausa molto lunga.",
          correct: false,
          feedback: "Non proprio. La pulsazione non e una pausa: e il battito regolare che continua."
        },
        {
          id: "q1-c",
          label: "Un gesto casuale.",
          correct: false,
          feedback: "No. Un gesto casuale non basta: la pulsazione deve essere regolare e condivisa."
        }
      ]
    },
    {
      id: "q2",
      prompt: "Che cos'e il ritmo?",
      options: [
        {
          id: "q2-a",
          label: "L'organizzazione di suoni e silenzi nel tempo.",
          correct: true,
          feedback: "Esatto. Il ritmo organizza suoni e silenzi sopra la pulsazione."
        },
        {
          id: "q2-b",
          label: "Il nome di una singola nota.",
          correct: false,
          feedback: "No. Il ritmo non e una sola nota: riguarda come i suoni si dispongono nel tempo."
        },
        {
          id: "q2-c",
          label: "Il momento in cui tutti si fermano.",
          correct: false,
          feedback: "Non solo. Fermarsi puo far parte del ritmo, ma non lo definisce da solo."
        }
      ]
    },
    {
      id: "q3",
      prompt: "Che cos'e l'accento?",
      options: [
        {
          id: "q3-a",
          label: "Un suono o una pulsazione con maggior rilievo.",
          correct: true,
          feedback: "Esatto. L'accento fa sentire un punto piu forte dentro il flusso."
        },
        {
          id: "q3-b",
          label: "Una pulsazione sempre piu veloce.",
          correct: false,
          feedback: "Non proprio. Velocita e accento non sono la stessa cosa."
        },
        {
          id: "q3-c",
          label: "Un silenzio obbligatorio.",
          correct: false,
          feedback: "No. Il silenzio puo essere importante, ma l'accento e un punto piu marcato del suono o del gesto."
        }
      ]
    },
    {
      id: "q4",
      prompt: "Che cos'e una battuta?",
      options: [
        {
          id: "q4-a",
          label: "Un contenitore ordinato di pulsazioni.",
          correct: true,
          feedback: "Esatto. La battuta raccoglie le pulsazioni in gruppi leggibili."
        },
        {
          id: "q4-b",
          label: "Un urlo del direttore.",
          correct: false,
          feedback: "No. Il direttore usa il gesto, non un urlo. La battuta organizza il tempo."
        },
        {
          id: "q4-c",
          label: "Una serie di suoni senza ordine.",
          correct: false,
          feedback: "Non e corretto. La battuta serve proprio a dare ordine al tempo."
        }
      ]
    },
    {
      id: "q5",
      prompt: "Che differenza c'e tra battere e levare?",
      options: [
        {
          id: "q5-a",
          label: "Il battere e il punto forte, il levare prepara il battere.",
          correct: true,
          feedback: "Esatto. Il levare prepara il gesto, il battere rende visibile il punto forte."
        },
        {
          id: "q5-b",
          label: "Sono due parole che vogliono dire la stessa cosa.",
          correct: false,
          feedback: "Non proprio. Hanno ruoli diversi nel gesto del tempo."
        },
        {
          id: "q5-c",
          label: "Il levare chiude sempre la musica.",
          correct: false,
          feedback: "No. Lo stop chiude. Il levare prepara l'attacco o il gesto seguente."
        }
      ]
    },
    {
      id: "q6",
      prompt: "Nel lavoro di gruppo, a che cosa serve il direttore?",
      options: [
        {
          id: "q6-a",
          label: "A far partire, mantenere e fermare il tempo comune.",
          correct: true,
          feedback: "Esatto. Il direttore rende visibile il tempo condiviso del gruppo."
        },
        {
          id: "q6-b",
          label: "A parlare piu forte degli altri.",
          correct: false,
          feedback: "No. Il direttore guida soprattutto con il gesto e con l'ascolto reciproco."
        },
        {
          id: "q6-c",
          label: "A decidere chi non deve ascoltare.",
          correct: false,
          feedback: "Non e corretto. Il suo compito e aiutare tutti a coordinarsi meglio."
        }
      ]
    }
  ],
  selfChecks: [
    "Riesco a mantenere una pulsazione stabile?",
    "Riesco a distinguere pulsazione e ritmo?",
    "Riesco a seguire o guidare il gruppo con un gesto?"
  ],
  selfOptions: ["ancora no", "abbastanza", "si"]
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
    if (!("matchMedia" in window)) return void 0;
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
    if (!node) return void 0;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      setVisible(true);
      return void 0;
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
  return /* @__PURE__ */ React.createElement(
    "section",
    {
      id,
      ref,
      className: cn(
        "scroll-mt-32 transition-all duration-700 ease-out",
        backgroundClass,
        border && "border-t border-slate-200/60",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className
      )
    },
    typeof children === "function" ? children({ visible }) : children
  );
}
function SectionKicker({ children }) {
  return /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, children);
}
function SectionHeading({ kicker, title, text, align = "left" }) {
  return /* @__PURE__ */ React.createElement("div", { className: cn("max-w-[46rem]", align === "center" && "mx-auto text-center") }, kicker ? /* @__PURE__ */ React.createElement(SectionKicker, null, kicker) : null, /* @__PURE__ */ React.createElement("h2", { className: "mt-4 text-[2.7rem] font-semibold tracking-[-0.05em] text-slate-950 sm:text-[3.35rem] lg:text-[3.95rem] lg:leading-[0.95]" }, title), text ? /* @__PURE__ */ React.createElement("p", { className: cn("mt-5 max-w-[43rem]", BODY_COPY) }, text) : null);
}
function SurfacePanel({ children, className, tone = "base" }) {
  const toneClass = tone === "soft" ? PANEL_SOFT : tone === "subtle" ? PANEL_SUBTLE : PANEL_BASE;
  return /* @__PURE__ */ React.createElement("div", { className: cn(toneClass, className) }, children);
}
function ToneTag({ children, className }) {
  return /* @__PURE__ */ React.createElement("span", { className: cn(TAG_CLASS, className) }, children);
}
function PrimaryButton({ children, onClick }) {
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick,
      className: cn(
        RING,
        BUTTON_BASE,
        "border-[#d8dde4] bg-white text-[#8a4d18] hover:border-[#c8cfd8] hover:text-[#6f3f17]"
      )
    },
    children
  );
}
function SecondaryButton({ children, onClick }) {
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick,
      className: cn(
        RING,
        BUTTON_BASE,
        "border-[#e4e8ee] bg-white text-[#5e646c] hover:border-[#d7dde5] hover:text-[#18191b]"
      )
    },
    children
  );
}
function ConceptVisual({ type }) {
  if (type === "group-2" || type === "group-3" || type === "group-4") {
    const size = type === "group-2" ? 2 : type === "group-3" ? 3 : 4;
    return /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center gap-2" }, Array.from({ length: size }).map((_, index) => /* @__PURE__ */ React.createElement(
      "span",
      {
        key: `${type}-${index}`,
        className: cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-600",
          index === 0 && "border-[#e6c8a8] bg-[#fff6ed] text-[#8a4d18]"
        )
      },
      index + 1
    )));
  }
  const active = type === "accent";
  const pause = type === "pause";
  return /* @__PURE__ */ React.createElement(
    "span",
    {
      className: cn(
        "inline-flex items-center justify-center rounded-full border",
        active ? "h-14 w-14 border-[#e6c8a8] bg-[#fff6ed] text-2xl text-[#8a4d18]" : "h-10 w-10 border-slate-200 bg-white text-base text-slate-500",
        pause && "border-slate-200 bg-[#fcfbf8] text-slate-400"
      )
    },
    pause ? "\u25CB" : "\u25CF"
  );
}
function MeterPreview({ groupSize, compact = false }) {
  if (compact) {
    return /* @__PURE__ */ React.createElement("div", { className: "mt-4 rounded-[1.45rem] border border-slate-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#fcfbf8_100%)] px-4 py-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Traccia visiva"), /* @__PURE__ */ React.createElement("span", { className: "inline-flex items-center rounded-full border border-[#eadfce] bg-[#fff7ef] px-3 py-1 text-xs font-medium text-[#8a4d18]" }, "gruppo da ", groupSize)), /* @__PURE__ */ React.createElement("div", { className: "relative mt-4" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "pointer-events-none absolute inset-x-4 top-[0.8rem] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent",
        "aria-hidden": "true"
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "relative grid grid-cols-4 gap-3" }, Array.from({ length: 8 }).map((_, index) => {
      const accented = index % groupSize === 0;
      const cycleNumber = index % groupSize + 1;
      return /* @__PURE__ */ React.createElement("div", { key: `${groupSize}-${index}`, className: "flex flex-col items-center gap-2" }, /* @__PURE__ */ React.createElement(
        "span",
        {
          className: cn(
            "inline-flex items-center justify-center rounded-full border bg-white text-sm font-medium",
            accented ? "h-11 w-11 border-[#e6c8a8] bg-[#fff6ed] text-[#8a4d18]" : "h-8 w-8 border-slate-200 text-slate-500"
          )
        },
        accented ? "\u25CF" : "\u2022"
      ), /* @__PURE__ */ React.createElement("span", { className: cn("text-[0.78rem] font-medium", accented ? "text-[#8a4d18]" : "text-slate-400") }, cycleNumber));
    }))));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "mt-6 rounded-[1.7rem] border border-slate-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#fcfbf8_100%)] px-5 py-6 sm:px-6 sm:py-7" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Traccia visiva"), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-sm leading-6 text-slate-500" }, "Guarda dove torna il battito forte e come si ricompone il gruppo.")), /* @__PURE__ */ React.createElement("span", { className: "inline-flex items-center rounded-full border border-[#eadfce] bg-[#fff7ef] px-3.5 py-1.5 text-sm font-medium text-[#8a4d18]" }, "gruppo da ", groupSize)), /* @__PURE__ */ React.createElement("div", { className: "relative mt-7" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "pointer-events-none absolute inset-x-5 top-[1.05rem] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent",
      "aria-hidden": "true"
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "relative grid grid-cols-4 gap-4 sm:grid-cols-8" }, Array.from({ length: 8 }).map((_, index) => {
    const accented = index % groupSize === 0;
    const cycleNumber = index % groupSize + 1;
    return /* @__PURE__ */ React.createElement("div", { key: `${groupSize}-${index}`, className: "flex flex-col items-center gap-3" }, /* @__PURE__ */ React.createElement(
      "span",
      {
        className: cn(
          "inline-flex items-center justify-center rounded-full border bg-white text-sm font-medium",
          accented ? "h-14 w-14 border-[#e6c8a8] bg-[#fff6ed] text-[#8a4d18]" : "h-10 w-10 border-slate-200 text-slate-500"
        )
      },
      accented ? "\u25CF" : "\u2022"
    ), /* @__PURE__ */ React.createElement("span", { className: cn("text-[0.86rem] font-medium", accented ? "text-[#8a4d18]" : "text-slate-400") }, cycleNumber));
  }))));
}
function meterGroupLabel(groupSize) {
  if (groupSize === 2) return "a due";
  if (groupSize === 3) return "a tre";
  return "a quattro";
}
function SequencerSymbol({ stateId, className = "" }) {
  if (stateId === "accent") {
    return /* @__PURE__ */ React.createElement("span", { className: cn("block text-4xl font-semibold text-slate-950", className) }, "\u25CF");
  }
  if (stateId === "pause") {
    return /* @__PURE__ */ React.createElement("span", { className: cn("block text-4xl font-semibold text-slate-300", className) }, "\u25CB");
  }
  return /* @__PURE__ */ React.createElement("span", { className: cn("block text-4xl font-semibold text-slate-950", className) }, "\u25CF");
}
function LessonHero() {
  const section = getSection("hero");
  return /* @__PURE__ */ React.createElement("section", { id: section.id, className: "scroll-mt-28 bg-[#fbfaf7]", style: { fontFamily: APP_FONT } }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto flex min-h-[calc(88vh-4.75rem)] max-w-[84rem] items-center px-4 pb-16 pt-14 sm:px-6 md:pb-20 lg:px-8 lg:pt-20" }, /* @__PURE__ */ React.createElement("div", { className: "w-full" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-[48rem]" }, /* @__PURE__ */ React.createElement(SectionKicker, null, section.eyebrow), /* @__PURE__ */ React.createElement("h1", { className: "mt-6 max-w-[9ch] text-[3.9rem] font-semibold tracking-[-0.065em] text-slate-950 sm:text-[5rem] lg:text-[6rem] lg:leading-[0.9]" }, section.title), /* @__PURE__ */ React.createElement("p", { className: "mt-7 max-w-[30rem] text-[1.18rem] leading-[1.65] text-slate-600 sm:text-[1.4rem]" }, section.subtitle), /* @__PURE__ */ React.createElement("p", { className: "mt-6 max-w-[43rem] text-[0.98rem] leading-7 text-slate-500 sm:text-base" }, section.microtext)))));
}
function SparkSection() {
  const section = getSection("spark");
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return void 0;
    if (secondsLeft === 0) {
      setRunning(false);
      return void 0;
    }
    const timer = window.setTimeout(() => {
      setSecondsLeft((current) => current - 1);
    }, 1e3);
    return () => window.clearTimeout(timer);
  }, [running, secondsLeft]);
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (30 - secondsLeft) / 30 * circumference;
  return /* @__PURE__ */ React.createElement(SectionShell, { id: section.id, backgroundClass: "bg-[#f8f6f2]", className: SECTION_SPACE }, /* @__PURE__ */ React.createElement("div", { className: LESSON_SHELL, style: { fontFamily: APP_FONT } }, /* @__PURE__ */ React.createElement(SectionHeading, { kicker: "Domanda iniziale", title: section.title, text: section.text, align: "center" }), /* @__PURE__ */ React.createElement(SurfacePanel, { tone: "soft", className: "mt-14 px-6 py-8 sm:px-10 sm:py-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center" }, /* @__PURE__ */ React.createElement("div", { className: "relative flex h-56 w-56 items-center justify-center" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 140 140", className: "h-full w-full -rotate-90", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("circle", { cx: "70", cy: "70", r: "54", fill: "none", stroke: "rgba(148,163,184,0.18)", strokeWidth: "6" }), /* @__PURE__ */ React.createElement(
    "circle",
    {
      cx: "70",
      cy: "70",
      r: "54",
      fill: "none",
      stroke: ACCENT,
      strokeWidth: "6",
      strokeLinecap: "round",
      strokeDasharray: circumference,
      strokeDashoffset: dashOffset
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-center" }, /* @__PURE__ */ React.createElement("span", { className: SMALL_LABEL }, "timer"), /* @__PURE__ */ React.createElement("span", { className: "mt-2 text-6xl font-semibold tracking-[-0.06em] text-slate-950" }, secondsLeft))), /* @__PURE__ */ React.createElement("div", { className: "mt-8 flex flex-wrap justify-center gap-3" }, /* @__PURE__ */ React.createElement(
    PrimaryButton,
    {
      onClick: () => {
        setSecondsLeft(30);
        setRunning(true);
      }
    },
    "Avvia 30 secondi"
  ), /* @__PURE__ */ React.createElement(
    SecondaryButton,
    {
      onClick: () => {
        setRunning(false);
        setSecondsLeft(30);
      }
    },
    "Reimposta"
  )))), /* @__PURE__ */ React.createElement("div", { className: "mt-10 grid gap-4 md:grid-cols-4" }, section.questions.map((question) => /* @__PURE__ */ React.createElement(SurfacePanel, { key: question, tone: "subtle", className: "flex min-h-[6rem] items-center justify-center p-5 text-center" }, /* @__PURE__ */ React.createElement("p", { className: cn("mx-auto max-w-[18rem]", BODY_COPY_SOFT) }, question)))), /* @__PURE__ */ React.createElement("div", { className: "mt-10 flex flex-wrap justify-center gap-3" }, section.keywords.map((keyword) => /* @__PURE__ */ React.createElement(ToneTag, { key: keyword }, keyword)))));
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
    gain.gain.setValueAtTime(1e-4, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(accented ? 0.04 : 0.025, context.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(1e-4, context.currentTime + 0.08);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.09);
  };
  useEffect(() => {
    if (!running) return void 0;
    playTick(beatIndex === 0);
    const beatDuration = 6e4 / activeMode.bpm;
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
  return /* @__PURE__ */ React.createElement(SectionShell, { id: section.id, backgroundClass: "bg-white", className: SECTION_SPACE }, /* @__PURE__ */ React.createElement("div", { className: LESSON_SHELL, style: { fontFamily: APP_FONT } }, /* @__PURE__ */ React.createElement("div", { className: "grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(24rem,1.08fr)] lg:items-start" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SectionHeading, { kicker: "Pulsazione", title: section.title, text: section.text }), /* @__PURE__ */ React.createElement(SurfacePanel, { tone: "subtle", className: "mt-8 p-6 sm:p-7" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-3.5 text-[1rem] leading-8 text-slate-600" }, /* @__PURE__ */ React.createElement("p", null, "Seleziona una velocita."), /* @__PURE__ */ React.createElement("p", null, "Guarda i quattro battiti che tornano regolari."), /* @__PURE__ */ React.createElement("p", null, "Se vuoi, attiva un suono leggero di riferimento."))), /* @__PURE__ */ React.createElement("div", { className: "mt-8 flex flex-wrap gap-3" }, lessonData.pulseModes.map((mode) => {
    const isSelected = mode.id === activeModeId;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: mode.id,
        type: "button",
        "aria-label": `${mode.label}, ${mode.bpm} battiti al minuto`,
        onClick: () => setActiveModeId(mode.id),
        className: cn(RING, isSelected ? PILL_ACTIVE : PILL_DEFAULT)
      },
      mode.label,
      " \xB7 ",
      mode.bpm,
      " bpm"
    );
  })), /* @__PURE__ */ React.createElement("div", { className: "mt-4 flex flex-wrap gap-3" }, /* @__PURE__ */ React.createElement(SecondaryButton, { onClick: () => setRunning((current) => !current) }, running ? "Ferma il battito" : "Riavvia il battito"), /* @__PURE__ */ React.createElement(SecondaryButton, { onClick: () => setAudioEnabled((current) => !current) }, audioEnabled ? "Audio leggero attivo" : "Audio leggero spento"))), /* @__PURE__ */ React.createElement(SurfacePanel, { tone: "soft", className: "w-full max-w-[44rem] justify-self-center p-6 sm:p-8 xl:justify-self-end" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Battito comune"), /* @__PURE__ */ React.createElement("div", { className: "mt-8 flex flex-wrap justify-center gap-4" }, Array.from({ length: 4 }).map((_, index) => {
    const isActive = index === beatIndex && running;
    return /* @__PURE__ */ React.createElement(
      "span",
      {
        key: `pulse-${index}`,
        className: cn(
          "inline-flex h-14 w-14 items-center justify-center rounded-full border text-sm font-medium",
          isActive ? "border-[#e6c8a8] bg-[#fff6ed] text-[#8a4d18]" : "border-slate-200 bg-white text-slate-500"
        ),
        style: reducedMotion ? void 0 : { transition: "background-color 140ms ease, border-color 140ms ease, color 140ms ease" }
      },
      index + 1
    );
  })), /* @__PURE__ */ React.createElement("div", { className: "mt-10 rounded-[1.5rem] border border-slate-200/70 bg-[#fcfbf8] px-6 py-5 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-lg font-semibold text-slate-950" }, activeMode.label, " \xB7 ", activeMode.bpm, " bpm"), /* @__PURE__ */ React.createElement("p", { className: cn("mt-3 mx-auto max-w-[28rem]", BODY_COPY_SOFT) }, section.support))))));
}
function ConceptsSection() {
  const section = getSection("concepts");
  return /* @__PURE__ */ React.createElement(SectionShell, { id: section.id, backgroundClass: "bg-[#fbfbf9]", className: SECTION_SPACE }, /* @__PURE__ */ React.createElement("div", { className: LESSON_SHELL, style: { fontFamily: APP_FONT } }, /* @__PURE__ */ React.createElement(SectionHeading, { kicker: "Quattro concetti", title: section.title, text: section.text, align: "center" }), /* @__PURE__ */ React.createElement("div", { className: "mt-14 grid gap-5 xl:grid-cols-2" }, lessonData.conceptCards.map((card, index) => /* @__PURE__ */ React.createElement(SurfacePanel, { key: card.id, tone: "subtle", className: "p-6 sm:p-7 lg:p-8" }, /* @__PURE__ */ React.createElement("div", { className: "grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(16rem,0.98fr)] lg:items-center" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-[28rem]" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "0", index + 1), /* @__PURE__ */ React.createElement("h3", { className: "mt-4 text-[2.1rem] font-semibold tracking-[-0.05em] text-slate-950" }, card.title), /* @__PURE__ */ React.createElement("p", { className: cn("mt-4", BODY_COPY_SOFT) }, card.definition)), /* @__PURE__ */ React.createElement("div", { className: "rounded-[1.5rem] border border-slate-200/70 bg-white px-5 py-5 sm:px-6 sm:py-6" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Segno visivo"), /* @__PURE__ */ React.createElement("div", { className: "mt-5 flex flex-wrap items-center justify-center gap-3" }, card.visual.map((item, itemIndex) => /* @__PURE__ */ React.createElement(ConceptVisual, { key: `${card.id}-${itemIndex}`, type: item }))), /* @__PURE__ */ React.createElement("div", { className: "mt-6 border-t border-slate-200/70 pt-5" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Negli esercizi"), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[0.95rem] leading-7 text-slate-500 sm:text-base" }, card.exercise))))))), /* @__PURE__ */ React.createElement(SurfacePanel, { tone: "soft", className: "mt-10 px-6 py-7 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "mx-auto max-w-3xl text-[2rem] font-semibold tracking-[-0.04em] text-slate-950 sm:text-[2.4rem]" }, section.closing))));
}
function RhythmMapSection() {
  const section = getSection("map");
  return /* @__PURE__ */ React.createElement(SectionShell, { id: section.id, backgroundClass: "bg-[#f8f6f2]", className: SECTION_SPACE }, /* @__PURE__ */ React.createElement("div", { className: LESSON_SHELL_WIDE, style: { fontFamily: APP_FONT } }, /* @__PURE__ */ React.createElement(SectionHeading, { kicker: "Definizioni guida", title: section.title, text: section.text }), /* @__PURE__ */ React.createElement(SurfacePanel, { tone: "soft", className: "mt-14 overflow-hidden px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-start justify-between gap-5" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-[38rem]" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Da leggere, dire e ricopiare"), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[1.02rem] leading-7 text-slate-600 sm:text-[1.08rem]" }, "Tre frasi brevi fissano il lessico del lavoro comune. Le teniamo davanti agli occhi mentre battiamo, ascoltiamo e costruiamo il ritmo del gruppo.")), /* @__PURE__ */ React.createElement(ToneTag, { className: "border-[#ecdcc9] bg-white/80 text-[#8a4d18]" }, "quaderno \xB7 voce \xB7 gesto")), /* @__PURE__ */ React.createElement("div", { className: "mt-8 h-px bg-gradient-to-r from-transparent via-[#d9c1a7] to-transparent", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("div", { className: "mt-8 grid gap-4 xl:grid-cols-3" }, lessonData.quoteDefinitions.map((definition, index) => /* @__PURE__ */ React.createElement(
    SurfacePanel,
    {
      key: definition.id,
      tone: "base",
      className: "relative overflow-hidden border-[#eadfce] bg-white/90 p-6 sm:p-7"
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "pointer-events-none absolute inset-x-0 top-0 h-full opacity-70",
        "aria-hidden": "true",
        style: {
          backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0) 0, rgba(255,255,255,0) 47px, rgba(198,106,24,0.08) 48px)",
          backgroundSize: "100% 48px"
        }
      }
    ),
    /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "0", index + 1), /* @__PURE__ */ React.createElement("span", { className: "h-1 w-12 rounded-full bg-[#c66a18]/60", "aria-hidden": "true" })), /* @__PURE__ */ React.createElement("h3", { className: "mt-5 text-[2rem] font-semibold tracking-[-0.05em] text-slate-950" }, definition.term), /* @__PURE__ */ React.createElement("p", { className: "mt-6 text-[1.3rem] leading-[1.65] tracking-[-0.03em] text-slate-700 italic sm:text-[1.42rem]" }, definition.quote), /* @__PURE__ */ React.createElement("p", { className: cn("mt-8 max-w-[24rem]", BODY_COPY_SOFT) }, definition.support))
  ))), /* @__PURE__ */ React.createElement("p", { className: "mt-8 text-sm font-medium uppercase tracking-[0.22em] text-slate-400" }, "Scrivile uguali sul quaderno e usale mentre provi con il gruppo."))));
}
function ListeningCardsSection() {
  const section = getSection("listening");
  const [selectedMeters, setSelectedMeters] = useState({});
  return /* @__PURE__ */ React.createElement(SectionShell, { id: section.id, backgroundClass: "bg-white", className: "py-16 sm:py-20 lg:py-24" }, /* @__PURE__ */ React.createElement("div", { className: LESSON_SHELL_WIDE, style: { fontFamily: APP_FONT } }, /* @__PURE__ */ React.createElement(SectionHeading, { kicker: "Ascolto guidato", title: section.title, text: section.text }), /* @__PURE__ */ React.createElement(SurfacePanel, { tone: "soft", className: "mt-8 px-4 py-4 sm:px-5 sm:py-5" }, /* @__PURE__ */ React.createElement("div", { className: "grid gap-4 lg:grid-cols-3" }, [
    {
      step: "01",
      title: "Scegli il gruppo",
      text: "Prova 2, 3 o 4 pulsazioni e guarda come cambia l'accento."
    },
    {
      step: "02",
      title: "Segui il battito forte",
      text: "La traccia visiva ti aiuta a capire dove il gruppo riparte."
    },
    {
      step: "03",
      title: "Rispondi e confronta",
      text: "Usa le domande per distinguere pulsazione, ritmo e accento."
    }
  ].map((item) => /* @__PURE__ */ React.createElement("div", { key: item.step, className: "rounded-[1.25rem] border border-white/80 bg-white/80 px-4 py-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-500" }, item.step), /* @__PURE__ */ React.createElement("h3", { className: "text-[1.02rem] font-semibold tracking-[-0.03em] text-slate-950" }, item.title)), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-sm leading-6 text-slate-500" }, item.text))))), /* @__PURE__ */ React.createElement("div", { className: "mt-6 grid gap-5 xl:grid-cols-3" }, lessonData.listeningCards.map((card) => {
    const selectedMeter = selectedMeters[card.id] || card.expected;
    return /* @__PURE__ */ React.createElement(
      SurfacePanel,
      {
        key: card.id,
        tone: "soft",
        className: "overflow-hidden border-slate-200/60 bg-[linear-gradient(180deg,#fffefb_0%,#fcfaf6_100%)] p-5 sm:p-6"
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-3" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Ascolto ", card.code), /* @__PURE__ */ React.createElement(ToneTag, { className: "border-[#eadfce] bg-white/90 text-[#8a4d18]" }, card.focus)),
      /* @__PURE__ */ React.createElement("h3", { className: "mt-3 text-[1.55rem] font-semibold tracking-[-0.05em] text-slate-950" }, card.title),
      /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[0.95rem] leading-6 text-slate-500" }, card.description),
      /* @__PURE__ */ React.createElement("div", { className: "mt-4 rounded-[1.45rem] border border-slate-200/70 bg-white/90 px-4 py-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-start justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-[24rem]" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Prova"), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-sm leading-6 text-slate-500" }, card.exercise)), /* @__PURE__ */ React.createElement("span", { className: "inline-flex items-center rounded-full border border-[#eadfce] bg-[#fff7ef] px-3 py-1 text-xs font-medium text-[#8a4d18]" }, "atteso \xB7 ", card.expected)), /* @__PURE__ */ React.createElement(MeterPreview, { groupSize: selectedMeter, compact: true })),
      /* @__PURE__ */ React.createElement("div", { className: "mt-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2.5" }, [2, 3, 4].map((meter) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: `${card.id}-${meter}`,
          type: "button",
          "aria-label": `${meter} pulsazioni`,
          onClick: () => setSelectedMeters((current) => ({ ...current, [card.id]: meter })),
          className: cn(RING, selectedMeter === meter ? PILL_ACTIVE : PILL_DEFAULT)
        },
        meter,
        " pulsazioni"
      )))),
      /* @__PURE__ */ React.createElement("div", { className: "mt-4 rounded-[1.4rem] border border-slate-200/70 bg-[#fcfbf8]/95 px-4 py-4" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Domande guida"), /* @__PURE__ */ React.createElement("div", { className: "mt-3 space-y-2.5" }, lessonData.listeningQuestions.map((question) => /* @__PURE__ */ React.createElement("p", { key: `${card.id}-${question}`, className: "text-sm leading-6 text-slate-600" }, question))), /* @__PURE__ */ React.createElement("div", { className: "mt-4 border-t border-slate-200/70 pt-4" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm leading-6 text-slate-600" }, "Se l'accento torna ogni ", selectedMeter, " battiti, stai sentendo un gruppo ", meterGroupLabel(selectedMeter), "."), /* @__PURE__ */ React.createElement("div", { className: "mt-3 flex flex-wrap gap-2" }, Array.from({ length: selectedMeter }).map((_, index) => /* @__PURE__ */ React.createElement(
        "span",
        {
          key: `${card.id}-count-${index}`,
          className: cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium",
            index === 0 ? "border-[#e6c8a8] bg-[#fff6ed] text-[#8a4d18]" : "border-slate-200 bg-white text-slate-500"
          )
        },
        index + 1
      )))))
    );
  }))));
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
  const bars = [steps.slice(0, 4), steps.slice(4, 8)];
  const renderStepButton = (step, index) => {
    const option = optionById[step];
    const isAccent = step === "accent";
    const isPause = step === "pause";
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: `${step}-${index}`,
        type: "button",
        "aria-label": `Tempo ${index + 1}, ${option.longLabel}`,
        onClick: () => setSteps(
          (current) => current.map((value, stepIndex) => stepIndex === index ? selectedStateId : value)
        ),
        className: cn(
          RING,
          "group flex min-h-[9.5rem] flex-col rounded-[1.6rem] border border-solid px-4 py-4 text-left transition-colors duration-150",
          isAccent ? "border-[#e6c8a8] bg-[#fff8f1] hover:border-[#d7b692] hover:bg-[#fff3e5]" : isPause ? "border-slate-200/80 bg-[#fbfaf7] hover:border-slate-300 hover:bg-[#f6f4ef]" : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-[#f8f6f1]"
        )
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-3" }, /* @__PURE__ */ React.createElement("span", { className: SMALL_LABEL }, "tempo ", index + 1), /* @__PURE__ */ React.createElement(
        "span",
        {
          className: cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium",
            isAccent ? "border-[#e6c8a8] bg-white text-[#8a4d18]" : isPause ? "border-slate-200 bg-white text-slate-400" : "border-slate-200 bg-[#fcfbf8] text-slate-500"
          )
        },
        index + 1
      )),
      /* @__PURE__ */ React.createElement("div", { className: "mt-4 flex flex-1 flex-col items-center justify-center text-center" }, /* @__PURE__ */ React.createElement(SequencerSymbol, { stateId: step, className: isAccent ? "text-[2.85rem] text-[#8a4d18]" : "text-[2.5rem]" }), /* @__PURE__ */ React.createElement("span", { className: cn("mt-4 text-[0.98rem] font-medium", isAccent ? "text-[#8a4d18]" : "text-slate-500") }, option.longLabel))
    );
  };
  return /* @__PURE__ */ React.createElement(SectionShell, { id: section.id, backgroundClass: "bg-[#fbfbf9]", className: SECTION_SPACE }, /* @__PURE__ */ React.createElement("div", { className: LESSON_SHELL, style: { fontFamily: APP_FONT } }, /* @__PURE__ */ React.createElement("div", { className: "grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,1.1fr)] lg:items-start" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-[31rem]" }, /* @__PURE__ */ React.createElement(SectionHeading, { kicker: "Laboratorio ritmico", title: section.title, text: section.text }), /* @__PURE__ */ React.createElement(SurfacePanel, { tone: "subtle", className: "mt-8 overflow-hidden p-0" }, /* @__PURE__ */ React.createElement("div", { className: "border-b border-slate-200/70 px-6 py-6 sm:px-7" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Come lavori"), /* @__PURE__ */ React.createElement("div", { className: "mt-5 space-y-4" }, lessonData.sequenceWorkflow.map((item) => /* @__PURE__ */ React.createElement("div", { key: item.step, className: "flex items-start gap-4" }, /* @__PURE__ */ React.createElement("span", { className: "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-500" }, item.step), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[1rem] font-semibold tracking-[-0.02em] text-slate-950" }, item.title), /* @__PURE__ */ React.createElement("p", { className: "mt-1 text-[0.98rem] leading-7 text-slate-500" }, item.detail)))))), /* @__PURE__ */ React.createElement("div", { className: "px-6 py-6 sm:px-7" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Segno attivo"), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-[1rem] font-semibold tracking-[-0.02em] text-slate-950" }, activeOption.longLabel)), /* @__PURE__ */ React.createElement(ToneTag, { className: "border-[#eadfce] bg-white text-[#8a4d18]" }, "8 tempi \xB7 corpo \xB7 voce \xB7 banco")), /* @__PURE__ */ React.createElement("div", { className: "mt-5 grid gap-3 sm:grid-cols-3" }, lessonData.sequenceStates.map((option) => {
    const isSelected = option.id === selectedStateId;
    const isAccent = option.id === "accent";
    const isPause = option.id === "pause";
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: option.id,
        type: "button",
        "aria-label": `Seleziona ${option.longLabel}`,
        onClick: () => setSelectedStateId(option.id),
        className: cn(
          RING,
          "rounded-[1.45rem] border border-solid px-4 py-4 text-left transition-colors duration-150",
          isSelected ? "border-[#e6c8a8] bg-[#fff8f1]" : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-[#f8f6f1]"
        )
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
        "span",
        {
          className: cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border text-lg font-semibold",
            isSelected ? "border-[#e6c8a8] bg-white text-[#8a4d18]" : isPause ? "border-slate-200 bg-[#fcfbf8] text-slate-400" : "border-slate-200 bg-[#fcfbf8] text-slate-600"
          )
        },
        isPause ? "\u25CB" : "\u25CF"
      ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-[1rem] font-semibold tracking-[-0.02em] text-slate-950" }, option.label), /* @__PURE__ */ React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, isAccent ? "punto piu forte" : isPause ? "spazio di silenzio" : "battito presente")))
    );
  }))))), /* @__PURE__ */ React.createElement(SurfacePanel, { tone: "soft", className: "w-full max-w-[47rem] justify-self-center overflow-hidden p-0 xl:justify-self-end" }, /* @__PURE__ */ React.createElement("div", { className: "border-b border-slate-200/70 px-6 py-6 sm:px-8 sm:py-7" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Lavagna ritmica"), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[1.18rem] font-semibold tracking-[-0.03em] text-slate-950" }, "Scrivi il ritmo in due battute da quattro tempi."), /* @__PURE__ */ React.createElement("p", { className: "mt-2 max-w-[34rem] text-[0.98rem] leading-7 text-slate-500" }, "Tocca una casella per inserirvi il segno selezionato. Il gruppo deve poter leggere e ripetere la sequenza senza perdere la pulsazione.")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2.5" }, /* @__PURE__ */ React.createElement(ToneTag, { className: "border-slate-200/70 bg-white text-slate-600" }, "battuta 1"), /* @__PURE__ */ React.createElement(ToneTag, { className: "border-slate-200/70 bg-white text-slate-600" }, "battuta 2")))), /* @__PURE__ */ React.createElement("div", { className: "px-6 py-6 sm:px-8 sm:py-8" }, /* @__PURE__ */ React.createElement("div", { className: "grid gap-5" }, bars.map((barSteps, barIndex) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: `bar-${barIndex}`,
      className: "rounded-[1.8rem] border border-slate-200/70 bg-white px-4 py-5 shadow-[0_12px_28px_rgba(15,23,42,0.03)] sm:px-5"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "battuta ", barIndex + 1), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium text-slate-500" }, "tempi ", barIndex * 4 + 1, "-", barIndex * 4 + 4)),
    /* @__PURE__ */ React.createElement("div", { className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4" }, barSteps.map((step, stepIndex) => renderStepButton(step, barIndex * 4 + stepIndex)))
  ))), /* @__PURE__ */ React.createElement("div", { className: "mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-[1.55rem] border border-slate-200/70 bg-white px-5 py-5" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Prova un esempio"), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-sm leading-6 text-slate-500" }, "Usa i preset per confrontare un ritmo lineare, uno con pause e uno con accenti.")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-3" }, /* @__PURE__ */ React.createElement(SecondaryButton, { onClick: () => applyPreset("reset") }, "Reset"), /* @__PURE__ */ React.createElement(SecondaryButton, { onClick: () => applyPreset("simple") }, "Esempio semplice"), /* @__PURE__ */ React.createElement(SecondaryButton, { onClick: () => applyPreset("pauses") }, "Esempio con pause"), /* @__PURE__ */ React.createElement(SecondaryButton, { onClick: () => applyPreset("accents") }, "Esempio con accenti")))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-3 xl:max-w-[14rem] xl:justify-end" }, /* @__PURE__ */ React.createElement(ToneTag, { className: "border-slate-200/70 bg-white text-slate-600" }, "\u25CF = suono"), /* @__PURE__ */ React.createElement(ToneTag, { className: "border-slate-200/70 bg-white text-slate-600" }, "\u25CB = pausa"), /* @__PURE__ */ React.createElement(ToneTag, { className: "border-slate-200/70 bg-white text-slate-600" }, "\u25CF grande = accento"))))))));
}
function ConductorSection() {
  const section = getSection("conductor");
  const [activeStepId, setActiveStepId] = useState(lessonData.conductorSteps[0].id);
  const activeIndex = lessonData.conductorSteps.findIndex((step) => step.id === activeStepId);
  const activeStep = lessonData.conductorSteps.find((step) => step.id === activeStepId) || lessonData.conductorSteps[0];
  return /* @__PURE__ */ React.createElement(SectionShell, { id: section.id, backgroundClass: "bg-white", className: SECTION_SPACE }, /* @__PURE__ */ React.createElement("div", { className: LESSON_SHELL, style: { fontFamily: APP_FONT } }, /* @__PURE__ */ React.createElement(SectionHeading, { kicker: "Gesto del direttore", title: section.title, text: section.text }), /* @__PURE__ */ React.createElement("div", { className: "mt-14 grid gap-6 xl:grid-cols-[minmax(0,1.02fr)_minmax(22rem,0.98fr)] xl:items-start" }, /* @__PURE__ */ React.createElement(SurfacePanel, { tone: "soft", className: "overflow-hidden p-0" }, /* @__PURE__ */ React.createElement("div", { className: "border-b border-slate-200/70 px-6 py-6 sm:px-8 sm:py-7" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Sequenza del gesto"), /* @__PURE__ */ React.createElement("p", { className: "mt-3 max-w-[34rem] text-[1.05rem] leading-7 text-slate-600" }, "Il direttore guida il gruppo in quattro mosse: fermarsi, preparare, attaccare, chiudere.")), /* @__PURE__ */ React.createElement(ToneTag, { className: "border-[#eadfce] bg-white text-[#8a4d18]" }, "4 gesti \xB7 un solo tempo comune"))), /* @__PURE__ */ React.createElement("div", { className: "grid gap-4 p-6 sm:p-8 md:grid-cols-2" }, lessonData.conductorSteps.map((step, index) => {
    const isActive = step.id === activeStepId;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: step.id,
        type: "button",
        "aria-label": step.title,
        onClick: () => setActiveStepId(step.id),
        className: cn(
          RING,
          "rounded-[1.65rem] border px-5 py-5 text-left transition duration-300",
          isActive ? "border-[#c66a18] bg-[#fff6ed]" : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-[#f8f6f1]"
        )
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement(
        "span",
        {
          className: cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold",
            isActive ? "border-[#e6c8a8] bg-white text-[#8a4d18]" : "border-slate-200 bg-[#fcfbf8] text-slate-500"
          )
        },
        index + 1
      ), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium text-slate-400" }, step.command)),
      /* @__PURE__ */ React.createElement("p", { className: "mt-6 text-[2rem] font-semibold tracking-[-0.05em] text-slate-950" }, step.title),
      /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[1rem] leading-7 text-slate-500" }, step.summary)
    );
  }))), /* @__PURE__ */ React.createElement(SurfacePanel, { tone: "subtle", className: "overflow-hidden p-0" }, /* @__PURE__ */ React.createElement("div", { className: "border-b border-slate-200/70 px-6 py-6 sm:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SectionKicker, null, "Step attivo"), /* @__PURE__ */ React.createElement("h3", { className: "mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950" }, activeStep.title)), /* @__PURE__ */ React.createElement("span", { className: "inline-flex h-12 min-w-12 items-center justify-center rounded-full border border-[#eadfce] bg-white px-4 text-sm font-semibold text-[#8a4d18]" }, String(activeIndex + 1).padStart(2, "0"), " / 04")), /* @__PURE__ */ React.createElement("p", { className: "mt-4 text-[1.06rem] font-medium leading-7 text-[#8a4d18]" }, activeStep.command)), /* @__PURE__ */ React.createElement("div", { className: "px-6 py-6 sm:px-8 sm:py-7" }, /* @__PURE__ */ React.createElement("div", { className: "grid gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-[1.5rem] border border-slate-200/70 bg-white px-5 py-5" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Che cosa fa il direttore"), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[1rem] leading-7 text-slate-600" }, activeStep.detail)), /* @__PURE__ */ React.createElement("div", { className: "rounded-[1.5rem] border border-slate-200/70 bg-[#fcfbf8] px-5 py-5" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Che cosa fa il gruppo"), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[1rem] leading-7 text-slate-600" }, activeStep.summary))), /* @__PURE__ */ React.createElement("div", { className: "mt-6 flex flex-wrap gap-3" }, activeStep.tags.map((tag) => /* @__PURE__ */ React.createElement(ToneTag, { key: `${activeStep.id}-${tag}` }, tag)))), /* @__PURE__ */ React.createElement("div", { className: "border-t border-slate-200/70 bg-[#fcfbf8] px-6 py-5 sm:px-8" }, /* @__PURE__ */ React.createElement("p", { className: BODY_COPY_SOFT }, section.note))))));
}
function PerformanceSection() {
  const section = getSection("performance");
  return /* @__PURE__ */ React.createElement(SectionShell, { id: section.id, backgroundClass: "bg-[#f8f6f2]", className: SECTION_SPACE }, /* @__PURE__ */ React.createElement("div", { className: LESSON_SHELL, style: { fontFamily: APP_FONT } }, /* @__PURE__ */ React.createElement(SectionHeading, { kicker: "Compito operativo", title: section.title, text: section.text }), /* @__PURE__ */ React.createElement("div", { className: "mt-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(21rem,0.92fr)]" }, /* @__PURE__ */ React.createElement(SurfacePanel, { tone: "soft", className: "p-6 sm:p-8" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Consegna"), /* @__PURE__ */ React.createElement("p", { className: "mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950" }, "Ogni gruppo costruisce 30 secondi di tempo condiviso."), /* @__PURE__ */ React.createElement("div", { className: "mt-8 space-y-4" }, lessonData.performanceRules.map((rule) => /* @__PURE__ */ React.createElement("p", { key: rule, className: BODY_COPY_SOFT }, rule)))), /* @__PURE__ */ React.createElement("div", { className: "grid gap-6" }, /* @__PURE__ */ React.createElement(SurfacePanel, { tone: "subtle", className: "px-6 py-5" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Ruoli"), /* @__PURE__ */ React.createElement("div", { className: "mt-5 space-y-4" }, lessonData.performanceRoles.map((role) => /* @__PURE__ */ React.createElement("p", { key: role, className: BODY_COPY_SOFT }, role)))), /* @__PURE__ */ React.createElement(SurfacePanel, { tone: "subtle", className: "px-6 py-5" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Criteri di riuscita"), /* @__PURE__ */ React.createElement("div", { className: "mt-5 space-y-4" }, lessonData.performanceCriteria.map((criterion) => /* @__PURE__ */ React.createElement("p", { key: criterion, className: BODY_COPY_SOFT }, criterion))))))));
}
function FinalQuizSection() {
  const section = getSection("quiz");
  const [answers, setAnswers] = useState({});
  return /* @__PURE__ */ React.createElement(SectionShell, { id: section.id, backgroundClass: "bg-white", className: SECTION_SPACE }, /* @__PURE__ */ React.createElement("div", { className: LESSON_SHELL_COMPACT, style: { fontFamily: APP_FONT } }, /* @__PURE__ */ React.createElement(SurfacePanel, { className: "px-6 py-10 sm:px-10 sm:py-12" }, /* @__PURE__ */ React.createElement(SectionHeading, { kicker: "Verifica formativa", title: section.title, text: section.text, align: "center" }), /* @__PURE__ */ React.createElement("div", { className: "mt-14 divide-y divide-slate-200/80" }, lessonData.quizQuestions.map((question, questionIndex) => {
    const selectedOptionId = answers[question.id];
    const selectedOption = question.options.find((option) => option.id === selectedOptionId);
    return /* @__PURE__ */ React.createElement("div", { key: question.id, className: "py-8 first:pt-0" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-slate-400" }, "Domanda ", questionIndex + 1), /* @__PURE__ */ React.createElement("h3", { className: "mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950" }, question.prompt), /* @__PURE__ */ React.createElement("div", { className: "mt-6 space-y-3" }, question.options.map((option) => {
      const isSelected = option.id === selectedOptionId;
      const showCorrectReference = Boolean(selectedOptionId) && option.correct && !isSelected;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: option.id,
          type: "button",
          "aria-label": option.label,
          onClick: () => setAnswers((current) => ({ ...current, [question.id]: option.id })),
          className: cn(
            RING,
            "block w-full rounded-[1.4rem] border px-5 py-4 text-left text-base leading-7 transition duration-200",
            isSelected ? "border-[#c66a18] bg-[#fff1e2] text-slate-900" : showCorrectReference ? "border-slate-300 bg-white text-slate-900" : "border-slate-200 bg-[#f8f6f1] text-slate-700 hover:border-slate-300 hover:bg-[#efede7]"
          )
        },
        /* @__PURE__ */ React.createElement("span", { className: "flex items-start justify-between gap-4" }, /* @__PURE__ */ React.createElement("span", null, option.label), showCorrectReference ? /* @__PURE__ */ React.createElement(ToneTag, { className: "shrink-0 border-slate-200/80 bg-white text-slate-600" }, "corretta") : null)
      );
    })), selectedOption ? /* @__PURE__ */ React.createElement(
      "div",
      {
        "aria-live": "polite",
        className: cn(
          "mt-5 rounded-[1.4rem] border px-5 py-4 text-base leading-7",
          selectedOption.correct ? "border-[#e6c8a8] bg-[#fff6ed] text-slate-800" : "border-slate-200 bg-[#fcfbf8] text-slate-800"
        )
      },
      /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, selectedOption.correct ? "Risposta corretta" : "Da rivedere"),
      /* @__PURE__ */ React.createElement("p", { className: "mt-3" }, selectedOption.feedback)
    ) : null);
  })))));
}
function SelfEvaluationSection() {
  const section = getSection("self");
  const [selfAnswers, setSelfAnswers] = useState({});
  return /* @__PURE__ */ React.createElement(SectionShell, { id: section.id, backgroundClass: "bg-[#fbfbf9]", className: SECTION_SPACE }, /* @__PURE__ */ React.createElement("div", { className: LESSON_SHELL_COMPACT, style: { fontFamily: APP_FONT } }, /* @__PURE__ */ React.createElement(SurfacePanel, { tone: "soft", className: "px-6 py-10 sm:px-10 sm:py-12" }, /* @__PURE__ */ React.createElement(SectionHeading, { kicker: "Autovalutazione", title: section.title, text: section.text, align: "center" }), /* @__PURE__ */ React.createElement("div", { className: "mt-14 grid gap-6" }, lessonData.selfChecks.map((prompt) => /* @__PURE__ */ React.createElement("div", { key: prompt, className: "rounded-[1.5rem] border border-slate-200/70 bg-white px-5 py-6" }, /* @__PURE__ */ React.createElement("p", { className: "text-lg font-medium text-slate-900" }, prompt), /* @__PURE__ */ React.createElement("div", { className: "mt-5 flex flex-wrap gap-3" }, lessonData.selfOptions.map((option) => {
    const isSelected = selfAnswers[prompt] === option;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: `${prompt}-${option}`,
        type: "button",
        "aria-label": option,
        onClick: () => setSelfAnswers((current) => ({ ...current, [prompt]: option })),
        className: cn(RING, isSelected ? PILL_ACTIVE : PILL_DEFAULT)
      },
      option
    );
  }))))), /* @__PURE__ */ React.createElement("div", { className: "mt-14 border-t border-slate-200/80 pt-10 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "mt-6 text-[2.6rem] font-semibold tracking-[-0.05em] text-slate-950 sm:text-[3.35rem]" }, section.closing)))));
}
function RitmoPulsazioneTempoLesson() {
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: APP_FONT }, className: "accordia-lesson-page bg-[#fbfaf7] text-slate-950 antialiased" }, /* @__PURE__ */ React.createElement(LessonHero, null), /* @__PURE__ */ React.createElement(SparkSection, null), /* @__PURE__ */ React.createElement(PulseSection, null), /* @__PURE__ */ React.createElement(ConceptsSection, null), /* @__PURE__ */ React.createElement(RhythmMapSection, null), /* @__PURE__ */ React.createElement(ListeningCardsSection, null), /* @__PURE__ */ React.createElement(RhythmSequencerSection, null), /* @__PURE__ */ React.createElement(ConductorSection, null), /* @__PURE__ */ React.createElement(PerformanceSection, null), /* @__PURE__ */ React.createElement(FinalQuizSection, null), /* @__PURE__ */ React.createElement(SelfEvaluationSection, null));
}
var RitmoPulsazioneTempoLesson_default = RitmoPulsazioneTempoLesson;
export {
  RitmoPulsazioneTempoLesson_default as default
};
