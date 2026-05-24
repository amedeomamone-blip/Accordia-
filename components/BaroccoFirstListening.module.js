import React from "https://esm.sh/react@18";

const h = React.createElement;
const DEG = Math.PI / 180;
const AUTO_SPIN = 0.0001;
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

const listeningItems = [
  {
    id: "rameau-les-sauvages",
    number: "01",
    title: "Les Sauvages",
    subtitle: "Jean-Philippe Rameau",
    description:
      "Un brano breve, energico e costruito su un ritmo molto riconoscibile. Ascoltalo per cogliere movimento, ripetizione, contrasto e teatralita.",
    thumbnail: "https://i.ytimg.com/vi/2sPC8HsXxik/hqdefault.jpg",
    anchor: sphericalPoint(14, 30),
    questions: [
      {
        question: "Quale elemento si percepisce subito ascoltando il brano?",
        options: ["Una melodia lenta e malinconica", "Un ritmo regolare e incisivo", "Lunghi silenzi", "Suoni elettronici"],
        correct: 1,
        explanation: "Il ritmo e l'elemento piu evidente: la pulsazione resta stabile, riconoscibile e crea subito movimento."
      },
      {
        question: "Questa musica sembra pensata soprattutto per...",
        options: ["accompagnare una danza o una scena teatrale", "aiutare a dormire", "una colonna sonora cinematografica moderna", "una cerimonia religiosa silenziosa"],
        correct: 0,
        explanation: "Il carattere ritmico e l'energia del brano fanno pensare a una musica legata al gesto, alla danza e alla scena."
      },
      {
        question: "Quale caratteristica del Barocco emerge maggiormente?",
        options: ["Improvvisazione jazzistica", "Semplicita estrema", "Contrasto ed energia", "Totale assenza di ripetizioni"],
        correct: 2,
        explanation: "Il brano mostra bene il gusto barocco per movimento, teatralita, forza espressiva e contrasti sonori."
      }
    ]
  },
  {
    id: "vivaldi-estate-tempesta",
    number: "02",
    title: "L'Estate - Tempesta",
    subtitle: "Antonio Vivaldi",
    description:
      "Un ascolto travolgente dalle Quattro stagioni. Segui la corsa degli archi e riconosci come Vivaldi trasforma vento, tuoni e agitazione in musica.",
    thumbnail: "https://i.ytimg.com/vi/ECZQUg6-TlU/hqdefault.jpg",
    anchor: sphericalPoint(-20, -116),
    questions: [
      {
        question: "Quale impressione domina nei primi istanti del brano?",
        options: ["Calma e immobilita", "Agitazione e urgenza", "Dolcezza cullante", "Silenzio quasi totale"],
        correct: 1,
        explanation: "L'attacco e rapido e concitato: l'ascoltatore percepisce subito tensione, movimento e instabilita."
      },
      {
        question: "Quale famiglia di strumenti guida soprattutto l'effetto di tempesta?",
        options: ["Gli archi", "Gli ottoni", "Le percussioni elettroniche", "Il coro"],
        correct: 0,
        explanation: "Gli archi, con figurazioni veloci e accenti serrati, costruiscono l'immagine sonora del temporale."
      },
      {
        question: "Quale tratto barocco emerge con maggiore forza?",
        options: ["Contrasto e drammaticita", "Assenza di ritmo", "Uniformita espressiva", "Semplicita senza tensione"],
        correct: 0,
        explanation: "L'ascolto e un esempio molto efficace del gusto barocco per contrasto, sorpresa e intensita espressiva."
      }
    ]
  },
  {
    id: "bach-badinerie",
    number: "03",
    title: "Badinerie - Suite BWV 1067",
    subtitle: "Johann Sebastian Bach",
    description:
      "Un brano brillante e velocissimo, affidato al flauto e agli archi. Ascoltalo per riconoscere leggerezza, precisione ritmica, dialogo strumentale e virtuosismo barocco.",
    thumbnail: "https://i.ytimg.com/vi/Kl6R4Ui9blc/hqdefault.jpg",
    anchor: sphericalPoint(42, 146),
    questions: [
      {
        question: "Quale strumento emerge con maggiore evidenza nella Badinerie?",
        options: ["Il flauto", "Il timpano", "La chitarra elettrica", "Il coro"],
        correct: 0,
        explanation: "Il flauto e il protagonista piu riconoscibile: espone una linea rapida, brillante e molto agile."
      },
      {
        question: "Quale carattere comunica principalmente il brano?",
        options: ["Pesante e solenne", "Brillante e vivace", "Lento e doloroso", "Statico e senza ritmo"],
        correct: 1,
        explanation: "La Badinerie ha un carattere vivace e leggero, costruito su rapidita, precisione e movimento continuo."
      },
      {
        question: "Che cosa richiede soprattutto l'esecuzione di questo brano?",
        options: ["Lentezza estrema", "Virtuosismo e controllo tecnico", "Improvvisazione senza regole", "Assenza di pulsazione"],
        correct: 1,
        explanation: "La velocita delle figurazioni richiede grande precisione, controllo del suono e sicurezza ritmica."
      }
    ]
  }
];

