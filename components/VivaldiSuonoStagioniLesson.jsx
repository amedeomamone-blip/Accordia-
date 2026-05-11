import React from "https://esm.sh/react@18";

const GLOBE_RADIUS = 226;
const FULL_ROTATION = Math.PI * 2;
const GLOBE_VIEWBOX_CENTER = 260;
const CURVE_SAMPLE_STEPS = 80;

const orbitDefinitions = [
  {
    id: "contesto-storico-culturale",
    title: "Contesto storico-culturale",
    selectorLabel: "Contesto storico-culturale",
    subtitle: "Politica, potere, scienza e rappresentazione nel Barocco",
    shortLabel: "Storico",
    color: "#b87363",
    ringClass: "storico",
    focusRotation: { x: -6, y: 22 },
    summary:
      "Il Barocco prende forma in un'Europa attraversata da guerra, centralizzazione del potere e nuove scoperte. Le parole del globo mostrano come politica, corte e rivoluzione scientifica costruiscano l'orizzonte culturale del Seicento.",
    mustKnow: [
      "Il Seicento europeo e segnato da conflitti politici e religiosi.",
      "Le monarchie assolute usano arti e cerimonie per consolidare il potere.",
      "Versailles diventa il modello simbolico della corte barocca.",
      "La rivoluzione scientifica cambia il modo di guardare il mondo.",
    ],
    keywords: [
      {
        id: "guerra-trentanni",
        title: "Guerra dei Trent'anni",
        latitude: 30,
        longitude: -82,
        copy:
          "Tra 1618 e 1648 il cuore dell'Europa e attraversato da una lunga guerra che intreccia religione, dinastie e controllo dei territori. Il clima di instabilita segna il modo in cui il Seicento pensa ordine, fede e rappresentazione del potere.",
        keyIdea:
          "Il Barocco cresce in un continente segnato dalla crisi.",
      },
      {
        id: "monarchia-assoluta",
        title: "Monarchia assoluta",
        latitude: 10,
        longitude: -36,
        copy:
          "Nel Seicento molti sovrani concentrano l'autorita nelle mani della corona. La corte diventa il centro da cui si organizzano immagine pubblica, rituali e spettacoli.",
        keyIdea:
          "Il potere si mostra anche attraverso forme, cerimonie e arti.",
      },
      {
        id: "luigi-xiv",
        title: "Luigi XIV",
        latitude: -14,
        longitude: 4,
        copy:
          "Luigi XIV trasforma il sovrano in una presenza scenica permanente. Il re Sole usa danza, musica, etichetta e architettura per rendere visibile la forza dello Stato.",
        keyIdea:
          "Nel Barocco la politica parla anche il linguaggio dello spettacolo.",
      },
      {
        id: "versailles",
        title: "Versailles",
        latitude: 24,
        longitude: 48,
        copy:
          "Versailles non e solo una residenza: e un modello di spazio barocco, pensato per ordinare la corte e impressionare chi guarda. Ogni sala, festa e percorso comunica gerarchia e splendore.",
        keyIdea:
          "La reggia diventa un dispositivo visivo del potere.",
      },
      {
        id: "rivoluzione-scientifica",
        title: "Rivoluzione scientifica",
        latitude: -28,
        longitude: 58,
        copy:
          "Tra Seicento e primo Settecento cambia il metodo con cui si studia la natura: osservare, misurare, verificare. Questa nuova mentalita convive con la meraviglia e spinge a ripensare il rapporto tra sapere e mondo.",
        keyIdea:
          "Lo stupore barocco vive accanto a un sapere piu sperimentale.",
      },
      {
        id: "galileo-newton",
        title: "Galileo e Newton",
        latitude: 34,
        longitude: 116,
        copy:
          "Galileo e Newton danno forma a una nuova immagine dell'universo, fondata su leggi, esperimenti e matematica. Il loro lavoro ridefinisce l'idea di ordine proprio mentre le arti cercano movimento e complessita.",
        keyIdea:
          "Nuove leggi del mondo cambiano anche l'orizzonte culturale del Barocco.",
      },
    ],
  },
  {
    id: "contesto-musicale",
    title: "Contesto musicale",
    selectorLabel: "Contesto musicale",
    subtitle: "Spazi, forme e linguaggi della musica barocca",
    shortLabel: "Musicale",
    color: "#70808f",
    ringClass: "musica",
    focusRotation: { x: 4, y: -14 },
    summary:
      "La musica barocca vive fra corte, cattedrale e teatro pubblico. In questi spazi nascono il melodramma, il concerto e una scrittura fondata sul contrasto di timbri, gruppi e funzioni.",
    mustKnow: [
      "La musica barocca si sviluppa in ambienti sociali diversi ma comunicanti.",
      "Il teatro pubblico allarga il pubblico e cambia la funzione dello spettacolo.",
      "Melodramma e concerto sono forme decisive del periodo.",
      "Il contrasto e uno dei motori espressivi del linguaggio barocco.",
    ],
    keywords: [
      {
        id: "corte",
        title: "Corte",
        latitude: 30,
        longitude: 250,
        copy:
          "Alla corte la musica accompagna feste, balli, cerimonie e rappresentazioni del prestigio dinastico. Il musicista lavora spesso al servizio di un principe o di una famiglia potente.",
        keyIdea:
          "La corte usa la musica come segno di ordine e magnificenza.",
      },
      {
        id: "cattedrale",
        title: "Cattedrale",
        latitude: 6,
        longitude: 284,
        copy:
          "Nelle cattedrali e nelle grandi chiese la musica sostiene il rito e amplia l'effetto dello spazio sacro. Cori, organi e disposizioni policorali trasformano il suono in architettura.",
        keyIdea:
          "Il sacro barocco passa anche attraverso un ascolto solenne e teatrale.",
      },
      {
        id: "teatro-pubblico",
        title: "Teatro pubblico",
        latitude: -18,
        longitude: 318,
        copy:
          "Con il teatro pubblico la musica esce dal solo ambito di corte e incontra una platea pagante. Cambiano produzione, pubblico e circolazione delle opere.",
        keyIdea:
          "Il Barocco musicale diventa anche spettacolo urbano.",
      },
      {
        id: "melodramma",
        title: "Melodramma",
        latitude: 22,
        longitude: 350,
        copy:
          "Il melodramma unisce parola, azione scenica e musica in una forma nuova. Nel Barocco diventa uno dei luoghi principali in cui emozione, racconto e gesto si fondono.",
        keyIdea:
          "La musica barocca mette in scena gli affetti.",
      },
      {
        id: "concerto",
        title: "Concerto",
        latitude: -26,
        longitude: 18,
        copy:
          "Nel concerto si organizza un dialogo tra soli e insieme, tra vicino e lontano, tra pieno e vuoto sonoro. Questa logica del confronto diventa uno dei segni piu riconoscibili del periodo.",
        keyIdea:
          "Il concerto rende udibile il principio barocco del dialogo.",
      },
      {
        id: "contrasto",
        title: "Contrasto",
        latitude: 4,
        longitude: 56,
        copy:
          "Forte e piano, solo e tutti, luce e ombra timbrica: il contrasto struttura molte scelte barocche. Non e un effetto decorativo, ma un modo per guidare attenzione ed emozione.",
        keyIdea:
          "Il contrasto e una grammatica, non un semplice abbellimento.",
      },
    ],
  },
];

