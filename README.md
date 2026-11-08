# Accordia

Ambiente didattico di musica per il lavoro del docente con la LIM: storia della musica, lettura, ascolto e pratica. Include percorsi per la secondaria di primo grado e attività ritmiche per la primaria.

- [Sito pubblicato](https://amedeomamone-blip.github.io/Accordia-/)
- [Stato verificato — 8 novembre 2026](docs/stato-attuale.md)
- [Regole permanenti dell’interfaccia](docs/design-system.md)

## Il sito attuale

La home è una pagina manuale con due percorsi, Storia e Pratica, rivelati dallo scorrimento.

| Percorso | Accessi nella home |
| --- | --- |
| Storia | Medioevo, Rinascimento, Barocco, Classicismo, Romanticismo, Novecento |
| Pratica | Suono, Ritmo, Lettura; Strumenti, Repertorio e Produzione sono tessere senza destinazione |

La [timeline editoriale](timeline/index.html) è una pagina distinta dalla home e presenta sei nuclei: Medioevo, Rinascimento, Barocco, Settecento e Classicismo, Ottocento, Novecento. Anche il renderer restituisce questi sei nuclei; il precedente README ne elencava dieci, ormai non corrispondenti alla navigazione attuale. La presenza di una pagina o tessera non certifica che la relativa lezione sia completa.

### Pratica musicale

| Area | Pagine presenti |
| --- | --- |
| [Suono](pratica/suono/index.html) | Le caratteristiche del suono |
| [Lettura](pratica/lettura/index.html) | Figure musicali; note sul pentagramma; misure semplici; punto e legatura di valore; scala diatonica |
| [Ritmo](pratica/ritmo/index.html) | Gioco dell’eco; Tre strumenti, un’orchestra; Corpo; Accenti; Durate; Incastri; Creazione |

Il **Gioco dell’eco** comprende gesti per mani, petto e cosce, notazione musicale, panoramica, controlli audio e schede stampabili/scaricabili. **Tre strumenti, un’orchestra** presenta ora soltanto l’ostinato della prima battuta per tamburello, legnetti e triangolo, in ripetizione continua. La partitura SVG occupa lo spazio disponibile per la proiezione sulla LIM; tre controlli circolari (Play, Pausa, Stop) e il regolatore del tempo sostituiscono le altre slide e le opzioni audio.

Il titolo dell’orchestra è cambiato, ma il percorso resta `pratica/ritmo/argomenti/quattro-strumenti/`. `marcia-di-topolino/` reindirizza a quella lezione: non è un secondo modulo da ripristinare. Anche `battito/` e `punto-di-valore/` mantengono i rispettivi URL storici.

## Dove intervenire

| File o cartella | Responsabilità attuale |
| --- | --- |
| `index.html` | Home manuale, tessere e animazione di scorrimento |
| `pratica/` | Indici e lezioni di pratica, anche con CSS e JavaScript incorporati |
| `nuclei/`, `timeline/` | Pagine storiche; alcune personalizzate oltre il renderer |
| `scripts/render_nuclei.py` | Generatore storico di timeline, nuclei e argomenti |
| `data/editor/` | Testi e parametri della timeline; override dei nuclei |
| `css/accordia-design-system.css` | Strato visivo condiviso, caricato dopo gli stili locali |
| `js/lesson-interface.js`, `js/interactive-hover-button.js` | Comportamenti condivisi dell’interfaccia |
| `css/`, `js/`, `components/` | Stili, script e componenti: verificare quali siano caricati dalla pagina |
| `assets/` e materiali delle lezioni | Immagini, audio, font e schede |
| `docs/` | Regole di progetto, fonti e stato verificato |

**Il renderer non riproduce integralmente il sito attuale.** `make build` elimina e ricrea `nuclei/`, rigenera la timeline e sincronizza parti delle pagine manuali. Il controllo dell’8 novembre ha rilevato 69 file modificati in una copia isolata, incluse sostituzioni strutturali delle pagine Barocco. Non pubblicare una rigenerazione senza esaminarne il diff e preservare le personalizzazioni. Per aggiornamenti alla documentazione non occorre rigenerare le pagine.

## Lavoro locale e controlli

Il sito è statico: HTML, CSS e JavaScript, senza una build applicativa obbligatoria per servirlo. Il renderer e i controlli statici usano Python 3; alcuni script di test usano Node.js.

```sh
make serve          # http://localhost:8000
make check-links    # collegamenti e ancore locali negli HTML
make check-design   # header, navigazione e token di contrasto condivisi
```

`make verify` esegue **build, check-links e check-design**, quindi modifica le pagine. Eseguirlo in una copia isolata quando si sta verificando il generatore; controllare il diff prima di riportarne gli output sul sito.

`scripts/test-orchestra.cjs` è stato aggiornato per la lezione a battuta unica: verifica ostinato, SVG, loop, riproduzione simulata, pausa/ripresa, stop, BPM ed errori audio. Il test va eseguito localmente con `node scripts/test-orchestra.cjs`: la verifica simulata non sostituisce l’ascolto reale o il controllo grafico nel browser. `scripts/test_battito.cjs` continua a verificare il vecchio `js/battito-lesson.js`, non lo script incorporato della pagina Eco attuale. Il test `scripts/test_reading_lessons.cjs` richiede Playwright, un browser e un server avviato; vedere [esiti e limiti della verifica](docs/stato-attuale.md).

Al termine di un blocco completato: controllare il diff, eseguire le verifiche pertinenti, creare un commit e aggiornare `origin/main`, salvo richiesta esplicita di fermarsi prima o mantenere il lavoro locale.

## Criteri didattici e visivi

La LIM sostiene la conduzione del docente: contenuti leggibili, interazioni funzionali e priorità alla musica. L’header contiene solo `amedeo`; controlli e titoli appartengono al contenuto. Usare il sistema condiviso e le regole aggiornate in [docs/design-system.md](docs/design-system.md), che prevalgono sui precedenti criteri decorativi.

Per Lettura distinguere i valori frazionari dalle pulsazioni e conservare i riferimenti in [docs/lettura-fonti.md](docs/lettura-fonti.md). Il modello storico [Accordia Flow](docs/accordia-flow.md) e l’[architettura Barocco](docs/barocco-lesson-system.md) documentano specifici sistemi di lezione: non descrivono automaticamente ogni pagina di pratica.
