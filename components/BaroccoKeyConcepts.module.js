import React from "https://esm.sh/react@18";

const h = React.createElement;

const keyConcepts = [
  {
    id: "celebrazione-potere",
    title: "La musica al servizio del potere",
    summary: "Nelle corti barocche, la musica accompagnava feste, cerimonie e momenti ufficiali, esaltando il prestigio e l’autorità del sovrano."
  },
  {
    id: "coinvolgimento-fedeli",
    title: "Coinvolgimento dei fedeli",
    summary: "La musica sacra usa voci, strumenti e contrasti per rendere il rito più intenso. Aiuta i fedeli a partecipare con emozione."
  },
  {
    id: "teatri-pubblici",
    title: "Teatri pubblici",
    summary: "Nascono teatri aperti a un pubblico più ampio. L’opera esce dalle corti e diventa uno spettacolo condiviso."
  },
  {
    id: "oratori",
    title: "Oratori",
    summary: "L’oratorio racconta storie sacre con voci, coro e strumenti. Non c’è scena teatrale: la storia si immagina ascoltando."
  },
  {
    id: "orchestra-barocca",
    title: "Orchestra barocca",
    summary: "L’orchestra si arricchisce: archi, basso continuo, clavicembalo e altri strumenti creano colori sonori più vari."
  },
  {
    id: "melodramma",
    title: "Melodramma",
    summary: "Nel melodramma musica, parola e teatro lavorano insieme. I personaggi raccontano la storia cantando."
  },
  {
    id: "concerto-solista",
    title: "Concerto solista",
    summary: "Un solo strumento dialoga con l’orchestra. Il solista può mostrare bravura, energia ed espressività."
  },
  {
    id: "concerto-grosso",
    title: "Concerto grosso",
    summary: "Un piccolo gruppo di strumenti si alterna all’orchestra. Nascono risposte e contrasti facili da riconoscere."
  },
  {
    id: "contrasti-sonori",
    title: "Contrasti sonori",
    summary: "La musica barocca ama gli opposti: piano e forte, solo e tutti, pieno e vuoto, rapido e lento."
  },
  {
    id: "maggiore-espressivita",
    title: "Maggiore espressività",
    summary: "La musica cerca emozioni intense: stupore, tensione e meraviglia diventano parte del racconto sonoro."
  }
].map((concept, index) => ({
  ...concept,
  number: String(index + 1).padStart(2, "0")
}));

function ConceptCard({ concept }) {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const toggleCard = () => setIsFlipped((value) => !value);

  return h(
    "article",
    {
      className: `barocco-key-concepts__concept-card is-text-only${isFlipped ? " is-flipped" : ""}`,
      "data-concept-id": concept.id,
      "aria-labelledby": `barocco-key-concept-title-${concept.id}`
    },
    h(
      "button",
      {
        className: "barocco-key-concepts__card",
        type: "button",
        onClick: toggleCard,
        "aria-pressed": isFlipped ? "true" : "false",
        "aria-label": `${concept.title}: ${isFlipped ? "torna al fronte" : "leggi la descrizione"}`
      },
      h(
        "span",
        { className: "barocco-key-concepts__card-face barocco-key-concepts__card-face--front", "aria-hidden": isFlipped ? "true" : "false" },
        h("span", { className: "barocco-key-concepts__card-line", "aria-hidden": "true" }),
        h("span", { className: "barocco-key-concepts__card-flip-icon", "aria-hidden": "true" }, "↻"),
        h("span", { id: `barocco-key-concept-title-${concept.id}`, className: "barocco-key-concepts__card-title" }, concept.title)
      ),
      h(
        "span",
        { className: "barocco-key-concepts__card-face barocco-key-concepts__card-face--back", "aria-hidden": isFlipped ? "false" : "true" },
        h("span", { className: "barocco-key-concepts__card-flip-icon", "aria-hidden": "true" }, "↻"),
        h("span", { className: "barocco-key-concepts__card-copy" }, concept.summary)
      )
    )
  );
}

export default function BaroccoKeyConcepts() {
  return h(
    "section",
    {
      className: "barocco-key-concepts barocco-key-concepts--text-only barocco-key-concepts--flip",
      "aria-labelledby": "barocco-key-concepts-title"
    },
    h(
      "div",
      { className: "barocco-key-concepts__inner" },
      h(
        "header",
        { className: "barocco-key-concepts__header" },
        h("p", { className: "barocco-key-concepts__eyebrow" }, "Concetti chiave"),
        h("h2", { id: "barocco-key-concepts-title" }, "Il Barocco in breve"),
        h("p", { className: "barocco-key-concepts__subtitle" }, "idee, luoghi e forme musicali che hanno definito un'epoca.")
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
