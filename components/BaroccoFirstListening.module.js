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
  const latitudes = [-78, -66, -54, -42, -30, -18, -6, 6, 18, 30, 42, 54, 66, 78];

  latitudes.forEach((latitude, latIndex) => {
    const latitudeWeight = Math.cos(latitude * DEG);
    const count = Math.round(12 + latitudeWeight * 27);
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
        twinkleSpeed: 0.024 + (microSeed % 23) * 0.004,
        flare: seed % 7 === 0 ? 1.08 : seed % 4 === 0 ? 0.7 : 0.38,
        flickerDepth: 0.52 + (seed % 29) * 0.014
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
    const strobeGate = Math.pow(
      clamp(0.5 + 0.5 * Math.sin(time * (0.052 + dot.flare * 0.016) + dot.shimmer * 2.34 + index * 0.052), 0, 1),
      1.52
    );
    const dynamicPulse = 0.72 + broadFlicker * dot.flickerDepth + breathing * 0.18 + rotationalFlux * 0.045 + quickSpark * dot.flare * 0.34 + strobeGate * 0.16;

    let size = 0.34 + centerFactor * 2.34 + depthFactor * 0.92 + dot.baseVariance * 0.28;
    size += (broadFlicker * 0.18 + quickSpark * dot.flare * 0.34 + strobeGate * (0.34 + dot.flare * 0.24)) * (0.42 + centerFactor * 0.52);
    if (rotated.z < -0.45) size *= 0.76;
    else if (rotated.z < -0.15) size *= 0.88;
    size = clamp(size, 0.24, 4.6);

    let alpha = 0.034 + centerFactor * 0.56 + depthFactor * 0.25;
    if (rotated.z < -0.55) alpha *= 0.16;
    else if (rotated.z < -0.25) alpha *= 0.34;
    else if (rotated.z < 0.02) alpha *= 0.68;
    alpha *= dynamicPulse + slowTide * 0.08 + strobeGate * (0.48 + dot.flare * 0.28);
    alpha = clamp(alpha, 0.014, 0.98);

    const paletteMotion = clamp(0.52 + dot.paletteShift * 0.34 + rotationalFlux * 0.24 + breathing * 0.18, 0, 1);
    const warmthMotion = clamp(0.55 + dot.warmthShift * 0.32 + quickSpark * 0.35 - rotationalFlux * 0.08, 0, 1);
    const lightFactor = clamp(centerFactor * 0.58 + depthFactor * 0.22 + broadFlicker * 0.18, 0, 1);

    let color = mixColor(TERRACOTTA_DARK, BAROQUE_CORE, 0.44 + paletteMotion * 0.38);
    color = mixColor(color, SIGNAL_RED, paletteMotion * 0.92);
    color = mixColor(color, CANDLE_GOLD, warmthMotion * 0.34 + quickSpark * dot.flare * 0.18);
    color = mixColor(color, SMOKE_BLUE, (1 - centerFactorRaw) * 0.08);
    color = mixColor(color, LIGHT_CORAL, lightFactor * 0.34 + broadFlicker * 0.14);

    const shading = 0.95 + centerFactor * 0.045 + depthFactor * 0.045 + broadFlicker * 0.035 + strobeGate * 0.06;
    const red = Math.round(Math.min(255, color[0] * shading));
    const green = Math.round(Math.min(255, color[1] * shading));
    const blue = Math.round(Math.min(255, color[2] * shading));

    ctx.beginPath();
    ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    ctx.fill();

    if (strobeGate > 0.34 && rotated.z > -0.18) {
      ctx.beginPath();
      ctx.arc(projected.x, projected.y, size * (2.1 + dot.flare * 0.5), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${clamp(alpha * 0.2, 0.036, 0.22)})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(projected.x, projected.y, size * (1.14 + dot.flare * 0.08), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${255}, ${245}, ${236}, ${clamp(alpha * 0.52, 0.08, 0.28)})`;
      ctx.fill();
    }
  });
}

const listeningItems = [
  {
    id: "rameau-les-sauvages",
    number: "01",
    title: "Forêts Paisibles",
    subtitle: "Jean-Philippe Rameau",
    description:
      "Un brano breve, energico e costruito su un ritmo molto riconoscibile. Ascoltalo per cogliere movimento, ripetizione, contrasto e teatralita.",
    thumbnail: "https://i.ytimg.com/vi/2sPC8HsXxik/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=2sPC8HsXxik",
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
      },
      {
        question: "Che effetto produce la ripetizione del ritmo durante il brano?",
        options: ["Rende l'ascolto instabile e confuso", "Cancella la sensazione di movimento", "Crea slancio, ordine e riconoscibilita", "Fa sparire completamente la melodia"],
        correct: 2,
        explanation: "La ripetizione ritmica aiuta a dare coesione al brano e rende subito percepibile la sua energia."
      },
      {
        question: "Quale parola descrive meglio il carattere generale di questo ascolto?",
        options: ["Teatrale", "Spento", "Uniforme", "Astratto"],
        correct: 0,
        explanation: "Il brano ha un carattere scenico e dinamico, molto vicino al gusto teatrale dell'epoca barocca."
      },
      {
        question: "Ascoltando Forêts Paisibles, la musica sembra soprattutto voler...",
        options: ["restare immobile e contemplativa", "trasmettere gesto, movimento e presenza scenica", "evitare ogni accento marcato", "scomparire dietro il silenzio"],
        correct: 1,
        explanation: "Il brano comunica chiaramente gesto, vitalita e presenza, come se accompagnasse una scena in movimento."
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
    videoUrl: "https://www.youtube.com/watch?v=ECZQUg6-TlU",
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
      },
      {
        question: "Che cosa sembra descrivere la musica di Vivaldi in questo ascolto?",
        options: ["Un paesaggio immobile", "Una scena naturale violenta", "Una conversazione tranquilla", "Una ninna nanna"],
        correct: 1,
        explanation: "La scrittura musicale suggerisce una tempesta: vento, agitazione e forza improvvisa della natura."
      },
      {
        question: "Il ruolo del violino solista in questo brano e soprattutto quello di...",
        options: ["restare sempre in secondo piano", "imitare la voce di un coro", "guidare con passaggi rapidi e virtuosistici", "suonare accordi lenti e statici"],
        correct: 2,
        explanation: "Nel concerto barocco il solista emerge con passaggi brillanti e veloci che guidano l'ascolto."
      },
      {
        question: "Perche questo brano e utile per capire il linguaggio barocco?",
        options: ["Perche elimina del tutto il contrasto", "Perche usa una sola dinamica dall'inizio alla fine", "Perche trasforma immagini e affetti in suono", "Perche rinuncia al ritmo"],
        correct: 2,
        explanation: "Vivaldi mostra bene come il Barocco possa raccontare immagini ed emozioni attraverso ritmo, gesto e colore sonoro."
      }
    ]
  },
  {
    id: "bach-badinerie",
    number: "03",
    title: "Badinerie",
    subtitle: "Johann Sebastian Bach",
    description:
      "Un brano brillante e velocissimo, affidato al flauto e agli archi. Ascoltalo per riconoscere leggerezza, precisione ritmica, dialogo strumentale e virtuosismo barocco.",
    thumbnail: "https://i.ytimg.com/vi/Kl6R4Ui9blc/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=Kl6R4Ui9blc",
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
      },
      {
        question: "Come si puo descrivere il rapporto tra flauto e archi in questo ascolto?",
        options: ["Un dialogo rapido e ben coordinato", "Una totale assenza di contatto", "Un contrasto tra coro e orchestra", "Un accompagnamento senza ritmo"],
        correct: 0,
        explanation: "Il flauto dialoga con gli archi in modo serrato e preciso, creando una trama agile e brillante."
      },
      {
        question: "Quale sensazione lascia soprattutto la pulsazione del brano?",
        options: ["Elasticita controllata e continuita", "Pesantezza e lentezza", "Sospensione senza battito", "Disordine casuale"],
        correct: 0,
        explanation: "La pulsazione resta viva e continua, sostenendo il virtuosismo senza perdere chiarezza."
      },
      {
        question: "Che cosa rende tipicamente barocco questo brano di Bach?",
        options: ["La ricerca di effetti elettronici", "La scrittura brillante e ornata", "La rinuncia al contrappunto", "La semplicita quasi infantile"],
        correct: 1,
        explanation: "La Badinerie unisce leggerezza, precisione e scrittura ornamentale, elementi molto riconoscibili del Barocco."
      }
    ]
  }
];

function ListeningPreview({ item, isActive, previewRef, onSelect }) {
  return h(
    "article",
    {
      ref: previewRef,
      role: "button",
      tabIndex: 0,
      className: `barocco-musical-globe__orbit-preview${isActive ? " is-active" : ""}`,
      onClick: () => onSelect(item.id),
      onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(item.id);
        }
      },
      onPointerDown: (event) => event.stopPropagation(),
      "aria-pressed": isActive,
      "aria-label": `${item.title} - ${item.subtitle}`
    },
    h(
      "a",
      {
        className: "barocco-musical-globe__orbit-thumb",
        href: item.videoUrl,
        target: "_blank",
        rel: "noreferrer",
        onClick: (event) => {
          event.stopPropagation();
          onSelect(item.id);
        },
        onFocus: () => onSelect(item.id),
        "aria-label": `Apri su YouTube ${item.title}`
      },
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

function ListeningPillNav({ items, activeId, onSelect }) {
  return h(
    "nav",
    { className: "barocco-listening__pillnav", "aria-label": "Scegli il brano da ascoltare" },
    h(
      "div",
      { className: "barocco-listening__pillnav-rail" },
      items.map((item) =>
        h(
          "button",
          {
            key: item.id,
            type: "button",
            className: `barocco-listening__pill${item.id === activeId ? " is-active" : ""}`,
            onClick: () => onSelect(item.id),
            "aria-current": item.id === activeId ? "true" : undefined
          },
          h("span", { className: "barocco-listening__pill-dot", "aria-hidden": "true" }),
          h("span", { className: "barocco-listening__pill-number" }, item.number),
          h("strong", null, item.title)
        )
      )
    )
  );
}

function QuestionCard({ itemId, question, index, selectedIndex, onChoose, isEnabled }) {
  const hasAnswer = Number.isInteger(selectedIndex);
  const isCorrect = hasAnswer && selectedIndex === question.correct;

  return h(
    "article",
    {
      className: `barocco-listening__question-card${isEnabled ? "" : " is-locked"}`,
      "aria-labelledby": `barocco-listening-question-${itemId}-${index}`,
      "aria-disabled": !isEnabled
    },
    h(
      "div",
      { className: "barocco-listening__question-card-body" },
      h("h3", { id: `barocco-listening-question-${itemId}-${index}` }, question.question),
      h(
        "div",
        { className: "barocco-listening__options", role: "group", "aria-label": `Risposte per la domanda ${index + 1}` },
        question.options.map((option, optionIndex) => {
          const optionClassName = [
            "barocco-listening__option",
            hasAnswer && optionIndex === selectedIndex && optionIndex === question.correct ? "is-correct" : "",
            hasAnswer && optionIndex === selectedIndex && optionIndex !== question.correct ? "is-wrong" : "",
            optionIndex === selectedIndex ? "is-selected" : ""
          ].filter(Boolean).join(" ");

          return h(
            "button",
            {
              key: option,
              type: "button",
              className: optionClassName,
              disabled: !isEnabled || isCorrect,
              onClick: () => onChoose(itemId, index, optionIndex),
              "aria-pressed": optionIndex === selectedIndex
            },
            h("span", { className: "barocco-listening__option-letter", "aria-hidden": "true" }, String.fromCharCode(65 + optionIndex)),
            h("span", { className: "barocco-listening__option-text" }, option)
          );
        })
      )
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
  const activeAnswers = answersByItem[activeListening.id] || {};

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
        radius: Math.min(width, height) * 0.45,
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
      h(ListeningPillNav, {
        items: listeningItems,
        activeId: activeListening.id,
        onSelect: setActiveId
      }),
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
        activeListening.questions.map((question, index) => {
          const isEnabled = index === 0 || activeAnswers[index - 1] === activeListening.questions[index - 1].correct;

          return h(
            "div",
            {
              key: `${activeListening.id}-${index}`,
              className: `barocco-listening__question-slot${isEnabled ? "" : " is-locked"}`,
              role: "listitem"
            },
            h(QuestionCard, {
              itemId: activeListening.id,
              question,
              index,
              selectedIndex: activeAnswers[index],
              onChoose: handleAnswer,
              isEnabled
            })
          );
        })
      )
    )
  );
}
