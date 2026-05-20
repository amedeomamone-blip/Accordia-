import React from "https://esm.sh/react@18";

const h = React.createElement;

const listeningCards = [
  {
    id: "rameau-les-sauvages",
    index: "01",
    title: "Les Sauvages",
    composer: "Jean-Philippe Rameau",
    eyebrow: "Primo ascolto",
    intro:
      "Un brano breve, energico e costruito su un ritmo molto riconoscibile. Ascoltalo per cogliere movimento, ripetizione, contrasto e teatralità.",
    youtubeId: "2sPC8HsXxik",
    embedTitle: "Les Sauvages - Jean-Philippe Rameau",
    questions: [
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
    ]
  },
  {
    id: "vivaldi-estate-tempesta",
    index: "02",
    title: "L’Estate — Tempesta",
    composer: "Antonio Vivaldi",
    eyebrow: "Secondo ascolto",
    intro:
      "Un ascolto travolgente dalle Quattro stagioni. Segui la corsa degli archi e riconosci come Vivaldi trasforma vento, tuoni e agitazione in musica.",
    youtubeId: "ECZQUg6-TlU",
    embedTitle: "Vivaldi - L’Estate, Tempesta",
    questions: [
      {
        question: "Quale impressione domina nei primi istanti del brano?",
        options: [
          "Calma e immobilità",
          "Agitazione e urgenza",
          "Dolcezza cullante",
          "Silenzio quasi totale"
        ],
        correct: 1,
        explanation:
          "L’attacco è rapido e concitato: l’ascoltatore percepisce subito tensione, movimento e instabilità."
      },
      {
        question: "Quale famiglia di strumenti guida soprattutto l’effetto di tempesta?",
        options: [
          "Gli archi",
          "Gli ottoni",
          "Le percussioni elettroniche",
          "Il coro"
        ],
        correct: 0,
        explanation:
          "Gli archi, con figurazioni veloci e accenti serrati, costruiscono l’immagine sonora del temporale."
      },
      {
        question: "Il brano suggerisce la natura attraverso…",
        options: [
          "un ritmo immobile e sempre uguale",
          "contrasti, ripetizioni rapide e cambi di intensità",
          "una sola nota prolungata",
          "assenza di movimento melodico"
        ],
        correct: 1,
        explanation:
          "Vivaldi crea un racconto sonoro con effetti di contrasto e figure insistenti che ricordano vento e scosse improvvise."
      },
      {
        question: "Quale parola descrive meglio il carattere di questo ascolto?",
        options: [
          "Statico",
          "Travolgente",
          "Sospeso",
          "Monotono"
        ],
        correct: 1,
        explanation:
          "Il finale dell’Estate è costruito per coinvolgere con energia continua e forte tensione drammatica."
      },
      {
        question: "Rispetto a Les Sauvages, questo brano mette più in evidenza…",
        options: [
          "la quiete contemplativa",
          "la descrizione musicale di una scena naturale",
          "il canto corale",
          "la regolarità di una danza composta"
        ],
        correct: 1,
        explanation:
          "Qui la musica non suggerisce soprattutto una danza, ma una scena: la tempesta prende forma attraverso il suono."
      },
      {
        question: "Quale tratto barocco emerge con maggiore forza?",
        options: [
          "Contrasto e drammaticità",
          "Assenza di ritmo",
          "Uniformità espressiva",
          "Semplicità senza tensione"
        ],
        correct: 0,
        explanation:
          "L’ascolto è un esempio molto efficace del gusto barocco per contrasto, sorpresa e intensità espressiva."
      }
    ]
  }
];

function clampIndex(index, length) {
  return ((index % length) + length) % length;
}

function circularDistance(index, activeIndex, length) {
  const direct = index - activeIndex;
  const wrapped = direct > 0 ? direct - length : direct + length;
  return Math.abs(direct) <= Math.abs(wrapped) ? direct : wrapped;
}

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

