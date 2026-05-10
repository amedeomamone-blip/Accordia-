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
  { id: "valutazione", label: "Valutazione" },
];

const heroGoals = [
  {
    title: "Dialogo",
    text: "Capisci che il concerto solista mette in relazione uno strumento protagonista e l'orchestra.",
  },
  {
    title: "Forma",
    text: "Riconosci la struttura generale in tre movimenti: veloce, lento, veloce.",
  },
  {
    title: "Interpretazione",
    text: "Trasformi l'ascolto in un mosaico sonoro-cromatico fatto di colore, densita e movimento.",
  },
];

const metaItems = [
  { label: "Nucleo", value: "Il Barocco" },
  { label: "Forma guida", value: "Concerto solista" },
  { label: "Opera guida", value: "Le quattro stagioni" },
  { label: "Obiettivo", value: "ascoltare la forma e tradurla in scelte visive" },
];

const vivaldiFacts = [
  { label: "Compositore", value: "veneziano" },
  { label: "Strumento", value: "violinista" },
  { label: "Soprannome", value: "prete rosso" },
  { label: "Luogo chiave", value: "Ospedale della Pieta" },
  { label: "Nodo storico", value: "sviluppo del concerto solista" },
  { label: "Opera guida", value: "Le quattro stagioni" },
];

const concertoRows = [
  {
    element: "Solista",
    function: "protagonista: espone, canta, corre, emerge",
  },
  {
    element: "Orchestra",
    function: "gruppo: risponde, sostiene, contrasta, crea lo spazio sonoro",
  },
  {
    element: "Dialogo",
    function: "alternanza tra solista e orchestra",
  },
  {
    element: "Contrasto",
    function: "forte/piano, pieno/vuoto, individuo/gruppo, energia/sospensione",
  },
];

const movementRows = [
  {
    label: "I movimento",
    tempo: "Allegro",
    text: "veloce, energico, riconoscibile; presenta il carattere principale",
  },
  {
    label: "II movimento",
    tempo: "Andante / Adagio / Largo",
    text: "lento, cantabile, sospeso; crea una pausa espressiva",
  },
  {
    label: "III movimento",
    tempo: "Allegro / Presto",
    text: "veloce, brillante, conclusivo; chiude con slancio",
  },
];

const seasonRows = [
  {
    title: "Primavera",
    text: "uccelli, ruscelli, luce, risveglio, movimento leggero.",
  },
  {
    title: "Estate",
    text: "caldo, afa, immobilita, temporale, tensione.",
  },
  {
    title: "Autunno",
    text: "festa, danza, vendemmia, caccia, movimento collettivo.",
  },
  {
    title: "Inverno",
    text: "freddo, pioggia, ghiaccio, passi incerti, sospensione.",
  },
];

const listeningQuestions = [
  "Quando senti il violino protagonista?",
  "Quando risponde l'orchestra?",
  "Il movimento e veloce o lento?",
  "Il suono e caldo o freddo?",
  "E leggero o pesante?",
  "E stabile o agitato?",
  "Quale colore useresti?",
  "Dove cambia atmosfera?",
];

const mosaicSteps = [
  "Ascolta il brano una prima volta e individua il carattere generale: luminoso, freddo, agitato, leggero, festoso, scuro.",
  "Riascolta e dividi il tempo in zone: inizio, sviluppo, cambiamento, chiusura.",
  "Scegli i colori in base a cio che senti, non a cio che vedi.",
  "Usa linee curve per il movimento della melodia e blocchi compatti per i momenti piu forti o ritmici.",
  "Lascia zone piu vuote quando senti attesa, respiro o sospensione.",
  "Alla fine scrivi una breve spiegazione: \"Ho scelto questi colori perche...\"",
];

