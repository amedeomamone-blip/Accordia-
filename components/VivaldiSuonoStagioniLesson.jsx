import React from "https://esm.sh/react@18";

const GLOBE_RADIUS = 226;
const FULL_ROTATION = Math.PI * 2;

const coordinates = [
  {
    id: "meraviglia",
    title: "Meraviglia",
    hint: "apri",
    latitude: 30,
    longitude: -42,
    copy:
      "Il Barocco vuole stupire, commuovere e creare effetti forti. Grandiosita, ornamenti, contrasti e cambi di intensita trasformano la musica in qualcosa di spettacolare.",
  },
  {
    id: "teatralita",
    title: "Teatralita",
    hint: "apri",
    latitude: -24,
    longitude: 24,
    copy:
      "Nel Barocco si afferma il melodramma: musica, recitazione e scena si fondono. Anche fuori dal teatro, la musica cerca entrate, risposte, tensioni, colpi di scena e gesti sonori evidenti.",
  },
  {
    id: "contrasto",
    title: "Contrasto",
    hint: "apri",
    latitude: 18,
    longitude: 94,
    copy:
      "Il contrasto e una regola espressiva del Barocco. Piano e forte, timbri diversi, cambi improvvisi e scarti di intensita rendono l'ascolto piu vivo e drammatico.",
  },
  {
    id: "emozione",
    title: "Emozione",
    hint: "apri",
    latitude: -38,
    longitude: 152,
    copy:
      "La musica barocca vuole parlare al cuore. Timbri, tonalita e melodie dal carattere marcato cercano di suscitare sentimenti precisi in chi ascolta.",
  },
  {
    id: "strumenti",
    title: "Strumenti",
    hint: "apri",
    latitude: 10,
    longitude: 210,
    copy:
      "Nel Barocco cresce il ruolo della musica strumentale. Gli archi acquistano grande importanza e strumenti come violino, clavicembalo e violoncello diventano centrali per colore ed espressivita.",
  },
  {
    id: "nuove-forme",
    title: "Nuove forme",
    hint: "apri",
    latitude: 40,
    longitude: 274,
    copy:
      "Nel Barocco si definiscono forme fondamentali come concerto grosso e concerto solista. Il concerto nasce in Italia, si diffonde in Europa e alterna movimenti lenti e veloci.",
  },
  {
    id: "basso-continuo",
    title: "Basso continuo",
    hint: "apri",
    latitude: -14,
    longitude: 332,
    copy:
      "Il basso continuo sostiene il discorso musicale con una linea grave e accordi di accompagnamento. Clavicembalo e strumenti gravi creano una base stabile per il canto e per la melodia.",
  },
];

