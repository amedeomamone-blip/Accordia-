import React from "https://esm.sh/react@18";

const GLOBE_RADIUS = 226;
const FULL_ROTATION = Math.PI * 2;
const GLOBE_VIEWBOX_CENTER = 260;
const CURVE_SAMPLE_STEPS = 96;
const WIREFRAME_PARALLEL_COUNT = 9;
// Vincolo grafico: il numero dei meridiani deve essere uguale a quello dei paralleli.
const WIREFRAME_MERIDIAN_COUNT = WIREFRAME_PARALLEL_COUNT;
const WIREFRAME_PARALLEL_VISIBLE_RATIO = 0.84;
const WIREFRAME_MERIDIAN_LIMIT = 80;

const orbitDefinitions = [
  {
    id: "contesto-storico-culturale",
    title: "Contesto storico-culturale",
    subtitle: "Politica, potere, scienza e rappresentazione nel Barocco",
    color: "#b48a79",
    ringClass: "storico",
    focusRotation: { x: 0, y: 24 },
    summary:
      "Il Barocco prende forma in un'Europa attraversata da guerra, centralizzazione del potere e nuove scoperte. Questo globo raccoglie le parole che fissano il quadro storico e culturale del Seicento.",
    mustKnow: [
      "Il Seicento europeo e segnato da conflitti politici e religiosi.",
      "Le monarchie assolute usano arti e cerimonie per consolidare il potere.",
      "Versailles diventa un modello simbolico della corte barocca.",
      "La rivoluzione scientifica cambia il modo di guardare il mondo.",
    ],
    keywords: [
      {
        id: "guerra-trentanni",
        title: "Guerra dei Trent'anni",
        latitude: 54,
        longitude: -126,
        copy:
          "Tra 1618 e 1648 il cuore dell'Europa e attraversato da una lunga guerra che intreccia religione, dinastie e controllo dei territori. Il clima di instabilita segna il modo in cui il Seicento pensa ordine, fede e rappresentazione del potere.",
        keyIdea:
          "Il Barocco cresce in un continente segnato dalla crisi.",
      },
      {
        id: "monarchia-assoluta",
        title: "Monarchia assoluta",
        latitude: 8,
        longitude: -62,
        copy:
          "Nel Seicento molti sovrani concentrano l'autorita nelle mani della corona. La corte diventa il centro da cui si organizzano immagine pubblica, rituali e spettacoli.",
        keyIdea:
          "Il potere si mostra anche attraverso forme, cerimonie e arti.",
      },
      {
        id: "luigi-xiv",
        title: "Luigi XIV",
        latitude: -22,
        longitude: -16,
        copy:
          "Luigi XIV trasforma il sovrano in una presenza scenica permanente. Il re Sole usa danza, musica, etichetta e architettura per rendere visibile la forza dello Stato.",
        keyIdea:
          "Nel Barocco la politica parla anche il linguaggio dello spettacolo.",
      },
      {
        id: "versailles",
        title: "Versailles",
        latitude: -42,
        longitude: 78,
        copy:
          "Versailles non e solo una residenza: e un modello di spazio barocco, pensato per ordinare la corte e impressionare chi guarda. Ogni sala, festa e percorso comunica gerarchia e splendore.",
        keyIdea:
          "La reggia diventa un dispositivo visivo del potere.",
      },
      {
        id: "rivoluzione-scientifica",
        title: "Rivoluzione scientifica",
        latitude: 0,
        longitude: 136,
        copy:
          "Tra Seicento e primo Settecento cambia il metodo con cui si studia la natura: osservare, misurare, verificare. Questa nuova mentalita convive con la meraviglia e spinge a ripensare il rapporto tra sapere e mondo.",
        keyIdea:
          "Lo stupore barocco vive accanto a un sapere piu sperimentale.",
      },
      {
        id: "galileo-newton",
        title: "Galileo e Newton",
        latitude: 30,
        longitude: 126,
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
    subtitle: "Spazi, forme e linguaggi della musica barocca",
    color: "#90a09c",
    ringClass: "musica",
    focusRotation: { x: 0, y: -18 },
    summary:
      "La musica barocca vive fra corte, cattedrale e teatro pubblico. Questo globo raccoglie gli spazi e le forme che rendono riconoscibile il linguaggio musicale del periodo.",
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
        latitude: 52,
        longitude: -118,
        copy:
          "Alla corte la musica accompagna feste, balli, cerimonie e rappresentazioni del prestigio dinastico. Il musicista lavora spesso al servizio di un principe o di una famiglia potente.",
        keyIdea:
          "La corte usa la musica come segno di ordine e magnificenza.",
      },
      {
        id: "cattedrale",
        title: "Cattedrale",
        latitude: 8,
        longitude: -58,
        copy:
          "Nelle cattedrali e nelle grandi chiese la musica sostiene il rito e amplia l'effetto dello spazio sacro. Cori, organi e disposizioni policorali trasformano il suono in architettura.",
        keyIdea:
          "Il sacro barocco passa anche attraverso un ascolto solenne e teatrale.",
      },
      {
        id: "teatro-pubblico",
        title: "Teatro pubblico",
        latitude: -28,
        longitude: -6,
        copy:
          "Con il teatro pubblico la musica esce dal solo ambito di corte e incontra una platea pagante. Cambiano produzione, pubblico e circolazione delle opere.",
        keyIdea:
          "Il Barocco musicale diventa anche spettacolo urbano.",
      },
      {
        id: "melodramma",
        title: "Melodramma",
        latitude: -40,
        longitude: 74,
        copy:
          "Il melodramma unisce parola, azione scenica e musica in una forma nuova. Nel Barocco diventa uno dei luoghi principali in cui emozione, racconto e gesto si fondono.",
        keyIdea:
          "La musica barocca mette in scena gli affetti.",
      },
      {
        id: "concerto",
        title: "Concerto",
        latitude: -2,
        longitude: 132,
        copy:
          "Nel concerto si organizza un dialogo tra soli e insieme, tra vicino e lontano, tra pieno e vuoto sonoro. Questa logica del confronto diventa uno dei segni piu riconoscibili del periodo.",
        keyIdea:
          "Il concerto rende udibile il principio barocco del dialogo.",
      },
      {
        id: "contrasto",
        title: "Contrasto",
        latitude: 30,
        longitude: 176,
        copy:
          "Forte e piano, solo e tutti, luce e ombra timbrica: il contrasto struttura molte scelte barocche. Non e un effetto decorativo, ma un modo per guidare attenzione ed emozione.",
        keyIdea:
          "Il contrasto e una grammatica, non un semplice abbellimento.",
      },
    ],
  },
];

