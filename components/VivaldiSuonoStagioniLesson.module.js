import React from "https://esm.sh/react@18";
import { MetaStrip, cn, useActiveSection } from "./LessonShared.module.js";
const routeItems = [
  { id: "contesto", label: "Barocco" },
  { id: "concerto", label: "Concerto" },
  { id: "movimenti", label: "Tre movimenti" },
  { id: "stagioni", label: "Quattro stagioni" },
  { id: "ascolto", label: "Ascolto" },
  { id: "mosaico", label: "Mosaico" },
  { id: "scrittura", label: "Scrivi" },
  { id: "valutazione", label: "Valutazione" }
];
const heroGoals = [
  {
    title: "Dialogo",
    text: "Capisci che il concerto solista mette in relazione uno strumento protagonista e l'orchestra."
  },
  {
    title: "Forma",
    text: "Riconosci la struttura generale in tre movimenti: veloce, lento, veloce."
  },
  {
    title: "Interpretazione",
    text: "Trasformi l'ascolto in un mosaico sonoro-cromatico fatto di colore, densita e movimento."
  }
];
const metaItems = [
  { label: "Nucleo", value: "Il Barocco" },
  { label: "Forma guida", value: "Concerto solista" },
  { label: "Opera guida", value: "Le quattro stagioni" },
  { label: "Obiettivo", value: "ascoltare la forma e tradurla in scelte visive" }
];
const vivaldiFacts = [
  { label: "Compositore", value: "veneziano" },
  { label: "Strumento", value: "violinista" },
  { label: "Soprannome", value: "prete rosso" },
  { label: "Luogo chiave", value: "Ospedale della Pieta" },
  { label: "Nodo storico", value: "sviluppo del concerto solista" },
  { label: "Opera guida", value: "Le quattro stagioni" }
];
const concertoRows = [
  {
    element: "Solista",
    function: "protagonista: espone, canta, corre, emerge"
  },
  {
    element: "Orchestra",
    function: "gruppo: risponde, sostiene, contrasta, crea lo spazio sonoro"
  },
  {
    element: "Dialogo",
    function: "alternanza tra solista e orchestra"
  },
  {
    element: "Contrasto",
    function: "forte/piano, pieno/vuoto, individuo/gruppo, energia/sospensione"
  }
];
const movementRows = [
  {
    label: "I movimento",
    tempo: "Allegro",
    text: "veloce, energico, riconoscibile; presenta il carattere principale"
  },
  {
    label: "II movimento",
    tempo: "Andante / Adagio / Largo",
    text: "lento, cantabile, sospeso; crea una pausa espressiva"
  },
  {
    label: "III movimento",
    tempo: "Allegro / Presto",
    text: "veloce, brillante, conclusivo; chiude con slancio"
  }
];
const seasonRows = [
  {
    title: "Primavera",
    text: "uccelli, ruscelli, luce, risveglio, movimento leggero."
  },
  {
    title: "Estate",
    text: "caldo, afa, immobilita, temporale, tensione."
  },
  {
    title: "Autunno",
    text: "festa, danza, vendemmia, caccia, movimento collettivo."
  },
  {
    title: "Inverno",
    text: "freddo, pioggia, ghiaccio, passi incerti, sospensione."
  }
];
const listeningQuestions = [
  "Quando senti il violino protagonista?",
  "Quando risponde l'orchestra?",
  "Il movimento e veloce o lento?",
  "Il suono e caldo o freddo?",
  "E leggero o pesante?",
  "E stabile o agitato?",
  "Quale colore useresti?",
  "Dove cambia atmosfera?"
];
const mosaicSteps = [
  "Ascolta il brano una prima volta e individua il carattere generale: luminoso, freddo, agitato, leggero, festoso, scuro.",
  "Riascolta e dividi il tempo in zone: inizio, sviluppo, cambiamento, chiusura.",
  "Scegli i colori in base a cio che senti, non a cio che vedi.",
  "Usa linee curve per il movimento della melodia e blocchi compatti per i momenti piu forti o ritmici.",
  "Lascia zone piu vuote quando senti attesa, respiro o sospensione.",
  'Alla fine scrivi una breve spiegazione: "Ho scelto questi colori perche..."'
];
const legendRows = [
  {
    label: "Colori caldi",
    text: "luce, energia, festa",
    kind: "color",
    tone: "warm"
  },
  {
    label: "Colori freddi",
    text: "gelo, pioggia, sospensione",
    kind: "color",
    tone: "cold"
  },
  {
    label: "Colori scuri",
    text: "tensione, temporale, intensita",
    kind: "color",
    tone: "dark"
  },
  {
    label: "Colori chiari",
    text: "leggerezza, aria, canto",
    kind: "color",
    tone: "light"
  },
  {
    label: "Linee curve",
    text: "melodia, vento, acqua, movimento",
    kind: "curve"
  },
  {
    label: "Blocchi compatti",
    text: "accenti forti, ritmo, pieni orchestrali",
    kind: "blocks"
  },
  {
    label: "Spazi piu vuoti",
    text: "attesa, respiro, pausa",
    kind: "space"
  }
];
const writingFocus = [
  "solista / orchestra",
  "veloce / lento / veloce",
  "timbro",
  "atmosfera",
  "movimento"
];
const rubricRows = [
  {
    item: "Riconoscimento del dialogo solista/orchestra",
    points: "2 punti"
  },
  {
    item: "Riconoscimento della struttura veloce/lento/veloce",
    points: "2 punti"
  },
  {
    item: "Coerenza tra musica e scelte cromatiche",
    points: "3 punti"
  },
  {
    item: "Qualita compositiva del mosaico",
    points: "2 punti"
  },
  {
    item: "Chiarezza della spiegazione scritta",
    points: "1 punto"
  }
];
const springPalette = {
  greenStrong: "#7ea153",
  greenSoft: "#9fbe69",
  yellowStrong: "#e6c554",
  yellowSoft: "#f1df8b",
  skyStrong: "#a8d0e6",
  skySoft: "#dceff6",
  pinkSoft: "#efc7d8",
  roseSoft: "#f5dde8",
  orangeAccent: "#da8f39"
};
const springMatrix = [
  ["greenStrong", "yellowStrong", "skyStrong", null, "pinkSoft", "greenSoft", "yellowSoft", "skySoft", null, "roseSoft", "greenSoft", "orangeAccent"],
  ["skySoft", "greenSoft", "yellowSoft", "skyStrong", "pinkSoft", "yellowStrong", "greenStrong", "skySoft", "roseSoft", "greenSoft", "yellowSoft", null],
  ["pinkSoft", "skyStrong", "greenStrong", "yellowStrong", "orangeAccent", "skySoft", "greenSoft", "yellowSoft", "skyStrong", "pinkSoft", "greenStrong", "yellowStrong"],
  ["greenSoft", "yellowSoft", null, "skySoft", "pinkSoft", "greenStrong", "orangeAccent", "yellowStrong", "skyStrong", "roseSoft", "greenSoft", "skySoft"],
  ["yellowSoft", "skySoft", "greenSoft", null, "pinkSoft", "yellowStrong", "greenStrong", "skyStrong", "orangeAccent", "yellowSoft", null, "roseSoft"],
  [null, "greenSoft", "skySoft", "yellowSoft", "pinkSoft", null, "greenStrong", "yellowStrong", "skySoft", "roseSoft", "greenSoft", "orangeAccent"]
];
function RouteNav() {
  const activeId = useActiveSection(routeItems.map((item) => item.id));
  return /* @__PURE__ */ React.createElement("nav", { className: "vivaldi-route", "aria-label": "Percorso della lezione" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell vivaldi-route__track" }, routeItems.map((item, index) => /* @__PURE__ */ React.createElement(
    "a",
    {
      key: item.id,
      href: `#${item.id}`,
      className: cn("vivaldi-route__link", activeId === item.id && "is-active"),
      "aria-current": activeId === item.id ? "step" : void 0
    },
    /* @__PURE__ */ React.createElement("span", { className: "vivaldi-route__index" }, String(index + 1).padStart(2, "0")),
    /* @__PURE__ */ React.createElement("span", null, item.label)
  ))));
}
function FactList({ items }) {
  return /* @__PURE__ */ React.createElement("dl", { className: "vivaldi-facts" }, items.map((item) => /* @__PURE__ */ React.createElement("div", { key: item.label, className: "vivaldi-facts__row" }, /* @__PURE__ */ React.createElement("dt", null, item.label), /* @__PURE__ */ React.createElement("dd", null, item.value))));
}
function ConcertTable() {
  return /* @__PURE__ */ React.createElement("div", { className: "vivaldi-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "vivaldi-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Elemento"), /* @__PURE__ */ React.createElement("th", null, "Funzione"))), /* @__PURE__ */ React.createElement("tbody", null, concertoRows.map((row) => /* @__PURE__ */ React.createElement("tr", { key: row.element }, /* @__PURE__ */ React.createElement("th", { scope: "row" }, row.element), /* @__PURE__ */ React.createElement("td", null, row.function))))));
}
function LegendSwatch({ item }) {
  if (item.kind === "curve") {
    return /* @__PURE__ */ React.createElement("span", { className: "vivaldi-legend__swatch vivaldi-legend__swatch--frame", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 100 44", focusable: "false", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M8 30 C 24 12, 44 12, 60 24 S 84 36, 92 14" })));
  }
  if (item.kind === "blocks") {
    return /* @__PURE__ */ React.createElement("span", { className: "vivaldi-legend__swatch vivaldi-legend__swatch--frame", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 100 44", focusable: "false", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("rect", { x: "8", y: "10", width: "24", height: "24", rx: "5" }), /* @__PURE__ */ React.createElement("rect", { x: "38", y: "6", width: "18", height: "32", rx: "5" }), /* @__PURE__ */ React.createElement("rect", { x: "62", y: "12", width: "30", height: "20", rx: "5" })));
  }
  if (item.kind === "space") {
    return /* @__PURE__ */ React.createElement("span", { className: "vivaldi-legend__swatch vivaldi-legend__swatch--frame", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 100 44", focusable: "false", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("rect", { x: "8", y: "18", width: "22", height: "8", rx: "4" }), /* @__PURE__ */ React.createElement("rect", { x: "70", y: "18", width: "22", height: "8", rx: "4" })));
  }
  return /* @__PURE__ */ React.createElement(
    "span",
    {
      className: cn("vivaldi-legend__swatch", item.tone && `is-${item.tone}`),
      "aria-hidden": "true"
    }
  );
}
function SpringMosaicExample() {
  const cell = 84;
  const gap = 10;
  const pad = 28;
  const rows = springMatrix.length;
  const cols = springMatrix[0].length;
  const width = pad * 2 + cols * cell + (cols - 1) * gap;
  const height = pad * 2 + rows * cell + (rows - 1) * gap;
  const cells = [];
  springMatrix.forEach((row, rowIndex) => {
    row.forEach((tone, colIndex) => {
      if (!tone) {
        return;
      }
      cells.push({
        key: `${rowIndex}-${colIndex}`,
        x: pad + colIndex * (cell + gap),
        y: pad + rowIndex * (cell + gap),
        fill: springPalette[tone]
      });
    });
  });
  return /* @__PURE__ */ React.createElement("div", { className: "vivaldi-mosaic-frame" }, /* @__PURE__ */ React.createElement(
    "svg",
    {
      className: "vivaldi-mosaic",
      viewBox: `0 0 ${width} ${height}`,
      role: "img",
      "aria-label": "Esempio di mosaico sonoro-cromatico ispirato alla Primavera di Vivaldi"
    },
    /* @__PURE__ */ React.createElement("rect", { width, height, fill: "#fbf8f0" }),
    /* @__PURE__ */ React.createElement("g", { className: "vivaldi-mosaic__grid", "aria-hidden": "true" }, Array.from({ length: rows + 1 }, (_, index) => {
      const y = pad - gap / 2 + index * (cell + gap);
      return /* @__PURE__ */ React.createElement("line", { key: `h-${index}`, x1: pad - gap / 2, y1: y, x2: width - pad + gap / 2, y2: y });
    }), Array.from({ length: cols + 1 }, (_, index) => {
      const x = pad - gap / 2 + index * (cell + gap);
      return /* @__PURE__ */ React.createElement("line", { key: `v-${index}`, x1: x, y1: pad - gap / 2, x2: x, y2: height - pad + gap / 2 });
    })),
    cells.map((item) => /* @__PURE__ */ React.createElement(
      "rect",
      {
        key: item.key,
        x: item.x,
        y: item.y,
        width: cell,
        height: cell,
        rx: "12",
        fill: item.fill
      }
    )),
    /* @__PURE__ */ React.createElement("g", { className: "vivaldi-mosaic__lines", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M44 118 C 182 34, 304 198, 452 118 S 716 42, 904 132 S 1090 154, 1134 92" }), /* @__PURE__ */ React.createElement("path", { d: "M96 314 C 196 244, 326 254, 442 330 S 684 422, 862 320 S 1030 248, 1108 302" }), /* @__PURE__ */ React.createElement("path", { d: "M188 486 C 332 396, 474 520, 628 438 S 878 386, 1048 466" }))
  ));
}
function VivaldiSuonoStagioniLesson() {
  return /* @__PURE__ */ React.createElement("div", { className: "lesson-editorial-page vivaldi-lesson", "data-lesson-model": "editoriale" }, /* @__PURE__ */ React.createElement("header", { className: "vivaldi-hero", id: "apertura" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell vivaldi-hero__grid" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-hero__copy" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-eyebrow" }, "Il Barocco \xB7 Lezione Accordia"), /* @__PURE__ */ React.createElement("h1", { className: "vivaldi-title" }, "Vivaldi. Il suono delle stagioni"), /* @__PURE__ */ React.createElement("p", { className: "vivaldi-subtitle" }, "Il concerto solista tra ascolto guidato e mosaico sonoro-cromatico"), /* @__PURE__ */ React.createElement("p", { className: "vivaldi-opening" }, "Con Vivaldi il violino non resta fermo. Entra, risponde, corre, canta, imita, sfida l'orchestra. Nelle Quattro stagioni il suono diventa paesaggio: primavera, estate, autunno e inverno non vengono raccontati con le parole, ma costruiti con ritmo, timbro, contrasto e movimento.")), /* @__PURE__ */ React.createElement("aside", { className: "vivaldi-hero__aside" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-hero__stamp" }, "Violino solista \xB7 orchestra"), /* @__PURE__ */ React.createElement(FactList, { items: vivaldiFacts }), /* @__PURE__ */ React.createElement("p", { className: "vivaldi-hero__note" }, "Qui il punto non e imparare una definizione. Il punto e sentire come il violino diventa protagonista e come l'orchestra gli costruisce intorno spazio, contrasto e appoggio."))), /* @__PURE__ */ React.createElement("div", { className: "lesson-shell vivaldi-goal-grid" }, heroGoals.map((item) => /* @__PURE__ */ React.createElement("article", { key: item.title, className: "vivaldi-goal" }, /* @__PURE__ */ React.createElement("p", null, item.title), /* @__PURE__ */ React.createElement("strong", null, item.text))))), /* @__PURE__ */ React.createElement(MetaStrip, { items: metaItems }), /* @__PURE__ */ React.createElement(RouteNav, null), /* @__PURE__ */ React.createElement("section", { className: "vivaldi-block", id: "contesto" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell vivaldi-split vivaldi-split--intro" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-copy" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-section-head" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-section-label" }, "Barocco e Vivaldi"), /* @__PURE__ */ React.createElement("h2", null, "Movimento, contrasto, meraviglia.")), /* @__PURE__ */ React.createElement("p", null, "Nel Barocco contano movimento, contrasto, meraviglia, teatralita, energia, luce e ombra, gesto. In Vivaldi queste parole non restano astratte: il violino scatta in avanti, l'orchestra apre e richiude lo spazio, il suono cambia clima in pochi secondi."), /* @__PURE__ */ React.createElement("p", null, "Per questo Vivaldi e centrale qui: non solo perche scrive concerti, ma perche fa sentire in modo netto che il concerto solista e un rapporto vivo tra una voce strumentale e il gruppo che la sostiene, la contrasta e la rilancia."), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-keywords", "aria-label": "Parole chiave del Barocco" }, /* @__PURE__ */ React.createElement("span", null, "movimento"), /* @__PURE__ */ React.createElement("span", null, "contrasto"), /* @__PURE__ */ React.createElement("span", null, "meraviglia"), /* @__PURE__ */ React.createElement("span", null, "teatralita"), /* @__PURE__ */ React.createElement("span", null, "energia"), /* @__PURE__ */ React.createElement("span", null, "luce e ombra"), /* @__PURE__ */ React.createElement("span", null, "gesto"))), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-composer-card" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-section-label" }, "Antonio Vivaldi"), /* @__PURE__ */ React.createElement("ul", { className: "vivaldi-bullet-list" }, /* @__PURE__ */ React.createElement("li", null, "compositore veneziano"), /* @__PURE__ */ React.createElement("li", null, "violinista"), /* @__PURE__ */ React.createElement("li", null, 'detto "prete rosso"'), /* @__PURE__ */ React.createElement("li", null, "legato all'Ospedale della Pieta"), /* @__PURE__ */ React.createElement("li", null, "autore centrale nello sviluppo del concerto solista"), /* @__PURE__ */ React.createElement("li", null, "compositore delle Quattro stagioni")), /* @__PURE__ */ React.createElement("p", null, "Qui serve ricordarlo cosi: violino, energia ritmica, scrittura descrittiva, dialogo con l'orchestra.")))), /* @__PURE__ */ React.createElement("section", { className: "vivaldi-block vivaldi-block--surface", id: "concerto" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-section-head" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-section-label" }, "La forma"), /* @__PURE__ */ React.createElement("h2", null, "Concerto solista: uno e molti"), /* @__PURE__ */ React.createElement("p", null, "Nel concerto solista uno strumento protagonista dialoga e si contrappone all'orchestra. Qui la forma non e uno schema astratto: e un rapporto di energie, risposte, spazi sonori e contrasti.")), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-concerto-schema", "aria-label": "Schema del concerto solista" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-concerto-schema__eyebrow" }, "Concerto solista"), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-concerto-schema__line" }, /* @__PURE__ */ React.createElement("span", { className: "vivaldi-concerto-schema__word" }, "UNO"), /* @__PURE__ */ React.createElement("span", { className: "vivaldi-concerto-schema__arrow" }, "\u2194"), /* @__PURE__ */ React.createElement("span", { className: "vivaldi-concerto-schema__word" }, "MOLTI")), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-concerto-schema__labels" }, /* @__PURE__ */ React.createElement("span", null, "violino solista"), /* @__PURE__ */ React.createElement("span", null, "orchestra"))), /* @__PURE__ */ React.createElement(ConcertTable, null))), /* @__PURE__ */ React.createElement("section", { className: "vivaldi-block", id: "movimenti" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-section-head" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-section-label" }, "Struttura tripartita"), /* @__PURE__ */ React.createElement("h2", null, "La forma in tre movimenti")), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-movement-grid" }, movementRows.map((row) => /* @__PURE__ */ React.createElement("article", { key: row.label, className: "vivaldi-movement" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-movement__label" }, row.label), /* @__PURE__ */ React.createElement("h3", null, row.tempo), /* @__PURE__ */ React.createElement("p", null, row.text)))), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-motion-band", "aria-label": "Sintesi veloce lento veloce" }, /* @__PURE__ */ React.createElement("span", null, "VELOCE"), /* @__PURE__ */ React.createElement("span", { className: "vivaldi-motion-band__arrow" }, "\u2192"), /* @__PURE__ */ React.createElement("span", null, "LENTO"), /* @__PURE__ */ React.createElement("span", { className: "vivaldi-motion-band__arrow" }, "\u2192"), /* @__PURE__ */ React.createElement("span", null, "VELOCE")), /* @__PURE__ */ React.createElement("p", { className: "vivaldi-motion-note" }, "Allegro \u2192 Andante/Adagio/Largo \u2192 Allegro/Presto"), /* @__PURE__ */ React.createElement("p", { className: "vivaldi-support-note" }, "Le quattro stagioni seguono questa logica generale in tre movimenti per ciascun concerto."))), /* @__PURE__ */ React.createElement("section", { className: "vivaldi-block", id: "stagioni" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-section-head" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-section-label" }, "Opera guida"), /* @__PURE__ */ React.createElement("h2", null, "Le quattro stagioni"), /* @__PURE__ */ React.createElement("p", null, "Le quattro stagioni sono quattro concerti descrittivi. Ogni concerto costruisce un paesaggio sonoro: la musica suggerisce movimenti, temperature, spazi, animali, fenomeni naturali e azioni umane.")), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-season-grid" }, seasonRows.map((row) => /* @__PURE__ */ React.createElement("article", { key: row.title, className: "vivaldi-season" }, /* @__PURE__ */ React.createElement("h3", null, row.title), /* @__PURE__ */ React.createElement("p", null, row.text)))))), /* @__PURE__ */ React.createElement("section", { className: "vivaldi-block vivaldi-block--surface", id: "ascolto" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell vivaldi-split vivaldi-split--listening" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-section-head" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-section-label" }, "Ascolto guidato"), /* @__PURE__ */ React.createElement("h2", null, "Ascolta il dialogo"), /* @__PURE__ */ React.createElement("p", null, "Non cercare subito una storia completa. Cerca piuttosto il protagonista, il gruppo, i cambi di energia e il momento in cui il paesaggio sonoro cambia luce.")), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-media-frame" }, /* @__PURE__ */ React.createElement(
    "iframe",
    {
      src: "https://www.youtube-nocookie.com/embed/zzE-kVadtNw?rel=0",
      title: "Antonio Vivaldi - Le quattro stagioni",
      loading: "lazy",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowFullScreen: true
    }
  )), /* @__PURE__ */ React.createElement(
    "a",
    {
      className: "vivaldi-link-button",
      href: "https://www.youtube.com/watch?v=zzE-kVadtNw&list=RDzzE-kVadtNw&start_radio=1",
      target: "_blank",
      rel: "noreferrer"
    },
    "Apri l'ascolto su YouTube"
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-section-label" }, "Domande di lavoro"), /* @__PURE__ */ React.createElement("ul", { className: "vivaldi-question-list" }, listeningQuestions.map((item) => /* @__PURE__ */ React.createElement("li", { key: item }, item)))))), /* @__PURE__ */ React.createElement("section", { className: "vivaldi-block", id: "mosaico" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-section-head" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-section-label" }, "Esperienza guidata"), /* @__PURE__ */ React.createElement("h2", null, "Mosaico sonoro-cromatico")), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-pull-quote" }, '"Costruisci un mosaico che non rappresenti la stagione, ma il modo in cui la stagione suona."'), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-split vivaldi-split--mosaic" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("ol", { className: "vivaldi-step-list" }, mosaicSteps.map((item) => /* @__PURE__ */ React.createElement("li", { key: item }, item)))), /* @__PURE__ */ React.createElement("aside", { className: "vivaldi-deliverable" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-section-label" }, "Consegna"), /* @__PURE__ */ React.createElement("h3", null, "Alla fine devi mostrare tre cose"), /* @__PURE__ */ React.createElement("ul", { className: "vivaldi-bullet-list" }, /* @__PURE__ */ React.createElement("li", null, "che cosa hai ascoltato"), /* @__PURE__ */ React.createElement("li", null, "come hai organizzato colore, linee e vuoti"), /* @__PURE__ */ React.createElement("li", null, "perche le tue scelte visive seguono il suono")), /* @__PURE__ */ React.createElement("p", null, "Non rappresentare la stagione in modo realistico. Traduci il comportamento del suono: energia, respiro, densita, timbro."))), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-section-head vivaldi-section-head--compact" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-section-label" }, "Legenda del suono")), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-legend-grid" }, legendRows.map((item) => /* @__PURE__ */ React.createElement("article", { key: item.label, className: "vivaldi-legend-item" }, /* @__PURE__ */ React.createElement(LegendSwatch, { item }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, item.label), /* @__PURE__ */ React.createElement("p", null, item.text))))))), /* @__PURE__ */ React.createElement("section", { className: "vivaldi-block vivaldi-block--surface", id: "esempio" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell" }, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-section-head" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-section-label" }, "Esempio di mosaico"), /* @__PURE__ */ React.createElement("h2", null, "Primavera: luce, aria, movimento")), /* @__PURE__ */ React.createElement(SpringMosaicExample, null), /* @__PURE__ */ React.createElement("p", { className: "vivaldi-example-note" }, '"Ho usato verdi, gialli e azzurri per rendere la luce, il risveglio della natura e la leggerezza del movimento. I punti piu aranciati indicano i momenti di maggiore energia. Le linee curve seguono il movimento del violino."'))), /* @__PURE__ */ React.createElement("section", { className: "vivaldi-block", id: "scrittura" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell vivaldi-split vivaldi-split--writing" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-section-head" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-section-label" }, "Scrittura finale dello studente"), /* @__PURE__ */ React.createElement("h2", null, "Ho scelto questi colori perche..."), /* @__PURE__ */ React.createElement("p", null, "La tua spiegazione deve collegare ascolto, forma musicale e scelta visiva. Non descrivere solo il disegno: spiega come hai sentito il rapporto tra violino, orchestra, movimento e atmosfera.")), /* @__PURE__ */ React.createElement("label", { className: "vivaldi-textarea-label", htmlFor: "vivaldi-riflessione" }, "Scrivi qui la tua spiegazione."), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      id: "vivaldi-riflessione",
      className: "vivaldi-textarea",
      placeholder: "Ho scelto questi colori perche..."
    }
  )), /* @__PURE__ */ React.createElement("aside", { className: "vivaldi-writing-guide" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-section-label" }, "Fai entrare almeno un riferimento a:"), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-tag-list" }, writingFocus.map((item) => /* @__PURE__ */ React.createElement("span", { key: item, className: "vivaldi-tag" }, item))), /* @__PURE__ */ React.createElement("p", null, "Se vuoi essere piu chiaro, prova a nominare un punto in cui il violino emerge, un punto in cui l'orchestra risponde e un cambio di atmosfera che ti ha fatto cambiare colore o densita.")))), /* @__PURE__ */ React.createElement("section", { className: "vivaldi-block vivaldi-block--surface", id: "valutazione" }, /* @__PURE__ */ React.createElement("div", { className: "lesson-shell vivaldi-split vivaldi-split--rubric" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "vivaldi-section-head" }, /* @__PURE__ */ React.createElement("p", { className: "vivaldi-section-label" }, "Valutazione"), /* @__PURE__ */ React.createElement("h2", null, "Rubrica sobria da 10 punti"), /* @__PURE__ */ React.createElement("p", null, "Il punto non e disegnare bene una stagione. Il punto e mostrare che sai riconoscere il dialogo tra solista e orchestra, la forma in tre movimenti e la coerenza tra musica e scelte visive."))), /* @__PURE__ */ React.createElement("div", { className: "vivaldi-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "vivaldi-table vivaldi-table--rubric" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Criterio"), /* @__PURE__ */ React.createElement("th", null, "Punteggio"))), /* @__PURE__ */ React.createElement("tbody", null, rubricRows.map((row) => /* @__PURE__ */ React.createElement("tr", { key: row.item }, /* @__PURE__ */ React.createElement("th", { scope: "row" }, row.item), /* @__PURE__ */ React.createElement("td", null, row.points)))))))));
}
export {
  VivaldiSuonoStagioniLesson as default
};
