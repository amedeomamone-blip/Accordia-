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

## Fasi delle lezioni immersive

Le lezioni immersive del nucleo `Origini del suono` usano sempre queste otto fasi:

1. Apertura
2. Esplorazione
3. Comprensione attiva
4. Rielaborazione
5. Produzione
6. Condivisione
7. Valutazione
8. Chiusura

## Campi editoriali storici del renderer

Nel dataset editoriale di `scripts/render_nuclei.py` sono ancora presenti anche i campi:

1. Scintilla
2. Rotta
3. Orecchio
4. Grafo
5. Cantiere
6. Varco
7. Ribalta
8. Specchio

Questi campi servono alla struttura storica del renderer e alla descrizione dei nodi, ma non vanno usati per rinominare le fasi delle lezioni immersive.

## Modelli interni delle lezioni immersive

- lezione laboratoriale
- lezione teorico-esplorativa
- lezione storico-sociale / interpretativa
- lezione teorico-laboratoriale
- lezione di sintesi-transizione

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
- In alternativa puoi eseguire direttamente `python3 scripts/render_nuclei.py`.
- Regola operativa del progetto: a fine blocco di lavoro completato si fa `git add`, `git commit` e `git push` su `origin/main`, salvo richiesta esplicita di lasciare le modifiche solo in locale o fermarsi prima della pubblicazione.

## Sorgente del contenuto

- `scripts/render_nuclei.py` e la sorgente principale per timeline, nuclei e pagine degli argomenti.
- `data/editor/timeline_page.json` contiene i testi e alcuni parametri visivi della timeline editoriale.
- `data/editor/nuclei_overrides.json` contiene i campi editabili dei nuclei usati da timeline, nav e pagine generate.
- `index.html`, `compiti/index.html`, `docente/index.html`, `metodo/index.html`, `pages/*.html`, `percorso/index.html` e `storia-musica/index.html` restano pagine manuali, ma il build aggiorna automaticamente il versioning di `css/style.css` e `js/main.js`.
