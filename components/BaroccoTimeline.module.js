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
    visual: {
      src: "../../../../assets/barocco-orfeo-16x9-originale.png?v=20260516a",
      alt: "Orfeo con la lira in primo piano, illuminato da una luce dorata, con figure in ombra e architetture sullo sfondo.",
      position: "38% 48%",
      scale: 1.22,
      origin: "center center",
      copySide: "left"
    }
  },
  {
    id: "1618-guerra-trentanni",
    year: "1618",
    title: "Guerra dei Trent’anni",
    subtitle: "Europa in conflitto",
    category: "Storia",
    description: "Inizia una guerra lunga e devastante che coinvolge molte potenze europee e modifica gli equilibri del continente.",
    insight: "Il conflitto termina nel 1648 con la Pace di Westfalia. L’Europa esce profondamente trasformata, sia sul piano politico sia su quello religioso.",
    visual: {
      src: "../../../../assets/barocco-guerra-trentanni-originale.png?v=20260516a",
      alt: "Scena di battaglia della Guerra dei Trent'anni con cavaliere armato in primo piano sulla destra, fumo e citta in fiamme sullo sfondo.",
      position: "84% 52%",
      scale: 1.12,
      origin: "center center",
      copySide: "left"
    }
  },
  {
    id: "1630-peste",
    year: "1630",
    title: "La peste in Europa",
    subtitle: "Crisi sociale e sanitaria",
    category: "Storia",
    description: "Una grave epidemia colpisce vaste aree europee, aggravando gli effetti di guerre, carestie e instabilità economica.",
    insight: "La peste del Seicento segna città e campagne, riduce la popolazione e lascia una traccia profonda nella memoria collettiva.",
    visual: {
      src: "../../../../assets/barocco-peste-originale.png?v=20260516a",
      alt: "Un medico della peste in primo piano osserva una scena urbana di malattia e assistenza, con i malati al centro e il carro dei corpi sullo sfondo.",
      position: "36% 49%",
      scale: 1.12,
      origin: "center center",
      copySide: "right"
    }
  },
  {
    id: "1643-luigi-xiv",
    year: "1643",
    title: "Inizia il regno di Luigi XIV",
    subtitle: "Il Re Sole",
    category: "Storia",
    description: "Luigi XIV sale al trono di Francia. Il suo regno diventerà il modello più celebre di monarchia assoluta.",
    insight: "Versailles diventa il centro simbolico del potere monarchico e un riferimento europeo per arti, cerimoniale e spettacolo.",
    visual: {
      src: "../../../../assets/barocco-luigi-xiv-originale.png?v=20260516a",
      alt: "Il giovane Luigi XIV in abiti regali su una scalinata cerimoniale, circondato da nobili e clero davanti a una grande architettura di corte.",
      position: "40% 44%",
      scale: 1.1,
      origin: "center center",
      copySide: "right"
    }
  },
  {
    id: "1648-westfalia",
    year: "1648",
    title: "Pace di Westfalia",
    subtitle: "Fine della Guerra dei Trent’anni",
    category: "Storia",
    description: "I trattati di Westfalia pongono fine al conflitto iniziato nel 1618 e ridisegnano l’assetto politico europeo.",
    insight: "Si consolida il principio della sovranità degli Stati, elemento decisivo nella nascita della diplomazia moderna.",
    visual: {
      src: "../../../../assets/barocco-westfalia-originale.png?v=20260516a",
      alt: "Delegati e dignitari attorno a un tavolo di trattativa, con documenti, candele e una città sullo sfondo dopo la fine della guerra.",
      position: "58% 52%",
      scale: 1.08,
      origin: "center center",
      copySide: "left"
    }
  },
  {
    id: "1682-pietro-grande",
    year: "1682",
    title: "Pietro il Grande diventa zar",
    subtitle: "La Russia si trasforma",
    category: "Storia",
    description: "Pietro I avvia una stagione di riforme che modernizza lo Stato russo e rafforza il suo ruolo internazionale.",
    insight: "La Russia guarda sempre più all’Europa occidentale, adottando modelli tecnici, militari e amministrativi innovativi."
  },
  {
    id: "1685-bach-handel",
    year: "1685",
    title: "Nascono Bach e Händel",
    subtitle: "Due protagonisti del Barocco",
    category: "Musica",
    description: "Nello stesso anno nascono Johann Sebastian Bach e Georg Friedrich Händel, due figure centrali della musica europea.",
    insight: "Bach porta al vertice il contrappunto e la scrittura strumentale; Händel domina opera, oratorio e musica celebrativa.",
    visual: {
      src: "../../../../assets/barocco-bach-handel-originale.png?v=20260516a",
      alt: "Johann Sebastian Bach all'organo e Georg Friedrich Händel in un interno teatrale, affiancati come due grandi protagonisti del Barocco musicale.",
      position: "60% 49%",
      shiftY: "-6%",
      scale: 1.12,
      origin: "center center",
      copySide: "left"
    }
  },
  {
    id: "1711-fortepiano",
    year: "1711",
    title: "Nasce il fortepiano",
    subtitle: "Bartolomeo Cristofori",
    category: "Musica",
    description: "Cristofori mette a punto uno strumento capace di variare l’intensità del suono in base al tocco dell’esecutore.",
    insight: "Il fortepiano apre la strada al pianoforte moderno e introduce una nuova gamma di sfumature espressive rispetto al clavicembalo."
  },
  {
    id: "1715-morte-luigi-xiv",
    year: "1715",
    title: "Muore Luigi XIV",
    subtitle: "Si chiude un’epoca",
    category: "Storia",
    description: "La morte del Re Sole conclude uno dei regni più lunghi e influenti dell’età moderna.",
    insight: "Il suo modello di potere aveva inciso profondamente su politica, architettura, teatro, danza e vita musicale di corte."
  },
  {
    id: "1725-quattro-stagioni",
    year: "1725",
    title: "Le quattro stagioni",
    subtitle: "Antonio Vivaldi",
    category: "Musica",
    description: "Vengono pubblicati i quattro celebri concerti di Vivaldi, tra le pagine più riconoscibili del repertorio barocco.",
    insight: "La musica suggerisce immagini precise: il canto degli uccelli, il temporale, il gelo, la quiete dei paesaggi stagionali."
  },
  {
    id: "1760-rivoluzione-industriale",
    year: "1760",
    title: "Rivoluzione industriale",
    subtitle: "Inizia in Inghilterra",
    category: "Storia",
    description: "In Gran Bretagna prende avvio un processo di trasformazione produttiva e tecnologica destinato a cambiare il mondo.",
    insight: "L’evento appartiene a una fase successiva al Barocco, ma aiuta a percepire il passaggio verso una società moderna e meccanizzata."
  }
];

