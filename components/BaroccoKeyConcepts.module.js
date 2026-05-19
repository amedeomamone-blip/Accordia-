import React from "https://esm.sh/react@18";

const h = React.createElement;
const conceptAsset = (filename) => new URL(`../assets/${filename}`, import.meta.url).href;
const concertoGrossoImage = "data:image/webp;base64,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...AAAA==";

const keyConcepts = [
  {
    id: "celebrazione-potere",
    title: "Celebrazione del potere",
    subtitle: "Musica e prestigio",
    image: conceptAsset("barocco-celebrazione-potere-popup.png"),
    imageFocus: "50% 42%",
    summary: "Nelle corti la musica accompagna feste e cerimonie. Serve a mostrare ricchezza, ordine e prestigio di re, principi e nobili."
  },
  {
    id: "coinvolgimento-fedeli",
    title: "Coinvolgimento dei fedeli",
    subtitle: "Emozionare per convincere",
    image: conceptAsset("barocco-coinvolgimento-fedeli-popup.png"),
    imageFocus: "50% 44%",
    summary: "La musica sacra usa voci, strumenti e contrasti per rendere il rito più intenso. Aiuta i fedeli a partecipare con emozione."
  },
  {
    id: "teatri-pubblici",
    title: "Teatri pubblici",
    subtitle: "La musica si apre",
    image: conceptAsset("barocco-teatri-pubblici-popup.png"),
    imageFocus: "50% 46%",
    summary: "Nascono teatri aperti a un pubblico più ampio. L’opera esce dalle corti e diventa uno spettacolo condiviso."
  },
  {
    id: "oratori",
    title: "Oratori",
    subtitle: "Racconti sacri in musica",
    image: conceptAsset("barocco-oratori-popup.png"),
    imageFocus: "50% 43%",
    summary: "L’oratorio racconta storie sacre con voci, coro e strumenti. Non c’è scena teatrale: la storia si immagina ascoltando."
  },
  {
    id: "orchestra-barocca",
    title: "Orchestra barocca",
    subtitle: "Nuovi colori sonori",
    image: conceptAsset("barocco-orchestra-barocca-popup.png"),
    imageFocus: "50% 46%",
    summary: "L’orchestra si arricchisce: archi, basso continuo, clavicembalo e altri strumenti creano colori sonori più vari."
  },
  {
    id: "melodramma",
    title: "Melodramma",
    subtitle: "Nasce l’opera",
    image: conceptAsset("barocco-melodramma-popup.png"),
    imageFocus: "50% 42%",
    summary: "Nel melodramma musica, parola e teatro lavorano insieme. I personaggi raccontano la storia cantando."
  },
  {
    id: "concerto-solista",
    title: "Concerto solista",
    subtitle: "Uno strumento in primo piano",
    image: conceptAsset("barocco-concerto-solista-popup.png"),
    imageFocus: "42% 48%",
    summary: "Un solo strumento dialoga con l’orchestra. Il solista può mostrare bravura, energia ed espressività."
  },
  {
    id: "concerto-grosso",
    title: "Concerto grosso",
    subtitle: "Gruppo e orchestra",
    image: concertoGrossoImage,
    imageFocus: "50% 44%",
    summary: "Un piccolo gruppo di strumenti si alterna all’orchestra. Nascono risposte e contrasti facili da riconoscere."
  },
  {
    id: "contrasti-sonori",
    title: "Contrasti sonori",
    subtitle: "Piano, forte, sorpresa",
    image: conceptAsset("barocco-bach-handel-originale.png"),
    imageFocus: "50% 42%",
    summary: "La musica barocca ama gli opposti: piano e forte, solo e tutti, pieno e vuoto, rapido e lento."
  },
  {
    id: "maggiore-espressivita",
    title: "Maggiore espressività",
    subtitle: "La musica si intensifica",
    image: conceptAsset("barocco-orfeo-16x9-originale.png"),
    imageFocus: "50% 44%",
    summary: "La musica vuole colpire l’ascoltatore. Melodie, contrasti e gesti sonori rendono le emozioni più forti."
  }
].map((concept, index) => ({
  ...concept,
  number: String(index + 1).padStart(2, "0")
}));

function ConceptCard({ concept }) {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const cardStyle = concept.image
    ? {
        "--barocco-concept-image": `url("${concept.image}")`,
        "--barocco-concept-image-position": concept.imageFocus || "center"
      }
    : undefined;

  return h(
    "article",
    {
      className: `barocco-key-concepts__flip-card${concept.image ? " has-image" : ""}${isFlipped ? " is-flipped" : ""}`,
      style: cardStyle,
      "aria-labelledby": `barocco-key-concept-title-${concept.id}`
    },
    h(
      "button",
      {
        type: "button",
        className: "barocco-key-concepts__card",
        onClick: () => setIsFlipped((value) => !value),
        "aria-pressed": isFlipped,
        "aria-label": isFlipped
          ? `Torna all'immagine: ${concept.title}`
          : `Scopri il concetto: ${concept.title}`
      },
      h(
        "span",
        { className: "barocco-key-concepts__card-inner" },
        h(
          "span",
          { className: "barocco-key-concepts__card-face barocco-key-concepts__card-face--front" },
          h("span", { className: "barocco-key-concepts__card-number", "aria-hidden": "true" }, concept.number),
          h(
            "span",
            { className: "barocco-key-concepts__card-front-body" },
            h("span", { className: "barocco-key-concepts__card-subtitle" }, concept.subtitle),
            h("span", { id: `barocco-key-concept-title-${concept.id}`, className: "barocco-key-concepts__card-title" }, concept.title),
            h("span", { className: "barocco-key-concepts__card-action" }, "Scopri")
          )
        ),
        h(
          "span",
          { className: "barocco-key-concepts__card-face barocco-key-concepts__card-face--back" },
          h("span", { className: "barocco-key-concepts__card-number barocco-key-concepts__card-number--back", "aria-hidden": "true" }, concept.number),
          h(
            "span",
            { className: "barocco-key-concepts__card-back-body" },
            h("span", { className: "barocco-key-concepts__card-subtitle barocco-key-concepts__card-subtitle--back" }, concept.subtitle),
            h("span", { className: "barocco-key-concepts__card-title barocco-key-concepts__card-title--back" }, concept.title),
            h("span", { className: "barocco-key-concepts__card-copy" }, concept.summary),
            h("span", { className: "barocco-key-concepts__card-action barocco-key-concepts__card-action--back" }, "Torna all'immagine")
          )
        )
      )
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
