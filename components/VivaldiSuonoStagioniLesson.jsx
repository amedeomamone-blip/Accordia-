import React from "https://esm.sh/react@18";

const GLOBE_RADIUS = 226;
const FULL_ROTATION = Math.PI * 2;

const orbitDefinitions = [
  {
    id: "secolo-contrasti",
    title: "Il secolo dei contrasti",
    selectorLabel: "Contesto storico sociale",
    subtitle: "Il mondo in cui nasce il Barocco",
    shortLabel: "Contrasti",
    color: "#b85f50",
    ringClass: "contrasti",
    focusRotation: { x: -8, y: 18 },
    summary:
      "Il Barocco nasce in un Seicento instabile, attraversato da guerre, grandi trasformazioni e forti contrasti. E un'epoca in cui convivono ricchezza e poverta, fede e scienza, splendore e crisi. Per capire il Barocco bisogna partire da questo mondo teso e complesso.",
    mustKnow: [
      "Il Seicento e un secolo di contrasti.",
      "Le guerre e le tensioni religiose segnano profondamente l'Europa.",
      "Con Galileo cambia il modo di osservare il mondo.",
      "Potere politico e religioso influenzano la vita culturale.",
      "Il Barocco nasce dentro un clima instabile ma molto creativo.",
    ],
    keywords: [
      {
        id: "contrasti",
        title: "Contrasti",
        latitude: 28,
        longitude: -56,
        copy:
          "Il Seicento mette insieme elementi opposti: guerra e splendore, fede e ricerca, ricchezza delle corti e miseria del popolo. Il Barocco nasce dentro questa tensione e la trasforma in un linguaggio fatto di intensita, movimento e opposizioni forti.",
        keyIdea:
          "Il Barocco trasforma il contrasto in una forza espressiva.",
      },
      {
        id: "potere",
        title: "Potere",
        latitude: 4,
        longitude: -18,
        copy:
          "Il Barocco vive nelle corti, nelle chiese, nelle cerimonie e negli spazi della rappresentazione pubblica. Arte e musica non servono solo a intrattenere: mostrano grandezza, prestigio e autorita.",
        keyIdea:
          "Lo splendore barocco e anche un linguaggio politico e simbolico.",
      },
      {
        id: "scienza",
        title: "Scienza",
        latitude: -22,
        longitude: 18,
        copy:
          "Con Galileo e con la nuova ricerca scientifica si afferma un diverso modo di conoscere il mondo: osservare, misurare, verificare. Il Barocco vive quindi tra meraviglia e conoscenza, immaginazione e scoperta.",
        keyIdea:
          "Nel Seicento stupore e conoscenza crescono insieme.",
      },
    ],
  },
  {
    id: "stile-meraviglia",
    title: "Lo stile della meraviglia",
    selectorLabel: "Contesto artistico",
    subtitle: "Come il Barocco colpisce lo sguardo e l'ascolto",
    shortLabel: "Meraviglia",
    color: "#c89263",
    ringClass: "meraviglia",
    focusRotation: { x: -4, y: 146 },
    summary:
      "Il Barocco vuole stupire. Cerca movimento, grandezza, sorpresa, coinvolgimento emotivo. Non punta alla semplicita: preferisce effetti forti, teatralita, ornamenti e spettacolo.",
    mustKnow: [
      "Il Barocco vuole meravigliare.",
      "L'effetto visivo ed emotivo e centrale.",
      "L'arte barocca e spettacolare.",
      "Gli ornamenti hanno un ruolo importante.",
      "Lo stupore e parte dell'esperienza artistica.",
    ],
    keywords: [
      {
        id: "meraviglia",
        title: "Meraviglia",
        latitude: 30,
        longitude: 176,
        copy:
          "L'arte barocca vuole sorprendere chi guarda e chi ascolta. La meraviglia non e un dettaglio: e il cuore dell'esperienza barocca. L'opera deve colpire, attirare, lasciare un'impressione forte.",
        keyIdea:
          "Nel Barocco l'effetto di stupore e una scelta precisa, non un abbellimento.",
      },
      {
        id: "spettacolo",
        title: "Spettacolo",
        latitude: 6,
        longitude: 206,
        copy:
          "Nel Barocco tutto tende a diventare scena: feste, cerimonie, chiese, regge, teatri. Anche la musica partecipa a questa logica spettacolare e coinvolgente, fatta di gesti, spazi, immagini e rituali pubblici.",
        keyIdea:
          "Il Barocco mette arte e musica dentro una grande scena condivisa.",
      },
      {
        id: "ornamento",
        title: "Ornamento",
        latitude: -22,
        longitude: 236,
        copy:
          "L'ornamento e una caratteristica essenziale del gusto barocco. Nell'arte significa ricchezza visiva; nella musica significa abbellimenti, fioriture e passaggi brillanti che rendono il discorso piu espressivo.",
        keyIdea:
          "L'ornamento non copre il contenuto: lo rende piu intenso e riconoscibile.",
      },
    ],
  },
  {
    id: "musica-barocca",
    title: "La musica barocca",
    selectorLabel: "Contesto musicale",
    subtitle: "Il linguaggio musicale del Barocco",
    shortLabel: "Musica",
    color: "#866a78",
    ringClass: "musica",
    focusRotation: { x: 4, y: -14 },
    summary:
      "Nel Barocco la musica cambia profondamente. Diventa piu teatrale, piu espressiva, piu capace di suscitare emozioni. Si affermano nuove idee e nuove pratiche musicali che rendono questo periodo fondamentale nella storia della musica.",
    mustKnow: [
      "Nel Barocco la musica diventa piu teatrale.",
      "Il basso continuo sostiene la struttura sonora.",
      "La musica cerca emozioni riconoscibili.",
      "Nascono forme e linguaggi nuovi.",
      "Il Barocco musicale mette al centro espressivita e coinvolgimento.",
    ],
    keywords: [
      {
        id: "teatro",
        title: "Teatro",
        latitude: 28,
        longitude: 286,
        copy:
          "Nel Barocco la musica si lega fortemente alla scena. Nasce il melodramma e la musica assume una logica teatrale fatta di entrate, risposte, tensioni e colpi di scena.",
        keyIdea:
          "La musica barocca non accompagna soltanto: mette in scena.",
      },
      {
        id: "basso-continuo",
        title: "Basso continuo",
        latitude: 4,
        longitude: 318,
        copy:
          "Il basso continuo e una base fondamentale della musica barocca. Una linea grave e gli accordi di accompagnamento sostengono il canto e la melodia, dando solidita alla struttura sonora.",
        keyIdea:
          "Il basso continuo regge il discorso musicale dall'interno.",
      },
      {
        id: "affetti",
        title: "Affetti",
        latitude: -22,
        longitude: 350,
        copy:
          "La musica barocca vuole suscitare emozioni precise. Gioia, dolore, tensione, solennita e agitazione vengono costruite attraverso melodia, ritmo, intensita e timbro.",
        keyIdea:
          "La musica barocca cerca emozioni riconoscibili e le organizza con chiarezza.",
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
      orbitShortLabel: orbit.shortLabel,
      orbitColor: orbit.color,
      ringClass: orbit.ringClass,
    })),
  )
  .map((keyword, globalOrder) => ({
    ...keyword,
    globalOrder,
  }));

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

