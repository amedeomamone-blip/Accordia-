import React from "https://esm.sh/react@18";
const GLOBE_RADIUS = 226;
const FULL_ROTATION = Math.PI * 2;
const GLOBE_VIEWBOX_CENTER = 260;
const CURVE_SAMPLE_STEPS = 80;
const orbitDefinitions = [
  {
    id: "contesto-storico-culturale",
    title: "Contesto storico-culturale",
    subtitle: "Politica, potere, scienza e rappresentazione nel Barocco",
    color: "#b48a79",
    ringClass: "storico",
    focusRotation: { x: -6, y: 24 },
    summary: "Il Barocco prende forma in un'Europa attraversata da guerra, centralizzazione del potere e nuove scoperte. Questo globo raccoglie le parole che fissano il quadro storico e culturale del Seicento.",
    mustKnow: [
      "Il Seicento europeo e segnato da conflitti politici e religiosi.",
      "Le monarchie assolute usano arti e cerimonie per consolidare il potere.",
      "Versailles diventa un modello simbolico della corte barocca.",
      "La rivoluzione scientifica cambia il modo di guardare il mondo."
    ],
    keywords: [
      {
        id: "guerra-trentanni",
        title: "Guerra dei Trent'anni",
        latitude: 34,
        longitude: -76,
        copy: "Tra 1618 e 1648 il cuore dell'Europa e attraversato da una lunga guerra che intreccia religione, dinastie e controllo dei territori. Il clima di instabilita segna il modo in cui il Seicento pensa ordine, fede e rappresentazione del potere.",
        keyIdea: "Il Barocco cresce in un continente segnato dalla crisi."
      },
      {
        id: "monarchia-assoluta",
        title: "Monarchia assoluta",
        latitude: 6,
        longitude: -28,
        copy: "Nel Seicento molti sovrani concentrano l'autorita nelle mani della corona. La corte diventa il centro da cui si organizzano immagine pubblica, rituali e spettacoli.",
        keyIdea: "Il potere si mostra anche attraverso forme, cerimonie e arti."
      },
      {
        id: "luigi-xiv",
        title: "Luigi XIV",
        latitude: -24,
        longitude: 20,
        copy: "Luigi XIV trasforma il sovrano in una presenza scenica permanente. Il re Sole usa danza, musica, etichetta e architettura per rendere visibile la forza dello Stato.",
        keyIdea: "Nel Barocco la politica parla anche il linguaggio dello spettacolo."
      },
      {
        id: "versailles",
        title: "Versailles",
        latitude: 30,
        longitude: 72,
        copy: "Versailles non e solo una residenza: e un modello di spazio barocco, pensato per ordinare la corte e impressionare chi guarda. Ogni sala, festa e percorso comunica gerarchia e splendore.",
        keyIdea: "La reggia diventa un dispositivo visivo del potere."
      },
      {
        id: "rivoluzione-scientifica",
        title: "Rivoluzione scientifica",
        latitude: -8,
        longitude: 118,
        copy: "Tra Seicento e primo Settecento cambia il metodo con cui si studia la natura: osservare, misurare, verificare. Questa nuova mentalita convive con la meraviglia e spinge a ripensare il rapporto tra sapere e mondo.",
        keyIdea: "Lo stupore barocco vive accanto a un sapere piu sperimentale."
      },
      {
        id: "galileo-newton",
        title: "Galileo e Newton",
        latitude: 22,
        longitude: 164,
        copy: "Galileo e Newton danno forma a una nuova immagine dell'universo, fondata su leggi, esperimenti e matematica. Il loro lavoro ridefinisce l'idea di ordine proprio mentre le arti cercano movimento e complessita.",
        keyIdea: "Nuove leggi del mondo cambiano anche l'orizzonte culturale del Barocco."
      }
    ]
  },
  {
    id: "contesto-musicale",
    title: "Contesto musicale",
    subtitle: "Spazi, forme e linguaggi della musica barocca",
    color: "#90a09c",
    ringClass: "musica",
    focusRotation: { x: 6, y: -18 },
    summary: "La musica barocca vive fra corte, cattedrale e teatro pubblico. Questo globo raccoglie gli spazi e le forme che rendono riconoscibile il linguaggio musicale del periodo.",
    mustKnow: [
      "La musica barocca si sviluppa in ambienti sociali diversi ma comunicanti.",
      "Il teatro pubblico allarga il pubblico e cambia la funzione dello spettacolo.",
      "Melodramma e concerto sono forme decisive del periodo.",
      "Il contrasto e uno dei motori espressivi del linguaggio barocco."
    ],
    keywords: [
      {
        id: "corte",
        title: "Corte",
        latitude: 34,
        longitude: -70,
        copy: "Alla corte la musica accompagna feste, balli, cerimonie e rappresentazioni del prestigio dinastico. Il musicista lavora spesso al servizio di un principe o di una famiglia potente.",
        keyIdea: "La corte usa la musica come segno di ordine e magnificenza."
      },
      {
        id: "cattedrale",
        title: "Cattedrale",
        latitude: 8,
        longitude: -22,
        copy: "Nelle cattedrali e nelle grandi chiese la musica sostiene il rito e amplia l'effetto dello spazio sacro. Cori, organi e disposizioni policorali trasformano il suono in architettura.",
        keyIdea: "Il sacro barocco passa anche attraverso un ascolto solenne e teatrale."
      },
      {
        id: "teatro-pubblico",
        title: "Teatro pubblico",
        latitude: -24,
        longitude: 26,
        copy: "Con il teatro pubblico la musica esce dal solo ambito di corte e incontra una platea pagante. Cambiano produzione, pubblico e circolazione delle opere.",
        keyIdea: "Il Barocco musicale diventa anche spettacolo urbano."
      },
      {
        id: "melodramma",
        title: "Melodramma",
        latitude: 28,
        longitude: 74,
        copy: "Il melodramma unisce parola, azione scenica e musica in una forma nuova. Nel Barocco diventa uno dei luoghi principali in cui emozione, racconto e gesto si fondono.",
        keyIdea: "La musica barocca mette in scena gli affetti."
      },
      {
        id: "concerto",
        title: "Concerto",
        latitude: -10,
        longitude: 122,
        copy: "Nel concerto si organizza un dialogo tra soli e insieme, tra vicino e lontano, tra pieno e vuoto sonoro. Questa logica del confronto diventa uno dei segni piu riconoscibili del periodo.",
        keyIdea: "Il concerto rende udibile il principio barocco del dialogo."
      },
      {
        id: "contrasto",
        title: "Contrasto",
        latitude: 20,
        longitude: 168,
        copy: "Forte e piano, solo e tutti, luce e ombra timbrica: il contrasto struttura molte scelte barocche. Non e un effetto decorativo, ma un modo per guidare attenzione ed emozione.",
        keyIdea: "Il contrasto e una grammatica, non un semplice abbellimento."
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
    orbitSubtitle: orbit.subtitle,
    orbitColor: orbit.color,
    ringClass: orbit.ringClass
  }))
);
const orbitById = new Map(orbitDefinitions.map((orbit) => [orbit.id, orbit]));
const keywordById = new Map(keywords.map((keyword) => [keyword.id, keyword]));
const keywordsByOrbitId = new Map(
  orbitDefinitions.map((orbit) => [
    orbit.id,
    keywords.filter((keyword) => keyword.orbitId === orbit.id)
  ])
);
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
  const scale = 0.82 + depth * 0.26;
  const opacity = 0.54 + depth * 0.34;
  return {
    x: xAfterY * 0.9,
    y: yAfterX * 0.9,
    z: zAfterX,
    depth,
    scale,
    opacity
  };
}
function projectCurvePoints(points, rotationY, rotationX) {
  const projected = points.map(
    (point) => projectPoint(point, rotationY, rotationX)
  );
  const frontSegments = [];
  const backSegments = [];
  let currentVisibility = projected[0].z >= 0 ? "front" : "back";
  let currentSegment = [projected[0]];
  for (let index = 1; index < projected.length; index += 1) {
    const previousPoint = projected[index - 1];
    const nextPoint = projected[index];
    const nextVisibility = nextPoint.z >= 0 ? "front" : "back";
    if (nextVisibility === currentVisibility) {
      currentSegment.push(nextPoint);
      continue;
    }
    const divisor = previousPoint.z - nextPoint.z || 1;
    const interpolation = previousPoint.z / divisor;
    const crossingPoint = {
      x: previousPoint.x + (nextPoint.x - previousPoint.x) * interpolation,
      y: previousPoint.y + (nextPoint.y - previousPoint.y) * interpolation,
      z: 0
    };
    currentSegment.push(crossingPoint);
    if (currentSegment.length > 1) {
      (currentVisibility === "front" ? frontSegments : backSegments).push(
        currentSegment
      );
    }
    currentVisibility = nextVisibility;
    currentSegment = [crossingPoint, nextPoint];
  }
  if (currentSegment.length > 1) {
    (currentVisibility === "front" ? frontSegments : backSegments).push(
      currentSegment
    );
  }
  return {
    back: backSegments.map(pointsToSvgPath),
    front: frontSegments.map(pointsToSvgPath)
  };
}
function pointsToSvgPath(points) {
  return points.map((point, index) => {
    const x = GLOBE_VIEWBOX_CENTER + point.x;
    const y = GLOBE_VIEWBOX_CENTER + point.y;
    return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ");
}
function sampleLatitudeCurve(latitude, steps = CURVE_SAMPLE_STEPS) {
  return Array.from(
    { length: steps + 1 },
    (_, index) => toCartesian(latitude, index / steps * 360, GLOBE_RADIUS)
  );
}
function sampleMeridianCurve(longitude, steps = CURVE_SAMPLE_STEPS) {
  return Array.from(
    { length: steps + 1 },
    (_, index) => toCartesian(-90 + index / steps * 180, longitude, GLOBE_RADIUS)
  );
}
const globeCurveDefinitions = [
  { id: "lat-far-south", type: "latitude", value: -68 },
  { id: "lat-south", type: "latitude", value: -44 },
  { id: "lat-mid-south", type: "latitude", value: -20 },
  { id: "equator", type: "latitude", value: 0, axis: true },
  { id: "lat-mid-north", type: "latitude", value: 20 },
  { id: "lat-north", type: "latitude", value: 44 },
  { id: "lat-far-north", type: "latitude", value: 68 },
  { id: "lon-far-west", type: "meridian", value: -90 },
  { id: "lon-west-wide", type: "meridian", value: -72 },
  { id: "lon-west", type: "meridian", value: -54 },
  { id: "lon-west-mid", type: "meridian", value: -36 },
  { id: "lon-inner-west", type: "meridian", value: -18 },
  { id: "prime-meridian", type: "meridian", value: 0, axis: true },
  { id: "lon-inner-east", type: "meridian", value: 18 },
  { id: "lon-east-mid", type: "meridian", value: 36 },
  { id: "lon-east", type: "meridian", value: 54 },
  { id: "lon-east-wide", type: "meridian", value: 72 },
  { id: "lon-far-east", type: "meridian", value: 90 }
];
function getOrbitRotation(orbit) {
  return {
    x: deg(orbit.focusRotation.x),
    y: normalizeAngle(deg(orbit.focusRotation.y))
  };
}
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
function useGlobeRotation(targetRotation, prefersReducedMotion) {
  const [rotation, setRotation] = React.useState(targetRotation);
  const [isDragging, setIsDragging] = React.useState(false);
  const rotationRef = React.useRef(targetRotation);
  const velocityRef = React.useRef({ x: 0, y: 0 });
  const dragRef = React.useRef({
    active: false,
    moved: false,
    pointerId: null,
    x: 0,
    y: 0
  });
  const suppressSelectionRef = React.useRef(false);
  React.useEffect(() => {
    rotationRef.current = { ...targetRotation };
    setRotation({ ...targetRotation });
  }, [targetRotation]);
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
      if (!dragRef.current.active) {
        const drift = prefersReducedMotion ? 0 : 5e-5;
        const nextX = clamp(
          rotationRef.current.x + velocityRef.current.x + (targetRotation.x - rotationRef.current.x) * 0.028,
          deg(-34),
          deg(34)
        );
        const nextY = normalizeAngle(
          rotationRef.current.y + velocityRef.current.y + shortestAngleDifference(rotationRef.current.y, targetRotation.y) * 0.03 + drift
        );
        velocityRef.current = prefersReducedMotion ? { x: 0, y: 0 } : {
          x: velocityRef.current.x * 0.93,
          y: velocityRef.current.y * 0.95
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
  const handlePointerDown = React.useCallback((event) => {
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
  }, []);
  const handlePointerMove = React.useCallback(
    (event) => {
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
    },
    [prefersReducedMotion]
  );
  const handlePointerUp = React.useCallback(
    (event) => {
      if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId) {
        return;
      }
      stopDragging(event.currentTarget, event.pointerId);
    },
    [stopDragging]
  );
  const handlePointerCancel = React.useCallback(
    (event) => {
      if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId) {
        return;
      }
      velocityRef.current = { x: 0, y: 0 };
      stopDragging(event.currentTarget, event.pointerId);
    },
    [stopDragging]
  );
  return {
    rotation,
    isDragging,
    frameHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel
    },
    suppressSelectionRef
  };
}
function GlobeWireframe({ rotation }) {
  const curves = React.useMemo(() => {
    return globeCurveDefinitions.map((curve) => {
      const samples = curve.type === "latitude" ? sampleLatitudeCurve(curve.value) : sampleMeridianCurve(curve.value);
      return {
        ...curve,
        ...projectCurvePoints(samples, rotation.y, rotation.x)
      };
    });
  }, [rotation.x, rotation.y]);
  return /* @__PURE__ */ React.createElement(
    "svg",
    {
      className: "vivaldi-globe__wireframe",
      viewBox: "0 0 520 520",
      focusable: "false",
      "aria-hidden": "true"
    },
    /* @__PURE__ */ React.createElement("circle", { className: "vivaldi-globe__rim", cx: "260", cy: "260", r: "206" }),
    curves.map(
      (curve) => curve.back.map((path, index) => /* @__PURE__ */ React.createElement(
        "path",
        {
          key: `${curve.id}-back-${index}`,
          className: `vivaldi-globe__curve${curve.axis ? " is-axis" : ""} is-back`,
          d: path
        }
      ))
    ),
    curves.map(
      (curve) => curve.front.map((path, index) => /* @__PURE__ */ React.createElement(
        "path",
        {
          key: `${curve.id}-front-${index}`,
          className: `vivaldi-globe__curve${curve.axis ? " is-axis" : ""} is-front`,
          d: path
        }
      ))
    )
  );
}
function GlobeHotspot({ item, isActive, onSelect, suppressSelectionRef }) {
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: `vivaldi-globe-hotspot${isActive ? " is-keyword-active" : ""}`,
      style: {
        "--orbit-color": item.orbitColor,
        left: `calc(50% + ${item.x}px)`,
        top: `calc(50% + ${item.y}px)`,
        opacity: item.displayOpacity,
        transform: `translate(-50%, -50%) scale(${item.displayScale})`,
        zIndex: isActive ? 80 : Math.round(28 + item.depth * 36)
      },
      onClick: () => {
        if (!suppressSelectionRef.current) {
          onSelect(item.id);
        }
      },
      onFocus: () => {
        if (!suppressSelectionRef.current) {
          onSelect(item.id);
        }
      },
      "aria-pressed": isActive,
      "aria-controls": "vivaldi-globe-detail-panel",
      "aria-label": `${item.orbitTitle}: ${item.title}`
    },
    /* @__PURE__ */ React.createElement("strong", null, item.title)
  );
}
function KeywordChip({ keyword, isActive, onSelect }) {
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: `vivaldi-globe-keyword${isActive ? " is-active" : ""}`,
      style: { "--orbit-color": keyword.orbitColor },
      onClick: () => onSelect(keyword.id),
      "aria-pressed": isActive,
      "aria-controls": "vivaldi-globe-detail-panel"
    },
    /* @__PURE__ */ React.createElement("strong", null, keyword.title)
  );
}
function ContextSwitchButton({ orbit, index, isActive, onSelect }) {
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: `vivaldi-globe-switch__button${isActive ? " is-active" : ""}`,
      style: { "--orbit-color": orbit.color },
      onClick: () => onSelect(orbit.id),
      "aria-pressed": isActive,
      "aria-controls": "vivaldi-globe-detail-panel"
    },
    /* @__PURE__ */ React.createElement("span", null, String(index + 1).padStart(2, "0")),
    /* @__PURE__ */ React.createElement("strong", null, orbit.title)
  );
}
function VivaldiSuonoStagioniLesson() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const initialOrbit = orbitDefinitions[0];
  const [activeOrbitId, setActiveOrbitId] = React.useState(initialOrbit.id);
  const [activeKeywordId, setActiveKeywordId] = React.useState(null);
  const activeOrbit = orbitById.get(activeOrbitId) ?? initialOrbit;
  const activeOrbitKeywords = keywordsByOrbitId.get(activeOrbitId) ?? [];
  const activeKeyword = activeKeywordId && keywordById.get(activeKeywordId) || null;
  const panelMode = activeKeyword ? "keyword" : "orbit";
  const targetRotation = React.useMemo(
    () => getOrbitRotation(activeOrbit),
    [activeOrbit]
  );
  const { rotation, isDragging, frameHandlers, suppressSelectionRef } = useGlobeRotation(targetRotation, prefersReducedMotion);
  const projectedKeywords = React.useMemo(() => {
    return activeOrbitKeywords.map((item) => {
      const projectedPoint = projectPoint(
        toCartesian(item.latitude, item.longitude, GLOBE_RADIUS),
        rotation.y,
        rotation.x
      );
      const isKeywordActive = item.id === activeKeywordId;
      return {
        ...item,
        ...projectedPoint,
        displayScale: projectedPoint.scale * (isKeywordActive ? 1.14 : 1.03),
        displayOpacity: clamp(
          projectedPoint.opacity + (isKeywordActive ? 0.08 : 0),
          0.42,
          1
        )
      };
    }).sort((first, second) => first.depth - second.depth);
  }, [activeKeywordId, activeOrbitKeywords, rotation.x, rotation.y]);
  const selectOrbit = React.useCallback((orbitId) => {
    setActiveOrbitId(orbitId);
    setActiveKeywordId(null);
  }, []);
  const selectKeyword = React.useCallback((keywordId) => {
    const keyword = keywordById.get(keywordId);
    if (!keyword) {
      return;
    }
    setActiveOrbitId(keyword.orbitId);
    setActiveKeywordId(keyword.id);
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-editorial-page vivaldi-lesson", "data-lesson-model": "editoriale" }, /* @__PURE__ */ React.createElement("section", { className: "vivaldi-context-block", id: "lezione", "data-section": "contesto" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell vivaldi-context-block__shell" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-context-head" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-context-head__eyebrow" }, "Il Barocco \xB7 Contesto storico-culturale"), /* @__PURE__ */ React.createElement("h1", null, "Il Barocco in coordinate"), /* @__PURE__ */ React.createElement("p", { className: "vivaldi-context-head__intro" }, "Un globo interattivo raccoglie due accessi al Barocco: il contesto storico-culturale e quello musicale. Seleziona il contesto, apri una parola chiave sulla sfera e leggi l'approfondimento nella card qui sotto.")), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-context-stage" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "vivaldi-globe-stage",
      style: { "--orbit-color": activeOrbit.color }
    },
    /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-stage__topline" }, /* @__PURE__ */ React.createElement("span", null, "trascina il globo o seleziona una parola chiave")),
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "vivaldi-globe-switch",
        role: "tablist",
        "aria-label": "Contesti del globo"
      },
      orbitDefinitions.map((orbit, index) => /* @__PURE__ */ React.createElement(
        ContextSwitchButton,
        {
          key: orbit.id,
          orbit,
          index,
          isActive: orbit.id === activeOrbitId,
          onSelect: selectOrbit
        }
      ))
    ),
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `vivaldi-globe-stage__frame${isDragging ? " is-dragging" : ""}`,
        ...frameHandlers
      },
      /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement(GlobeWireframe, { rotation })),
      projectedKeywords.map((item) => /* @__PURE__ */ React.createElement(
        GlobeHotspot,
        {
          key: item.id,
          item,
          isActive: item.id === activeKeywordId,
          onSelect: selectKeyword,
          suppressSelectionRef
        }
      ))
    ),
    /* @__PURE__ */ React.createElement(
      "article",
      {
        key: `${activeOrbitId}-${activeKeywordId ?? "overview"}`,
        id: "vivaldi-globe-detail-panel",
        className: "vivaldi-globe-detail-panel",
        style: { "--orbit-color": activeOrbit.color },
        "aria-live": "polite"
      },
      /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-detail-panel__meta" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-globe-popup__eyebrow" }, panelMode === "keyword" ? "Approfondimento attivo" : "Contesto attivo"), /* @__PURE__ */ React.createElement("span", null, activeOrbit.title)),
      /* @__PURE__ */ React.createElement("h2", null, panelMode === "keyword" ? activeKeyword.title : activeOrbit.title),
      /* @__PURE__ */ React.createElement("p", { className: "vivaldi-globe-detail-panel__subtitle" }, activeOrbit.subtitle),
      panelMode === "keyword" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, activeKeyword.copy), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-detail-panel__keyline" }, /* @__PURE__ */ React.createElement("strong", null, "Punto da fissare"), /* @__PURE__ */ React.createElement("span", null, activeKeyword.keyIdea))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, activeOrbit.summary), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-panel-block" }, /* @__PURE__ */ React.createElement("h3", null, "Cosa devi sapere"), /* @__PURE__ */ React.createElement("ul", { className: "vivaldi-globe-panel-list" }, activeOrbit.mustKnow.map((item) => /* @__PURE__ */ React.createElement("li", { key: item }, item))))),
      /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-panel-block" }, /* @__PURE__ */ React.createElement("h3", null, "Parole chiave del globo"), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-keyword-grid" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          className: `vivaldi-globe-keyword vivaldi-globe-keyword--summary${panelMode === "orbit" ? " is-active" : ""}`,
          style: { "--orbit-color": activeOrbit.color },
          onClick: () => selectOrbit(activeOrbit.id),
          "aria-pressed": panelMode === "orbit",
          "aria-controls": "vivaldi-globe-detail-panel"
        },
        /* @__PURE__ */ React.createElement("strong", null, "Panoramica del globo")
      ), activeOrbitKeywords.map((keyword) => /* @__PURE__ */ React.createElement(
        KeywordChip,
        {
          key: keyword.id,
          keyword,
          isActive: keyword.id === activeKeywordId,
          onSelect: selectKeyword
        }
      ))))
    )
  )))));
}
export {
  VivaldiSuonoStagioniLesson as default
};
