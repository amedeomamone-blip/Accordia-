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
        options: ["Una melodia lenta e malinconica", "Un ritmo regolare e incisivo", "Lunghi silenzi", "Suoni elettronici"],
        correct: 1,
        explanation: "Il ritmo è l’elemento più evidente: la pulsazione è stabile, riconoscibile e crea subito movimento."
      },
      {
        question: "Questa musica sembra pensata soprattutto per…",
        options: ["accompagnare una danza o una scena teatrale", "aiutare a dormire", "una colonna sonora cinematografica moderna", "una cerimonia religiosa silenziosa"],
        correct: 0,
        explanation: "Il carattere ritmico e l’energia del brano fanno pensare a una musica legata al gesto, alla danza e alla scena."
      },
      {
        question: "Quale caratteristica del Barocco emerge maggiormente?",
        options: ["Improvvisazione jazzistica", "Semplicità estrema", "Contrasto ed energia", "Totale assenza di ripetizioni"],
        correct: 2,
        explanation: "Il brano mostra bene il gusto barocco per movimento, teatralità, forza espressiva e contrasti sonori."
      },
      {
        question: "La musica procede in modo…",
        options: ["completamente libero e casuale", "regolare e controllato", "disordinato e frammentato", "lento e monotono"],
        correct: 1,
        explanation: "La struttura è ordinata: le frasi si ripetono, il ritmo rimane stabile e la forma risulta chiara."
      },
      {
        question: "Quale sensazione trasmette maggiormente il brano?",
        options: ["Immobilità", "Suspense horror", "Movimento e tensione ritmica", "Tristezza profonda"],
        correct: 2,
        explanation: "Gli accenti marcati e il ritmo continuo creano una forte sensazione di energia e avanzamento."
      },
      {
        question: "Perché il brano può essere definito teatrale?",
        options: ["Perché contiene dialoghi parlati", "Perché usa effetti sonori moderni", "Perché sembra accompagnare gesti, azioni e movimenti scenici", "Perché è quasi sempre silenzioso"],
        correct: 2,
        explanation: "La musica suggerisce movimento scenico: sembra accompagnare un’azione visibile, non solo un ascolto statico."
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
        options: ["Calma e immobilità", "Agitazione e urgenza", "Dolcezza cullante", "Silenzio quasi totale"],
        correct: 1,
        explanation: "L’attacco è rapido e concitato: l’ascoltatore percepisce subito tensione, movimento e instabilità."
      },
      {
        question: "Quale famiglia di strumenti guida soprattutto l’effetto di tempesta?",
        options: ["Gli archi", "Gli ottoni", "Le percussioni elettroniche", "Il coro"],
        correct: 0,
        explanation: "Gli archi, con figurazioni veloci e accenti serrati, costruiscono l’immagine sonora del temporale."
      },
      {
        question: "Il brano suggerisce la natura attraverso…",
        options: ["un ritmo immobile e sempre uguale", "contrasti, ripetizioni rapide e cambi di intensità", "una sola nota prolungata", "assenza di movimento melodico"],
        correct: 1,
        explanation: "Vivaldi crea un racconto sonoro con effetti di contrasto e figure insistenti che ricordano vento e scosse improvvise."
      },
      {
        question: "Quale parola descrive meglio il carattere di questo ascolto?",
        options: ["Statico", "Travolgente", "Sospeso", "Monotono"],
        correct: 1,
        explanation: "Il finale dell’Estate è costruito per coinvolgere con energia continua e forte tensione drammatica."
      },
      {
        question: "Quale immagine sonora sembra costruire Vivaldi in questo brano?",
        options: ["Una tempesta violenta e improvvisa", "Una danza lenta di corte", "Una ninna nanna serena", "Una processione calma e regolare"],
        correct: 0,
        explanation: "La musica evoca una tempesta attraverso velocità, accenti, tensione e continui movimenti degli archi."
      },
      {
        question: "Quale tratto barocco emerge con maggiore forza?",
        options: ["Contrasto e drammaticità", "Assenza di ritmo", "Uniformità espressiva", "Semplicità senza tensione"],
        correct: 0,
        explanation: "L’ascolto è un esempio molto efficace del gusto barocco per contrasto, sorpresa e intensità espressiva."
      }
    ]
  },
  {
    id: "bach-badinerie",
    index: "03",
    title: "Badinerie — Suite BWV 1067",
    composer: "Johann Sebastian Bach",
    eyebrow: "Terzo ascolto",
    intro:
      "Un brano brillante e velocissimo, affidato al flauto e agli archi. Ascoltalo per riconoscere leggerezza, precisione ritmica, dialogo strumentale e virtuosismo barocco.",
    youtubeId: "Kl6R4Ui9blc",
    embedTitle: "Bach - Badinerie BWV 1067",
    questions: [
      {
        question: "Quale strumento emerge con maggiore evidenza nella Badinerie?",
        options: ["Il flauto", "Il timpano", "La chitarra elettrica", "Il coro"],
        correct: 0,
        explanation: "Il flauto è il protagonista più riconoscibile: espone una linea rapida, brillante e molto agile."
      },
      {
        question: "Quale carattere comunica principalmente il brano?",
        options: ["Pesante e solenne", "Brillante e vivace", "Lento e doloroso", "Statico e senza ritmo"],
        correct: 1,
        explanation: "La Badinerie ha un carattere vivace e leggero, costruito su rapidità, precisione e movimento continuo."
      },
      {
        question: "Che cosa richiede soprattutto l’esecuzione di questo brano?",
        options: ["Lentezza estrema", "Virtuosismo e controllo tecnico", "Improvvisazione senza regole", "Assenza di pulsazione"],
        correct: 1,
        explanation: "La velocità delle figurazioni richiede grande precisione, controllo del suono e sicurezza ritmica."
      },
      {
        question: "Il rapporto tra flauto e archi può essere ascoltato come…",
        options: ["un dialogo strumentale", "un rumore casuale", "un canto corale uniforme", "una melodia senza accompagnamento"],
        correct: 0,
        explanation: "Il flauto spicca in primo piano, mentre gli archi sostengono e rispondono creando un dialogo molto ordinato."
      },
      {
        question: "Quale aspetto del Barocco emerge meglio in questo ascolto?",
        options: ["La scrittura precisa e ornamentale", "L’assenza di forma", "La semplicità di una sola nota ripetuta", "Il suono elettronico"],
        correct: 0,
        explanation: "Il brano mostra una scrittura elegante, veloce e ricca di dettagli: una qualità tipica della musica strumentale barocca."
      },
      {
        question: "Come si muove principalmente la linea del flauto?",
        options: ["Con passaggi rapidi e leggeri", "Con note lunghissime e ferme", "Con suoni parlati", "Con colpi isolati e senza melodia"],
        correct: 0,
        explanation: "La parte del flauto procede con agilità: rapide figurazioni, leggerezza e precisione sono al centro dell’ascolto."
      }
    ]
  }
];