const keywords = orbitDefinitions.flatMap((orbit, orbitIndex) =>
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
const keywordsByOrbitId = new Map(
  orbitDefinitions.map((orbit) => [
    orbit.id,
    keywords.filter((keyword) => keyword.orbitId === orbit.id),
  ]),
);

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
  const scale = 0.82 + depth * 0.26;
  const opacity = 0.54 + depth * 0.34;

  return {
    x: xAfterY * 0.9,
    y: yAfterX * 0.9,
    z: zAfterX,
    depth,
    scale,
    opacity,
  };
}

function projectCurvePath(points, rotationY, rotationX) {
  const projected = points.map((point) =>
    projectPoint(point, rotationY, rotationX),
  );
  return pointsToSvgPath(projected);
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

function createUniformGlobeCurveDefinitions() {
  const curves = [];
  const parallelStep =
    WIREFRAME_PARALLEL_COUNT > 1
      ? (WIREFRAME_PARALLEL_VISIBLE_RATIO * 2) / (WIREFRAME_PARALLEL_COUNT - 1)
      : 0;
  const meridianStep =
    WIREFRAME_MERIDIAN_COUNT > 1
      ? (WIREFRAME_MERIDIAN_LIMIT * 2) / (WIREFRAME_MERIDIAN_COUNT - 1)
      : 0;

  for (let index = 0; index < WIREFRAME_PARALLEL_COUNT; index += 1) {
    const projectedY = -WIREFRAME_PARALLEL_VISIBLE_RATIO + parallelStep * index;
    const value = (Math.asin(clamp(projectedY, -1, 1)) * 180) / Math.PI;
    curves.push({
      id: `lat-${index}`,
      type: "latitude",
      value,
      axis: Math.abs(value) < 0.0001,
    });
  }

  for (let index = 0; index < WIREFRAME_MERIDIAN_COUNT; index += 1) {
    const value = -WIREFRAME_MERIDIAN_LIMIT + meridianStep * index;
    curves.push({
      id: `lon-${index}`,
      type: "meridian",
      value,
      axis: Math.abs(value) < 0.0001,
    });
  }

  return curves;
}

const globeCurveDefinitions = createUniformGlobeCurveDefinitions();

const GLOBE_TILT_MIN = deg(-36);
const GLOBE_TILT_MAX = deg(36);
const DRAG_PITCH_SENSITIVITY = 0.0048;
const DRAG_YAW_SENSITIVITY = 0.007;

function getOrbitRotation(orbit) {
  return {
    x: deg(orbit.focusRotation.x),
    y: normalizeAngle(deg(orbit.focusRotation.y)),
  };
}

function useGlobeRotation(targetRotation) {
  const [rotation, setRotation] = React.useState(() => ({ ...targetRotation }));
  const [isDragging, setIsDragging] = React.useState(false);
  const rotationRef = React.useRef({ ...targetRotation });
  const dragRef = React.useRef({
    active: false,
    moved: false,
    pointerId: null,
    x: 0,
    y: 0,
  });
  const suppressSelectionRef = React.useRef(false);

  const setRotationState = React.useCallback((nextRotation) => {
    rotationRef.current = nextRotation;
    setRotation({ ...nextRotation });
  }, []);

  React.useEffect(() => {
    if (!isDragging) {
      setRotationState({
        x: clamp(targetRotation.x, GLOBE_TILT_MIN, GLOBE_TILT_MAX),
        y: normalizeAngle(targetRotation.y),
      });
    }
  }, [isDragging, setRotationState, targetRotation]);

  const stopDragging = React.useCallback(
    (frameNode, pointerId) => {
      if (frameNode && typeof frameNode.releasePointerCapture === "function") {
        if (
          typeof frameNode.hasPointerCapture !== "function" ||
          frameNode.hasPointerCapture(pointerId)
        ) {
          frameNode.releasePointerCapture(pointerId);
        }
      }

      if (dragRef.current.moved) {
        suppressSelectionRef.current = true;
        window.setTimeout(() => {
          suppressSelectionRef.current = false;
        }, 140);
      }

      dragRef.current.active = false;
      dragRef.current.pointerId = null;
      dragRef.current.moved = false;
      setIsDragging(false);
    },
    [],
  );

  const handlePointerDown = React.useCallback(
    (event) => {
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

      suppressSelectionRef.current = false;
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [],
  );

  const handlePointerMove = React.useCallback(
    (event) => {
      if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId) {
        return;
      }

      const deltaX = event.clientX - dragRef.current.x;
      const deltaY = event.clientY - dragRef.current.y;
      const rotationDeltaX = deltaY * DRAG_PITCH_SENSITIVITY;
      const rotationDeltaY = deltaX * DRAG_YAW_SENSITIVITY;

      dragRef.current.x = event.clientX;
      dragRef.current.y = event.clientY;

      if (Math.abs(deltaX) + Math.abs(deltaY) > 0.4) {
        dragRef.current.moved = true;
      }

      setRotationState({
        x: clamp(rotationRef.current.x + rotationDeltaX, GLOBE_TILT_MIN, GLOBE_TILT_MAX),
        y: normalizeAngle(rotationRef.current.y + rotationDeltaY),
      });
    },
    [setRotationState],
  );

  const handlePointerUp = React.useCallback(
    (event) => {
      if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId) {
        return;
      }

      stopDragging(event.currentTarget, event.pointerId);
    },
    [stopDragging],
  );

  const handlePointerCancel = React.useCallback(
    (event) => {
      if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId) {
        return;
      }

      stopDragging(event.currentTarget, event.pointerId);
    },
    [stopDragging],
  );

  return {
    rotation,
    isDragging,
    frameHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
    },
    suppressSelectionRef,
  };
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
        path: projectCurvePath(samples, rotation.y, rotation.x),
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
      {curves.map((curve) => (
        <path
          key={curve.id}
          className={`vivaldi-globe__curve${curve.axis ? " is-axis" : ""} is-uniform`}
          d={curve.path}
        />
      ))}
    </svg>
  );
}

