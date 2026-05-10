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
├── components/
├── data/
│   └── editor/
├── nuclei/
│   ├── origini-e-civilta-antiche/
│   ├── medioevo/
│   ├── rinascimento/
│   ├── barocco/
│   ├── settecento-classicismo/
│   ├── ottocento/
│   ├── novecento/
│   ├── jazz/
│   ├── musica-leggera/
│   └── musica-etnica/
├── scripts/
├── css/
│   └── style.css
├── js/
│   └── main.js
└── README.md
```

## Timeline pubblica attuale

1. Origini e civilta antiche
2. Il Medioevo
3. Il Rinascimento
4. Il Barocco
5. Settecento e Classicismo
6. L'Ottocento
7. Il Novecento
8. Il jazz
9. La musica leggera
10. La musica etnica

## Architettura editoriale attuale

- `scripts/render_nuclei.py` e la sorgente principale per timeline, nuclei e pagine degli argomenti.
- La timeline pubblica a 10 nuclei e costruita dal blueprint editoriale attuale e rifinita dagli override in `data/editor/nuclei_overrides.json`.
- Nel renderer convivono ancora strutture storiche e sperimentali, utili come base dati o per i moduli immersivi interni: non vanno confuse con i nomi pubblici dei nuclei attuali.

## Lezioni immersive e Flow

Le lezioni immersive hanno due livelli distinti.

Struttura interna a 8 punti:

1. Domanda iniziale
2. Contesto storico e culturale
3. Osservazione guidata
4. Ascolto guidato
5. Spiegazione dei contenuti
6. Attivita pratica
7. Produzione degli studenti
8. Verifica e conclusione

Flow visibile in 4 movimenti:

1. Apertura
2. Esplorazione
3. Comprensione attiva
4. Rielaborazione

I componenti immersivi vivono in `components/` e oggi riguardano soprattutto l'area delle origini, mentre le pagine pubbliche dei nuclei restano generate dal renderer.

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
- `index.html`, `compiti/index.html`, `docente/index.html`, `metodo/index.html`, `pages/*.html`, `percorso/index.html` e `storia-musica/index.html` restano pagine manuali, ma il build sincronizza automaticamente navigazione e versioning di `css/style.css` e `js/main.js`.
