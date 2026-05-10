import React from "https://esm.sh/react@18";
const GLOBE_RADIUS = 226;
const FULL_ROTATION = Math.PI * 2;
function deg(value) {
  return value * Math.PI / 180;
}
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function normalizeAngle(value) {
  let nextValue = value % FULL_ROTATION;
  if (nextValue > Math.PI) {
    nextValue -= FULL_ROTATION;
  }
  if (nextValue < -Math.PI) {
    nextValue += FULL_ROTATION;
  }
  return nextValue;
}
function shortestAngleDifference(from, to) {
  return normalizeAngle(to - from);
}
function toCartesian(latitude, longitude, radius) {
  const lat = deg(latitude);
  const lon = deg(longitude);
  const cosLat = Math.cos(lat);
  return {
    x: radius * cosLat * Math.sin(lon),
    y: radius * Math.sin(lat),
    z: radius * cosLat * Math.cos(lon)
  };
}
function projectPoint(point, rotationY, rotationX) {
  const cosY = Math.cos(rotationY);
  const sinY = Math.sin(rotationY);
  const xAfterY = point.x * cosY + point.z * sinY;
  const zAfterY = point.z * cosY - point.x * sinY;
  const cosX = Math.cos(rotationX);
  const sinX = Math.sin(rotationX);
  const yAfterX = point.y * cosX - zAfterY * sinX;
  const zAfterX = zAfterY * cosX + point.y * sinX;
  const depth = (zAfterX + GLOBE_RADIUS) / (GLOBE_RADIUS * 2);
  const scale = 0.74 + depth * 0.4;
  const opacity = 0.44 + depth * 0.48;
  return {
    x: xAfterY * 0.9,
    y: yAfterX * 0.9,
    z: zAfterX,
    depth,
    scale,
    opacity
  };
}
function getOrbitRotation(orbit) {
  return {
    x: deg(orbit.focusRotation.x),
    y: normalizeAngle(deg(orbit.focusRotation.y))
  };
}
const orbitDefinitions = [
  {
    id: "storico",
    title: "Contesto storico",
    shortLabel: "Storico",
    subtitle: "Un secolo instabile",
    focusRotation: { x: -8, y: 18 },
    summary: "Il Barocco nasce in un Seicento pieno di tensioni. L'Europa e attraversata da guerre di religione, nuove scoperte scientifiche, crescita economica di alcune potenze e crisi profonde in altri territori. Non e solo un'epoca di lusso e decorazione: e un mondo instabile, fatto di contrasti, paure, trasformazioni e splendore.",
    mustKnow: [
      "Il Seicento e un periodo di forti contrasti.",
      "La Guerra dei Trent'anni segna profondamente l'Europa.",
      "Con Galileo prende forma la moderna ricerca scientifica.",
      "L'Italia e divisa e soggetta a dominazioni straniere.",
      "Venezia, Napoli e Roma restano centri musicali fondamentali."
    ],
    keywords: [
      {
        id: "storico-contrasti",
        title: "Contrasti",
        latitude: 28,
        longitude: -56,
        copy: "Il Seicento e un secolo di opposizioni fortissime: guerra e ricchezza, fede e scienza, splendore delle corti e miseria del popolo. Il Barocco nasce dentro questa tensione. Per questo la sua arte e la sua musica cercano movimento, dramma, effetti intensi e cambi improvvisi."
      },
      {
        id: "storico-guerra",
        title: "Guerra",
        latitude: 8,
        longitude: -26,
        copy: "La Guerra dei Trent'anni e una delle grandi ferite del Seicento europeo. E una guerra politica e religiosa che mostra quanto l'Europa sia instabile. Questa tensione storica aiuta a capire perche il Barocco ami il contrasto, il pathos e la rappresentazione drammatica della realta."
      },
      {
        id: "storico-scienza",
        title: "Scienza",
        latitude: -16,
        longitude: 2,
        copy: "Nel Seicento si sviluppa la moderna ricerca scientifica, con Galileo Galilei come figura centrale. Mentre l'arte cerca stupore e meraviglia, la scienza introduce un nuovo modo di osservare il mondo: esperienza, misura, verifica."
      },
      {
        id: "storico-italia-divisa",
        title: "Italia divisa",
        latitude: -34,
        longitude: 28,
        copy: "L'Italia del Seicento non e unita: e frammentata, sottoposta a dominazioni straniere e colpita da peste e carestie. Eppure conserva un ruolo musicale decisivo. Venezia, Napoli e Roma sono tra i centri piu vivi del Barocco europeo."
      }
    ]
  },
  {
    id: "sociale",
    title: "Contesto sociale",
    shortLabel: "Sociale",
    subtitle: "Potere, corte, Chiesa",
    focusRotation: { x: -10, y: -104 },
    summary: "La societa barocca e fortemente gerarchica. La corte e la Chiesa sono luoghi centrali della vita pubblica e musicale. La musica accompagna cerimonie, feste, riti, celebrazioni e momenti ufficiali. Nel Barocco la musica non e solo intrattenimento: e anche rappresentazione del potere.",
    mustKnow: [
      "Le grandi monarchie nazionali acquistano forza.",
      "La corte e uno dei luoghi principali della musica.",
      "Versailles rappresenta il modello della corte spettacolare.",
      "La Chiesa resta un grande centro di produzione musicale.",
      "Lo splendore barocco convive con forti disuguaglianze sociali."
    ],
    keywords: [
      {
        id: "sociale-corte",
        title: "Corte",
        latitude: 26,
        longitude: 66,
        copy: "La corte e uno dei luoghi simbolici del Barocco. Re, principi e nobili vivono circondati da cerimonie, feste, ricevimenti e musica. La giornata del sovrano puo essere accompagnata da musicisti in momenti pubblici e privati. La musica diventa parte dello spettacolo del potere."
      },
      {
        id: "sociale-potere",
        title: "Potere",
        latitude: 6,
        longitude: 94,
        copy: "Nel Barocco arte e musica servono spesso a celebrare sovrani, principi e autorita religiose. Lo splendore non e casuale: deve impressionare, convincere, mostrare grandezza. La grandiosita sonora e visiva diventa un linguaggio politico e simbolico."
      },
      {
        id: "sociale-chiesa",
        title: "Chiesa",
        latitude: -18,
        longitude: 122,
        copy: "La Chiesa e uno dei grandi centri della musica barocca. La musica sacra assume toni solenni e grandiosi: inni, oratori, messe e composizioni liturgiche servono a rendere piu intensa l'esperienza religiosa e a celebrare la grandezza del sacro."
      },
      {
        id: "sociale-disuguaglianza",
        title: "Disuguaglianza",
        latitude: -36,
        longitude: 150,
        copy: "La societa del Seicento e fortemente diseguale: la nobilta vive nel lusso delle corti, mentre gran parte del popolo vive in condizioni difficili. Il Barocco va letto anche come arte dell'apparenza: uno splendore che spesso copre crisi, poverta e tensioni sociali."
      }
    ]
  },
  {
    id: "artistico",
    title: "Contesto artistico",
    shortLabel: "Artistico",
    subtitle: "Meraviglia e spettacolo",
    focusRotation: { x: -4, y: 146 },
    summary: "Il Barocco vuole colpire chi guarda e chi ascolta. Cerca meraviglia, emozione, teatralita, movimento e ornamento. Lo stile barocco non punta alla semplicita: vuole stupire, coinvolgere e commuovere attraverso effetti forti, contrasti, abbellimenti e grandiosita.",
    mustKnow: [
      "Il termine Barocco indica uno stile bizzarro, ricco e fantasioso.",
      "L'arte barocca vuole stupire e commuovere.",
      "La spettacolarita e una caratteristica centrale.",
      "Gli ornamenti sono presenti nell'arte e nella musica.",
      "L'effetto emotivo e piu importante della misura classica."
    ],
    keywords: [
      {
        id: "artistico-meraviglia",
        title: "Meraviglia",
        latitude: 28,
        longitude: 176,
        copy: "Il Barocco vuole provocare meraviglia. L'opera d'arte deve sorprendere, catturare lo sguardo e coinvolgere chi osserva o ascolta. Anche la musica segue questa direzione: cerca effetti sonori, contrasti, cambi d'intensita e momenti capaci di restare impressi."
      },
      {
        id: "artistico-spettacolarita",
        title: "Spettacolarita",
        latitude: 8,
        longitude: 204,
        copy: "Nel Barocco tutto tende a diventare spettacolo: feste di corte, cerimonie religiose, teatro, musica all'aperto, celebrazioni pubbliche. La musica non e isolata: entra in un sistema fatto di spazi, gesti, immagini, scenografie e rituali collettivi."
      },
      {
        id: "artistico-ornamento",
        title: "Ornamento",
        latitude: -18,
        longitude: 232,
        copy: "L'ornamento e un tratto fondamentale del gusto barocco. Come le chiese si riempiono di stucchi e dorature, anche la musica si arricchisce di abbellimenti, passaggi rapidi, variazioni e fioriture. L'ornamento rende il discorso piu brillante ed espressivo."
      },
      {
        id: "artistico-emozione",
        title: "Emozione",
        latitude: -36,
        longitude: 258,
        copy: "Il Barocco non vuole lasciare indifferenti. Pittura, scultura, teatro e musica cercano di commuovere, agitare, stupire. La musica usa melodie marcate, timbri riconoscibili, tensioni e cambi improvvisi per parlare direttamente all'ascoltatore."
      }
    ]
  },
  {
    id: "musicale",
    title: "Contesto musicale",
    shortLabel: "Musicale",
    subtitle: "Teatro, affetti, strumenti",
    focusRotation: { x: 8, y: -14 },
    summary: "Nel Barocco la musica cambia profondamente. Nasce il melodramma, si affermano il basso continuo, la monodia accompagnata, la teoria degli affetti, il concerto grosso e il concerto solista. Cresce il ruolo degli strumenti, soprattutto archi, violino e clavicembalo. Vivaldi nasce dentro questo mondo: teatro, contrasto, emozione e dialogo strumentale.",
    mustKnow: [
      "Il Barocco musicale si colloca circa tra 1600 e 1750.",
      "Nasce il melodramma, cioe l'opera.",
      "Il basso continuo sostiene canto e melodia.",
      "La musica vuole suscitare affetti, cioe sentimenti riconoscibili.",
      "Gli strumenti diventano sempre piu importanti.",
      "Si affermano concerto grosso e concerto solista.",
      "Vivaldi e centrale per il concerto solista e per la musica descrittiva."
    ],
    keywords: [
      {
        id: "musicale-melodramma",
        title: "Melodramma",
        latitude: 34,
        longitude: 286,
        copy: "Nel Barocco nasce il melodramma, cioe l'opera. Musica, recitazione e scenografia si fondono in un unico grande evento teatrale. La musica non accompagna soltanto una storia: costruisce personaggi, emozioni, tensioni e colpi di scena."
      },
      {
        id: "musicale-basso-continuo",
        title: "Basso continuo",
        latitude: 18,
        longitude: 310,
        copy: "Il basso continuo e una tecnica fondamentale del Barocco. Una linea grave e una serie di accordi sostengono il canto o la melodia. Di solito il clavicembalo realizza gli accordi, mentre strumenti gravi come violoncello, viola da gamba o fagotto rinforzano il basso."
      },
      {
        id: "musicale-affetti",
        title: "Affetti",
        latitude: 2,
        longitude: 334,
        copy: "La teoria degli affetti parte da un'idea chiara: la musica deve suscitare sentimenti riconoscibili. Timbri, tonalita, melodie, ritmo e intensita vengono usati per evocare gioia, dolore, tensione, solennita, agitazione o tenerezza."
      },
      {
        id: "musicale-contrasti-sonori",
        title: "Contrasti sonori",
        latitude: -16,
        longitude: 358,
        copy: "La musica barocca usa spesso contrasti sonori: piano e forte, solo e tutti, chiaro e scuro, calma e agitazione. Questi contrasti creano movimento, sorpresa e dramma. Nei concerti di Vivaldi saranno fondamentali per far sentire dialogo, energia e paesaggio."
      },
      {
        id: "musicale-strumenti",
        title: "Strumenti",
        latitude: -30,
        longitude: 20,
        copy: "Nel Barocco la musica strumentale acquista nuova importanza. Gli strumenti vengono perfezionati o trasformati; iniziano a formarsi orchestre stabili; violino e clavicembalo diventano strumenti centrali. Gli archi sono particolarmente adatti a esprimere movimento, tensione e sfumature emotive."
      },
      {
        id: "musicale-concerto",
        title: "Concerto",
        latitude: -10,
        longitude: 44,
        copy: "Il concerto nasce in Italia alla fine del Seicento e si diffonde in Europa. Puo essere concerto grosso, con un piccolo gruppo di solisti contrapposto all'orchestra, oppure concerto solista, con uno strumento protagonista che dialoga con il gruppo. E la forma che portera direttamente a Vivaldi."
      },
      {
        id: "musicale-italia-musicale",
        title: "Italia musicale",
        latitude: 18,
        longitude: 68,
        copy: "Nel Barocco l'Italia e una guida musicale europea. Venezia, Napoli e Roma sono citta decisive. Da qui si diffondono modelli importanti: melodramma, concerto, stile concertato, musica sacra solenne e una nuova centralita degli strumenti."
      }
    ]
  }
];
const keywords = orbitDefinitions.flatMap(
  (orbit, orbitIndex) => orbit.keywords.map((keyword, keywordIndex) => ({
    ...keyword,
    orbitId: orbit.id,
    orbitIndex,
    keywordIndex,
    orbitTitle: orbit.title,
    orbitShortLabel: orbit.shortLabel,
    orbitSubtitle: orbit.subtitle
  }))
).map((keyword, globalOrder) => ({
  ...keyword,
  globalOrder
}));
const orbitById = new Map(orbitDefinitions.map((orbit) => [orbit.id, orbit]));
const keywordById = new Map(keywords.map((keyword) => [keyword.id, keyword]));
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return void 0;
    }
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }
    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);
  return prefersReducedMotion;
}
function GlobeWireframe() {
  return /* @__PURE__ */ React.createElement(
    "svg",
    {
      className: "vivaldi-globe__wireframe",
      viewBox: "0 0 520 520",
      focusable: "false",
      "aria-hidden": "true"
    },
    /* @__PURE__ */ React.createElement("circle", { cx: "260", cy: "260", r: "206" }),
    /* @__PURE__ */ React.createElement("ellipse", { cx: "260", cy: "260", rx: "206", ry: "78" }),
    /* @__PURE__ */ React.createElement("ellipse", { cx: "260", cy: "260", rx: "206", ry: "140" }),
    /* @__PURE__ */ React.createElement("ellipse", { cx: "260", cy: "260", rx: "206", ry: "34" }),
    /* @__PURE__ */ React.createElement("ellipse", { cx: "260", cy: "260", rx: "78", ry: "206" }),
    /* @__PURE__ */ React.createElement("ellipse", { cx: "260", cy: "260", rx: "138", ry: "206" }),
    /* @__PURE__ */ React.createElement("g", { transform: "rotate(38 260 260)" }, /* @__PURE__ */ React.createElement("ellipse", { cx: "260", cy: "260", rx: "108", ry: "206" })),
    /* @__PURE__ */ React.createElement("g", { transform: "rotate(-38 260 260)" }, /* @__PURE__ */ React.createElement("ellipse", { cx: "260", cy: "260", rx: "108", ry: "206" }))
  );
}
function OrbitSelector({ orbit, index, isActive, onSelect }) {
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: `vivaldi-orbit-selector__button${isActive ? " is-active" : ""}`,
      onClick: () => onSelect(orbit.id),
      "aria-pressed": isActive,
      "aria-controls": "vivaldi-globe-detail-panel"
    },
    /* @__PURE__ */ React.createElement("span", { className: "vivaldi-orbit-selector__index" }, String(index + 1).padStart(2, "0")),
    /* @__PURE__ */ React.createElement("span", { className: "vivaldi-orbit-selector__copy" }, /* @__PURE__ */ React.createElement("strong", null, orbit.title), /* @__PURE__ */ React.createElement("small", null, orbit.subtitle))
  );
}
function KeywordChip({ keyword, isActive, onSelect }) {
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: `vivaldi-globe-keyword${isActive ? " is-active" : ""}`,
      onClick: () => onSelect(keyword.id),
      "aria-pressed": isActive,
      "aria-controls": "vivaldi-globe-detail-panel"
    },
    /* @__PURE__ */ React.createElement("span", null, String(keyword.globalOrder + 1).padStart(2, "0")),
    /* @__PURE__ */ React.createElement("strong", null, keyword.title)
  );
}
function GlobeHotspot({ item, isOrbitActive, isKeywordActive, onSelect }) {
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: `vivaldi-globe-hotspot${isOrbitActive ? " is-orbit-active" : " is-orbit-muted"}${isKeywordActive ? " is-keyword-active" : ""}`,
      style: {
        left: `calc(50% + ${item.x}px)`,
        top: `calc(50% + ${item.y}px)`,
        opacity: item.displayOpacity,
        transform: `translate(-50%, -50%) scale(${item.displayScale})`,
        zIndex: isKeywordActive ? 80 : isOrbitActive ? Math.round(34 + item.depth * 38) : Math.round(10 + item.depth * 18)
      },
      onClick: () => onSelect(item.id),
      onFocus: () => onSelect(item.id),
      "aria-pressed": isKeywordActive,
      "aria-controls": "vivaldi-globe-detail-panel",
      "aria-label": `${item.orbitTitle}: ${item.title}`
    },
    /* @__PURE__ */ React.createElement("span", { className: "vivaldi-globe-hotspot__index" }, String(item.globalOrder + 1).padStart(2, "0")),
    /* @__PURE__ */ React.createElement("strong", null, item.title),
    /* @__PURE__ */ React.createElement("span", { className: "vivaldi-globe-hotspot__hint" }, item.orbitShortLabel)
  );
}
function VivaldiSuonoStagioniLesson() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const initialRotation = React.useMemo(
    () => getOrbitRotation(orbitDefinitions[0]),
    []
  );
  const [rotation, setRotation] = React.useState(initialRotation);
  const [activeOrbitId, setActiveOrbitId] = React.useState(orbitDefinitions[0].id);
  const [activeKeywordId, setActiveKeywordId] = React.useState(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const rotationRef = React.useRef(initialRotation);
  const velocityRef = React.useRef({ x: 0, y: 0 });
  const dragRef = React.useRef({
    active: false,
    moved: false,
    pointerId: null,
    x: 0,
    y: 0
  });
  const suppressSelectionRef = React.useRef(false);
  const activeOrbit = orbitById.get(activeOrbitId) ?? orbitDefinitions[0];
  const targetRotation = React.useMemo(
    () => getOrbitRotation(activeOrbit),
    [activeOrbit]
  );
  const selectOrbit = React.useCallback((orbitId) => {
    if (suppressSelectionRef.current) {
      return;
    }
    setActiveOrbitId(orbitId);
    setActiveKeywordId(null);
  }, []);
  const selectKeyword = React.useCallback((keywordId) => {
    if (suppressSelectionRef.current) {
      return;
    }
    const keyword = keywordById.get(keywordId);
    if (!keyword) {
      return;
    }
    setActiveOrbitId(keyword.orbitId);
    setActiveKeywordId(keyword.id);
  }, []);
  React.useEffect(() => {
    if (!prefersReducedMotion || isDragging) {
      return;
    }
    rotationRef.current = { ...targetRotation };
    velocityRef.current = { x: 0, y: 0 };
    setRotation({ ...targetRotation });
  }, [isDragging, prefersReducedMotion, targetRotation]);
  React.useEffect(() => {
    let animationFrame = 0;
    const animate = () => {
      if (!dragRef.current.active && !prefersReducedMotion) {
        const nextX = clamp(
          rotationRef.current.x + velocityRef.current.x + (targetRotation.x - rotationRef.current.x) * 0.048,
          deg(-34),
          deg(34)
        );
        const nextY = normalizeAngle(
          rotationRef.current.y + velocityRef.current.y + shortestAngleDifference(rotationRef.current.y, targetRotation.y) * 0.042 + 8e-5
        );
        velocityRef.current = {
          x: velocityRef.current.x * 0.92,
          y: velocityRef.current.y * 0.94
        };
        rotationRef.current = {
          x: nextX,
          y: nextY
        };
        setRotation({ ...rotationRef.current });
      }
      animationFrame = window.requestAnimationFrame(animate);
    };
    animationFrame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [prefersReducedMotion, targetRotation]);
  const stopDragging = React.useCallback((frameNode, pointerId) => {
    if (frameNode && typeof frameNode.releasePointerCapture === "function") {
      if (typeof frameNode.hasPointerCapture !== "function" || frameNode.hasPointerCapture(pointerId)) {
        frameNode.releasePointerCapture(pointerId);
      }
    }
    if (dragRef.current.moved) {
      suppressSelectionRef.current = true;
      window.setTimeout(() => {
        suppressSelectionRef.current = false;
      }, 120);
    }
    dragRef.current.active = false;
    dragRef.current.pointerId = null;
    dragRef.current.moved = false;
    setIsDragging(false);
  }, []);
  const handlePointerDown = (event) => {
    if (event.button !== 0) {
      return;
    }
    dragRef.current = {
      active: true,
      moved: false,
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY
    };
    velocityRef.current = { x: 0, y: 0 };
    suppressSelectionRef.current = false;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handlePointerMove = (event) => {
    if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId) {
      return;
    }
    const deltaX = event.clientX - dragRef.current.x;
    const deltaY = event.clientY - dragRef.current.y;
    dragRef.current.x = event.clientX;
    dragRef.current.y = event.clientY;
    if (Math.abs(deltaX) + Math.abs(deltaY) > 0.4) {
      dragRef.current.moved = true;
    }
    const nextRotation = {
      x: clamp(rotationRef.current.x + deltaY * 49e-4, deg(-36), deg(36)),
      y: normalizeAngle(rotationRef.current.y + deltaX * 72e-4)
    };
    rotationRef.current = nextRotation;
    setRotation({ ...nextRotation });
    if (!prefersReducedMotion) {
      velocityRef.current = {
        x: deltaY * 7e-4,
        y: deltaX * 1e-3
      };
    }
  };
  const handlePointerUp = (event) => {
    if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId) {
      return;
    }
    stopDragging(event.currentTarget, event.pointerId);
  };
  const handlePointerCancel = (event) => {
    if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId) {
      return;
    }
    velocityRef.current = { x: 0, y: 0 };
    stopDragging(event.currentTarget, event.pointerId);
  };
  const projectedKeywords = React.useMemo(() => {
    return keywords.map((item) => {
      const projectedPoint = projectPoint(
        toCartesian(item.latitude, item.longitude, GLOBE_RADIUS),
        rotation.y,
        rotation.x
      );
      const isOrbitActive = item.orbitId === activeOrbitId;
      const isKeywordActive = item.id === activeKeywordId;
      return {
        ...item,
        ...projectedPoint,
        displayScale: projectedPoint.scale * (isKeywordActive ? 1.16 : isOrbitActive ? 1.02 : 0.78),
        displayOpacity: clamp(
          projectedPoint.opacity * (isOrbitActive ? 0.98 : 0.46) + (isKeywordActive ? 0.14 : 0),
          isOrbitActive ? 0.48 : 0.2,
          1
        )
      };
    }).sort((first, second) => first.depth - second.depth);
  }, [activeKeywordId, activeOrbitId, rotation.x, rotation.y]);
  const activeOrbitKeywords = React.useMemo(
    () => keywords.filter((keyword) => keyword.orbitId === activeOrbitId),
    [activeOrbitId]
  );
  const activeKeyword = activeKeywordId && keywordById.get(activeKeywordId) || null;
  const activeOrbitIndex = orbitDefinitions.findIndex((orbit) => orbit.id === activeOrbitId);
  const panelMode = activeKeyword ? "keyword" : "orbit";
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-editorial-page vivaldi-lesson", "data-lesson-model": "editoriale" }, /* @__PURE__ */ React.createElement("section", { className: "vivaldi-context-block", id: "lezione", "data-section": "contesto" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell vivaldi-context-block__shell" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-context-head" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-context-head__eyebrow" }, "Il Barocco \xB7 Contesto storico-culturale"), /* @__PURE__ */ React.createElement("h1", null, "Il Barocco in coordinate"), /* @__PURE__ */ React.createElement("p", { className: "vivaldi-context-head__intro" }, "Il Barocco nasce in un secolo di contrasti. Guerre, scienza, potere, spettacolo e musica convivono nello stesso spazio culturale. Prima di ascoltare Vivaldi, esploriamo le coordinate che aiutano a capire il suo mondo: storia, societa, arte e musica.")), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-context-stage" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-stage" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-layout" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-scene" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-stage__topline" }, /* @__PURE__ */ React.createElement("p", null, "Seleziona un'orbita"), /* @__PURE__ */ React.createElement("span", null, "trascina la sfera o attiva una parola chiave")), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-orbit-selector" }, orbitDefinitions.map((orbit, index) => /* @__PURE__ */ React.createElement(
    OrbitSelector,
    {
      key: orbit.id,
      orbit,
      index,
      isActive: orbit.id === activeOrbitId,
      onSelect: selectOrbit
    }
  ))), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `vivaldi-globe-stage__frame${isDragging ? " is-dragging" : ""}`,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel
    },
    orbitDefinitions.map((orbit) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: orbit.id,
        className: `vivaldi-globe-orbit vivaldi-globe-orbit--${orbit.id}${orbit.id === activeOrbitId ? " is-active" : " is-muted"}`,
        "aria-hidden": "true"
      }
    )),
    /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement(GlobeWireframe, null), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe__core-label" }, "BAROCCO")),
    projectedKeywords.map((item) => /* @__PURE__ */ React.createElement(
      GlobeHotspot,
      {
        key: item.id,
        item,
        isOrbitActive: item.orbitId === activeOrbitId,
        isKeywordActive: item.id === activeKeywordId,
        onSelect: selectKeyword
      }
    ))
  )), /* @__PURE__ */ React.createElement(
    "article",
    {
      key: `${activeOrbitId}-${activeKeywordId ?? "summary"}`,
      id: "vivaldi-globe-detail-panel",
      className: "vivaldi-globe-detail-panel",
      "aria-live": "polite"
    },
    /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-detail-panel__meta" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-globe-popup__eyebrow" }, panelMode === "keyword" ? activeOrbit.title : "Orbita selezionata"), /* @__PURE__ */ React.createElement("span", null, panelMode === "keyword" ? "Parola chiave" : `${String(activeOrbitIndex + 1).padStart(2, "0")} / ${String(orbitDefinitions.length).padStart(2, "0")}`)),
    /* @__PURE__ */ React.createElement("h2", null, panelMode === "keyword" ? activeKeyword.title : activeOrbit.title),
    /* @__PURE__ */ React.createElement("p", { className: "vivaldi-globe-detail-panel__subtitle" }, activeOrbit.subtitle),
    panelMode === "keyword" ? /* @__PURE__ */ React.createElement("p", null, activeKeyword.copy) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, activeOrbit.summary), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-panel-block" }, /* @__PURE__ */ React.createElement("h3", null, "Cosa devi sapere"), /* @__PURE__ */ React.createElement("ul", { className: "vivaldi-globe-panel-list" }, activeOrbit.mustKnow.map((item) => /* @__PURE__ */ React.createElement("li", { key: item }, item))))),
    /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-panel-block" }, /* @__PURE__ */ React.createElement("h3", null, "Parole chiave"), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-keyword-grid" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: `vivaldi-globe-keyword vivaldi-globe-keyword--summary${panelMode === "orbit" ? " is-active" : ""}`,
        onClick: () => selectOrbit(activeOrbit.id),
        "aria-pressed": panelMode === "orbit",
        "aria-controls": "vivaldi-globe-detail-panel"
      },
      /* @__PURE__ */ React.createElement("span", null, "00"),
      /* @__PURE__ */ React.createElement("strong", null, "Sintesi orbita")
    ), activeOrbitKeywords.map((keyword) => /* @__PURE__ */ React.createElement(
      KeywordChip,
      {
        key: keyword.id,
        keyword,
        isActive: keyword.id === activeKeywordId,
        onSelect: selectKeyword
      }
    ))))
  )))))));
}
export {
  VivaldiSuonoStagioniLesson as default
};
