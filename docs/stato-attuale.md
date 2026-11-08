# Stato verificato di Accordia

Rilevazione: **8 novembre 2026**. Base esaminata: commit [`c221209390c1929fd2921daf01e0e7b0511223f5`](https://github.com/amedeomamone-blip/Accordia-/commit/c221209390c1929fd2921daf01e0e7b0511223f5), branch `main`.

## Pubblicazione e contenuti

Sono state richieste via HTTP quattro pagine del [sito pubblico](https://amedeomamone-blip.github.io/Accordia-/): home, indice Lettura, Gioco dell’eco e Tre strumenti, un’orchestra. Tutte hanno risposto **200** e i rispettivi HTML coincidono byte per byte con la base esaminata. Questa verifica non copre ogni URL, il rendering o l’esecuzione dell’audio nel browser.

| Evidenza nel codice attuale | Riferimento |
| --- | --- |
| Sei accessi storici e sei tessere di pratica; Suono, Ritmo e Lettura hanno destinazione, le altre tre no | [Home](../index.html) |
| Cinque argomenti di lettura, inclusi scala diatonica e punto/legatura | [Indice Lettura](../pratica/lettura/index.html) |
| Eco: mani, petto, cosce; gesti, figure musicali, panoramica e schede PDF | [Gioco dell’eco](../pratica/ritmo/argomenti/battito/index.html) |
| Orchestra: tre strumenti, 32 battute in 4/4, scrittura e PDF per ciascuna parte | [Tre strumenti, un’orchestra](../pratica/ritmo/argomenti/quattro-strumenti/index.html) |
| Il vecchio accesso Marcia di Topolino reindirizza all’orchestra | [Reindirizzamento](../pratica/ritmo/argomenti/marcia-di-topolino/index.html) |

I titoli, i collegamenti e i controlli presenti non equivalgono a una verifica completa delle attività in classe. Anche le tessere degli autori del Barocco vanno distinte dalle lezioni autonome: più tessere puntano alla stessa introduzione.

## Esiti riproducibili

| Controllo | Esito sulla base esaminata |
| --- | --- |
| `make check-links` | Superato: 93 HTML, nessun file o frammento locale mancante rilevato |
| `make check-design` | Superato: 85 header coerenti; navigazione e token di contrasto condivisi verificati |
| `make verify` in copia isolata | Superato, ma la rigenerazione modifica 69 file tracciati |
| `node scripts/test-orchestra.cjs` | Fallisce: il DOM simulato non implementa `lessonViewport.addEventListener` |
| `node scripts/test_battito.cjs` | Fallisce: `data-active-block` vale `1`, atteso `2`; verifica il vecchio script esterno |
| `scripts/test_reading_lessons.cjs` | Non eseguito in questa revisione documentale; richiede Playwright e un browser |
| Verifica visiva, tastiera/touch e ascolto reale | Non eseguita in questa revisione |

Gli errori dei test Node precedono questo aggiornamento documentale. Non dimostrano da soli un guasto dell’audio pubblicato e non devono essere presentati come test superati.

## Divergenza del generatore

`scripts/render_nuclei.py` elimina e ricrea `nuclei/`. La generazione modifica anche la timeline e sincronizza asset di pagine manuali. Tra i 69 file variati ci sono aggiornamenti delle query di versione, ma anche differenze strutturali: `nuclei/barocco/index.html` perde il layout bento attuale e l’introduzione al Barocco viene sostituita dalla struttura del renderer.

Il passaggio dei controlli statici non garantisce quindi che una rigenerazione preservi il sito. Gli output dell’esperimento isolato non sono stati riportati su `main`.

## Lavoro tecnico ancora aperto

1. Allineare il renderer alle personalizzazioni pubblicate oppure delimitare esplicitamente quali pagine possiede, verificando il diff prima di adottarne gli output.
2. Aggiornare i test di Orchestra e creare una copertura pertinente per lo script Eco effettivamente caricato.
3. Verificare nel browser le lezioni, l’audio, il comportamento su LIM e la resa delle schede scaricabili.
4. Decidere il comportamento delle tessere Strumenti, Repertorio e Produzione, attualmente senza destinazione.

Questi sono interventi da completare, non funzionalità implementate da questa revisione. La direzione didattica LIM–docente può guidare lo sviluppo; un nuovo format uniforme o una gamification estesa non vengono dichiarati già presenti.
