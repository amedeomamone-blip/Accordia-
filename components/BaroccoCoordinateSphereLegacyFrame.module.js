import React from "https://esm.sh/react@18";

const h = React.createElement;
const DEG = Math.PI / 180;
const AUTO_SPIN = 0.00115;
const ROTATION_LIMIT = 1.08;

const orbitDefinitions = [
  {
    id: "contesto-storico-culturale",
    title: "Contesto storico-culturale",
    subtitle: "Politica, potere, scienza e rappresentazione nel Barocco",
    focusRotation: { x: -0.18, y: 0.22 },
    summary: "Il Barocco prende forma in un’Europa attraversata da guerra, centralizzazione del potere e nuove scoperte. Questo globo raccoglie le parole che fissano il quadro storico e culturale del Seicento.",
    mustKnow: [
      "Il Seicento europeo è segnato da conflitti politici e religiosi.",
      "Le monarchie assolute usano arti e cerimonie per consolidare il potere.",
      "Versailles diventa un modello simbolico della corte barocca.",
      "La rivoluzione scientifica cambia il modo di guardare il mondo."
    ],
    keywords: [
      {
        id: "guerra-trentanni",
        title: "Guerra dei Trent’anni",
        latitude: 9,
        longitude: -10,
        copy: "Tra 1618 e 1648 il cuore dell’Europa è attraversato da una lunga guerra che intreccia religione, dinastie e controllo dei territori. Il clima di instabilità segna il modo in cui il Seicento pensa ordine, fede e rappresentazione del potere.",
        keyIdea: "Il Barocco cresce in un continente segnato dalla crisi."
      },
      {
        id: "monarchia-assoluta",
        title: "Monarchia assoluta",
        latitude: 22,
        longitude: -112,
        copy: "Nel Seicento molti sovrani concentrano l’autorità nelle mani della corona. La corte diventa il centro da cui si organizzano immagine pubblica, rituali e spettacoli.",
        keyIdea: "Il potere si mostra anche attraverso forme, cerimonie e arti."
      },
      {
        id: "luigi-xiv",
        title: "Luigi XIV",
        latitude: 18,
        longitude: -136,
        copy: "Luigi XIV trasforma il sovrano in una presenza scenica permanente. Danza, musica, etichetta e architettura rendono visibile la forza dello Stato.",
        keyIdea: "Nel Barocco la politica parla anche il linguaggio dello spettacolo."
      },
      {
        id: "versailles",
        title: "Versailles",
        latitude: -42,
        longitude: -72,
        copy: "Versailles non è solo una residenza: è un modello di spazio barocco, pensato per ordinare la corte e impressionare chi guarda. Ogni sala, festa e percorso comunica gerarchia e splendore.",
        keyIdea: "La reggia diventa un dispositivo visivo del potere."
      },
      {
        id: "rivoluzione-scientifica",
        title: "Rivoluzione scientifica",
        latitude: -18,
        longitude: 24,
        copy: "Tra Seicento e primo Settecento cambia il metodo con cui si studia la natura: osservare, misurare, verificare. Questa nuova mentalità convive con la meraviglia e spinge a ripensare il rapporto tra sapere e mondo.",
        keyIdea: "Lo stupore barocco vive accanto a un sapere più sperimentale."
      },
      {
        id: "galileo-newton",
        title: "Galileo e Newton",
        latitude: -17,
        longitude: 72,
        copy: "Galileo e Newton danno forma a una nuova immagine dell’universo, fondata su leggi, esperimenti e matematica. Il loro lavoro ridefinisce l’idea di ordine proprio mentre le arti cercano movimento e complessità.",
        keyIdea: "Nuove leggi del mondo cambiano l’orizzonte culturale del Barocco."
      }
    ]
  },
  {
    id: "contesto-musicale",
    title: "Contesto musicale",
    subtitle: "Spazi, forme e linguaggi della musica barocca",
    focusRotation: { x: -0.18, y: -0.26 },
    summary: "La musica barocca vive fra corte, cattedrale e teatro pubblico. Questo globo raccoglie gli spazi e le forme che rendono riconoscibile il linguaggio musicale del periodo.",
    mustKnow: [
      "La musica barocca si sviluppa in ambienti sociali diversi ma comunicanti.",
      "Il teatro pubblico allarga il pubblico e cambia la funzione dello spettacolo.",
      "Melodramma e concerto sono forme decisive del periodo.",
      "Il contrasto è uno dei motori espressivi del linguaggio barocco."
    ],
    keywords: [
      {
        id: "corte",
        title: "Corte",
        latitude: 24,
        longitude: -126,
        copy: "Alla corte la musica accompagna feste, balli, cerimonie e rappresentazioni del prestigio dinastico. Il musicista lavora spesso al servizio di un principe o di una famiglia potente.",
        keyIdea: "La corte usa la musica come segno di ordine e magnificenza."
      },
      {
        id: "cattedrale",
        title: "Cattedrale",
        latitude: 8,
        longitude: -58,
        copy: "Nelle cattedrali e nelle grandi chiese la musica sostiene il rito e amplia l’effetto dello spazio sacro. Cori, organi e disposizioni policorali trasformano il suono in architettura.",
        keyIdea: "Il sacro barocco passa anche attraverso un ascolto solenne e teatrale."
      },
      {
        id: "teatro-pubblico",
        title: "Teatro pubblico",
        latitude: -28,
        longitude: -6,
        copy: "Con il teatro pubblico la musica esce dal solo ambito di corte e incontra una platea pagante. Cambiano produzione, pubblico e circolazione delle opere.",
        keyIdea: "Il Barocco musicale diventa anche spettacolo urbano."
      },
      {
        id: "melodramma",
        title: "Melodramma",
        latitude: -40,
        longitude: 74,
        copy: "Il melodramma unisce parola, azione scenica e musica in una forma nuova. Nel Barocco diventa uno dei luoghi principali in cui emozione, racconto e gesto si fondono.",
        keyIdea: "La musica barocca mette in scena gli affetti."
      },
      {
        id: "concerto",
        title: "Concerto",
        latitude: -2,
        longitude: 132,
        copy: "Nel concerto si organizza un dialogo tra soli e insieme, tra vicino e lontano, tra pieno e vuoto sonoro. Questa logica del confronto diventa uno dei segni più riconoscibili del periodo.",
        keyIdea: "Il concerto rende udibile il principio barocco del dialogo."
      },
      {
        id: "contrasto",
        title: "Contrasto",
        latitude: 30,
        longitude: 176,
        copy: "Forte e piano, solo e tutti, luce e ombra timbrica: il contrasto struttura molte scelte barocche. Non è un effetto decorativo, ma un modo per guidare attenzione ed emozione.",
        keyIdea: "Il contrasto è una grammatica, non un semplice abbellimento."
      }
    ]
  }
];

