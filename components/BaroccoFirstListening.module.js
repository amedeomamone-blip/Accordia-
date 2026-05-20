import React from "https://esm.sh/react@18";

const h = React.createElement;

const questions = [
  {
    question: "Quale elemento si percepisce subito ascoltando il brano?",
    options: [
      "Una melodia lenta e malinconica",
      "Un ritmo regolare e incisivo",
      "Lunghi silenzi",
      "Suoni elettronici"
    ],
    correct: 1,
    explanation:
      "Il ritmo è l’elemento più evidente: la pulsazione è stabile, riconoscibile e crea subito movimento."
  },
  {
    question: "Questa musica sembra pensata soprattutto per…",
    options: [
      "accompagnare una danza o una scena teatrale",
      "aiutare a dormire",
      "una colonna sonora cinematografica moderna",
      "una cerimonia religiosa silenziosa"
    ],
    correct: 0,
    explanation:
      "Il carattere ritmico e l’energia del brano fanno pensare a una musica legata al gesto, alla danza e alla scena."
  },
  {
    question: "Quale caratteristica del Barocco emerge maggiormente?",
    options: [
      "Improvvisazione jazzistica",
      "Semplicità estrema",
      "Contrasto ed energia",
      "Totale assenza di ripetizioni"
    ],
    correct: 2,
    explanation:
      "Il brano mostra bene il gusto barocco per movimento, teatralità, forza espressiva e contrasti sonori."
  },
  {
    question: "La musica procede in modo…",
    options: [
      "completamente libero e casuale",
      "regolare e controllato",
      "disordinato e frammentato",
      "lento e monotono"
    ],
    correct: 1,
    explanation:
      "La struttura è ordinata: le frasi si ripetono, il ritmo rimane stabile e la forma risulta chiara."
  },
  {
    question: "Quale sensazione trasmette maggiormente il brano?",
    options: [
      "Immobilità",
      "Suspense horror",
      "Movimento e tensione ritmica",
      "Tristezza profonda"
    ],
    correct: 2,
    explanation:
      "Gli accenti marcati e il ritmo continuo creano una forte sensazione di energia e avanzamento."
  },
  {
    question: "Perché il brano può essere definito teatrale?",
    options: [
      "Perché contiene dialoghi parlati",
      "Perché usa effetti sonori moderni",
      "Perché sembra accompagnare gesti, azioni e movimenti scenici",
      "Perché è quasi sempre silenzioso"
    ],
    correct: 2,
    explanation:
      "La musica suggerisce movimento scenico: sembra accompagnare un’azione visibile, non solo un ascolto statico."
  }
];

function optionButton(question, option, index, selected, onChoose) {
  const hasAnswered = selected !== null;
  const isCorrect = hasAnswered && index === question.correct;
  const isWrong = selected === index && index !== question.correct;
  const className = [
    "barocco-listening-option",
    isCorrect ? "is-correct" : "",
    isWrong ? "is-wrong" : ""
  ].filter(Boolean).join(" ");

  return h(
    "button",
    {
      key: option,
      type: "button",
      className,
      onClick: () => onChoose(index),
      disabled: hasAnswered && selected === question.correct
    },
    h(
      "span",
      { className: "barocco-listening-option__layout" },
      h("span", { className: "barocco-listening-option__letter" }, String.fromCharCode(65 + index)),
      h("span", { className: "barocco-listening-option__text" }, option)
    )
  );
}

function BaroccoFirstListening() {
  const [current, setCurrent] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const [completed, setCompleted] = React.useState(false);

  const active = questions[current];
  const isCorrect = selected === active.correct;

  function chooseAnswer(index) {
    if (selected === active.correct) return;
    setSelected(index);
  }

  function nextQuestion() {
    if (current < questions.length - 1) {
      setCurrent((value) => value + 1);
      setSelected(null);
      return;
    }
    setCompleted(true);
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setCompleted(false);
  }

  return h(
    "section",
    {
      className: "barocco-listening",
      "aria-labelledby": "barocco-listening-title"
    },
    h(
      "div",
      { className: "barocco-listening__head" },
      h("h2", { id: "barocco-listening-title" }, "Les Sauvages · Jean-Philippe Rameau"),
      h("p", { className: "barocco-listening__subtitle" }, "Primo ascolto"),
      h(
        "p",
        { className: "barocco-listening__intro" },
        "È un brano breve, energico e costruito su un ritmo molto riconoscibile. Rappresenta bene il Barocco perché mette in evidenza movimento, ripetizione, contrasto e teatralità, trasformando poche idee musicali in una scena sonora vivace e ordinata."
      )
    ),
    h(
      "div",
      { className: "barocco-listening__grid" },
      h(
        "article",
        { className: "barocco-listening-video" },
        h(
          "div",
          { className: "barocco-listening-video__frame" },
          h("iframe", {
            src: "https://www.youtube.com/embed/2sPC8HsXxik",
            title: "Les Sauvages - Rameau",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
            allowFullScreen: true,
            loading: "lazy"
          })
        )
      ),
      h(
        "article",
        { className: "barocco-listening-quiz" },
        completed
          ? h(
              "div",
              { className: "barocco-listening-result barocco-listening-result--complete" },
              h("span", null, "Percorso completato"),
              h("h3", null, "Ascolto concluso"),
              h("p", null, "Hai riconosciuto alcuni elementi fondamentali del linguaggio barocco."),
              h("button", { type: "button", onClick: restart }, "Ricomincia")
            )
          : [
              h("h3", { className: "barocco-listening-quiz__question", key: "question" }, active.question),
              h(
                "div",
                { className: "barocco-listening-options", key: "options" },
                active.options.map((option, index) => optionButton(active, option, index, selected, chooseAnswer))
              ),
              selected !== null
                ? h(
                    "div",
                    {
                      className: `barocco-listening-result${isCorrect ? " is-correct" : " is-wrong"}`,
                      key: "result"
                    },
                    h("strong", null, isCorrect ? "Risposta corretta" : "Riprova"),
                    h("p", null, isCorrect ? active.explanation : "Non è la risposta giusta. Prova ancora."),
                    isCorrect
                      ? h(
                          "button",
                          { type: "button", onClick: nextQuestion },
                          current < questions.length - 1 ? "Domanda successiva" : "Concludi"
                        )
                      : null
                  )
                : null
            ]
      )
    )
  );
}

export default BaroccoFirstListening;
