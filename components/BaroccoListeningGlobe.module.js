import React from "https://esm.sh/react@18";

const h = React.createElement;

const listeningItems = [
  {
    id: "monteverdi-orfeo",
    title: "Toccata da L’Orfeo",
    composer: "Claudio Monteverdi",
    category: "Melodramma",
    cue: "L’opera si apre come uno spettacolo solenne: ascolta il carattere cerimoniale e l’energia degli ottoni.",
    focus: ["teatro musicale", "ingresso solenne", "nuova centralità della scena"],
    x: 50,
    y: 10
  },
  {
    id: "vivaldi-primavera",
    title: "La primavera · Allegro",
    composer: "Antonio Vivaldi",
    category: "Concerto solista",
    cue: "Riconosci il dialogo tra violino e orchestra e prova a seguire i richiami sonori evocati dalla musica.",
    focus: ["solista e tutti", "contrasti", "immagini sonore"],
    x: 78,
    y: 27
  },
  {
    id: "corelli-concerto-grosso",
    title: "Concerto grosso op. 6 n. 8",
    composer: "Arcangelo Corelli",
    category: "Concerto grosso",
    cue: "Segui l’alternanza tra piccolo gruppo e orchestra: il Barocco costruisce movimento attraverso il contrasto.",
    focus: ["concertino e ripieno", "alternanza", "equilibrio"],
    x: 84,
    y: 57
  },
  {
    id: "handel-lascia",
    title: "Lascia ch’io pianga",
    composer: "Georg Friedrich Händel",
    category: "Aria d’opera",
    cue: "Osserva come una melodia ampia e regolare possa rendere l’emozione più intensa e riconoscibile.",
    focus: ["espressività", "melodia", "affetto"],
    x: 68,
    y: 83
  },
  {
    id: "bach-brandenburg",
    title: "Concerto brandeburghese n. 3",
    composer: "Johann Sebastian Bach",
    category: "Scrittura strumentale",
    cue: "Ascolta l’intreccio tra le parti: il discorso musicale nasce dal movimento continuo delle linee sonore.",
    focus: ["imitazione", "energia ritmica", "trama polifonica"],
    x: 32,
    y: 83
  },
  {
    id: "charpentier-te-deum",
    title: "Prélude dal Te Deum",
    composer: "Marc-Antoine Charpentier",
    category: "Celebrazione",
    cue: "Cogli il tono festoso e pubblico della musica: fanfare e ritmo rendono il brano immediatamente riconoscibile.",
    focus: ["musica cerimoniale", "splendore", "ritmo incisivo"],
    x: 16,
    y: 57
  },
  {
    id: "bach-corale",
    title: "Corale dalla Cantata BWV 147",
    composer: "Johann Sebastian Bach",
    category: "Musica sacra",
    cue: "Lasciati guidare dalla chiarezza della linea e dal senso di raccoglimento: la scrittura sostiene l’ascolto contemplativo.",
    focus: ["spiritualità", "coro", "ordine sonoro"],
    x: 22,
    y: 27
  }
];

function ListeningNode({ item, activeId, onSelect }) {
  const isActive = item.id === activeId;

  return h(
    "button",
    {
      type: "button",
      className: `barocco-listening-globe__node${isActive ? " is-active" : ""}`,
      style: { "--node-x": `${item.x}%`, "--node-y": `${item.y}%` },
      onClick: () => onSelect(item.id),
      "aria-pressed": isActive,
      "aria-label": `${item.title}, ${item.composer}. ${item.category}`
    },
    h("span", { className: "barocco-listening-globe__node-dot", "aria-hidden": "true" }),
    h("span", { className: "barocco-listening-globe__node-label" }, item.title)
  );
}

function DetailPanel({ item }) {
  return h(
    "article",
    { className: "barocco-listening-globe__detail", "aria-live": "polite" },
    h("p", { className: "barocco-listening-globe__detail-kicker" }, item.category),
    h("h3", null, item.title),
    h("p", { className: "barocco-listening-globe__composer" }, item.composer),
    h("p", { className: "barocco-listening-globe__cue" }, item.cue),
    h(
      "div",
      { className: "barocco-listening-globe__tags", "aria-label": "Cosa ascoltare" },
      item.focus.map((label) => h("span", { key: label }, label))
    ),
    h(
      "p",
      { className: "barocco-listening-globe__note" },
      "Seleziona un altro brano sul globo per cambiare traccia e mettere a confronto gli ascolti."
    )
  );
}

export default function BaroccoListeningGlobe() {
  const [activeId, setActiveId] = React.useState(listeningItems[0].id);
  const activeItem = listeningItems.find((item) => item.id === activeId) || listeningItems[0];

  return h(
    "section",
    {
      className: "barocco-listening-globe",
      "aria-labelledby": "barocco-listening-globe-title"
    },
    h(
      "div",
      { className: "barocco-listening-globe__inner" },
      h(
        "header",
        { className: "barocco-listening-globe__header" },
        h("p", { className: "barocco-listening-globe__eyebrow" }, "Playlist interattiva"),
        h("h2", { id: "barocco-listening-globe-title" }, "Globo degli ascolti"),
        h(
          "p",
          null,
          "Esplora i brani della lezione come in una costellazione sonora. Ogni nodo apre una traccia da osservare, riconoscere e collegare ai caratteri del Barocco."
        )
      ),
      h(
        "div",
        { className: "barocco-listening-globe__layout" },
        h(
          "div",
          { className: "barocco-listening-globe__sphere", role: "group", "aria-label": "Brani del Globo degli ascolti" },
          h("span", { className: "barocco-listening-globe__orbit barocco-listening-globe__orbit--one", "aria-hidden": "true" }),
          h("span", { className: "barocco-listening-globe__orbit barocco-listening-globe__orbit--two", "aria-hidden": "true" }),
          h("span", { className: "barocco-listening-globe__orbit barocco-listening-globe__orbit--three", "aria-hidden": "true" }),
          h("span", { className: "barocco-listening-globe__core", "aria-hidden": "true" }, "Ascolti"),
          listeningItems.map((item) => h(ListeningNode, { key: item.id, item, activeId, onSelect: setActiveId }))
        ),
        h(DetailPanel, { item: activeItem })
      )
    )
  );
}
