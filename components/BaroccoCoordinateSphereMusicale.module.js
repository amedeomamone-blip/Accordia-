import React from "https://esm.sh/react@18";

const h = React.createElement;
const DEG = Math.PI / 180;
const AUTO_SPIN = 0.00115;
const ROTATION_LIMIT = 1.08;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
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

function projectPoint(point, metrics) {
  const perspective = 0.86 + ((point.z + 1) / 2) * 0.18;
  return {
    x: metrics.cx + point.x * metrics.radius * perspective,
    y: metrics.cy + point.y * metrics.radius * perspective,
    depth: point.z
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
  const latitudes = [-78, -72, -66, -60, -54, -48, -42, -36, -30, -24, -18, -12, -6, 0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78];

  latitudes.forEach((latitude, latIndex) => {
    const latitudeWeight = Math.cos(latitude * DEG);
    const count = Math.round(11 + latitudeWeight * 29);
    const stagger = latIndex % 2 === 0 ? 0 : 180 / count;

    for (let index = 0; index < count; index += 1) {
      const seed = ((latIndex + 1) * 97 + (index + 1) * 53) % 211;
      const microSeed = ((latIndex + 4) * 41 + (index + 3) * 67) % 157;
      const latitudeJitter = ((microSeed % 15) - 7) * 0.18;
      const longitudeJitter = (((seed * 7) % 17) - 8) * 0.34;
      const longitude = -180 + (360 / count) * index + stagger + longitudeJitter;

      result.push({
        latitude: latitude + latitudeJitter,
        longitude,
        shimmer: seed * 0.093 + microSeed * 0.017,
        baseVariance: 0.78 + (seed % 17) * 0.026,
        paletteShift: ((seed % 19) - 9) / 9,
        warmthShift: ((seed % 23) - 11) / 11,
        twinkleSpeed: 0.018 + (microSeed % 23) * 0.003,
        flare: seed % 9 === 0 ? 1 : seed % 5 === 0 ? 0.62 : 0.32,
        flickerDepth: 0.42 + (seed % 29) * 0.012
      });
    }
  });

  return result;
}

const constellation = buildConstellation();

function drawSphereEnvelope(ctx, metrics) {
  ctx.beginPath();
  ctx.arc(metrics.cx, metrics.cy, metrics.radius * 1.02, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(193, 79, 64, 0.16)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(metrics.cx, metrics.cy, metrics.radius * 0.94, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(207, 141, 72, 0.07)";
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

    drawCurve(ctx, back, "rgba(193, 79, 64, 0.038)", 0.92);
    drawCurve(ctx, front, "rgba(193, 79, 64, 0.112)", 1.02);
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

    drawCurve(ctx, back, "rgba(207, 141, 72, 0.036)", 0.9);
    drawCurve(ctx, front, "rgba(193, 79, 64, 0.104)", 1);
  });
}

function drawDots(ctx, metrics, rotation, time) {
  const TERRACOTTA_DARK = [178, 48, 38];
  const BAROQUE_CORE = [207, 67, 51];
  const SIGNAL_RED = [238, 84, 64];
  const CANDLE_GOLD = [238, 168, 72];
  const LIGHT_CORAL = [255, 154, 132];
  const SMOKE_BLUE = [92, 118, 138];

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
    const breathing = Math.sin(time * dot.twinkleSpeed + dot.shimmer + index * 0.031);
    const quickSpark = Math.pow(0.5 + 0.5 * Math.sin(time * (dot.twinkleSpeed * 2.9) + dot.shimmer * 1.73), 5.2);
    const broadFlicker = Math.pow(0.5 + 0.5 * Math.sin(time * (dot.twinkleSpeed * 1.35) + dot.shimmer * 0.93 + index * 0.021), 1.45);
    const slowTide = 0.5 + 0.5 * Math.sin(time * 0.006 + dot.shimmer * 0.57 + rotation.y);
    const dynamicPulse = 0.72 + broadFlicker * dot.flickerDepth + breathing * 0.16 + rotationalFlux * 0.045 + quickSpark * dot.flare * 0.26;

    let size = 0.32 + centerFactor * 2.24 + depthFactor * 0.88 + dot.baseVariance * 0.28;
    size += (broadFlicker * 0.18 + quickSpark * dot.flare * 0.28) * (0.42 + centerFactor * 0.52);
    if (rotated.z < -0.45) size *= 0.76;
    else if (rotated.z < -0.15) size *= 0.88;
    size = clamp(size, 0.24, 4.18);

    let alpha = 0.026 + centerFactor * 0.52 + depthFactor * 0.24;
    if (rotated.z < -0.55) alpha *= 0.16;
    else if (rotated.z < -0.25) alpha *= 0.34;
    else if (rotated.z < 0.02) alpha *= 0.68;
    alpha *= dynamicPulse + slowTide * 0.08;
    alpha = clamp(alpha, 0.012, 0.96);

    const paletteMotion = clamp(0.52 + dot.paletteShift * 0.34 + rotationalFlux * 0.24 + breathing * 0.18, 0, 1);
    const warmthMotion = clamp(0.55 + dot.warmthShift * 0.32 + quickSpark * 0.35 - rotationalFlux * 0.08, 0, 1);
    const lightFactor = clamp(centerFactor * 0.58 + depthFactor * 0.22 + broadFlicker * 0.18, 0, 1);

    let color = mixColor(TERRACOTTA_DARK, BAROQUE_CORE, 0.44 + paletteMotion * 0.38);
    color = mixColor(color, SIGNAL_RED, paletteMotion * 0.82);
    color = mixColor(color, CANDLE_GOLD, warmthMotion * 0.34 + quickSpark * dot.flare * 0.18);
    color = mixColor(color, SMOKE_BLUE, (1 - centerFactorRaw) * 0.14);
    color = mixColor(color, LIGHT_CORAL, lightFactor * 0.28 + broadFlicker * 0.12);

    const shading = 0.95 + centerFactor * 0.045 + depthFactor * 0.045 + broadFlicker * 0.035;
    const red = Math.round(Math.min(255, color[0] * shading));
    const green = Math.round(Math.min(255, color[1] * shading));
    const blue = Math.round(Math.min(255, color[2] * shading));

    ctx.beginPath();
    ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    ctx.fill();
  });
}