function ListeningPreview({ item, isActive, previewRef, onSelect }) {
  return h(
    "button",
    {
      ref: previewRef,
      type: "button",
      className: `barocco-musical-globe__orbit-preview${isActive ? " is-active" : ""}`,
      onClick: () => onSelect(item.id),
      onPointerDown: (event) => event.stopPropagation(),
      "aria-pressed": isActive,
      "aria-label": `${item.title} - ${item.subtitle}`
    },
    h(
      "span",
      { className: "barocco-musical-globe__orbit-thumb" },
      h("img", { src: item.thumbnail, alt: `Anteprima video YouTube di ${item.title}` }),
      h("span", { className: "barocco-musical-globe__orbit-play", "aria-hidden": "true" }, "▶")
    ),
    h(
      "span",
      { className: "barocco-musical-globe__orbit-copy" },
      h("span", { className: "barocco-musical-globe__orbit-kicker" }, `${item.number} · Ascolto`),
      h("strong", null, item.title),
      h("span", null, item.subtitle)
    )
  );
}

function QuestionCard({ itemId, question, index, selectedIndex, onChoose }) {
  const hasAnswer = Number.isInteger(selectedIndex);
  const isCorrect = hasAnswer && selectedIndex === question.correct;

  return h(
    "article",
    {
      className: "barocco-listening__question-card",
      "aria-labelledby": `barocco-listening-question-${itemId}-${index}`
    },
    h(
      "div",
      { className: "barocco-listening__question-card-body" },
      h("p", { className: "barocco-listening__question-kicker" }, `Domanda ${String(index + 1).padStart(2, "0")}`),
      h("h3", { id: `barocco-listening-question-${itemId}-${index}` }, question.question),
      h(
        "div",
        { className: "barocco-listening__options", role: "group", "aria-label": `Risposte per la domanda ${index + 1}` },
        question.options.map((option, optionIndex) => {
          const optionClassName = [
            "barocco-listening__option",
            hasAnswer && optionIndex === question.correct ? "is-correct" : "",
            hasAnswer && optionIndex === selectedIndex && optionIndex !== question.correct ? "is-wrong" : "",
            optionIndex === selectedIndex ? "is-selected" : ""
          ].filter(Boolean).join(" ");

          return h(
            "button",
            {
              key: option,
              type: "button",
              className: optionClassName,
              onClick: () => onChoose(itemId, index, optionIndex),
              "aria-pressed": optionIndex === selectedIndex
            },
            h("span", { className: "barocco-listening__option-letter", "aria-hidden": "true" }, String.fromCharCode(65 + optionIndex)),
            h("span", { className: "barocco-listening__option-text" }, option)
          );
        })
      ),
      hasAnswer
        ? h(
            "div",
            { className: `barocco-listening__feedback${isCorrect ? " is-correct" : " is-wrong"}` },
            h("strong", null, isCorrect ? "Risposta corretta" : "Riprova"),
            h("p", null, isCorrect ? question.explanation : "Questa non e la risposta giusta. Riascolta il brano e prova a confrontare meglio gli indizi sonori.")
          )
        : null
    )
  );
}