const orbitById = new Map(orbitDefinitions.map((orbit) => [orbit.id, orbit]));
const keywordById = new Map(
  orbitDefinitions.flatMap((orbit) => orbit.keywords.map((keyword) => [keyword.id, { ...keyword, orbitId: orbit.id }]))
);

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function smoothstep(edge0, edge1, value) {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function mixColor(colorA, colorB, amount) {
  return [
    Math.round(lerp(colorA[0], colorB[0], amount)),
    Math.round(lerp(colorA[1], colorB[1], amount)),
    Math.round(lerp(colorA[2], colorB[2], amount))
  ];
}

function sphericalPoint(latitude, longitude) {
  const lat = latitude * DEG;
  const lon = longitude * DEG;
  return {
    x: Math.cos(lat) * Math.cos(lon),
    y: Math.sin(lat),
    z: Math.cos(lat) * Math.sin(lon)
  };
}

function rotatePoint(point, rotationX, rotationY) {
  const cosY = Math.cos(rotationY);
  const sinY = Math.sin(rotationY);
  const x1 = point.x * cosY + point.z * sinY;
  const z1 = -point.x * sinY + point.z * cosY;

  const cosX = Math.cos(rotationX);
  const sinX = Math.sin(rotationX);
  const y2 = point.y * cosX - z1 * sinX;
  const z2 = point.y * sinX + z1 * cosX;

  return { x: x1, y: y2, z: z2 };
}

function projectPoint(point, metrics, scale = 1) {
  const perspective = 0.86 + ((point.z + 1) / 2) * 0.18;
  return {
    x: metrics.cx + point.x * metrics.radius * perspective * scale,
    y: metrics.cy + point.y * metrics.radius * perspective * scale,
    depth: point.z,
    perspective
  };
}

function drawCurve(ctx, points, color, lineWidth) {
  if (!points.length) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();
}

function buildConstellation() {
  const result = [];
  const latitudes = [-74, -64, -54, -44, -34, -24, -14, -4, 6, 16, 26, 36, 46, 56, 66, 74];
  const baseCounts = [10, 12, 15, 18, 22, 26, 30, 32, 33, 31, 28, 24, 20, 16, 12, 9];

  latitudes.forEach((latitude, latIndex) => {
    const count = baseCounts[latIndex];
    const stagger = latIndex % 2 === 0 ? 0 : 6.5;
    for (let index = 0; index < count; index += 1) {
      const longitude = -180 + (360 / count) * index + stagger;
      const seed = ((latIndex + 1) * 37 + (index + 1) * 19) % 97;
      result.push({
        latitude,
        longitude,
        shimmer: seed * 0.071,
        baseVariance: 0.88 + (seed % 11) * 0.025,
        paletteShift: ((seed % 13) - 6) / 6,
        warmthShift: ((seed % 17) - 8) / 8
      });
    }
  });

  return result;
}

const constellation = buildConstellation();

function drawSphereEnvelope(ctx, metrics) {
  ctx.beginPath();
  ctx.arc(metrics.cx, metrics.cy, metrics.radius * 1.02, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(102, 102, 102, 0.12)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(metrics.cx, metrics.cy, metrics.radius * 0.94, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(102, 102, 102, 0.042)";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawGrid(ctx, metrics, rotation) {
  const latitudes = [-72, -56, -40, -24, -8, 8, 24, 40, 56, 72];
  const meridians = [-180, -150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150];

  latitudes.forEach((latitude) => {
    const front = [];
    const back = [];
    for (let index = 0; index <= 280; index += 1) {
      const longitude = -180 + (360 * index) / 280;
      const rotated = rotatePoint(sphericalPoint(latitude, longitude), rotation.x, rotation.y);
      const projected = projectPoint(rotated, metrics);
      (rotated.z >= 0 ? front : back).push(projected);
    }
    drawCurve(ctx, back, "rgba(102, 102, 102, 0.046)", 0.92);
    drawCurve(ctx, front, "rgba(102, 102, 102, 0.115)", 1.02);
  });

  meridians.forEach((longitude) => {
    const front = [];
    const back = [];
    for (let index = 0; index <= 320; index += 1) {
      const latitude = -90 + (180 * index) / 320;
      const rotated = rotatePoint(sphericalPoint(latitude, longitude), rotation.x, rotation.y);
      const projected = projectPoint(rotated, metrics);
      (rotated.z >= 0 ? front : back).push(projected);
    }
    drawCurve(ctx, back, "rgba(102, 102, 102, 0.042)", 0.9);
    drawCurve(ctx, front, "rgba(102, 102, 102, 0.108)", 1);
  });

  [90, -90].forEach((latitude) => {
    const pole = rotatePoint(sphericalPoint(latitude, 0), rotation.x, rotation.y);
    const projected = projectPoint(pole, metrics);
    const alpha = pole.z >= 0 ? 0.16 : 0.05;
    ctx.beginPath();
    ctx.arc(projected.x, projected.y, 1.4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(102, 102, 102, ${alpha})`;
    ctx.fill();
  });
}

function drawDots(ctx, metrics, rotation, time) {
  const TERRACOTTA_DARK = [182, 58, 45];
  const BAROQUE_CORE = [203, 78, 60];
  const DEEP_CORAL = [214, 73, 58];
  const SIGNAL_RED = [232, 93, 74];
  const ACCENT_ROSE = [226, 136, 126];
  const LIGHT_CORAL = [241, 152, 138];
  const LIGHT_ROSE = [248, 186, 176];
  const WARM_CLAY = [150, 112, 72];

  constellation.forEach((dot, index) => {
    const rotated = rotatePoint(sphericalPoint(dot.latitude, dot.longitude), rotation.x, rotation.y);
    const projected = projectPoint(rotated, metrics);
    const dx = projected.x - metrics.cx;
    const dy = projected.y - metrics.cy;
    const radialDistance = Math.hypot(dx, dy);
    const centerFactorRaw = clamp(1 - radialDistance / (metrics.radius * 1.035), 0, 1);
    const centerFactor = Math.pow(centerFactorRaw, 1.58);
    const depthFactorRaw = clamp((rotated.z + 1) / 2, 0, 1);
    const depthFactor = Math.pow(depthFactorRaw, 1.24);
    const rotationalFlux = Math.sin(
      rotation.y * 2.8 +
      rotation.x * 1.9 +
      dot.longitude * DEG * 1.4 +
      dot.latitude * DEG * 0.9
    );
    const breathing = Math.sin(time * 0.018 + dot.shimmer + index * 0.075);
    const dynamicPulse = 0.92 + breathing * 0.045 + rotationalFlux * 0.04;

    let size = 0.44 + centerFactor * 2.74 + depthFactor * 1.08 + dot.baseVariance * 0.18;
    if (rotated.z < -0.45) size *= 0.76;
    else if (rotated.z < -0.15) size *= 0.88;
    size = clamp(size, 0.42, 4.82);

    let alpha = 0.05 + centerFactor * 0.64 + depthFactor * 0.20;
    if (rotated.z < -0.55) alpha *= 0.16;
    else if (rotated.z < -0.25) alpha *= 0.34;
    else if (rotated.z < 0.02) alpha *= 0.68;
    alpha *= dynamicPulse;
    alpha = clamp(alpha, 0.03, 0.88);

    const paletteMotion = clamp(0.5 + dot.paletteShift * 0.44 + rotationalFlux * 0.28 + breathing * 0.15, 0, 1);
    const warmthMotion = clamp(0.5 + dot.warmthShift * 0.38 + breathing * 0.12 - rotationalFlux * 0.09, 0, 1);
    const glowFactor = clamp(centerFactor * 0.74 + depthFactor * 0.25, 0, 1);

    let color = mixColor(TERRACOTTA_DARK, BAROQUE_CORE, 0.44 + paletteMotion * 0.38);
    color = mixColor(color, DEEP_CORAL, paletteMotion * 0.62);
    color = mixColor(color, SIGNAL_RED, paletteMotion * 0.82);
    color = mixColor(color, WARM_CLAY, (1 - centerFactorRaw) * 0.22);
    color = mixColor(color, ACCENT_ROSE, glowFactor * 0.62 + warmthMotion * 0.20);
    color = mixColor(color, LIGHT_CORAL, glowFactor * 0.34);
    color = mixColor(color, LIGHT_ROSE, glowFactor * 0.18);

    const shading = 0.94 + centerFactor * 0.04 + depthFactor * 0.04;
    const red = Math.round(Math.min(255, color[0] * shading));
    const green = Math.round(Math.min(255, color[1] * shading));
    const blue = Math.round(Math.min(255, color[2] * shading));

    ctx.beginPath();
    ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    ctx.fill();

    const haloStrength = smoothstep(0.58, 0.94, centerFactorRaw) * smoothstep(0.04, 0.78, rotated.z);
    if (haloStrength > 0.01) {
      const haloAlpha = clamp(haloStrength * alpha * 0.10, 0, 0.08);
      ctx.beginPath();
      ctx.arc(projected.x, projected.y, size * 2.1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${haloAlpha})`;
      ctx.fill();
    }

    const highlightStrength = smoothstep(0.74, 0.98, centerFactorRaw) * smoothstep(0.18, 0.92, rotated.z);
    if (highlightStrength > 0.02) {
      const highlight = mixColor([255, 241, 235], LIGHT_ROSE, 0.45);
      ctx.beginPath();
      ctx.arc(projected.x, projected.y, Math.max(0.24, size * 0.24), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${highlight[0]}, ${highlight[1]}, ${highlight[2]}, ${clamp(highlightStrength * alpha * 0.28, 0, 0.16)})`;
      ctx.fill();
    }
  });
}

function drawAnchors(ctx, metrics, rotation, keywords) {
  keywords.forEach((keyword) => {
    const rotated = rotatePoint(sphericalPoint(keyword.latitude, keyword.longitude), rotation.x, rotation.y);
    if (rotated.z < -0.68) return;
    const projected = projectPoint(rotated, metrics);
    const alpha = rotated.z >= 0 ? 0.95 : 0.36;
    const ringAlpha = rotated.z >= 0 ? 0.28 : 0.10;
    ctx.beginPath();
    ctx.arc(projected.x, projected.y, 4.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(193, 79, 64, ${alpha})`;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(projected.x, projected.y, 9, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(193, 79, 64, ${ringAlpha})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  });
}

function drawActiveScan(ctx, metrics, rotation, activeKeyword, time) {
  if (!activeKeyword) return;
  const rotated = rotatePoint(sphericalPoint(activeKeyword.latitude, activeKeyword.longitude), rotation.x, rotation.y);
  if (rotated.z < -0.68) return;
  const projected = projectPoint(rotated, metrics);
  const visibility = rotated.z >= 0 ? 1 : 0.34;
  const pulse = 0.5 + Math.sin(time * 0.028) * 0.5;
  const pulseSlow = 0.5 + Math.sin(time * 0.018 + 1.6) * 0.5;
  const halo = ctx.createRadialGradient(projected.x, projected.y, 4, projected.x, projected.y, 72);
  halo.addColorStop(0, `rgba(193, 79, 64, ${0.14 * visibility})`);
  halo.addColorStop(0.42, `rgba(193, 79, 64, ${0.055 * visibility})`);
  halo.addColorStop(1, "rgba(193, 79, 64, 0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(projected.x, projected.y, 72, 0, Math.PI * 2);
  ctx.fill();

  [24 + pulse * 4, 48 + pulseSlow * 6, 78 + pulse * 8].forEach((ringRadius, index) => {
    ctx.beginPath();
    ctx.arc(projected.x, projected.y, ringRadius, 0, Math.PI * 2);
    ctx.strokeStyle = index === 0
      ? `rgba(193, 79, 64, ${0.46 * visibility})`
      : `rgba(193, 79, 64, ${0.22 * visibility})`;
    ctx.lineWidth = index === 0 ? 1.3 : 1.05;
    ctx.stroke();
  });

  ctx.beginPath();
  ctx.arc(projected.x, projected.y, 5.1 + pulse * 1.0, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(193, 79, 64, ${0.96 * visibility})`;
  ctx.fill();
}

function buildHotspots(metrics, rotation, keywords) {
  return keywords.map((keyword) => {
    const rotated = rotatePoint(sphericalPoint(keyword.latitude, keyword.longitude), rotation.x, rotation.y);
    const projected = projectPoint(rotated, metrics, 1.085);
    return {
      ...keyword,
      x: projected.x,
      y: projected.y,
      depth: rotated.z,
      hidden: rotated.z < -0.72,
      back: rotated.z < -0.18,
      displayOpacity: clamp(0.42 + ((rotated.z + 1) / 2) * 0.58, 0.42, 1),
      displayScale: 0.92 + ((rotated.z + 1) / 2) * 0.18,
      zIndex: Math.round((rotated.z + 1) * 100)
    };
  }).sort((a, b) => a.depth - b.depth);
}

function ContextSwitchButton({ orbit, index, isActive, onSelect }) {
  return h(
    "button",
    {
      type: "button",
      className: `vivaldi-globe-switch__button${isActive ? " is-active" : ""}`,
      title: orbit.title,
      onPointerDown: (event) => event.stopPropagation(),
      onClick: () => onSelect(orbit.id),
      "aria-pressed": isActive,
      "aria-controls": "vivaldi-globe-detail-panel",
      "aria-label": orbit.title
    },
    h("span", { className: "vivaldi-globe-switch__index" }, String(index + 1).padStart(2, "0")),
    h("strong", { className: "vivaldi-globe-switch__label" }, orbit.title)
  );
}

function GlobeHotspot({ item, isActive, onSelect }) {
  return h(
    "button",
    {
      type: "button",
      className: `vivaldi-globe-hotspot${isActive ? " is-keyword-active" : ""}${item.back ? " is-back" : ""}${item.hidden ? " is-hidden" : ""}`,
      style: {
        left: `${item.x}px`,
        top: `${item.y}px`,
        opacity: item.displayOpacity,
        transform: `translate(-50%, -50%) scale(${item.displayScale})`,
        zIndex: isActive ? 80 : item.zIndex
      },
      onPointerDown: (event) => event.stopPropagation(),
      onClick: () => onSelect(item.id),
      "aria-pressed": isActive,
      "aria-controls": "vivaldi-globe-detail-panel"
    },
    h("strong", null, item.title)
  );
}

function KeywordChip({ keyword, isActive, onSelect }) {
  return h(
    "button",
    {
      type: "button",
      className: `vivaldi-globe-keyword${isActive ? " is-active" : ""}`,
      onClick: () => onSelect(keyword.id),
      "aria-pressed": isActive,
      "aria-controls": "vivaldi-globe-detail-panel"
    },
    h("strong", null, keyword.title)
  );
}

function VivaldiBaroccoCoordinateSphereLesson() {
  const initialOrbit = orbitDefinitions[0];
  const [activeOrbitId, setActiveOrbitId] = React.useState(initialOrbit.id);
  const [activeKeywordId, setActiveKeywordId] = React.useState(null);
  const [hotspots, setHotspots] = React.useState([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const frameRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const pointerRef = React.useRef({ pointerId: null, x: 0, y: 0 });
  const draggingRef = React.useRef(false);
  const hoveredRef = React.useRef(false);
  const rotationRef = React.useRef({
    x: initialOrbit.focusRotation.x,
    y: initialOrbit.focusRotation.y,
    targetX: initialOrbit.focusRotation.x,
    targetY: initialOrbit.focusRotation.y
  });
  const metricsRef = React.useRef({ width: 0, height: 0, cx: 0, cy: 0, radius: 0, dpr: 1 });
  const timeRef = React.useRef(0);
  const animationRef = React.useRef(null);

  const activeOrbit = orbitById.get(activeOrbitId) || initialOrbit;
  const activeKeyword = activeKeywordId ? activeOrbit.keywords.find((keyword) => keyword.id === activeKeywordId) || null : null;
  const panelMode = activeKeyword ? "keyword" : "orbit";

  React.useEffect(() => {
    rotationRef.current.targetX = activeOrbit.focusRotation.x;
    rotationRef.current.targetY = activeOrbit.focusRotation.y;
  }, [activeOrbit]);

  React.useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return undefined;

    const resize = () => {
      const rect = frame.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = rect.width;
      const height = rect.height;
      const metrics = {
        width,
        height,
        cx: width / 2,
        cy: height / 2,
        radius: Math.min(width, height) * 0.305,
        dpr
      };
      metricsRef.current = metrics;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(frame);
    resize();
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const render = () => {
      const metrics = metricsRef.current;
      const rotation = rotationRef.current;
      if (!metrics.width || !metrics.height) {
        animationRef.current = window.requestAnimationFrame(render);
        return;
      }

      timeRef.current += 1;
      rotation.x += (rotation.targetX - rotation.x) * 0.08;
      rotation.y += (rotation.targetY - rotation.y) * 0.08;
      if (!draggingRef.current && !hoveredRef.current) rotation.targetY += AUTO_SPIN;

      ctx.clearRect(0, 0, metrics.width, metrics.height);
      drawSphereEnvelope(ctx, metrics);
      drawGrid(ctx, metrics, rotation);
      drawDots(ctx, metrics, rotation, timeRef.current);
      drawAnchors(ctx, metrics, rotation, activeOrbit.keywords);
      drawActiveScan(ctx, metrics, rotation, activeKeyword, timeRef.current);
      setHotspots(buildHotspots(metrics, rotation, activeOrbit.keywords));

      animationRef.current = window.requestAnimationFrame(render);
    };

    animationRef.current = window.requestAnimationFrame(render);
    return () => {
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
    };
  }, [activeOrbit, activeKeyword]);

  const selectOrbit = React.useCallback((orbitId) => {
    setActiveOrbitId(orbitId);
    setActiveKeywordId(null);
  }, []);

  const selectKeyword = React.useCallback((keywordId) => {
    const keyword = keywordById.get(keywordId);
    if (!keyword) return;
    setActiveOrbitId(keyword.orbitId);
    setActiveKeywordId(keyword.id);
  }, []);

  const handlePointerDown = React.useCallback((event) => {
    if (event.button !== 0) return;
    draggingRef.current = true;
    setIsDragging(true);
    pointerRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const handlePointerMove = React.useCallback((event) => {
    if (!draggingRef.current || pointerRef.current.pointerId !== event.pointerId) return;
    const dx = event.clientX - pointerRef.current.x;
    const dy = event.clientY - pointerRef.current.y;
    pointerRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    rotationRef.current.targetY += dx * 0.0062;
    rotationRef.current.targetX = clamp(rotationRef.current.targetX + dy * 0.0058, -ROTATION_LIMIT, ROTATION_LIMIT);
  }, []);

  const stopDragging = React.useCallback((event) => {
    draggingRef.current = false;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  return h(
    "div",
    { className: "lesson-editorial-page vivaldi-lesson", "data-lesson-model": "editoriale" },
    h(
      "section",
      { className: "vivaldi-context-block", id: "lezione", "data-section": "contesto" },
      h(
        "div",
        { className: "lesson-shell vivaldi-context-block__shell" },
        h(
          "div",
          { className: "vivaldi-context-head" },
          h("p", { className: "vivaldi-context-head__eyebrow" }, "Il Barocco · Contesto storico-culturale"),
          h("h1", null, "Il Barocco in coordinate"),
          h("p", { className: "vivaldi-context-head__intro" }, "Un globo interattivo raccoglie due accessi al Barocco: il contesto storico-culturale e quello musicale. Seleziona il contesto, apri una parola chiave sulla sfera e leggi l’approfondimento nella card qui sotto.")
        ),
        h(
          "div",
          { className: "vivaldi-context-stage" },
          h(
            "div",
            { className: "vivaldi-globe-stage", style: { "--orbit-color": "#c14f40" } },
            h("div", { className: "vivaldi-globe-stage__topline" }, h("span", null, "trascina il globo o seleziona una parola chiave")),
            h(
              "div",
              {
                ref: frameRef,
                className: `vivaldi-globe-stage__frame${isDragging ? " is-dragging" : ""}`,
                onPointerDown: handlePointerDown,
                onPointerMove: handlePointerMove,
                onPointerUp: stopDragging,
                onPointerCancel: stopDragging,
                onMouseEnter: () => { hoveredRef.current = true; },
                onMouseLeave: () => { hoveredRef.current = false; }
              },
              h(
                "div",
                { className: "vivaldi-globe-switch", role: "tablist", "aria-label": "Contesti del globo" },
                orbitDefinitions.map((orbit, index) => h(ContextSwitchButton, {
                  key: orbit.id,
                  orbit,
                  index,
                  isActive: orbit.id === activeOrbitId,
                  onSelect: selectOrbit
                }))
              ),
              h(
                "div",
                { className: "vivaldi-globe", "aria-hidden": "true" },
                h("canvas", { ref: canvasRef, className: "vivaldi-globe__canvas" })
              ),
              hotspots.map((item) => h(GlobeHotspot, {
                key: item.id,
                item,
                isActive: item.id === activeKeywordId,
                onSelect: selectKeyword
              }))
            )
          ),
          h(
            "article",
            {
              key: `${activeOrbitId}-${activeKeywordId ?? "overview"}`,
              id: "vivaldi-globe-detail-panel",
              className: "vivaldi-globe-detail-panel",
              style: { "--orbit-color": "#c14f40" },
              "aria-live": "polite"
            },
            h(
              "div",
              { className: "vivaldi-globe-detail-panel__meta" },
              h("p", { className: "vivaldi-globe-popup__eyebrow" }, panelMode === "keyword" ? "Approfondimento attivo" : "Contesto attivo"),
              h("span", null, activeOrbit.title)
            ),
            h("h2", null, panelMode === "keyword" ? activeKeyword.title : activeOrbit.title),
            h("p", { className: "vivaldi-globe-detail-panel__subtitle" }, activeOrbit.subtitle),
            panelMode === "keyword"
              ? h(
                  React.Fragment,
                  null,
                  h("p", null, activeKeyword.copy),
                  h(
                    "div",
                    { className: "vivaldi-globe-detail-panel__keyline" },
                    h("strong", null, "Punto da fissare"),
                    h("span", null, activeKeyword.keyIdea)
                  )
                )
              : h(
                  React.Fragment,
                  null,
                  h("p", null, activeOrbit.summary),
                  h(
                    "div",
                    { className: "vivaldi-globe-panel-block" },
                    h("h3", null, "Cosa devi sapere"),
                    h("ul", { className: "vivaldi-globe-panel-list" }, activeOrbit.mustKnow.map((item) => h("li", { key: item }, item)))
                  )
                ),
            h(
              "div",
              { className: "vivaldi-globe-panel-block" },
              h("h3", null, "Parole chiave"),
              h(
                "div",
                { className: "vivaldi-globe-keyword-list" },
                activeOrbit.keywords.map((keyword) => h(KeywordChip, {
                  key: keyword.id,
                  keyword,
                  isActive: keyword.id === activeKeywordId,
                  onSelect: selectKeyword
                }))
              )
            )
          )
        )
      )
    )
  );
}

export default VivaldiBaroccoCoordinateSphereLesson;
