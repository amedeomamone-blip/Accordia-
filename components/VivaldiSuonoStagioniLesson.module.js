import React from "https://esm.sh/react@18";
const GLOBE_RADIUS = 204;
const FULL_ROTATION = Math.PI * 2;
const coordinates = [
  {
    id: "movimento",
    title: "Movimento",
    hint: "apri",
    latitude: 28,
    longitude: -28,
    copy: "Nel Barocco la musica sembra sempre in azione. Le melodie corrono, si inseguono, cambiano direzione e creano una forte sensazione di vitalita."
  },
  {
    id: "contrasto",
    title: "Contrasto",
    hint: "apri",
    latitude: -18,
    longitude: 18,
    copy: "Il Barocco ama gli opposti: forte e piano, solo e tutti, luce e ombra, tensione e riposo. Il contrasto rende la musica piu viva e drammatica."
  },
  {
    id: "meraviglia",
    title: "Meraviglia",
    hint: "apri",
    latitude: 16,
    longitude: 72,
    copy: "L'arte barocca vuole stupire. La musica cerca effetti capaci di sorprendere chi ascolta, creando immagini, emozioni e colpi di scena."
  },
  {
    id: "teatralita",
    title: "Teatralita",
    hint: "apri",
    latitude: -32,
    longitude: 128,
    copy: "Anche quando non c'e un palcoscenico, la musica barocca spesso si comporta come una scena: entrate, risposte, gesti, dialoghi e tensioni."
  },
  {
    id: "energia",
    title: "Energia",
    hint: "apri",
    latitude: 10,
    longitude: 188,
    copy: "Il ritmo, la ripetizione e la spinta degli strumenti danno alla musica barocca una forza continua, chiara e riconoscibile."
  },
  {
    id: "luce-ombra",
    title: "Luce e ombra",
    hint: "apri",
    latitude: 36,
    longitude: 246,
    copy: "Come nella pittura barocca, anche nella musica si alternano momenti luminosi e momenti piu scuri, sospesi o drammatici."
  },
  {
    id: "gesto",
    title: "Gesto",
    hint: "apri",
    latitude: -8,
    longitude: 306,
    copy: "Il Barocco e fatto di gesti musicali evidenti: un attacco deciso, una corsa del violino, una risposta dell'orchestra, un cambio improvviso."
  }
];
function deg(value) {
  return value * Math.PI / 180;
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
  const scale = 0.78 + depth * 0.46;
  const opacity = 0.42 + depth * 0.5;
  return {
    x: xAfterY * 0.9,
    y: yAfterX * 0.9,
    z: zAfterX,
    depth,
    scale,
    opacity
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
function GlobeHotspot({ item, index, isActive, onSelect }) {
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: `vivaldi-globe-hotspot${isActive ? " is-active" : ""}`,
      style: {
        left: `calc(50% + ${item.x}px)`,
        top: `calc(50% + ${item.y}px)`,
        opacity: item.opacity,
        transform: `translate(-50%, -50%) scale(${item.scale})`,
        zIndex: isActive ? 60 : Math.round(10 + item.depth * 30)
      },
      onClick: () => onSelect(item.id),
      onPointerEnter: () => onSelect(item.id),
      onFocus: () => onSelect(item.id),
      "aria-pressed": isActive,
      "aria-controls": "vivaldi-globe-detail-panel"
    },
    /* @__PURE__ */ React.createElement("span", { className: "vivaldi-globe-hotspot__index" }, String(index + 1).padStart(2, "0")),
    /* @__PURE__ */ React.createElement("strong", null, item.title),
    /* @__PURE__ */ React.createElement("span", { className: "vivaldi-globe-hotspot__hint" }, item.hint)
  );
}
function VivaldiSuonoStagioniLesson() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const baseRotation = React.useMemo(
    () => ({ x: deg(-14), y: deg(18) }),
    []
  );
  const [rotation, setRotation] = React.useState(baseRotation);
  const [activeId, setActiveId] = React.useState(coordinates[0].id);
  const pointerOffsetRef = React.useRef({ x: 0, y: 0 });
  const spinRef = React.useRef(0);
  React.useEffect(() => {
    if (prefersReducedMotion) {
      setRotation(baseRotation);
      return void 0;
    }
    let animationFrame = 0;
    let currentX = baseRotation.x;
    let currentY = baseRotation.y;
    const animate = () => {
      spinRef.current = (spinRef.current + 21e-4) % FULL_ROTATION;
      currentX += (baseRotation.x + pointerOffsetRef.current.x - currentX) * 0.06;
      currentY += (baseRotation.y + pointerOffsetRef.current.y - currentY) * 0.06;
      setRotation({
        x: currentX,
        y: currentY + spinRef.current
      });
      animationFrame = window.requestAnimationFrame(animate);
    };
    animationFrame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [baseRotation, prefersReducedMotion]);
  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const pointerX = clamp(-y * 0.4, -0.28, 0.28);
    const pointerY = clamp(x * 0.58, -0.52, 0.52);
    if (prefersReducedMotion) {
      setRotation({
        x: baseRotation.x + pointerX,
        y: baseRotation.y + pointerY
      });
      return;
    }
    pointerOffsetRef.current = {
      x: pointerX,
      y: pointerY
    };
  };
  const handlePointerLeave = () => {
    pointerOffsetRef.current = { x: 0, y: 0 };
    if (prefersReducedMotion) {
      setRotation(baseRotation);
    }
  };
  const projectedCoordinates = React.useMemo(() => {
    return coordinates.map((item, index) => ({
      ...item,
      order: index,
      ...projectPoint(
        toCartesian(item.latitude, item.longitude, GLOBE_RADIUS),
        rotation.y,
        rotation.x
      )
    })).sort((first, second) => first.depth - second.depth);
  }, [rotation.x, rotation.y]);
  const activeItem = projectedCoordinates.find((item) => item.id === activeId) ?? projectedCoordinates[0];
  const activeIndex = String(activeItem.order + 1).padStart(2, "0");
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-editorial-page vivaldi-lesson", "data-lesson-model": "editoriale" }, /* @__PURE__ */ React.createElement("section", { className: "vivaldi-context-block", id: "contesto" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell vivaldi-context-block__shell" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-context-head" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-context-head__eyebrow" }, "Il Barocco \xB7 Contesto storico-culturale"), /* @__PURE__ */ React.createElement("h1", null, "Il Barocco in coordinate"), /* @__PURE__ */ React.createElement("p", { className: "vivaldi-context-head__intro" }, "Il Barocco e un'epoca di movimento, contrasto e meraviglia. La musica non resta ferma: cerca l'effetto, il gesto, la tensione, la sorpresa. Prima di ascoltare Vivaldi, entriamo nelle coordinate che ci aiutano a capire il suo mondo sonoro.")), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-context-stage" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-stage" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-stage__topline" }, /* @__PURE__ */ React.createElement("p", null, "Coordinate del Barocco"), /* @__PURE__ */ React.createElement("span", null, "seleziona una parola")), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "vivaldi-globe-stage__frame",
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave
    },
    /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-orbit vivaldi-globe-orbit--outer", "aria-hidden": "true" }),
    /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-orbit vivaldi-globe-orbit--inner", "aria-hidden": "true" }),
    /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement(GlobeWireframe, null), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe__core-label" }, "Barocco")),
    projectedCoordinates.map((item) => /* @__PURE__ */ React.createElement(
      GlobeHotspot,
      {
        key: item.id,
        item,
        index: item.order,
        isActive: item.id === activeItem.id,
        onSelect: setActiveId
      }
    ))
  ), /* @__PURE__ */ React.createElement(
    "article",
    {
      key: activeItem.id,
      id: "vivaldi-globe-detail-panel",
      className: "vivaldi-globe-detail-panel",
      "aria-live": "polite"
    },
    /* @__PURE__ */ React.createElement("div", { className: "vivaldi-globe-detail-panel__meta" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-globe-popup__eyebrow" }, "Coordinata attiva"), /* @__PURE__ */ React.createElement("span", null, activeIndex, " / 07")),
    /* @__PURE__ */ React.createElement("h2", null, activeItem.title),
    /* @__PURE__ */ React.createElement("p", null, activeItem.copy)
  ))))));
}
export {
  VivaldiSuonoStagioniLesson as default
};