function optionButton(question, option, index, selected, onChoose) {
  const hasAnswered = selected !== null;
  const isCorrect = hasAnswered && index === question.correct;
  const isWrong = selected === index && index !== question.correct;
  const className = ["barocco-listening-option", isCorrect ? "is-correct" : "", isWrong ? "is-wrong" : ""].filter(Boolean).join(" ");

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

function listeningOffset(index, activeIndex, length) {
  const direct = index - activeIndex;
  const wrapped = direct > 0 ? direct - length : direct + length;
  return Math.abs(direct) <= Math.abs(wrapped) ? direct : wrapped;
}

function ListeningCarousel({ activeIndex, onSelect }) {
  const carouselRef = React.useRef(null);
  const frameRef = React.useRef(null);
  const lastCenteredIndexRef = React.useRef(activeIndex);

  const centerCard = React.useCallback((index) => {
    const carousel = carouselRef.current;
    const card = carousel?.querySelector(`[data-listening-index="${index}"]`);
    if (!carousel || !card) return;

    const target = card.offsetLeft - (carousel.clientWidth - card.clientWidth) / 2;
    carousel.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  const chooseCard = React.useCallback((index) => {
    lastCenteredIndexRef.current = index;
    onSelect(index);
    centerCard(index);
  }, [centerCard, onSelect]);

  const syncCenteredCard = React.useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const carouselBox = carousel.getBoundingClientRect();
    const carouselCenter = carouselBox.left + carouselBox.width / 2;
    const cards = Array.from(carousel.querySelectorAll("[data-listening-index]"));

    let closestIndex = activeIndex;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card) => {
      const cardBox = card.getBoundingClientRect();
      const cardCenter = cardBox.left + cardBox.width / 2;
      const distance = Math.abs(cardCenter - carouselCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = Number(card.dataset.listeningIndex);
      }
    });

    if (Number.isInteger(closestIndex) && closestIndex !== lastCenteredIndexRef.current) {
      lastCenteredIndexRef.current = closestIndex;
      onSelect(closestIndex);
    }
  }, [activeIndex, onSelect]);

  React.useEffect(() => {
    lastCenteredIndexRef.current = activeIndex;
  }, [activeIndex]);

  React.useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    const handleScroll = () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(syncCenteredCard);
    };

    carousel.addEventListener("scroll", handleScroll, { passive: true });
    syncCenteredCard();

    return () => {
      carousel.removeEventListener("scroll", handleScroll);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [syncCenteredCard]);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => centerCard(activeIndex), 80);
    return () => window.clearTimeout(timeout);
  }, [activeIndex, centerCard]);

  return h(
    "div",
    {
      className: "barocco-listening-carousel",
      ref: carouselRef,
      "aria-label": "Scorri i primi ascolti del Barocco"
    },
    h(
      "div",
      { className: "barocco-listening-carousel__viewport" },
      listeningCards.map((item, index) => {
        const isActive = index === activeIndex;
        const offset = listeningOffset(index, activeIndex, listeningCards.length);
        const positionClass = isActive ? "is-active" : offset < 0 ? "is-before" : "is-after";
        return h(
          "article",
          {
            key: item.id,
            className: `barocco-listening-card ${positionClass}`,
            style: {
              "--listening-thumb": `url(https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg)`,
              "--listening-offset": String(offset)
            },
            onClick: () => chooseCard(index),
            tabIndex: 0,
            role: "button",
            "data-listening-index": index,
            onKeyDown: (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                chooseCard(index);
              }
            },
            "aria-pressed": isActive ? "true" : "false",
            "aria-label": `${item.title} — ${item.composer}`
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
                  loading: "lazy",
                  onClick: (event) => event.stopPropagation()
                })
              : h("span", { className: "barocco-listening-card__thumb", "aria-hidden": "true" })
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
                { className: `barocco-listening-result${isCorrect ? " is-correct" : " is-wrong"}`, key: "result" },
                h("strong", null, isCorrect ? "Risposta corretta" : "Riprova"),
                h("p", null, isCorrect ? active.explanation : "Non è la risposta giusta. Riascolta il passaggio e prova ancora."),
                isCorrect
                  ? h("button", { type: "button", onClick: nextQuestion }, current < listening.questions.length - 1 ? "Domanda successiva" : "Concludi")
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
    { className: "barocco-listening", "aria-labelledby": "barocco-listening-title" },
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