function GlobeHotspot({ item, isActive, onSelect, suppressSelectionRef }) {
  return (
    <button
      type="button"
      className={`vivaldi-globe-hotspot${isActive ? " is-keyword-active" : ""}`}
      style={{
        "--orbit-color": item.orbitColor,
        left: `calc(var(--vivaldi-globe-center-x) + ${item.spreadX}px)`,
        top: `calc(50% + ${item.spreadY}px)`,
        opacity: item.displayOpacity,
        transform: `translate(-50%, -50%) scale(${item.displayScale})`,
        zIndex: isActive ? 80 : Math.round(28 + item.depth * 36),
      }}
      onClick={() => {
        if (!suppressSelectionRef.current) {
          onSelect(item.id);
        }
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
      }}
      onFocus={() => {
        if (!suppressSelectionRef.current) {
          onSelect(item.id);
        }
      }}
      aria-pressed={isActive}
      aria-controls="vivaldi-globe-detail-panel"
      aria-label={`${item.orbitTitle}: ${item.title}`}
    >
      <strong>{item.title}</strong>
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

function ContextSwitchButton({ orbit, index, isActive, onSelect }) {
  return (
    <button
      type="button"
      className={`vivaldi-globe-switch__button${isActive ? " is-active" : ""}`}
      style={{ "--orbit-color": orbit.color }}
      title={orbit.title}
      onPointerDown={(event) => {
        event.stopPropagation();
      }}
      onClick={() => onSelect(orbit.id)}
      aria-pressed={isActive}
      aria-controls="vivaldi-globe-detail-panel"
      aria-label={orbit.title}
    >
      <span className="vivaldi-globe-switch__index">{String(index + 1).padStart(2, "0")}</span>
      <strong className="vivaldi-globe-switch__label">{orbit.title}</strong>
    </button>
  );
}

export default function VivaldiSuonoStagioniLesson() {
  const initialOrbit = orbitDefinitions[0];
  const [activeOrbitId, setActiveOrbitId] = React.useState(initialOrbit.id);
  const [activeKeywordId, setActiveKeywordId] = React.useState(null);

  const activeOrbit = orbitById.get(activeOrbitId) ?? initialOrbit;
  const activeOrbitKeywords = keywordsByOrbitId.get(activeOrbitId) ?? [];
  const activeKeyword =
    (activeKeywordId && keywordById.get(activeKeywordId)) || null;
  const panelMode = activeKeyword ? "keyword" : "orbit";
  const targetRotation = React.useMemo(
    () => getOrbitRotation(activeOrbit),
    [activeOrbit],
  );
  const { rotation, isDragging, frameHandlers, suppressSelectionRef } =
    useGlobeRotation(targetRotation);

  const projectedKeywords = React.useMemo(() => {
    return activeOrbitKeywords
      .map((item) => {
        const projectedPoint = projectPoint(
          toCartesian(item.latitude, item.longitude, GLOBE_RADIUS),
          rotation.y,
          rotation.x,
        );
        const isKeywordActive = item.id === activeKeywordId;
        const radialReferenceX =
          Math.abs(projectedPoint.x) > 1
            ? projectedPoint.x
            : Math.cos(deg(item.longitude)) * 24;
        const radialReferenceY =
          Math.abs(projectedPoint.y) > 1
            ? projectedPoint.y
            : Math.sin(deg(item.latitude)) * 24;
        const radialLength = Math.hypot(radialReferenceX, radialReferenceY) || 1;
        const radialPush = 20 + (1 - projectedPoint.depth) * 20;

        return {
          ...item,
          ...projectedPoint,
          spreadX: projectedPoint.x + (radialReferenceX / radialLength) * radialPush,
          spreadY: projectedPoint.y + (radialReferenceY / radialLength) * radialPush,
          displayScale: projectedPoint.scale * (isKeywordActive ? 1.14 : 1.03),
          displayOpacity: clamp(
            projectedPoint.opacity + (isKeywordActive ? 0.08 : 0),
            0.42,
            1,
          ),
        };
      })
      .sort((first, second) => first.depth - second.depth);
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
              Un globo interattivo raccoglie due accessi al Barocco: il
              contesto storico-culturale e quello musicale. Seleziona il
              contesto, apri una parola chiave sulla sfera e leggi
              l'approfondimento nella card qui sotto.
            </p>
          </div>

          <div className="vivaldi-context-stage">
            <div
              className="vivaldi-globe-stage"
              style={{ "--orbit-color": activeOrbit.color }}
            >
              <div className="vivaldi-globe-stage__topline">
                <span>trascina il globo o seleziona una parola chiave</span>
              </div>

              <div
                className={`vivaldi-globe-stage__frame${isDragging ? " is-dragging" : ""}`}
                {...frameHandlers}
              >
                <div
                  className="vivaldi-globe-switch"
                  role="tablist"
                  aria-label="Contesti del globo"
                >
                  {orbitDefinitions.map((orbit, index) => (
                    <ContextSwitchButton
                      key={orbit.id}
                      orbit={orbit}
                      index={index}
                      isActive={orbit.id === activeOrbitId}
                      onSelect={selectOrbit}
                    />
                  ))}
                </div>

                <div className="vivaldi-globe" aria-hidden="true">
                  <GlobeWireframe rotation={rotation} />
                </div>

                {projectedKeywords.map((item) => (
                  <GlobeHotspot
                    key={item.id}
                    item={item}
                    isActive={item.id === activeKeywordId}
                    onSelect={selectKeyword}
                    suppressSelectionRef={suppressSelectionRef}
                  />
                ))}
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
                    {panelMode === "keyword" ? "Approfondimento attivo" : "Contesto attivo"}
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
                  <h3>Parole chiave del globo</h3>
                  <div className="vivaldi-globe-keyword-grid">
                    <button
                      type="button"
                      className={`vivaldi-globe-keyword vivaldi-globe-keyword--summary${panelMode === "orbit" ? " is-active" : ""}`}
                      style={{ "--orbit-color": activeOrbit.color }}
                      onClick={() => selectOrbit(activeOrbit.id)}
                      aria-pressed={panelMode === "orbit"}
                      aria-controls="vivaldi-globe-detail-panel"
                    >
                      <strong>Panoramica del globo</strong>
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