function deg(value) {
  return (value * Math.PI) / 180;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
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

function GlobeWireframe() {
  return (
    <svg
      className="vivaldi-globe__wireframe"
      viewBox="0 0 520 520"
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

function GlobeHotspot({ item, index, isActive, onSelect }) {
  return (
    <button
      type="button"
      className={`vivaldi-globe-hotspot${isActive ? " is-active" : ""}`}
      style={{
        left: `calc(50% + ${item.x}px)`,
        top: `calc(50% + ${item.y}px)`,
        opacity: item.opacity,
        transform: `translate(-50%, -50%) scale(${item.scale})`,
        zIndex: isActive ? 60 : Math.round(10 + item.depth * 30),
      }}
      onClick={() => onSelect(item.id)}
      onPointerEnter={(event) => {
        if (event.buttons === 0) {
          onSelect(item.id);
        }
      }}
      onFocus={() => onSelect(item.id)}
      aria-pressed={isActive}
      aria-controls="vivaldi-globe-detail-panel"
    >
      <span className="vivaldi-globe-hotspot__index">
        {String(index + 1).padStart(2, "0")}
      </span>
      <strong>{item.title}</strong>
      <span className="vivaldi-globe-hotspot__hint">{item.hint}</span>
    </button>
  );
}

export default function VivaldiSuonoStagioniLesson() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const baseRotation = React.useMemo(
    () => ({ x: deg(-14), y: deg(18) }),
    [],
  );
  const [rotation, setRotation] = React.useState(baseRotation);
  const [activeId, setActiveId] = React.useState(coordinates[0].id);
  const [isDragging, setIsDragging] = React.useState(false);
  const rotationRef = React.useRef(baseRotation);
  const velocityRef = React.useRef({ x: 0, y: 0 });
  const dragRef = React.useRef({
    active: false,
    moved: false,
    pointerId: null,
    x: 0,
    y: 0,
  });
  const suppressSelectionRef = React.useRef(false);

  const selectCoordinate = React.useCallback((id) => {
    if (suppressSelectionRef.current) {
      return;
    }

    setActiveId(id);
  }, []);

  React.useEffect(() => {
    let animationFrame = 0;

    const animate = () => {
      if (!dragRef.current.active) {
        const drift = prefersReducedMotion ? 0 : 0.00012;
        const nextX = clamp(
          rotationRef.current.x + velocityRef.current.x + (baseRotation.x - rotationRef.current.x) * 0.012,
          deg(-34),
          deg(34),
        );
        const nextY = (rotationRef.current.y + velocityRef.current.y + drift) % FULL_ROTATION;

        velocityRef.current = prefersReducedMotion
          ? { x: 0, y: 0 }
          : {
              x: velocityRef.current.x * 0.94,
              y: velocityRef.current.y * 0.965,
            };

        rotationRef.current = {
          x: nextX,
          y: nextY,
        };

        setRotation({ ...rotationRef.current });
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    rotationRef.current = baseRotation;
    setRotation(baseRotation);
    animationFrame = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [baseRotation, prefersReducedMotion]);

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
      y: (rotationRef.current.y + deltaX * 0.0074) % FULL_ROTATION,
    };

    rotationRef.current = nextRotation;
    setRotation({ ...nextRotation });

    if (!prefersReducedMotion) {
      velocityRef.current = {
        x: deltaY * 0.00072,
        y: deltaX * 0.00104,
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

  const projectedCoordinates = React.useMemo(() => {
    return coordinates
      .map((item, index) => ({
        ...item,
        order: index,
        ...projectPoint(
          toCartesian(item.latitude, item.longitude, GLOBE_RADIUS),
          rotation.y,
          rotation.x,
        ),
      }))
      .sort((first, second) => first.depth - second.depth);
  }, [rotation.x, rotation.y]);

  const activeItem =
    projectedCoordinates.find((item) => item.id === activeId) ??
    projectedCoordinates[0];
  const activeIndex = String(activeItem.order + 1).padStart(2, "0");

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
              Il Barocco e lo stile della meraviglia: vuole stupire, commuovere e
              creare effetti forti. La musica cerca grandiosita, contrasti,
              teatralita e gesto. Prima di ascoltare Vivaldi, entriamo nelle
              coordinate che mettono a fuoco il suo mondo sonoro.
            </p>
          </div>

          <div className="vivaldi-context-stage">
            <div className="vivaldi-globe-stage">
              <div className="vivaldi-globe-stage__topline">
                <span>trascina il globo o seleziona una parola</span>
              </div>

              <div
                className={`vivaldi-globe-stage__frame${isDragging ? " is-dragging" : ""}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
              >
                <div className="vivaldi-globe-orbit vivaldi-globe-orbit--outer" aria-hidden="true" />
                <div className="vivaldi-globe-orbit vivaldi-globe-orbit--inner" aria-hidden="true" />

                <div className="vivaldi-globe" aria-hidden="true">
                  <GlobeWireframe />
                  <div className="vivaldi-globe__core-label">BAROCCO</div>
                </div>

                {projectedCoordinates.map((item) => (
                  <GlobeHotspot
                    key={item.id}
                    item={item}
                    index={item.order}
                    isActive={item.id === activeItem.id}
                    onSelect={selectCoordinate}
                  />
                ))}
              </div>

              <article
                key={activeItem.id}
                id="vivaldi-globe-detail-panel"
                className="vivaldi-globe-detail-panel"
                aria-live="polite"
              >
                <div className="vivaldi-globe-detail-panel__meta">
                  <p className="vivaldi-globe-popup__eyebrow">Coordinata attiva</p>
                  <span>
                    {activeIndex} / {String(coordinates.length).padStart(2, "0")}
                  </span>
                </div>
                <h2>{activeItem.title}</h2>
                <p>{activeItem.copy}</p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