const keywords = orbitDefinitions
  .flatMap((orbit, orbitIndex) =>
    orbit.keywords.map((keyword, keywordIndex) => ({
      ...keyword,
      orbitId: orbit.id,
      orbitIndex,
      keywordIndex,
      orbitTitle: orbit.title,
      orbitSubtitle: orbit.subtitle,
      orbitColor: orbit.color,
      ringClass: orbit.ringClass,
    })),
  );

const orbitById = new Map(orbitDefinitions.map((orbit) => [orbit.id, orbit]));
const keywordById = new Map(keywords.map((keyword) => [keyword.id, keyword]));

function deg(value) {
  return (value * Math.PI) / 180;
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
    z: radius * cosLat * Math.cos(lon),
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
    opacity,
  };
}

function projectCurvePoints(points, rotationY, rotationX) {
  const projected = points.map((point) =>
    projectPoint(point, rotationY, rotationX),
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
      z: 0,
    };

    currentSegment.push(crossingPoint);

    if (currentSegment.length > 1) {
      (currentVisibility === "front" ? frontSegments : backSegments).push(
        currentSegment,
      );
    }

    currentVisibility = nextVisibility;
    currentSegment = [crossingPoint, nextPoint];
  }

  if (currentSegment.length > 1) {
    (currentVisibility === "front" ? frontSegments : backSegments).push(
      currentSegment,
    );
  }

  return {
    back: backSegments.map(pointsToSvgPath),
    front: frontSegments.map(pointsToSvgPath),
  };
}

