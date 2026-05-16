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
      id: "mecenatismo",
      title: "Mecenatismo",
      latitude: 24,
      longitude: -126,
      copy: "Nobili e corti sostengono musicisti, compositori e maestri di cappella.",
      keyIdea: "La produzione musicale dipende spesso dal sostegno delle élite."
    },
    {
      id: "corti-cattedrali",
      title: "Corti e cattedrali",
      latitude: 8,
      longitude: -58,
      copy: "Palazzi nobiliari e luoghi sacri diventano centri della vita musicale.",
      keyIdea: "La musica barocca cresce tra prestigio civile e solennità religiosa."
    },
    {
      id: "teatri-pubblici",
      title: "Teatri pubblici",
      latitude: -28,
      longitude: -6,
      copy: "Accanto ai teatri di corte nascono spazi aperti a un pubblico più ampio.",
      keyIdea: "Lo spettacolo musicale si apre a nuovi spettatori."
    },
    {
      id: "melodramma",
      title: "Melodramma",
      latitude: -40,
      longitude: 74,
      copy: "Grande forma vocale e teatrale tipica del Barocco.",
      keyIdea: "Musica, scena e parola si fondono in un unico racconto."
    },
    {
      id: "concerto-grosso",
      title: "Concerto grosso",
      latitude: -2,
      longitude: 132,
      copy: "Dialogo musicale tra un piccolo gruppo di solisti e l’intera orchestra.",
      keyIdea: "Il contrasto fra concertino e ripieno diventa architettura sonora."
    },
    {
      id: "concerto-solista",
      title: "Concerto solista",
      latitude: 30,
      longitude: 176,
      copy: "Un singolo strumento protagonista si confronta con l’orchestra.",
      keyIdea: "Il solista emerge come centro espressivo dell’azione musicale."
    },
    {
      id: "orchestra-camera",
      title: "Orchestra da camera",
      latitude: 38,
      longitude: 118,
      copy: "Le formazioni strumentali diventano più numerose e strutturate.",
      keyIdea: "L’organico strumentale si organizza con maggiore stabilità."
    }
  ]
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
      const innerPulse = 0.5 + 0.5 * Math.sin(time * 0.092 + 1.35);
      const outerGlowRadius = 22 + pulse * 12;
      const middleGlowRadius = 15 + innerPulse * 7;
      const glowAlpha = rotated.z >= 0 ? 0.28 + pulse * 0.22 : 0.16 + pulse * 0.12;
      const middleGlowAlpha = rotated.z >= 0 ? 0.24 + innerPulse * 0.18 : 0.12 + innerPulse * 0.10;

      ctx.beginPath();
      ctx.arc(projected.x, projected.y, outerGlowRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(193, 79, 64, ${glowAlpha})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(projected.x, projected.y, middleGlowRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 164, 145, ${middleGlowAlpha})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(projected.x, projected.y, 14 + pulse * 4, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(193, 79, 64, ${0.66 + pulse * 0.24})`;
      ctx.lineWidth = 1.9;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(projected.x, projected.y, 19 + innerPulse * 7, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 185, 170, ${0.36 + innerPulse * 0.24})`;
      ctx.lineWidth = 1.3;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(projected.x, projected.y, isActive ? 6.8 : 4.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(193, 79, 64, ${isActive ? 1 : alpha})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(projected.x, projected.y, isActive ? 13.8 : 9, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(193, 79, 64, ${isActive ? 0.76 : ringAlpha})`;
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
    h("strong", null, item.title)
  );
}

function KeywordChip({ keyword, isActive, onSelect }) {
  return h(
    "button",
    {
      type: "button",
      className: `barocco-musical-globe__chip${isActive ? " is-active" : ""}`,
      onClick: () => onSelect(keyword.id),
      "aria-pressed": isActive
    },
    keyword.title
  );
}

export default function BaroccoCoordinateSphereMusicale() {
  const initialKeyword = musicalOrbit.keywords[0];
  const [activeKeywordId, setActiveKeywordId] = React.useState(initialKeyword.id);
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
            onSelect: setActiveKeywordId
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
        onSelect: setActiveKeywordId
      }))
    ),
    h(
      "article",
      { className: "barocco-musical-globe__detail", "aria-live": "polite" },
      h("p", { className: "barocco-musical-globe__detail-kicker" }, "Parola chiave attiva"),
      h("h3", null, activeKeyword.title),
      h("p", null, activeKeyword.copy),
      h("strong", null, activeKeyword.keyIdea)
    )
  );
}