export default function BaroccoCoordinateSphereMusicale() {
  const canvasRef = React.useRef(null);
  const stageRef = React.useRef(null);
  const frameRef = React.useRef(0);
  const metricsRef = React.useRef({ width: 0, height: 0, cx: 0, cy: 0, radius: 0, dpr: 1 });
  const rotationRef = React.useRef({ x: -0.16, y: 0.28 });
  const dragRef = React.useRef({ active: false, x: 0, y: 0 });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let resizeObserver;
    let lastTime = 0;

    function resize() {
      const rect = stage.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      metricsRef.current = {
        width,
        height,
        cx: width / 2,
        cy: height / 2,
        radius: Math.min(width, height) * 0.34,
        dpr
      };
    }

    function render(timestamp) {
      const metrics = metricsRef.current;
      if (!metrics.width || !metrics.height) {
        frameRef.current = window.requestAnimationFrame(render);
        return;
      }

      if (!dragRef.current.active) {
        rotationRef.current.y += AUTO_SPIN;
      }

      const elapsed = lastTime ? timestamp - lastTime : 16;
      lastTime = timestamp;
      const time = timestamp * 0.06 + elapsed * 0.02;
      const rotation = rotationRef.current;

      ctx.clearRect(0, 0, metrics.width, metrics.height);
      drawSphereEnvelope(ctx, metrics);
      drawGrid(ctx, metrics, rotation);
      drawDots(ctx, metrics, rotation, time);

      frameRef.current = window.requestAnimationFrame(render);
    }

    function onPointerDown(event) {
      dragRef.current = { active: true, x: event.clientX, y: event.clientY };
      stage.classList.add("is-dragging");
      stage.setPointerCapture?.(event.pointerId);
    }

    function onPointerMove(event) {
      if (!dragRef.current.active) return;
      const deltaX = event.clientX - dragRef.current.x;
      const deltaY = event.clientY - dragRef.current.y;
      dragRef.current.x = event.clientX;
      dragRef.current.y = event.clientY;
      rotationRef.current.y += deltaX * 0.006;
      rotationRef.current.x = clamp(rotationRef.current.x + deltaY * 0.0045, -ROTATION_LIMIT, ROTATION_LIMIT);
    }

    function onPointerUp(event) {
      dragRef.current.active = false;
      stage.classList.remove("is-dragging");
      stage.releasePointerCapture?.(event.pointerId);
    }

    resize();
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    frameRef.current = window.requestAnimationFrame(render);

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      resizeObserver?.disconnect();
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return h(
    "section",
    {
      className: "barocco-musical-globe",
      "aria-labelledby": "barocco-musical-globe-title"
    },
    h(
      "header",
      { className: "barocco-musical-globe__header" },
      h("h2", { id: "barocco-musical-globe-title", className: "barocco-musical-globe__title" }, "Globo degli ascolti")
    ),
    h(
      "div",
      { className: "barocco-musical-globe__stage-card" },
      h(
        "div",
        {
          ref: stageRef,
          className: "barocco-musical-globe__stage",
          role: "img",
          "aria-label": "Globo degli ascolti in preparazione"
        },
        h("canvas", { ref: canvasRef, className: "barocco-musical-globe__canvas", "aria-hidden": "true" })
      )
    )
  );
}
