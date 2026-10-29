# Fonti delle lezioni di Lettura

Riferimento: Letterio Ciriaco, *Compendio di teoria musicale, I corso*, Edizioni E.DI.M., Roma. Volume fornito dal docente nel PDF `257879870-I-Corso-Compendio-Di-Teoria-Musicale-Letterio-Ciriaco.pdf`. Le pagine elencate sono state lette il 26 ottobre 2026. La data di copyright visibile è 1972; non viene assunta come data dell’edizione.

I testi del sito sono rielaborazioni sintetiche, non citazioni letterali. Il PDF e le scansioni non vengono ripubblicati.

| Lezione | Riferimento nel volume | Pagine stampate | Pagine del PDF |
| --- | --- | --- | --- |
| Figure e pause | Cap. II, Valori musicali; cap. IV, Tavola dei valori semplici | 9, 12 | 8, 11 |
| Note sul pentagramma | Cap. III, Il rigo musicale; cap. XVIII, Chiavi e rigo per la chiave di Sol | 10–11, 37–38 | 9–10, 36–37 |
| Misure semplici | Cap. V, Divisione della misura e suddivisione dei tempi | 13–15 | 12–14 |
| Punto di valore | Cap. VI, Del punto e della legatura, sezione sul punto semplice | 16 | 15 |

## Scelte didattiche

- Le figure esprimono durate relative, con la semibreve come intero. Ogni figura della successione vale metà della precedente; le pause indicano silenzi di valore corrispondente (capp. II e IV).
- Per il pentagramma si usa il rigo di cinque linee in chiave di Sol, illustrato nel cap. XVIII. Il cap. III parte invece dall’endecalineo: i suoi cinque spazi sopra la linea centrale comprendono anche lo spazio sotto il pentagramma. Non vanno confusi con i quattro spazi interni della lezione. Le linee sono Mi, Sol, Si, Re, Fa; gli spazi interni Fa, La, Do, Mi, dal basso.
- La mano come promemoria è un’attività già presente nel sito: non è attribuita al Ciriaco.
- “Misura” e “battuta” indicano lo stesso spazio fra stanghette; i “tempi”, chiamati anche “movimenti”, sono le sue divisioni. Nel testo introduttivo si esplicita questa equivalenza, poi si preferisce “tempi”, come nel cap. V.
- Nelle misure semplici la suddivisione di ciascun tempo è binaria. L’indicazione superiore conta i tempi; quella inferiore ne stabilisce il valore. Gli esempi esistenti restano in 2/4, 3/4 e 4/4, senza introdurre le misure composte.
- Per i conteggi pratici si dichiara la pulsazione alla semiminima. La somma dei valori completa 2/4, 3/4 o 4/4: non si confonde il numeratore con una somma di frazioni.
- Il punto semplice aggiunge metà del valore iniziale della figura o della pausa (cap. VI, p. 16). Restano gli esempi esistenti; punto doppio e triplo non rientrano nel percorso attuale.
- Quiz, esempi interattivi e istruzioni operative sono adattamenti del sito. Non vengono presentati come esercizi tratti dal libro.

Le regole permanenti di presentazione sono in [Design system](design-system.md).

## Ampliamento del 29 ottobre 2026

La scala diatonica e le nuove spiegazioni sulla legatura sono contenuti didattici originali del sito: non si attribuiscono al volume pagine non esaminate. Il riferimento al Ciriaco nella pagina «Punto di valore» resta limitato al punto semplice.

- Scala: sette gradi, cinque toni e due semitoni nell’ottava; esempio di Do maggiore, schema T–T–S–T–T–T–S. Tastiera con cinque tasti neri; diagramma con distanze proporzionali; ascolto sintetizzato nel temperamento equabile.
- Legatura: note della stessa altezza, somma dei valori e un solo attacco, anche oltre la stanghetta. Il disegno oltre stanghetta è esplicitamente un frammento. Le pause non si legano; la legatura di frase è distinta da quella di valore.
- Sono conservati i dodici esercizi sul punto, alternati a otto nuovi esercizi su legature e durate. La scala ha dieci esercizi. Ogni risposta corretta ha una spiegazione; errori, ritorno agli esercizi e riavvio hanno stati espliciti.
- Verifica ripetibile: `scripts/test_reading_lessons.cjs`, con Playwright e un server locale (`make serve`). Il test usa una chiave delle trenta risposte indipendente dai dati della pagina e controlla tentativi, punteggio, ritorno, riavvio, tastiera, ascolto e assenza di overflow orizzontale a 1440, 1280, 390 e 320 pixel.
