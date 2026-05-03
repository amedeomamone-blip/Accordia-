// components/RitmoPulsazioneTempoLesson.jsx
import React, { useEffect, useMemo, useRef, useState } from "https://esm.sh/react@18";
var APP_FONT = "'SF Pro Display','SF Pro Text',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif";
var RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c66a18] focus-visible:ring-offset-2 focus-visible:ring-offset-white";
var BUTTON_BASE = "lesson-control-button inline-flex min-h-11 items-center justify-center rounded-full border border-solid px-5 py-2.5 text-sm font-semibold tracking-[-0.01em] transition-colors duration-150";
var PILL_BASE = "lesson-control-pill inline-flex min-h-10 items-center rounded-full border border-solid bg-white px-4 py-2 text-[0.84rem] font-semibold tracking-[-0.01em] transition-colors duration-150";
var PILL_DEFAULT = `${PILL_BASE} border-[#e4e8ee] text-[#5e646c] hover:border-[#d7dde5] hover:text-[#18191b]`;
var PILL_ACTIVE = `${PILL_BASE} border-[#dde2e8] text-[#18191b]`;
var TAG_CLASS = "inline-flex items-center rounded-full border border-[#f1dec9] bg-[#fff6ed] px-3.5 py-1.5 text-sm font-medium text-[#8a4d18]";
var SMALL_LABEL = "text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-400";
var lessonData = {
  title: "Ritmo, pulsazione e tempo",
  subtitle: "Misurare il gesto collettivo.",
  question: "Che differenza c'e tra ritmo, pulsazione e tempo?",
  intro: "Partiamo dal corpo e dal battito comune per capire come pulsazione, ritmo, tempo, accento e metro rendono leggibile il lavoro del gruppo.",
  keywords: ["pulsazione", "ritmo", "tempo", "accento", "gruppo"],
  visualStyle: {
    nucleusColor: "#c66a18",
    imageStyle: "wireframe-marker",
    mood: "clean, calm, premium, educational"
  },
  internalStructure: {
    initialQuestion: "Che differenza c'e tra ritmo, pulsazione e tempo?",
    historicalCulturalContext: "Il ritmo accompagna da sempre il movimento umano: camminare, danzare, lavorare, marciare, pregare e suonare insieme.",
    guidedObservation: "Gli studenti osservano sequenze regolari e irregolari, passi, battiti, pattern semplici e notazione grafica.",
    guidedListening: "Gli studenti ascoltano esempi e individuano la pulsazione costante, il ritmo sopra la pulsazione, gli accenti e la velocita del brano.",
    contentExplanation: "Il docente chiarisce la differenza tra pulsazione, ritmo, tempo, accento e metro con esempi essenziali.",
    practicalActivity: "La classe batte una pulsazione comune e costruisce ritmi diversi sopra quel battito.",
    studentProduction: "A coppie o in piccoli gruppi, gli studenti costruiscono una breve sequenza con pulsazione, ritmo e accenti.",
    assessmentAndClosing: "Gli studenti riconoscono la pulsazione, distinguono il ritmo dalla pulsazione e spiegano se il tempo e lento, moderato o veloce."
  },
  flow: [
    {
      id: "opening",
      label: "Apertura",
      contains: ["Domanda iniziale"],
      layout: "hero"
    },
    {
      id: "exploration",
      label: "Esplorazione",
      contains: ["Contesto storico e culturale", "Osservazione guidata", "Ascolto guidato"],
      layout: "narrative-media"
    },
    {
      id: "active-understanding",
      label: "Comprensione attiva",
      contains: ["Spiegazione dei contenuti", "Attivita pratica"],
      layout: "concept-practice"
    },
    {
      id: "reworking",
      label: "Rielaborazione",
      contains: ["Produzione degli studenti", "Verifica e conclusione"],
      layout: "production-closing"
    }
  ],
  sections: [
    {
      id: "hero",
      eyebrow: "ORIGINI DEL SUONO",
      title: "Ritmo, pulsazione e tempo",
      subtitle: "Misurare il gesto collettivo.",
      microtext: "Partiamo dal corpo per distinguere battito comune, ritmo, accento, tempo e metro con esempi visivi, ascolto e lavoro di gruppo.",
      cta: "Inizia dal battito comune",
      idea: "Il ritmo nasce dall'organizzazione del movimento e rende condivisibile il tempo del gruppo.",
      question: "Che differenza c'e tra ritmo, pulsazione e tempo?"
    },
    {
      id: "spark",
      title: "Che differenza c'e tra ritmo, pulsazione e tempo?",
      text: "Camminiamo, battiamo le mani o seguiamo un passo comune. Prima sentiamo il battito regolare. Poi osserviamo che sopra quel battito possono comparire ritmi diversi e velocita diverse.",
      questions: [
        "Che cosa resta uguale mentre il ritmo cambia?",
        "Che cosa ci aiuta a restare insieme?",
        "Quando il battito sembra piu lento o piu veloce?",
        "Dove senti il punto piu forte del gruppo?"
      ],
      keywords: ["pulsazione", "ritmo", "tempo", "accento"]
    },
    {
      id: "context",
      title: "Il ritmo accompagna da sempre il movimento umano.",
      text: "Camminare, danzare, lavorare, marciare, pregare, suonare insieme: molto prima della scrittura musicale, gli esseri umani hanno organizzato il tempo con gesti, battiti, ripetizioni e accenti."
    },
    {
      id: "pulse",
      title: "Costruiamo una pulsazione comune.",
      text: "Scegli una velocita e guarda quattro battiti che tornano regolari. La forma del gruppo resta uguale: cambia solo il tempo con cui scorre.",
      support: "La pulsazione resta regolare anche quando il tempo rallenta o accelera."
    },
    {
      id: "concepts",
      title: "Pulsazione, ritmo, tempo, accento, metro.",
      text: "Cinque parole chiave ci aiutano a descrivere cio che sentiamo e cio che facciamo insieme.",
      closing: "La pulsazione sostiene. Il ritmo si muove. Il tempo accelera o rallenta. Il metro organizza gli accenti."
    },
    {
      id: "map",
      title: "Definizioni chiave da ricopiare.",
      text: "Tre frasi brevi fissano il lessico del quaderno: pulsazione, ritmo e tempo."
    },
    {
      id: "listening",
      title: "Dove senti il battito comune?",
      text: "Confronta tre situazioni di ascolto. Cerca la pulsazione costante, il ritmo che si muove sopra e il punto in cui torna l'accento."
    },
    {
      id: "sequencer",
      title: "Attivita pratica: battito comune e ritmi diversi.",
      text: "La classe mantiene una pulsazione comune con mani o piedi. Sopra quel battito costruiamo ritmi diversi con corpo, voce, banco o oggetti sonori."
    },
    {
      id: "performance",
      title: "Compito: una sequenza del gruppo.",
      text: "Lavora in coppia o in piccolo gruppo. Costruisci una breve sequenza con pulsazione, ritmo e accenti. Puoi usare corpo, voce, banco, oggetti sonori o notazione grafica."
    },
    {
      id: "quiz",
      title: "Che cosa abbiamo capito?",
      text: "Nell'esempio finale distingui pulsazione, ritmo, accento, tempo e metro."
    }
  ],
  contextExamples: [
    {
      id: "cammino",
      title: "Camminare",
      detail: "Il corpo ripete passi regolari e crea un battito comune."
    },
    {
      id: "danza",
      title: "Danzare",
      detail: "Il gruppo organizza gesti, accenti e ripetizioni nello spazio."
    },
    {
      id: "lavoro",
      title: "Lavorare",
      detail: "Molti gesti collettivi chiedono ritmo per restare coordinati."
    },
    {
      id: "marcia",
      title: "Marciare",
      detail: "Un battito stabile aiuta il gruppo a procedere insieme."
    },
    {
      id: "rito",
      title: "Pregare o celebrare",
      detail: "Voce, gesto e ripetizione danno forma al tempo condiviso."
    }
  ],
  observationCards: [
    {
      id: "passi",
      title: "Passi e battiti",
      detail: "Conta se i colpi tornano sempre uguali oppure cambiano in modo irregolare."
    },
    {
      id: "onde",
      title: "Onde e oscillazioni",
      detail: "Guarda se il movimento e continuo, regolare o pieno di interruzioni."
    },
    {
      id: "segni",
      title: "Pattern e notazione grafica",
      detail: "Osserva dove il gruppo riparte e dove senti il punto piu forte."
    }
  ],
  pulseGuide: [
    {
      step: "01",
      title: "Scegli il tempo",
      detail: "Prova lento, medio o veloce."
    },
    {
      step: "02",
      title: "Segui i 4 battiti",
      detail: "Conta 1 2 3 4 senza cambiare forma."
    },
    {
      step: "03",
      title: "Confronta",
      detail: "Osserva che cambia solo la velocita."
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
      exercise: "Negli esercizi tieni quattro battiti uguali, senza cambiare forma."
    },
    {
      id: "rhythm",
      title: "Ritmo",
      definition: "E il modo in cui suoni e silenzi si organizzano sopra la pulsazione.",
      visual: ["sound", "pause", "sound", "accent"],
      exercise: "Negli esercizi cambi suoni e pause, ma la pulsazione sotto resta stabile."
    },
    {
      id: "tempo",
      title: "Tempo",
      definition: "E la velocita della pulsazione: lenta, moderata o veloce.",
      visual: ["tempo-slow", "tempo-medium", "tempo-fast"],
      exercise: "Negli esercizi ascolti se il battito scorre lento, moderato o veloce."
    },
    {
      id: "accent",
      title: "Accento",
      definition: "E un suono o una pulsazione con maggior rilievo.",
      visual: ["accent", "equal", "equal", "equal"],
      exercise: "Negli esercizi fai sentire un punto piu forte dentro il gruppo."
    },
    {
      id: "meter",
      title: "Metro",
      definition: "E l'organizzazione regolare degli accenti in gruppi da due, tre o quattro.",
      visual: ["group-2", "group-3", "group-4"],
      exercise: "Negli esercizi conti se gli accenti tornano a due, a tre o a quattro."
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
      quote: '"Il tempo dice se la pulsazione scorre lenta, moderata o veloce."',
      support: "Ci aiuta a percepire la velocita del battito comune."
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
  performanceRules: [
    "Tieni stabile la pulsazione.",
    "Lascia che il ritmo possa cambiare.",
    "Fai sentire gli accenti.",
    "Scegli un tempo chiaro e mantienilo.",
    "Ripeti la sequenza senza perderti."
  ],
  performanceRoles: [
    "Se tieni la pulsazione, resta regolare.",
    "Se costruisci il ritmo, varia senza perdere il centro.",
    "Se marchi gli accenti, rendili chiari.",
    "Se osservi, aiuta il gruppo a correggersi."
  ],
  performanceCriteria: [
    "Mantieni il battito comune.",
    "Distingui pulsazione e ritmo.",
    "Fai sentire gli accenti.",
    "Scegli un tempo chiaro.",
    "Ripeti la sequenza senza perderti."
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
      prompt: "Che cos'e il tempo?",
      options: [
        {
          id: "q3-a",
          label: "La velocita della pulsazione.",
          correct: true,
          feedback: "Esatto. Il tempo ci dice se la pulsazione scorre lenta, moderata o veloce."
        },
        {
          id: "q3-b",
          label: "L'organizzazione degli accenti in gruppi.",
          correct: false,
          feedback: "Non proprio. Questa definizione riguarda il metro."
        },
        {
          id: "q3-c",
          label: "Un suono sempre piu forte.",
          correct: false,
          feedback: "No. Il tempo non riguarda la forza del suono, ma la velocita del battito."
        }
      ]
    },
    {
      id: "q4",
      prompt: "Che cos'e l'accento?",
      options: [
        {
          id: "q4-a",
          label: "Un suono o una pulsazione con maggior rilievo.",
          correct: true,
          feedback: "Esatto. L'accento fa sentire un punto piu forte dentro il gruppo."
        },
        {
          id: "q4-b",
          label: "Una pulsazione sempre piu veloce.",
          correct: false,
          feedback: "Non proprio. Velocita e accento non sono la stessa cosa."
        },
        {
          id: "q4-c",
          label: "Un silenzio obbligatorio.",
          correct: false,
          feedback: "No. Il silenzio puo essere importante, ma l'accento e un punto piu marcato del suono o del gesto."
        }
      ]
    },
    {
      id: "q5",
      prompt: "Che cos'e il metro?",
      options: [
        {
          id: "q5-a",
          label: "L'organizzazione regolare degli accenti in gruppi.",
          correct: true,
          feedback: "Esatto. Il metro fa sentire gruppi regolari a due, a tre o a quattro."
        },
        {
          id: "q5-b",
          label: "La velocita della pulsazione.",
          correct: false,
          feedback: "Non proprio. Questa definizione riguarda il tempo."
        },
        {
          id: "q5-c",
          label: "Il numero totale degli strumenti.",
          correct: false,
          feedback: "No. Il metro non conta gli strumenti: organizza gli accenti nel tempo."
        }
      ]
    },
    {
      id: "q6",
      prompt: "Come capisci se il tempo e lento, moderato o veloce?",
      options: [
        {
          id: "q6-a",
          label: "Osservando la velocita con cui torna la pulsazione.",
          correct: true,
          feedback: "Esatto. Se il battito torna piu in fretta, il tempo e piu veloce."
        },
        {
          id: "q6-b",
          label: "Guardando quante mani ci sono nel gruppo.",
          correct: false,
          feedback: "No. Il numero di persone non basta a definire il tempo."
        },
        {
          id: "q6-c",
          label: "Ascoltando solo il primo colpo.",
          correct: false,
          feedback: "Non basta un solo colpo. Serve osservare come il battito continua nel tempo."
        }
      ]
    }
  ]
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
function ToneTag({ children, className }) {
  return /* @__PURE__ */ React.createElement("span", { className: cn(TAG_CLASS, className) }, children);
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
function getMeterPalette(groupSize) {
  if (groupSize === 2) {
    return {
      groupSurface: "border-[#d8eadc] bg-[#f4faf5]",
      beat: "border-[#d4e2d7] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#eef5f0_100%)] text-[#64756a]",
      accent: "border-[#c2d8c8] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#dfeee3_100%)] text-[#45634f]",
      pill: "border-[#d8eadc] bg-[#eef7f1] text-[#45634f]",
      note: "text-[#4f6857]"
    };
  }
  if (groupSize === 3) {
    return {
      groupSurface: "border-[#eedccf] bg-[#fff7f0]",
      beat: "border-[#eadfd4] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#fbf2ea_100%)] text-[#8a6f5e]",
      accent: "border-[#e6cdb9] bg-[radial-gradient(circle_at_35%_35%,#fffdfb_0%,#fee9d7_100%)] text-[#8a4d18]",
      pill: "border-[#eedccf] bg-[#fff2e7] text-[#8a4d18]",
      note: "text-[#8a5a34]"
    };
  }
  return {
    groupSurface: "border-[#d8e3f0] bg-[#f4f8fd]",
    beat: "border-[#dbe4f0] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#edf3fa_100%)] text-[#66758a]",
    accent: "border-[#c8d7ea] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#e2ebf8_100%)] text-[#3e5f86]",
    pill: "border-[#d8e3f0] bg-[#edf4fc] text-[#3e5f86]",
    note: "text-[#516a88]"
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
    const tempoMeta = type === "tempo-slow" ? { label: "lenta", className: "border-[#d7e1ec] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#edf3fa_100%)] text-[#5f738d]" } : type === "tempo-medium" ? { label: "moderata", className: "border-[#eadfd4] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#fbf2ea_100%)] text-[#8a6f5e]" } : { label: "veloce", className: "border-[#e6cdb9] bg-[radial-gradient(circle_at_35%_35%,#fffdfb_0%,#fee9d7_100%)] text-[#8a4d18]" };
    return /* @__PURE__ */ React.createElement(
      "span",
      {
        className: cn(
          "inline-flex min-w-[5.8rem] items-center justify-center rounded-full border px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] shadow-[0_10px_22px_rgba(15,23,42,0.06)]",
          tempoMeta.className
        )
      },
      tempoMeta.label
    );
  }
  if (type === "group-2" || type === "group-3" || type === "group-4") {
    const size = type === "group-2" ? 2 : type === "group-3" ? 3 : 4;
    const palette = getMeterPalette(size);
    return /* @__PURE__ */ React.createElement("div", { className: cn("flex items-center gap-2.5 rounded-[1.35rem] border px-3 py-3", palette.groupSurface) }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5" }, Array.from({ length: size }).map((_, index) => /* @__PURE__ */ React.createElement(
      "span",
      {
        key: `${type}-${index}`,
        className: cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold shadow-[0_10px_22px_rgba(15,23,42,0.06)]",
          index === 0 ? palette.accent : palette.beat
        )
      },
      index + 1
    ))));
  }
  const active = type === "accent";
  const pause = type === "pause";
  return /* @__PURE__ */ React.createElement(
    "span",
    {
      className: cn(
        "inline-flex items-center justify-center rounded-full border shadow-[0_10px_22px_rgba(15,23,42,0.06)]",
        active ? "h-16 w-16 border-[#e7ceb9] bg-[radial-gradient(circle_at_35%_35%,#fffdfb_0%,#feead9_100%)] text-[1.7rem] text-[#8a4d18]" : "h-12 w-12 border-[#d7e1ec] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#edf3fa_100%)] text-lg text-[#647791]",
        pause && "border-[#d9e0e8] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#f5f7fa_100%)] text-[#93a4b8]"
      )
    },
    pause ? "\u25CB" : "\u25CF"
  );
}
function MeterPreview({ groupSize, compact = false }) {
  const palette = getMeterPalette(groupSize);
  const groups = buildMeterGroups(groupSize);
  if (compact) {
    return /* @__PURE__ */ React.createElement("div", { className: "mt-4 rounded-[1.55rem] border border-slate-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#fcfbf8_100%)] px-4 py-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Traccia visiva"), /* @__PURE__ */ React.createElement("span", { className: cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium", palette.pill) }, groupSize, " pulsazioni")), /* @__PURE__ */ React.createElement("div", { className: "mt-4 flex flex-wrap gap-3" }, groups.map((group, index) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: `${groupSize}-compact-${index}`,
        className: cn("flex items-center gap-2.5 rounded-[1.2rem] border px-3 py-3", palette.groupSurface)
      },
      group.map((value, valueIndex) => /* @__PURE__ */ React.createElement(
        "span",
        {
          key: `${groupSize}-${index}-${value}`,
          className: cn(
            "inline-flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold shadow-[0_10px_22px_rgba(15,23,42,0.06)]",
            valueIndex === 0 ? palette.accent : palette.beat
          )
        },
        value
      ))
    ))), /* @__PURE__ */ React.createElement("p", { className: cn("mt-4 text-sm font-medium", palette.note) }, "Il numero 1 riapre il gruppo e fa sentire l'accento."));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "mt-6 rounded-[1.7rem] border border-slate-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#fcfbf8_100%)] px-5 py-6 sm:px-6 sm:py-7" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Traccia visiva"), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-sm leading-6 text-slate-500" }, "Guarda dove il gruppo si chiude e dove il numero 1 riparte.")), /* @__PURE__ */ React.createElement("span", { className: cn("inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium", palette.pill) }, groupSize, " pulsazioni")), /* @__PURE__ */ React.createElement("div", { className: "mt-6 flex flex-wrap gap-4" }, groups.map((group, index) => /* @__PURE__ */ React.createElement("div", { key: `${groupSize}-full-${index}`, className: cn("flex items-center gap-3 rounded-[1.35rem] border px-4 py-4", palette.groupSurface) }, group.map((value, valueIndex) => /* @__PURE__ */ React.createElement("div", { key: `${groupSize}-full-${index}-${value}`, className: "flex flex-col items-center gap-2" }, /* @__PURE__ */ React.createElement(
    "span",
    {
      className: cn(
        "inline-flex h-14 w-14 items-center justify-center rounded-full border text-base font-semibold shadow-[0_10px_24px_rgba(15,23,42,0.06)]",
        valueIndex === 0 ? palette.accent : palette.beat
      )
    },
    value
  ), /* @__PURE__ */ React.createElement("span", { className: cn("text-[0.82rem] font-medium", valueIndex === 0 ? palette.note : "text-slate-400") }, "battito")))))), /* @__PURE__ */ React.createElement("p", { className: cn("mt-5 text-sm font-medium", palette.note) }, "Ogni blocco colorato mostra uno stesso gruppo che ritorna."));
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
function RhythmFlowProgressBar() {
  return /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-progress" }, /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-progress__inner" }, lessonData.flow.map((movement) => /* @__PURE__ */ React.createElement(
    "a",
    {
      key: movement.id,
      href: `#${movement.id}`,
      className: "accordia-flow-progress__item"
    },
    movement.label
  ))));
}
function RhythmHeroMedia() {
  const groups = [
    { label: "a 2", values: [1, 2, 1, 2], tone: "border-[#d8eadc] bg-[#eef7f1] text-[#45634f]" },
    { label: "a 3", values: [1, 2, 3, 1, 2, 3], tone: "border-[#eedccf] bg-[#fff2e7] text-[#8a4d18]" },
    { label: "a 4", values: [1, 2, 3, 4], tone: "border-[#d8e3f0] bg-[#edf4fc] text-[#3e5f86]" }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-hero__media accordia-flow-hero__media--soft" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 p-5 sm:p-7 lg:p-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex h-full flex-col justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "accordia-flow-hero__caption-note" }, "battito comune"), /* @__PURE__ */ React.createElement("span", { className: "accordia-flow-hero__caption-note" }, "gruppo \xB7 gesto \xB7 ascolto")), /* @__PURE__ */ React.createElement("div", { className: "grid gap-4 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-[1.8rem] border border-white/90 bg-white/82 px-5 py-5" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Una sola idea"), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[1.18rem] font-semibold tracking-[-0.03em] text-slate-950" }, "Uno stesso battito puo contenere gruppi diversi."), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[0.98rem] leading-7 text-slate-600" }, "Prima senti il centro. Poi osserva come ritmi, accenti e gruppi cambiano la forma del tempo.")), /* @__PURE__ */ React.createElement("div", { className: "grid gap-3" }, groups.map((group) => /* @__PURE__ */ React.createElement("div", { key: group.label, className: "rounded-[1.5rem] border border-white/90 bg-white/78 px-4 py-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, group.label), /* @__PURE__ */ React.createElement("span", { className: cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium", group.tone) }, "gruppo ", group.label)), /* @__PURE__ */ React.createElement("div", { className: "mt-3 flex flex-wrap gap-2.5" }, group.values.map((value, index) => /* @__PURE__ */ React.createElement(
    "span",
    {
      key: `${group.label}-${index}`,
      className: cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold shadow-[0_10px_22px_rgba(15,23,42,0.06)]",
        value === 1 ? group.tone : "border-slate-200 bg-white text-slate-500"
      )
    },
    value
  ))))))))));
}
function RhythmFlowHero() {
  return /* @__PURE__ */ React.createElement("section", { id: "opening", className: "accordia-flow-hero scroll-mt-28", style: { fontFamily: APP_FONT } }, /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-hero__stage" }, /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-hero__copy" }, /* @__PURE__ */ React.createElement(SectionKicker, null, "Origini del suono"), /* @__PURE__ */ React.createElement("h1", { className: "mt-5 max-w-[10ch] text-[3.8rem] font-semibold tracking-[-0.07em] text-slate-950 sm:text-[4.9rem] lg:text-[6rem] lg:leading-[0.9]" }, lessonData.title), /* @__PURE__ */ React.createElement("p", { className: "accordia-flow-hero__question" }, lessonData.question), /* @__PURE__ */ React.createElement("p", { className: "accordia-flow-hero__intro" }, lessonData.intro), /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-keywords" }, lessonData.keywords.map((keyword) => /* @__PURE__ */ React.createElement("span", { key: keyword, className: "accordia-flow-keyword" }, keyword)))), /* @__PURE__ */ React.createElement(RhythmHeroMedia, null)));
}
function RhythmFlowPulsePanel() {
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
  return /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-surface accordia-flow-surface--soft" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Pulsazione"), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[1.16rem] font-semibold tracking-[-0.03em] text-slate-950" }, "Quattro battiti uguali che tornano sempre nello stesso ordine.")), /* @__PURE__ */ React.createElement(ToneTag, { className: "border-[#eadfce] bg-white text-[#8a4d18]" }, activeMode.label, " \xB7 ", activeMode.bpm, " bpm")), /* @__PURE__ */ React.createElement("div", { className: "mt-5 flex flex-wrap gap-2.5" }, lessonData.pulseModes.map((mode) => {
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
      mode.bpm
    );
  })), /* @__PURE__ */ React.createElement("div", { className: "mt-6 rounded-[1.7rem] border border-slate-200/70 bg-white px-5 py-6" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4" }, Array.from({ length: 4 }).map((_, index) => {
    const isActive = index === beatIndex && running;
    return /* @__PURE__ */ React.createElement("div", { key: `pulse-${index}`, className: "text-center" }, /* @__PURE__ */ React.createElement("span", { className: SMALL_LABEL }, "b ", index + 1), /* @__PURE__ */ React.createElement(
      "span",
      {
        className: cn(
          "mx-auto mt-3 inline-flex h-16 w-16 items-center justify-center rounded-full border text-base font-semibold shadow-[0_12px_26px_rgba(15,23,42,0.06)]",
          isActive ? "border-[#e7cdb9] bg-[radial-gradient(circle_at_35%_35%,#fffdfb_0%,#fee8d6_100%)] text-[#8a4d18]" : "border-[#d7e1ec] bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#edf3fa_100%)] text-[#647791]"
        ),
        style: reducedMotion ? void 0 : { transition: "background-color 140ms ease, border-color 140ms ease, color 140ms ease" }
      },
      index + 1
    ), /* @__PURE__ */ React.createElement("span", { className: cn("mt-2 block text-sm font-medium", isActive ? "text-[#8a4d18]" : "text-slate-400") }, index === 0 ? "riparte" : "continua"));
  }))), /* @__PURE__ */ React.createElement("div", { className: "mt-5 grid gap-3 sm:grid-cols-2" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-[1.3rem] border border-slate-200/70 bg-white px-4 py-4" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Che cosa noti?"), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-sm leading-6 text-slate-600" }, "La forma del gruppo non cambia. Cambia solo la velocita con cui il battito ritorna.")), /* @__PURE__ */ React.createElement("div", { className: "rounded-[1.3rem] border border-slate-200/70 bg-white px-4 py-4" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Supporto accessibile"), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-sm leading-6 text-slate-600" }, "Se vuoi semplificare, conta solo 1 e 2. Se vuoi estendere, prova a battere anche con i piedi."))), /* @__PURE__ */ React.createElement("div", { className: "mt-5 flex flex-wrap gap-3" }, /* @__PURE__ */ React.createElement(SecondaryButton, { onClick: () => setRunning((current) => !current) }, running ? "Ferma il battito" : "Riavvia il battito"), /* @__PURE__ */ React.createElement(SecondaryButton, { onClick: () => setAudioEnabled((current) => !current) }, audioEnabled ? "Audio leggero attivo" : "Audio leggero spento")));
}
function RhythmFlowListeningPanel() {
  const [activeCardId, setActiveCardId] = useState(lessonData.listeningCards[0].id);
  const [selectedMeters, setSelectedMeters] = useState({});
  const activeCard = lessonData.listeningCards.find((card) => card.id === activeCardId) || lessonData.listeningCards[0];
  const selectedMeter = selectedMeters[activeCard.id] || activeCard.expected;
  const palette = getMeterPalette(selectedMeter);
  return /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-surface" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Ascolto guidato"), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[1.16rem] font-semibold tracking-[-0.03em] text-slate-950" }, "Confronta situazioni diverse e cerca sempre il battito comune.")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2.5" }, lessonData.listeningCards.map((card) => {
    const isActive = card.id === activeCard.id;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: card.id,
        type: "button",
        "aria-label": `Apri ascolto ${card.code}`,
        onClick: () => setActiveCardId(card.id),
        className: cn(RING, isActive ? PILL_ACTIVE : PILL_DEFAULT)
      },
      "Ascolto ",
      card.code
    );
  }))), /* @__PURE__ */ React.createElement("div", { className: "mt-6 accordia-flow-split accordia-flow-split--balanced" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-[1.7rem] border border-slate-200/70 bg-white px-5 py-6" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, activeCard.focus), /* @__PURE__ */ React.createElement("h3", { className: "mt-4 text-[2rem] font-semibold tracking-[-0.05em] text-slate-950" }, activeCard.title), /* @__PURE__ */ React.createElement("p", { className: "mt-4 text-[1rem] leading-7 text-slate-600" }, activeCard.description), /* @__PURE__ */ React.createElement("div", { className: "mt-6 rounded-[1.35rem] border border-slate-200/70 bg-[#fcfbf8] px-4 py-4" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Prova"), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-sm leading-6 text-slate-600" }, activeCard.exercise)), /* @__PURE__ */ React.createElement("div", { className: "mt-6" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Quale gruppo senti?"), /* @__PURE__ */ React.createElement("div", { className: "mt-3 flex flex-wrap gap-2.5" }, [2, 3, 4].map((meter) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: `${activeCard.id}-${meter}`,
      type: "button",
      "aria-label": `${meter} pulsazioni`,
      onClick: () => setSelectedMeters((current) => ({ ...current, [activeCard.id]: meter })),
      className: cn(RING, selectedMeter === meter ? PILL_ACTIVE : PILL_DEFAULT)
    },
    meter,
    " pulsazioni"
  ))))), /* @__PURE__ */ React.createElement("div", { className: "grid gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-[1.7rem] border border-slate-200/70 bg-white px-5 py-5" }, /* @__PURE__ */ React.createElement(MeterPreview, { groupSize: selectedMeter, compact: true })), /* @__PURE__ */ React.createElement("div", { className: cn("rounded-[1.35rem] border px-4 py-4", palette.groupSurface) }, /* @__PURE__ */ React.createElement("p", { className: cn("text-sm font-medium leading-6", palette.note) }, "Se il numero 1 torna ogni ", selectedMeter, " battiti, il gruppo si chiude ", meterGroupLabel(selectedMeter), ".")), /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-question-grid" }, lessonData.listeningQuestions.map((question) => /* @__PURE__ */ React.createElement("div", { key: question, className: "accordia-flow-question-card" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm leading-6 text-slate-600" }, question)))))));
}
function RhythmFlowExploration() {
  return /* @__PURE__ */ React.createElement(SectionShell, { id: "exploration", backgroundClass: "bg-[#fffdfa]", className: "accordia-flow-movement" }, /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-movement__stage accordia-flow-movement__stage--wide", style: { fontFamily: APP_FONT } }, /* @__PURE__ */ React.createElement("p", { className: "accordia-flow-movement__eyebrow" }, "Esplorazione"), /* @__PURE__ */ React.createElement("h2", { className: "accordia-flow-movement__title" }, "Prima senti il centro, poi lo confronti."), /* @__PURE__ */ React.createElement("p", { className: "accordia-flow-movement__text" }, getSection("context").text), /* @__PURE__ */ React.createElement("div", { className: "mt-10 grid gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-surface accordia-flow-surface--soft" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-[36rem]" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Dove il ritmo serve al gruppo"), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[1rem] leading-7 text-slate-600" }, "Camminare, danzare, lavorare, marciare e pregare insieme chiedono un tempo condiviso. Il ritmo nasce per coordinare il movimento.")), /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-keywords mt-0" }, /* @__PURE__ */ React.createElement("span", { className: "accordia-flow-keyword" }, "camminare"), /* @__PURE__ */ React.createElement("span", { className: "accordia-flow-keyword" }, "danzare"), /* @__PURE__ */ React.createElement("span", { className: "accordia-flow-keyword" }, "coordinare"))), /* @__PURE__ */ React.createElement("div", { className: "mt-6 accordia-flow-rail" }, lessonData.contextExamples.map((item) => /* @__PURE__ */ React.createElement("div", { key: item.id, className: "accordia-flow-chip-card" }, /* @__PURE__ */ React.createElement("p", { className: "text-[1rem] font-semibold tracking-[-0.02em] text-slate-950" }, item.title), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-[0.95rem] leading-7 text-slate-500" }, item.detail))))), /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-split accordia-flow-split--wide" }, /* @__PURE__ */ React.createElement(RhythmFlowPulsePanel, null), /* @__PURE__ */ React.createElement(RhythmFlowListeningPanel, null)))));
}
function RhythmFlowBoard() {
  const section = getSection("sequencer");
  const [selectedStateId, setSelectedStateId] = useState("sound");
  const [steps, setSteps] = useState([...lessonData.sequencePresets.simple]);
  const optionById = useMemo(
    () => Object.fromEntries(lessonData.sequenceStates.map((option) => [option.id, option])),
    []
  );
  const bars = [steps.slice(0, 4), steps.slice(4, 8)];
  const activeOption = optionById[selectedStateId];
  const applyPreset = (presetKey) => {
    setSteps([...lessonData.sequencePresets[presetKey]]);
  };
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
          "flex aspect-square h-[5.1rem] w-[5.1rem] shrink-0 flex-col items-center justify-center rounded-[1.18rem] border border-solid px-2 py-2 text-center transition-colors duration-150",
          isAccent ? "border-[#e6c8a8] bg-[#fff8f1] hover:border-[#d7b692] hover:bg-[#fff3e5]" : isPause ? "border-slate-200/80 bg-[#fbfaf7] hover:border-slate-300 hover:bg-[#f6f4ef]" : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-[#f8f6f1]"
        )
      },
      /* @__PURE__ */ React.createElement("span", { className: SMALL_LABEL }, "t", index + 1),
      /* @__PURE__ */ React.createElement(SequencerSymbol, { stateId: step, className: isAccent ? "mt-2 text-[1.55rem] text-[#8a4d18]" : "mt-2 text-[1.45rem]" }),
      /* @__PURE__ */ React.createElement("span", { className: cn("mt-1 text-[0.7rem] leading-4", isAccent ? "text-[#8a4d18]" : "text-slate-500") }, option.longLabel)
    );
  };
  return /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-surface accordia-flow-surface--soft" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Lavagna ritmica"), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[1.16rem] font-semibold tracking-[-0.03em] text-slate-950" }, section.title)), /* @__PURE__ */ React.createElement(ToneTag, { className: "border-[#eadfce] bg-white text-[#8a4d18]" }, activeOption.longLabel)), /* @__PURE__ */ React.createElement("div", { className: "mt-5 flex flex-wrap gap-2.5" }, lessonData.sequenceStates.map((option) => {
    const isSelected = option.id === selectedStateId;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: option.id,
        type: "button",
        "aria-label": `Seleziona ${option.longLabel}`,
        onClick: () => setSelectedStateId(option.id),
        className: cn(RING, isSelected ? PILL_ACTIVE : PILL_DEFAULT)
      },
      option.longLabel
    );
  })), /* @__PURE__ */ React.createElement("div", { className: "mt-6 rounded-[1.8rem] border border-slate-200/70 bg-white px-4 py-5 shadow-[0_12px_28px_rgba(15,23,42,0.03)] sm:px-5" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto max-w-[31rem]" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-3" }, /* @__PURE__ */ React.createElement(ToneTag, { className: "border-slate-200/70 bg-[#fcfbf8] text-slate-600" }, "battuta 1 \xB7 tempi 1-4"), /* @__PURE__ */ React.createElement(ToneTag, { className: "border-slate-200/70 bg-[#fcfbf8] text-slate-600" }, "battuta 2 \xB7 tempi 5-8")), /* @__PURE__ */ React.createElement("div", { className: "mt-5 grid gap-3" }, bars.map((barSteps, barIndex) => /* @__PURE__ */ React.createElement("div", { key: `bar-row-${barIndex}`, className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "inline-flex h-11 min-w-[5.4rem] items-center justify-center rounded-full border border-slate-200/70 bg-[#fcfbf8] px-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500" }, "battuta ", barIndex + 1), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-4 gap-3" }, barSteps.map((step, stepIndex) => renderStepButton(step, barIndex * 4 + stepIndex)))))))), /* @__PURE__ */ React.createElement("div", { className: "mt-6 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-[1.35rem] border border-slate-200/70 bg-white px-4 py-4" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Che cosa fai"), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-sm leading-6 text-slate-600" }, "Scegli una pulsazione stabile. Poi costruisci il ritmo in due righe da quattro tempi: prima battuta sopra, seconda battuta sotto.")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-3" }, /* @__PURE__ */ React.createElement(SecondaryButton, { onClick: () => applyPreset("reset") }, "Reset"), /* @__PURE__ */ React.createElement(SecondaryButton, { onClick: () => applyPreset("simple") }, "Esempio semplice"), /* @__PURE__ */ React.createElement(SecondaryButton, { onClick: () => applyPreset("pauses") }, "Esempio con pause"), /* @__PURE__ */ React.createElement(SecondaryButton, { onClick: () => applyPreset("accents") }, "Esempio con accenti"))));
}
function RhythmFlowActive() {
  const conductorSteps = [
    {
      id: "still",
      title: "Punto di fermo",
      detail: "Ti fermi, guardi il gruppo e prepari l'attenzione."
    },
    {
      id: "prepare",
      title: "Preparazione",
      detail: "Il gesto fa capire quando sta per partire il battito."
    },
    {
      id: "attack",
      title: "Attacco",
      detail: "Il suono comincia insieme, nello stesso punto."
    },
    {
      id: "stop",
      title: "Stop",
      detail: "Il gruppo chiude insieme senza perdere il centro."
    }
  ];
  return /* @__PURE__ */ React.createElement(SectionShell, { id: "active-understanding", backgroundClass: "bg-[#f7f4ee]", className: "accordia-flow-movement" }, /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-movement__stage accordia-flow-movement__stage--wide", style: { fontFamily: APP_FONT } }, /* @__PURE__ */ React.createElement("p", { className: "accordia-flow-movement__eyebrow" }, "Comprensione attiva"), /* @__PURE__ */ React.createElement("h2", { className: "accordia-flow-movement__title" }, "Ora distingui le parole e le usi subito."), /* @__PURE__ */ React.createElement("p", { className: "accordia-flow-movement__text" }, "Leggi le definizioni essenziali, guarda gli esempi concreti e prova subito a costruire un ritmo che il gruppo possa ripetere."), /* @__PURE__ */ React.createElement("div", { className: "mt-10 grid gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-surface accordia-flow-surface--soft" }, /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-split accordia-flow-split--wide" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-[1.8rem] border border-slate-200/70 bg-white px-5 py-6 accordia-flow-copy-lines" }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Definizioni da ricopiare"), /* @__PURE__ */ React.createElement("div", { className: "mt-5 space-y-6" }, lessonData.quoteDefinitions.map((definition) => /* @__PURE__ */ React.createElement("div", { key: definition.id }, /* @__PURE__ */ React.createElement("p", { className: "text-[1.02rem] font-semibold tracking-[-0.02em] text-slate-950" }, definition.term), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-[1.14rem] italic leading-8 text-slate-700" }, definition.quote), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-[0.95rem] leading-7 text-slate-500" }, definition.support)))))), /* @__PURE__ */ React.createElement("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3" }, lessonData.conceptCards.map((card) => /* @__PURE__ */ React.createElement("div", { key: card.id, className: "rounded-[1.55rem] border border-slate-200/70 bg-white px-5 py-5" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, card.title), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[0.96rem] leading-7 text-slate-600" }, card.definition), /* @__PURE__ */ React.createElement("div", { className: "mt-5 flex flex-wrap items-center gap-2.5" }, card.visual.map((item, index) => /* @__PURE__ */ React.createElement(ConceptVisual, { key: `${card.id}-${index}`, type: item }))))))), /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-key-idea" }, "La pulsazione sostiene. Il ritmo si muove. Il tempo accelera o rallenta. Il metro organizza gli accenti.")), /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-split accordia-flow-split--wide" }, /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-surface" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Gesto del direttore"), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[1.02rem] leading-7 text-slate-600" }, "Anche un gesto semplice puo aiutarti a far partire, mantenere e chiudere il tempo del gruppo."), /* @__PURE__ */ React.createElement("div", { className: "mt-6 accordia-flow-rail" }, conductorSteps.map((step, index) => /* @__PURE__ */ React.createElement("div", { key: step.id, className: "accordia-flow-chip-card" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "0", index + 1), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[1rem] font-semibold tracking-[-0.02em] text-slate-950" }, step.title), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-[0.95rem] leading-7 text-slate-500" }, step.detail)))), /* @__PURE__ */ React.createElement("div", { className: "mt-6 grid gap-3 sm:grid-cols-2" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-[1.3rem] border border-slate-200/70 bg-[#fcfbf8] px-4 py-4" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Versione essenziale"), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-sm leading-6 text-slate-600" }, "Usa solo preparazione, attacco e stop.")), /* @__PURE__ */ React.createElement("div", { className: "rounded-[1.3rem] border border-slate-200/70 bg-[#fcfbf8] px-4 py-4" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Se vuoi estendere"), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-sm leading-6 text-slate-600" }, "Aggiungi anche un accento piu forte sul primo battito.")))), /* @__PURE__ */ React.createElement(RhythmFlowBoard, null)))));
}
function RhythmFlowReworking() {
  const [answers, setAnswers] = useState({});
  const [selfAnswers, setSelfAnswers] = useState({});
  const selfChecks = [
    "Riesci a mantenere una pulsazione stabile?",
    "Riesci a distinguere pulsazione e ritmo?",
    "Riesci a seguire o guidare il gruppo con un gesto?"
  ];
  return /* @__PURE__ */ React.createElement(SectionShell, { id: "reworking", backgroundClass: "bg-[#fffdfa]", className: "accordia-flow-movement" }, /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-movement__stage accordia-flow-movement__stage--wide", style: { fontFamily: APP_FONT } }, /* @__PURE__ */ React.createElement("p", { className: "accordia-flow-movement__eyebrow" }, "Rielaborazione"), /* @__PURE__ */ React.createElement("h2", { className: "accordia-flow-movement__title" }, "Porta il ritmo nel gruppo e ricordalo."), /* @__PURE__ */ React.createElement("p", { className: "accordia-flow-movement__text" }, "Ora usi cio che hai capito per costruire una breve performance, spiegare le tue scelte e fissare l'idea chiave della lezione."), /* @__PURE__ */ React.createElement("div", { className: "mt-10 grid gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-surface accordia-flow-surface--soft" }, /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-split accordia-flow-split--balanced" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Compito"), /* @__PURE__ */ React.createElement("p", { className: "mt-4 text-[1.22rem] font-semibold tracking-[-0.03em] text-slate-950" }, "Lavora in coppia o in piccolo gruppo. Costruisci una breve sequenza con pulsazione, ritmo e accenti."), /* @__PURE__ */ React.createElement("div", { className: "mt-6 space-y-4" }, lessonData.performanceRules.map((rule) => /* @__PURE__ */ React.createElement("p", { key: rule, className: "text-[0.98rem] leading-7 text-slate-600" }, rule)))), /* @__PURE__ */ React.createElement("div", { className: "grid gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-[1.4rem] border border-slate-200/70 bg-white px-5 py-5" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Se vuoi semplificare"), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-sm leading-6 text-slate-600" }, "Tieni solo la pulsazione con mani o piedi. Aggiungi un solo accento chiaro e ripeti.")), /* @__PURE__ */ React.createElement("div", { className: "rounded-[1.4rem] border border-slate-200/70 bg-white px-5 py-5" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Ruoli possibili"), /* @__PURE__ */ React.createElement("div", { className: "mt-3 space-y-3" }, lessonData.performanceRoles.map((role) => /* @__PURE__ */ React.createElement("p", { key: role, className: "text-sm leading-6 text-slate-600" }, role)))), /* @__PURE__ */ React.createElement("div", { className: "rounded-[1.4rem] border border-slate-200/70 bg-white px-5 py-5" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Come capisci se funziona"), /* @__PURE__ */ React.createElement("div", { className: "mt-3 space-y-3" }, lessonData.performanceCriteria.map((criterion) => /* @__PURE__ */ React.createElement("p", { key: criterion, className: "text-sm leading-6 text-slate-600" }, criterion))))))), /* @__PURE__ */ React.createElement("div", { className: "grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]" }, /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-surface" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Verifica leggera"), /* @__PURE__ */ React.createElement("div", { className: "mt-5 divide-y divide-slate-200/80" }, lessonData.quizQuestions.map((question, questionIndex) => {
    const selectedOptionId = answers[question.id];
    const selectedOption = question.options.find((option) => option.id === selectedOptionId);
    return /* @__PURE__ */ React.createElement("div", { key: question.id, className: "py-5 first:pt-0" }, /* @__PURE__ */ React.createElement("p", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-slate-400" }, "Domanda ", questionIndex + 1), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-[1.02rem] font-semibold tracking-[-0.02em] text-slate-950" }, question.prompt), /* @__PURE__ */ React.createElement("div", { className: "mt-4 space-y-2.5" }, question.options.map((option) => {
      const isSelected = option.id === selectedOptionId;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: option.id,
          type: "button",
          "aria-label": option.label,
          onClick: () => setAnswers((current) => ({ ...current, [question.id]: option.id })),
          className: cn(
            RING,
            "block w-full rounded-[1.2rem] border px-4 py-3 text-left text-sm leading-6 transition duration-200",
            isSelected ? "border-[#c66a18] bg-[#fff1e2] text-slate-900" : "border-slate-200 bg-[#f8f6f1] text-slate-700 hover:border-slate-300 hover:bg-[#efede7]"
          )
        },
        option.label
      );
    })), selectedOption ? /* @__PURE__ */ React.createElement("div", { className: "mt-3 rounded-[1.2rem] border border-slate-200/70 bg-[#fcfbf8] px-4 py-3 text-sm leading-6 text-slate-600" }, selectedOption.feedback) : null);
  }))), /* @__PURE__ */ React.createElement("div", { className: "grid gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-surface accordia-flow-surface--plain accordia-flow-copy-lines" }, /* @__PURE__ */ React.createElement("div", { className: "relative px-1 py-1" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Autovalutazione"), /* @__PURE__ */ React.createElement("div", { className: "mt-5 space-y-5" }, selfChecks.map((prompt) => /* @__PURE__ */ React.createElement("div", { key: prompt }, /* @__PURE__ */ React.createElement("p", { className: "text-[0.98rem] leading-7 text-slate-700" }, prompt), /* @__PURE__ */ React.createElement("div", { className: "mt-3 flex flex-wrap gap-3" }, ["ancora no", "abbastanza", "si"].map((option) => {
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
  }))))))), /* @__PURE__ */ React.createElement("div", { className: "accordia-flow-surface accordia-flow-surface--soft" }, /* @__PURE__ */ React.createElement("p", { className: SMALL_LABEL }, "Idea chiave"), /* @__PURE__ */ React.createElement("p", { className: "mt-4 text-[2rem] font-semibold tracking-[-0.05em] text-slate-950" }, "La pulsazione e il battito regolare, il ritmo e cio che accade dentro quel battito, il tempo dice quanto veloce scorre la musica.")))))));
}
function RitmoPulsazioneTempoLesson() {
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: APP_FONT }, className: "accordia-lesson-page accordia-flow-page text-slate-950 antialiased" }, /* @__PURE__ */ React.createElement(RhythmFlowHero, null), /* @__PURE__ */ React.createElement(RhythmFlowProgressBar, null), /* @__PURE__ */ React.createElement(RhythmFlowExploration, null), /* @__PURE__ */ React.createElement(RhythmFlowActive, null), /* @__PURE__ */ React.createElement(RhythmFlowReworking, null));
}
var RitmoPulsazioneTempoLesson_default = RitmoPulsazioneTempoLesson;
export {
  RitmoPulsazioneTempoLesson_default as default
};
