import React from "https://esm.sh/react@18";

const h = React.createElement;

const keyConcepts = [
  {
    id: "celebrazione-potere",
    title: "La musica al servizio del potere",
    kicker: "Corti e autorita",
    summary: "Nelle corti barocche, la musica accompagnava feste, cerimonie e momenti ufficiali, esaltando il prestigio e l'autorita del sovrano."
  },
  {
    id: "coinvolgimento-fedeli",
    title: "Coinvolgimento dei fedeli",
    kicker: "Rito ed emozione",
    summary: "La musica sacra usa voci, strumenti e contrasti per rendere il rito piu intenso. Aiuta i fedeli a partecipare con emozione."
  },
  {
    id: "teatri-pubblici",
    title: "Teatri pubblici",
    kicker: "Spettacolo condiviso",
    summary: "Nascono teatri aperti a un pubblico piu ampio. L'opera esce dalle corti e diventa uno spettacolo condiviso."
  },
  {
    id: "oratori",
    title: "Oratori",
    kicker: "Storie sacre",
    summary: "L'oratorio racconta storie sacre con voci, coro e strumenti. Non c'e scena teatrale: la storia si immagina ascoltando."
  },
  {
    id: "orchestra-barocca",
    title: "Orchestra barocca",
    kicker: "Colori sonori",
    summary: "L'orchestra si arricchisce: archi, basso continuo, clavicembalo e altri strumenti creano colori sonori piu vari."
  },
  {
    id: "melodramma",
    title: "Melodramma",
    kicker: "Musica e teatro",
    summary: "Nel melodramma musica, parola e teatro lavorano insieme. I personaggi raccontano la storia cantando."
  },
  {
    id: "concerto-solista",
    title: "Concerto solista",
    kicker: "Solista e orchestra",
    summary: "Un solo strumento dialoga con l'orchestra. Il solista puo mostrare bravura, energia ed espressivita."
  },
  {
    id: "concerto-grosso",
    title: "Concerto grosso",
    kicker: "Gruppo e insieme",
    summary: "Un piccolo gruppo di strumenti si alterna all'orchestra. Nascono risposte e contrasti facili da riconoscere."
  },
  {
    id: "contrasti-sonori",
    title: "Contrasti sonori",
    kicker: "Opposti musicali",
    summary: "La musica barocca ama gli opposti: piano e forte, solo e tutti, pieno e vuoto, rapido e lento."
  },
  {
    id: "maggiore-espressivita",
    title: "Maggiore espressivita",
    kicker: "Meraviglia sonora",
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
        h("span", { className: "barocco-key-concepts__card-number", "aria-hidden": "true" }, concept.number),
        h("span", { className: "barocco-key-concepts__card-kicker" }, concept.kicker),
        h("span", { id: `barocco-key-concept-title-${concept.id}`, className: "barocco-key-concepts__card-title" }, concept.title),
        h("span", { className: "barocco-key-concepts__card-cta" }, "Apri la card")
      ),
      h(
        "span",
        { className: "barocco-key-concepts__card-face barocco-key-concepts__card-face--back", "aria-hidden": isFlipped ? "false" : "true" },
        h("span", { className: "barocco-key-concepts__card-number", "aria-hidden": "true" }, concept.number),
        h("span", { className: "barocco-key-concepts__card-kicker" }, concept.title),
        h("span", { className: "barocco-key-concepts__card-copy" }, concept.summary),
        h("span", { className: "barocco-key-concepts__card-cta" }, "Torna")
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
