# Accordia — regole permanenti dell’interfaccia

Queste regole derivano dalle istruzioni del docente del 25 ottobre 2026 e valgono anche per le prossime modifiche. In caso di conflitto prevalgono sui precedenti criteri decorativi dei singoli moduli.

## Identità e impaginazione

- Header con il solo collegamento testuale `amedeo`, minuscolo, alla pagina iniziale. Nessun prefisso, icona, titolo di lezione o menu nell’header.
- Un solo componente visivo: altezza 64px; contenitore `min(100% - clamp(16px, 4vw, 48px), 1320px)`; marchio 1.45rem, peso 800, tracking 0, allineato a sinistra e centrato verticalmente. Gli strumenti della lezione appartengono al contenuto, sotto l’header.
- `css/accordia-design-system.css` è lo strato condiviso, caricato dopo gli stili locali. Anche `scripts/render_nuclei.py` deve generare questo header e caricare lo strato condiviso.
- Griglia ordinata, spazi su base 4px, titoli e testo con gerarchie distinte. Spartiti e contenuti didattici hanno la priorità sul resto.
- Una sola famiglia sans serif: SF Pro Text con fallback di sistema. Bravura è un’eccezione funzionale riservata alla notazione musicale esatta.

## Superfici, colori e comandi

- Bianco per il contenuto, grigio `#e8e8e8` per i comandi, inchiostro `#18191b`, testo secondario `#555b60`.
- Lettura: azzurro ardesia `#a6bbd2`; Ritmo: salvia `#b9c7a6`. Stesse geometrie e stati; il colore distingue il percorso. I colori delle parti musicali sono funzionali e sempre accompagnati dai nomi.
- Pulsanti coerenti con le tessere di selezione: angoli netti, peso 700, bersaglio minimo 44px, contrasto del bordo e del focus verificabile. Raggruppare per prossimità senza moltiplicare contenitori.
- Icone di utilità vettoriali monocromatiche su griglia 24×24 con tratto 1.75px. Non mischiare emoji e simboli tipografici per la stessa azione. Le icone gestuali dell’eco sono materiale didattico e restano riconoscibili.
- Hover, pressione, focus da tastiera, disabilitazione e selezione devono produrre stati distinguibili. Gli stati persistenti devono avere anche un’indicazione testuale o ARIA.
- Niente bagliori, gradienti decorativi, lampeggiamenti continui o linee senza funzione. Conservare pentagrammi, stanghette e indicatori musicali necessari.
- Limitare il maiuscolo: normale scrittura italiana in titoli, etichette e istruzioni.

## Accessibilità e movimento

- Testo normale: contrasto almeno 4.5:1; testo grande e grafica essenziale: almeno 3:1. Il solo 3:1 non è sufficiente per ogni testo. Riferimenti: WCAG 2.2, 1.4.3 e 1.4.11, https://www.w3.org/TR/WCAG22/.
- Nessuna azione essenziale deve dipendere dal passaggio del mouse. Conservare tastiera, touch, etichette dei controlli e focus visibile.
- Rispettare `prefers-reduced-motion` per le transizioni dell’interfaccia. Lo scorrimento della partitura richiesto dal docente segue il clock audio; non è una decorazione.
- Controllare desktop, LIM 1280×720 e schermi piccoli. Se il browser di verifica non è disponibile, dichiararlo: i controlli statici non dimostrano la resa grafica.

## Contenuti di Lettura

- Mantenere gli argomenti presenti: figure e pause, note sul pentagramma, misure semplici, punto di valore.
- Definizione breve, relazione fra i segni, esempio, attività. Linguaggio preciso e comprensibile, senza attribuzioni non verificate.
- Valori riferiti alla semibreve: 1, 1/2, 1/4, 1/8… Distinguere sempre il valore frazionario dalla durata in pulsazioni e dichiarare la pulsazione scelta.
- Per 2/4, 3/4 e 4/4: somma dei valori uguale rispettivamente a 2/4, 3/4 e 4/4. Non affermare che una somma di frazioni debba essere uguale al numero dei movimenti.
- Dichiarare la chiave di violino prima di assegnare i nomi alle linee e agli spazi.
- Il punto aggiunge metà del valore della figura o pausa; non introduce un nuovo attacco.

## Riferimento bibliografico verificato

Il 26 ottobre 2026 sono state lette le pagine pertinenti del volume fornito dal docente: Letterio Ciriaco, *Compendio di teoria musicale, I corso*, Edizioni E.DI.M., Roma. I testi di Lettura sono rielaborazioni didattiche dei contenuti dei capitoli II–VI e XVIII, limitate agli argomenti già presenti. I riferimenti puntuali e le scelte terminologiche sono registrati in [Fonti delle lezioni di Lettura](lettura-fonti.md). Non pubblicare il PDF o scansioni del volume nel repository.