const layoutPresets = {
  desktop: {
    stepX: 150,
    stepY: 42,
    sideScale: 0.82,
    sideOpacity: 0.42,
    farOpacity: 0.12,
    maxDistance: 2
  },
  tablet: {
    stepX: 126,
    stepY: 34,
    sideScale: 0.86,
    sideOpacity: 0.34,
    farOpacity: 0.08,
    maxDistance: 2
  },
  mobile: {
    stepX: 96,
    stepY: 28,
    sideScale: 0.88,
    sideOpacity: 0.24,
    farOpacity: 0,
    maxDistance: 1
  }
};

function wrapIndex(index, length) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

function circularOffset(index, activeIndex, length) {
  const direct = index - activeIndex;
  const wrapped = direct > 0 ? direct - length : direct + length;
  return Math.abs(direct) <= Math.abs(wrapped) ? direct : wrapped;
}

function getViewportMode() {
  if (typeof window === "undefined") return "desktop";
  if (window.innerWidth <= 680) return "mobile";
  if (window.innerWidth <= 1180) return "tablet";
  return "desktop";
}

function iconArrow(direction) {
  const path = direction === "left"
    ? "M19 12H5 M12 19l-7-7 7-7"
    : "M5 12h14 M12 5l7 7-7 7";
  return h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true"
    },
    h("path", { d: path })
  );
}

function iconPlay(isPlaying) {
  return isPlaying
    ? h(
        "svg",
        {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": "true"
        },
        h("path", { d: "M10 6v12 M14 6v12" })
      )
    : h(
        "svg",
        {
          viewBox: "0 0 24 24",
          fill: "currentColor",
          "aria-hidden": "true"
        },
        h("path", { d: "M8 5.5c0-.8.9-1.3 1.6-.9l9 5.5c.7.4.7 1.4 0 1.8l-9 5.5c-.7.4-1.6-.1-1.6-.9v-11Z" })
      );
}

