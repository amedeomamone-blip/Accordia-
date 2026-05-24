import React from "https://esm.sh/react@18";

const h = React.createElement;

const timelineItems = [
  {
    id: "1607-orfeo",
    year: "1607",
    title: "L’Orfeo",
    subtitle: "Claudio Monteverdi",
    category: "Musica",
    description: "Va in scena a Mantova L’Orfeo di Claudio Monteverdi, una delle prime grandi opere della storia della musica.",
    insight: "Monteverdi unisce parola, scena e suono con una forza espressiva nuova. L’opera diventa racconto teatrale in musica, non semplice accompagnamento del testo.",
    visual: { src: "../../../../assets/barocco-orfeo-fascia-timeline.png?v=20260522a", alt: "Illustrazione orizzontale di Orfeo seduto con la lira tra architetture classiche, acquerelli azzurri e linee geometriche dorate.", position: "center center", origin: "center center", copySide: "left" }
  },
  {
    id: "1618-guerra-trentanni",
    year: "1618",
    title: "Guerra dei Trent’anni",
    subtitle: "Europa in conflitto",
    category: "Storia",
    description: "Inizia una guerra lunga e devastante che coinvolge molte potenze europee e modifica gli equilibri del continente.",
    insight: "Il conflitto termina nel 1648 con la Pace di Westfalia. L’Europa esce profondamente trasformata, sia sul piano politico sia su quello religioso.",
    visual: { src: "../../../../assets/barocco-guerra-trentanni-fascia-timeline.png?v=20260524a", alt: "Illustrazione panoramica della Guerra dei Trent'anni con cavaliere a cavallo in primo piano, truppe e citta assediata sullo sfondo.", position: "center center", origin: "center center", copySide: "right" }
  },
  {
    id: "1630-peste",
    year: "1630",
    title: "La peste in Europa",
    subtitle: "Crisi sociale e sanitaria",
    category: "Storia",
    description: "Una grave epidemia colpisce vaste aree europee, aggravando gli effetti di guerre, carestie e instabilità economica.",
    insight: "La peste del Seicento segna città e campagne, riduce la popolazione e lascia una traccia profonda nella memoria collettiva.",
    visual: { src: "../../../../assets/barocco-peste-fascia-timeline.png?v=20260524a", alt: "Illustrazione panoramica della peste in Europa con medico della peste in primo piano e scena urbana di malattia e assistenza sullo sfondo.", position: "center center", origin: "center center", copySide: "right" }
  },
  {
    id: "1643-luigi-xiv",
    year: "1643",
    title: "Inizia il regno di Luigi XIV",
    subtitle: "Il Re Sole",
    category: "Storia",
    description: "Luigi XIV sale al trono di Francia. Il suo regno diventerà il modello più celebre di monarchia assoluta.",
    insight: "Versailles diventa il centro simbolico del potere monarchico e un riferimento europeo per arti, cerimoniale e spettacolo.",
    visual: { src: "../../../../assets/barocco-luigi-xiv-fascia-timeline.png?v=20260524a", alt: "Illustrazione panoramica del giovane Luigi XIV in abiti regali su una scalinata cerimoniale davanti all'architettura di corte.", position: "center center", origin: "center center", copySide: "right" }
  },
  {
    id: "1648-westfalia",
    year: "1648",
    title: "Pace di Westfalia",
    subtitle: "Fine della Guerra dei Trent’anni",
    category: "Storia",
    description: "I trattati di Westfalia pongono fine al conflitto iniziato nel 1618 e ridisegnano l’assetto politico europeo.",
    insight: "Si consolida il principio della sovranità degli Stati, elemento decisivo nella nascita della diplomazia moderna.",
    visual: { src: "../../../../assets/barocco-westfalia-fascia-timeline.png?v=20260524a", alt: "Illustrazione panoramica della Pace di Westfalia con delegati e dignitari raccolti attorno a un tavolo di trattativa.", position: "center center", origin: "center center", copySide: "left" }
  },
  {
    id: "1682-pietro-grande",
    year: "1682",
    title: "Pietro il Grande diventa zar",
    subtitle: "La Russia si trasforma",
    category: "Storia",
    description: "Pietro I avvia una stagione di riforme che modernizza lo Stato russo e rafforza il suo ruolo internazionale.",
    insight: "La Russia guarda sempre più all’Europa occidentale, adottando modelli tecnici, militari e amministrativi innovativi.",
    visual: { src: "../../../../assets/barocco-pietro-grande-fascia-timeline.png?v=20260524a", alt: "Illustrazione panoramica di Pietro il Grande in abiti cerimoniali al centro di una proclamazione pubblica, con dignitari e cupole russe.", position: "center center", origin: "center center", copySide: "right" }
  },
  {
    id: "1685-bach-handel",
    year: "1685",
    title: "Nascono Bach e Händel",
    subtitle: "Due protagonisti del Barocco",
    category: "Musica",
    description: "Nello stesso anno nascono Johann Sebastian Bach e Georg Friedrich Händel, due figure centrali della musica europea.",
    insight: "Bach porta al vertice il contrappunto e la scrittura strumentale; Händel domina opera, oratorio e musica celebrativa.",
    visual: { src: "../../../../assets/barocco-bach-handel-fascia-timeline.png?v=20260524a", alt: "Illustrazione panoramica di Johann Sebastian Bach all'organo e Georg Friedrich Händel in un interno teatrale, come due protagonisti del Barocco musicale.", position: "center center", origin: "center center", copySide: "left" }
  },
  {
    id: "1711-fortepiano",
    year: "1711",
    title: "Nasce il fortepiano",
    subtitle: "Bartolomeo Cristofori",
    category: "Musica",
    description: "Cristofori mette a punto uno strumento capace di variare l’intensità del suono in base al tocco dell’esecutore.",
    insight: "Il fortepiano apre la strada al pianoforte moderno e introduce una nuova gamma di sfumature espressive rispetto al clavicembalo.",
    visual: { src: "../../../../assets/barocco-fortepiano-fascia-timeline.png?v=20260524b", alt: "Illustrazione panoramica di Bartolomeo Cristofori accanto a un fortepiano aperto nella sua bottega, con schizzi tecnici e strumenti.", position: "center center", origin: "center center", copySide: "left" }
  },
  {
    id: "1715-morte-luigi-xiv",
    year: "1715",
    title: "Muore Luigi XIV",
    subtitle: "Si chiude un’epoca",
    category: "Storia",
    description: "La morte del Re Sole conclude uno dei regni più lunghi e influenti dell’età moderna.",
    insight: "Il suo modello di potere aveva inciso profondamente su politica, architettura, teatro, danza e vita musicale di corte.",
    visual: { src: "../../../../assets/barocco-morte-luigi-xiv-fascia-timeline.png?v=20260524a", alt: "Illustrazione panoramica di Luigi XIV sul letto di morte in una camera regale, circondato da cortigiani e simboli del potere.", position: "center center", origin: "center center", copySide: "right" }
  },
  {
    id: "1725-quattro-stagioni",
    year: "1725",
    title: "Le quattro stagioni",
    subtitle: "Antonio Vivaldi",
    category: "Musica",
    description: "Vengono pubblicati i quattro celebri concerti di Vivaldi, tra le pagine più riconoscibili del repertorio barocco.",
    insight: "La musica suggerisce immagini precise: il canto degli uccelli, il temporale, il gelo, la quiete dei paesaggi stagionali.",
    visual: { src: "../../../../assets/barocco-quattro-stagioni-fascia-timeline.png?v=20260524a", alt: "Illustrazione panoramica di Antonio Vivaldi al violino, circondato da allusioni poetiche alle quattro stagioni.", position: "center center", origin: "center center", copySide: "left" }
  },
  {
    id: "1760-rivoluzione-industriale",
    year: "1760",
    title: "Rivoluzione industriale",
    subtitle: "Inizia in Inghilterra",
    category: "Storia",
    description: "In Gran Bretagna prende avvio un processo di trasformazione produttiva e tecnologica destinato a cambiare il mondo.",
    insight: "L’evento appartiene a una fase successiva al Barocco, ma aiuta a percepire il passaggio verso una società moderna e meccanizzata.",
    visual: { src: "../../../../assets/barocco-rivoluzione-industriale-fascia-timeline.png?v=20260524a", alt: "Illustrazione panoramica della rivoluzione industriale con macchine a vapore, fabbriche, ingegneri e lavoratori in un paesaggio produttivo.", position: "center center", origin: "center center", copySide: "left" }
  }
];

