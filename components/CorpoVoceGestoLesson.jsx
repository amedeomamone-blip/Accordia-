import React, { useEffect, useMemo, useRef, useState } from "https://esm.sh/react@18";

const APP_FONT = "'SF Pro Display','SF Pro Text',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif";
const ACCENT = "#c66a18";
const ACCENT_SOFT = "#fff4e8";
const BORDER = "rgba(148, 163, 184, 0.22)";
const SURFACE = "#f7f5f1";
const RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c66a18] focus-visible:ring-offset-2 focus-visible:ring-offset-white";
const LESSON_SHELL = "mx-auto max-w-[84rem] px-4 sm:px-6 lg:px-8";
const LESSON_SHELL_WIDE = "mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8";
const LESSON_SHELL_COMPACT = "mx-auto max-w-[78rem] px-4 sm:px-6 lg:px-8";
const ORIGIN_CAVE_IMAGE = "/assets/lesson/corpo-voce-gesto/lascaux-painting.jpg";
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
const INPUT_AREA =
  "mt-6 min-h-[9rem] w-full resize-none rounded-[1.35rem] border border-slate-200/80 bg-[#fcfbf8] px-4 py-4 text-sm leading-7 text-slate-700 placeholder:text-slate-400";

const lessonData = {
  title: "Corpo, voce e gesto",
  nucleus: "Origini del suono",
  subtitle: "Prima degli strumenti, prima dello spartito, prima della scrittura: il suono comincia da noi.",
  sections: [
    {
      id: "hero",
      navGroup: "inizio",
      navLabel: "Inizio",
      eyebrow: "ORIGINI DEL SUONO",
      title: "Corpo, voce e gesto",
      subtitle: "Prima degli strumenti, prima dello spartito, prima della scrittura: il suono comincia da noi.",
      microtext:
        "Ascolteremo il silenzio, useremo il corpo come strumento, costruiremo una sequenza ritmica e la trasformeremo in una partitura grafica.",
      cta: "Inizia l'ascolto",
    },
    {
      id: "listening",
      navGroup: "ascolto",
      navLabel: "Ascolto",
      title: "Possiamo fare musica senza strumenti?",
      text:
        "Restiamo in silenzio per 30 secondi. Ascoltiamo il respiro, i piccoli movimenti, i rumori dell'aula, i suoni lontani. Poi distinguiamo cio che nasce dal corpo, dall'ambiente e da un gesto intenzionale.",
      questions: [
        "Quali suoni arrivano dal nostro corpo?",
        "Quali suoni arrivano dall'ambiente?",
        "Quando un rumore puo diventare musica?",
      ],
    },
    {
      id: "origin",
      navGroup: "origine",
      navLabel: "Origine",
      title: "Prima degli strumenti, il corpo.",
      headline: "La musica nasce con l'uomo.",
      text:
        "Prima degli strumenti complessi e prima della scrittura musicale, gli esseri umani usavano il corpo, la voce e il gesto per comunicare, imitare la natura, accompagnare il lavoro, danzare, celebrare riti e stare insieme.",
      supporting:
        "Nelle societa antiche la musica poteva avere una funzione sacra, magica o comunitaria. Prima di essere scritta, veniva ricordata e trasmessa oralmente: si imparava ascoltando, imitando e ripetendo.",
      concepts: ["corpo", "voce", "gesto", "comunita"],
      imageLabel: "Immagine da inserire: pitture rupestri / corpo in movimento / rito sonoro.",
    },
    {
      id: "body",
      navGroup: "corpo",
      navLabel: "Corpo",
      title: "Il primo strumento e gia presente.",
      text:
        "Il corpo produce suoni diversi. Le mani danno un attacco chiaro. I piedi creano stabilita. Il petto produce un suono piu profondo. Il respiro prepara il gesto.",
    },
    {
      id: "voice",
      navGroup: "voce",
      navLabel: "Voce",
      title: "La voce non e solo canto.",
      text:
        "La voce puo chiamare, imitare, raccontare, guidare e ricordare. Prima dello spartito, una musica poteva vivere nella memoria di chi la ascoltava e la ripeteva.",
      question: "Quale suono vocale useresti per costruire un ritmo?",
    },
    {
      id: "gesture",
      navGroup: "gesto",
      navLabel: "Gesto",
      title: "Un gesto diventa musica quando ha intenzione.",
      text:
        "Un movimento casuale produce rumore. Un gesto intenzionale puo produrre musica. Il gesto prepara il suono, lo organizza e lo rende visibile al gruppo.",
      activity:
        "Prova un gesto senza suono. Poi prova lo stesso gesto producendo un suono. Che cosa cambia?",
      steps: ["Preparo", "Produco", "Ascolto", "Ripeto"],
    },
    {
      id: "soundscape",
      navGroup: "ambiente",
      navLabel: "Ambiente",
      title: "Anche l'ambiente suona.",
      text:
        "Vento, acqua, passi, oggetti, eco, silenzio. Ogni spazio ha un paesaggio sonoro. Le prime comunita potevano riconoscere nella natura una voce da imitare, ascoltare o trasformare in rito.",
    },
    {
      id: "concept-map",
      navGroup: "mappa",
      navLabel: "Mappa",
      title: "Dal corpo alla musica.",
      text:
        "Ogni parola racconta un passaggio: dal corpo che produce suono, alla voce che comunica, fino al gruppo che costruisce una musica condivisa.",
    },
    {
      id: "percussion",
      navGroup: "laboratorio",
      navLabel: "Laboratorio",
      title: "Costruiamo una sequenza di 8 pulsazioni.",
      text:
        "Scegli tre suoni corporei. Mantieni una pulsazione regolare. Costruisci una sequenza semplice. Ripetila. Poi aggiungi una piccola variazione.",
    },
    {
      id: "graphic-score",
      navGroup: "laboratorio",
      navLabel: "Laboratorio",
      title: "Dal gesto alla partitura grafica.",
      text:
        "Prima della notazione tradizionale possiamo usare simboli semplici per ricordare i gesti e organizzare i suoni nel tempo.",
      activity:
        "Ogni gruppo crea una partitura grafica di 8 tempi e la passa a un altro gruppo. L'altro gruppo prova a eseguirla senza spiegazione orale.",
      questions: [
        "La partitura si capisce senza spiegazione?",
        "I simboli sono coerenti?",
        "Il silenzio ha un posto preciso?",
      ],
    },
    {
      id: "sharing",
      navGroup: "laboratorio",
      navLabel: "Laboratorio",
      title: "La musica diventa gruppo.",
      text:
        "Ogni gruppo presenta la propria sequenza. Gli altri ascoltano e osservano come corpo, voce, gesto e silenzio vengono organizzati nel tempo.",
    },
    {
      id: "final-quiz",
      navGroup: "verifica",
      navLabel: "Verifica",
      title: "Che cosa abbiamo scoperto?",
      text:
        "La musica puo nascere dal corpo, dalla voce e dal gesto. Prima degli strumenti complessi, gli esseri umani potevano organizzare i suoni attraverso ritmo, movimento, imitazione e ripetizione. Il silenzio non e vuoto: aiuta ad ascoltare e da forma ai suoni.",
      closing: "Il primo strumento musicale puo essere il corpo.",
    },
  ],
  soundSources: [
    {
      id: "wind",
      label: "vento",
      accent: "#d7a370",
      note: "linee leggere e continue",
      prompt: "Che tipo di ritmo immagini?",
      details: ["continuo o spezzato", "forte o leggero", "vicino o lontano"],
    },
    {
      id: "water",
      label: "acqua",
      accent: "#8bb6c7",
      note: "onde, gocce, scorrimento",
      prompt: "Che tipo di ritmo immagini?",
      details: ["continuo o spezzato", "forte o leggero", "vicino o lontano"],
    },
    {
      id: "fire",
      label: "fuoco",
      accent: "#cf8252",
      note: "crepitii e accensioni",
      prompt: "Che tipo di ritmo immagini?",
      details: ["continuo o spezzato", "forte o leggero", "vicino o lontano"],
    },
    {
      id: "stones",
      label: "pietre",
      accent: "#8b8f98",
      note: "urti, attriti, peso",
      prompt: "Che tipo di ritmo immagini?",
      details: ["continuo o spezzato", "forte o leggero", "vicino o lontano"],
    },
    {
      id: "animals",
      label: "animali",
      accent: "#8fa66a",
      note: "richiami, versi, risposte",
      prompt: "Che tipo di ritmo immagini?",
      details: ["continuo o spezzato", "forte o leggero", "vicino o lontano"],
    },
  ],
  conceptNodes: [
    {
      id: "body",
      label: "Corpo",
      x: 18,
      y: 30,
      description: "Il primo spazio del suono: mani, piedi, respiro, battito, movimento.",
      example: "Battere le mani su una pulsazione comune.",
      links: ["rhythm"],
      relatedTerms: ["pulsazione", "attacco"],
    },
    {
      id: "voice",
      label: "Voce",
      x: 50,
      y: 16,
      description: "Il suono che chiama, ricorda, guida e trasmette oralmente.",
      example: "Usare ta, tum o ah per fissare una sequenza nella memoria.",
      links: ["memory"],
      relatedTerms: ["oralita", "richiamo"],
    },
    {
      id: "gesture",
      label: "Gesto",
      x: 82,
      y: 30,
      description: "Il movimento intenzionale che prepara, produce o coordina il suono.",
      example: "Alzare la mano per far partire il gruppo insieme.",
      links: ["community"],
      relatedTerms: ["comunicazione", "intenzione"],
    },
    {
      id: "environment",
      label: "Ambiente",
      x: 16,
      y: 72,
      description: "Lo spazio sonoro fatto di natura, aula, oggetti, distanze e risonanze.",
      example: "Ascoltare vento, passi, sedie, corridoio ed eco.",
      links: ["silence"],
      relatedTerms: ["ascolto", "natura"],
    },
    {
      id: "rhythm",
      label: "Ritmo",
      x: 34,
      y: 88,
      description: "L'organizzazione dei suoni nel tempo condiviso.",
      example: "Costruire una sequenza di 8 pulsazioni regolari.",
      links: ["community"],
      relatedTerms: ["danza", "ripetizione"],
    },
    {
      id: "silence",
      label: "Silenzio",
      x: 66,
      y: 88,
      description: "La pausa che prepara l'ascolto e da forma ai suoni.",
      example: "Fermarsi tutti insieme prima dell'ultimo attacco.",
      links: ["environment"],
      relatedTerms: ["ascolto", "pausa"],
    },
    {
      id: "community",
      label: "Comunita",
      x: 84,
      y: 72,
      description: "Il gruppo che rende il suono esperienza condivisa.",
      example: "Ripetere la stessa sequenza senza perdere la pulsazione comune.",
      links: ["rhythm"],
      relatedTerms: ["rito", "coordinazione"],
    },
    {
      id: "memory",
      label: "Memoria",
      x: 50,
      y: 56,
      description: "La capacita di ricordare e trasmettere attraverso imitazione e ripetizione.",
      example: "Ripetere una formula vocale senza scrittura.",
      links: ["voice"],
      relatedTerms: ["oralita", "ripetizione"],
    },
  ],
  bodySounds: [
    {
      id: "mani",
      label: "Mani",
      description: "Suono chiaro, secco, immediato.",
      keywords: ["timbro", "attacco"],
      buttonX: 18,
      buttonY: 20,
      markX: 34,
      markY: 34,
    },
    {
      id: "piedi",
      label: "Piedi",
      description: "Suono grave, stabile, vicino alla pulsazione.",
      keywords: ["pulsazione", "stabilita"],
      buttonX: 20,
      buttonY: 78,
      markX: 46,
      markY: 80,
    },
    {
      id: "petto",
      label: "Petto",
      description: "Suono corporeo, profondo, controllato.",
      keywords: ["timbro", "peso"],
      buttonX: 80,
      buttonY: 30,
      markX: 50,
      markY: 42,
    },
    {
      id: "cosce",
      label: "Cosce",
      description: "Suono morbido, utile per accompagnare.",
      keywords: ["accompagnamento", "ritmo"],
      buttonX: 80,
      buttonY: 60,
      markX: 54,
      markY: 64,
    },
    {
      id: "schiocco",
      label: "Schiocco",
      description: "Suono breve, preciso, leggero.",
      keywords: ["contrasto", "precisione"],
      buttonX: 72,
      buttonY: 16,
      markX: 66,
      markY: 26,
    },
    {
      id: "respiro",
      label: "Respiro",
      description: "Prepara l'azione e rende il gesto piu consapevole.",
      keywords: ["pausa", "preparazione"],
      buttonX: 50,
      buttonY: 10,
      markX: 50,
      markY: 24,
    },
  ],
  voiceSyllables: ["ta", "tum", "shh", "ah", "oh"],
  percussionSteps: [
    { id: "clap", label: "clap", longLabel: "mani", short: "MA", symbol: "●" },
    { id: "stomp", label: "stomp", longLabel: "piedi", short: "PI", symbol: "■" },
    { id: "chest", label: "chest", longLabel: "petto", short: "PE", symbol: "⬢" },
    { id: "thigh", label: "thigh", longLabel: "cosce", short: "CO", symbol: "▲" },
    { id: "snap", label: "snap", longLabel: "schiocco", short: "SC", symbol: "✦" },
    { id: "voice", label: "voice", longLabel: "voce", short: "VO", symbol: "◆" },
    { id: "pause", label: "pause", longLabel: "pausa", short: "PA", symbol: "—" },
  ],
  graphicSymbols: [
    { id: "mani", symbol: "●", label: "mani" },
    { id: "piedi", symbol: "■", label: "piedi" },
    { id: "cosce", symbol: "▲", label: "cosce" },
    { id: "voce", symbol: "◆", label: "voce" },
    { id: "schiocco", symbol: "✦", label: "schiocco" },
    { id: "pausa", symbol: "—", label: "pausa" },
  ],
  rubricCriteria: [
    "Coordinazione",
    "Ascolto del gruppo",
    "Chiarezza ritmica",
    "Uso creativo di corpo e voce",
    "Rispetto della pulsazione",
    "Uso del silenzio",
  ],
  quizQuestions: [
    {
      id: "q1",
      prompt: "La musica puo esistere senza strumenti?",
      options: [
        {
          id: "q1-a",
          label: "A. Si, se corpo, voce, gesto e silenzio vengono organizzati.",
          correct: true,
          feedback: "Esatto. La musica puo nascere anche dal corpo e dalla voce, se il suono viene scelto e organizzato.",
        },
        {
          id: "q1-b",
          label: "B. No, servono sempre strumenti musicali.",
          correct: false,
          feedback: "Non proprio. Gli strumenti aiutano, ma la musica puo nascere anche da corpo, voce, gesto e silenzio.",
        },
        {
          id: "q1-c",
          label: "C. Solo se c'e uno spartito tradizionale.",
          correct: false,
          feedback: "No. Lo spartito tradizionale non e necessario perche un suono diventi musicale.",
        },
      ],
    },
    {
      id: "q2",
      prompt: "Che cosa rende musicale un gesto?",
      options: [
        {
          id: "q2-a",
          label: "A. Il fatto che sia molto veloce.",
          correct: false,
          feedback: "La velocita da sola non basta. Serve intenzione e organizzazione del tempo.",
        },
        {
          id: "q2-b",
          label: "B. L'intenzione, la ripetizione e l'organizzazione nel tempo.",
          correct: true,
          feedback: "Esatto. Un gesto diventa musicale quando orienta o produce il suono in modo intenzionale.",
        },
        {
          id: "q2-c",
          label: "C. Il fatto che sia sempre forte.",
          correct: false,
          feedback: "La forza non basta. Conta come il gesto organizza il suono e il gruppo.",
        },
      ],
    },
    {
      id: "q3",
      prompt: "Perche il silenzio e importante?",
      options: [
        {
          id: "q3-a",
          label: "A. Perche interrompe la musica.",
          correct: false,
          feedback: "Non solo. Il silenzio non spegne la musica: la prepara e la rende piu leggibile.",
        },
        {
          id: "q3-b",
          label: "B. Perche non serve a nulla.",
          correct: false,
          feedback: "Al contrario. Il silenzio aiuta l'ascolto e da forma ai suoni.",
        },
        {
          id: "q3-c",
          label: "C. Perche prepara l'ascolto e da forma ai suoni.",
          correct: true,
          feedback: "Esatto. Il silenzio e parte dell'esperienza musicale.",
        },
      ],
    },
    {
      id: "q4",
      prompt: "Che cos'e una partitura grafica?",
      options: [
        {
          id: "q4-a",
          label: "A. Un modo per rappresentare i suoni con simboli.",
          correct: true,
          feedback: "Esatto. La partitura grafica usa segni semplici per ricordare e condividere una sequenza.",
        },
        {
          id: "q4-b",
          label: "B. Un disegno senza funzione musicale.",
          correct: false,
          feedback: "Non e solo un disegno. Serve a organizzare il tempo e a ripetere i suoni.",
        },
        {
          id: "q4-c",
          label: "C. Una pagina con solo note tradizionali.",
          correct: false,
          feedback: "No. Qui parliamo proprio di un sistema piu semplice della notazione tradizionale.",
        },
      ],
    },
    {
      id: "q5",
      prompt: "Come si poteva trasmettere la musica prima della scrittura musicale?",
      options: [
        {
          id: "q5-a",
          label: "A. Solo con strumenti elettronici.",
          correct: false,
          feedback: "No. Gli strumenti elettronici non appartengono a questo contesto.",
        },
        {
          id: "q5-b",
          label: "B. Attraverso ascolto, imitazione, memoria e ripetizione.",
          correct: true,
          feedback: "Esatto. Prima della scrittura, la musica poteva vivere nella voce, nel corpo e nella memoria condivisa.",
        },
        {
          id: "q5-c",
          label: "C. Solo con libri stampati.",
          correct: false,
          feedback: "No. La trasmissione era soprattutto orale e pratica.",
        },
      ],
    },
  ],
};

