import React from "https://esm.sh/react@18";

const h = React.createElement;
const DEG = Math.PI / 180;
const AUTO_SPIN = 0.00115;
const ROTATION_LIMIT = 1.08;
const ACTIVE_LABEL_MARGIN = 14;

const musicalOrbit = {
  id: "barocco-musicale",
  title: "Coordinate musicali del Barocco",
  keywords: [
    {
      id: "celebrazione-potere",
      title: "Celebrazione del potere",
      kicker: "FUNZIONI",
      subtitle: "Musica e prestigio",
      latitude: 24,
      longitude: -20,
      copy: "Nel Barocco la musica profana diventa uno strumento di rappresentanza. Nelle corti europee accompagna feste, cerimonie, banchetti e spettacoli organizzati per mostrare ricchezza, ordine e grandezza. Principi e nobili sostengono musicisti, cantanti e compositori perché la musica contribuisce a rafforzare la loro immagine pubblica: più una corte appare raffinata e spettacolare, maggiore è il prestigio di chi la governa. La musica, quindi, non serve soltanto a intrattenere, ma anche a celebrare il potere.",
      insight: "Feste, cerimonie e spettacoli trasformano il suono in immagine pubblica del potere.",
      keyIdea: "La musica profana partecipa alla costruzione del prestigio di corte.",
      hasPopup: true,
      popupCopy: [
        "Nel Barocco la musica profana diventa uno strumento di rappresentanza. Nelle corti europee accompagna feste, cerimonie, banchetti e spettacoli organizzati per mostrare ricchezza, ordine e grandezza.",
        "Principi e nobili sostengono musicisti, cantanti e compositori perché la musica contribuisce a rafforzare la loro immagine pubblica: più una corte appare raffinata e spettacolare, maggiore è il prestigio di chi la governa.",
        "La musica, quindi, non serve soltanto a intrattenere, ma anche a celebrare il potere."
      ]
    },
    {
      id: "coinvolgimento-fedeli",
      title: "Coinvolgimento dei fedeli",
      kicker: "SACRO",
      subtitle: "Emozionare per convincere",
      latitude: 40,
      longitude: 42,
      copy: "La musica sacra si arricchisce di nuove risorse sonore ed espressive per rendere il rito più intenso e partecipato, suscitando emozione e devozione.",
      insight: "La forza del suono aiuta il rito a diventare più vivido e coinvolgente.",
      keyIdea: "L’espressività musicale sostiene partecipazione, emozione e devozione."
    },
    {
      id: "teatri-pubblici",
      title: "Teatri pubblici",
      kicker: "LUOGHI",
      subtitle: "La musica si apre",
      latitude: -30,
      longitude: -20,
      copy: "Accanto alle sale di corte nascono spazi aperti a un pubblico più ampio. Il teatro musicale esce progressivamente dall’ambiente aristocratico e diventa un’esperienza condivisa.",
      insight: "Il teatro musicale incontra un pubblico più largo e cambia la sua funzione sociale.",
      keyIdea: "Lo spettacolo non resta solo aristocratico: diventa esperienza pubblica."
    },
    {
      id: "oratori",
      title: "Oratori",
      kicker: "SACRO",
      subtitle: "Racconti sacri in musica",
      latitude: -45,
      longitude: 70,
      copy: "Vicino agli ambienti religiosi si diffondono gli oratori: composizioni sacre narrative, eseguite senza rappresentazione scenica, spesso dedicate a episodi biblici.",
      insight: "Il racconto sacro viene affidato alla musica senza bisogno di azione teatrale.",
      keyIdea: "L’oratorio unisce narrazione religiosa e scrittura musicale."
    },
    {
      id: "orchestra-barocca",
      title: "Orchestra barocca",
      kicker: "ORGANICO",
      subtitle: "Nuovi colori sonori",
      latitude: 4,
      longitude: 82,
      copy: "Si afferma un organico strumentale più ricco e riconoscibile, fondato sugli archi ma arricchito da fiati, percussioni e clavicembalo. Il colore sonoro diventa parte essenziale del linguaggio musicale.",
      insight: "Gli strumenti vengono organizzati per creare impasti e colori più riconoscibili.",
      keyIdea: "Il timbro diventa una risorsa centrale della musica barocca."
    },
    {
      id: "melodramma",
      title: "Melodramma",
      kicker: "FORME",
      subtitle: "Nasce l’opera",
      latitude: 30,
      longitude: 136,
      copy: "È una delle grandi novità del Barocco: musica, parola e azione teatrale si uniscono per raccontare storie attraverso il canto e la scena.",
      insight: "Il canto diventa azione teatrale e porta il racconto dentro la scena.",
      keyIdea: "Musica, parola e teatro si fondono nell’opera."
    },
    {
      id: "concerto-solista",
      title: "Concerto solista",
      kicker: "FORME",
      subtitle: "Uno strumento in primo piano",
      latitude: -10,
      longitude: 176,
      copy: "Un singolo strumento dialoga e si contrappone all’orchestra, mettendo in luce virtuosismo, agilità e capacità espressive dell’esecutore.",
      insight: "Il solista emerge come voce riconoscibile dentro il dialogo con l’orchestra.",
      keyIdea: "Virtuosismo ed espressività diventano protagonisti."
    },
    {
      id: "concerto-grosso",
      title: "Concerto grosso",
      kicker: "FORME",
      subtitle: "Gruppo e orchestra",
      latitude: -36,
      longitude: 122,
      copy: "Un piccolo gruppo di strumenti si alterna all’intera orchestra, creando giochi di contrasto tra masse sonore differenti.",
      insight: "Il dialogo fra gruppo ristretto e orchestra costruisce movimento e varietà.",
      keyIdea: "Il contrasto tra masse sonore diventa forma."
    },
    {
      id: "contrasti-sonori",
      title: "Contrasti sonori",
      kicker: "LINGUAGGIO",
      subtitle: "Piano, forte, sorpresa",
      latitude: 48,
      longitude: -118,
      copy: "La musica barocca ricerca effetti di opposizione: piano e forte, solo e tutti, pieno e vuoto, rapido e disteso. Il contrasto diventa un principio costruttivo.",
      insight: "Le opposizioni sonore guidano l’attenzione e danno energia alla forma.",
      keyIdea: "Il contrasto non è solo effetto: organizza il discorso musicale."
    },
    {
      id: "maggiore-espressivita",
      title: "Maggiore espressività",
      kicker: "ESPRESSIONE",
      subtitle: "La musica si intensifica",
      latitude: -65,
      longitude: -130,
      copy: "La musica barocca punta a comunicare emozioni con forza, attraverso melodie incisive, dinamiche marcate, alternanze sonore e una scrittura sempre più teatrale.",
      insight: "Il linguaggio musicale cerca gesti più intensi e riconoscibili.",
      keyIdea: "La scrittura barocca rende l’emozione più diretta e teatrale."
    }
  ].map((keyword, index) => ({
    ...keyword,
    sequence: index + 1
  }))
};

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
    const rotationalFlux = Math.sin(rotation.y * 2.8 + rotation.x * 1.9 + dot.longitude * DEG * 1.4 + dot.latitude * DEG * 0.9);
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
  });
}