function wrapIndex(index, length) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

function getViewportMode() {
  if (typeof window === "undefined") return "desktop";
  if (window.innerWidth <= 960 && window.innerHeight <= 520) return "mobile";
  if (window.innerWidth <= 680) return "mobile";
  if (window.innerWidth <= 1180) return "tablet";
  return "desktop";
}

function BaroccoTimeline() {
  const itemCount = timelineItems.length;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [viewportMode, setViewportMode] = React.useState(getViewportMode);
  const activeItem = timelineItems[activeIndex];
  const activeBody = `${activeItem.description} ${activeItem.insight}`;

  React.useEffect(() => {
    const handleResize = () => setViewportMode(getViewportMode());
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  const selectItem = React.useCallback((index) => {
    setActiveIndex(wrapIndex(index, itemCount));
  }, [itemCount]);

  const goToPrevious = React.useCallback(() => {
    setActiveIndex((current) => wrapIndex(current - 1, itemCount));
  }, [itemCount]);

  const goToNext = React.useCallback(() => {
    setActiveIndex((current) => wrapIndex(current + 1, itemCount));
  }, [itemCount]);

  const heroTransform = React.useMemo(() => {
    if (!activeItem.visual) return undefined;
    const transforms = [];
    if (activeItem.visual.shiftX || activeItem.visual.shiftY) {
      transforms.push(`translate(${activeItem.visual.shiftX || "0"}, ${activeItem.visual.shiftY || "0"})`);
    }
    if (activeItem.visual.scale) {
      transforms.push(`scale(${activeItem.visual.scale})`);
    }
    return transforms.length ? transforms.join(" ") : undefined;
  }, [activeItem]);

  const timelineNavigator = h(
    "nav",
    { className: "barocco-timeline-pillnav", "aria-label": "Navigazione cronologica della timeline" },
    h("div", { className: "barocco-timeline-pillnav__rail" },
      timelineItems.map((item, index) => {
        const isActive = index === activeIndex;
        return h("button", {
          key: item.id,
          type: "button",
          className: `barocco-timeline-pillnav__item${isActive ? " is-active" : ""}`,
          onClick: () => selectItem(index),
          "aria-current": isActive ? "true" : undefined,
          "aria-label": `${item.year} — ${item.title}`,
          title: `${item.year} — ${item.title}`
        },
          isActive
            ? h(React.Fragment, null,
                h("span", { className: "barocco-timeline-pillnav__year" }, item.year),
                h("span", { className: "barocco-timeline-pillnav__title" }, item.title)
              )
            : h("span", { className: "barocco-timeline-pillnav__dot", "aria-hidden": "true" })
        );
      })
    ),
    h("div", { className: "barocco-timeline-pillnav__controls", "aria-label": "Scorri eventi" },
      h("button", { type: "button", className: "barocco-timeline-pillnav__control", onClick: goToPrevious, "aria-label": "Evento precedente" }, "‹"),
      h("button", { type: "button", className: "barocco-timeline-pillnav__control", onClick: goToNext, "aria-label": "Evento successivo" }, "›")
    )
  );

  const timelineMedia = activeItem.visual
    ? h("div", { className: "barocco-timeline-media" },
        h("figure", { className: "barocco-timeline-detail__hero" },
          h("img", {
            className: "barocco-timeline-detail__hero-image",
            src: activeItem.visual.src,
            alt: activeItem.visual.alt,
            loading: "eager",
            decoding: "async",
            style: {
              objectPosition: activeItem.visual.position || "center",
              transformOrigin: activeItem.visual.origin || "center top",
              transform: heroTransform
            }
          })
        ),
        timelineNavigator
      )
    : timelineNavigator;

  return h("section", {
    className: `barocco-timeline barocco-timeline--${viewportMode}`,
    "aria-labelledby": "barocco-timeline-title"
  },
    h("div", { className: "barocco-timeline__head" },
      h("div", null,
        h("p", { className: "barocco-timeline__eyebrow" }, "Timeline"),
        h("h2", { id: "barocco-timeline-title" }, activeItem.title),
        h("p", { className: "barocco-timeline__date" }, activeItem.year),
        h("p", { className: "barocco-timeline__intro" }, activeBody)
      )
    ),
    h("article", {
      className: `barocco-timeline-detail barocco-timeline-detail--fused${activeItem.visual ? " barocco-timeline-detail--immersive" : ""}`,
      "aria-live": "polite"
    }, timelineMedia)
  );
}

export default BaroccoTimeline;