const conceptFloatingMeta = {
  body: { number: "01", category: "sorgente" },
  voice: { number: "02", category: "oralita" },
  gesture: { number: "03", category: "intenzione" },
  environment: { number: "04", category: "paesaggio" },
  rhythm: { number: "05", category: "tempo" },
  silence: { number: "06", category: "pausa" },
  community: { number: "07", category: "gruppo" },
  memory: { number: "08", category: "trasmissione" },
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getSection(id) {
  return lessonData.sections.find((section) => section.id === id);
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (!("IntersectionObserver" in window)) {
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
  }, []);

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
      {text ? (
        <p className={cn("mt-5 max-w-[43rem]", BODY_COPY)}>
          {text}
        </p>
      ) : null}
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

function LessonHero() {
  const section = getSection("hero");

  return (
    <section
      id={section.id}
      className="scroll-mt-28 bg-[#fbfaf7]"
      style={{ fontFamily: APP_FONT }}
    >
      <div className="mx-auto flex min-h-[calc(88vh-4.75rem)] max-w-[84rem] items-center px-4 pb-16 pt-14 sm:px-6 md:pb-20 lg:px-8 lg:pt-20">
        <div className="grid w-full gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.78fr)] xl:items-end">
          <div className="max-w-[48rem]">
            <SectionKicker>{section.eyebrow}</SectionKicker>
            <h1 className="mt-6 max-w-[9ch] text-[3.9rem] font-semibold tracking-[-0.065em] text-slate-950 sm:text-[5rem] lg:text-[6rem] lg:leading-[0.9]">
              {section.title}
            </h1>
          </div>
          <div className="max-w-[30rem] xl:justify-self-end xl:pb-2">
            <p className="text-[1.18rem] leading-[1.65] text-slate-600 sm:text-[1.4rem]">
              {section.subtitle}
            </p>
            <p className="mt-6 max-w-[28rem] text-[0.98rem] leading-7 text-slate-500 sm:text-base">
              {section.microtext}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ListeningTimerSection() {
  const section = getSection("listening");
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    if (secondsLeft === 0) {
      setRunning(false);
      setFinished(true);
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
      {() => (
        <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
          <SectionHeading kicker="Silenzio e ascolto" title={section.title} text={section.text} align="center" />

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
                  <span className="mt-2 text-6xl font-semibold tracking-[-0.06em] text-slate-950">
                    {secondsLeft}
                  </span>
                  <span className="mt-2 text-sm text-slate-500">secondi di ascolto</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <PrimaryButton
                  onClick={() => {
                    setSecondsLeft(30);
                    setFinished(false);
                    setRunning(true);
                  }}
                >
                  Avvia 30 secondi
                </PrimaryButton>
                <SecondaryButton
                  onClick={() => {
                    setRunning(false);
                    setSecondsLeft(30);
                    setFinished(false);
                  }}
                >
                  Reimposta
                </SecondaryButton>
              </div>
            </div>

            {finished ? (
              <div className="mt-12 grid gap-4 transition-all duration-700 lg:grid-cols-3">
                {[
                  {
                    title: "Corpo",
                    hint: "Esempi: respiro, mani, passi, voce.",
                  },
                  {
                    title: "Ambiente",
                    hint: "Esempi: sedie, finestre, corridoio, oggetti.",
                  },
                  {
                    title: "Gesto intenzionale",
                    hint: "Esempi: battere, strofinare, schioccare, fermarsi.",
                  },
                ].map((column) => (
                  <SurfacePanel key={column.title} className="p-6 sm:p-7">
                    <p className={SMALL_LABEL}>{column.title}</p>
                    <p className={cn("mt-4", BODY_COPY_SOFT)}>{column.hint}</p>
                    <textarea
                      aria-label={`Annota i suoni per ${column.title}`}
                      placeholder="Annota quello che senti..."
                      className={cn(RING, INPUT_AREA)}
                    />
                  </SurfacePanel>
                ))}
              </div>
            ) : (
              <SurfacePanel tone="subtle" className="mt-12 px-6 py-7 text-center">
                <p className={cn("mx-auto max-w-2xl", BODY_COPY_SOFT)}>
                  Al termine del timer compariranno tre spazi di raccolta: corpo, ambiente, gesto intenzionale.
                </p>
              </SurfacePanel>
            )}
          </SurfacePanel>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {section.questions.map((question) => (
              <SurfacePanel key={question} tone="subtle" className="flex min-h-[6rem] items-center justify-center p-5 text-center">
                <p className={cn("mx-auto max-w-[18rem]", BODY_COPY_SOFT)}>{question}</p>
              </SurfacePanel>
            ))}
          </div>
        </div>
      )}
    </SectionShell>
  );
}

function OriginStorySection() {
  const section = getSection("origin");

  return (
    <SectionShell id={section.id} backgroundClass="bg-white" className={SECTION_SPACE}>
      <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.04fr)_minmax(22rem,0.96fr)] lg:items-center">
          <div className="max-w-[39rem]">
            <SectionKicker>Prima degli strumenti</SectionKicker>
            <h2 className="mt-4 text-[2.7rem] font-semibold tracking-[-0.05em] text-slate-950 sm:text-[3.35rem] lg:leading-[0.95]">
              {section.title}
            </h2>
            <p className="mt-7 text-[2rem] font-semibold tracking-[-0.05em] text-slate-950 sm:text-[2.4rem]">
              {section.headline}
            </p>
            <p className={cn("mt-6", BODY_COPY)}>{section.text}</p>
            <p className={cn("mt-5", BODY_COPY_SOFT)}>{section.supporting}</p>
          </div>

          <SurfacePanel tone="soft" className="p-4 sm:p-5">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white">
              <img
                src={ORIGIN_CAVE_IMAGE}
                alt="Pitture rupestri con animali tracciati sulla parete della grotta."
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent px-6 py-5">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/80">
                  Pitture rupestri
                </p>
              </div>
            </div>
          </SurfacePanel>
        </div>

      </div>
    </SectionShell>
  );
}

function BodyFigure({ activeSound, onSelect }) {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[34rem] rounded-[2.4rem] border border-white/90 bg-white shadow-[0_22px_48px_rgba(15,23,42,0.05)]">
      <svg viewBox="0 0 320 400" className="h-full w-full" aria-hidden="true">
        <rect x="22" y="22" width="276" height="356" rx="44" fill="#f8f6f2" />
        <circle cx="160" cy="92" r="34" fill="none" stroke="rgba(198,106,24,0.15)" strokeWidth="2" />
        <path d="M160 126v82" fill="none" stroke="rgba(51,65,85,0.45)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M108 184c20 12 34 17 52 17s32-5 52-17" fill="none" stroke="rgba(51,65,85,0.45)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M108 184c-13 12-18 25-18 42" fill="none" stroke="rgba(51,65,85,0.35)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M212 184c13 12 18 25 18 42" fill="none" stroke="rgba(51,65,85,0.35)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M160 208c-16 16-24 33-24 54" fill="none" stroke="rgba(51,65,85,0.35)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M160 208c16 16 24 33 24 54" fill="none" stroke="rgba(51,65,85,0.35)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M136 262c-10 35-16 62-16 86" fill="none" stroke="rgba(51,65,85,0.35)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M184 262c10 35 16 62 16 86" fill="none" stroke="rgba(51,65,85,0.35)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={activeSound.markX * 3.2} cy={activeSound.markY * 4} r="18" fill="rgba(198,106,24,0.15)" />
        <circle cx={activeSound.markX * 3.2} cy={activeSound.markY * 4} r="9" fill={ACCENT} />
      </svg>
      {lessonData.bodySounds.map((sound) => {
        const isActive = sound.id === activeSound.id;
        return (
          <button
            key={sound.id}
            type="button"
            aria-label={`Mostra ${sound.label}`}
            className={cn(
              RING,
              "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-4 py-2 text-sm font-medium transition duration-200",
              isActive
                ? "border-[#c66a18] bg-[#fff1e2] text-[#8a4d18]"
                : "border-slate-200 bg-[#f5f3ee] text-slate-600 hover:border-slate-300 hover:bg-[#ece8df]"
            )}
            style={{ left: `${sound.buttonX}%`, top: `${sound.buttonY}%` }}
            onClick={() => onSelect(sound.id)}
          >
            {sound.label}
          </button>
        );
      })}
    </div>
  );
}

