import React from "https://esm.sh/react@18";

const h = React.createElement;

const listeningItems = [
  {
    id: "rameau-les-sauvages",
    title: "Les Sauvages",
    composer: "Jean-Philippe Rameau",
    label: "Primo ascolto",
    youtubeId: "2sPC8HsXxik",
    description:
      "Un brano breve, energico e costruito su un ritmo subito riconoscibile. Si sente il gusto barocco per il movimento, la ripetizione e la teatralita del gesto.",
    questions: [
      {
        question: "Quale elemento si percepisce subito ascoltando il brano?",
        explanation:
          "Il ritmo e la pulsazione regolare emergono con chiarezza e danno subito al brano una forte spinta in avanti."
      },
      {
        question: "Questa musica sembra pensata soprattutto per accompagnare quale situazione?",
        explanation:
          "L'energia del brano richiama la scena, la danza e il gesto teatrale piu che un ascolto immobile e contemplativo."
      },
      {
        question: "Quale caratteristica del Barocco emerge maggiormente?",
        explanation:
          "Contrasto, energia e chiarezza del disegno musicale mostrano bene la forza espressiva tipica del linguaggio barocco."
      },
      {
        question: "La musica procede in modo libero o controllato?",
        explanation:
          "Le frasi si organizzano con ordine e regolarita: il movimento e vivace, ma resta sempre costruito con precisione."
      }
    ]
  },
  {
    id: "vivaldi-estate-tempesta",
    title: "L'Estate · Tempesta",
    composer: "Antonio Vivaldi",
    label: "Secondo ascolto",
    youtubeId: "ECZQUg6-TlU",
    description:
      "Un ascolto travolgente dalle Quattro stagioni. Gli archi corrono, si inseguono e trasformano vento, tuoni e agitazione in una vera immagine sonora.",
    questions: [
      {
        question: "Quale impressione domina nei primi istanti del brano?",
        explanation:
          "L'attacco rapido e concitato trasmette urgenza, tensione e instabilita, come se la musica stesse descrivendo una forza naturale in arrivo."
      },
      {
        question: "Quale famiglia di strumenti costruisce soprattutto l'effetto di tempesta?",
        explanation:
          "Sono gli archi a guidare il racconto: velocita, accenti e figurazioni serrate creano il cuore drammatico del brano."
      },
      {
        question: "In che modo Vivaldi suggerisce la natura?",
        explanation:
          "Attraverso contrasti, ripetizioni rapide e improvvisi cambi di intensita che fanno percepire scosse, vento e movimento continuo."
      },
      {
        question: "Quale tratto barocco emerge con maggiore forza?",
        explanation:
          "La drammaticita del contrasto e il gusto per la sorpresa trasformano il concerto in un'esperienza sonora molto visiva."
      }
    ]
  },
  {
    id: "bach-badinerie",
    title: "Badinerie · Suite BWV 1067",
    composer: "Johann Sebastian Bach",
    label: "Terzo ascolto",
    youtubeId: "Kl6R4Ui9blc",
    description:
      "Un brano brillante e velocissimo, affidato al flauto e agli archi. Leggerezza, precisione ritmica e virtuosisimo trasformano l'ascolto in una corsa elegante.",
    questions: [
      {
        question: "Quale strumento emerge con maggiore evidenza nella Badinerie?",
        explanation:
          "Il flauto si riconosce subito come protagonista grazie a una linea rapida, leggera e molto agile."
      },
      {
        question: "Quale carattere comunica principalmente il brano?",
        explanation:
          "La Badinerie appare brillante e vivace: tutto e costruito su precisione, slancio e movimento continuo."
      },
      {
        question: "Che cosa richiede soprattutto l'esecuzione di questo brano?",
        explanation:
          "Velocita e nitidezza chiedono grande controllo tecnico, sicurezza ritmica e un fraseggio molto pulito."
      },
      {
        question: "Come si puo ascoltare il rapporto tra flauto e archi?",
        explanation:
          "Come un dialogo ordinato: il flauto emerge in primo piano, mentre gli archi sostengono, rispondono e incorniciano la linea solistica."
      }
    ]
  }
];

function ListeningPreview({ item, index, isActive, onSelect }) {
  return h(
    "div",
    {
      className: `barocco-listening__orbit barocco-listening__orbit--${index + 1}${isActive ? " is-active" : ""}`
    },
    h(
      "button",
      {
        type: "button",
        className: `barocco-listening__preview${isActive ? " is-active" : ""}`,
        onClick: () => onSelect(index),
        "aria-pressed": isActive,
        "aria-label": `${item.title} · ${item.composer}`
      },
      h(
        "span",
        {
          className: "barocco-listening__preview-media",
          style: {
            "--barocco-preview-image": `url(https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg)`
          },
          "aria-hidden": "true"
        },
        h("span", { className: "barocco-listening__preview-play", "aria-hidden": "true" })
      ),
      h(
        "span",
        { className: "barocco-listening__preview-copy" },
        h("span", { className: "barocco-listening__preview-kicker" }, item.label),
        h("strong", null, item.title),
        h("em", null, item.composer)
      )
    )
  );
}

function QuestionCard({ question, index }) {
  return h(
    "article",
    {
      className: "barocco-listening__question-card",
      "aria-labelledby": `barocco-listening-question-${index}`
    },
    h(
      "div",
      { className: "barocco-listening__question-card-body" },
      h("p", { className: "barocco-listening__question-kicker" }, `Domanda ${String(index + 1).padStart(2, "0")}`),
      h("h3", { id: `barocco-listening-question-${index}` }, question.question),
      h("p", { className: "barocco-listening__question-copy" }, question.explanation)
    )
  );
}

export default function BaroccoFirstListening() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeListening = listeningItems[activeIndex];

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
        h("p", { className: "barocco-listening__composer" }, activeListening.composer),
        h("p", { className: "barocco-listening__intro" }, activeListening.description)
      ),
      h(
        "div",
        { className: "barocco-listening__stage" },
        h(
          "div",
          { className: "barocco-listening__globe-wrap", role: "group", "aria-label": "Globo degli ascolti del Barocco" },
          h("span", { className: "barocco-listening__globe-ring barocco-listening__globe-ring--outer", "aria-hidden": "true" }),
          h("span", { className: "barocco-listening__globe-ring barocco-listening__globe-ring--inner", "aria-hidden": "true" }),
          h("span", { className: "barocco-listening__globe-axis barocco-listening__globe-axis--horizontal", "aria-hidden": "true" }),
          h("span", { className: "barocco-listening__globe-axis barocco-listening__globe-axis--vertical", "aria-hidden": "true" }),
          h(
            "div",
            { className: "barocco-listening__globe-core", "aria-hidden": "true" },
            h("span", null, "Globo"),
            h("strong", null, "degli ascolti")
          ),
          listeningItems.map((item, index) =>
            h(ListeningPreview, {
              key: item.id,
              item,
              index,
              isActive: index === activeIndex,
              onSelect: setActiveIndex
            })
          )
        )
      ),
      h(
        "div",
        {
          className: "barocco-listening__questions-track",
          role: "list",
          "aria-label": `Domande guida per ${activeListening.title}`
        },
        activeListening.questions.map((question, index) =>
          h(
            "div",
            { key: `${activeListening.id}-${index}`, className: "barocco-listening__question-slot", role: "listitem" },
            h(QuestionCard, { question, index })
          )
        )
      )
    )
  );
}