function GlobeWireframe({ style }) {
  return (
    <svg
      className="vivaldi-globe__wireframe"
      viewBox="0 0 520 520"
      style={style}
      focusable="false"
      aria-hidden="true"
    >
      <circle cx="260" cy="260" r="206" />
      <ellipse cx="260" cy="260" rx="206" ry="78" />
      <ellipse cx="260" cy="260" rx="206" ry="140" />
      <ellipse cx="260" cy="260" rx="206" ry="34" />
      <ellipse cx="260" cy="260" rx="78" ry="206" />
      <ellipse cx="260" cy="260" rx="138" ry="206" />
      <g transform="rotate(38 260 260)">
        <ellipse cx="260" cy="260" rx="108" ry="206" />
      </g>
      <g transform="rotate(-38 260 260)">
        <ellipse cx="260" cy="260" rx="108" ry="206" />
      </g>
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
      <span>{String(keyword.globalOrder + 1).padStart(2, "0")}</span>
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
      <span className="vivaldi-globe-hotspot__index">
        {String(item.globalOrder + 1).padStart(2, "0")}
      </span>
      <strong>{item.title}</strong>
      <span className="vivaldi-globe-hotspot__hint">{item.orbitShortLabel}</span>
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

  const projectedKeywords = React.useMemo(() => {
    return keywords
      .map((item) => {
        const projectedPoint = projectPoint(
          toCartesian(item.latitude, item.longitude, GLOBE_RADIUS),
          rotation.y,
          rotation.x,
        );
        const isOrbitActive = item.orbitId === activeOrbitId;
        const isKeywordActive = item.id === activeKeywordId;

        return {
          ...item,
          ...projectedPoint,
          displayScale:
            projectedPoint.scale *
            (isKeywordActive ? 1.15 : isOrbitActive ? 1.03 : 0.8),
          displayOpacity: clamp(
            projectedPoint.opacity * (isOrbitActive ? 0.98 : 0.34) +
              (isKeywordActive ? 0.12 : 0),
            isOrbitActive ? 0.48 : 0.15,
            1,
          ),
        };
      })
      .sort((first, second) => first.depth - second.depth);
  }, [activeKeywordId, activeOrbitId, rotation.x, rotation.y]);

  const wireframeStyle = React.useMemo(() => {
    const tiltScale = 1 - Math.min(Math.abs(rotation.x) / deg(36), 1) * 0.12;

    return {
      transform: `rotate(${rotation.y * 0.92}rad) scaleY(${tiltScale}) translateY(${rotation.x * 14}px)`,
    };
  }, [rotation.x, rotation.y]);

  const activeKeyword =
    (activeKeywordId && keywordById.get(activeKeywordId)) || null;
  const activeOrbitKeywords = keywords.filter(
    (keyword) => keyword.orbitId === activeOrbitId,
  );
  const activeOrbitIndex = orbitDefinitions.findIndex(
    (orbit) => orbit.id === activeOrbitId,
  );
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
              Il Barocco nasce in un secolo di contrasti. Guerre, scienza,
              potere, spettacolo e musica convivono nello stesso spazio
              culturale. Prima di ascoltare Vivaldi, esploriamo le coordinate
              che aiutano a capire il suo mondo: storia, societa, arte e musica.
            </p>
          </div>

          <div className="vivaldi-context-stage">
            <div className="vivaldi-globe-stage">
              <div className="vivaldi-globe-stage__topline">
                <span>trascina il globo o seleziona un'orbita</span>
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
                    aria-label="Orbite concettuali del Barocco"
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
                    <GlobeWireframe style={wireframeStyle} />
                  </div>

                  {projectedKeywords.map((item) => (
                    <GlobeHotspot
                      key={item.id}
                      item={item}
                      isOrbitActive={item.orbitId === activeOrbitId}
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
                    {panelMode === "keyword" ? "Parola chiave attiva" : "Orbita selezionata"}
                  </p>
                  <span>
                    {panelMode === "keyword"
                      ? activeOrbit.title
                      : `${String(activeOrbitIndex + 1).padStart(2, "0")} / ${String(orbitDefinitions.length).padStart(2, "0")}`}
                  </span>
                </div>

                <h2>{panelMode === "keyword" ? activeKeyword.title : activeOrbit.title}</h2>
                <p className="vivaldi-globe-detail-panel__subtitle">
                  {panelMode === "keyword" ? activeOrbit.title : activeOrbit.subtitle}
                </p>

                {panelMode === "keyword" ? (
                  <>
                    <p>{activeKeyword.copy}</p>
                    <div className="vivaldi-globe-detail-panel__keyline">
                      <strong>Idea chiave</strong>
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
                  <h3>Parole chiave</h3>
                  <div className="vivaldi-globe-keyword-grid">
                    <button
                      type="button"
                      className={`vivaldi-globe-keyword vivaldi-globe-keyword--summary${panelMode === "orbit" ? " is-active" : ""}`}
                      style={{ "--orbit-color": activeOrbit.color }}
                      onClick={() => selectOrbit(activeOrbit.id)}
                      aria-pressed={panelMode === "orbit"}
                      aria-controls="vivaldi-globe-detail-panel"
                    >
                      <span>00</span>
                      <strong>Visione d'insieme</strong>
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