function BodyInstrumentSection() {
  const section = getSection("body");
  const [activeId, setActiveId] = useState(lessonData.bodySounds[0].id);

  const activeSound = lessonData.bodySounds.find((sound) => sound.id === activeId) || lessonData.bodySounds[0];

  return (
    <SectionShell id={section.id} backgroundClass="bg-[#fbfbf9]" className="py-20 sm:py-28">
      <div className={cn("grid gap-14 lg:grid-cols-[minmax(25rem,0.95fr)_minmax(0,1.05fr)] lg:items-center", LESSON_SHELL)} style={{ fontFamily: APP_FONT }}>
        <div>
          <SectionHeading kicker="Il corpo come primo strumento" title={section.title} text={section.text} />
          <div className="mt-10 rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_18px_38px_rgba(15,23,42,0.04)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a86b34]">
              {activeSound.label}
            </p>
            <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
              {activeSound.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {activeSound.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center rounded-full bg-[#fff3e6] px-3 py-1.5 text-sm font-medium text-[#8a4d18]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        <BodyFigure activeSound={activeSound} onSelect={setActiveId} />
      </div>
    </SectionShell>
  );
}

function VoiceMemorySection() {
  const section = getSection("voice");
  const [sequence, setSequence] = useState([]);

  return (
    <SectionShell id={section.id} backgroundClass="bg-white" className={SECTION_SPACE}>
      {() => (
        <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
          <SectionHeading kicker="La voce come memoria" title={section.title} text={section.text} />

          <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,1.1fr)] lg:items-start">
            <SurfacePanel tone="subtle" className="p-6 sm:p-7">
              <p className={SMALL_LABEL}>Sequenza vocale</p>
              <p className={cn("mt-4", BODY_COPY_SOFT)}>
                Tocca le sillabe per costruire una piccola traccia visiva. Non serve audio: qui conta il rapporto tra voce, ritmo e memoria.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {lessonData.voiceSyllables.map((syllable) => (
                  <button
                    key={syllable}
                    type="button"
                    aria-label={`Aggiungi ${syllable}`}
                    onClick={() => setSequence((current) => [...current, syllable].slice(-8))}
                    className={cn(
                      RING,
                      PILL_DEFAULT,
                      "text-base hover:border-[#d8a06d] hover:text-[#8a4d18]"
                    )}
                  >
                    {syllable}
                  </button>
                ))}
                <SecondaryButton onClick={() => setSequence([])}>Svuota</SecondaryButton>
              </div>
            </SurfacePanel>

            <SurfacePanel className="p-6 sm:p-7">
              <p className={SMALL_LABEL}>Sequenza in memoria</p>
              <div className="mt-6 flex min-h-[10rem] flex-wrap content-start gap-3 rounded-[1.5rem] border border-slate-200/70 bg-[#fcfbf8] p-5">
                {sequence.length ? (
                  sequence.map((item, index) => (
                    <ToneTag key={`${item}-${index}`}>{item}</ToneTag>
                  ))
                ) : (
                  <p className={cn("max-w-[28rem]", BODY_COPY_SOFT, "text-slate-400")}>
                    Tocca le sillabe. La sequenza apparira qui e mostrera come la voce possa organizzare il tempo e fissarsi nella memoria.
                  </p>
                )}
              </div>
              <div className="mt-6 border-t border-slate-200/70 pt-5">
                <p className={BODY_COPY}>{section.question}</p>
              </div>
            </SurfacePanel>
          </div>
        </div>
      )}
    </SectionShell>
  );
}

function GestureTimeline({ steps, visible }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!visible) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % steps.length);
    }, 1500);
    return () => window.clearInterval(timer);
  }, [steps.length, visible]);

  return (
    <div>
      <div className="relative mt-10">
        <div className="absolute left-0 right-0 top-5 h-px bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={step}
                type="button"
                aria-label={`Passaggio ${step}`}
                onClick={() => setActiveIndex(index)}
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
                    isActive
                      ? "border-[#c66a18] bg-[#fff1e2] text-[#8a4d18]"
                      : "border-slate-200 bg-[#f5f3ee] text-slate-500"
                  )}
                >
                  {index + 1}
                </span>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{step}</p>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {index === 0 && "Il gesto prepara il tempo e rende leggibile l'attacco."}
                  {index === 1 && "Il suono nasce quando il movimento viene scelto e controllato."}
                  {index === 2 && "Il gruppo ascolta il risultato e percepisce la forma del gesto."}
                  {index === 3 && "La ripetizione trasforma l'azione in memoria condivisa."}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GestureIntentSection() {
  const section = getSection("gesture");

  return (
    <SectionShell id={section.id} backgroundClass="bg-[#f8f6f2]" className={SECTION_SPACE}>
      {({ visible }) => (
        <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
          <SectionHeading kicker="Il gesto come intenzione" title={section.title} text={section.text} />
          <SurfacePanel tone="soft" className="mt-12 p-6 sm:p-8">
            <GestureTimeline steps={section.steps} visible={visible} />
          </SurfacePanel>
          <SurfacePanel tone="subtle" className="mt-8 px-6 py-5">
            <p className="max-w-4xl text-[1rem] leading-8 text-slate-600">{section.activity}</p>
          </SurfacePanel>
        </div>
      )}
    </SectionShell>
  );
}