export default function BaroccoFirstListening() {
  const canvasRef = React.useRef(null);
  const stageRef = React.useRef(null);
  const frameRef = React.useRef(0);
  const metricsRef = React.useRef({ width: 0, height: 0, cx: 0, cy: 0, radius: 0, dpr: 1 });
  const rotationRef = React.useRef({ x: -0.16, y: 0.28 });
  const velocityRef = React.useRef({ x: 0, y: 0 });
  const dragRef = React.useRef({ active: false, x: 0, y: 0, time: 0 });
  const previewRefs = React.useRef(new Map());
  const [activeId, setActiveId] = React.useState(listeningItems[0].id);
  const [answersByItem, setAnswersByItem] = React.useState({});

  const activeListening = listeningItems.find((item) => item.id === activeId) || listeningItems[0];

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
        radius: Math.min(width, height) * 0.35,
        dpr
      };
    }

    function render(timestamp) {
      const metrics = metricsRef.current;
      if (!metrics.width || !metrics.height) {
        frameRef.current = window.requestAnimationFrame(render);
        return;
      }

      const elapsed = lastTime ? Math.min(timestamp - lastTime, 42) : 16;
      lastTime = timestamp;

      if (!dragRef.current.active) {
        rotationRef.current.y += AUTO_SPIN * elapsed;
        rotationRef.current.y += velocityRef.current.y;
        rotationRef.current.x = clamp(rotationRef.current.x + velocityRef.current.x, -ROTATION_LIMIT, ROTATION_LIMIT);
        velocityRef.current.y *= 0.94;
        velocityRef.current.x *= 0.9;
      }

      const time = timestamp * 0.06 + elapsed * 0.02;
      const rotation = rotationRef.current;

      ctx.clearRect(0, 0, metrics.width, metrics.height);
      drawSphereEnvelope(ctx, metrics);
      drawGrid(ctx, metrics, rotation);
      drawDots(ctx, metrics, rotation, time);

      listeningItems.forEach((item) => {
        const preview = previewRefs.current.get(item.id);
        if (!preview) return;

        const rotatedAnchor = rotatePoint(item.anchor, rotation.x, rotation.y);
        const projectedAnchor = projectPoint(rotatedAnchor, metrics);
        const frontFactor = clamp((rotatedAnchor.z + 1) / 2, 0, 1);
        const offsetX = rotatedAnchor.x >= 0 ? metrics.radius * 0.52 : -metrics.radius * 0.52;
        const offsetY = rotatedAnchor.y >= 0 ? metrics.radius * 0.12 : -metrics.radius * 0.12;
        const previewX = projectedAnchor.x + offsetX;
        const previewY = projectedAnchor.y + offsetY;

        preview.style.setProperty("--preview-x", `${previewX}px`);
        preview.style.setProperty("--preview-y", `${previewY}px`);
        preview.style.setProperty("--preview-opacity", `${0.38 + frontFactor * 0.62}`);
        preview.style.setProperty("--preview-scale", `${0.82 + frontFactor * 0.18}`);
        preview.style.zIndex = String(10 + Math.round(frontFactor * 20));
      });

      frameRef.current = window.requestAnimationFrame(render);
    }

    function onPointerDown(event) {
      if (event.target.closest(".barocco-musical-globe__orbit-preview")) return;
      event.preventDefault();
      dragRef.current = { active: true, x: event.clientX, y: event.clientY, time: performance.now() };
      velocityRef.current = { x: 0, y: 0 };
      stage.classList.add("is-dragging");
      stage.setPointerCapture?.(event.pointerId);
    }

    function onPointerMove(event) {
      if (!dragRef.current.active) return;
      event.preventDefault();
      const now = performance.now();
      const deltaX = event.clientX - dragRef.current.x;
      const deltaY = event.clientY - dragRef.current.y;
      const elapsed = Math.max(now - dragRef.current.time, 16);
      dragRef.current.x = event.clientX;
      dragRef.current.y = event.clientY;
      dragRef.current.time = now;

      const spinY = deltaX * 0.0082;
      const spinX = deltaY * 0.0062;
      rotationRef.current.y += spinY;
      rotationRef.current.x = clamp(rotationRef.current.x + spinX, -ROTATION_LIMIT, ROTATION_LIMIT);
      velocityRef.current.y = clamp((spinY / elapsed) * 16, -0.06, 0.06);
      velocityRef.current.x = clamp((spinX / elapsed) * 16, -0.04, 0.04);
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

    stage.addEventListener("pointerdown", onPointerDown, { passive: false });
    stage.addEventListener("pointermove", onPointerMove, { passive: false });
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

  function handleAnswer(itemId, questionIndex, optionIndex) {
    setAnswersByItem((current) => ({
      ...current,
      [itemId]: {
        ...(current[itemId] || {}),
        [questionIndex]: optionIndex
      }
    }));
  }

  return h(
    "section",
    {
      className: "barocco-listening",
      "aria-labelledby": "barocco-listening-title"
    },
    h(
      "div",
      { className: "barocco-listening__inner" },
      h(
        "header",
        { className: "barocco-listening__head" },
        h("p", { className: "barocco-listening__eyebrow" }, "Primi ascolti"),
        h("h2", { id: "barocco-listening-title" }, activeListening.title),
        h("p", { className: "barocco-listening__subtitle" }, activeListening.subtitle),
        h("p", { className: "barocco-listening__intro" }, activeListening.description)
      ),
      h(
        "div",
        { className: "barocco-listening__stage" },
        h(
          "div",
          { className: "barocco-musical-globe__stage-card" },
          h(
            "div",
            {
              ref: stageRef,
              className: "barocco-musical-globe__stage",
              role: "img",
              "aria-label": "Globo degli ascolti con tre anteprime video orbitanti"
            },
            h("canvas", { ref: canvasRef, className: "barocco-musical-globe__canvas", "aria-hidden": "true" }),
            h("div", { className: "barocco-musical-globe__orbit-layer", "aria-hidden": "true" }),
            listeningItems.map((item) =>
              h(ListeningPreview, {
                key: item.id,
                item,
                isActive: item.id === activeListening.id,
                previewRef: (node) => {
                  if (node) previewRefs.current.set(item.id, node);
                  else previewRefs.current.delete(item.id);
                },
                onSelect: setActiveId
              })
            )
          )
        )
      ),
      h(
        "div",
        {
          className: "barocco-listening__questions-track",
          role: "list",
          "aria-label": `Domande a risposta multipla per ${activeListening.title}`
        },
        activeListening.questions.map((question, index) =>
          h(
            "div",
            { key: `${activeListening.id}-${index}`, className: "barocco-listening__question-slot", role: "listitem" },
            h(QuestionCard, {
              itemId: activeListening.id,
              question,
              index,
              selectedIndex: answersByItem[activeListening.id]?.[index],
              onChoose: handleAnswer
            })
          )
        )
      )
    )
  );
}
