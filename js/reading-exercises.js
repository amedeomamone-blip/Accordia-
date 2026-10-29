/* Dati delle attività: valori riferiti alla semibreve = 1. */
window.AccordiaReadingExercises = {
  "ties": [
    {
      "type": "custom",
      "prompt": "Due semiminime della stessa altezza sono legate. Qual è il valore totale?",
      "options": [
        "1/4",
        "1/2",
        "3/4",
        "1"
      ],
      "correct": "1/2",
      "explanation": "1/4 + 1/4 = 1/2. Un solo attacco: la seconda nota prolunga la prima.",
      "visual": "Do (1/4) ⌢ Do (1/4)",
      "terms": [
        0.25,
        0.25
      ]
    },
    {
      "type": "custom",
      "prompt": "Minima e semiminima legate sulla stessa altezza: quale figura ha la stessa durata?",
      "options": [
        "Minima",
        "Semiminima puntata",
        "Minima puntata",
        "Semibreve"
      ],
      "correct": "Minima puntata",
      "explanation": "1/2 + 1/4 = 3/4: lo stesso valore di una minima puntata.",
      "visual": "Do (1/2) ⌢ Do (1/4)",
      "terms": [
        0.5,
        0.25
      ],
      "result": 0.75
    },
    {
      "type": "custom",
      "prompt": "Una semiminima puntata è legata a una croma della stessa altezza. Quanto vale il suono?",
      "options": [
        "3/8",
        "1/2",
        "1/4",
        "5/8"
      ],
      "correct": "1/2",
      "explanation": "Il punto dà 1/4 + 1/8 = 3/8. La legatura aggiunge 1/8: totale 4/8 = 1/2.",
      "visual": "Do (3/8) ⌢ Do (1/8)",
      "terms": [
        0.375,
        0.125
      ]
    },
    {
      "type": "custom",
      "prompt": "Con pulsazione alla semiminima, quante pulsazioni durano una minima e una semiminima legate?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correct": "3",
      "explanation": "Il valore è 3/4. Dividendo per la pulsazione di 1/4 ottieni 3 pulsazioni, con un solo attacco.",
      "visual": "1/2 + 1/4; pulsazione = 1/4",
      "terms": [
        0.5,
        0.25
      ],
      "pulse": 0.25
    },
    {
      "type": "custom",
      "prompt": "Tre semiminime della stessa altezza sono tutte legate: quanti attacchi esegui?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correct": "1",
      "explanation": "Un solo attacco; sostieni il suono per la somma 1/4 + 1/4 + 1/4 = 3/4.",
      "visual": "Do ⌢ Do ⌢ Do"
    },
    {
      "type": "custom",
      "prompt": "In 4/4, una minima legata a una semiminima occupa 3/4. Quale valore manca?",
      "options": [
        "1/8",
        "1/2",
        "3/4",
        "1/4"
      ],
      "correct": "1/4",
      "explanation": "4/4 − (1/2 + 1/4) = 1/4. Una semiminima o la pausa corrispondente completa la battuta.",
      "visual": "3/4 + ? = 4/4",
      "terms": [
        0.5,
        0.25
      ],
      "meter": 1
    },
    {
      "type": "custom",
      "prompt": "Quali segni possono essere uniti da una legatura di valore?",
      "options": [
        "Due note di altezze diverse",
        "Due note della stessa altezza",
        "Una nota e una pausa",
        "Due pause"
      ],
      "correct": "Due note della stessa altezza",
      "explanation": "La legatura di valore richiede la stessa altezza; non si applica alle pause. I valori delle note possono essere diversi.",
      "visual": ""
    },
    {
      "type": "custom",
      "prompt": "Una legatura passa attraverso la stanghetta. All’inizio della nuova battuta…",
      "options": [
        "ripeti l’attacco",
        "inserisci una pausa",
        "sostieni il suono senza riattaccare",
        "raddoppi la velocità"
      ],
      "correct": "sostieni il suono senza riattaccare",
      "explanation": "Il suono continua oltre la stanghetta per il valore scritto. La legatura non cambia il tempo della battuta.",
      "visual": ""
    }
  ],
  "scale": [
    {
      "type": "custom",
      "prompt": "Quanto distano Mi e Fa?",
      "options": [
        "Un tono",
        "Un semitono",
        "Due toni",
        "Un’ottava"
      ],
      "correct": "Un semitono",
      "explanation": "Mi e Fa sono tasti adiacenti: non c’è un tasto intermedio.",
      "visual": "",
      "semitones": 1
    },
    {
      "type": "custom",
      "prompt": "Quanto distano Do e Re?",
      "options": [
        "Un semitono",
        "Un tono",
        "Tre semitoni",
        "Un’ottava"
      ],
      "correct": "Un tono",
      "explanation": "Do–Do♯ e Do♯–Re sono due semitoni: insieme formano un tono.",
      "visual": "",
      "semitones": 2
    },
    {
      "type": "custom",
      "prompt": "Quale coppia forma un semitono nella scala di Do maggiore?",
      "options": [
        "Do–Re",
        "Fa–Sol",
        "La–Si",
        "Si–Do"
      ],
      "correct": "Si–Do",
      "explanation": "Si e il Do immediatamente superiore sono adiacenti sulla tastiera.",
      "visual": ""
    },
    {
      "type": "custom",
      "prompt": "Qual è la successione della scala maggiore?",
      "options": [
        "T–T–S–T–T–T–S",
        "T–S–T–T–S–T–T",
        "T–T–T–S–T–T–S",
        "S–T–T–S–T–T–T"
      ],
      "correct": "T–T–S–T–T–T–S",
      "explanation": "Nella scala maggiore i semitoni sono tra III–IV e VII–VIII grado.",
      "visual": ""
    },
    {
      "type": "custom",
      "prompt": "Quanti toni e semitoni contiene la scala diatonica nell’ottava?",
      "options": [
        "6 toni e 1 semitono",
        "5 toni e 2 semitoni",
        "4 toni e 3 semitoni",
        "7 toni"
      ],
      "correct": "5 toni e 2 semitoni",
      "explanation": "5 × 2 + 2 × 1 = 12 semitoni: un’ottava.",
      "visual": ""
    },
    {
      "type": "custom",
      "prompt": "Da Re a Fa, passando per Mi: quanti semitoni?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correct": "3",
      "explanation": "Re–Mi = 2 semitoni; Mi–Fa = 1. Totale: 3 semitoni.",
      "visual": "",
      "semitones": 3
    },
    {
      "type": "custom",
      "prompt": "Scendendo da Do al Si immediatamente sotto, quale passo fai?",
      "options": [
        "Un tono",
        "Un semitono",
        "Due toni",
        "Nessun intervallo"
      ],
      "correct": "Un semitono",
      "explanation": "Il verso cambia, la distanza no: Si e Do sono separati da un semitono.",
      "visual": "",
      "semitones": 1
    },
    {
      "type": "custom",
      "prompt": "In Do maggiore, tra quali gradi trovi i semitoni?",
      "options": [
        "I–II e V–VI",
        "II–III e VI–VII",
        "III–IV e VII–VIII",
        "IV–V e V–VI"
      ],
      "correct": "III–IV e VII–VIII",
      "explanation": "Mi è il III grado, Fa il IV; Si il VII e il Do superiore l’VIII.",
      "visual": ""
    },
    {
      "type": "custom",
      "prompt": "L’ultimo Do della scala ascendente è…",
      "options": [
        "alla stessa altezza del primo",
        "un semitono sopra il primo",
        "un tono sopra il primo",
        "un’ottava sopra il primo"
      ],
      "correct": "un’ottava sopra il primo",
      "explanation": "Il nome si ripete ma l’altezza cambia: dal primo Do al successivo ci sono 12 semitoni.",
      "visual": ""
    },
    {
      "type": "custom",
      "prompt": "Quale sequenza descrive Do maggiore in discesa?",
      "options": [
        "T–T–S–T–T–T–S",
        "S–T–T–T–S–T–T",
        "S–S–T–T–T–T–T",
        "T–S–T–T–T–S–T"
      ],
      "correct": "S–T–T–T–S–T–T",
      "explanation": "Do–Si S; Si–La T; La–Sol T; Sol–Fa T; Fa–Mi S; Mi–Re T; Re–Do T.",
      "visual": ""
    }
  ]
};
