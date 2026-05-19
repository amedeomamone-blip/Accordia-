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
    body: [
      "Nel Barocco la musica profana diventa uno strumento di rappresentanza. Nelle corti europee accompagna feste, cerimonie, banchetti e spettacoli organizzati per mostrare ricchezza, ordine e grandezza.",
      "Principi e nobili sostengono musicisti, cantanti e compositori perché la musica contribuisce a rafforzare la loro immagine pubblica: più una corte appare raffinata e spettacolare, maggiore è il prestigio di chi la governa.",
      "La musica, quindi, non serve soltanto a intrattenere, ma anche a celebrare il potere."
    ],
    focus: "La musica diventa immagine pubblica del potere."
  },
  {
    id: "coinvolgimento-fedeli",
    title: "Coinvolgimento dei fedeli",
    subtitle: "Emozionare per convincere",
    image: conceptAsset("barocco-coinvolgimento-fedeli-popup.png"),
    imageFocus: "center",
    body: [
      "La musica sacra barocca cerca di coinvolgere i fedeli in modo più intenso. Voci, strumenti, contrasti sonori e melodie espressive rendono il rito più solenne e partecipato.",
      "L’ascolto diventa un’esperienza capace di suscitare emozione, raccoglimento e devozione."
    ],
    focus: "Il suono sostiene partecipazione, emozione e devozione."
  },
  {
    id: "teatri-pubblici",
    title: "Teatri pubblici",
    subtitle: "La musica si apre",
    image: conceptAsset("barocco-teatri-pubblici-popup.png"),
    imageFocus: "center",
    body: [
      "Accanto alle sale di corte nascono spazi aperti a un pubblico più ampio. Il teatro musicale esce progressivamente dall’ambiente di corte e diventa un’esperienza condivisa.",
      "Lo spettacolo non appartiene più soltanto all’aristocrazia: inizia a costruire nuovi pubblici e nuove abitudini di ascolto."
    ],
    focus: "Il teatro musicale incontra un pubblico più ampio."
  },
  {
    id: "oratori",
    title: "Oratori",
    subtitle: "Racconti sacri in musica",
    image: conceptAsset("barocco-oratori-popup.png"),
    imageFocus: "center",
    body: [
      "Vicino agli ambienti religiosi si diffondono gli oratori: composizioni sacre narrative, spesso dedicate a episodi biblici ed eseguite senza rappresentazione scenica.",
      "Il racconto prende forma attraverso voci, coro e strumenti. La scena non si vede, ma viene immaginata dall’ascoltatore grazie alla forza espressiva della musica.",
      "L’oratorio unisce spiritualità, narrazione e intensità teatrale, pur restando fuori dal teatro rappresentato."
    ],
    focus: "Il racconto sacro viene affidato alla musica."
  },
  {
    id: "orchestra-barocca",
    title: "Orchestra barocca",
    subtitle: "Nuovi colori sonori",
    image: conceptAsset("barocco-orchestra-barocca-popup.png"),
    imageFocus: "center",
    body: [
      "Nel Barocco si afferma un organico strumentale più ricco e riconoscibile. Gli archi diventano il cuore dell’orchestra, sostenuti dal basso continuo e dal clavicembalo.",
      "Accanto agli archi possono comparire fiati, percussioni e altri strumenti, scelti per ampliare la tavolozza sonora e rendere la musica più varia, brillante e teatrale.",
      "Il colore degli strumenti non è più un semplice accompagnamento: diventa una parte essenziale del linguaggio musicale."
    ],
    focus: "Il timbro diventa una risorsa centrale."
  },
  {
    id: "melodramma",
    title: "Melodramma",
    subtitle: "Nasce l’opera",
    image: conceptAsset("barocco-melodramma-popup.png"),
    imageFocus: "center",
    body: [
      "È una delle grandi novità del Barocco: musica, parola e azione teatrale si uniscono per raccontare storie attraverso il canto e la scena.",
      "Nel melodramma i personaggi non si limitano a parlare: cantano emozioni, conflitti e scelte, trasformando il teatro in un’esperienza musicale completa.",
      "Da questa fusione nasce l’opera, una forma spettacolare capace di coinvolgere vista, ascolto e immaginazione."
    ],
    focus: "Musica, parola e teatro si fondono nell’opera."
  },
  {
    id: "concerto-solista",
    title: "Concerto solista",
    subtitle: "Uno strumento in primo piano",
    image: conceptAsset("barocco-concerto-solista-popup.png"),
    imageFocus: "left center",
    body: [
      "Un singolo strumento dialoga e si contrappone all’orchestra, mettendo in luce virtuosismo, agilità e capacità espressive dell’esecutore.",
      "Nel concerto solista il musicista diventa una presenza riconoscibile: risponde all’orchestra, la sfida, la guida e spesso sorprende l’ascoltatore con passaggi brillanti.",
      "Il contrasto tra solista e insieme orchestrale crea movimento, tensione e varietà sonora."
    ],
    focus: "Il solista emerge come voce protagonista."
  },
  {
    id: "concerto-grosso",
    title: "Concerto grosso",
    subtitle: "Gruppo e orchestra",
    image: conceptAsset("barocco-quattro-stagioni-originale.png"),
    imageFocus: "center",
    body: [
      "Nel concerto grosso un piccolo gruppo di strumenti, chiamato concertino, si alterna all’intera orchestra.",
      "Il risultato è un gioco di dialoghi e contrasti tra masse sonore diverse: pochi strumenti rispondono al tutti, poi vengono assorbiti di nuovo dall’insieme.",
      "Questa alternanza rende la forma dinamica e aiuta l’ascoltatore a seguire il discorso musicale."
    ],
    focus: "Il contrasto tra gruppo e orchestra diventa forma."
  },
  {
    id: "contrasti-sonori",
    title: "Contrasti sonori",
    subtitle: "Piano, forte, sorpresa",
    image: conceptAsset("barocco-bach-handel-originale.png"),
    imageFocus: "center",
    body: [
      "La musica barocca ricerca effetti di opposizione: piano e forte, solo e tutti, pieno e vuoto, rapido e disteso.",
      "Il contrasto non è soltanto un effetto momentaneo: organizza il discorso musicale, orienta l’attenzione e produce energia.",
      "Per questo molti brani barocchi sembrano muoversi per spinte, risposte e cambi improvvisi di densità."
    ],
    focus: "Il contrasto è un principio costruttivo."
  },
  {
    id: "maggiore-espressivita",
    title: "Maggiore espressività",
    subtitle: "La musica si intensifica",
    image: conceptAsset("barocco-orfeo-16x9-originale.png"),
    imageFocus: "center",
    body: [
      "La musica barocca punta a comunicare emozioni con forza, attraverso melodie incisive, dinamiche marcate, alternanze sonore e una scrittura sempre più teatrale.",
      "Gli affetti, cioè gli stati d’animo rappresentati dalla musica, diventano un riferimento importante per capire il linguaggio dell’epoca.",
      "La scrittura musicale cerca gesti più intensi, riconoscibili e capaci di colpire l’ascoltatore."
    ],
    focus: "L’emozione diventa più diretta e teatrale."
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
      h("p", { className: "barocco-key-concepts__card-focus" }, concept.focus),
      h(
        "div",
        { className: "barocco-key-concepts__card-copy" },
        concept.body.map((paragraph, index) => h("p", { key: index }, paragraph))
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
      "header",
      { className: "barocco-key-concepts__header" },
      h("h2", { id: "barocco-key-concepts-title" }, "Concetti chiave"),
      h("p", null, "Dieci idee per leggere il Barocco musicale attraverso immagini, parole e spiegazioni ordinate.")
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
  );
}