function drawAnchors(ctx, metrics, rotation, keywords, activeKeywordId, time) {
  keywords.forEach((keyword) => {
    const rotated = rotatePoint(sphericalPoint(keyword.latitude, keyword.longitude), rotation.x, rotation.y);
    if (rotated.z < -0.68) return;
    const projected = projectPoint(rotated, metrics);
    const alpha = rotated.z >= 0 ? 0.95 : 0.36;
    const ringAlpha = rotated.z >= 0 ? 0.28 : 0.10;
    const isActive = keyword.id === activeKeywordId;

    if (isActive) {
      const pulse = 0.5 + 0.5 * Math.sin(time * 0.092);
      ctx.beginPath();
      ctx.arc(projected.x, projected.y, 11.5 + pulse * 2.3, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(184, 151, 108, ${0.42 + pulse * 0.18})`;
      ctx.lineWidth = 1.45;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(projected.x, projected.y, isActive ? 6.8 : 4.2, 0, Math.PI * 2);
    ctx.fillStyle = isActive
      ? "rgba(132, 95, 60, 0.98)"
      : `rgba(168, 127, 81, ${alpha})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(projected.x, projected.y, isActive ? 13.8 : 9, 0, Math.PI * 2);
    ctx.strokeStyle = isActive
      ? "rgba(196, 168, 128, 0.76)"
      : `rgba(176, 141, 103, ${ringAlpha})`;
    ctx.lineWidth = isActive ? 1.7 : 1;
    ctx.stroke();
  });
}

function getActiveLabelPlacement(metrics, projected, radialX, radialY) {
  const isCompactViewport = metrics.width <= 680;
  const labelHalfWidth = isCompactViewport ? 68 : 94;
  const labelHalfHeight = isCompactViewport ? 18 : 22;
  const labelOffset = isCompactViewport ? 30 : 42;
  const radialLength = Math.max(Math.hypot(radialX, radialY), 1);
  const desiredX = projected.x + (radialX / radialLength) * labelOffset;
  const desiredY = projected.y + (radialY / radialLength) * labelOffset;

  return {
    x: clamp(desiredX, labelHalfWidth + ACTIVE_LABEL_MARGIN, metrics.width - labelHalfWidth - ACTIVE_LABEL_MARGIN),
    y: clamp(desiredY, labelHalfHeight + ACTIVE_LABEL_MARGIN, metrics.height - labelHalfHeight - ACTIVE_LABEL_MARGIN)
  };
}

function buildHotspots(metrics, rotation, keywords) {
  return keywords.map((keyword) => {
    const rotated = rotatePoint(sphericalPoint(keyword.latitude, keyword.longitude), rotation.x, rotation.y);
    const projected = projectPoint(rotated, metrics, 1.085);
    const radialX = projected.x - metrics.cx;
    const radialY = projected.y - metrics.cy;
    const labelPosition = getActiveLabelPlacement(metrics, projected, radialX, radialY);

    return {
      ...keyword,
      x: projected.x,
      y: projected.y,
      activeOffsetX: labelPosition.x - projected.x,
      activeOffsetY: labelPosition.y - projected.y,
      depth: rotated.z,
      hidden: rotated.z < -0.72,
      back: rotated.z < -0.18,
      displayOpacity: clamp(0.42 + ((rotated.z + 1) / 2) * 0.58, 0.42, 1),
      displayScale: 0.92 + ((rotated.z + 1) / 2) * 0.18,
      zIndex: Math.round((rotated.z + 1) * 100)
    };
  }).sort((a, b) => a.depth - b.depth);
}

function GlobeHotspot({ item, isActive, onSelect }) {
  return h(
    "button",
    {
      type: "button",
      className: `barocco-musical-globe__hotspot${isActive ? " is-active" : ""}${item.back ? " is-back" : ""}${item.hidden ? " is-hidden" : ""}`,
      style: {
        left: `${item.x + (isActive ? item.activeOffsetX : 0)}px`,
        top: `${item.y + (isActive ? item.activeOffsetY : 0)}px`,
        opacity: item.displayOpacity,
        transform: `translate(-50%, -50%) scale(${item.displayScale})`,
        zIndex: isActive ? 80 : item.zIndex
      },
      onPointerDown: (event) => event.stopPropagation(),
      onClick: () => onSelect(item.id),
      "aria-label": item.title,
      "aria-pressed": isActive,
      title: item.title
    },
    h(
      "span",
      { className: "barocco-musical-globe__hotspot-index", "aria-hidden": "true" },
      String(item.sequence).padStart(2, "0")
    ),
    h(
      "span",
      { className: "barocco-musical-globe__hotspot-copy" },
      h("strong", null, item.title)
    )
  );
}

function KeywordChip({ keyword, isActive, onSelect }) {
  const keywordNumber = String(keyword.sequence).padStart(2, "0");

  return h(
    "button",
    {
      type: "button",
      className: `barocco-musical-globe__chip${isActive ? " is-active" : ""}`,
      onClick: () => onSelect(keyword.id),
      "aria-pressed": isActive,
      "aria-label": `${keywordNumber} ${keyword.title}`
    },
    h("span", { className: "barocco-musical-globe__chip-number", "aria-hidden": "true" }, keywordNumber),
    h("strong", { className: "barocco-musical-globe__chip-text" }, keyword.title)
  );
}

function KeywordPopup({ keyword, onClose }) {
  return h(
    "div",
    { className: "barocco-musical-globe__popup-shell", onClick: onClose },
    h(
      "article",
      {
        className: "barocco-musical-globe__popup",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "barocco-musical-globe-popup-title",
        onClick: (event) => event.stopPropagation()
      },
      h(
        "button",
        {
          type: "button",
          className: "barocco-musical-globe__popup-close",
          onClick: onClose,
          "aria-label": "Chiudi approfondimento"
        },
        "×"
      ),
      h("div", { className: "barocco-musical-globe__popup-glow", "aria-hidden": "true" }),
      h("div", { className: "barocco-musical-globe__popup-lines", "aria-hidden": "true" },
        h("span"),
        h("span")
      ),
      h(
        "div",
        { className: "barocco-musical-globe__popup-content" },
        h("p", { className: "barocco-musical-globe__popup-number" }, String(keyword.sequence).padStart(2, "0")),
        h("h3", { id: "barocco-musical-globe-popup-title" }, keyword.title),
        h("p", { className: "barocco-musical-globe__popup-subtitle" }, keyword.subtitle),
        h(
          "div",
          { className: "barocco-musical-globe__popup-copy" },
          keyword.popupCopy.map((paragraph, index) => h("p", { key: index }, paragraph))
        )
      )
    )
  );
}

export default function BaroccoCoordinateSphereMusicale() {
  const initialKeyword = musicalOrbit.keywords[0];
  const [activeKeywordId, setActiveKeywordId] = React.useState(initialKeyword.id);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [hotspots, setHotspots] = React.useState([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const frameRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const pointerRef = React.useRef({ pointerId: null, x: 0, y: 0 });
  const draggingRef = React.useRef(false);
  const hoveredRef = React.useRef(false);
  const rotationRef = React.useRef({ x: -0.18, y: -0.26, targetX: -0.18, targetY: -0.26 });
  const metricsRef = React.useRef({ width: 0, height: 0, cx: 0, cy: 0, radius: 0, dpr: 1 });
  const timeRef = React.useRef(0);
  const animationRef = React.useRef(null);
  const activeKeyword = musicalOrbit.keywords.find((keyword) => keyword.id === activeKeywordId) || initialKeyword;
  const popupKeyword = isPopupOpen && activeKeyword.hasPopup ? activeKeyword : null;

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
        radius: Math.min(width, height) * 0.385,
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
      drawAnchors(ctx, metrics, rotation, musicalOrbit.keywords, activeKeywordId, timeRef.current);
      setHotspots(buildHotspots(metrics, rotation, musicalOrbit.keywords));
      animationRef.current = window.requestAnimationFrame(render);
    };

    animationRef.current = window.requestAnimationFrame(render);
    return () => {
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
    };
  }, [activeKeywordId]);

  const onPointerDown = React.useCallback((event) => {
    const frame = frameRef.current;
    if (!frame) return;
    frame.setPointerCapture?.(event.pointerId);
    pointerRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    draggingRef.current = true;
    setIsDragging(true);
  }, []);

  const onPointerMove = React.useCallback((event) => {
    if (!draggingRef.current || pointerRef.current.pointerId !== event.pointerId) return;
    const dx = event.clientX - pointerRef.current.x;
    const dy = event.clientY - pointerRef.current.y;
    pointerRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    rotationRef.current.targetY += dx * 0.0046;
    rotationRef.current.targetX = clamp(rotationRef.current.targetX - dy * 0.0042, -ROTATION_LIMIT, ROTATION_LIMIT);
  }, []);

  const stopDragging = React.useCallback(() => {
    const frame = frameRef.current;
    if (frame && pointerRef.current.pointerId !== null) frame.releasePointerCapture?.(pointerRef.current.pointerId);
    pointerRef.current = { pointerId: null, x: 0, y: 0 };
    draggingRef.current = false;
    setIsDragging(false);
  }, []);

  const selectKeyword = React.useCallback((keywordId) => {
    const selectedKeyword = musicalOrbit.keywords.find((keyword) => keyword.id === keywordId);
    setActiveKeywordId(keywordId);
    setIsPopupOpen(Boolean(selectedKeyword?.hasPopup));
  }, []);

  const closePopup = React.useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  React.useEffect(() => {
    if (!isPopupOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsPopupOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPopupOpen]);

  return h(
    "section",
    { className: "barocco-musical-globe", "aria-label": "Globo musicale del Barocco" },
    h(
      "div",
      { className: "barocco-musical-globe__header" },
      h("h2", { className: "barocco-musical-globe__title" }, "Parole Chiave"),
      h("p", { className: "barocco-musical-globe__eyebrow" }, "Trascina il globo o seleziona una parola chiave")
    ),
    h(
      "div",
      { className: "barocco-musical-globe__stage-card" },
      h(
        "div",
        {
          ref: frameRef,
          className: `barocco-musical-globe__stage${isDragging ? " is-dragging" : ""}`,
          onPointerDown,
          onPointerMove,
          onPointerUp: stopDragging,
          onPointerCancel: stopDragging,
          onMouseEnter: () => { hoveredRef.current = true; },
          onMouseLeave: () => { hoveredRef.current = false; }
        },
        h("canvas", { ref: canvasRef, className: "barocco-musical-globe__canvas", "aria-hidden": "true" }),
        h("div", { className: "barocco-musical-globe__hotspots" },
          hotspots.map((item) => h(GlobeHotspot, {
            key: item.id,
            item,
            isActive: item.id === activeKeywordId,
            onSelect: selectKeyword
          }))
        )
      )
    ),
    h(
      "div",
      {
        className: "barocco-musical-globe__keyword-list",
        role: "group",
        "aria-label": "Parole chiave del globo musicale"
      },
      musicalOrbit.keywords.map((keyword) => h(KeywordChip, {
        key: keyword.id,
        keyword,
        isActive: keyword.id === activeKeywordId,
        onSelect: selectKeyword
      }))
    ),
    popupKeyword ? h(KeywordPopup, { keyword: popupKeyword, onClose: closePopup }) : null
  );
}