function ListeningCarousel({ activeIndex, onSelect }) {
  const activeItem = listeningCards[activeIndex];

  return h(
    "div",
    { className: "barocco-listening-carousel", "aria-label": "Scorri i primi ascolti del Barocco" },
    h(
      "div",
      { className: "barocco-listening-carousel__viewport" },
      listeningCards.map((item, index) => {
        const offset = circularDistance(index, activeIndex, listeningCards.length);
        const isActive = index === activeIndex;
        return h(
          "article",
          {
            key: item.id,
            className: `barocco-listening-card${isActive ? " is-active" : ""}`,
            style: {
              "--listening-offset": offset,
              "--listening-abs-offset": Math.abs(offset),
              "--listening-thumb": `url(https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg)`
            },
            "aria-hidden": isActive ? "false" : "true"
          },
          h(
            "div",
            { className: "barocco-listening-card__media" },
            isActive
              ? h("iframe", {
                  src: `https://www.youtube.com/embed/${item.youtubeId}`,
                  title: item.embedTitle,
                  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                  allowFullScreen: true,
                  loading: "lazy"
                })
              : h(
                  React.Fragment,
                  null,
                  h("span", { className: "barocco-listening-card__thumb", "aria-hidden": "true" }),
                  h(
                    "button",
                    {
                      type: "button",
                      className: "barocco-listening-card__select",
                      onClick: () => onSelect(index),
                      "aria-label": `Apri ${item.title} di ${item.composer}`
                    },
                    "Apri ascolto"
                  )
                )
          ),
          h(
            "div",
            { className: "barocco-listening-card__caption" },
            h("span", { className: "barocco-listening-card__eyebrow" }, item.eyebrow),
            h("strong", null, item.title),
            h("em", null, item.composer)
          )
        );
      })
    ),
    h(
      "div",
      { className: "barocco-listening-carousel__controls" },
      h(
        "button",
        {
          type: "button",
          className: "barocco-listening-carousel__arrow",
          onClick: () => onSelect(clampIndex(activeIndex - 1, listeningCards.length)),
          "aria-label": "Ascolto precedente"
        },
        "‹"
      ),
      h(
        "div",
        { className: "barocco-listening-carousel__dots", role: "tablist", "aria-label": "Seleziona un ascolto" },
        listeningCards.map((item, index) => h(
          "button",
          {
            key: `${item.id}-dot`,
            type: "button",
            className: `barocco-listening-carousel__dot${index === activeIndex ? " is-active" : ""}`,
            onClick: () => onSelect(index),
            "aria-label": `${item.title} — ${item.composer}`,
            "aria-selected": index === activeIndex ? "true" : "false"
          }
        ))
      ),
      h(
        "button",
        {
          type: "button",
          className: "barocco-listening-carousel__arrow",
          onClick: () => onSelect(clampIndex(activeIndex + 1, listeningCards.length)),
          "aria-label": "Ascolto successivo"
        },
        "›"
      )
    ),
    h(
      "p",
      { className: "barocco-listening-carousel__hint" },
      `${activeItem.index} di ${String(listeningCards.length).padStart(2, "0")} · scorri le card per cambiare ascolto`
    )
  );
}

function ListeningQuiz({ listening }) {
  const [current, setCurrent] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const [completed, setCompleted] = React.useState(false);

  React.useEffect(() => {
    setCurrent(0);
    setSelected(null);
    setCompleted(false);
  }, [listening.id]);

  const active = listening.questions[current];
  const isCorrect = selected === active.correct;

  function chooseAnswer(index) {
    if (selected === active.correct) return;
    setSelected(index);
  }

  function nextQuestion() {
    if (current < listening.questions.length - 1) {
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
    "article",
    { className: "barocco-listening-quiz", "aria-live": "polite" },
    h(
      "div",
      { className: "barocco-listening-quiz__header" },
      h("span", null, "Rispondi alle domande"),
      h("strong", null, `${listening.title} · ${listening.composer}`)
    ),
    completed
      ? h(
          "div",
          { className: "barocco-listening-result barocco-listening-result--complete" },
          h("span", null, "Ascolto concluso"),
          h("h3", null, "Hai attraversato il brano con attenzione"),
          h("p", null, "Ricomincia il percorso o passa all’ascolto successivo."),
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
                h("p", null, isCorrect ? active.explanation : "Non è la risposta giusta. Riascolta il passaggio e prova ancora."),
                isCorrect
                  ? h(
                      "button",
                      { type: "button", onClick: nextQuestion },
                      current < listening.questions.length - 1 ? "Domanda successiva" : "Concludi"
                    )
                  : null
              )
            : null
        ]
  );
}

function BaroccoFirstListening() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeListening = listeningCards[activeIndex];

  return h(
    "section",
    {
      className: "barocco-listening",
      "aria-labelledby": "barocco-listening-title"
    },
    h(
      "header",
      { className: "barocco-listening__head" },
      h("h2", { id: "barocco-listening-title" }, "Primi ascolti"),
      h("p", { className: "barocco-listening__subtitle" }, `${activeListening.title} · ${activeListening.composer}`),
      h("p", { className: "barocco-listening__intro" }, activeListening.intro)
    ),
    h(ListeningCarousel, { activeIndex, onSelect: setActiveIndex }),
    h(ListeningQuiz, { listening: activeListening })
  );
}

export default BaroccoFirstListening;
