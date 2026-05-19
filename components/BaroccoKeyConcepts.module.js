import React from "https://esm.sh/react@18";

const h = React.createElement;
const conceptAsset = (filename) => new URL(`../assets/${filename}`, import.meta.url).href;

const keyConcepts = [
  {
    id: "celebrazione-potere",
    title: "Celebrazione del potere",
    subtitle: "Musica e prestigio",
    image: conceptAsset("barocco-celebrazione-potere-popup.png"),
    imageFocus: "center",
    summary: "Nelle corti la musica accompagna feste e cerimonie. Serve a mostrare ricchezza, ordine e prestigio di re, principi e nobili."
  },
  {
    id: "coinvolgimento-fedeli",
    title: "Coinvolgimento dei fedeli",
    subtitle: "Emozionare per convincere",
    image: conceptAsset("barocco-coinvolgimento-fedeli-popup.png"),
    imageFocus: "center",
    summary: "La musica sacra usa voci, strumenti e contrasti per rendere il rito più intenso. Aiuta i fedeli a partecipare con emozione."
  },
  {
    id: "teatri-pubblici",
    title: "Teatri pubblici",
    subtitle: "La musica si apre",
    image: conceptAsset("barocco-teatri-pubblici-popup.png"),
    imageFocus: "center",
    summary: "Nascono teatri aperti a un pubblico più ampio. L’opera esce dalle corti e diventa uno spettacolo condiviso."
  },
  {
    id: "oratori",
    title: "Oratori",
    subtitle: "Racconti sacri in musica",
    image: conceptAsset("barocco-oratori-popup.png"),
    imageFocus: "center",
    summary: "L’oratorio racconta storie sacre con voci, coro e strumenti. Non c’è scena teatrale: la storia si immagina ascoltando."
  },
  {
    id: "orchestra-barocca",
    title: "Orchestra barocca",
    subtitle: "Nuovi colori sonori",
    image: conceptAsset("barocco-orchestra-barocca-popup.png"),
    imageFocus: "center",
    summary: "L’orchestra si arricchisce: archi, basso continuo, clavicembalo e altri strumenti creano colori sonori più vari."
  },
  {
    id: "melodramma",
    title: "Melodramma",
    subtitle: "Nasce l’opera",
    image: conceptAsset("barocco-melodramma-popup.png"),
    imageFocus: "center",
    summary: "Nel melodramma musica, parola e teatro lavorano insieme. I personaggi raccontano la storia cantando."
  },
  {
    id: "concerto-solista",
    title: "Concerto solista",
    subtitle: "Uno strumento in primo piano",
    image: conceptAsset("barocco-concerto-solista-popup.png"),
    imageFocus: "left center",
    summary: "Un solo strumento dialoga con l’orchestra. Il solista può mostrare bravura, energia ed espressività."
  },
  {
    id: "concerto-grosso",
    title: "Concerto grosso",
    subtitle: "Gruppo e orchestra",
    image: conceptAsset("barocco-quattro-stagioni-originale.png"),
    imageFocus: "center",
    summary: "Un piccolo gruppo di strumenti si alterna all’orchestra. Nascono risposte e contrasti facili da riconoscere."
  },
  {
    id: "contrasti-sonori",
    title: "Contrasti sonori",
    subtitle: "Piano, forte, sorpresa",
    image: conceptAsset("barocco-bach-handel-originale.png"),
    imageFocus: "center",
    summary: "La musica barocca ama gli opposti: piano e forte, solo e tutti, pieno e vuoto, rapido e lento."
  },
  {
    id: "maggiore-espressivita",
    title: "Maggiore espressività",
    subtitle: "La musica si intensifica",
    image: conceptAsset("barocco-orfeo-16x9-originale.png"),
    imageFocus: "center",
    summary: "La musica vuole colpire l’ascoltatore. Melodie, contrasti e gesti sonori rendono le emozioni più forti."
  }
].map((concept, index) => ({
  ...concept,
  number: String(index + 1).padStart(2, "0")
}));

function ConceptCard({ concept }) {
  const cardStyle = concept.image
    ? {
        "--barocco-concept-image": `url("${concept.image}")`,
        "--barocco-concept-image-position": concept.imageFocus || "center"
      }
    : undefined;

  return h(
    "article",
    {
      className: `barocco-key-concepts__card${concept.image ? " has-image" : ""}`,
      style: cardStyle,
      tabIndex: 0,
      "aria-labelledby": `barocco-key-concept-title-${concept.id}`
    },
    h("span", { className: "barocco-key-concepts__card-number", "aria-hidden": "true" }, concept.number),
    h(
      "div",
      { className: "barocco-key-concepts__card-body" },
      h("p", { className: "barocco-key-concepts__card-subtitle" }, concept.subtitle),
      h("h3", { id: `barocco-key-concept-title-${concept.id}` }, concept.title),
      h("p", { className: "barocco-key-concepts__card-copy" }, concept.summary)
    )
  );
}

export default function BaroccoKeyConcepts() {
  return h(
    "section",
    {
      className: "barocco-key-concepts",
      "aria-labelledby": "barocco-key-concepts-title"
    },
    h(
      "div",
      { className: "barocco-key-concepts__inner" },
      h(
        "header",
        { className: "barocco-key-concepts__header" },
        h("h2", { id: "barocco-key-concepts-title" }, "Concetti chiave"),
        h("p", null, "Dieci idee semplici per capire come cambia la musica nel Barocco.")
      ),
      h(
        "div",
        {
          className: "barocco-key-concepts__track",
          "data-scroll-track": "",
          "data-scroll-key": "barocco-key-concepts",
          role: "list",
          "aria-label": "Concetti chiave del Barocco musicale"
        },
        keyConcepts.map((concept) => h(
          "div",
          { key: concept.id, className: "barocco-key-concepts__slot", role: "listitem" },
          h(ConceptCard, { concept })
        ))
      )
    )
  );
}