function SoundTile({ source, isActive, onClick }) {
  return (
    <button
      type="button"
      aria-label={`Apri ${source.label}`}
      onClick={onClick}
      className={cn(
        RING,
        "group rounded-[2rem] border p-5 text-left transition-colors duration-150",
        isActive ? "border-[#c66a18] bg-[#fffaf4]" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-[#f8f6f1]"
      )}
    >
      <div
        className="flex aspect-[4/3] items-center justify-center rounded-[1.6rem]"
        style={{
          backgroundColor: `${source.accent}1a`,
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="h-14 w-14 rounded-full"
            style={{ border: `1px solid ${source.accent}`, background: "rgba(255,255,255,0.75)" }}
          />
          <span className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{source.note}</span>
        </div>
      </div>
      <p className="mt-5 text-lg font-semibold text-slate-900">{source.label}</p>
    </button>
  );
}

function SoundscapeSection() {
  const section = getSection("soundscape");
  const [activeSourceId, setActiveSourceId] = useState(lessonData.soundSources[0].id);
  const activeSource =
    lessonData.soundSources.find((source) => source.id === activeSourceId) || lessonData.soundSources[0];

  return (
    <SectionShell id={section.id} backgroundClass="bg-white" className="py-20 sm:py-28">
      <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
        <SectionHeading kicker="L'ambiente come paesaggio sonoro" title={section.title} text={section.text} />

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.18fr)_minmax(24rem,0.82fr)]">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {lessonData.soundSources.map((source) => (
              <SoundTile
                key={source.id}
                source={source}
                isActive={source.id === activeSourceId}
                onClick={() => setActiveSourceId(source.id)}
              />
            ))}
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-[#f8f6f2] p-7 shadow-[0_18px_38px_rgba(15,23,42,0.04)]">
            <SectionKicker>Slot attivo</SectionKicker>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
              {activeSource.label}
            </h3>
            <p className="mt-5 text-lg leading-8 text-slate-600">{activeSource.prompt}</p>
            <div className="mt-8 space-y-4">
              <p className="text-base leading-7 text-slate-500">E un suono continuo o spezzato?</p>
              <p className="text-base leading-7 text-slate-500">E forte o leggero?</p>
              <p className="text-base leading-7 text-slate-500">E vicino o lontano?</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {activeSource.details.map((detail) => (
                <span
                  key={detail}
                  className="inline-flex rounded-full border border-white/90 bg-white px-3 py-1.5 text-sm font-medium text-slate-600"
                >
                  {detail}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function LivingConceptMap() {
  const section = getSection("concept-map");
  const floatingMapRef = useRef(null);
  const nodeLookup = useMemo(() => {
    return new Map(lessonData.conceptNodes.map((node) => [node.id, node]));
  }, []);
  const conceptLines = useMemo(() => {
    const seen = new Set();

    return lessonData.conceptNodes.flatMap((node) =>
      node.links.flatMap((targetId) => {
        const target = nodeLookup.get(targetId);
        const sourceNumber = conceptFloatingMeta[node.id]?.number;
        const targetNumber = conceptFloatingMeta[targetId]?.number;

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
        <SectionHeading kicker="Mappa viva dei concetti" title={section.title} text={section.text} />

        <div ref={floatingMapRef} className="mt-14">
          <div className="nucleus-topic-map lesson-floating-map lesson-floating-map--concepts" data-topic-map>
            <svg className="nucleus-topic-map__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {conceptLines.map((line) => (
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
              {lessonData.conceptNodes.map((node) => {
                const meta = conceptFloatingMeta[node.id] || { number: node.id, category: "concetto" };
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
                    <small>{node.example}</small>
                    {relatedTitles ? (
                      <span className="nucleus-topic-node__related">Si collega a: {relatedTitles}</span>
                    ) : null}
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

function BodyPercussionSequencer() {
  const section = getSection("percussion");
  const [selectedStepType, setSelectedStepType] = useState(lessonData.percussionSteps[0].id);
  const [steps, setSteps] = useState(["clap", "thigh", "clap", "stomp", "clap", "thigh", "pause", "voice"]);
  const [playingIndex, setPlayingIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) {
      setPlayingIndex(-1);
      return undefined;
    }
    if (playingIndex >= steps.length - 1) {
      const doneTimer = window.setTimeout(() => {
        setPlayingIndex(-1);
        setIsPlaying(false);
      }, 260);
      return () => window.clearTimeout(doneTimer);
    }
    const timer = window.setTimeout(() => {
      setPlayingIndex((current) => current + 1);
    }, 340);
    return () => window.clearTimeout(timer);
  }, [isPlaying, playingIndex, steps.length]);

  const optionById = useMemo(() => {
    return Object.fromEntries(lessonData.percussionSteps.map((option) => [option.id, option]));
  }, []);

  return (
    <SectionShell id={section.id} backgroundClass="bg-white" className={SECTION_SPACE}>
      <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(24rem,1.08fr)] lg:items-start">
          <div>
            <SectionHeading kicker="Laboratorio di body percussion" title={section.title} text={section.text} />
            <SurfacePanel tone="subtle" className="mt-8 p-6 sm:p-7">
              <div className="space-y-3.5 text-[1rem] leading-8 text-slate-600">
                <p>Scegli tre suoni corporei.</p>
                <p>Mantieni una pulsazione regolare.</p>
                <p>Costruisci una sequenza semplice.</p>
                <p>Ripetila.</p>
                <p>Poi aggiungi una piccola variazione.</p>
              </div>
            </SurfacePanel>
            <div className="mt-8 flex flex-wrap gap-3">
              {lessonData.percussionSteps.map((option) => {
                const isSelected = option.id === selectedStepType;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-label={`Seleziona ${option.longLabel}`}
                    onClick={() => setSelectedStepType(option.id)}
                    className={cn(
                      RING,
                      isSelected ? PILL_ACTIVE : PILL_DEFAULT
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <SurfacePanel tone="soft" className="p-6 sm:p-8">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {steps.map((step, index) => {
                const option = optionById[step];
                const isPlayingNow = playingIndex === index;
                return (
                  <button
                    key={`${step}-${index}`}
                    type="button"
                    aria-label={`Tempo ${index + 1}, ${option.longLabel}`}
                    onClick={() =>
                      setSteps((current) =>
                        current.map((value, stepIndex) => (stepIndex === index ? selectedStepType : value))
                      )
                    }
                    className={cn(
                      RING,
                      "flex min-h-[8.75rem] flex-col items-center justify-center rounded-[1.35rem] border border-solid border-slate-200/70 bg-white px-4 py-5 text-center transition-colors duration-150 hover:border-slate-300 hover:bg-[#f8f6f1]",
                      isPlayingNow && "border-[#c66a18] bg-[#fff1e2]"
                    )}
                  >
                    <span className={cn("block", SMALL_LABEL)}>
                      tempo {index + 1}
                    </span>
                    <span className="mt-3 block text-[1.95rem] font-semibold tracking-[0.08em] text-slate-950">
                      {option.short}
                    </span>
                    <span className="mt-2 block text-[0.92rem] leading-5 text-slate-500">{option.longLabel}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton
                onClick={() => {
                  setPlayingIndex(0);
                  setIsPlaying(true);
                }}
              >
                Ripeti sequenza
              </PrimaryButton>
              <SecondaryButton
                onClick={() =>
                  setSteps((current) => {
                    const next = [...current];
                    next[6] = next[6] === "pause" ? "snap" : "pause";
                    next[7] = next[7] === "voice" ? "clap" : "voice";
                    return next;
                  })
                }
              >
                Aggiungi variazione
              </SecondaryButton>
              <SecondaryButton onClick={() => setSteps(Array.from({ length: 8 }, () => "pause"))}>
                Svuota
              </SecondaryButton>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-200/70 pt-6">
              {lessonData.percussionSteps.map((option) => (
                <ToneTag key={option.id} className="border-slate-200/70 bg-white text-slate-600">
                  {option.label} = {option.longLabel}
                </ToneTag>
              ))}
            </div>
          </SurfacePanel>
        </div>
      </div>
    </SectionShell>
  );
}

function GraphicScoreBuilder() {
  const section = getSection("graphic-score");
  const [activeSymbolId, setActiveSymbolId] = useState(lessonData.graphicSymbols[0].id);
  const [score, setScore] = useState(["●", "▲", "●", "■", "●", "▲", "—", "◆"]);

  const activeSymbol =
    lessonData.graphicSymbols.find((item) => item.id === activeSymbolId) || lessonData.graphicSymbols[0];

  return (
    <SectionShell id={section.id} backgroundClass="bg-[#fbfbf9]" className={SECTION_SPACE}>
      <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
        <SectionHeading kicker="Partitura grafica" title={section.title} text={section.text} />

        <div className="mt-10 flex flex-wrap gap-3">
          {lessonData.graphicSymbols.map((item) => {
            const isActive = item.id === activeSymbolId;
            return (
              <button
                key={item.id}
                type="button"
                aria-label={`Seleziona simbolo ${item.label}`}
                onClick={() => setActiveSymbolId(item.id)}
                className={cn(
                  RING,
                  isActive ? PILL_ACTIVE : PILL_DEFAULT,
                  "gap-2"
                )}
              >
                <span className="text-lg">{item.symbol}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <SurfacePanel tone="soft" className="mt-10 p-6 sm:p-8">
          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="grid min-w-[60rem] grid-cols-8 gap-4">
              {score.map((symbol, index) => (
                <button
                  key={`${symbol}-${index}`}
                  type="button"
                  aria-label={`Tempo ${index + 1}`}
                  onClick={() =>
                    setScore((current) =>
                      current.map((value, stepIndex) => (stepIndex === index ? activeSymbol.symbol : value))
                    )
                  }
                  className={cn(
                    RING,
                    "rounded-[1.45rem] border border-solid border-slate-200/70 bg-white px-4 py-6 text-center transition-colors duration-150 hover:border-slate-300 hover:bg-[#f8f6f1]"
                  )}
                >
                  <span className={cn("block", SMALL_LABEL)}>tempo {index + 1}</span>
                  <span className="mt-4 block text-4xl font-semibold text-slate-950">{symbol}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(21rem,0.92fr)]">
            <SurfacePanel tone="subtle" className="px-6 py-5">
              <p className={BODY_COPY}>{section.activity}</p>
            </SurfacePanel>
            <SurfacePanel tone="subtle" className="px-6 py-5">
              <div className="space-y-4">
                {section.questions.map((question) => (
                  <p key={question} className={BODY_COPY_SOFT}>
                    {question}
                  </p>
                ))}
              </div>
            </SurfacePanel>
          </div>
        </SurfacePanel>
      </div>
    </SectionShell>
  );
}

function SharingRubric() {
  const section = getSection("sharing");
  const levels = ["Da costruire", "Essenziale", "Chiara", "Efficace"];
  const [rubric, setRubric] = useState({});

  return (
    <SectionShell id={section.id} backgroundClass="bg-white" className={SECTION_SPACE}>
      <div className={LESSON_SHELL} style={{ fontFamily: APP_FONT }}>
        <SectionHeading kicker="Condivisione e confronto" title={section.title} text={section.text} />

        <SurfacePanel tone="soft" className="mt-14 overflow-hidden">
          <div className="grid gap-0 border-b border-slate-200/70 bg-white/60 px-6 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,0.75fr))]">
            <span>Criteri</span>
            {levels.map((level) => (
              <span key={level} className="hidden text-center lg:block">
                {level}
              </span>
            ))}
          </div>

          {lessonData.rubricCriteria.map((criterion) => (
            <div
              key={criterion}
              className="grid gap-4 border-b border-slate-200/70 px-6 py-6 last:border-b-0 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,0.75fr))] lg:items-center"
            >
              <div>
                <p className="text-lg font-medium text-slate-900">{criterion}</p>
                {rubric[criterion] ? (
                  <p className="mt-2 text-sm text-slate-500">Livello selezionato: {rubric[criterion]}</p>
                ) : null}
              </div>
              {levels.map((level) => {
                const isSelected = rubric[criterion] === level;
                return (
                  <button
                    key={`${criterion}-${level}`}
                    type="button"
                    aria-label={`${criterion}, livello ${level}`}
                    onClick={() => setRubric((current) => ({ ...current, [criterion]: level }))}
                    className={cn(
                      RING,
                      isSelected ? PILL_ACTIVE : PILL_DEFAULT,
                      "justify-center"
                    )}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          ))}
        </SurfacePanel>
      </div>
    </SectionShell>
  );
}

function FinalQuiz() {
  const section = getSection("final-quiz");
  const [answers, setAnswers] = useState({});

  return (
    <SectionShell id={section.id} backgroundClass="bg-[#fbfbf9]" className={SECTION_SPACE}>
      <div className={LESSON_SHELL_COMPACT} style={{ fontFamily: APP_FONT }}>
        <SurfacePanel className="px-6 py-10 sm:px-10 sm:py-12">
          <SectionHeading kicker="Verifica finale" title={section.title} text={section.text} align="center" />

          <div className="mt-14 divide-y divide-slate-200/80">
            {lessonData.quizQuestions.map((question, questionIndex) => {
              const selectedOptionId = answers[question.id];
              const selectedOption = question.options.find((option) => option.id === selectedOptionId);

              return (
                <div key={question.id} className="py-8 first:pt-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Domanda {questionIndex + 1}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                    {question.prompt}
                  </h3>
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
                              <ToneTag className="shrink-0 border-slate-200/80 bg-white text-slate-600">
                                corretta
                              </ToneTag>
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
                        selectedOption.correct
                          ? "border-[#e6c8a8] bg-[#fff6ed] text-slate-800"
                          : "border-slate-200 bg-[#fcfbf8] text-slate-800"
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
            <p className="mx-auto max-w-3xl text-[1.02rem] leading-8 text-slate-600">
              Il primo strumento musicale puo essere il corpo.
            </p>
            <p className="mt-6 text-[2.6rem] font-semibold tracking-[-0.05em] text-slate-950 sm:text-[3.35rem]">
              {section.closing}
            </p>
          </div>
        </SurfacePanel>
      </div>
    </SectionShell>
  );
}

function LessonProductPage() {
  return (
    <div style={{ fontFamily: APP_FONT }} className="accordia-lesson-page bg-[#fbfaf7] text-slate-950 antialiased">
      <LessonHero />
      <ListeningTimerSection />
      <OriginStorySection />
      <VoiceMemorySection />
      <LivingConceptMap />
      <BodyPercussionSequencer />
      <GraphicScoreBuilder />
      <SharingRubric />
      <FinalQuiz />
    </div>
  );
}

export {
  LessonProductPage,
  LessonHero,
  ListeningTimerSection,
  OriginStorySection,
  BodyInstrumentSection,
  VoiceMemorySection,
  GestureIntentSection,
  SoundscapeSection,
  LivingConceptMap,
  BodyPercussionSequencer,
  GraphicScoreBuilder,
  SharingRubric,
  FinalQuiz,
  lessonData,
};

export default function CorpoVoceGestoLesson() {
  return <LessonProductPage />;
}