function BaroccoTimeline() {
  const itemCount = timelineItems.length;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [viewportMode, setViewportMode] = React.useState(getViewportMode);
  const activeItem = timelineItems[activeIndex];
  const activeNarrative = `${activeItem.description} ${activeItem.insight}`;
  const layout = layoutPresets[viewportMode];

  React.useEffect(() => {
    const handleResize = () => setViewportMode(getViewportMode());
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (!isPlaying || itemCount <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => wrapIndex(current + 1, itemCount));
    }, 4300);
    return () => window.clearInterval(timer);
  }, [isPlaying, itemCount]);

  const visibleNodes = React.useMemo(() => {
    return timelineItems.map((item, index) => {
      const offset = circularOffset(index, activeIndex, itemCount);
      const distance = Math.abs(offset);
      const isBeyondLimit = distance > layout.maxDistance;
      return {
        ...item,
        offset,
        x: offset * layout.stepX,
        y: distance * layout.stepY,
        scale: offset === 0 ? 1 : layout.sideScale,
        opacity: offset === 0 ? 1 : isBeyondLimit ? layout.farOpacity : layout.sideOpacity,
        zIndex: 40 - distance,
        hidden: isBeyondLimit && layout.farOpacity === 0
      };
    });
  }, [activeIndex, itemCount, layout]);

  const goPrev = React.useCallback(() => {
    setIsPlaying(false);
    setActiveIndex((current) => wrapIndex(current - 1, itemCount));
  }, [itemCount]);

  const goNext = React.useCallback(() => {
    setIsPlaying(false);
    setActiveIndex((current) => wrapIndex(current + 1, itemCount));
  }, [itemCount]);

  const selectItem = React.useCallback((index) => {
    setIsPlaying(false);
    setActiveIndex(wrapIndex(index, itemCount));
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

  return h(
    "section",
    {
      className: `barocco-timeline barocco-timeline--${viewportMode}`,
      "aria-labelledby": "barocco-timeline-title"
    },
    h(
      "div",
      { className: "barocco-timeline__head" },
      h("div", null,
        h("p", { className: "barocco-timeline__eyebrow" }, "Asse cronologico"),
        h("h2", { id: "barocco-timeline-title" }, "Timeline"),
        h("p", { className: "barocco-timeline__intro" }, "Eventi di storia e musica per attraversare il Barocco lungo un’unica traiettoria visiva.")
      ),
      h(
        "div",
        { className: "barocco-timeline__progress", "aria-label": "Posizione nella timeline" },
        h("span", null, "Evento"),
        h("strong", null, `${String(activeIndex + 1).padStart(2, "0")}/${String(itemCount).padStart(2, "0")}`),
        h("i", null, h("b", { style: { width: `${((activeIndex + 1) / itemCount) * 100}%` } }))
      )
    ),
    h(
      "div",
      { className: "barocco-timeline__stage" },
      h("div", { className: "barocco-timeline__signal", "aria-hidden": "true" }),
      h("div", { className: "barocco-timeline__scan", "aria-hidden": "true" }),
      h("div", { className: "barocco-timeline__rings", "aria-hidden": "true" }, h("span"), h("span"), h("span")),
      h(
        "div",
        { className: "barocco-timeline__nodes" },
        visibleNodes.map((node, index) => {
          const isActive = index === activeIndex;
          return h(
            "button",
            {
              key: node.id,
              type: "button",
              className: `barocco-timeline-card${node.visual ? " barocco-timeline-card--featured" : ""}${isActive ? " is-active" : ""}${node.hidden ? " is-hidden" : ""}`,
              onClick: () => selectItem(index),
              "aria-current": isActive ? "true" : undefined,
              "aria-label": `${node.year} — ${node.title}`,
              style: {
                transform: `translate3d(${node.x}px, ${node.y}px, 0) scale(${node.scale})`,
                opacity: node.opacity,
                zIndex: node.zIndex,
                pointerEvents: node.hidden ? "none" : "auto"
              }
            },
            h("span", { className: "barocco-timeline-card__year" }, node.year),
            h("strong", { className: "barocco-timeline-card__title" }, node.title),
            h("small", { className: "barocco-timeline-card__category" }, node.category),
            h("em", { className: "barocco-timeline-card__subtitle" }, node.subtitle),
            h("i", { className: "barocco-timeline-card__stem", "aria-hidden": "true" }),
            h("i", { className: "barocco-timeline-card__dot", "aria-hidden": "true" })
          );
        })
      ),
      h(
        "div",
        { className: "barocco-timeline__controls" },
        h("button", { type: "button", onClick: goPrev, "aria-label": "Evento precedente" }, iconArrow("left")),
        h("button", { type: "button", className: "is-primary", onClick: () => setIsPlaying((current) => !current), "aria-pressed": isPlaying }, iconPlay(isPlaying), h("span", null, isPlaying ? "Ferma" : "Avvia")),
        h("button", { type: "button", onClick: goNext, "aria-label": "Evento successivo" }, iconArrow("right"))
      )
    ),
    h(
      "article",
      { className: `barocco-timeline-detail${activeItem.visual ? " barocco-timeline-detail--immersive" : ""}`, "aria-live": "polite" },
      activeItem.visual
        ? h(
            "figure",
            { className: "barocco-timeline-detail__hero" },
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
            }),
            h("div", { className: "barocco-timeline-detail__hero-wash", "aria-hidden": "true" }),
            h(
              "div",
              {
                className: `barocco-timeline-detail__hero-grid${activeItem.visual.copySide ? ` barocco-timeline-detail__hero-grid--copy-${activeItem.visual.copySide}` : ""}`
              },
              h(
                "div",
                { className: "barocco-timeline-detail__hero-copy" },
                h("span", null, activeItem.year),
                h("h3", null, activeItem.title),
                h("p", { className: "barocco-timeline-detail__hero-subtitle" }, activeItem.subtitle),
                h(
                  "section",
                  { className: "barocco-timeline-detail__copy barocco-timeline-detail__copy--overlay" },
                  h("p", null, activeNarrative)
                )
              )
            )
          )
        : [
            h("div", { className: "barocco-timeline-detail__header", key: "header" },
              h("span", null, activeItem.year),
              h("h3", null, activeItem.title),
              h("p", null, activeItem.subtitle)
            ),
            h("div", { className: "barocco-timeline-detail__body", key: "body" },
              h(
                "section",
                { className: "barocco-timeline-detail__copy" },
                h("strong", null, "Approfondimento"),
                h("p", null, activeNarrative)
              )
            )
          ]
    )
  );
}

export default BaroccoTimeline;