const legendRows = [
  {
    label: "Colori caldi",
    text: "luce, energia, festa",
    kind: "color",
    tone: "warm",
  },
  {
    label: "Colori freddi",
    text: "gelo, pioggia, sospensione",
    kind: "color",
    tone: "cold",
  },
  {
    label: "Colori scuri",
    text: "tensione, temporale, intensita",
    kind: "color",
    tone: "dark",
  },
  {
    label: "Colori chiari",
    text: "leggerezza, aria, canto",
    kind: "color",
    tone: "light",
  },
  {
    label: "Linee curve",
    text: "melodia, vento, acqua, movimento",
    kind: "curve",
  },
  {
    label: "Blocchi compatti",
    text: "accenti forti, ritmo, pieni orchestrali",
    kind: "blocks",
  },
  {
    label: "Spazi piu vuoti",
    text: "attesa, respiro, pausa",
    kind: "space",
  },
];

const writingFocus = [
  "solista / orchestra",
  "veloce / lento / veloce",
  "timbro",
  "atmosfera",
  "movimento",
];

const rubricRows = [
  {
    item: "Riconoscimento del dialogo solista/orchestra",
    points: "2 punti",
  },
  {
    item: "Riconoscimento della struttura veloce/lento/veloce",
    points: "2 punti",
  },
  {
    item: "Coerenza tra musica e scelte cromatiche",
    points: "3 punti",
  },
  {
    item: "Qualita compositiva del mosaico",
    points: "2 punti",
  },
  {
    item: "Chiarezza della spiegazione scritta",
    points: "1 punto",
  },
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
  orangeAccent: "#da8f39",
};

const springMatrix = [
  ["greenStrong", "yellowStrong", "skyStrong", null, "pinkSoft", "greenSoft", "yellowSoft", "skySoft", null, "roseSoft", "greenSoft", "orangeAccent"],
  ["skySoft", "greenSoft", "yellowSoft", "skyStrong", "pinkSoft", "yellowStrong", "greenStrong", "skySoft", "roseSoft", "greenSoft", "yellowSoft", null],
  ["pinkSoft", "skyStrong", "greenStrong", "yellowStrong", "orangeAccent", "skySoft", "greenSoft", "yellowSoft", "skyStrong", "pinkSoft", "greenStrong", "yellowStrong"],
  ["greenSoft", "yellowSoft", null, "skySoft", "pinkSoft", "greenStrong", "orangeAccent", "yellowStrong", "skyStrong", "roseSoft", "greenSoft", "skySoft"],
  ["yellowSoft", "skySoft", "greenSoft", null, "pinkSoft", "yellowStrong", "greenStrong", "skyStrong", "orangeAccent", "yellowSoft", null, "roseSoft"],
  [null, "greenSoft", "skySoft", "yellowSoft", "pinkSoft", null, "greenStrong", "yellowStrong", "skySoft", "roseSoft", "greenSoft", "orangeAccent"],
];

