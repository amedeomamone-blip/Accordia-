# Accordia

Accordia e un sito didattico di musica per la scuola secondaria di primo grado, progettato come un percorso cronologico unico della storia della musica.

## Struttura del progetto

```text
Accordia/
├── index.html
├── timeline/
├── compiti/
├── docente/
├── metodo/
├── pages/
├── nuclei/
│   ├── origini-del-suono/
│   ├── civilta-del-mediterraneo/
│   ├── dalla-tarda-antichita-al-sacro/
│   ├── medioevo/
│   ├── rinascimento/
│   ├── barocco/
│   ├── classicismo/
│   ├── romanticismo/
│   ├── novecento-delle-rivoluzioni/
│   └── musica-contemporanea/
├── css/
│   └── style.css
├── js/
│   └── main.js
└── README.md
```

## Timeline attuale

1. Origini del suono
2. Civilta del Mediterraneo
3. Dalla tarda antichita al sacro
4. Medioevo
5. Rinascimento
6. Barocco
7. Classicismo
8. Romanticismo
9. Novecento delle rivoluzioni
10. Musica contemporanea

## Modello obbligatorio di ogni nucleo

1. SCINTILLA
2. ROTTA
3. ORECCHIO
4. GRAFO
5. CANTIERE
6. VARCO
7. RIBALTA
8. SPECCHIO

## Principi editoriali

- una sola timeline principale
- nessuna divisione per classe
- nuclei brevi, selezionati, non enciclopedici
- stesso format per tutti i nuclei
- contributi esterni possibili solo tramite campi predefiniti

## Nota metodologica

GRAFO e un asse centrale del progetto: non e decorazione, ma traduzione visiva del sapere.

## Workflow locale

- `make build` rigenera timeline, nuclei e argomenti a partire da `scripts/render_nuclei.py`.
- `make check-links` controlla che tutti i link locali negli HTML e le ancore `#...` esistano.
- `make serve` avvia un server statico locale su `http://localhost:8000`.
- `make editor` avvia l'editor visuale interno su `http://localhost:8001/editor/`.
- In alternativa puoi eseguire direttamente `python3 scripts/render_nuclei.py`.
- Regola operativa del progetto: a fine blocco di lavoro completato si fa `git add`, `git commit` e `git push` su `origin/main`, salvo richiesta esplicita di lasciare le modifiche solo in locale o fermarsi prima della pubblicazione.

## Sorgente del contenuto

- `scripts/render_nuclei.py` e la sorgente principale per timeline, nuclei e pagine degli argomenti.
- `data/editor/timeline_page.json` contiene i testi e alcuni parametri visivi della timeline editoriale.
- `data/editor/nuclei_overrides.json` contiene i campi editabili dei nuclei usati da timeline, nav e pagine generate.
- `index.html`, `compiti/index.html`, `docente/index.html`, `metodo/index.html`, `pages/*.html`, `percorso/index.html` e `storia-musica/index.html` restano pagine manuali, ma il build aggiorna automaticamente il versioning di `css/style.css` e `js/main.js`.

## Editor visuale

- L'editor interno apre la timeline reale in preview dentro un iframe e ti lascia selezionare hero, blocchi, card e parametri visivi.
- Le modifiche live non restano solo nella preview: al salvataggio vengono scritte nei file sorgente `data/editor/*.json` e il generatore rigenera `timeline/index.html` e le pagine dei nuclei collegate.
- Avvio:
  1. esegui `make editor`
  2. apri `http://localhost:8001/editor/`
  3. seleziona un blocco dalla sidebar o direttamente dalla preview
  4. modifica i campi nell'inspector a destra
  5. usa `Salva e rigenera`
