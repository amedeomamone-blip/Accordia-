import React from "https://esm.sh/react@18";

const h = React.createElement;

const keyConcepts = [
  {
    id: "celebrazione-potere",
    title: "La musica al servizio del potere",
    summary: "Nelle corti barocche, la musica accompagnava feste, cerimonie e momenti ufficiali, esaltando il prestigio e l'autorita del sovrano."
  },
  {
    id: "coinvolgimento-fedeli",
    title: "Coinvolgimento dei fedeli",
    summary: "La musica sacra usa voci, strumenti e contrasti per rendere il rito piu intenso. Aiuta i fedeli a partecipare con emozione."
  },
  {
    id: "teatri-pubblici",
    title: "Teatri pubblici",
    summary: "Nascono teatri aperti a un pubblico piu ampio. L'opera esce dalle corti e diventa uno spettacolo condiviso."
  },
  {
    id: "oratori",
    title: "Oratori",
    summary: "L'oratorio racconta storie sacre con voci, coro e strumenti. Non c'e scena teatrale: la storia si immagina ascoltando."
  },
  {
    id: "orchestra-barocca",
    title: "Orchestra barocca",
    summary: "L'orchestra si arricchisce: archi, basso continuo, clavicembalo e altri strumenti creano colori sonori piu vari."
  },
  {
    id: "melodramma",
    title: "Melodramma",
    summary: "Nel melodramma musica, parola e teatro lavorano insieme. I personaggi raccontano la storia cantando."
  },
  {
    id: "concerto-solista",
    title: "Concerto solista",
    summary: "Un solo strumento dialoga con l'orchestra. Il solista puo mostrare bravura, energia ed espressivita."
  },
  {
    id: "concerto-grosso",
    title: "Concerto grosso",
    summary: "Un piccolo gruppo di strumenti si alterna all'orchestra. Nascono risposte e contrasti facili da riconoscere."
  },
  {
    id: "contrasti-sonori",
    title: "Contrasti sonori",
    summary: "La musica barocca ama gli opposti: piano e forte, solo e tutti, pieno e vuoto, rapido e lento."
  },
  {
    id: "maggiore-espressivita",
    title: "Maggiore espressivita",
    summary: "La musica cerca emozioni intense: stupore, tensione e meraviglia diventano parte del racconto sonoro."
  }
].map((concept, index) => ({
  ...concept,
  number: String(index + 1).padStart(2, "0")
}));

function ConceptCard({ concept }) {
  return h(
    "article",
    {
      className: "barocco-key-concepts__concept-card is-text-only",
      "data-concept-id": concept.id,
      "aria-labelledby": `barocco-key-concept-title-${concept.id}`
    },
    h(
      "div",
      { className: "barocco-key-concepts__card" },
      h(
        "div",
        { className: "barocco-key-concepts__card-body" },
        h("h3", { id: `barocco-key-concept-title-${concept.id}`, className: "barocco-key-concepts__card-title" }, concept.title),
        h("p", { className: "barocco-key-concepts__card-copy" }, concept.summary)
      )
    )
  );
}

export default function BaroccoKeyConcepts() {
  return h(
    "section",
    {
      className: "barocco-key-concepts barocco-key-concepts--text-only",
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