function RouteNav() {
  const activeId = useActiveSection(routeItems.map((item) => item.id));

  return (
    <nav className="vivaldi-route" aria-label="Percorso della lezione">
      <div className="lesson-shell vivaldi-route__track">
        {routeItems.map((item, index) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn("vivaldi-route__link", activeId === item.id && "is-active")}
            aria-current={activeId === item.id ? "step" : undefined}
          >
            <span className="vivaldi-route__index">{String(index + 1).padStart(2, "0")}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

function FactList({ items }) {
  return (
    <dl className="vivaldi-facts">
      {items.map((item) => (
        <div key={item.label} className="vivaldi-facts__row">
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ConcertTable() {
  return (
    <div className="vivaldi-table-wrap">
      <table className="vivaldi-table">
        <thead>
          <tr>
            <th>Elemento</th>
            <th>Funzione</th>
          </tr>
        </thead>
        <tbody>
          {concertoRows.map((row) => (
            <tr key={row.element}>
              <th scope="row">{row.element}</th>
              <td>{row.function}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LegendSwatch({ item }) {
  if (item.kind === "curve") {
    return (
      <span className="vivaldi-legend__swatch vivaldi-legend__swatch--frame" aria-hidden="true">
        <svg viewBox="0 0 100 44" focusable="false" aria-hidden="true">
          <path d="M8 30 C 24 12, 44 12, 60 24 S 84 36, 92 14" />
        </svg>
      </span>
    );
  }

  if (item.kind === "blocks") {
    return (
      <span className="vivaldi-legend__swatch vivaldi-legend__swatch--frame" aria-hidden="true">
        <svg viewBox="0 0 100 44" focusable="false" aria-hidden="true">
          <rect x="8" y="10" width="24" height="24" rx="5" />
          <rect x="38" y="6" width="18" height="32" rx="5" />
          <rect x="62" y="12" width="30" height="20" rx="5" />
        </svg>
      </span>
    );
  }

  if (item.kind === "space") {
    return (
      <span className="vivaldi-legend__swatch vivaldi-legend__swatch--frame" aria-hidden="true">
        <svg viewBox="0 0 100 44" focusable="false" aria-hidden="true">
          <rect x="8" y="18" width="22" height="8" rx="4" />
          <rect x="70" y="18" width="22" height="8" rx="4" />
        </svg>
      </span>
    );
  }

  return (
    <span
      className={cn("vivaldi-legend__swatch", item.tone && `is-${item.tone}`)}
      aria-hidden="true"
    />
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
        fill: springPalette[tone],
      });
    });
  });

  return (
    <div className="vivaldi-mosaic-frame">
      <svg
        className="vivaldi-mosaic"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Esempio di mosaico sonoro-cromatico ispirato alla Primavera di Vivaldi"
      >
        <rect width={width} height={height} fill="#fbf8f0" />
        <g className="vivaldi-mosaic__grid" aria-hidden="true">
          {Array.from({ length: rows + 1 }, (_, index) => {
            const y = pad - gap / 2 + index * (cell + gap);
            return <line key={`h-${index}`} x1={pad - gap / 2} y1={y} x2={width - pad + gap / 2} y2={y} />;
          })}
          {Array.from({ length: cols + 1 }, (_, index) => {
            const x = pad - gap / 2 + index * (cell + gap);
            return <line key={`v-${index}`} x1={x} y1={pad - gap / 2} x2={x} y2={height - pad + gap / 2} />;
          })}
        </g>
        {cells.map((item) => (
          <rect
            key={item.key}
            x={item.x}
            y={item.y}
            width={cell}
            height={cell}
            rx="12"
            fill={item.fill}
          />
        ))}
        <g className="vivaldi-mosaic__lines" aria-hidden="true">
          <path d="M44 118 C 182 34, 304 198, 452 118 S 716 42, 904 132 S 1090 154, 1134 92" />
          <path d="M96 314 C 196 244, 326 254, 442 330 S 684 422, 862 320 S 1030 248, 1108 302" />
          <path d="M188 486 C 332 396, 474 520, 628 438 S 878 386, 1048 466" />
        </g>
      </svg>
    </div>
  );
}

export default function VivaldiSuonoStagioniLesson() {
  return (
    <div className="lesson-editorial-page vivaldi-lesson" data-lesson-model="editoriale">
      <header className="vivaldi-hero" id="apertura">
        <div className="lesson-shell vivaldi-hero__grid">
          <div className="vivaldi-hero__copy">
            <p className="vivaldi-eyebrow">Il Barocco · Lezione Accordia</p>
            <h1 className="vivaldi-title">Vivaldi. Il suono delle stagioni</h1>
            <p className="vivaldi-subtitle">
              Il concerto solista tra ascolto guidato e mosaico sonoro-cromatico
            </p>
            <p className="vivaldi-opening">
              Con Vivaldi il violino non resta fermo. Entra, risponde, corre, canta, imita,
              sfida l'orchestra. Nelle Quattro stagioni il suono diventa paesaggio:
              primavera, estate, autunno e inverno non vengono raccontati con le parole,
              ma costruiti con ritmo, timbro, contrasto e movimento.
            </p>
          </div>
          <aside className="vivaldi-hero__aside">
            <p className="vivaldi-hero__stamp">Violino solista · orchestra</p>
            <FactList items={vivaldiFacts} />
            <p className="vivaldi-hero__note">
              Qui il punto non e imparare una definizione. Il punto e sentire come il
              violino diventa protagonista e come l'orchestra gli costruisce intorno
              spazio, contrasto e appoggio.
            </p>
          </aside>
        </div>
        <div className="lesson-shell vivaldi-goal-grid">
          {heroGoals.map((item) => (
            <article key={item.title} className="vivaldi-goal">
              <p>{item.title}</p>
              <strong>{item.text}</strong>
            </article>
          ))}
        </div>
      </header>

      <MetaStrip items={metaItems} />
      <RouteNav />

      <section className="vivaldi-block" id="contesto">
        <div className="lesson-shell vivaldi-split vivaldi-split--intro">
          <div className="vivaldi-copy">
            <div className="vivaldi-section-head">
              <p className="vivaldi-section-label">Barocco e Vivaldi</p>
              <h2>Movimento, contrasto, meraviglia.</h2>
            </div>
            <p>
              Nel Barocco contano movimento, contrasto, meraviglia, teatralita,
              energia, luce e ombra, gesto. In Vivaldi queste parole non restano
              astratte: il violino scatta in avanti, l'orchestra apre e richiude lo
              spazio, il suono cambia clima in pochi secondi.
            </p>
            <p>
              Per questo Vivaldi e centrale qui: non solo perche scrive concerti,
              ma perche fa sentire in modo netto che il concerto solista e un
              rapporto vivo tra una voce strumentale e il gruppo che la sostiene,
              la contrasta e la rilancia.
            </p>
            <div className="vivaldi-keywords" aria-label="Parole chiave del Barocco">
              <span>movimento</span>
              <span>contrasto</span>
              <span>meraviglia</span>
              <span>teatralita</span>
              <span>energia</span>
              <span>luce e ombra</span>
              <span>gesto</span>
            </div>
          </div>
          <div className="vivaldi-composer-card">
            <p className="vivaldi-section-label">Antonio Vivaldi</p>
            <ul className="vivaldi-bullet-list">
              <li>compositore veneziano</li>
              <li>violinista</li>
              <li>detto "prete rosso"</li>
              <li>legato all'Ospedale della Pieta</li>
              <li>autore centrale nello sviluppo del concerto solista</li>
              <li>compositore delle Quattro stagioni</li>
            </ul>
            <p>
              Qui serve ricordarlo cosi: violino, energia ritmica, scrittura
              descrittiva, dialogo con l'orchestra.
            </p>
          </div>
        </div>
      </section>

      <section className="vivaldi-block vivaldi-block--surface" id="concerto">
        <div className="lesson-shell">
          <div className="vivaldi-section-head">
            <p className="vivaldi-section-label">La forma</p>
            <h2>Concerto solista: uno e molti</h2>
            <p>
              Nel concerto solista uno strumento protagonista dialoga e si
              contrappone all'orchestra. Qui la forma non e uno schema astratto:
              e un rapporto di energie, risposte, spazi sonori e contrasti.
            </p>
          </div>

          <div className="vivaldi-concerto-schema" aria-label="Schema del concerto solista">
            <p className="vivaldi-concerto-schema__eyebrow">Concerto solista</p>
            <div className="vivaldi-concerto-schema__line">
              <span className="vivaldi-concerto-schema__word">UNO</span>
              <span className="vivaldi-concerto-schema__arrow">↔</span>
              <span className="vivaldi-concerto-schema__word">MOLTI</span>
            </div>
            <div className="vivaldi-concerto-schema__labels">
              <span>violino solista</span>
              <span>orchestra</span>
            </div>
          </div>

          <ConcertTable />
        </div>
      </section>

      <section className="vivaldi-block" id="movimenti">
        <div className="lesson-shell">
          <div className="vivaldi-section-head">
            <p className="vivaldi-section-label">Struttura tripartita</p>
            <h2>La forma in tre movimenti</h2>
          </div>

          <div className="vivaldi-movement-grid">
            {movementRows.map((row) => (
              <article key={row.label} className="vivaldi-movement">
                <p className="vivaldi-movement__label">{row.label}</p>
                <h3>{row.tempo}</h3>
                <p>{row.text}</p>
              </article>
            ))}
          </div>

          <div className="vivaldi-motion-band" aria-label="Sintesi veloce lento veloce">
            <span>VELOCE</span>
            <span className="vivaldi-motion-band__arrow">→</span>
            <span>LENTO</span>
            <span className="vivaldi-motion-band__arrow">→</span>
            <span>VELOCE</span>
          </div>
          <p className="vivaldi-motion-note">
            Allegro → Andante/Adagio/Largo → Allegro/Presto
          </p>
          <p className="vivaldi-support-note">
            Le quattro stagioni seguono questa logica generale in tre movimenti
            per ciascun concerto.
          </p>
        </div>
      </section>

      <section className="vivaldi-block" id="stagioni">
        <div className="lesson-shell">
          <div className="vivaldi-section-head">
            <p className="vivaldi-section-label">Opera guida</p>
            <h2>Le quattro stagioni</h2>
            <p>
              Le quattro stagioni sono quattro concerti descrittivi. Ogni concerto
              costruisce un paesaggio sonoro: la musica suggerisce movimenti,
              temperature, spazi, animali, fenomeni naturali e azioni umane.
            </p>
          </div>

          <div className="vivaldi-season-grid">
            {seasonRows.map((row) => (
              <article key={row.title} className="vivaldi-season">
                <h3>{row.title}</h3>
                <p>{row.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="vivaldi-block vivaldi-block--surface" id="ascolto">
        <div className="lesson-shell vivaldi-split vivaldi-split--listening">
          <div>
            <div className="vivaldi-section-head">
              <p className="vivaldi-section-label">Ascolto guidato</p>
              <h2>Ascolta il dialogo</h2>
              <p>
                Non cercare subito una storia completa. Cerca piuttosto il
                protagonista, il gruppo, i cambi di energia e il momento in cui
                il paesaggio sonoro cambia luce.
              </p>
            </div>

            <div className="vivaldi-media-frame">
              <iframe
                src="https://www.youtube-nocookie.com/embed/zzE-kVadtNw?rel=0"
                title="Antonio Vivaldi - Le quattro stagioni"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <a
              className="vivaldi-link-button"
              href="https://www.youtube.com/watch?v=zzE-kVadtNw&list=RDzzE-kVadtNw&start_radio=1"
              target="_blank"
              rel="noreferrer"
            >
              Apri l'ascolto su YouTube
            </a>
          </div>

          <div>
            <p className="vivaldi-section-label">Domande di lavoro</p>
            <ul className="vivaldi-question-list">
              {listeningQuestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="vivaldi-block" id="mosaico">
        <div className="lesson-shell">
          <div className="vivaldi-section-head">
            <p className="vivaldi-section-label">Esperienza guidata</p>
            <h2>Mosaico sonoro-cromatico</h2>
          </div>

          <div className="vivaldi-pull-quote">
            "Costruisci un mosaico che non rappresenti la stagione, ma il modo in cui la stagione suona."
          </div>

          <div className="vivaldi-split vivaldi-split--mosaic">
            <div>
              <ol className="vivaldi-step-list">
                {mosaicSteps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>

            <aside className="vivaldi-deliverable">
              <p className="vivaldi-section-label">Consegna</p>
              <h3>Alla fine devi mostrare tre cose</h3>
              <ul className="vivaldi-bullet-list">
                <li>che cosa hai ascoltato</li>
                <li>come hai organizzato colore, linee e vuoti</li>
                <li>perche le tue scelte visive seguono il suono</li>
              </ul>
              <p>
                Non rappresentare la stagione in modo realistico. Traduci il
                comportamento del suono: energia, respiro, densita, timbro.
              </p>
            </aside>
          </div>

          <div className="vivaldi-section-head vivaldi-section-head--compact">
            <p className="vivaldi-section-label">Legenda del suono</p>
          </div>
          <div className="vivaldi-legend-grid">
            {legendRows.map((item) => (
              <article key={item.label} className="vivaldi-legend-item">
                <LegendSwatch item={item} />
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="vivaldi-block vivaldi-block--surface" id="esempio">
        <div className="lesson-shell">
          <div className="vivaldi-section-head">
            <p className="vivaldi-section-label">Esempio di mosaico</p>
            <h2>Primavera: luce, aria, movimento</h2>
          </div>

          <SpringMosaicExample />
          <p className="vivaldi-example-note">
            "Ho usato verdi, gialli e azzurri per rendere la luce, il risveglio
            della natura e la leggerezza del movimento. I punti piu aranciati
            indicano i momenti di maggiore energia. Le linee curve seguono il
            movimento del violino."
          </p>
        </div>
      </section>

      <section className="vivaldi-block" id="scrittura">
        <div className="lesson-shell vivaldi-split vivaldi-split--writing">
          <div>
            <div className="vivaldi-section-head">
              <p className="vivaldi-section-label">Scrittura finale dello studente</p>
              <h2>Ho scelto questi colori perche...</h2>
              <p>
                La tua spiegazione deve collegare ascolto, forma musicale e
                scelta visiva. Non descrivere solo il disegno: spiega come hai
                sentito il rapporto tra violino, orchestra, movimento e atmosfera.
              </p>
            </div>

            <label className="vivaldi-textarea-label" htmlFor="vivaldi-riflessione">
              Scrivi qui la tua spiegazione.
            </label>
            <textarea
              id="vivaldi-riflessione"
              className="vivaldi-textarea"
              placeholder="Ho scelto questi colori perche..."
            />
          </div>

          <aside className="vivaldi-writing-guide">
            <p className="vivaldi-section-label">Fai entrare almeno un riferimento a:</p>
            <div className="vivaldi-tag-list">
              {writingFocus.map((item) => (
                <span key={item} className="vivaldi-tag">
                  {item}
                </span>
              ))}
            </div>
            <p>
              Se vuoi essere piu chiaro, prova a nominare un punto in cui il
              violino emerge, un punto in cui l'orchestra risponde e un cambio
              di atmosfera che ti ha fatto cambiare colore o densita.
            </p>
          </aside>
        </div>
      </section>

      <section className="vivaldi-block vivaldi-block--surface" id="valutazione">
        <div className="lesson-shell vivaldi-split vivaldi-split--rubric">
          <div>
            <div className="vivaldi-section-head">
              <p className="vivaldi-section-label">Valutazione</p>
              <h2>Rubrica sobria da 10 punti</h2>
              <p>
                Il punto non e disegnare bene una stagione. Il punto e mostrare
                che sai riconoscere il dialogo tra solista e orchestra, la forma
                in tre movimenti e la coerenza tra musica e scelte visive.
              </p>
            </div>
          </div>

          <div className="vivaldi-table-wrap">
            <table className="vivaldi-table vivaldi-table--rubric">
              <thead>
                <tr>
                  <th>Criterio</th>
                  <th>Punteggio</th>
                </tr>
              </thead>
              <tbody>
                {rubricRows.map((row) => (
                  <tr key={row.item}>
                    <th scope="row">{row.item}</th>
                    <td>{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