function pointsToSvgPath(points) {
  return points
    .map((point, index) => {
      const x = GLOBE_VIEWBOX_CENTER + point.x;
      const y = GLOBE_VIEWBOX_CENTER + point.y;

      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function sampleLatitudeCurve(latitude, steps = CURVE_SAMPLE_STEPS) {
  return Array.from({ length: steps + 1 }, (_, index) =>
    toCartesian(latitude, (index / steps) * 360, GLOBE_RADIUS),
  );
}

function sampleMeridianCurve(longitude, steps = CURVE_SAMPLE_STEPS) {
  return Array.from({ length: steps + 1 }, (_, index) =>
    toCartesian(-90 + (index / steps) * 180, longitude, GLOBE_RADIUS),
  );
}

const globeCurveDefinitions = [
  { id: "lat-far-south", type: "latitude", value: -60 },
  { id: "lat-south", type: "latitude", value: -36 },
  { id: "lat-mid-south", type: "latitude", value: -12 },
  { id: "equator", type: "latitude", value: 0, axis: true },
  { id: "lat-mid-north", type: "latitude", value: 12 },
  { id: "lat-north", type: "latitude", value: 36 },
  { id: "lat-far-north", type: "latitude", value: 60 },
  { id: "lon-far-west", type: "meridian", value: -90 },
  { id: "lon-west", type: "meridian", value: -54 },
  { id: "lon-west-mid", type: "meridian", value: -18 },
  { id: "prime-meridian", type: "meridian", value: 0, axis: true },
  { id: "lon-east-mid", type: "meridian", value: 18 },
  { id: "lon-east", type: "meridian", value: 54 },
  { id: "lon-far-east", type: "meridian", value: 90 },
];

function getOrbitRotation(orbit) {
  return {
    x: deg(orbit.focusRotation.x),
    y: normalizeAngle(deg(orbit.focusRotation.y)),
  };
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
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

function GlobeWireframe({ rotation }) {
  const curves = React.useMemo(() => {
    return globeCurveDefinitions.map((curve) => {
      const samples =
        curve.type === "latitude"
          ? sampleLatitudeCurve(curve.value)
          : sampleMeridianCurve(curve.value);

      return {
        ...curve,
        ...projectCurvePoints(samples, rotation.y, rotation.x),
      };
    });
  }, [rotation.x, rotation.y]);

  return (
    <svg
      className="vivaldi-globe__wireframe"
      viewBox="0 0 520 520"
      focusable="false"
      aria-hidden="true"
    >
      <circle className="vivaldi-globe__rim" cx="260" cy="260" r="206" />
      {curves.map((curve) =>
        curve.back.map((path, index) => (
          <path
            key={`${curve.id}-back-${index}`}
            className={`vivaldi-globe__curve${curve.axis ? " is-axis" : ""} is-back`}
            d={path}
          />
        )),
      )}
      {curves.map((curve) =>
        curve.front.map((path, index) => (
          <path
            key={`${curve.id}-front-${index}`}
            className={`vivaldi-globe__curve${curve.axis ? " is-axis" : ""} is-front`}
            d={path}
          />
        )),
      )}
    </svg>
  );
}

function OrbitSelector({ orbit, index, isActive, onSelect }) {
  return (
    <button
      type="button"
      className={`vivaldi-orbit-selector__button${isActive ? " is-active" : ""}`}
      style={{ "--orbit-color": orbit.color }}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={() => onSelect(orbit.id)}
      aria-label={orbit.selectorLabel ?? orbit.title}
      aria-pressed={isActive}
      aria-controls="vivaldi-globe-detail-panel"
      title={orbit.selectorLabel ?? orbit.title}
    >
      <span className="vivaldi-orbit-selector__index">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="vivaldi-orbit-selector__copy">
        <strong>{orbit.selectorLabel ?? orbit.title}</strong>
      </span>
    </button>
  );
}

function KeywordChip({ keyword, isActive, onSelect }) {
  return (
    <button
      type="button"
      className={`vivaldi-globe-keyword${isActive ? " is-active" : ""}`}
      style={{ "--orbit-color": keyword.orbitColor }}
      onClick={() => onSelect(keyword.id)}
      aria-pressed={isActive}
      aria-controls="vivaldi-globe-detail-panel"
    >
      <strong>{keyword.title}</strong>
    </button>
  );
}

function GlobeHotspot({ item, isOrbitActive, isKeywordActive, onSelect }) {
  return (
    <button
      type="button"
      className={`vivaldi-globe-hotspot${isOrbitActive ? " is-orbit-active" : " is-orbit-muted"}${isKeywordActive ? " is-keyword-active" : ""}`}
      style={{
        "--orbit-color": item.orbitColor,
        left: `calc(var(--vivaldi-globe-center-x) + ${item.x}px)`,
        top: `calc(50% + ${item.y}px)`,
        opacity: item.displayOpacity,
        transform: `translate(-50%, -50%) scale(${item.displayScale})`,
        zIndex: isKeywordActive
          ? 80
          : isOrbitActive
            ? Math.round(24 + item.depth * 34)
            : Math.round(10 + item.depth * 16),
      }}
      onClick={() => onSelect(item.id)}
      onFocus={() => onSelect(item.id)}
      aria-pressed={isKeywordActive}
      aria-controls="vivaldi-globe-detail-panel"
      aria-label={`${item.orbitTitle}: ${item.title}`}
    >
      <strong>{item.title}</strong>
    </button>
  );
}

export default function VivaldiSuonoStagioniLesson() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const initialOrbit = orbitDefinitions[0];
  const initialRotation = React.useMemo(
    () => getOrbitRotation(initialOrbit),
    [],
  );
  const [rotation, setRotation] = React.useState(initialRotation);
  const [activeOrbitId, setActiveOrbitId] = React.useState(initialOrbit.id);
  const [activeKeywordId, setActiveKeywordId] = React.useState(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const rotationRef = React.useRef(initialRotation);
  const velocityRef = React.useRef({ x: 0, y: 0 });
  const dragRef = React.useRef({
    active: false,
    moved: false,
    pointerId: null,
    x: 0,
    y: 0,
  });
  const suppressSelectionRef = React.useRef(false);

  const activeOrbit = orbitById.get(activeOrbitId) ?? initialOrbit;
  const targetRotation = React.useMemo(
    () => getOrbitRotation(activeOrbit),
    [activeOrbit],
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
      if (!dragRef.current.active) {
        const drift = prefersReducedMotion ? 0 : 0.00008;
        const nextX = clamp(
          rotationRef.current.x +
            velocityRef.current.x +
            (targetRotation.x - rotationRef.current.x) * 0.042,
          deg(-34),
          deg(34),
        );
        const nextY = normalizeAngle(
          rotationRef.current.y +
            velocityRef.current.y +
            shortestAngleDifference(rotationRef.current.y, targetRotation.y) * 0.04 +
            drift,
        );

        velocityRef.current = prefersReducedMotion
          ? { x: 0, y: 0 }
          : {
              x: velocityRef.current.x * 0.93,
              y: velocityRef.current.y * 0.95,
            };

        rotationRef.current = {
          x: nextX,
          y: nextY,
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
      y: event.clientY,
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
      x: clamp(rotationRef.current.x + deltaY * 0.0049, deg(-36), deg(36)),
      y: normalizeAngle(rotationRef.current.y + deltaX * 0.0072),
    };

    rotationRef.current = nextRotation;
    setRotation({ ...nextRotation });

    if (!prefersReducedMotion) {
      velocityRef.current = {
        x: deltaY * 0.0007,
        y: deltaX * 0.001,
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

  const activeOrbitKeywords = React.useMemo(
    () => keywords.filter((keyword) => keyword.orbitId === activeOrbitId),
    [activeOrbitId],
  );

  const projectedKeywords = React.useMemo(() => {
    return activeOrbitKeywords
      .map((item) => {
        const projectedPoint = projectPoint(
          toCartesian(item.latitude, item.longitude, GLOBE_RADIUS),
          rotation.y,
          rotation.x,
        );
        const isKeywordActive = item.id === activeKeywordId;

        return {
          ...item,
          ...projectedPoint,
          displayScale: projectedPoint.scale * (isKeywordActive ? 1.14 : 0.98),
          displayOpacity: clamp(
            projectedPoint.opacity + (isKeywordActive ? 0.08 : 0),
            0.42,
            1,
          ),
        };
      })
      .sort((first, second) => first.depth - second.depth);
  }, [activeKeywordId, activeOrbitKeywords, rotation.x, rotation.y]);

  const activeKeyword =
    (activeKeywordId && keywordById.get(activeKeywordId)) || null;
  const panelMode = activeKeyword ? "keyword" : "orbit";

  return (
    <div className="lesson-editorial-page vivaldi-lesson" data-lesson-model="editoriale">
      <section className="vivaldi-context-block" id="lezione" data-section="contesto">
        <div className="lesson-shell vivaldi-context-block__shell">
          <div className="vivaldi-context-head">
            <p className="vivaldi-context-head__eyebrow">
              Il Barocco · Contesto storico-culturale
            </p>
            <h1>Il Barocco in coordinate</h1>
            <p className="vivaldi-context-head__intro">
              Due contesti guidano l'ingresso nel Barocco: il quadro
              storico-culturale e quello musicale. Scegli un tasto laterale,
              fai emergere le parole chiave sul globo e apri sotto la card di
              approfondimento.
            </p>
          </div>

          <div className="vivaldi-context-stage">
            <div className="vivaldi-globe-stage">
              <div className="vivaldi-globe-stage__topline">
                <span>scegli un contesto e apri una parola chiave sul globo</span>
              </div>

              <div className="vivaldi-globe-scene">
                <div
                  className={`vivaldi-globe-stage__frame${isDragging ? " is-dragging" : ""}`}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerCancel}
                >
                  <div
                    className="vivaldi-orbit-selector"
                    aria-label="Contesti del Barocco"
                  >
                    {orbitDefinitions.map((orbit, index) => (
                      <OrbitSelector
                        key={orbit.id}
                        orbit={orbit}
                        index={index}
                        isActive={orbit.id === activeOrbitId}
                        onSelect={selectOrbit}
                      />
                    ))}
                  </div>

                  {orbitDefinitions.map((orbit) => (
                    <div
                      key={orbit.id}
                      className={`vivaldi-globe-orbit vivaldi-globe-orbit--${orbit.ringClass}${orbit.id === activeOrbitId ? " is-active" : " is-muted"}`}
                      style={{ "--orbit-color": orbit.color }}
                      aria-hidden="true"
                    />
                  ))}

                  <div className="vivaldi-globe" aria-hidden="true">
                    <GlobeWireframe rotation={rotation} />
                  </div>

                  {projectedKeywords.map((item) => (
                    <GlobeHotspot
                      key={item.id}
                      item={item}
                      isOrbitActive
                      isKeywordActive={item.id === activeKeywordId}
                      onSelect={selectKeyword}
                    />
                  ))}
                </div>
              </div>

              <article
                key={`${activeOrbitId}-${activeKeywordId ?? "overview"}`}
                id="vivaldi-globe-detail-panel"
                className="vivaldi-globe-detail-panel"
                style={{ "--orbit-color": activeOrbit.color }}
                aria-live="polite"
              >
                <div className="vivaldi-globe-detail-panel__meta">
                  <p className="vivaldi-globe-popup__eyebrow">
                    {panelMode === "keyword" ? "Approfondimento" : "Contesto attivo"}
                  </p>
                  <span>{activeOrbit.title}</span>
                </div>

                <h2>{panelMode === "keyword" ? activeKeyword.title : activeOrbit.title}</h2>
                <p className="vivaldi-globe-detail-panel__subtitle">
                  {activeOrbit.subtitle}
                </p>

                {panelMode === "keyword" ? (
                  <>
                    <p>{activeKeyword.copy}</p>
                    <div className="vivaldi-globe-detail-panel__keyline">
                      <strong>Punto da fissare</strong>
                      <span>{activeKeyword.keyIdea}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <p>{activeOrbit.summary}</p>
                    <div className="vivaldi-globe-panel-block">
                      <h3>Cosa devi sapere</h3>
                      <ul className="vivaldi-globe-panel-list">
                        {activeOrbit.mustKnow.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                <div className="vivaldi-globe-panel-block">
                  <h3>Parole chiave sul globo</h3>
                  <div className="vivaldi-globe-keyword-grid">
                    <button
                      type="button"
                      className={`vivaldi-globe-keyword vivaldi-globe-keyword--summary${panelMode === "orbit" ? " is-active" : ""}`}
                      style={{ "--orbit-color": activeOrbit.color }}
                      onClick={() => selectOrbit(activeOrbit.id)}
                      aria-pressed={panelMode === "orbit"}
                      aria-controls="vivaldi-globe-detail-panel"
                    >
                      <strong>Panoramica del contesto</strong>
                    </button>

                    {activeOrbitKeywords.map((keyword) => (
                      <KeywordChip
                        key={keyword.id}
                        keyword={keyword}
                        isActive={keyword.id === activeKeywordId}
                        onSelect={selectKeyword}
                      />
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
